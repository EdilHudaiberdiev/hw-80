import {Router} from 'express';
import categoriesDB from "../categoriesDB";
import {ICategory, ICategoryWithoutId} from "../types";
const categoriesRouter = Router();

categoriesRouter.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let description = req.body.description ? req.body.description : '';

    let newCategory: ICategoryWithoutId = {
        title: req.body.title,
        description: description,
    };

    newCategory = await categoriesDB.addCategoryToJson(newCategory);
    res.send(newCategory);
});

categoriesRouter.get('/', async (req, res) => {
    let category: ICategory[];

    category = await categoriesDB.getCategories();
    category = category.reverse();

    res.send(category);
});

categoriesRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let category = await categoriesDB.findCategoryById(req.params.id);

    if (category) {
        res.send(category);
    } else {
        res.send('This category was not found');
    }
});

categoriesRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let category = await categoriesDB.deleteCategoryById(req.params.id);
    res.send(category);
});

categoriesRouter.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    if (req.body.id) {
        res.status(400).send({"error": "Id can't be changed"});
    }

    if (req.body.title || req.body.description) {
        let category = await categoriesDB.editCategoryById(req.body, req.params.id);
        res.send(category);
    } else {
        res.status(400).send({"error": "Only title or description field can be in req body"});
    }
});


export default categoriesRouter