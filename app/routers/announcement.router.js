import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import announcementPostSchema from '../schemas/announcement.schema.js';

export const router = Router();

router.route('/')
    /**
     * GET /api/announcements/?date_start={date_start}&date_end={date_end}&city={city}&animal_label={animal_label}
     * @summary Get announcement with filters
     * @tags announcements
     * @param {string} date_start.query.required - ex: 2023-11-11
     * @param {string} date_end.query.required - ex: 2025-11-29
     * @param {string} city.query.required - ex: Lyon 
     * @param {string} animal_label.query.required - ex: Poisson rouge
     * @return {AnnouncementsResult[]} 200 - announce found
     * @example response - 200 - example success
     * [
     *   {
     *      "id": 20,
     *      "date_start": "2024-08-19T22:00:00.000Z",
     *      "date_end": "2024-08-27T22:00:00.000Z",
     *      "mobility": false,
     *      "home": false,
     *      "description": "Eius modi tempora incidunt ut labore et dolore.",
     *      "firstname": "Louise",
     *      "lastname": "Fournier",
     *      "label": "Iguane"
     *   } 
     * ]
     */
    .get(announcementController.searchAnnouncement)
    /**
     * POST /api/announcements/
     * @summary Post an announcement (need to be connected)
     * @tags announcements
     * @param {AnnouncementPost} request.body.required - filter for date_start, date_end, city and animal
     * @return {AnnouncementResponse} 201 - announce found
     * @example request - Example request payload
     * {
     *   "date_start": "2024-08-19T22:00:00.000Z",
     *   "date_end": "2024-08-27T22:00:00.000Z",
     *   "mobility": true,
     *   "home": false,
     *   "description": "Lorem ipsum dolor sit amet.",
     *   "animal": ["dog", "cat"]
     * }
     * @example response - 200 - example success
     *  {
     *     "message": "L'annonce a bien été postée"
     *  }
     */
    .post(validationMiddleware(announcementPostSchema, 'body'),announcementController.store);
router.route('/highlight')
    /**
     * GET /api/announcements/highlight
     * @summary Get 8 random announcements
     * @tags announcements
     * @return {AnnouncesHighlight[]} 200 - announces founded
     * @example response - 200 - example success
     *   [
     *      {
     *      "anouncement_id": 21,
     *      "date_start": "2024-09-20T22:00:00.000Z",
     *      "date_end": "2024-09-28T22:00:00.000Z",
     *      "mobility": true,
     *      "home": false,
     *      "description": "Magnam aliquam quaerat voluptatem.",
     *      "user_id": 21,
     *      "firstname": "Sébastien",
     *      "lastname": "Girard",
     *      "city": "Clermont-Ferrand",
     *      "animals": [
     *          "chien",
     *          "oiseau"
     *         ]
     *      }
     *  ]
     */
    .get(announcementController.getHighlight);
router.route('/:id')
    /**
     * GET /api/announcements/{id}
     * @summary Get one announce
     * @tags announcements
     * @param {number} id.path.required - id
     * @return {AnnouncesHighlight} 200 - announce founded
     * @example response - 200 - example success
     *      {
     *      "anouncement_id": 21,
     *      "date_start": "2024-09-20T22:00:00.000Z",
     *      "date_end": "2024-09-28T22:00:00.000Z",
     *      "mobility": true,
     *      "home": false,
     *      "description": "Magnam aliquam quaerat voluptatem.",
     *      "user_id": 21,
     *      "firstname": "Sébastien",
     *      "lastname": "Girard",
     *      "phone_number": "0602345678",
     *      "email": "sebastien.girad@example.com",
     *      "city": "Clermont-Ferrand",
     *      "animals": [
     *          "chien",
     *          "oiseau"
     *         ]
     *      }
    */
    // TODO Ajouter exemple message erreur
    .get(announcementController.findOne)
    /**
     * DELETE /api/announcements/{id}
     * @summary Delete one announce (need to be connected and owner of the announcement)
     * @tags announcements
     * @param {number} id.path.required - id
     * @return {AnnouncementResponse} 200 - announce deleted
     * @example response - 200 - 
     * {
     *  "message": "annonce supprimée"
     * }
    */
    // TODO Ajouter exemple message erreur
    .delete(announcementController.delete)
    /**
     * PATCH /api/announcements/{id}
     * @summary Post an announcement (need to be connected and owner of the announcement)
     * @tags announcements
     * @param {number} id.path.required - id
     * @param {AnnouncementPost} request.body - filter for date_start, date_end, city and animal
     * @return {AnnouncementResponse} 201 - announce founded
     * @example request - Example request payload
     * {
     *   "date_start": "2024-08-19T22:00:00.000Z",
     *   "date_end": "2024-08-27T22:00:00.000Z",
     *   "mobility": true,
     *   "home": false,
     *   "description": "Lorem ipsum dolor sit amet.",
     *   "animal": ["dog", "cat"]
     * }
     * @example response - 200 - example success
     *  {
     *     "message": "L'annonce a bien été modifiée"
     *  }
     */
    .patch(announcementController.update);
