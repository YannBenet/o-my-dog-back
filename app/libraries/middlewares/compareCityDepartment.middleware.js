import ApiError from '../errors/api.error.js';

export default () => async (req, res, next) => {

  if (req.body.city) {
    const cityReq = req.body.city;
    const departmentReq = req.body.department_label;
    console.log("contenu de la requete formulaire:", cityReq);
    try {
      const result = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityReq}&fields=nom,departement&boost=population&limit=5`);
      const data = await result.json();
      if(!data.length){
        console.log('No data');
        throw new ApiError('Invalid city name or no exact match found.', { status: 400 });
      }

      const cityApi = data[0].nom;
      const departmentApi = data[0].departement.nom;
      console.log("Requête de département" , departmentReq);
      console.log("Requête de département API" , departmentApi);
      // Normalisation des chaines de caractères pour comparer les villes
      function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }

      // si plusieurs communes trouvées et que la première commune correspond à la ville recherchée
      if (data.length > 1 && normalizeString(cityApi) === normalizeString(cityReq)) {
        req.body.city = cityApi;
        req.body.department_label = departmentApi;
        return next();
      }
      // si une seule commune trouvée et que la commune correspond à la ville recherchée
      else if (data.length === 1 && normalizeString(cityApi) === normalizeString(cityReq)){
        req.body.city = cityApi;
        req.body.department_label = departmentApi;
        return next();
      }
      else {
        throw new ApiError('Invalid city name or no exact match found.', { status: 400 });
      }
    } catch(err) {

      console.log(`Dans le catch: ${err}`);
      next(err);
    }
  }
  next();
};
