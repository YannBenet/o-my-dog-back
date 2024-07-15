-- Verify oMyDog:07-addNotNullAfterSeedingDepartmentCode on pg

BEGIN;

SELECT "department_code" FROM "user" WHERE "department_code" IS NULL;

ROLLBACK;
