import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import itemsDB from './itemsDB';
import {ILocation, ILocationWithoutId} from "./types";

const fileName = './locations.json';
let data: ILocation[] = [];

const locationsDB = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },

    async addLocationToJson(location: ILocationWithoutId) {
        const id = crypto.randomUUID();
        const newLocation = {...location, id}

        data.push(newLocation);
        await this.save();

        return newLocation;
    },

    async findLocationById(id: string) {

        if (data.length > 0 && id) {
            let location: ILocation | undefined = data.find(location => location.id === id);

            if (location !== undefined) {
                return location;
            } else  {
                return null;
            }
        }
    },
    async deleteLocationById(id: string) {
        if (data.length > 0 && id) {
            let location = await this.findLocationById(id);
            let itemByCategoryId = await itemsDB.findItemByCategoryIdOrLocationId(id);

            if (location === null) {
                return 'This location was not found';
            }

            if (location && !itemByCategoryId) {
                data = data.filter(location => location.id !== id);
                await this.save();
                return 'Location was deleted';
            } else if (location && itemByCategoryId) {
                return 'Item has this location id, so first delete item with that location_id';
            }
        }
    },
    async editLocationById(locationBody: ILocation, id: string) {
        if (data.length > 0 && id) {
            let location = await this.findLocationById(id);

            if (location) {
                location = {...location, ...locationBody};
                await this.deleteLocationById(id);
                data.push(location);
                await this.save();

                return location;
            } else {
                return 'This location was not found';
            }
        }
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getLocations() {
        return data;
    },
};

export default locationsDB;