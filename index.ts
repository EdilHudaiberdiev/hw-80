import express from 'express';
import categoriesRouter from "./Routers/categories";
import categoriesDB from './categoriesDB';
import locationsRouter from "./Routers/locations";
import locationsDB from "./locationsDB";
import itemsRouter from "./Routers/items";
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/categories', categoriesRouter);
app.use('/locations', locationsRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await categoriesDB.init();
    await locationsDB.init();
    // await itemDB.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run ();

