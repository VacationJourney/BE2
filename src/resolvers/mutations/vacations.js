const { decodeToken } = require('../../utils/token');

const createVacation = async (parent, args, { prisma, req }, info) => {
  const { data: { title, budget, dates } } = args;
  const { id } = decodeToken(req)
  const vacation = await prisma.createVacation({
    title,
    budget,
    cost: 0,
    dates,
    traveler: {
      connect: { id }
    }
  }, info);
  return vacation;
}

const updateVacation = async (parent, args, { prisma, req }, info) => {
  const updatedVacation = await prisma.updateVacation(args)
  return updatedVacation;
}

const deleteVacation = async (parent, args, { prisma }, info) => {
  await prisma.deleteManyDays()
  return prisma.deleteVacation(args);
}

const updateDayCost = async (parent, args, { prisma }, info) => {
  const { where: { id } } = args;
  const dayFound = await prisma.day({ id }).events()
  const newDayCost = dayFound.map(event => event.cost).reduce((total, value) => total - value, 0)
  const updatedDay = await prisma.updateDay({
    data: {
      cost: newDayCost
    },
    where: { id: id }
  })
  return updatedDay
}

const updateVacationCost = async (parent, args, { prisma }, info) => {
  const { where: { id } } = args;
  const vacationFound = await prisma.vacation({ id }).dates()
  const newVacationCost = vacationFound.map(date => date.cost).reduce((total, value) => total + value, 0)
  const updatedVacation = await prisma.updateVacation({
    data: {
      cost: newVacationCost
    },
    where: { id: id }
  })
  return updatedVacation
}

const createDay = async (parent, args, { prisma }, info) => {
  const addedDay = await prisma.createDay(args.data)
  return addedDay
}

const deleteDay = async (parent, { id, tripId }, { prisma }, info) => {

  const deletedDay = await prisma.deleteDay({ id })
  // Promise for updating vacation cost
  const vacationFound = await prisma.vacation({ id: tripId }).dates()
  const newVacationCost = vacationFound.map(date => date.cost).reduce((total, value) => total + value, 0)
  await prisma.updateVacation({
    data: {
      cost: newVacationCost
    },
    where: { id: tripId }
  })
  return deletedDay;
}
const deleteManyDays = async (parent, args, { prisma }, info) => {
  const { where: {trip }} = args
  return prisma.deleteManyDays({trip})
}

module.exports = { createVacation, updateVacation, deleteVacation, updateDayCost, updateVacationCost, createDay, deleteDay, deleteManyDays }
