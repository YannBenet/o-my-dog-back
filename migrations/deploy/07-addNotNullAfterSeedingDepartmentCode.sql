-- Deploy oMyDog:07-addNotNullAfterSeedingDepartmentCode to pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN "department_code" SET NOT NULL;

COMMIT;
