const {decodeToken} = require('../../utils/token');

const createVacation =  async (parent, args, { prisma, req }, info) => {
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

const updateVacation =  async (parent, args, { prisma, req }, info) => {
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

const deleteVacation = (parent, args, { prisma }, info) => {
  return prisma.deleteVacation(args);
}

const deleteDay = (parent, args, { prisma }, info) => {
  return prisma.deleteDay(args);
}

module.exports = {createVacation,updateVacation,deleteVacation,deleteDay}
