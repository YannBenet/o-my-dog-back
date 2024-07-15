-- Verify oMyDog:06-addDepartmentCodeOnUser on pg

BEGIN;

SELECT "department_code" FROM "user" WHERE FALSE;

ROLLBACK;
