import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {ICategory, ICategoryWithoutId} from "./types";

const fileName = './categories.json';
let data: ICategory[] = [];

const categoriesDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async addCategoryToJson(category: ICategoryWithoutId) {
        const id = crypto.randomUUID();
        const newCategory = {...category, id}

        data.push(newCategory);
        await this.save();

        return newCategory;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getCategories() {
        return data;
    },
    async findCategoryById(id: string) {

        if (data.length > 0 && id) {
            let category: ICategory | undefined = data.find(category => category.id === id);

            if (category !== undefined) {
                return category;
            } else  {
                return null;
            }
        }
    },
};

export default categoriesDb;

