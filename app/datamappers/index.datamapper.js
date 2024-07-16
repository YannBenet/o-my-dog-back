import client from "../config/pg.client.js";

import UserDatamapper from './user.datamapper.js';
import AnnouncementDatamapper from "./announcement.datamapper.js";
import AnimalDatamapper from './animal.datamapper.js';
import AnnouncementAnimalDatamapper from './announcementAnimal.datamapper.js'

UserDatamapper.init({client});
AnnouncementDatamapper.init({client});
AnimalDatamapper.init({client});
AnnouncementAnimalDatamapper.init({client});

export {
  UserDatamapper,
  AnnouncementDatamapper,
  AnimalDatamapper,
  AnnouncementAnimalDatamapper
};