import { getProducts } from "./product.controller.js"
import { getProductsFromCart } from "./cart.controller.js"
import config from "../config/config.js"

export const getProductsViewRouterController = async (req, res) => {
    const result = await getProducts(req, res)
    if (result.statusCode === 200) {
        const totalPages = []
        let link
        for (let index = 1; index <= result.response.totalPages; index++) {
            if (!req.query.page) {
                link = `http://${req.hostname}:${config.apiserver.port}${req.originalUrl}?&page=${index}`
            } else {
                const modifiedUrl = req.originalUrl.replace(`page=${req.query.page}`, `page=${index}`)
                link = `http://${req.hostname}:${config.apiserver.port}${modifiedUrl}`
            }
            totalPages.push({ page: index, link })
        }
        const user = req.session.user
        console.log(user)
        res.render('home', { user, products: result.response.payload, paginateInfo: {
                hasPrevPage: result.response.hasPrevPage,
                hasNextPage: result.response.hasNextPage,
                prevLink: result.response.prevLink,
                nextLink: result.response.nextLink,
                totalPages
            }
        })
    } else {
        res.status(result.statusCode).json({ status: 'error', error: result.response.error })
    }
}

export const realTimeProductsVRController = async  (req, res) => {
    const result = await getProducts(req, res)
    if (result.statusCode === 200) {
        res.render('realTimeProducts', { products: result.response.payload })
    } else {
        res.status(result.statusCode).json({ status: 'error', error: result.response.error })
    }
}

export const cartViewRouterController = async (req, res) => {
    try {
        const result = await getProductsFromCart(req, res);

        if (result.statusCode === 200 && result.response && result.response.payload) {
            res.render('productsFromCart', { cart: result.response.payload });
        } else {
            res.status(result.statusCode || 500).json({
                status: 'error',
                error: result.response ? result.response.error : 'Internal Server Error'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
}
    
