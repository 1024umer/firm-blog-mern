import express from 'express'
import { test,updateUser,deleteUser,signout } from '../controllers/user.controller.js';
import { verify } from '../utils/verifyUser.js';
import { app } from '../../client/src/firebase.js';

const router = express.Router();

router.route('/').get(test)
router.route('/update/:userId').put(verify,updateUser)
router.route('/delete/:userId').delete(verify,deleteUser)
router.route('/signout').post(signout)
export default router