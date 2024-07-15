-- Revert oMyDog:06-addDepartmentCodeOnUser from pg

BEGIN;

ALTER TABLE "user" 
DROP COLUMN "department_code";

COMMIT;
