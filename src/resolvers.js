const bcrypt = require('bcryptjs');
const signToken = require('./signToken');

const resolvers = {
	Mutation: {
		signUp: async (parent, { username, password }, ctx, info) => {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await ctx.prisma.createUser({
				username,
				password: hashedPassword,
			});
			return user;
		},
		login: async (parent, { username, password }, ctx, info) => {
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
		},
	},
	Query: {
		currentUser: (parent, args, { user, prisma }) => {
			// this if statement is our authentication check
			if (!user) {
				throw new Error('Not Authenticated');
			}
			return prisma.user({ id: user.id });
		},
	},
};

module.exports = resolvers;
