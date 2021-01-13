const { decodeToken } = require('../../utils/token');

const Query = {
  currentUser: (__, args, { req, prisma }) => {
    // this if statement is our authentication check
    const { id } = decodeToken(req);
    return prisma.user({ id });
  },
  vacations: async (__, args, { req, prisma }) => {
    // const { id }= decodeToken(req);
    const { where: { id } } = args
    return await prisma.user({ id }).vacations();
  },
  vacation: (parent, args, { prisma }) => {
    return prisma.vacation(args.where);
  },
  day: (parent, args, { prisma }) => {
    return prisma.day(args.where);
  },
  event: (parent, args, { prisma }) => {
    return prisma.event(args.where);
  },
}

module.exports = Query