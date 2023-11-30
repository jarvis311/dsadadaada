import express from 'express';
import { createPermission, deletePermisssion, fetchPermission } from '../../controller/UserAuthentication/PemissionController.js';

const router = express.Router()

router.post('/create', createPermission)
router.post('/get-permission', fetchPermission)
router.post('/delete-permission/:id', deletePermisssion)


export default router;