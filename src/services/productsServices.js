import productsDaoArray from "../dao/product.dao.js";

export default class productsService {
    constructor(){
        this.productsDao = new ProductsDaoArray();
    }

    getProducts = async () => {
        return await this.productsDao.getAll()

    }

    addProduct = async (product)=> {
        return await this.productsDao.save(product)
    }
}