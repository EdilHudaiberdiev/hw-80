import {Router} from 'express';
import {ICategory, IItem, IItemWithoutId} from "../types";
import itemsDB from "../itemsDB";
import categoriesDB from "../categoriesDB";
import categoriesRouter from "./categories";
import locationsDB from "../locationsDB";
const itemsRouter = Router();

itemsRouter.post('/', async (req, res) => {
    if (!req.body.title || !req.body.category || !req.body.location ) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let description = req.body.description ? req.body.description : '';

    let newItem: IItemWithoutId = {
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        description: description,
    };

    newItem = await itemsDB.addItemToJson(newItem);
    res.send(newItem);
});

itemsRouter.get('/', async (req, res) => {
    let item: IItem[];

    item = await itemsDB.getItems();
    item = item.reverse();

    res.send(item);
});

export default itemsRouter