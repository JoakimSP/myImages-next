const logger = require('@/components/utils/logger')


export default function handler(req, res) {


    const {error} = req.body
    console.log("Trying to log error in file")


    logger.logger.log('error', error)

    res.status(200).json({message: "Send to logger"})
}