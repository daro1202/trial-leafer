-- MySQL dump 10.19  Distrib 10.3.34-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: falcon
-- ------------------------------------------------------
-- Server version	10.3.34-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customer_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_card_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_tel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_postal_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_prefecture` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_other` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('cus_L7lhfYB1hxrCI0','ふぁるこん','一太郎','','','','','','','2022-02-10 15:29:40'),('cus_L7mi1jM1A2u91f','ふぁるこん','二太郎','','','','','','','2022-02-10 16:33:17'),('cus_LDL9NjHJla8M8o','ふぁるこん毎日住所','六太郎','YUSUKE YOSHIDA','090-1234-5678','160-0023','東京都','新宿区西新宿','1-1-1　新宿ビル1F','2022-02-25 12:28:12'),('cus_LDLFQMtg8urlPn','ふぁるこん毎日住所','七太郎','NANATARO FALCON77777','090-1111-2222','910-0005','福井県','福井市大手','1-1-1','2022-02-25 12:33:44');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorite` (
  `favorite_id` int(11) NOT NULL AUTO_INCREMENT,
  `favorite_user_id` int(11) NOT NULL,
  `favorite_asin` varchar(191) NOT NULL,
  PRIMARY KEY (`favorite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(5) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_rank` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_cus_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'falcon1@gmail.com','$2y$10$gRsVYCtWBh/FXjZwBlf/0e6SJESXXE05dbv4f4cB4sYKn3eNpwSnu','executive','cus_L7lhfYB1hxrCI0','2022-02-10 15:29:40'),(2,'falcon2@gmail.com','$2y$10$R9QtlHgGigaw/ua6PIKpl.cP6ZHqO5xDDeEONScxPw2Uf9YzK1gNK','executive','cus_L7mi1jM1A2u91f','2022-02-10 16:33:17'),(3,'falcon6@gmail.com','$2y$10$hiduvQQx6RAW5PoGeRxpGe531.D7oRpPliX/LIjHcmVyaaZzz21eu','ban','cus_LDL9NjHJla8M8o','2022-02-25 12:28:12'),(4,'falcon77777@gmail.com','$2y$10$ZqrLKuwhNBx44SqNe2zmGOFiCyy2PW65GFqRSUx.CCazianH0o.VO','ban','cus_LDLFQMtg8urlPn','2022-02-25 12:33:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-08 14:37:34
