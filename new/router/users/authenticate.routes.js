import express from 'express';
import { getAllPRotectedRouts, userSignIn } from '../../controller/UserAuthentication/UserAuthanticateCotroller.js';
import { verifyToken } from '../../middleware/auth.middleware.js';
const router = express.Router()

router.post('/signin', userSignIn)
router.post('/protected-rotes', verifyToken, getAllPRotectedRouts)


export default router;