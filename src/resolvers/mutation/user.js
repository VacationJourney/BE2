import bcrypt from 'bcryptjs'
import {signToken} from '../../utils/token'

export const signUp = async (__,{ username, email, password } ,{ prisma } , info) => {
  const found = await prisma.user({ username });

  if (!found) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.createUser({
      username,
      email,
      password: hashedPassword,
    });
    const token = signToken(user);
    return {user, token};
  } 
  else if (found){
    return {
      message: `${username} already exists in DB!`
    }
  }
}

export const login = async (parent, { username, password }, ctx, info) => {
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

export const updateUser = async(
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

export const deleteUser = async (parent, args, { prisma }, info) => {
  return prisma.deleteUser(args);
}

