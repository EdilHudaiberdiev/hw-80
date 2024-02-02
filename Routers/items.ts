import {Router} from 'express';
import {IItem, IItemWithoutId} from "../types";
import itemsDB from "../itemsDB";
import {imagesUpload} from "../multer";
const itemsRouter = Router();

itemsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.title || !req.body.category || !req.body.location ) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let description = req.body.description ? req.body.description : '';

    let newItem: IItemWithoutId = {
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        description: description,
        image: req.file ? req.file.filename : null,
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

itemsRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let item = await itemsDB.findItemById(req.params.id);

    if (item) {
        res.send(item);
    } else {
        res.send('This item was not found');
    }
});

itemsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let item = await itemsDB.deleteItemById(req.params.id);
    res.send(item);
});

itemsRouter.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    if (req.body.id) {
        res.status(400).send({"error": "Id can't be changed"});
    }

    if (req.body.title || req.body.description || req.body.category || req.body.location) {
        let item = await itemsDB.editItemById(req.body, req.params.id);
        res.send(item);
    } else {
        res.status(400).send({"error": "Only title, category, location, item or description field can be in req body"});
    }
});

export default itemsRouter