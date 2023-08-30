CREATE DATABASE  IF NOT EXISTS `guilden` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `guilden`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: guilden
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'demande d\'aide'),(2,'nouveautés');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filters`
--

DROP TABLE IF EXISTS `filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `filters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `type` enum('role_playing_game','GM','player','schedule','location') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filters`
--

LOCK TABLES `filters` WRITE;
/*!40000 ALTER TABLE `filters` DISABLE KEYS */;
INSERT INTO `filters` VALUES (1,'jenesaispas','je ne sais toujours pas',''),(2,'jenesaispas2','coucou la vie','role_playing_game');
/*!40000 ALTER TABLE `filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend_requests`
--

DROP TABLE IF EXISTS `friend_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id_requester` int NOT NULL,
  `users_id_recipient` int NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_requester` (`users_id_requester`),
  KEY `ID_recipient` (`users_id_recipient`),
  CONSTRAINT `friend_requests_ibfk_1` FOREIGN KEY (`users_id_requester`) REFERENCES `users` (`id`),
  CONSTRAINT `friend_requests_ibfk_2` FOREIGN KEY (`users_id_recipient`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_requests`
--

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
INSERT INTO `friend_requests` VALUES (1,1,2,'pending','2023-08-14 09:00:00'),(2,2,1,'pending','2023-08-15 10:00:00');
/*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_registrations`
--

DROP TABLE IF EXISTS `game_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `games_id` int NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_party` (`games_id`),
  KEY `fk_party_registrations_users1_idx` (`users_id`),
  CONSTRAINT `fk_party_registrations_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `party_registrations_ibfk_1` FOREIGN KEY (`games_id`) REFERENCES `games` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_registrations`
--

LOCK TABLES `game_registrations` WRITE;
/*!40000 ALTER TABLE `game_registrations` DISABLE KEYS */;
INSERT INTO `game_registrations` VALUES (1,3,'pending',1),(2,56,'accepted',2);
/*!40000 ALTER TABLE `game_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_playing_game_id` int NOT NULL,
  `gm_profiles_id` int NOT NULL,
  `schedule` datetime NOT NULL,
  `max_players_capacity` tinyint DEFAULT NULL,
  `description` text,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `is_remote` tinyint NOT NULL DEFAULT '0',
  `is_campaign` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ID_role_playing_game` (`role_playing_game_id`),
  KEY `ID_GM` (`gm_profiles_id`),
  CONSTRAINT `parties_ibfk_1` FOREIGN KEY (`role_playing_game_id`) REFERENCES `role_playing_games` (`id`),
  CONSTRAINT `parties_ibfk_2` FOREIGN KEY (`gm_profiles_id`) REFERENCES `gm_profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (3,1,1,'2023-08-14 09:00:00',8,'super table','horror','game1','Paris',1,0),(56,2,1,'2023-08-26 16:00:00',8,'c\'est la game 2','investigation','game2','Marseille',0,1),(57,2,1,'2023-05-12 10:00:00',8,'bonjour','adventure','game3','Lyon',0,0);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games_has_users`
--

DROP TABLE IF EXISTS `games_has_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games_has_users` (
  `games_id` int NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`games_id`,`users_id`),
  KEY `fk_games_has_users_users1_idx` (`users_id`),
  KEY `fk_games_has_users_games1_idx` (`games_id`),
  CONSTRAINT `fk_games_has_users_games1` FOREIGN KEY (`games_id`) REFERENCES `games` (`id`),
  CONSTRAINT `fk_games_has_users_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games_has_users`
--

LOCK TABLES `games_has_users` WRITE;
/*!40000 ALTER TABLE `games_has_users` DISABLE KEYS */;
INSERT INTO `games_has_users` VALUES (3,1),(56,2);
/*!40000 ALTER TABLE `games_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gm_profiles`
--

DROP TABLE IF EXISTS `gm_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gm_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `description` text,
  `availability_schedule` text,
  `users_filters_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_user` (`users_id`),
  KEY `fk_gm_profiles_users_filters1_idx` (`users_filters_id`),
  CONSTRAINT `fk_gm_profiles_users_filters1` FOREIGN KEY (`users_filters_id`) REFERENCES `users_filters` (`id`),
  CONSTRAINT `gm_profiles_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gm_profiles`
--

LOCK TABLES `gm_profiles` WRITE;
/*!40000 ALTER TABLE `gm_profiles` DISABLE KEYS */;
INSERT INTO `gm_profiles` VALUES (1,1,'j\'adore jouer','2023-08-14 09:00:00',NULL),(2,2,'vive le jeu','2023-08-16 12:00:00',NULL);
/*!40000 ALTER TABLE `gm_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gm_ratings`
--

DROP TABLE IF EXISTS `gm_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gm_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gm_profiles_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `rating_date` datetime NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `ID_GM` (`gm_profiles_id`),
  KEY `fk_gm_ratings_users1_idx` (`users_id`),
  CONSTRAINT `fk_gm_ratings_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `gm_ratings_ibfk_1` FOREIGN KEY (`gm_profiles_id`) REFERENCES `gm_profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gm_ratings`
--

LOCK TABLES `gm_ratings` WRITE;
/*!40000 ALTER TABLE `gm_ratings` DISABLE KEYS */;
INSERT INTO `gm_ratings` VALUES (1,1,8,'c\'était super','2023-08-16 12:00:00',2),(2,2,7,'wow awesome','2023-08-17 12:00:00',1);
/*!40000 ALTER TABLE `gm_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_ratings`
--

DROP TABLE IF EXISTS `player_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gm_profiles_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `rating_date` datetime NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `ID_GM` (`gm_profiles_id`),
  KEY `fk_player_ratings_users1_idx` (`users_id`),
  CONSTRAINT `fk_player_ratings_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`),
  CONSTRAINT `player_ratings_ibfk_2` FOREIGN KEY (`gm_profiles_id`) REFERENCES `gm_profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_ratings`
--

LOCK TABLES `player_ratings` WRITE;
/*!40000 ALTER TABLE `player_ratings` DISABLE KEYS */;
INSERT INTO `player_ratings` VALUES (1,1,8,'joueur exceptionnel','2023-08-14 11:00:00',2),(2,2,9,'joueur super','2023-08-14 09:00:00',1);
/*!40000 ALTER TABLE `player_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topics_id` int NOT NULL,
  `users_id` int NOT NULL,
  `content` text,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_forum_topics_posts_forum_topics1_idx` (`topics_id`),
  KEY `fk_forum_topics_posts_users1_idx` (`users_id`),
  CONSTRAINT `fk_forum_topics_posts_forum_topics1` FOREIGN KEY (`topics_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `fk_forum_topics_posts_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,1,'génial j\'adore','2023-08-16 10:00:00'),(2,2,2,'elle est superbe','2023-08-16 09:00:00');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `private_messages`
--

DROP TABLE IF EXISTS `private_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `private_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id_sender` int NOT NULL,
  `users_id_recipient` int NOT NULL,
  `content` text NOT NULL,
  `date` datetime NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ID_sender` (`users_id_sender`),
  KEY `ID_recipient` (`users_id_recipient`),
  CONSTRAINT `private_messages_ibfk_1` FOREIGN KEY (`users_id_sender`) REFERENCES `users` (`id`),
  CONSTRAINT `private_messages_ibfk_2` FOREIGN KEY (`users_id_recipient`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_messages`
--

LOCK TABLES `private_messages` WRITE;
/*!40000 ALTER TABLE `private_messages` DISABLE KEYS */;
INSERT INTO `private_messages` VALUES (1,1,2,'coucou ça va','2023-08-16 12:00:00',1),(2,2,1,'ça va et toi ?','2023-08-16 12:01:00',1),(3,1,2,'très bien merci','2023-08-22 11:06:09',0);
/*!40000 ALTER TABLE `private_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_playing_games`
--

DROP TABLE IF EXISTS `role_playing_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_playing_games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `gm_profiles_id` int DEFAULT NULL,
  `rpg_icon` varchar(255) NOT NULL DEFAULT 'url_icon',
  PRIMARY KEY (`id`),
  KEY `Current_GM` (`gm_profiles_id`),
  CONSTRAINT `role_playing_games_ibfk_1` FOREIGN KEY (`gm_profiles_id`) REFERENCES `gm_profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_playing_games`
--

LOCK TABLES `role_playing_games` WRITE;
/*!40000 ALTER TABLE `role_playing_games` DISABLE KEYS */;
INSERT INTO `role_playing_games` VALUES (1,'dungeons & dragons','best game',1,'url_icon'),(2,'call of cthulhu','2nd game',1,'url_icon');
/*!40000 ALTER TABLE `role_playing_games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_user` (`users_id`),
  CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,1,'je vous aime','je vous aime vraiment','2023-08-16 10:00:00'),(2,2,'coucou les enfants','je vous salue','2023-08-16 10:05:00');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `categories_id` int NOT NULL,
  `users_id` int NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subscription_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_forum_topics_forums1_idx` (`categories_id`),
  KEY `fk_forum_topics_users1_idx` (`users_id`),
  CONSTRAINT `fk_forum_topics_forums1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_forum_topics_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'comment devenir un pgm',1,1,'2023-08-16 10:00:00',2),(2,'ma nouvelle épée',2,2,'2023-08-16 07:00:00',2);
/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topics_subscription`
--

DROP TABLE IF EXISTS `topics_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics_subscription` (
  `id` int NOT NULL,
  `users_id` int NOT NULL,
  `topics_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_topics_subscription_users1_idx` (`users_id`),
  KEY `fk_topics_subscription_topics1_idx` (`topics_id`),
  CONSTRAINT `fk_topics_subscription_topics1` FOREIGN KEY (`topics_id`) REFERENCES `topics` (`id`),
  CONSTRAINT `fk_topics_subscription_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics_subscription`
--

LOCK TABLES `topics_subscription` WRITE;
/*!40000 ALTER TABLE `topics_subscription` DISABLE KEYS */;
INSERT INTO `topics_subscription` VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE `topics_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email_adress` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `other_information` text,
  `is_gamemaster` enum('playerOnly','gmOnly','both') NOT NULL DEFAULT 'playerOnly',
  `availability_schedule` text,
  `description_as_player` text,
  `registration_date` timestamp NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `profil_picture` varchar(255) DEFAULT NULL,
  `description_as_gm` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'fredgreg','fred@greg.com','azerty','i\'m cool','playerOnly','2023-08-14 09:00:00','je suis là','2022-08-16 10:00:00','Paris','https://static.vecteezy.com/ti/vecteur-libre/p1/5544770-profil-icone-design-vecteur-gratuit-vectoriel.jpg','je suis gm'),(2,'romainniort','romain@niort.com','aqwxsz','coucou les gens','both','2023-08-14 09:00:00','i\'m here','2022-08-14 09:00:00','Nantes',NULL,'je suis plus gm que l\'autre');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_filters`
--

DROP TABLE IF EXISTS `users_filters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_filters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `filters_id` int NOT NULL,
  `value` text,
  PRIMARY KEY (`id`),
  KEY `fk_users_filters_users1_idx` (`users_id`),
  KEY `fk_users_filters_filters1_idx` (`filters_id`),
  CONSTRAINT `fk_users_filters_filters1` FOREIGN KEY (`filters_id`) REFERENCES `filters` (`id`),
  CONSTRAINT `fk_users_filters_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_filters`
--

LOCK TABLES `users_filters` WRITE;
/*!40000 ALTER TABLE `users_filters` DISABLE KEYS */;
INSERT INTO `users_filters` VALUES (1,2,1,NULL),(2,1,2,NULL);
/*!40000 ALTER TABLE `users_filters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_role_playing_games`
--

DROP TABLE IF EXISTS `users_has_role_playing_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_role_playing_games` (
  `users_id` int NOT NULL,
  `role_playing_games_id` int NOT NULL,
  PRIMARY KEY (`users_id`,`role_playing_games_id`),
  KEY `fk_users_has_role_playing_games_role_playing_games1_idx` (`role_playing_games_id`),
  KEY `fk_users_has_role_playing_games_users1_idx` (`users_id`),
  CONSTRAINT `fk_users_has_role_playing_games_role_playing_games1` FOREIGN KEY (`role_playing_games_id`) REFERENCES `role_playing_games` (`id`),
  CONSTRAINT `fk_users_has_role_playing_games_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_role_playing_games`
--

LOCK TABLES `users_has_role_playing_games` WRITE;
/*!40000 ALTER TABLE `users_has_role_playing_games` DISABLE KEYS */;
INSERT INTO `users_has_role_playing_games` VALUES (2,1),(1,2);
/*!40000 ALTER TABLE `users_has_role_playing_games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-28 10:49:51
