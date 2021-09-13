import serviceController from '../controllers/service/serviceController.js'
import express from 'express'
const router = express.Router()


router.get('/all-services', serviceController.getAll)
router.get('/service-details', serviceController.getServiceById)
router.get('/user-service', serviceController.getUserServices)
router.get('/helper-service', serviceController.gethelperServices)
router.get('/available-helpers', serviceController.getHelpersForServices)

export default router
