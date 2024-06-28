BEGIN;

INSERT INTO
  "user" ("firstname", "lastname", "email", "city", "phone_number")
VALUES
    ('Jean', 'Dupont', 'jean.dupont@example.com', 'Paris', '0612345678'),
    ('Marie', 'Durand', 'marie.durand@example.com', 'Lyon', '0623456789'),
    ('Étienne', 'Martin', 'etienne.martin@example.com', 'Marseille', '0634567890'),
    ('Sophie', 'Bernard', 'sophie.bernard@example.com', 'Toulouse', '0645678901'),
    ('Lucas', 'Thomas', 'lucas.thomas@example.com', 'Nice', '0656789012'),
    ('Camille', 'Petit', 'camille.petit@example.com', 'Nantes', '0667890123'),
    ('Maxime', 'Robert', 'maxime.robert@example.com', 'Strasbourg', '0678901234'),
    ('Chloé', 'Richard', 'chloe.richard@example.com', 'Montpellier', '0689012345'),
    ('Alexandre', 'Dubois', 'alexandre.dubois@example.com', 'Bordeaux', '0690123456'),
    ('Julie', 'Moreau', 'julie.moreau@example.com', 'Lille', '0601234567'),
    ('Nicolas', 'Laurent', 'nicolas.laurent@example.com', 'Rennes', '0612345678'),
    ('Émilie', 'Simon', 'emilie.simon@example.com', 'Reims', '0623456789'),
    ('Vincent', 'Michel', 'vincent.michel@example.com', 'Saint-Étienne', '0634567890'),
    ('Aurélie', 'Lefebvre', 'aurelie.lefebvre@example.com', 'Toulon', '0645678901'),
    ('Pierre', 'Leroy', 'pierre.leroy@example.com', 'Le Havre', '0656789012'),
    ('Charlotte', 'Roux', 'charlotte.roux@example.com', 'Grenoble', '0667890123'),
    ('Antoine', 'David', 'antoine.david@example.com', 'Dijon', '0678901234'),
    ('Laura', 'Bertrand', 'laura.bertrand@example.com', 'Angers', '0689012345'),
    ('Julien', 'Morel', 'julien.morel@example.com', 'Nîmes', '0690123456'),
    ('Louise', 'Fournier', 'louise.fournier@example.com', 'Villeurbanne', '0601234567'),
    ('Sébastien', 'Girard', 'sebastien.girard@example.com', 'Clermont-Ferrand', '0612345678'),
    ('Alice', 'Bonnet', 'alice.bonnet@example.com', 'La Rochelle', '0623456789'),
    ('Gabriel', 'Dupuis', 'gabriel.dupuis@example.com', 'Cannes', '0634567890'),
    ('Manon', 'Lambert', 'manon.lambert@example.com', 'Versailles', '0645678901'),
    ('Théo', 'Fontaine', 'theo.fontaine@example.com', 'Rouen', '0656789012');

INSERT INTO
  "announce" ("date_start", "date_end", "mobility", "home", "description")
VALUES
    ('01/01/2024', '29/01/2024', TRUE, FALSE, 'Lorem ipsum dolor sit amet.'),
    ('02/02/2024', '28/02/2024', FALSE, TRUE, 'Consectetur adipiscing elit, sed do eiusmod tempor.'),
    ('03/03/2024', '29/03/2024', TRUE, TRUE, 'Incididunt ut labore et dolore magna aliqua.'),
    ('04/04/2024', '28/04/2024', FALSE, FALSE, 'Ut enim ad minim veniam, quis nostrud exercitation.'),
    ('05/05/2024', '29/05/2024', TRUE, FALSE, 'Ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ('06/06/2024', '28/06/2024', FALSE, TRUE, 'Duis aute irure dolor in reprehenderit.'),
    ('07/07/2024', '29/07/2024', TRUE, TRUE, 'In voluptate velit esse cillum dolore eu fugiat nulla pariatur.'),
    ('08/08/2024', '28/08/2024', FALSE, FALSE, 'Excepteur sint occaecat cupidatat non proident.'),
    ('09/09/2024', '29/09/2024', TRUE, FALSE, 'Sunt in culpa qui officia deserunt mollit anim id est laborum.'),
    ('10/10/2024', '28/10/2024', FALSE, TRUE, 'Sed ut perspiciatis unde omnis iste natus error.'),
    ('11/11/2024', '29/11/2024', TRUE, TRUE, 'Sit voluptatem accusantium doloremque laudantium.'),
    ('12/12/2024', '28/12/2024', FALSE, FALSE, 'Totam rem aperiam, eaque ipsa quae ab illo inventore.'),
    ('13/01/2024', '29/01/2024', TRUE, FALSE, 'Veritatis et quasi architecto beatae vitae dicta sunt explicabo.'),
    ('14/02/2024', '28/02/2024', FALSE, TRUE, 'Nemo enim ipsam voluptatem quia voluptas.'),
    ('15/03/2024', '29/03/2024', TRUE, TRUE, 'Aspernatur aut odit aut fugit, sed quia consequuntur.'),
    ('16/04/2024', '28/04/2024', FALSE, FALSE, 'Magni dolores eos qui ratione voluptatem.'),
    ('17/05/2024', '29/05/2024', TRUE, FALSE, 'Sequi nesciunt, neque porro quisquam est.'),
    ('18/06/2024', '28/06/2024', FALSE, TRUE, 'Qui dolorem ipsum quia dolor sit amet.'),
    ('19/07/2024', '29/07/2024', TRUE, TRUE, 'Consectetur, adipisci velit, sed quia non numquam.'),
    ('20/08/2024', '28/08/2024', FALSE, FALSE, 'Eius modi tempora incidunt ut labore et dolore.'),
    ('21/09/2024', '29/09/2024', TRUE, FALSE, 'Magnam aliquam quaerat voluptatem.'),
    ('22/10/2024', '28/10/2024', FALSE, TRUE, 'Ut enim ad minima veniam, quis nostrum exercitationem.'),
    ('23/11/2024', '29/11/2024', TRUE, TRUE, 'Ullam corporis suscipit laboriosam, nisi ut aliquid.'),
    ('24/12/2024', '28/12/2024', FALSE, FALSE, 'Ex ea commodi consequatur? Quis autem vel eum iure.'),
    ('25/01/2024', '29/01/2024', TRUE, FALSE, 'Reprehenderit qui in ea voluptate velit esse quam nihil.');

INSERT INTO 
    "animal_type" ("label") 
VALUES
    ('Chien'),
    ('Chat'),
    ('Poisson rouge'),
    ('Hamster'),
    ('Cochon d’Inde'),
    ('Lapin'),
    ('Canari'),
    ('Tortue'),
    ('Serpent domestique'),
    ('Lézard'),
    ('Grenouille'),
    ('Rat'),
    ('Souris'),
    ('Furet'),
    ('Chinchilla'),
    ('Perroquet'),
    ('Gecko'),
    ('Iguane'),
    ('Axolotl'),
    ('Hérisson domestique'),
    ('oiseau');

COMMIT;