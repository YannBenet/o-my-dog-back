
// export default async function validateLocation(req, res, next) {
//     const city = "Poi";
//     try {
//         const result = await fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=nom,departement&boost=population&limit=5`);
//         const data = await result.json();
//         // Vérifie si au moins une des communes retournées correspond exactement au nom de la ville recherché
//         const hasExactMatch = data.some(commune => commune.nom === city);
//         if (!hasExactMatch) {
//             return res.status(400).json({ error: 'Invalid city name or no exact match found.' });
//         }
//         console.log(data); // Affiche les données si une correspondance exacte est trouvée
//         //next(); // Continue avec le middleware suivant si nécessaire
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error validating location' });
//     }
// }

// validateLocation();

export default () => async (req, res, next) => {
    const cityReq = req.body.city;
    console.log("contenu de la requete formulaire:", cityReq)
    try {
        const result = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityReq}&fields=nom,departement&boost=population&limit=5`);
        const data = await result.json();
        console.log("Résultat du fetch", data);
        const cityApi = data[0].nom;

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
            return res.status(200).json({'Succes': `${cityApi} is a valid city name`});
        } 
        // si une seule commune trouvée et que la commune correspond à la ville recherchée
        else if (data.length === 1 && normalizeString(cityApi) === normalizeString(cityReq)){
            return res.status(200).json({'Succes': `${cityApi} is a valid city name`});
        }
        else {
            return err;
        }
        
    }catch(err){
        return res.status(400).json({ error: 'Invalid city name or no exact match found.' });
    }
  };
