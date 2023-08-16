const logger = require('@/components/utils/logger')


export default function handler(req, res) {


    const {error} = req.body


    logger.logger.log('error', {
        message: error.message,
        stack: error.stack
    })

    res.status(200).json({message: "Send to logger"})
}