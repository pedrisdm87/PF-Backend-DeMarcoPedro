import EErros from '../services/errors/enums.js';
import logger from '../utils/logger.js';

export default (error, req, res, next) => {
    logger.error('middleware ERROR')
    logger.info(error)
    switch (error.code) {
        case EErros.INVALID_TYPES_ERROR:
            logger.error('ERROR controlado')
            res.status(400).send({ status: 'error', error: error.case })
            break;
        case EErros.PRODUCT_CODE:
            logger.error('ERROR controlado')
            res.status(400).send({ status: 'error', error: error.case })
        default:
            logger.error('ERROR SIN CONTROLAR')
            res.status(error.status).send({ status: 'error', error: 'Unhandled error' })
            break;
    }
}