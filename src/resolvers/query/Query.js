import {decodeToken} from '../../utils/token'

export const Query = {

  users: (__, args, {prisma}, info) => {
    return prisma.users();
  },

  currentUser: (__, args, { req, prisma }) => {
    // this if statement is our authentication check
    const { id }= decodeToken(req);
    // if (!id) {
    //   throw new Error('Not Authenticated');
    // }
    return prisma.user({  id });
  },
  vacations: async (__, args, { req, prisma }) => {
    const { id }= decodeToken(req);
    // if (!id) {
    //   throw new Error('Not Authenticated');
    // }
    return await prisma.user({ id }).vacations();
  },

  vacation: (__, args, { prisma }) => {
    return prisma.vacation(args.where);
  },

  day: (__, args, { prisma }) => {
    return prisma.day(args.where);
  },

  event: (__, args, { prisma }) => {
    return prisma.event(args.where);
  },

}