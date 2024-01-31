import express from 'express';
import categoriesRouter from "./Routers/categories";
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/categories', categoriesRouter);

const run = async () => {
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

void run ();

