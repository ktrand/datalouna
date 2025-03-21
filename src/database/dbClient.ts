import { Pool } from 'pg';

class DbClient {
    private static instance: Pool;
    private constructor() {}

    public static getInstance(): Pool {
        if (!DbClient.instance) {
            DbClient.instance = new Pool({
                user: process.env.POSTGRES_USER,
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DB,
                password: process.env.POSTGRES_PASSWORD,
                port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432
            });
        }
        return DbClient.instance;
    }
}

export default DbClient;
