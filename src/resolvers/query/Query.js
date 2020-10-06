import { prisma } from '../../generated/prisma-client';
import { decodeToken } from '../../utils/token'

export const Query = {

  users: (parent, args, context, info) => {
    const { prisma } = context;
    return prisma.users();
  },

  user: (parent, args, ctx, info) => {
    return prisma.user()
  },

  me: (parent, args, context, info) => {
    const { prisma, req } = context;
    const { id }= decodeToken(req);
    return prisma.user({id})
  }
}