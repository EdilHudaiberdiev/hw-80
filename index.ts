import express from 'express';
import categoriesRouter from "./Routers/categories";
import categoriesDB from './categoriesDB';
import locationRouter from "./Routers/locations";
import locationsDB from "./locationsDB";
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/categories', categoriesRouter);
app.use('/locations', locationRouter);

const run = async () => {
    await locationsDB.init();
    await categoriesDB.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run ();

