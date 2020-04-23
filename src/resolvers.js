const { GraphQLScalarType, Kind } = require('graphql');
const bcrypt = require('bcryptjs');
const signToken = require('./signToken');

const resolvers = {
	Mutation: {
		// For the Users
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

		userChanges: async (
			parent,
			{ id, username, name, email, password },
			{ prisma },
			info
		) => {
			const hashedPassword = await bcrypt.hash(password, 10);
			const changes = await prisma.updateUser({
				data: { username, name, email, password: hashedPassword },
				where: { id },
			});
			return changes;
		},

		deleteUser: async (parent, args, { user, prisma }, info) => {
			return prisma.deleteUser({ id: user.id });
		},

		// for the vacations
		newVacation: async (parent, args, { prisma }, info) => {
			const vacation = await prisma.createVacation({
				title: args.title,
				startDate: args.startDate,
				endDate: args.endDate,
				traveler: {
					connect: { id: args.userId },
				},
			});
			return vacation;
		},

		vacationChanges: async (
			parent,
			{ id, title, startDate, endDate },
			{ prisma },
			info
		) => {
			const changes = await prisma.updateVacation({
				data: { title, startDate, endDate },
				where: { id },
			});
			return changes;
		},

		deleteTrip(parent, { id }, { prisma }, info) {
			return prisma.deleteVacation({ id }, info);
		},

		// for the events
		newEvent: async (parent, args, { prisma }, info) => {
			const event = await prisma.createEvent({
				date: args.date,
				title: args.title,
				trip: {
					connect: { id: args.vacationId },
				},
			});
			return event;
		},

		eventChanges: async (
			parent,
			{ id, date, startTime, endTime, title, description },
			{ prisma },
			info
		) => {
			const event = await prisma.updateEvent({
				data: { date, startTime, endTime, title, description },
				where: { id },
			});
			return event;
		},
		deleteActivity(parent, { id }, { prisma }, info) {
			return prisma.deleteEvent({ id }, info);
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
		currentVacation: (parent, { id }, { prisma }) => {
			return prisma.vacation({ id });
		},
		eventInfo: (parent, { id }, { prisma }) => {
			return prisma.event({ id });
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
		events(parent, args, { prisma }) {
			return prisma
				.vacation({
					id: parent.id,
				})
				.events();
		},
	},
	Event: {
		trip(parent, args, { prisma }) {
			return prisma
				.event({
					id: parent.id,
				})
				.trip();
		},
	},
};

module.exports = resolvers;
