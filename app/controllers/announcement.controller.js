import client from "../config/pg.client.js";
import AnnouncementDatamapper from "../datamappers/announcement.datamapper.js";

AnnouncementDatamapper.init({client})

export default {
    async getHighlight(_, res) {
        try {
            const randomAnnouncements = await AnnouncementDatamapper.highlight();
            res.status(200).json({randomAnnouncements})
        } catch (error) {
            console.log('Erreur dans le controller announcement / getHighlight')
            console.error(error)
        }
    },

    async searchAnnouncement(req, res){
        try {
            console.log(req.query)
                const allAnnouncements = await AnnouncementDatamapper.searchAnnouncement(req.query);
                res.status(200).json({allAnnouncements})
        } catch (error) {
            console.log('Erreur dans le controller announcement / getAll')
            console.error(error) 
        }
    }
}