use session_test;
DELIMITER //


-- USER REGISTER
CREATE OR REPLACE PROCEDURE insertUser (IN p_user_email VARCHAR(255), p_user_password VARCHAR(255))
NOT DETERMINISTIC
CONTAINS SQL
BEGIN
    INSERT INTO User(email, `password`)
    VALUES (p_user_email, SHA2(p_user_password, 512));
END //

-- USER LOGIN
CREATE OR REPLACE PROCEDURE checkCredentials(IN p_user_email VARCHAR(255), IN p_user_password VARCHAR(255))
NOT DETERMINISTIC
CONTAINS SQL
BEGIN
    SELECT id, email
    FROM User
    WHERE User.email = p_user_email AND User.password = SHA2(p_user_password, 512);
END //
