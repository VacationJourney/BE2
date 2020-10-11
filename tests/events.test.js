require('cross-fetch/polyfill')
const {gql} = require('apollo-boost');
const {prisma} = require('../src/generated');
const {getClient} = require('./utils');

const client = getClient();
let authenticatedClient;
let dateID;
let eventID;

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
// CREATE_EVENT mutation
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
      mutation: CREATE_EVENT, variables: {
          title: "Scuba", 
          date: dateID, 
          startTime: "09:00am", 
          endTime: "11:00am", 
          location: "Beach", 
          contact: "beach@bums.com", 
          cost: 150, 
          description: "Fun with the fishes!"}
      })
   
    eventID = eventRes.data.createEvent.id
    expect(eventRes.data.createEvent.title).toMatch("Scuba")
    console.log("EID", eventID)
  })

// UPDATE_EVENT mutation
  test('should update an event', async () => {
    const UPDATE_EVENT = gql`
        mutation updateEvent(
          $id: ID
          $title: String
          $startTime: String
          $endTime: String
          $location: String
          $contact: String
          $cost: Int
          $description: String
        ) {
          updateEvent(
            data: {
              title: $title
              startTime: $startTime
              endTime: $endTime
              location: $location
              contact: $contact
              cost: $cost
              description: $description
            }
            where: { id: $id }
          ) {
            title
            startTime
            endTime
            location
            contact
            cost
            description
          }
        }
    `;
    const updateRes = await client.mutate({
        mutation: UPDATE_EVENT, variables: {
        id: eventID, 
        title: "Beer Tour", 
        startTime: "04:00am", 
        endTime: "5:00am", 
        location: "Brewery", 
        contact: "beer@bums.com", 
        cost: 30, 
        description: "Mashing!"}
    })
    expect(updateRes.data.updateEvent.title).toMatch("Beer Tour")
  })

// DELETE_EVENT mutation
  test('should delete an event', async () => {
    const DELETE_EVENT = gql`
      mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id) {
          id
          title
        }
      }
    `;
    const deleteRes = await client.mutate({
      mutation: DELETE_EVENT, variables: {id: eventID}
    })
    const exists = await prisma.$exists.event({id : deleteRes.data.deleteEvent.id});

    expect(exists).toBe(false);
  })
})
