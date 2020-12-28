const { signUp, login, updateUser, deleteUser } = require('./user');
const { createVacation, updateVacation, deleteVacation, updateDayCost, updateVacationCost, deleteDay } = require('./vacations');
const { createEvent, updateEvent, deleteEvent } = require('./events');

const Mutation = {
  signUp, login, updateUser, deleteUser,
  createVacation, updateVacation, deleteVacation, updateDayCost, updateVacationCost, deleteDay, createEvent,
 updateEvent, deleteEvent
}

module.exports = Mutation