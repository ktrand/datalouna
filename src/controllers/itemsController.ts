import { Request, Response } from 'express';
import { ItemsService } from '../services/itemsService';

export class ItemsController {
    static async getItems(req: Request, res: Response): Promise<void> {
        try {
            const items = await ItemsService.getItems();
            res.json(items);
        } catch (error: any) {
            res.status(500).json({ error: "Internal Server Error", message: error.message });
        }
    }
}
