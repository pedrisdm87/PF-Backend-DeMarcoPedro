/*import ticketModel from "../dao/models/ticket.model.js";

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
*/
import ticketModel from "../dao/models/ticket.model.js";

const ticketDAO = {
  findById: async (id) => {
    try {
      const getById = await ticketModel.findById(id);
      return getById;
    } catch (err) {
      throw new Error("Error al buscar el ticket por ID");
    }
  },

  create: async (ticket) => {
    try {
      const createTicket = await ticketModel.create(ticket);
      return createTicket;
    } catch (err) {
      throw new Error("Error al crear un nuevo ticket");
    }
  },

  updateTicket: async (id) => {
    try {
      const updateTicket = await ticketModel.update(id);
      return updateTicket;
    } catch (err) {
      throw new Error("Error al actualizar el ticket");
    }
  },

  saveTicket: async () => {
    try {
      const ticket = await ticketModel.find();
      return ticket;
    } catch (err) {
      throw new Error("Error al guardar el ticket");
    }
  },
};

export default ticketDAO;
