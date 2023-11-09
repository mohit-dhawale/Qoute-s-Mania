CREATE DATABASE quotes_db;
USE quotes_db;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS fav_quotes;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25),
    last_name VARCHAR(25),
    email varchar(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(15),
    dob TIMESTAMP,
    profileImage VARCHAR(100),
    createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quotes(
     id INT PRIMARY KEY AUTO_INCREMENT,
     title VARCHAR(100),
     quotes VARCHAR(1000),
     author VARCHAR(50),
     userId INT,
     createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     modifiedDate TIMESTAMP DEFAULT NULL,
     likeCount INT DEFAULT 0
     
);

CREATE TABLE fav_quotes (
    userId INT,
    quoteID INT
);