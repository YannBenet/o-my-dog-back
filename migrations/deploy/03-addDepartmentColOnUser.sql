-- Deploy oMyDog:03-addDepartmentColOnUser to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN department text;

COMMIT;
