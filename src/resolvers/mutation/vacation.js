export const createVacation = async (__, args, { prisma }, info) => {
  const vacation = await prisma.createVacation(args.data);
  return vacation;
}

export const deleteVacation = (__, args, { prisma }, info) => {
  return prisma.deleteVacation(args);
}

// individual day
export const deleteDay = (__, args, { prisma }, info) => {
  return prisma.deleteDay(args);
}

// for the events
export const createEvent = async (__, args, { prisma }, info) => {
  const event = await prisma.createEvent(args.data);
  return event;
}

export const deleteEvent = (__, args, { prisma }, info) => {
  return prisma.deleteEvent(args);
}
