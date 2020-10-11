const bcrypt = require('bcryptjs');
const {signToken, decodeToken} = require('../utils/token');

const resolvers = {
	Mutation: {
		// For the Users
		signUp: async (parent, { username, email, password }, ctx, info) => {
			const found = await ctx.prisma.user({ username });
			
			if (!found) {
				const hashedPassword = await bcrypt.hash(password, 10);
				const user = await ctx.prisma.createUser({
					username,
					email,
					password: hashedPassword,
				});
				const token = signToken(user);
				return { token, user};
			} else {
				return {
					
					message: `${username} already exists in DB!`,
				};
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
	
		updateUser: async (
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
	
		deleteUser: async (parent,args, { prisma }, info) => {
			return prisma.deleteUser(args);
		},
	
		// for the vacations
		createVacation: async (parent, args, { prisma, req }, info) => {
			const { data: { title, dates } } = args;
			const {id } = decodeToken(req)
			const vacation = await prisma.createVacation({
				title,
				dates,
				traveler: {
					connect: {id}
				}
	}, info);
	return vacation;
		},
	
		updateVacation: async (parent, args, { prisma, req }, info) => {
			await prisma.deleteManyDays()
			const {data: {title, dates}, where: {id}} = args;
			const {username } = decodeToken(req)
			const updatedVacation = await prisma.updateVacation({
			data: {title,
			dates,
			traveler: {
				connect: {username}
			}},
			where: {id: id}
			
	})
	return updatedVacation;
		},
	
		deleteVacation(parent, args, { prisma }, info) {
			return prisma.deleteVacation(args);
		},
		deleteDay(parent, args, { prisma }, info) {
			return prisma.deleteDay(args);
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
			return prisma.deleteEvent(args);
		},
	},
	Query:  {
		currentUser: (__, args, { req, prisma }) => {
			// this if statement is our authentication check
			const { id }= decodeToken(req);
			return prisma.user({  id });
		},
		vacations: async (__, args, { req, prisma }) => {
			const { id }= decodeToken(req);
			return await prisma.user({ id }).vacations();
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
			if (obj.token) {
				return 'SignUpResponse';
			}
			if (obj.message) {
				return 'UserFoundError';
			}
			return null;
		},
	},
	Node : {
		__resolveType() {
			return null;
		}
	}
	
	
};

module.exports = resolvers;
