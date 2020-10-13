// for the events
const createEvent =  async (parent, args, { prisma }, info) => {
  const event = await prisma.createEvent(args.data);

  return event;
}

const updateEvent =  async (parent, args, { prisma }, info) => {
  const event = await prisma.updateEvent(args);
  return event;
}
const deleteEvent = (parent, args, { prisma }, info) => {
  return prisma.deleteEvent(args);
}

module.exports = {createEvent,updateEvent,deleteEvent}