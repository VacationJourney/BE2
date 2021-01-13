const bcrypt = require('bcryptjs');
// const {signToken, decodeToken} = require('../../utils/token');
const authorizeUser = async (parent, { username, email }, { prisma }, info) => {
  const user = await prisma.upsertUser({
    where: { email },
    create: { username, email },
    update: { username, email }
  })
  return user
}

const signUp = async (parent, { username, email, password }, ctx, info) => {
  const found = await ctx.prisma.user({ username });

  if (!found) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await ctx.prisma.createUser({
      username,
      email,
      password: hashedPassword,
    });
    // const token = signToken(user);
    return user;
  } else {
    return {

      message: `${username} already exists in DB!`,
    };
  }
}

const login = async (parent, { username, password }, ctx, info) => {
  const user = await ctx.prisma.user({ username });

  if (!user) {
    throw new Error('Invalid Login');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid Login');
  }

  const token = signToken(user);

  return {
    token,
    user,
  };
}

const updateUser = async (
  parent,
  { id, username, email, password },
  { prisma },
  info
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const changes = await prisma.updateUser({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    where: { id },
  });
  return changes;
}

const deleteUser = async (parent, args, { prisma }, info) => {
  return prisma.deleteUser(args);
}

module.exports = { authorizeUser, signUp, login, updateUser, deleteUser }