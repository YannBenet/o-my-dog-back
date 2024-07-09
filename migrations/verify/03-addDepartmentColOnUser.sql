-- Verify oMyDog:03-addDepartmentColOnUser on pg

BEGIN;

SELECT "department" FROM "user" WHERE FALSE;

ROLLBACK;
