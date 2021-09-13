import serviceController from  '../controllers/service/serviceController.js'
import express from 'express'
const router = express.Router()

router.post('/notifyHelper', serviceController.notifyHelper)

export default router