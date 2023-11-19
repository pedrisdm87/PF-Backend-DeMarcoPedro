const CartRepository = (cartDAO) => {
    const getCartById = async (req, res) => await cartDAO.getCartById(req.res)
    const createCart = async () => await cartDAO.createCart()
    const updatedCart = async (id,data) => await cartDAO.updateCart(id,data)
    const deleteCart = async (id) => await cartDAO.deleteCart(id)
    const getProductsFromCart = async (req, res) => await cartDAO.getProductsFromCart(req, res)
    const deleteProductFromCart = async (req, res) => await cartDAO.deleteProductFromCart(req, res)
    const updatedCartData = async (req, res) => await cartDAO.updateCartData(req, res)
    const updatedCart1 = async (req, res) => await cartDAO.updatedCart1(req, res)

    return {
    getProductsFromCart,
    createCart,
    getCartById,
    updatedCart,
    deleteProductFromCart,
    updatedCartData,
    updatedCart1,
    deleteCart,

}
}

export default CartRepository