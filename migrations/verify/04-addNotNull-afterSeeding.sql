-- Verify oMyDog:04-addNotNull-afterSeeding on pg

BEGIN;

SELECT "department_label" FROM "USER" WHERE "department_label" IS NULL;

ROLLBACK;
