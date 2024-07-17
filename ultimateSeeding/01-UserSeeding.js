import { UserDatamapper } from "../app/datamappers/index.datamapper.js";
import bcrypt from "bcrypt";
import axios from "axios";
import faker from "faker";

// Fonction pour récupérer les villes et départements français
async function fetchFrenchCitiesAndDepartments() {
  const citiesResponse = await axios.get('https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,departement&format=json&geometry=centre');
  return citiesResponse.data;
}

// Fonction pour générer un numéro de téléphone valide qui commence par "06"
function generatePhoneNumber() {
  const randomDigits = faker.datatype.number({ min: 10000000, max: 99999999 }).toString();
  return `06${randomDigits}`;
}

// Fonction pour générer les données de seeding
async function generateSeedData() {
  const password = 'P@ssw0rd!!P@ssw0rd!!'; // Mot de passe commun pour tous les utilisateurs, respectant les critères
  const hashedPassword = await bcrypt.hash(password, 10);
  const cities = await fetchFrenchCitiesAndDepartments();

  // Randomly pick 5 cities
  const users = Array.from({ length: 5 }, () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const { nom: city, departement } = randomCity;

    return {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      city,
      phone_number: generatePhoneNumber(), // Utilise la fonction pour générer un numéro de téléphone valide
      department_label: departement.nom,
    };
  });

  return users;
}

// Fonction pour insérer les utilisateurs dans la base de données
async function seedDatabase() {
  const users = await generateSeedData();

  for (const user of users) {
    await UserDatamapper.create(user);
  }

  console.log('Seeding completed.');
}

seedDatabase().catch(console.error);
