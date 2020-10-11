require('cross-fetch/polyfill')
const {gql} = require('apollo-boost');
const {prisma} = require('../src/generated');
const {client} = require('./utils');

beforeAll(async () => {
  await prisma.deleteManyUsers()
})

describe('Tests the User Crud', () => {
// SIGN_UP mutation
  test('should successfully create a user with valid credentials', async () => {
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

     const res = await client.mutate({
      mutation: SIGN_UP
    })
    
    
    const exists = await prisma.$exists.user({id : res.data.signUp.id});
    expect(exists).toBe(true);
  });

// SIGN_UP mutation
  test('should not create two identical users', async () => {
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

  expect(signUpRes.data.signUp.message).toMatch("JMac already exists in DB!")
  })

// LOGIN Mutation
  test('should login a user with the correct credentials and return a token', async () => {
    const LOGIN = gql`
    mutation {
      login(
        username: "JMac",
        password: "Kansas"
      ){
        token
        user {
          id
          username
        }
      }
    }
    `;
    const loginRes = await client.mutate({
      mutation: LOGIN
    })
    
    expect(loginRes.data.login.user.username).toMatch("JMac")
    expect(loginRes.data.login.token).toBeTruthy()
  })

// LOGIN Mutation
  test('should not be able to login with the wrong credentials', async () => {
    const LOGIN = gql`
    mutation {
      login(
        username: "Pickles",
        password: "Crunchy"
      ){
        token
        user {
          id
          username
        }
      }
    }
    `;
    await expect(client.mutate({
      mutation: LOGIN
    })).rejects.toThrowError("Invalid Login");
    })

// UPDATE_USER
    test('should update a user with a change', async () => {
      // snag the user id from the prisma admin gui
      const LOGIN = gql`
        mutation login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
            user {
              id
              username
            }
          }
        }
      `;
    
      const UPDATE_USER = gql`
        mutation updateUser($id: ID!, $username: String, $email: String, $password: String){
          updateUser(id: $id, username: $username, email: $email, password: $password){
            username
            email
          }
        }
      `;

      const loginRes = await client.mutate({
        mutation: LOGIN, variables: {username: "JMac", password: "Kansas"}
      })
      const updateRes = await client.mutate({
        mutation: UPDATE_USER, variables: { id: loginRes.data.login.user.id, username: "Jeremy", email: "pizza@pie.com", password: "Kansas"}
      })

      expect(updateRes.data.updateUser.username).toMatch("Jeremy")
    })

// DELETE_USER
    test('should delete a user from the DB', async () => {
      const LOGIN = gql`
        mutation login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            token
            user {
              id
              username
            }
          }
      }
      `;

      const DELETE_USER = gql`
        mutation deleteUser($id: ID!){
        deleteUser(id: $id){
          id
          username
        }
      }
      `
      const loginRes = await client.mutate({
        mutation: LOGIN, variables: {username: "Jeremy", password: "Kansas"}
      })

      const deleteRes = await client.mutate({
        mutation: DELETE_USER, variables: {id: loginRes.data.login.user.id}
      })
      // confirm correct username is returned from mutation
      expect(deleteRes.data.deleteUser.username).toMatch("Jeremy")
      // Check DB to confirm User is deleted
      const exists = await prisma.$exists.user({id : loginRes.data.login.user.id});
      expect(exists).toBe(false);
    })
  
})