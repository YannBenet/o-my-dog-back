-- Revert oMyDog:03-addDepartmentColOnUser from pg

BEGIN;

ALTER TABLE "user" REMOVE COLUMN department;

COMMIT;
