const bcrypt = require('bcryptjs');
const signToken = require('./signToken');
interface User {
	id: string;
	username: string;
	email: string;
	password: string
}

const resolvers = {
	Mutation: {
		// For the Users
		signUp: async (parent, { username, email, password }, ctx, info) => {
			const found = await ctx.prisma.user({ username });

			if (!found) {
				const hashedPassword: string = await bcrypt.hash(password, 10);
				const user: User = await ctx.prisma.createUser({
					username,
					email,
					password: hashedPassword,
				});
				return user;
			} else {
				return {
					message: `${username} already exists in DB!`,
				};
			}
		},
		login: async (parent, { username, password }, ctx, info) => {
			const user: User = await ctx.prisma.user({ username });

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
			const changes: User = await prisma.updateUser({
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
	UserRegResult: {
		__resolveType(obj, ctx, info) {
			if (obj.username) {
				return 'User';
			}
			if (obj.message) {
				return 'UserFoundError';
			}
			return null;
		},
	},
	
};

module.exports = resolvers;
