import { Router } from 'express';
import { purchaseController } from '../controllers/purchaseController';

const router = Router();

router.post('/', purchaseController.purchase);

export default router;
