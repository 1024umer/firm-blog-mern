import express from 'express'
import { test,updateUser } from '../controllers/user.controller.js';
import { verify } from '../utils/verifyUser.js';

const router = express.Router();

router.route('/').get(test)
router.route('/update/:userId').put(verify,updateUser)
export default router