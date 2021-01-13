### Repo Built by:

|  [Jeremy J McWilliams](https://jeremyjmcwilliams.com)|
| :---------------------------------------------------: |
| [<img src="./assets/jeremy-mcwilliams.jpg" width = "200" />](https://github.com/J2Macwilliams)   |
|Full Stack Developer |
| [<img src="https://github.com/favicon.ico" width="30"> ](https://github.com/J2Macwilliams)   [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="30"> ](https://www.linkedin.com/in/jeremyjmcwilliams/) | 

# Journey 2 BackEnd

---
### Status:
*development*

---

### Pitch

As a Traveler, I find that travel decisions are based upon finances.<br />
 I need an application to plan, organize, budget, and guide me on my trips. 

**Goal**  
Help a client make vacation decisions based on finances, organize itinerary, and add subscriptions for followers.

### Tech Stack
- Prisma
- Docker-Compose
- PostgreSQL
- GraphQL
- Apollo-server
- JsonWebToken
- Bcryptjs
- Jest
- Env-cmd


### Environments
 - development
 - testing
 - production

 [ PRISMA ](https://www.prisma.io/)

 **ORM and more**

  - based on a data-model, prisma deploys/generates a query builder to a database. Works dynamically with GraphQL. Is able to generate graphql.schema files that can be imported into GraphQL server.

### Getting Started

**Docker-Compose**

- for local development and testing.
RUN -
`docker-compose -up -d`
to establish docker environment for Prisma and PostgreSQL DB locally.

---

### DEVELOPMENT

1. `cd prisma`
2. `prisma deploy -e ../config/dev.env`
3. `prisma generate -e ../config/dev.env`
4. `prisma admin -e ../config/dev .env`  *prisma gui for tracking DB changes*
5. `cd ..`
-to app root
there--

**yarn dev** 

- connects to the local prisma dev environment
Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

-run queries and mutations (example)

```
mutation signUp($username: String!, $email: String, $password: String!) {
  signUp(username: $username, email: $email, password: $password) {
    __typename
    ... on SignUpResponse {
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

```
add variables as object
```
{
 "username": "JMac",
  "email": "jmac@gmail.com",
  "password": "Travel"
}

```
---
### TESTING

1. `cd prisma`
2. `prisma deploy -e ../config/test.env`
3. `prisma generate -e ../config/test.env`
4. `prisma admin -e ../config/test.env` *prisma gui for tracking DB changes*
5. `cd ..`
-to app root
there--

**yarn test**

- connects to the local prisma testing environment
-runs 3 test suites to test resolvers

---
### PRODUCTION

- *setUp heroku account*
- *create prisma.io account for production*

[Prisma SignUp](https://app.prisma.io/signup)

1. setUp prisma server (will prompt to login to heroku)
2. setUp database through prisma (postgres DB on heroku)
3. setUp prisma service (also will connect to heroku)
- prisma init "identifying name for DB"
>this will generate a new prisma folder, you only need the **url** in the prisma.yml*
4. setUp .env file with 
- PRISMA_ENDPOINT=url  
- JWT_SECRET=IsItSecret?!

*optional*
- setUp config/prod.env 
*follow instructions for development, except now with prod.env*

**yarn start**

- connects to prisma.io account for production
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

---

