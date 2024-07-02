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