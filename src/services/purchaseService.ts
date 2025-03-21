import { productRepository } from '../repositories/productRepository';
import { userRepository } from '../repositories/userRepository';
import { purchaseRepository } from '../repositories/purchaseRepository';
import { User } from "../interfaces/user";
import { Product } from "../interfaces/product";
import DbClient from "../database/dbClient";

export const purchaseService = {
    async purchaseProduct(userId: number, productId: number, quantity: number) {
        const client = DbClient.getInstance();

        await client.connect();
        await client.query('BEGIN');

        try {
            const product: Product | null = await productRepository.getProductById(productId);
            if (!product) throw new Error('Product not found');
            if (product.quantity < quantity) throw new Error('Not enough product in stock');

            const user: User | null = await userRepository.getUserById(userId);

            if (!user) throw new Error('User not found');

            const totalPrice = product.price * quantity;
            if (user.balance < totalPrice) throw new Error('Insufficient balance');

            const newUserBalance = user.balance - totalPrice;
            await userRepository.updateUserBalance(client, userId, newUserBalance);

            await productRepository.updateProductQuantity(client, productId, quantity);

            await purchaseRepository.createPurchase({
                userId,
                productId,
                quantity,
                price: totalPrice,
            });

            await client.query('COMMIT');

            return newUserBalance;
        } catch (error: any) {
            await client.query('ROLLBACK');
            console.error('Transaction error: ', error.message || error);
            throw new Error(`Error processing the transaction: ${error.message || error}`);
        }
    },
};
