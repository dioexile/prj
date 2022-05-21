const Router = require('express')
const router = new Router()
const offerController = require('../controllers/offerController')

router.post('/create', offerController.create)
router.post('/get', offerController.getAll)
router.get('/:id', offerController.getOne)
router.delete('/:id', offerController.delete)

module.exports = router