--
-- Drop Tables
--

DROP TABLE if exists users;
DROP TABLE if exists exercises;
DROP TABLE if exists favorite_exercises;
DROP TABLE if exists favorite_food;



--
-- Create Tables
--

CREATE TABLE `favorite_exercises`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `users_id` INT NOT NULL,
    `exercises_id` INT NOT NULL
);

CREATE TABLE `favorite_food`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `users_id` INT NOT NULL,
    `external_api_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL
);

CREATE TABLE `exercises`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `goal` VARCHAR(255) NOT NULL,
    `muscles` VARCHAR(255) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `equipment` VARCHAR(255) NOT NULL
);

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `height` INT NOT NULL,
    `weight` INT NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `goal` VARCHAR(255) NOT NULL
);
