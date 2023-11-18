const ProductRepository = (productDAO) => {
    const getProducts = async (req, res) => await productDAO.getProducts(req, res)
    const getProductsbyIDController = async (req, res) => await productDAO.getProductsByID(req, res)
    const deleteProductByIdController = async (req, res) => await productDAO.deleteProductById(req, res)
    const updateProductByIdController = async (req, res) => await productDAO.updateProductById(req,res)
    const createProductOnDBController = async (req, res) => await productDAO.createProductOnDBController(req, res)
    const productsResponse = async (req, res) => await productDAO.getProducts(req, res)

    return {
        getProducts,
        getProductsbyIDController,
        deleteProductByIdController,
        updateProductByIdController,
        createProductOnDBController,
        productsResponse
    }
}

export default ProductRepository;