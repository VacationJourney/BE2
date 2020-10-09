import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated';
import { getClient } from './utils';
const client = getClient();
let authenticatedClient;
let dateID;

beforeAll(async () => {
  await prisma.deleteManyUsers()
  await prisma.deleteManyVacations()
  const SIGN_UP = gql`
      mutation {
        signUp(
          username: "JMac",
          email: "jeremy@mac.com",
          password: "Kansas"
        ){
        ...on SignUpResponse {
          token 
          user {
            id 
            username 
            email
          }
        }
        ... on UserFoundError {
          message
        }
        }
      }
      `;
    // Create Authentication Environment
    const signUpRes = await client.mutate({
      mutation: SIGN_UP
    })
    authenticatedClient = getClient(signUpRes.data.signUp.token)

      const CREATE_VACATION = gql`
      mutation createVacation(
        $title: String!, 
        $dates: [DayCreateWithoutTripInput!]
        ) {
        createVacation(data: {
            title: $title,
            dates: { create: $dates }
          }
        ) {
          id
          title
          dates {
            id
            date
            events {
              id
              title
            }
          }
        }
      }
    `;
    // Identify Vacation
    const vacationRes = await authenticatedClient.mutate({
      mutation: CREATE_VACATION, variables: {title: "Hawaii", dates: [ {date: "2021-10-15"}]}
    })
    dateID = vacationRes.data.createVacation.dates[0].id
})

describe('Tests the Events resolver CRUD logic', () => {
  test('Should create an event', async () => {
    const CREATE_EVENT = gql`
      mutation CreateEvent(
        $title: String!
        $startTime: String
        $endTime: String
        $location: String
        $contact: String
        $cost: Int
        $description: String
        $date: ID!
      ) {
        createEvent(
          data: {
            title: $title
            date: { connect: { id: $date } }
            startTime: $startTime
            endTime: $endTime
            location: $location
            contact: $contact
            cost: $cost
            description: $description
          }
        ) {
          id
          title
          startTime
          endTime
          location
          description
        }
      }
    `;
    const eventRes = await client.mutate({
      mutation: CREATE_EVENT, variables: {title: "Scuba", date: dateID, startTime: "09:00am", endTime: "11:00am", location: "Beach", contact: "beach@bums.com", cost: 150, description: "Fun with the fishes!"}
    })
    expect(eventRes.data.createEvent.title).toMatch("Scuba")
  })
})