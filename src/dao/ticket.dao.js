import ticketModel from "../dao/models/ticket.model.js";

const ticketDAO = {
  findById: async (id) => {
    const getById = await ticketModel.findById(id);
    return getById;
  },

  create: async (ticket) => {
    const createTicket = await ticketModel.create(ticket);
    return createTicket;
  },

  updateTicket: async (id) => {
    const updateTicket = await ticketModel.update(id);
  },

  saveTicket: async () => {
    try {
      const ticket = await ticketModel.find();
      return ticket;
    } catch (err) {
      return err;
    }
  },
};

export default ticketDAO;
