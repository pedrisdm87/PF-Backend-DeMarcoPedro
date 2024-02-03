const CartRepository = (cartDAO) => {
  const getCartById = async (id) => await cartDAO.getCartById(id);
  const createCart = async () => await cartDAO.createCart();
  const updateCart = async (id, data) => await cartDAO.updateCart(id, data);
  const deleteCart = async (id) => await cartDAO.deleteCart(id);

  return {
    getCartById,
    createCart,
    updateCart,
    deleteCart,
  };
};

export default CartRepository;
