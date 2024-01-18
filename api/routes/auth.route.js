import express from 'express'
import { signup,signin ,google} from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/').post(signup)
router.route('/signin').post(signin)
router.route('/google').post(google)
export default router