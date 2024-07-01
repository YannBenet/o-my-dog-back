import client from "../config/pg.client.js";
import AnnouncementController from "../datamappers/announcement.datamapper.js";

AnnouncementController.init({client})

export default {
    async getHighlight(_, res) {
        try {
            const randomAnnouncements = await AnnouncementController.highlight();
            res.status(200).json({randomAnnouncements})
        } catch (error) {
            console.log('Erreur dans le controller announcement / getHighlight')
            console.error(error)
        }
        
    },

    async searchAnnouncement(req, res){
        try {
            console.log(req.query)
                const allAnnouncements = await AnnouncementController.searchAnnouncement(req.query);
                res.status(200).json({allAnnouncements})
        } catch (error) {
            console.log('Erreur dans le controller announcement / getAll')
            console.error(error) 
        }
    }

}