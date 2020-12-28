// for the events
const createEvent = async (parent, args, { prisma }, info) => {
  // Create Event
  const event = await prisma.createEvent(args.data);
  // Promise for update day cost
  const { data: { date: { connect: { id } } } } = args
  const dayEvents = await prisma.day({ id }).events()
  const newDayCost = dayEvents.map(event => event.cost).reduce((total, value) => total - value, 0)
  await prisma.updateDay({
    data: {
      cost: newDayCost
    },
    where: { id: id }
  })
  // Promise for update Vacation Cost
  const tripFound = await prisma.day({ id }).trip()
  const vacationFound = await prisma.vacation({ id: tripFound.id }).dates()
  const newVacationCost = vacationFound.map(date => date.cost).reduce((total, value) => total + value, 0)
  await prisma.updateVacation({
    data: {
      cost: newVacationCost
    },
    where: { id: tripFound.id }
  })
  return event;
}

const updateEvent = async (parent, args, { prisma }, info) => {
  const { data: { title, startTime, endTime, location, contact, cost, description, dateId, tripId }, where: { id } } = args
  const event = await prisma.updateEvent({
    data: {
      title,
      startTime,
      endTime,
      location,
      contact,
      cost,
      description
    },
    where: { id }
  });
  // Promise for update day cost
  const dayEvents = await prisma.day({ id: dateId }).events()
  const newDayCost = dayEvents.map(event => event.cost).reduce((total, value) => total - value, 0)
  await prisma.updateDay({
    data: {
      cost: newDayCost
    },
    where: { id: dateId }
  })
  // Promise for update Vacation Cost
  const vacationFound = await prisma.vacation({ id: tripId }).dates()
  const newVacationCost = vacationFound.map(date => date.cost).reduce((total, value) => total + value, 0)
  await prisma.updateVacation({
    data: {
      cost: newVacationCost
    },
    where: { id: tripId }
  })
  return event;
}

const deleteEvent = async (parent, { id, dayId, tripId }, { prisma }, info) => {
  const deletedEvent = await prisma.deleteEvent({ id })
  // Promise for update day cost
  const dayFound = await prisma.day({ id: dayId }).events()
  const newDayCost = dayFound.map(event => event.cost).reduce((total, value) => total - value, 0)
  await prisma.updateDay({
    data: {
      cost: newDayCost
    },
    where: { id: dayId }
  })
  // Promise for update Vacation Cost
  const vacationFound = await prisma.vacation({ id: tripId }).dates()
  const newVacationCost = vacationFound.map(date => date.cost).reduce((total, value) => total + value, 0)
  await prisma.updateVacation({
    data: {
      cost: newVacationCost
    },
    where: { id: tripId }
  })
  return deletedEvent;
}

module.exports = { createEvent, updateEvent, deleteEvent }