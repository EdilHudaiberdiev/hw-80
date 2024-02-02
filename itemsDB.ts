import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {IItem, IItemWithoutId} from "./types";

const fileName = './items.json';
let data: IItem[] = [];

const itemsDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async addItemToJson(item: IItemWithoutId) {
        const id = crypto.randomUUID();
        const newItem = {...item, id}

        data.push(newItem);
        await this.save();

        return newItem;
    },

    async findItemById(id: string) {

        if (data.length > 0 && id) {
            let item: IItem | undefined = data.find(item => item.id === id);

            if (item !== undefined) {
                return item;
            } else  {
                return null;
            }
        }
    },
    async deleteItemById(id: string) {
        if (data.length > 0 && id) {
            let item = await this.findItemById(id);

            if (item) {
                data = data.filter(item => item.id !== id);
                await this.save();
                return 'Item was deleted';
            } else {
                return 'This item was not found';
            }
        }
    },
    async editItemById(itemBody: IItem, id: string) {
        if (data.length > 0 && id) {
            let item = await this.findItemById(id);

            if (item) {
                item = {...item, ...itemBody};
                await this.deleteItemById(id);
                data.push(item);
                await this.save();

                return item;
            } else {
                return 'This item was not found';
            }
        }
    },

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getItems() {
        return data;
    },
};

export default itemsDb;