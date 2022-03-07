CREATE OR REPLACE USER 'webapp'@'localhost' IDENTIFIED BY 'monsupermotdepasse';
GRANT EXECUTE ON session_test.* TO 'webapp'@'localhost';
