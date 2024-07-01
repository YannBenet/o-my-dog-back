# projet-6-o-mydog-back

- Mise en place de la branche dev => "git pull" puis "git checkout dev" pour y accéder
- pensez à vous mettre sur la branch dev avant de créer vos branche pour votre code
- merci de ne pas coder sur la branch main

Comment créer la BDD en local :

```bash
postgres=# CREATE USER omydog WITH PASSWORD 'omydog';
postgres=# CREATE DATABASE omydog OWNER omydog;
```

Si problème lors du seeding :

```bash
ALTER SEQUENCE user_id_seq RESTART WITH 1;
ALTER SEQUENCE user_id_seq RESTART WITH 1;
ALTER SEQUENCE announcement_animal_type_id_seq RESTART WITH 1;
ALTER SEQUENCE animal_type_id_seq RESTART WITH 1;
ALTER SEQUENCE announcement_id_seq RESTART WITH 1;
\i ./data/seeding.sql
```
