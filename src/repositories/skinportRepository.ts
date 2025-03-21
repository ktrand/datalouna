import axios, { AxiosResponse } from 'axios';
import { SkinportItem } from "../interfaces/skinportItem";

export class SkinportRepository {
    private static readonly API_URL = process.env.SKINPORT_API_URL;
    private static readonly DEFAULT_HEADERS = {
        'Accept-Encoding': 'br',
    };
    private static readonly DEFAULT_PARAMS = {
        app_id: process.env.SKINPORT_DEFAULT_APP_ID,
        currency: process.env.SKINPORT_DEFAULT_CURRENCY,
    };

    static async fetchItems(tradable: boolean = true): Promise<SkinportItem[]> {
        const apiMethod = '/items';
        try {
            const response: AxiosResponse<SkinportItem[]> = await axios.get(this.API_URL + apiMethod, {
                headers: this.DEFAULT_HEADERS,
                params: { ...this.DEFAULT_PARAMS, tradable },
            });

            return response.data ?? [];
        } catch (error) {
            console.error('Error fetching items from Skinport:', error);
            throw new Error('Failed to fetch items from Skinport.');
        }
    }
}
