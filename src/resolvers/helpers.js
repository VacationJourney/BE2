const User = {
  vacations(parent, args, { prisma }) {
    return prisma
      .user({
        id: parent.id,
      })
      .vacations();
  },
}

const Vacation = {
  dates(parent, args, { prisma }) {
    return prisma
      .vacation({
        id: parent.id,
      })
      .dates();
  },
}

const Day = {
  events(parent, args, { prisma }) {
    return prisma.day({ id: parent.id }).events({
      orderBy: args.orderBy
    });
  },
}

const Event = {
  date(parent, args, { prisma }) {
    return prisma.event({
      id: parent.id,
    });
  },
}

const UserRegResult = {
  __resolveType(obj, ctx, info) {
    if (obj.token) {
      return 'SignUpResponse';
    }
    if (obj.message) {
      return 'UserFoundError';
    }
    return null;
  },
}

const Node  = {
  __resolveType() {
    return null;
  }
}

module.exports = {User, Vacation, Day, Event, UserRegResult, Node}