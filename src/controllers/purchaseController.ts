import { Request, Response } from 'express';
import { purchaseService } from '../services/purchaseService';

export const purchaseController = {
    async purchase(req: Request, res: Response) {
        const { userId, productId, quantity } = req.body;

        try {
            const newBalance = await purchaseService.purchaseProduct(userId, productId, quantity);
            res.json({ balance: newBalance });
        } catch (error: any) {
            console.error('An unknown error occurred while purchasing:', error);
            res.status(500).json({ error: error.message});
        }
    },
};
