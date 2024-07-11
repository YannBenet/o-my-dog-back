

export default () => async (req, res, next) => {
    const cityReq = req.body.city;
    const departmentReq = req.body.department_label;
    console.log("contenu de la requete formulaire:", cityReq)
    try {
        const result = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityReq}&fields=nom,departement&boost=population&limit=5`);
        const data = await result.json();
        console.log("Résultat du fetch", data);
        const cityApi = data[0].nom;
        const departmentApi = data[0].departement.nom;
        console.log("Requête de département" , departmentReq);
        console.log("Requête de département API" , departmentApi);
        // Normalisation des chaines de caractères pour comparer les villes
        function normalizeString(str) {

            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          }
        
        // si zero commune trouvée
        if (data.length === 0) {
            return err
        }
        // si plusieurs communes trouvées et que la première commune correspond à la ville recherchée
        else if (data.length > 1 && normalizeString(cityApi) === normalizeString(cityReq)) {
            req.body.city = cityApi;
            req.body.department_label = departmentApi;
            // res.status(200).json({'Succes': `${cityApi} is a valid city name`});
            next();
        } 
        // si une seule commune trouvée et que la commune correspond à la ville recherchée
        else if (data.length === 1 && normalizeString(cityApi) === normalizeString(cityReq)){
            req.body.city = cityApi;
            req.body.department_label = departmentApi;
            next();
            // return res.status(200).json({'Succes': `${cityApi} is a valid city name`});
        }
        else {
            return err;
        }
        
    } catch(err) {
        return next(new Error('Invalid city name or no exact match found.', {status : 400}));
        
    }
  };

  // A ENREGISTRER EN BDD
  // Faire une route / controller qui renvoi tous les départements de API.GOUV (comme animal router et controller mais en faisant un allDepartment)
