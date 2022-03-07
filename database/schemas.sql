DROP DATABASE IF EXISTS session_test;

CREATE DATABASE session_test;

use session_test;

CREATE TABLE User(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY(id),
    UNIQUE `idx_uniq_email` USING BTREE (`email`)
) ENGINE=InnoDB;
