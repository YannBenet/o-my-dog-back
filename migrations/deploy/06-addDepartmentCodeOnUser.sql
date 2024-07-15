-- Deploy oMyDog:06-addDepartmentCodeOnUser to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN "department_code" text;

COMMIT;
