import {Router} from 'express';
import * as fs from "fs";
import categoriesDB from "../categoriesDB";
import {ICategory, ICategoryWithoutId} from "../types";
const categoriesRouter = Router();
const path = './categories';
categoriesRouter.post('/', async (req, res) => {

    if (!req.body.title) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let newCategory: ICategoryWithoutId = {
        title: req.body.title,
        description: req.body.description.trim().length === 0 ? 'No description' : req.body.description,
        // image: req.file ? req.file.filename : null, - multer
    };

    newCategory = await categoriesDB.addCategoryToJson(newCategory);
    res.send(newCategory);
});
categoriesRouter.get('/', async (req, res) => {

    let category: ICategory[] = [];

    category = await categoriesDB.getCategories();
    category = category.reverse();

    res.send(category);
});



export default categoriesRouter