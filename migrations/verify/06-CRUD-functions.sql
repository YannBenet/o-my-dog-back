-- Verify oMyDog:06-CRUD-functions on pg

BEGIN;

SELECT *
FROM pg_proc
WHERE proname IN (
  'insert_announcement',
  'update_announcement',
  'delete_announcement',
  'insert_announcement_animal_type',
  'delete_announcement_animal_type',
  'insert_user',
  'update_user',
  'delete_user'
);

ROLLBACK;
