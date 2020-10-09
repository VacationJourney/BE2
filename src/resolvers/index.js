import { Mutation } from './mutation'
import { Query } from './query/Query';
import * as Helpers from './GQLHelpers'

const resolvers = {
  Mutation,
  Query,
  ...Helpers
}


export default resolvers;