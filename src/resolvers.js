const { GraphQLScalarType, Kind } = require('graphql');
const bcrypt = require('bcryptjs');
const signToken = require('./signToken');

const resolvers = {
	Mutation: {
		signUp: async (parent, { username, name, email, password }, ctx, info) => {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await ctx.prisma.createUser({
				username,
				name,
				email,
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
		newVacation: async (parent, args, ctx, info) => {
			const vacation = await ctx.prisma.createVacation({
				title: args.title,
				startDate: args.startDate,
				endDate: args.endDate,
				traveler: {
					connect: { id: args.userId },
				},
			});
			return vacation;
		},
		deleteTrip(parent, { id }, ctx, info) {
			return ctx.prisma.deleteVacation({ id }, info);
		},
		newEvent: async (parent, args, ctx, info) => {
			const event = await ctx.prisma.createEvent({
				date: args.date,
				title: args.title,
				trip: {
					connect: { id: args.vacationId },
				},
			});
			return event;
		},
		deleteActivity(parent, { id }, ctx, info) {
			return ctx.prisma.deleteEvent({ id }, info);
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
		userVacations: (parent, args, { user, prisma }) => {
			return prisma.user({ id: user.id }).vacations();
		},
		currentVacation: (parent, {id}, { prisma }) => {
			return prisma.vacation({id});
		},
		eventInfo: (parent, {id}, {prisma}) => {
			return prisma.event({id})
		}
	},
	User: {
		vacations(parent, args, ctx) {
			return ctx.prisma
				.user({
					id: parent.id,
				})
				.vacations();
		},
	},
	Vacation: {
		events(parent, args, ctx) {
			return ctx.prisma
				.vacation({
					id: parent.id,
				})
				.events();
		},
	},
	Event: {
		trip(parent, args, ctx) {
			return ctx.prisma
				.event({
					id: parent.id,
				})
				.trip();
		},
	},
};

module.exports = resolvers;
