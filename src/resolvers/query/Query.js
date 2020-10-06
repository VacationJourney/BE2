import { prisma } from '../../generated/prisma-client';

export const Query = {

  users: (parent, args, context, info) => {
    const { prisma } = context;
    return prisma.users();
  },

  user: (parent, args, ctx, info) => {
    return prisma.user()
  },

  
}