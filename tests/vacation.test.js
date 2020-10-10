import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated';
import { getClient } from './utils';
const client = getClient();
let authenticatedClient;
let vacationID;
let dateID;

// First - Set up clean slate environment
// Second - Create Authenticated environment

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


describe('Tests Authenticated Current User & the Vacation Resolver Logic', () => {
  // CURRENT_USER Query
  test('should not query for current user without authentication', async () => {
    const CURRENT_USER = gql`
        query currentUser {
        currentUser {
          id
          username
          email
          vacations{
            id
            title
            dates{
              id
              date
              events{
                id
                title
              }
            }
          }
        }
      }
    `;

    await expect(client.query({query: CURRENT_USER})).rejects.toThrowError("Authentication required")

  })

 // CURRENT_USER Query
  test('should not query for current user without authentication', async () => {
    const CURRENT_USER = gql`
        query currentUser {
        currentUser {
          id
          username
          email
          vacations{
            id
            title
            dates{
              id
              date
              events{
                id
                title
              }
            }
          }
        }
      }
    `;
    const currentUserRes = await authenticatedClient.query({
      query: CURRENT_USER
    })
    expect(currentUserRes.data.currentUser.username).toMatch("JMac")
  })

// CREATE_VACATION mutation
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

// CREATE_VACATION mutation
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

// single VACATION query
  test('should query for a single vacation', async () => {
    const VACATION = gql`
        query vacation($id: ID!){
          vacation(where: {id: $id}){
            id
            title
            dates{
              id
              date
              events{
                id
                title
              }
            }
          }
        }
    `;

    const vacationQueryRes = await client.query({
      query: VACATION, variables: {id: vacationID}
    })
    expect(vacationQueryRes.data.vacation.title).toMatch("Hawaii")
  })

// UPDATE_VACATION mutation
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

// UPDATE_VACATION mutation
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
    dateID = updateRes.data.updateVacation.dates[0].id
  })

// VACATIONS query
  test('should not return the vacations if not authenticated', async () => {
    const VACATIONS = gql`
        query vacations {
          vacations{
            id
            title
            dates{
              id
              date
              events{
                id
                title
              }
            }
          }
        }
    `;
    await expect(client.query({
      query: VACATIONS
    })).rejects.toThrowError("Authentication required");

  })

// VACATIONS query
  test('should return the vacations if authenticated', async () => {
    const VACATIONS = gql`
        query vacations {
          vacations{
            id
            title
            dates{
              id
              date
              events{
                id
                title
              }
            }
          }
        }
    `;
    const vacationQueryRes = await authenticatedClient.query({
      query: VACATIONS
    })
    
    expect(vacationQueryRes.data.vacations[0].title).toMatch("Peru")
  })

// DELETE_DAY mutation
  test('should delete a day', async () => {
    const DELETE_DAY = gql`
      mutation deleteDay($id: ID!){
        deleteDay(id: $id){
          id
          date
        }
      }
    ` 
    const deleteDayRes = await client.mutate({
      mutation: DELETE_DAY, variables: { id: dateID }
    })
    const exists = await prisma.$exists.event({id : deleteDayRes.data.deleteDay.id});
    expect(exists).toBe(false);
    
  })

// DELETE_VACATION mutation
  test('should delete a vacation', async () => {
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