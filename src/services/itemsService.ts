import { SkinportRepository } from '../repositories/skinportRepository';
import { RedisRepository } from '../repositories/redisRepository';
import { SkinportItem } from "../interfaces/skinportItem";
import { ItemWithMinPrices } from "../interfaces/skinportItem";

export class ItemsService {
    static async getItems(): Promise<ItemWithMinPrices[]> {
        const cachedItems = await RedisRepository.getCachedItems();
        if (cachedItems) {
            return cachedItems;
        }

        const [tradableItems, nonTradableItems] = await Promise.all([
            SkinportRepository.fetchItems(true),
            SkinportRepository.fetchItems(false),
        ]);

        const groupedItems = this.getItemsWithMinPrices(tradableItems, nonTradableItems);

        await RedisRepository.cacheItems(groupedItems);

        return groupedItems;
    }

    private static getItemsWithMinPrices(
        tradableItems: SkinportItem[],
        nonTradableItems: SkinportItem[]
    ): ItemWithMinPrices[] {
        const itemMap = new Map<string, ItemWithMinPrices>();

        const addItemToMap = (item: SkinportItem, tradable: boolean) => {
            const market_hash_name = item.market_hash_name;

            if (!itemMap.has(market_hash_name)) {
                itemMap.set(market_hash_name, {
                    tradable: tradable ? item : null,
                    nonTradable: !tradable ? item : null,
                });
            } else {
                const existingItem = itemMap.get(market_hash_name)!;
                if (tradable) {
                    if (
                        existingItem.tradable === null ||
                        (item.min_price !== null && item.min_price < existingItem.tradable?.min_price!)
                    ) {
                        existingItem.tradable = item;
                    }
                }

                if (!tradable) {
                    if (
                        existingItem.nonTradable === null ||
                        (item.min_price !== null && item.min_price < existingItem.nonTradable?.min_price!)
                    ) {
                        existingItem.nonTradable = item;
                    }
                }
            }
        };

        tradableItems.forEach(item => addItemToMap(item, true));
        nonTradableItems.forEach(item => addItemToMap(item, false));

        return Array.from(itemMap.values());
    }
}
