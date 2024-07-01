import UserDatamapper from "../datamappers/user.datamapper.js";
import client from "../config/pg.client.js";

export default {
    async getHighlight(req, res) {
        UserDatamapper.init({client})
        console.log("client bien connecté");
        const randomPetSitters = await UserDatamapper.highlight();
        
        res.status(200).json({randomPetSitters})
    }

}