import DbClient from "../database/dbClient";
import { Purchase } from "../interfaces/purchase";

export const purchaseRepository = {
    async createPurchase(purchase: Purchase): Promise<void> {
        const pool = DbClient.getInstance();
        await pool.query(
            'INSERT INTO purchases (userId, productId, quantity, price) VALUES ($1, $2, $3, $4)',
            [purchase.userId, purchase.productId, purchase.quantity, purchase.price]
        );
    },
};
