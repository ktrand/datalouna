import DbClient from "../database/dbClient";
import { User } from "../interfaces/user";
import {Pool} from "pg";

export const userRepository = {
    async getUserById(userId: number): Promise<User | null> {
        const pool = DbClient.getInstance();
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        return res.rows[0] || null;
    },

    async updateUserBalance(client: Pool, userId: number, balance: number): Promise<void> {
        const pool = DbClient.getInstance();
        await pool.query('UPDATE users SET balance = $1 WHERE id = $2', [balance, userId]);
    },
};
