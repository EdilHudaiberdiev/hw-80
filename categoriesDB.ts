import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import itemsDB from './itemsDB';
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
    async deleteCategoryById(id: string) {
        if (data.length > 0 && id) {
            let category = await this.findCategoryById(id);
            let itemByCategoryId = await itemsDB.findItemByCategoryIdOrLocationId(id);

            if (category === null) {
                return 'This category was not found';
            }

            if (category && !itemByCategoryId) {
                data = data.filter(category => category.id !== id);
                await this.save();
                return 'Category was deleted';
            } else if (category && itemByCategoryId) {
                return 'Item has this category id, so first delete item with that category_id';
            }
        }
    },
    async editCategoryById(categoryBody: ICategory, id: string) {
        if (data.length > 0 && id) {
            let category = await this.findCategoryById(id);

            if (category) {
                category = {...category, ...categoryBody};
                await this.deleteCategoryById(id);
                data.push(category);
                await this.save();

                return category;
            } else {
                return 'This category was not found';
            }
        }
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getCategories() {
        return data;
    },
};

export default categoriesDb;

