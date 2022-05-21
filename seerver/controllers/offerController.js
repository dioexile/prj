const {Offer, User, Chat} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')


class OfferController{
    async create(req, res, next){
        try {
            const token = req.headers.authorization.split(' ')[1]
            
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = req.user = decoded.id
            const user = await User.findOne({where: {id}})

            const {project, wallet, price, shortDescription, fullDescription} = req.body
            const offer = await Offer.create({project, wallet, price, shortDescription, fullDescription, userId: user.id})
            // const chat = await Chat.create({ chatId: offer.id, sellerId: user.id, buyerId: 3})
            return res.json(offer)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next){
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 10
        try {
            const offers = await Offer.findAll({limit})
            return res.json(offers)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        console.log("я ебу")
    }
    async getOne(req, res) {
        const {id} = req.params
        const offer = await Offer.findOne(
            {
                where: {id}
            },
        )
        return res.json(offer)
    }
    async delete(req, res) {
        const {id} = req.params
        const offer = await Offer.destroy(
            {
                where: {id}
            },
        )
        return res.json(offer)
    }
}

module.exports = new OfferController()