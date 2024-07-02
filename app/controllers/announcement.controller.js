import { AnnouncementDatamapper } from "../datamappers/index.datamapper.js";

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
    },

    async getOneAnnouncement(req, res){
        try {
            const { id } = req.params;
            const announcement = await AnnouncementDatamapper.getOneAnnouncement(id);
            res.status(200).json({announcement})
        } catch (error) {
            console.log('Erreur dans le controller announcement / getOneAnnouncement')
            console.error(error)
        }
    },

    async updateAnnouncement(req, res){
        try {
            const { id } = req.params;
            const { date_start, date_end, mobility, home, description } = req.body;
            await AnnouncementDatamapper.updateAnnouncement(id, date_start, date_end, mobility, home, description);
            res.status(200).json({message: 'Annonce modifiée'})
        } catch (error) {
            console.log('Erreur dans le controller announcement / updateAnnouncement')
            console.error(error)
        }
    }

}