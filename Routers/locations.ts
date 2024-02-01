import {Router} from 'express';
import locationsDB from "../locationsDB";
import {ILocation, ILocationWithoutId} from "../types";
const locationRouter = Router();

locationRouter.post('/', async (req, res) => {
    if (!req.body.title) {
        res.status(404).send({"error": "Message must be present in the request"});
    }

    let newLocation: ILocationWithoutId = {
        title: req.body.title,
        description: '',
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

export default locationRouter