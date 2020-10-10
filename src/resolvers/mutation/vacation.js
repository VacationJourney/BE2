import { decodeToken} from '../../utils/token'

export const createVacation = async (__, args, { prisma, req }, info) => {
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
}

export const updateVacation = async (__, args, {prisma, req}, info) => {
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

export const updateEvent = async (__, args, {prisma}, info) => {
  const updatedEvent = await prisma.updateEvent(args);
  return updatedEvent
}

export const deleteEvent = (__, args, { prisma }, info) => {
  return prisma.deleteEvent(args);
}
