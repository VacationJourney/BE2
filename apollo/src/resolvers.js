const bcrypt = require('bcryptjs');
const signToken = require('./signToken');
// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');
// const dayjs =require('dayjs')

const resolvers = {
	// DateTime: new GraphQLScalarType({
	//   name: 'DateTime',
	//   description: 'DateTime custom scalar type',
	//   parseValue(value) {
	// 	  console.log('parseValue:', value)
	// 	return new Date(value); // value from the client
	//   },
	//   serialize(value) {
	// 	return dayjs(value).format("MM-DD-YYYY"); // value sent to the client
	//   },
	//   parseLiteral(ast) {
	// 	if (ast.kind === Kind.STRING) {
	// 	  return dayjs(ast.value); // ast value is always in string format
	// 	}
	// 	return null;
	//   },
	// }),
	Mutation: {
		// For the Users
		signUp: async (parent, { username, email, password }, ctx, info) => {
			if (!username && !password) {
				return;
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				const user = await ctx.prisma.createUser({
					username,
					email,
					password: hashedPassword,
				});
				return user;
			}
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

		userUpdate: async (
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
		},

		deleteUser: async (parent, args, { prisma }, info) => {
			return prisma.deleteUser(args.where);
		},

		// for the vacations
		createVacation: async (parent, args, { prisma }, info) => {
			const vacation = await prisma.createVacation(args.data);
			return vacation;
		},

		updateVacation: async (parent, args, { prisma }, info) => {
			const changes = await prisma.updateVacation(args);
			return changes;
		},

		deleteVacation(parent, args, { prisma }, info) {
			return prisma.deleteVacation(args.where);
		},
		deleteDay(parent, args, { prisma }, info) {
			return prisma.deleteDay(args.where);
		},

		// for the events
		createEvent: async (parent, args, { prisma }, info) => {
			const event = await prisma.createEvent(args.data);

			return event;
		},

		updateEvent: async (parent, args, { prisma }, info) => {
			const event = await prisma.updateEvent(args);
			return event;
		},
		deleteEvent(parent, args, { prisma }, info) {
			return prisma.deleteEvent(args.where);
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
		vacations: async (parent, args, { user, prisma }) => {
			if (!user) {
				throw new Error('Not Authenticated');
			}
			return await prisma.user({ id: user.id }).vacations();
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
	},
	User: {
		vacations(parent, args, { prisma }) {
			return prisma
				.user({
					id: parent.id,
				})
				.vacations();
		},
	},
	Vacation: {
		dates(parent, args, { prisma }) {
			return prisma
				.vacation({
					id: parent.id,
				})
				.dates();
		},
	},
	Day: {
		events(parent, args, { prisma }) {
			return prisma.day({ id: parent.id }).events();
		},
	},
	Event: {
		date(parent, args, { prisma }) {
			return prisma.event({
				id: parent.id,
			});
		},
	},
};

module.exports = resolvers;
