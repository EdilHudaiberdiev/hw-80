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

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getItems() {
        return data;
    },
};

export default itemsDb;