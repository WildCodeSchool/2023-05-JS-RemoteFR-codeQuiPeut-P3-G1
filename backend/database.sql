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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Fantasy'),(2,'Science Fiction'),(3,'Horror'),(4,'Mystery'),(5,'Adventure');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filters`
--

LOCK TABLES `filters` WRITE;
/*!40000 ALTER TABLE `filters` DISABLE KEYS */;
INSERT INTO `filters` VALUES (1,'GM','Game Master','GM'),(2,'Player','Player','player'),(3,'Schedule','Event Schedule','schedule'),(4,'Location','Event Location','location'),(5,'Role-Playing Game','Role-Playing Game Event','role_playing_game');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_requests`
--

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
INSERT INTO `friend_requests` VALUES (1,1,2,'pending','2023-08-31 16:25:05'),(2,2,3,'accepted','2023-08-31 16:25:05'),(3,3,4,'rejected','2023-08-31 16:25:05'),(4,4,5,'pending','2023-08-31 16:25:05'),(5,5,1,'accepted','2023-08-31 16:25:05');
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
  `requester_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_party` (`games_id`),
  KEY `fk_party_registrations_users1_idx` (`requester_id`),
  CONSTRAINT `fk_party_registrations_users1` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`),
  CONSTRAINT `party_registrations_ibfk_1` FOREIGN KEY (`games_id`) REFERENCES `games` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_registrations`
--

LOCK TABLES `game_registrations` WRITE;
/*!40000 ALTER TABLE `game_registrations` DISABLE KEYS */;
INSERT INTO `game_registrations` VALUES (1,1,'accepted',2),(2,5,'accepted',3),(3,2,'accepted',3),(4,3,'accepted',4),(5,4,'accepted',5),(6,1,'accepted',3),(7,4,'accepted',1),(8,4,'pending',3),(9,2,'accepted',5),(10,1,'pending',5),(11,1,'pending',5),(12,4,'pending',2);
/*!40000 ALTER TABLE `game_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_registrations_as_player`
--

DROP TABLE IF EXISTS `game_registrations_as_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_registrations_as_player` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_id` int NOT NULL,
  `games_id` int NOT NULL,
  `status` enum('pending','accepted','rejected') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_registrations_has_player_users1_idx` (`player_id`),
  KEY `fk_game_registrations_has_player_games1_idx` (`games_id`),
  CONSTRAINT `fk_game_registrations_has_player_games1` FOREIGN KEY (`games_id`) REFERENCES `games` (`id`),
  CONSTRAINT `fk_game_registrations_has_player_users1` FOREIGN KEY (`player_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_registrations_as_player`
--

LOCK TABLES `game_registrations_as_player` WRITE;
/*!40000 ALTER TABLE `game_registrations_as_player` DISABLE KEYS */;
INSERT INTO `game_registrations_as_player` VALUES (1,1,1,'pending'),(2,2,2,'pending'),(3,3,3,'pending'),(4,4,4,'pending'),(5,2,5,'pending'),(6,5,4,'pending'),(7,1,5,'pending');
/*!40000 ALTER TABLE `game_registrations_as_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--


CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_playing_game_id` int NOT NULL,
  `schedule` datetime NOT NULL,
  `max_players_capacity` tinyint DEFAULT NULL,
  `description` text,
  `type` varchar(255) DEFAULT NULL,
  `guild_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `is_remote` tinyint NOT NULL DEFAULT '0',
  `is_campaign` tinyint NOT NULL DEFAULT '0',
  `gm_username` varchar(45) NOT NULL,
  `gm_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_role_playing_game` (`role_playing_game_id`),
  CONSTRAINT `parties_ibfk_1` FOREIGN KEY (`role_playing_game_id`) REFERENCES `role_playing_games` (`id`)
)

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,1,'2023-10-15 19:00:00',5,'Join us for an epic fantasy adventure!','Adventure','Rise of Heroes','Avalon',0,1,'Raxion','1'),(2,2,'2023-10-20 18:30:00',4,'Explore the galaxy in this Star Wars RPG.','Adventure','Galactic Explorations','Coruscant',1,0,'Elgon','2'),(3,3,'2023-10-18 20:00:00',6,'Uncover the secrets of the ancient city.','Horror','Cthulhu Chronicles','Arkham',0,0,'Blake','3'),(4,4,'2023-10-16 15:00:00',3,'Solve puzzles and mysteries in Victorian London.','Sci-Fi','Sherlock Adventures','London',0,1,'Nestadar','4'),(5,5,'2023-10-19 14:00:00',5,'Embark on a journey in a high-fantasy world.','Horror','Epic Odyssey','Narnia',1,1,'Moix','5');
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
INSERT INTO `games_has_users` VALUES (4,1),(1,2),(5,3),(3,4),(2,5),(4,5);
/*!40000 ALTER TABLE `games_has_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gm_ratings`
--

DROP TABLE IF EXISTS `gm_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gm_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `comment` text,
  `rating_date` datetime NOT NULL,
  `users_id` int NOT NULL,
  `gm_username` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_gm_ratings_users1_idx` (`users_id`),
  CONSTRAINT `fk_gm_ratings_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gm_ratings`
--

LOCK TABLES `gm_ratings` WRITE;
/*!40000 ALTER TABLE `gm_ratings` DISABLE KEYS */;
INSERT INTO `gm_ratings` VALUES (1,4,'Great game master!','2023-08-31 16:27:42',1,'user1'),(2,5,'Very skilled at storytelling.','2023-08-31 16:27:42',2,'user2'),(3,3,'Could improve pacing during sessions.','2023-08-31 16:27:42',3,'user3'),(4,4,'Engaging and creative sessions.','2023-08-31 16:27:42',4,'user4'),(5,2,'Lacks preparation, but fun sessions.','2023-08-31 16:27:42',5,'user5');
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
  `rating` int NOT NULL,
  `comment` text,
  `rating_date` datetime NOT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`,`users_id`),
  KEY `fk_player_ratings_users1_idx` (`users_id`),
  CONSTRAINT `fk_player_ratings_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_ratings`
--

LOCK TABLES `player_ratings` WRITE;
/*!40000 ALTER TABLE `player_ratings` DISABLE KEYS */;
INSERT INTO `player_ratings` VALUES (1,4,'Great player, very engaged in the sessions.','2023-08-31 16:31:22',1),(2,5,'Role-playing skills are top-notch.','2023-08-31 16:31:22',2),(3,3,'Sometimes could be more proactive in the game.','2023-08-31 16:31:22',3),(4,4,'Creative and collaborative player.','2023-08-31 16:31:22',4),(5,2,'Needs to improve participation in role-play.','2023-08-31 16:31:22',5);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,1,'I love discussing fantasy worlds! What are your favorites?','2023-08-31 14:32:14'),(2,2,2,'Sci-fi RPGs have always been my passion. Any recommendations?','2023-08-31 14:32:14'),(3,3,3,'Horror stories give me a thrill. Share your scariest moments!','2023-08-31 14:32:14'),(4,4,4,'Solving mysteries in RPGs is such a unique experience. Thoughts?','2023-08-31 14:32:14'),(5,5,5,'Epic adventures create unforgettable memories. Let\'s talk about them!','2023-08-31 14:32:14');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `private_messages`
--

LOCK TABLES `private_messages` WRITE;
/*!40000 ALTER TABLE `private_messages` DISABLE KEYS */;
INSERT INTO `private_messages` VALUES (4,1,2,'Hey, are you joining the fantasy campaign this weekend?','2023-08-31 16:32:47',1),(5,2,3,'I have some sci-fi RPG suggestions for you. Let\'s chat!','2023-08-31 16:32:47',0),(6,3,4,'Do you enjoy horror RPGs? Let\'s discuss some recommendations.','2023-08-31 16:32:47',1),(7,4,5,'Solving mysteries in RPGs is my favorite. Want to share stories?','2023-08-31 16:32:47',0),(8,5,1,'Epic adventures await! Let\'s plan our next campaign.','2023-08-31 16:32:47',1);
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
  `rpg_icon` varchar(255) NOT NULL DEFAULT 'url_icon',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_playing_games`
--

LOCK TABLES `role_playing_games` WRITE;
/*!40000 ALTER TABLE `role_playing_games` DISABLE KEYS */;
INSERT INTO `role_playing_games` VALUES (1,'Lord of The Rings','Fantasy role-playing game','assets/images/rpgPictures/lotr.png'),(2,'Chill','Science fiction role-playing game','assets/images/rpgPictures/chill.png'),(3,'Call of Cthulhu','Horror role-playing game','assets/images/rpgPictures/callOfCthulhu.png'),(4,'Legend Fire Ring','Mystery role-playing game','assets/images/rpgPictures/legendFireRing.png'),(5,'Kult','Fantasy role-playing game','assets/images/rpgPictures/kult.png'),(6,'Cyberpunk','Fantasy role-playing game','assets/images/rpgPictures/cyberpunk.png'),(7,'Shadow Run','Fantasy role-playing game','assets/images/rpgPictures/shadowrun.png'),(8,'Dungeons & Dragons','Fantasy role-playing game','assets/images/rpgPictures/dndIcon.png'),(9,'Symbaroug','One of the best','assets/images/rpgPictures/symbaroug.png'),(10,'Vampire','Keep quiet, they are here !','assets/images/rpgPictures/vampire.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,1,'Great Game Experience','I had an amazing time in the campaign. The GM was fantastic!','2023-08-31 14:29:01'),(2,2,'Incredible Storytelling','The GM\'s storytelling skills are unparalleled. Highly recommended.','2023-08-31 14:29:01'),(3,3,'Engaging Sessions','Enjoyed the sessions, although some parts were a bit slow.','2023-08-31 14:29:01'),(4,4,'Thoroughly Enjoyable','The mysteries in the game were captivating. Had a great time!','2023-08-31 14:29:01'),(5,5,'Fun and Unique','Despite some unpreparedness, the GM made the game enjoyable.','2023-08-31 14:29:01');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topics`
--

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;
INSERT INTO `topics` VALUES (1,'Favorite Fantasy Worlds',1,1,'2023-08-31 14:29:31',10),(2,'Best Sci-Fi RPGs',2,2,'2023-08-31 14:29:31',5),(3,'Horror Stories to Share',3,3,'2023-08-31 14:29:31',3),(4,'Solving Mysteries in RPGs',4,4,'2023-08-31 14:29:31',7),(5,'Epic Adventure Moments',5,5,'2023-08-31 14:29:31',12);
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
INSERT INTO `topics_subscription` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5);
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
  `hashedPassword` varchar(255) NOT NULL,
  `other_information` text,
  `description_as_player` text,
  `registration_date` timestamp NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `profil_picture` varchar(255) DEFAULT 'assets/images/profilPictures/defaultUserPicture.png',
  `description_as_gm` varchar(255) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Raxion','user1@example.com','$argon2id$v=19$m=65536,t=5,p=1$1cy6eNa1lqGuy6TimPNASw$EhUwJpP6dnQn6yKlEkv2hyVNhGq9SsIVZidjri8rnUM','OK','A skilled player of every imaginable universe. From the Dungeon to the Galactica, I\'ve explored it all ! 7 years\' experience, boundless creativity and an extraordinary sense of adventure. Ready to reach for the stars and experience some wild adventures! #RollTheDice','2023-08-31 14:24:53','Paris','assets/images/profilPictures/ADider_Bourdon.jpeg','Gm at 90%','France'),(2,'Elgon','user2@example.com','$argon2id$v=19$m=65536,t=5,p=1$1cy6eNa1lqGuy6TimPNASw$EhUwJpP6dnQn6yKlEkv2hyVNhGq9SsIVZidjri8rnUM','Ok2','A skilled player of every imaginable universe. From the Dungeon to the Galactica, I\'ve explored it all ! 7 years\' experience, boundless creativity and an extraordinary sense of adventure. Ready to reach for the stars and experience some wild adventures! #RollTheDice','2023-08-31 14:24:53','Lyon','assets/images/profilPictures/AJackyMichel.jpeg','Gm at 0%','Algérie'),(3,'Blake','user3@example.com','$argon2id$v=19$m=65536,t=5,p=1$1cy6eNa1lqGuy6TimPNASw$EhUwJpP6dnQn6yKlEkv2hyVNhGq9SsIVZidjri8rnUM','ok3','A skilled player of every imaginable universe. From the Dungeon to the Galactica, I\'ve explored it all ! 7 years\' experience, boundless creativity and an extraordinary sense of adventure. Ready to reach for the stars and experience some wild adventures! #RollTheDice','2023-08-31 14:24:53','Marseille','assets/images/profilPictures/AJacqueline_Dupond.jpeg','What\'s a GM ? ','Tunisie'),(4,'Nestadar','user4@example.com','$argon2id$v=19$m=65536,t=5,p=1$1cy6eNa1lqGuy6TimPNASw$EhUwJpP6dnQn6yKlEkv2hyVNhGq9SsIVZidjri8rnUM','ok4','A skilled player of every imaginable universe. From the Dungeon to the Galactica, I\'ve explored it all ! 7 years\' experience, boundless creativity and an extraordinary sense of adventure. Ready to reach for the stars and experience some wild adventures! #RollTheDice','2023-08-31 14:24:53','Tours','assets/images/profilPictures/ASandrine_Rousseau.jpeg','Only Dnd','Allemagne'),(5,'Moix','user5@example.com','$argon2id$v=19$m=65536,t=5,p=1$1cy6eNa1lqGuy6TimPNASw$EhUwJpP6dnQn6yKlEkv2hyVNhGq9SsIVZidjri8rnUM','ok5','A skilled player of every imaginable universe. From the Dungeon to the Galactica, I\'ve explored it all ! 7 years\' experience, boundless creativity and an extraordinary sense of adventure. Ready to reach for the stars and experience some wild adventures! #RollTheDice','2023-08-31 14:24:53','Bordeaux','assets/images/profilPictures/defaultUserPicture.png','Only Fan','Israël');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_filters`
--

LOCK TABLES `users_filters` WRITE;
/*!40000 ALTER TABLE `users_filters` DISABLE KEYS */;
INSERT INTO `users_filters` VALUES (1,1,1,'Master'),(2,2,2,'Player'),(3,3,3,'Flexible'),(4,4,4,'Online'),(5,5,5,'GM');
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
INSERT INTO `users_has_role_playing_games` VALUES (1,1),(5,1),(2,2),(4,2),(1,3),(3,3),(4,3),(4,4),(5,5),(5,6),(5,7),(5,8);
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

-- Dump completed on 2023-09-29 17:59:18
