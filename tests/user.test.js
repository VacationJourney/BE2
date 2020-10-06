import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import { prisma } from '../src/generated/prisma-client';
import { client } from './utils';

beforeAll(async () => {
  await prisma.deleteManyUsers()
})

describe('Tests the User Crud', () => {
  it('should successfully create a user with valid credentials', async () => {
    const signUp = gql`
            mutation {
              signUp(
                username: "JMac",
                email: "jeremy@mac.com",
                password: "Kansas"
              ){
               ...on User {
                 id
                 username
                 email
               }
               ... on UserFoundError {
                 message
               }
              }
            }
            `;

     const res = await client.mutate({
      mutation: signUp
    })
    
    
    const exists = await prisma.$exists.user({id : res.data.signUp.id});
    expect(exists).toBe(true);
  });
  it('should not create two identical users', async () => {
    const signUp = gql`
            mutation {
              signUp(
                username: "JMac",
                email: "jeremy@mac.com",
                password: "Kansas"
              ){
                ...on User {
                  username
               }
               ... on UserFoundError {
                 message
               }
              }
            }
            `;

  await expect(client.mutate({
    mutation: signUp
  })).rejects.toThrowError("JMac already exists in DB!");
  })
// Login Mutation
  it('should login a user with the correct credentials and return a token', async () => {
    const login = gql`
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
      mutation: login
    })
    
    expect(loginRes.data.login.user.username).toMatch("JMac")
    expect(loginRes.data.login.token).toBeTruthy()
  })

  it('should not be able to login with the wrong credentials', async () => {
    const login = gql`
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
      mutation: login
    })).rejects.toThrowError("Invalid Login");
    })
// Update user
    it('should update a user with a change', async () => {
      // snag the user id from the prisma admin gui
      const login = gql`
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
    
      const updateUser = gql`
        mutation updateUser($id: ID!, $username: String, $email: String, $password: String){
          updateUser(id: $id, username: $username, email: $email, password: $password){
            username
            email
          }
        }
      `;

      const loginRes = await client.mutate({
        mutation: login, variables: {username: "JMac", password: "Kansas"}
      })
    
      const updateRes = await client.mutate({
        mutation: updateUser, variables: { id: loginRes.data.login.user.id, username: "Jeremy", email: "pizza@pie.com", password: "Kansas"}
      })
      expect(updateRes.data.updateUser.username).toMatch("Jeremy")
    })
// Delete User
    it('should delete a user from the DB', async () => {
      const login = gql`
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

      const deleteUser = gql`
        mutation deleteUser($id: ID!){
        deleteUser(where: {id: $id}){
          id
          username
        }
      }
      `
      const loginRes = await client.mutate({
        mutation: login, variables: {username: "Jeremy", password: "Kansas"}
      })

      const deleteRes = await client.mutate({
        mutation: deleteUser, variables: {id: loginRes.data.login.user.id}
      })
      // confirm correct username is returned from mutation
      expect(deleteRes.data.deleteUser.username).toMatch("Jeremy")
      // Check DB to confirm User is deleted
      const exists = await prisma.$exists.user({id : loginRes.data.login.user.id});
      expect(exists).toBe(false);
    })
  
})