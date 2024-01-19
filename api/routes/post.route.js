import express from 'express'
import { createPost } from '../controllers/post.controller.js';
import { verify } from '../utils/verifyUser.js';

const router = express.Router();

router.route('/create').post(verify,createPost)

export default router