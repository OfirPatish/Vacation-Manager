-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vacationdb
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('User','Admin') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ofir','Patish','ofirpatishop@gmail.com','12345','Admin'),(2,'Test','User','test@example.com','12345','User'),(3,'John','Doe','john.doe@example.com','password1','User'),(4,'Jane','Smith','jane.smith@example.com','password2','User'),(5,'Alice','Johnson','alice.johnson@example.com','password3','User'),(6,'Bob','Brown','bob.brown@example.com','password4','User'),(7,'Charlie','Davis','charlie.davis@example.com','password5','User'),(8,'David','Miller','david.miller@example.com','password6','User'),(9,'Eve','Wilson','eve.wilson@example.com','password7','User'),(10,'Frank','Moore','frank.moore@example.com','password8','User'),(11,'Grace','Taylor','grace.taylor@example.com','password9','User'),(12,'Hank','Anderson','hank.anderson@example.com','password10','User'),(13,'Ivy','Thomas','ivy.thomas@example.com','password11','User'),(14,'Jack','Jackson','jack.jackson@example.com','password12','User'),(15,'Kathy','White','kathy.white@example.com','password13','User'),(16,'Leo','Harris','leo.harris@example.com','password14','User'),(17,'Mia','Martin','mia.martin@example.com','password15','User'),(18,'Nina','Thompson','nina.thompson@example.com','password16','User'),(19,'Oscar','Garcia','oscar.garcia@example.com','password17','User'),(20,'Paul','Martinez','paul.martinez@example.com','password18','User'),(21,'Quinn','Robinson','quinn.robinson@example.com','password19','User'),(22,'Rita','Clark','rita.clark@example.com','password20','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `summary` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'New York','Explore the city that never sleeps. From the towering skyscrapers of Manhattan to the historic neighborhoods of Brooklyn, New York City offers an endless array of attractions and activities. Visit iconic landmarks such as the Statue of Liberty, Times Square, and Central Park. Enjoy world-class dining, shopping, and entertainment. Whether you\'re interested in art, history, or simply soaking in the vibrant atmosphere, New York City has something for everyone.','2024-07-31','2024-09-06',2500.00,'new_york.jpg'),(2,'San Francisco','Visit the Golden Gate Bridge and Alcatraz. San Francisco is known for its stunning natural beauty, diverse culture, and rich history. Take a stroll along the waterfront, explore the bustling neighborhoods, and enjoy the city\'s famous cuisine. Don\'t miss the chance to ride a cable car, visit Fisherman\'s Wharf, and take in the breathtaking views from Twin Peaks. San Francisco is a city that will captivate your heart and leave you wanting more.','2024-08-10','2024-08-20',2400.00,'san_francisco.jpg'),(3,'Miami','Enjoy the beaches and nightlife of Miami. Miami is a vibrant city known for its beautiful beaches, lively nightlife, and diverse culture. Relax on the sandy shores of South Beach, explore the colorful Art Deco District, and indulge in the city\'s world-renowned dining and shopping. Whether you\'re looking to party the night away or simply unwind in the sun, Miami offers the perfect blend of excitement and relaxation.','2024-08-25','2024-09-05',2300.00,'miami.jpg'),(4,'Las Vegas','Experience the entertainment capital of the world. Las Vegas is a city like no other, offering a dazzling array of entertainment options. From world-class shows and concerts to luxurious casinos and resorts, there\'s never a dull moment in Las Vegas. Explore the famous Las Vegas Strip, try your luck at the slot machines, and enjoy the city\'s vibrant nightlife. Whether you\'re a high roller or just looking for a fun getaway, Las Vegas has something for everyone.','2024-09-10','2024-09-20',2200.00,'las_vegas.jpg'),(5,'Chicago','Discover the architecture and culture of Chicago. Chicago is a city known for its stunning architecture, rich history, and vibrant cultural scene. Take a stroll along the Magnificent Mile, visit the Art Institute of Chicago, and enjoy the city\'s famous deep-dish pizza. Don\'t miss the chance to explore Millennium Park, take a boat tour along the Chicago River, and experience the city\'s lively music and theater scene. Chicago is a city that will leave you inspired and wanting more.','2024-09-25','2024-10-05',2100.00,'chicago.jpg'),(6,'Israel','Visit the historical and cultural sites of Israel. Israel is a country rich in history, culture, and natural beauty. Explore the ancient city of Jerusalem, visit the historic sites of Bethlehem and Nazareth, and relax on the shores of the Dead Sea. Discover the vibrant city of Tel Aviv, with its bustling markets, beautiful beaches, and lively nightlife. Whether you\'re interested in history, religion, or simply soaking in the unique atmosphere, Israel offers a truly unforgettable experience.','2024-10-10','2024-10-20',2000.00,'israel.jpg'),(7,'Tokyo','Experience the vibrant culture of Tokyo. Tokyo is a city that seamlessly blends tradition and modernity. Explore the historic temples and shrines, visit the bustling shopping districts, and enjoy the city\'s world-renowned cuisine. Take a stroll through the beautiful gardens, experience the vibrant nightlife, and immerse yourself in the unique culture of Tokyo. Whether you\'re interested in technology, fashion, or simply exploring a new city, Tokyo has something for everyone.','2024-10-25','2024-11-05',2000.00,'tokyo.jpg'),(8,'Sydney','Enjoy the beautiful beaches of Sydney. Sydney is a city known for its stunning natural beauty, vibrant culture, and iconic landmarks. Relax on the sandy shores of Bondi Beach, explore the historic Rocks district, and take in the breathtaking views from the Sydney Harbour Bridge. Don\'t miss the chance to visit the Sydney Opera House, enjoy the city\'s world-class dining and shopping, and experience the lively nightlife. Sydney is a city that will leave you enchanted and wanting more.','2024-08-03','2024-11-20',1800.00,'sydney.jpg'),(9,'Rome','Discover the ancient history of Rome. Rome is a city steeped in history, culture, and art. Explore the ancient ruins of the Colosseum, visit the Vatican City, and take a stroll through the charming streets of Trastevere. Enjoy the city\'s famous cuisine, visit the beautiful piazzas, and take in the breathtaking views from the top of the Spanish Steps. Whether you\'re interested in history, art, or simply soaking in the unique atmosphere, Rome offers a truly unforgettable experience.','2024-08-01','2024-08-09',1700.00,'rome.jpg'),(10,'London','Visit the iconic landmarks of London. London is a city known for its rich history, vibrant culture, and iconic landmarks. Explore the historic Tower of London, visit the British Museum, and take a stroll through the beautiful parks and gardens. Don\'t miss the chance to see a show in the West End, enjoy the city\'s world-class dining and shopping, and experience the lively nightlife. London is a city that will leave you inspired and wanting more.','2024-08-02','2024-08-08',1600.00,'london.jpg'),(11,'Dubai','Experience the luxury of Dubai. Dubai is a city known for its opulence, modern architecture, and vibrant culture. Explore the towering skyscrapers, visit the luxurious shopping malls, and relax on the beautiful beaches. Don\'t miss the chance to visit the Burj Khalifa, take a desert safari, and enjoy the city\'s world-renowned dining and entertainment. Whether you\'re looking for adventure, relaxation, or simply soaking in the unique atmosphere, Dubai offers a truly unforgettable experience.','2024-10-22','2025-01-01',1500.00,'dubai.jpg'),(12,'Bangkok','Explore the street life of Bangkok. Bangkok is a city known for its bustling markets, vibrant street life, and rich cultural heritage. Visit the historic temples and palaces, explore the lively neighborhoods, and enjoy the city\'s famous cuisine. Take a boat tour along the Chao Phraya River, visit the floating markets, and experience the vibrant nightlife. Whether you\'re interested in history, culture, or simply exploring a new city, Bangkok has something for everyone.','2024-09-13','2025-04-01',1400.00,'bangkok.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`),
  KEY `vacation_id` (`vacation_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,1),(3,1),(13,1),(14,1),(15,1),(3,2),(4,2),(14,2),(15,2),(16,2),(3,3),(4,3),(5,3),(15,3),(16,3),(17,3),(4,4),(5,4),(6,4),(16,4),(17,4),(18,4),(2,5),(5,5),(6,5),(7,5),(17,5),(18,5),(19,5),(6,6),(7,6),(8,6),(18,6),(19,6),(20,6),(7,7),(8,7),(9,7),(19,7),(20,7),(21,7),(8,8),(9,8),(10,8),(20,8),(21,8),(22,8),(9,9),(10,9),(11,9),(21,9),(22,9),(10,10),(11,10),(12,10),(22,10),(11,11),(12,11),(13,11),(12,12),(13,12),(14,12);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 13:02:53