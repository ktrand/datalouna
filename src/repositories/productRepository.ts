import DbClient from "../database/dbClient";
import { Product } from "../interfaces/product";
import {Pool} from "pg";

export const productRepository = {
    async getProductById(productId: number): Promise<Product | null> {
        const pool = DbClient.getInstance();
        const res = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
        return res.rows[0] || null;
    },

    async updateProductQuantity(client: Pool, productId: number, quantity: number): Promise<void> {
        const pool = DbClient.getInstance();
        await pool.query('UPDATE products SET quantity = quantity - $1 WHERE id = $2', [quantity, productId]);
    },
};
