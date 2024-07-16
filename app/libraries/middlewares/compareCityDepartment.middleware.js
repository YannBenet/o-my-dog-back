// Compare city & department data coming from the front-end with the data from the API
// Then stock them with same writing format in the database

import ApiError from '../errors/api.error.js'; 

export default () => async (req, res, next) => {

  if (req.body.city) {
    const cityReq = req.body.city.split(' ')[0];
    const departmentReq = req.body.department_label;
    const departmentCodeReq = req.body.department_code;

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

      // Compare city with same writing format
      function normalizeString(str) {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      }

      // id most of 1 city found, and the first of table is the right one
      if (dataCity.length > 1 && normalizeString(cityApi) === normalizeString(cityReq) && departmentCodeApi === departmentCodeReq) {
          req.body.city = cityApi;
          req.body.department_label = departmentNameApi;
          return next();
      } 
      // if one city is found and is right
      else if (dataCity.length === 1 && normalizeString(cityApi) === normalizeString(cityReq && departmentCodeApi === departmentCodeReq)) {
          req.body.city = cityApi;
          req.body.department_label = departmentNameApi;
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