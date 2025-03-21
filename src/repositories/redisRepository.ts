import redis from 'redis';
import { promisify } from 'util';
import client from '../redisClient';

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.setex).bind(client);

export class RedisRepository {
    static async getCachedItems(): Promise<any | null> {
        const data = await getAsync('items');
        return data ? JSON.parse(data) : null;
    }

    static async cacheItems(items: any): Promise<void> {
        await setAsync('items', 3600, JSON.stringify(items));
    }
}
