const {gql} = require('apollo-server');

const typeDefs = gql`
type AggregateDay {
  count: Int!
}

type AggregateEvent {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVacation {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Day {
  id: ID!
  date: String!
  cost: Int
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event!]
  trip: Vacation
}

type DayConnection {
  pageInfo: PageInfo!
  edges: [DayEdge]!
  aggregate: AggregateDay!
}

input DayCreateInput {
  id: ID
  date: String!
  cost: Int
  events: EventCreateManyWithoutDateInput
  trip: VacationCreateOneWithoutDatesInput
}

input DayCreateManyWithoutTripInput {
  create: [DayCreateWithoutTripInput!]
  connect: [DayWhereUniqueInput!]
}

input DayCreateOneWithoutEventsInput {
  create: DayCreateWithoutEventsInput
  connect: DayWhereUniqueInput
}

input DayCreateWithoutEventsInput {
  id: ID
  date: String!
  cost: Int
  trip: VacationCreateOneWithoutDatesInput
}

input DayCreateWithoutTripInput {
  id: ID
  date: String!
  cost: Int
  events: EventCreateManyWithoutDateInput
}

type DayEdge {
  node: Day!
  cursor: String!
}

enum DayOrderByInput {
  id_ASC
  id_DESC
  date_ASC
  date_DESC
  cost_ASC
  cost_DESC
}

type DayPreviousValues {
  id: ID!
  date: String!
  cost: Int
}

input DayScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  date: String
  date_not: String
  date_in: [String!]
  date_not_in: [String!]
  date_lt: String
  date_lte: String
  date_gt: String
  date_gte: String
  date_contains: String
  date_not_contains: String
  date_starts_with: String
  date_not_starts_with: String
  date_ends_with: String
  date_not_ends_with: String
  cost: Int
  cost_not: Int
  cost_in: [Int!]
  cost_not_in: [Int!]
  cost_lt: Int
  cost_lte: Int
  cost_gt: Int
  cost_gte: Int
  AND: [DayScalarWhereInput!]
  OR: [DayScalarWhereInput!]
  NOT: [DayScalarWhereInput!]
}

type DaySubscriptionPayload {
  mutation: MutationType!
  node: Day
  updatedFields: [String!]
  previousValues: DayPreviousValues
}

input DaySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DayWhereInput
  AND: [DaySubscriptionWhereInput!]
  OR: [DaySubscriptionWhereInput!]
  NOT: [DaySubscriptionWhereInput!]
}

input DayUpdateInput {
  date: String
  cost: Int
  events: EventUpdateManyWithoutDateInput
  trip: VacationUpdateOneWithoutDatesInput
}

input DayUpdateManyDataInput {
  date: String
  cost: Int
}

input DayUpdateManyMutationInput {
  date: String
  cost: Int
}

input DayUpdateManyWithoutTripInput {
  create: [DayCreateWithoutTripInput!]
  delete: [DayWhereUniqueInput!]
  connect: [DayWhereUniqueInput!]
  set: [DayWhereUniqueInput!]
  disconnect: [DayWhereUniqueInput!]
  update: [DayUpdateWithWhereUniqueWithoutTripInput!]
  upsert: [DayUpsertWithWhereUniqueWithoutTripInput!]
  deleteMany: [DayScalarWhereInput!]
  updateMany: [DayUpdateManyWithWhereNestedInput!]
}

input DayUpdateManyWithWhereNestedInput {
  where: DayScalarWhereInput!
  data: DayUpdateManyDataInput!
}

input DayUpdateOneWithoutEventsInput {
  create: DayCreateWithoutEventsInput
  update: DayUpdateWithoutEventsDataInput
  upsert: DayUpsertWithoutEventsInput
  delete: Boolean
  disconnect: Boolean
  connect: DayWhereUniqueInput
}

input DayUpdateWithoutEventsDataInput {
  date: String
  cost: Int
  trip: VacationUpdateOneWithoutDatesInput
}

input DayUpdateWithoutTripDataInput {
  date: String
  cost: Int
  events: EventUpdateManyWithoutDateInput
}

input DayUpdateWithWhereUniqueWithoutTripInput {
  where: DayWhereUniqueInput!
  data: DayUpdateWithoutTripDataInput!
}

input DayUpsertWithoutEventsInput {
  update: DayUpdateWithoutEventsDataInput!
  create: DayCreateWithoutEventsInput!
}

input DayUpsertWithWhereUniqueWithoutTripInput {
  where: DayWhereUniqueInput!
  update: DayUpdateWithoutTripDataInput!
  create: DayCreateWithoutTripInput!
}

input DayWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  date: String
  date_not: String
  date_in: [String!]
  date_not_in: [String!]
  date_lt: String
  date_lte: String
  date_gt: String
  date_gte: String
  date_contains: String
  date_not_contains: String
  date_starts_with: String
  date_not_starts_with: String
  date_ends_with: String
  date_not_ends_with: String
  cost: Int
  cost_not: Int
  cost_in: [Int!]
  cost_not_in: [Int!]
  cost_lt: Int
  cost_lte: Int
  cost_gt: Int
  cost_gte: Int
  events_every: EventWhereInput
  events_some: EventWhereInput
  events_none: EventWhereInput
  trip: VacationWhereInput
  AND: [DayWhereInput!]
  OR: [DayWhereInput!]
  NOT: [DayWhereInput!]
}

input DayWhereUniqueInput {
  id: ID
}

type Event {
  id: ID!
  title: String!
  date: Day
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

type EventConnection {
  pageInfo: PageInfo!
  edges: [EventEdge]!
  aggregate: AggregateEvent!
}

input EventCreateInput {
  id: ID
  title: String!
  date: DayCreateOneWithoutEventsInput
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

input EventCreateManyWithoutDateInput {
  create: [EventCreateWithoutDateInput!]
  connect: [EventWhereUniqueInput!]
}

input EventCreateWithoutDateInput {
  id: ID
  title: String!
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

type EventEdge {
  node: Event!
  cursor: String!
}

enum EventOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  startTime_ASC
  startTime_DESC
  endTime_ASC
  endTime_DESC
  location_ASC
  location_DESC
  contact_ASC
  contact_DESC
  cost_ASC
  cost_DESC
  description_ASC
  description_DESC
}

type EventPreviousValues {
  id: ID!
  title: String!
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

input EventScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  startTime: String
  startTime_not: String
  startTime_in: [String!]
  startTime_not_in: [String!]
  startTime_lt: String
  startTime_lte: String
  startTime_gt: String
  startTime_gte: String
  startTime_contains: String
  startTime_not_contains: String
  startTime_starts_with: String
  startTime_not_starts_with: String
  startTime_ends_with: String
  startTime_not_ends_with: String
  endTime: String
  endTime_not: String
  endTime_in: [String!]
  endTime_not_in: [String!]
  endTime_lt: String
  endTime_lte: String
  endTime_gt: String
  endTime_gte: String
  endTime_contains: String
  endTime_not_contains: String
  endTime_starts_with: String
  endTime_not_starts_with: String
  endTime_ends_with: String
  endTime_not_ends_with: String
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  contact: String
  contact_not: String
  contact_in: [String!]
  contact_not_in: [String!]
  contact_lt: String
  contact_lte: String
  contact_gt: String
  contact_gte: String
  contact_contains: String
  contact_not_contains: String
  contact_starts_with: String
  contact_not_starts_with: String
  contact_ends_with: String
  contact_not_ends_with: String
  cost: Int
  cost_not: Int
  cost_in: [Int!]
  cost_not_in: [Int!]
  cost_lt: Int
  cost_lte: Int
  cost_gt: Int
  cost_gte: Int
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [EventScalarWhereInput!]
  OR: [EventScalarWhereInput!]
  NOT: [EventScalarWhereInput!]
}

type EventSubscriptionPayload {
  mutation: MutationType!
  node: Event
  updatedFields: [String!]
  previousValues: EventPreviousValues
}

input EventSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: EventWhereInput
  AND: [EventSubscriptionWhereInput!]
  OR: [EventSubscriptionWhereInput!]
  NOT: [EventSubscriptionWhereInput!]
}

input EventUpdateInput {
  title: String
  date: DayUpdateOneWithoutEventsInput
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
  dateId: ID
  tripId: ID
}

input EventUpdateManyDataInput {
  title: String
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

input EventUpdateManyMutationInput {
  title: String
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

input EventUpdateManyWithoutDateInput {
  create: [EventCreateWithoutDateInput!]
  delete: [EventWhereUniqueInput!]
  connect: [EventWhereUniqueInput!]
  set: [EventWhereUniqueInput!]
  disconnect: [EventWhereUniqueInput!]
  update: [EventUpdateWithWhereUniqueWithoutDateInput!]
  upsert: [EventUpsertWithWhereUniqueWithoutDateInput!]
  deleteMany: [EventScalarWhereInput!]
  updateMany: [EventUpdateManyWithWhereNestedInput!]
}

input EventUpdateManyWithWhereNestedInput {
  where: EventScalarWhereInput!
  data: EventUpdateManyDataInput!
}

input EventUpdateWithoutDateDataInput {
  title: String
  startTime: String
  endTime: String
  location: String
  contact: String
  cost: Int
  description: String
}

input EventUpdateWithWhereUniqueWithoutDateInput {
  where: EventWhereUniqueInput!
  data: EventUpdateWithoutDateDataInput!
}

input EventUpsertWithWhereUniqueWithoutDateInput {
  where: EventWhereUniqueInput!
  update: EventUpdateWithoutDateDataInput!
  create: EventCreateWithoutDateInput!
}

input EventWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  date: DayWhereInput
  startTime: String
  startTime_not: String
  startTime_in: [String!]
  startTime_not_in: [String!]
  startTime_lt: String
  startTime_lte: String
  startTime_gt: String
  startTime_gte: String
  startTime_contains: String
  startTime_not_contains: String
  startTime_starts_with: String
  startTime_not_starts_with: String
  startTime_ends_with: String
  startTime_not_ends_with: String
  endTime: String
  endTime_not: String
  endTime_in: [String!]
  endTime_not_in: [String!]
  endTime_lt: String
  endTime_lte: String
  endTime_gt: String
  endTime_gte: String
  endTime_contains: String
  endTime_not_contains: String
  endTime_starts_with: String
  endTime_not_starts_with: String
  endTime_ends_with: String
  endTime_not_ends_with: String
  location: String
  location_not: String
  location_in: [String!]
  location_not_in: [String!]
  location_lt: String
  location_lte: String
  location_gt: String
  location_gte: String
  location_contains: String
  location_not_contains: String
  location_starts_with: String
  location_not_starts_with: String
  location_ends_with: String
  location_not_ends_with: String
  contact: String
  contact_not: String
  contact_in: [String!]
  contact_not_in: [String!]
  contact_lt: String
  contact_lte: String
  contact_gt: String
  contact_gte: String
  contact_contains: String
  contact_not_contains: String
  contact_starts_with: String
  contact_not_starts_with: String
  contact_ends_with: String
  contact_not_ends_with: String
  cost: Int
  cost_not: Int
  cost_in: [Int!]
  cost_not_in: [Int!]
  cost_lt: Int
  cost_lte: Int
  cost_gt: Int
  cost_gte: Int
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [EventWhereInput!]
  OR: [EventWhereInput!]
  NOT: [EventWhereInput!]
}

input EventWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createDay(data: DayCreateInput!): Day!
  updateDay(data: DayUpdateInput!, where: DayWhereUniqueInput!): Day
  updateManyDays(data: DayUpdateManyMutationInput!, where: DayWhereInput): BatchPayload!
  upsertDay(where: DayWhereUniqueInput!, create: DayCreateInput!, update: DayUpdateInput!): Day!
  # deleteDay(where: DayWhereUniqueInput!): Day
  deleteManyDays(where: DayWhereInput): BatchPayload!
  createEvent(data: EventCreateInput!): Event!
  updateEvent( data: EventUpdateInput!, where: EventWhereUniqueInput!): Event
  updateManyEvents(data: EventUpdateManyMutationInput!, where: EventWhereInput): BatchPayload!
  upsertEvent(where: EventWhereUniqueInput!, create: EventCreateInput!, update: EventUpdateInput!): Event!
  # deleteEvent(where: EventWhereUniqueInput!): Event
  deleteManyEvents(where: EventWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  # updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  # deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVacation(data: VacationCreateInput!): Vacation!
  updateVacation(data: VacationUpdateInput!, where: VacationWhereUniqueInput!): Vacation
  updateManyVacations(data: VacationUpdateManyMutationInput!, where: VacationWhereInput): BatchPayload!
  upsertVacation(where: VacationWhereUniqueInput!, create: VacationCreateInput!, update: VacationUpdateInput!): Vacation!
  # deleteVacation(where: VacationWhereUniqueInput!): Vacation
  deleteManyVacations(where: VacationWhereInput): BatchPayload!

   # by owner
  signUp(username: String, email: String , password: String) : UserRegResult!
  login(username: String, password: String): LoginResponse!
  updateUser(id: ID!, username: String, email: String, password: String): User
  deleteUser(id: ID!): User
  deleteDay(id: ID!, tripId: ID!): Day
  deleteEvent(id: ID!, dayId: ID!, tripId: ID!): Event
  deleteVacation(id: ID!): Vacation
  updateDayCost( where: DayWhereUniqueInput!): Day
  updateVacationCost( where: VacationWhereUniqueInput!): Vacation
  updateCost( dateId: ID!): Vacation
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  day(where: DayWhereUniqueInput!): Day
  days(where: DayWhereInput, orderBy: DayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Day]!
  daysConnection(where: DayWhereInput, orderBy: DayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DayConnection!
  event(where: EventWhereUniqueInput!): Event
  events(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Event]!
  eventsConnection(where: EventWhereInput, orderBy: EventOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EventConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  vacation(where: VacationWhereUniqueInput!): Vacation
  vacations(where: VacationWhereInput, orderBy: VacationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Vacation]!
  vacationsConnection(where: VacationWhereInput, orderBy: VacationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VacationConnection!
  node(id: ID!): Node

   # by owner
   currentUser: User!
}

type Subscription {
  day(where: DaySubscriptionWhereInput): DaySubscriptionPayload
  event(where: EventSubscriptionWhereInput): EventSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  vacation(where: VacationSubscriptionWhereInput): VacationSubscriptionPayload
}

type User {
  id: ID!
  username: String!
  email: String
  password: String!
  vacations(where: VacationWhereInput, orderBy: VacationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Vacation!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  username: String!
  email: String
  password: String!
  vacations: VacationCreateManyWithoutTravelerInput
}

input UserCreateOneWithoutVacationsInput {
  create: UserCreateWithoutVacationsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutVacationsInput {
  id: ID
  username: String!
  email: String
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
}

type UserPreviousValues {
  id: ID!
  username: String!
  email: String
  password: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  username: String
  email: String
  password: String
  vacations: VacationUpdateManyWithoutTravelerInput
}

input UserUpdateManyMutationInput {
  username: String
  email: String
  password: String
}

input UserUpdateOneWithoutVacationsInput {
  create: UserCreateWithoutVacationsInput
  update: UserUpdateWithoutVacationsDataInput
  upsert: UserUpsertWithoutVacationsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutVacationsDataInput {
  username: String
  email: String
  password: String
}

input UserUpsertWithoutVacationsInput {
  update: UserUpdateWithoutVacationsDataInput!
  create: UserCreateWithoutVacationsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  vacations_every: VacationWhereInput
  vacations_some: VacationWhereInput
  vacations_none: VacationWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
}

type Vacation {
  id: ID!
  title: String!
  budget: Int
  cost: Int
  dates(where: DayWhereInput, orderBy: DayOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Day!]
  dreams: String
  traveler: User
}

type VacationConnection {
  pageInfo: PageInfo!
  edges: [VacationEdge]!
  aggregate: AggregateVacation!
}

input VacationCreateInput {
  id: ID
  title: String!
  budget: Int
  cost: Int
  dates: DayCreateManyWithoutTripInput
  dreams: String
  traveler: UserCreateOneWithoutVacationsInput
}

input VacationCreateManyWithoutTravelerInput {
  create: [VacationCreateWithoutTravelerInput!]
  connect: [VacationWhereUniqueInput!]
}

input VacationCreateOneWithoutDatesInput {
  create: VacationCreateWithoutDatesInput
  connect: VacationWhereUniqueInput
}

input VacationCreateWithoutDatesInput {
  id: ID
  title: String!
  budget: Int
  cost: Int
  dreams: String
  traveler: UserCreateOneWithoutVacationsInput
}

input VacationCreateWithoutTravelerInput {
  id: ID
  title: String!
  budget: Int
  cost: Int
  dates: DayCreateManyWithoutTripInput
  dreams: String
}

type VacationEdge {
  node: Vacation!
  cursor: String!
}

enum VacationOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  budget_ASC
  budget_DESC
  cost_ASC
  cost_DESC
  dreams_ASC
  dreams_DESC
}

type VacationPreviousValues {
  id: ID!
  title: String!
  budget: Int
  cost: Int
  dreams: String
}

input VacationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  budget: Int
  budget_not: Int
  budget_in: [Int!]
  budget_not_in: [Int!]
  budget_lt: Int
  budget_lte: Int
  budget_gt: Int
  budget_gte: Int
  cost: Int
  cost_not: Int
  cost_in: [Int!]
  cost_not_in: [Int!]
  cost_lt: Int
  cost_lte: Int
  cost_gt: Int
  cost_gte: Int
  dreams: String
  dreams_not: String
  dreams_in: [String!]
  dreams_not_in: [String!]
  dreams_lt: String
  dreams_lte: String
  dreams_gt: String
  dreams_gte: String
  dreams_contains: String
  dreams_not_contains: String
  dreams_starts_with: String
  dreams_not_starts_with: String
  dreams_ends_with: String
  dreams_not_ends_with: String
  AND: [VacationScalarWhereInput!]
  OR: [VacationScalarWhereInput!]
  NOT: [VacationScalarWhereInput!]
}

type VacationSubscriptionPayload {
  mutation: MutationType!
  node: Vacation
  updatedFields: [String!]
  previousValues: VacationPreviousValues
}

input VacationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VacationWhereInput
  AND: [VacationSubscriptionWhereInput!]
  OR: [VacationSubscriptionWhereInput!]
  NOT: [VacationSubscriptionWhereInput!]
}

input VacationUpdateInput {
  title: String
  budget: Int
  cost: Int
  dates: DayUpdateManyWithoutTripInput
  dreams: String
  traveler: UserUpdateOneWithoutVacationsInput
}

input VacationUpdateManyDataInput {
  title: String
  budget: Int
  cost: Int
  dreams: String
}

input VacationUpdateManyMutationInput {
  title: String
  budget: Int
  cost: Int
  dreams: String
}

input VacationUpdateManyWithoutTravelerInput {
  create: [VacationCreateWithoutTravelerInput!]
  delete: [VacationWhereUniqueInput!]
  connect: [VacationWhereUniqueInput!]
  set: [VacationWhereUniqueInput!]
  disconnect: [VacationWhereUniqueInput!]
  update: [VacationUpdateWithWhereUniqueWithoutTravelerInput!]
  upsert: [VacationUpsertWithWhereUniqueWithoutTravelerInput!]
  deleteMany: [VacationScalarWhereInput!]
  updateMany: [VacationUpdateManyWithWhereNestedInput!]
}

input VacationUpdateManyWithWhereNestedInput {
  where: VacationScalarWhereInput!
  data: VacationUpdateManyDataInput!
}

input VacationUpdateOneWithoutDatesInput {
  create: VacationCreateWithoutDatesInput
  update: VacationUpdateWithoutDatesDataInput
  upsert: VacationUpsertWithoutDatesInput
  delete: Boolean
  disconnect: Boolean
  connect: VacationWhereUniqueInput
}

input VacationUpdateWithoutDatesDataInput {
  title: String
  budget: Int
  cost: Int
  dreams: String
  traveler: UserUpdateOneWithoutVacationsInput
}

input VacationUpdateWithoutTravelerDataInput {
  title: String
  budget: Int
  cost: Int
  dates: DayUpdateManyWithoutTripInput
  dreams: String
}

input VacationUpdateWithWhereUniqueWithoutTravelerInput {
  where: VacationWhereUniqueInput!
  data: VacationUpdateWithoutTravelerDataInput!
}

input VacationUpsertWithoutDatesInput {
  update: VacationUpdateWithoutDatesDataInput!
  create: VacationCreateWithoutDatesInput!
}

input VacationUpsertWithWhereUniqueWithoutTravelerInput {
  where: VacationWhereUniqueInput!
  update: VacationUpdateWithoutTravelerDataInput!
  create: VacationCreateWithoutTravelerInput!
}

input VacationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  budget: Int
  budget_not: Int
  budget_in: [Int!]
  budget_not_in: [Int!]
  budget_lt: Int
  budget_lte: Int
  budget_gt: Int
  budget_gte: Int
  cost: Int
  cost_not: Int
  cost_in: [Int!]
  cost_not_in: [Int!]
  cost_lt: Int
  cost_lte: Int
  cost_gt: Int
  cost_gte: Int
  dates_every: DayWhereInput
  dates_some: DayWhereInput
  dates_none: DayWhereInput
  dreams: String
  dreams_not: String
  dreams_in: [String!]
  dreams_not_in: [String!]
  dreams_lt: String
  dreams_lte: String
  dreams_gt: String
  dreams_gte: String
  dreams_contains: String
  dreams_not_contains: String
  dreams_starts_with: String
  dreams_not_starts_with: String
  dreams_ends_with: String
  dreams_not_ends_with: String
  traveler: UserWhereInput
  AND: [VacationWhereInput!]
  OR: [VacationWhereInput!]
  NOT: [VacationWhereInput!]
}

input VacationWhereUniqueInput {
  id: ID
}

# by owner
union UserRegResult = SignUpResponse | UserFoundError


type UserFoundError {
    message: String!
  }

type LoginResponse {
  token: String
  user: User
}

type SignUpResponse {
  token: String
  user: User
}

`
module.exports = typeDefs;