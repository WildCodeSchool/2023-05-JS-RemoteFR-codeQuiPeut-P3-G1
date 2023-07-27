-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema guilden
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema guilden
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `guilden` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `guilden` ;

-- -----------------------------------------------------
-- Table `guilden`.`filters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`filters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `type` ENUM('role_playing_game', 'GM', 'player', 'schedule', 'location') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email_adress` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `other_information` TEXT NULL DEFAULT NULL,
  `is_gamemaster` TINYINT NOT NULL DEFAULT '0',
  `availability_schedule` TEXT NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`friend_requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`friend_requests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id_requester` INT NOT NULL,
  `users_id_recipient` INT NOT NULL,
  `status` ENUM('pending', 'accepted', 'rejected') NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ID_requester` (`users_id_requester` ASC) VISIBLE,
  INDEX `ID_recipient` (`users_id_recipient` ASC) VISIBLE,
  CONSTRAINT `friend_requests_ibfk_1`
    FOREIGN KEY (`users_id_requester`)
    REFERENCES `guilden`.`users` (`id`),
  CONSTRAINT `friend_requests_ibfk_2`
    FOREIGN KEY (`users_id_recipient`)
    REFERENCES `guilden`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`users_filters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`users_filters` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `filters_id` INT NOT NULL,
  `value` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_filters_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_users_filters_filters1_idx` (`filters_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_filters_filters1`
    FOREIGN KEY (`filters_id`)
    REFERENCES `guilden`.`filters` (`id`),
  CONSTRAINT `fk_users_filters_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`gm_profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`gm_profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `availability_schedule` TEXT NULL DEFAULT NULL,
  `users_filters_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ID_user` (`users_id` ASC) VISIBLE,
  INDEX `fk_gm_profiles_users_filters1_idx` (`users_filters_id` ASC) VISIBLE,
  CONSTRAINT `fk_gm_profiles_users_filters1`
    FOREIGN KEY (`users_filters_id`)
    REFERENCES `guilden`.`users_filters` (`id`),
  CONSTRAINT `gm_profiles_ibfk_1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`gm_ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`gm_ratings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gm_profiles_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  `rating_date` DATETIME NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `ID_GM` (`gm_profiles_id` ASC) VISIBLE,
  INDEX `fk_gm_ratings_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_gm_ratings_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`),
  CONSTRAINT `gm_ratings_ibfk_1`
    FOREIGN KEY (`gm_profiles_id`)
    REFERENCES `guilden`.`gm_profiles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`role_playing_games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`role_playing_games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `gm_profiles_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `Current_GM` (`gm_profiles_id` ASC) VISIBLE,
  CONSTRAINT `role_playing_games_ibfk_1`
    FOREIGN KEY (`gm_profiles_id`)
    REFERENCES `guilden`.`gm_profiles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_playing_game_id` INT NOT NULL,
  `gm_profiles_id` INT NOT NULL,
  `schedule` DATETIME NOT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `max_players_capacity` INT NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `filters_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ID_role_playing_game` (`role_playing_game_id` ASC) VISIBLE,
  INDEX `ID_GM` (`gm_profiles_id` ASC) VISIBLE,
  INDEX `fk_parties_filters1_idx` (`filters_id` ASC) VISIBLE,
  CONSTRAINT `fk_parties_filters1`
    FOREIGN KEY (`filters_id`)
    REFERENCES `guilden`.`filters` (`id`),
  CONSTRAINT `parties_ibfk_1`
    FOREIGN KEY (`role_playing_game_id`)
    REFERENCES `guilden`.`role_playing_games` (`id`),
  CONSTRAINT `parties_ibfk_2`
    FOREIGN KEY (`gm_profiles_id`)
    REFERENCES `guilden`.`gm_profiles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`game_registrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`game_registrations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `games_id` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ID_party` (`games_id` ASC) VISIBLE,
  INDEX `fk_party_registrations_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_party_registrations_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`),
  CONSTRAINT `party_registrations_ibfk_1`
    FOREIGN KEY (`games_id`)
    REFERENCES `guilden`.`games` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`player_ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`player_ratings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gm_profiles_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `comment` TEXT NULL DEFAULT NULL,
  `rating_date` DATETIME NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `ID_GM` (`gm_profiles_id` ASC) VISIBLE,
  INDEX `fk_player_ratings_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_player_ratings_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`),
  CONSTRAINT `player_ratings_ibfk_2`
    FOREIGN KEY (`gm_profiles_id`)
    REFERENCES `guilden`.`gm_profiles` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`private_messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`private_messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id_sender` INT NOT NULL,
  `users_id_recipient` INT NOT NULL,
  `content` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `read` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `ID_sender` (`users_id_sender` ASC) VISIBLE,
  INDEX `ID_recipient` (`users_id_recipient` ASC) VISIBLE,
  CONSTRAINT `private_messages_ibfk_1`
    FOREIGN KEY (`users_id_sender`)
    REFERENCES `guilden`.`users` (`id`),
  CONSTRAINT `private_messages_ibfk_2`
    FOREIGN KEY (`users_id_recipient`)
    REFERENCES `guilden`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`testimonials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`testimonials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `ID_user` (`users_id` ASC) VISIBLE,
  CONSTRAINT `testimonials_ibfk_1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`topics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`topics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `categories_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_count` INT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_forum_topics_forums1_idx` (`categories_id` ASC) VISIBLE,
  INDEX `fk_forum_topics_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_forum_topics_forums1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `guilden`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_forum_topics_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `guilden`.`games_has_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`games_has_users` (
  `games_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`games_id`, `users_id`),
  INDEX `fk_games_has_users_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_games_has_users_games1_idx` (`games_id` ASC) VISIBLE,
  CONSTRAINT `fk_games_has_users_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `guilden`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_games_has_users_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `guilden`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topics_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `content` TEXT NULL,
  `date` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_forum_topics_posts_forum_topics1_idx` (`topics_id` ASC) VISIBLE,
  INDEX `fk_forum_topics_posts_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_forum_topics_posts_forum_topics1`
    FOREIGN KEY (`topics_id`)
    REFERENCES `guilden`.`topics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_forum_topics_posts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `guilden`.`topics_subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guilden`.`topics_subscription` (
  `id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `topics_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_topics_subscription_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_topics_subscription_topics1_idx` (`topics_id` ASC) VISIBLE,
  CONSTRAINT `fk_topics_subscription_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `guilden`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_topics_subscription_topics1`
    FOREIGN KEY (`topics_id`)
    REFERENCES `guilden`.`topics` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
