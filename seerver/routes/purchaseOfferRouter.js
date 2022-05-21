const Router = require('express')
const router = new Router()
const purchaseOfferController = require('../controllers/purchaseOfferController')

router.post('/create', purchaseOfferController.createsell)
router.post('/get', purchaseOfferController.getAllsell)
router.get('/:id', purchaseOfferController.getOnesell)

module.exports = router