export const User = {
	vacations(parent, args, { prisma }) {
		return prisma
			.user({
				id: parent.id,
			})
			.vacations();
	},
}

export const Vacation = {
	dates(parent, args, { prisma }) {
		return prisma
			.vacation({
				id: parent.id,
			})
			.dates();
	},
}

export const Day = {
	events(parent, args, { prisma }) {
		return prisma.day({ id: parent.id }).events();
	},
}
export const Event = {
	date(parent, args, { prisma }) {
		return prisma.event({
			id: parent.id,
		});
	},
}

export const UserRegResult = {
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

export const Node = {
	__resolveType() {
		return null;
	}
}