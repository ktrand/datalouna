import { Router } from 'express';
import { ItemsController } from "../controllers/itemsController";

const router = Router();

router.get('/', ItemsController.getItems);

export default router;
