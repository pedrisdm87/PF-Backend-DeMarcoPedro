const TicketRepository = (ticketDao) => {
  const findTicket = async (id) => await ticketDao.findById(id);
  const updateTicket = async (id) => await ticketDao.updateTicket(id);
  const createTicket = async (data) => await ticketDao.create(data);
  const saveTicket = async () => await ticketDao.saveTicket();

  return {
    findTicket,
    updateTicket,
    createTicket,
    saveTicket,
  };
};
export default TicketRepository;
