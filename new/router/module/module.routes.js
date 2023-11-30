import express from 'express';
import { createModule } from '../../controller/UserAuthentication/ModulController.js';
const router = express.Router()

router.post('/create', createModule)


export default router;