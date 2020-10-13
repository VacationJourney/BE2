const Mutation = require('./mutations/index');
const Query = require('./queries/index');
const {User, Vacation, Day, Event, UserRegResult, Node} = require('./helpers');

const resolvers = {
	Mutation,
	Query,
	User, 
	Vacation, 
	Day, 
	Event, 
	UserRegResult, 
	Node
};

module.exports = resolvers;
