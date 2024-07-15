-- Revert oMyDog:07-addNotNullAfterSeedingDepartmentCode from pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN "department_code" DROP NOT NULL;

COMMIT;
