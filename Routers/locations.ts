import {Router} from 'express';
import locationsDB from "../locationsDB";
import {ILocation, ILocationWithoutId} from "../types";
const locationRouter = Router();

locationRouter.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let description = req.body.description ? req.body.description : '';

    let newLocation: ILocationWithoutId = {
        title: req.body.title,
        description: description,
    };

    newLocation = await locationsDB.addLocationToJson(newLocation);
    res.send(newLocation)
});

locationRouter.get('/', async (req, res) => {
    let location: ILocation[];

    location = await locationsDB.getLocations();
    location = location.reverse();

    res.send(location);
});

locationRouter.get('/:id', async (req, res) => {
   if (!req.params.id) {
       res.status(400).send({"error": "Id params must be in url"});
   }

   let location = await locationsDB.findLocationById(req.params.id);

   if (location) {
       res.send(location);
   } else {
       res.send('This location was not found')
   }
});

locationRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    let location = await locationsDB.deleteLocationById(req.params.id);
    res.send(location);
});

locationRouter.put('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({"error": "Id params must be in url"});
    }

    if (req.body.id) {
        res.status(400).send({"error": "Id can't be changed"});
    }

    if (req.body.title || req.body.description) {
        let location = await locationsDB.editLocationById(req.body, req.params.id);
        res.send(location);
    } else {
        res.status(400).send({"error": "Only title or description field can be in req body"});
    }
});

export default locationRouter