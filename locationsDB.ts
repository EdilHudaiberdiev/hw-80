import {promises as fs} from 'fs';
import * as crypto from 'crypto';
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

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getLocations() {
        return data;
    },

};

export default locationsDB;