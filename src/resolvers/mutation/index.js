import * as User from './user'
import * as Vacation from './vacation'

export const Mutation = {
  ...User,
  ...Vacation
}