import express from 'express'
import { createPost,getposts } from '../controllers/post.controller.js';
import { verify } from '../utils/verifyUser.js';

const router = express.Router();

router.route('/create').post(verify,createPost)
router.route('/getPost').get(verify,getposts)

export default router