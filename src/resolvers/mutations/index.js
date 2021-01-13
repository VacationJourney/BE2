const { authorizeUser, signUp, login, updateUser, deleteUser } = require('./user');
const { createVacation, updateVacation,  deleteVacation, updateDayCost, updateVacationCost, createDay, deleteDay, deleteManyDays } = require('./vacations');
const { createEvent, updateEvent, deleteEvent } = require('./events');

const Mutation = {
  authorizeUser, signUp, login, updateUser, deleteUser,
  createVacation, updateVacation, deleteVacation, updateDayCost, updateVacationCost, createDay, deleteDay, deleteManyDays, createEvent,
 updateEvent, deleteEvent
}

module.exports = Mutation