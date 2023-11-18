const ProductRepository = (productDAO) => {
    const getProductsFromDB = async (filterOptions, paginateOptions) => await productDAO.getProductsFromDB(filterOptions, paginateOptions)
    const getProductByIDFromDB = async (id) => await productDAO.getProductByIDFromDB(id)
    const deleteProductByIDFromDB = async (id) => await productDAO.deleteProductByIDFromDB(id)
    const updateProductInDB = async (id, data) => await productDAO.updateProductInDB(id, data)
    const createProductInDB = async (productData) => await productDAO.createProductInDB(productData)

    return {
        getProductsFromDB,
        getProductByIDFromDB,
        deleteProductByIDFromDB,
        updateProductInDB,
        createProductInDB        
    }
}

export default ProductRepository;