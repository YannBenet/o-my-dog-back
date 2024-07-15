import ApiError from '../errors/api.error.js'; 

export default () => async (req, res, next) => {

  if (req.body.city) {
    const cityReq = req.body.city.split(' ')[0];
    const departmentReq = req.body.department_label;
    const departmentCodeReq = req.body.department_code;
    console.log("contenu de la requete formulaire departmentCodeReq:", departmentCodeReq);
    console.log("contenu de la requete formulaire departmentReq:", departmentReq);
    console.log("contenu de la requete formulaire cityReq:", cityReq);
    try {
      const cityResult = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityReq}&fields=nom,departement&boost=population&limit=5`);
      const dataCity = await cityResult.json();
      const departmentResult = await fetch(`https://geo.api.gouv.fr/departements/${departmentCodeReq}`);
      const dataDepartment = await departmentResult.json();
      if(!dataCity.length || !dataDepartment) {
          console.log('No data');
          throw new ApiError('Invalid city name or no exact match found.', { status: 400 });
     }

      const cityApi = dataCity[0].nom;
      const departmentNameApi = dataDepartment.nom;
      const departmentCodeApi = dataDepartment.code;
      console.log("Requête de département" , departmentReq);
      console.log("Requête de département API" , departmentNameApi);
      console.log("Requête de code de département API" , departmentCodeApi);
      // Normalisation des chaines de caractères pour comparer les villes
      function normalizeString(str) {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }

      // si plusieurs communes trouvées et que la première commune correspond à la ville recherchée
      if (dataCity.length > 1 && normalizeString(cityApi) === normalizeString(cityReq) && departmentCodeApi === departmentCodeReq) {
          req.body.city = cityApi;
          req.body.department_label = departmentNameApi;
          req.body.department_code = departmentCodeApi;
          return next();
      } 
      // si une seule commune trouvée et que la commune correspond à la ville recherchée
      else if (dataCity.length === 1 && normalizeString(cityApi) === normalizeString(cityReq && departmentCodeApi === departmentCodeReq)) {
          req.body.city = cityApi;
          req.body.department_label = departmentNameApi;
          req.body.department_code = departmentCodeApi;
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
  next()
};