const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const offerRouter = require('./offerRouter')
const purchaseOfferRouter = require('./purchaseOfferRouter')
const chatRouter = require('./chatRouter')

router.use('/user', userRouter)
router.use('/offer', offerRouter)
router.use('/purchase-offer', purchaseOfferRouter)
router.use('/chat', chatRouter)

module.exports = router