import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated';
import { getClient } from './utils';
const client = getClient();
let authenticatedClient;
let vacationID;

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
  const signUpRes = await client.mutate({
    mutation: SIGN_UP
  })
  
  authenticatedClient = getClient(signUpRes.data.signUp.token)
})


describe('Tests the Vacation Resolver Logic', () => {
  test('should not create a vacation for an un-authenticated user', async () => {
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
  await expect(client.mutate({
    mutation: CREATE_VACATION, variables: {title: "Fiji", dates: [ {date: "2020-10-15"},{ date: "2020-10-16"}]}
  })).rejects.toThrowError("Authentication required");
  })


  test('should create a vacation for an authenticated user', async () => {
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

    const vacationRes = await authenticatedClient.mutate({
      mutation: CREATE_VACATION, variables: {title: "Hawaii", dates: [ {date: "2021-10-15"},{ date: "2021-10-16"}]}
    })
    vacationID = vacationRes.data.createVacation.id
    expect(vacationRes.data.createVacation.title).toMatch("Hawaii")
  });


  test('should not update for an unauthenticated user', async() => {
    const UPDATE_VACATION =gql`
      mutation updateVacation(
        $id: ID
        $title: String
        $dates: [DayCreateWithoutTripInput!]
      ) {
        updateVacation(
          data: { title: $title, dates: { create: $dates } }
          where: {id: $id}
        ) {
          id
          title
          dates {
            id
            date
          }
        }
      }
    `;
    await expect(client.mutate({
      mutation: UPDATE_VACATION, variables: {id: vacationID, title: "Mexico", dates: [ {date: "2023-05-02"},{ date: "2023-05-03"},{date: "2023-05-04"},{date: "2023-05-05"}]}
    })).rejects.toThrowError("Authentication required");
  })


  test('should update a vacation by an authenticated user ', async () => {
    const UPDATE_VACATION =gql`
      mutation updateVacation(
        $id: ID
        $title: String
        $dates: [DayCreateWithoutTripInput!]
      ) {
        updateVacation(
          data: { title: $title, dates: { create: $dates } }
          where: {id: $id}
        ) {
          id
          title
          dates {
            id
            date
          }
        }
      }
    `;
    const updateRes =  await authenticatedClient.mutate({
      mutation: UPDATE_VACATION, variables: {id: vacationID, title: "Peru", dates: [{date: '2021-07-26'},{date: '2021-07-27'},{date: '2021-07-28'},{date: '2021-07-29'}]
      }
    })
    expect(updateRes.data.updateVacation.title).toMatch("Peru")
  })


  test.skip('should delete a vacation', async () => {
    const DELETE_VACATION = gql`
      mutation deleteVacation($id: ID!) {
        deleteVacation(id: $id) {
          id
          title
        }
      }
    `;
  const deleteRes = await client.mutate({
    mutation: DELETE_VACATION, variables: {id: vacationID}
  })
  const exists = await prisma.$exists.vacation({id : deleteRes.data.deleteVacation.id});
    expect(exists).toBe(false);
  })
});