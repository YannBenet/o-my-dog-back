import { AnnouncementDatamapper } from "../datamappers/index.datamapper.js";
//! TODO remove try / catch, add next argument to method, import ApiError class and replace error message by new instance of ApiError

export default {
    
    async findOne(req, res){
        try {
            const { id } = req.params;
            const announcement = await AnnouncementDatamapper.findOne(id);
            res.status(200).json(announcement)
        } catch (error) {
            console.log('Erreur dans le controller announcement / getOneAnnouncement')
            console.error(error)
        }
    },

    async update(req, res){
        try {
            const { id } = req.params;
            const { date_start, date_end, mobility, home, description } = req.body;
            await AnnouncementDatamapper.update(id, date_start, date_end, mobility, home, description);
            res.status(200).json({message: 'Annonce modifiée'})
        } catch (error) {
            console.log('Erreur dans le controller announcement / updateAnnouncement')
            console.error(error)
        }
    },

    //! TODO Check if announcement exist before try to remove it
    async delete(req, res){
        try {
            const { id } = req.params;
            await AnnouncementDatamapper.delete(id);
            res.status(200).json({message: 'Annonce supprimée'})
        } catch (error) {
            console.log('Erreur dans le controller announcement / deleteAnnouncement')
            console.error(error)
        }
    },

    async getHighlight(_, res) {
        try {
            const randomAnnouncements = await AnnouncementDatamapper.highlight();
            res.status(200).json(randomAnnouncements)
        } catch (error) {
            console.log('Erreur dans le controller announcement / getHighlight')
            console.error(error)
        }
    },

    async searchAnnouncement(req, res){
        try {
            console.log(req.query)
                const allAnnouncements = await AnnouncementDatamapper.searchAnnouncement(req.query);
                res.status(200).json(allAnnouncements)
        } catch (error) {
            console.log('Erreur dans le controller announcement / getAll')
            console.error(error) 
        }
    },

    async store(req, res){
        // TODO vérification des tokens ou de la session pour vérifier qu'un utilisateur est bien connecté avant de poster une annonce

        try {
            // ! TODO L'argument 1 de la méthode create devra être remplacé par l'id de l'utilisateur connecté
            const result = await AnnouncementDatamapper.create(req.body, 1)
            console.log(result);
            if (!result) {
                 res.status(404).json({"message": "erreur lors du résultat de la première requête"})
            } else {
                const announcementId = result.id;
                const animalTypes = req.body.animal;
        
                for (const animalType of animalTypes) {
                    await AnnouncementDatamapper.addAuthorizedAnimals(announcementId, animalType)
                } 
                res.status(201).json({"message":"L'annonce a bien été postée"})
            }
        } catch (error) {
            console.log('Erreur dans le controller announcement / store')
            console.error(error) 
        }

    }
}
