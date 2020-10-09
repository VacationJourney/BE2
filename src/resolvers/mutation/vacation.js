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
