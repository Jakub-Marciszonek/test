-- MySQL dump 10.13  Distrib 8.4.5, for Win64 (x86_64)
--
-- Host: localhost    Database: coollacalendar
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `clientId` int NOT NULL,
  `organizationId` int NOT NULL DEFAULT '1',
  `clientStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `clientName` varchar(45) NOT NULL,
  `clientSurname` varchar(45) DEFAULT NULL,
  `clientAge` int DEFAULT NULL,
  `clientPhone` varchar(16) DEFAULT NULL,
  `clientEmail` varchar(45) DEFAULT NULL,
  `clientDescription` varchar(255) DEFAULT NULL,
  `clientSex` enum('Female','Male','Other') DEFAULT NULL,
  `clientAttachments` varchar(255) DEFAULT NULL,
  `clientLimit` int DEFAULT NULL,
  `clientBalance` int DEFAULT NULL,
  PRIMARY KEY (`clientId`),
  UNIQUE KEY `clientPhone_UNIQUE` (`clientPhone`),
  UNIQUE KEY `clientEmail_UNIQUE` (`clientEmail`),
  KEY `organizationId_idx` (`organizationId`),
  CONSTRAINT `fk_client_user` FOREIGN KEY (`clientId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_clients_organization` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`organizationsId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (2,3,'Active','Jane','Smith',28,'+222222222','jane.smith@example.com','VIP client','Female',NULL,10,100),(7,6,'Active','John','Doe',35,'+358111222333','JohnDoe@gmial.com',NULL,'Male',NULL,5,0);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coaches`
--

DROP TABLE IF EXISTS `coaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coaches` (
  `coachId` int NOT NULL AUTO_INCREMENT,
  `coachName` varchar(45) NOT NULL,
  `coachSurname` varchar(45) NOT NULL,
  `coachPhone` varchar(16) DEFAULT NULL,
  `coachEmail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`coachId`),
  UNIQUE KEY `coachEmail_UNIQUE` (`coachEmail`),
  UNIQUE KEY `coachPhone_UNIQUE` (`coachPhone`),
  CONSTRAINT `fk_user_coach` FOREIGN KEY (`coachId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coaches`
--

LOCK TABLES `coaches` WRITE;
/*!40000 ALTER TABLE `coaches` DISABLE KEYS */;
INSERT INTO `coaches` VALUES (1,'John','Doe','+111111111','john.doe@example.com');
/*!40000 ALTER TABLE `coaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coachspecialization`
--

DROP TABLE IF EXISTS `coachspecialization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coachspecialization` (
  `coachId` int NOT NULL,
  `specializationId` int NOT NULL,
  PRIMARY KEY (`coachId`,`specializationId`),
  KEY `specializationId_idx` (`specializationId`),
  CONSTRAINT `fk_coach_specialization` FOREIGN KEY (`specializationId`) REFERENCES `specializatons` (`specializationId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_specialization_coach` FOREIGN KEY (`coachId`) REFERENCES `coaches` (`coachId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coachspecialization`
--

LOCK TABLES `coachspecialization` WRITE;
/*!40000 ALTER TABLE `coachspecialization` DISABLE KEYS */;
/*!40000 ALTER TABLE `coachspecialization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventId` int NOT NULL AUTO_INCREMENT,
  `clientId` int NOT NULL,
  `coachId` int NOT NULL,
  `serviceId` int NOT NULL,
  `eventName` varchar(100) NOT NULL,
  `eventDescription` varchar(255) DEFAULT NULL,
  `eventNote` varchar(255) DEFAULT NULL,
  `eventDate` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `eventAttendance` enum('Present','Not present') DEFAULT NULL,
  `eventAttachments` varchar(255) DEFAULT NULL,
  `eventLocation` enum('On-site','Online') DEFAULT NULL,
  `eventCreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eventId`),
  KEY `serviceId_idx` (`serviceId`),
  KEY `coachId_idx` (`coachId`),
  KEY `clientId_idx` (`clientId`),
  CONSTRAINT `fk_event_client` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_event_coach` FOREIGN KEY (`coachId`) REFERENCES `coaches` (`coachId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_event_service` FOREIGN KEY (`serviceId`) REFERENCES `services` (`serviceId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (3,7,1,2,'Inator Course',NULL,NULL,'2025-07-03','10:00:00','11:00:00','Present',NULL,'On-site','2025-06-20 11:47:28'),(4,7,1,2,'changed3','whatever',NULL,'2025-07-06','10:00:00','11:00:00','Present',NULL,'On-site','2025-06-21 10:35:00');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedbackId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `feedbackType` enum('Calendart','Service') NOT NULL,
  `feedbackContent` varchar(255) NOT NULL,
  `feedbackTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackId`),
  KEY `fk_feedback_client_idx` (`userId`),
  CONSTRAINT `fk_feedback_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operatingexceptions`
--

DROP TABLE IF EXISTS `operatingexceptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operatingexceptions` (
  `exceptionId` int NOT NULL AUTO_INCREMENT,
  `coachId` int NOT NULL,
  `exceptionDate` date NOT NULL,
  `isOpen` tinyint(1) DEFAULT '0',
  `openTime` time NOT NULL,
  `closeTime` time NOT NULL,
  `exceptionDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`exceptionId`),
  KEY `coachId_idx` (`coachId`),
  CONSTRAINT `fk_exceptions_coach` FOREIGN KEY (`coachId`) REFERENCES `coaches` (`coachId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operatingexceptions`
--

LOCK TABLES `operatingexceptions` WRITE;
/*!40000 ALTER TABLE `operatingexceptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `operatingexceptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operatinghours`
--

DROP TABLE IF EXISTS `operatinghours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operatinghours` (
  `hoursId` int NOT NULL AUTO_INCREMENT,
  `coachId` int NOT NULL,
  `isOpen` tinyint(1) NOT NULL,
  `weekDay` tinyint NOT NULL,
  `openTime` time DEFAULT NULL,
  `closeTime` time DEFAULT NULL,
  PRIMARY KEY (`hoursId`),
  KEY `coachId_idx` (`coachId`),
  CONSTRAINT `fk_hours_coach` FOREIGN KEY (`coachId`) REFERENCES `coaches` (`coachId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operatinghours`
--

LOCK TABLES `operatinghours` WRITE;
/*!40000 ALTER TABLE `operatinghours` DISABLE KEYS */;
/*!40000 ALTER TABLE `operatinghours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `organizationsId` int NOT NULL AUTO_INCREMENT,
  `organizationName` varchar(100) NOT NULL,
  `organizationEmail` varchar(45) DEFAULT NULL,
  `organizationPhone` varchar(45) DEFAULT NULL,
  `prefferedContact` enum('Email','Phone') DEFAULT NULL,
  `organizationAdress` varchar(100) NOT NULL,
  PRIMARY KEY (`organizationsId`),
  UNIQUE KEY `organizationName_UNIQUE` (`organizationName`),
  CONSTRAINT `fk_user_organization` FOREIGN KEY (`organizationsId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (3,'Acme Corp','info@acme.com','+123456789','Email','123 Main St'),(6,'Doofenshmirtz Evil Inc.','Doofenshmritz@gmail.com','+358 123456789',NULL,'Tri-State Area');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `perrmissionId` int NOT NULL AUTO_INCREMENT,
  `permissionName` varchar(45) NOT NULL,
  PRIMARY KEY (`perrmissionId`),
  UNIQUE KEY `permissionName_UNIQUE` (`permissionName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolepermission`
--

DROP TABLE IF EXISTS `rolepermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolepermission` (
  `roleId` int NOT NULL,
  `perrmissionId` int NOT NULL,
  PRIMARY KEY (`roleId`,`perrmissionId`),
  KEY `permissionId_idx` (`perrmissionId`),
  CONSTRAINT `fk_permission_role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_permission` FOREIGN KEY (`perrmissionId`) REFERENCES `permissions` (`perrmissionId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolepermission`
--

LOCK TABLES `rolepermission` WRITE;
/*!40000 ALTER TABLE `rolepermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolepermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) NOT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleName_UNIQUE` (`roleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `serviceId` int NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(45) NOT NULL,
  `serviceDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serviceId`),
  UNIQUE KEY `serviceName_UNIQUE` (`serviceName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Personal Coaching','One-on-one coaching session'),(2,'Group Workshop','Interactive group workshop');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializatons`
--

DROP TABLE IF EXISTS `specializatons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specializatons` (
  `specializationId` int NOT NULL AUTO_INCREMENT,
  `specializationName` varchar(45) DEFAULT NULL,
  `specializationDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`specializationId`),
  UNIQUE KEY `specializationName_UNIQUE` (`specializationName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializatons`
--

LOCK TABLES `specializatons` WRITE;
/*!40000 ALTER TABLE `specializatons` DISABLE KEYS */;
/*!40000 ALTER TABLE `specializatons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionId` int NOT NULL AUTO_INCREMENT,
  `serviceId` int NOT NULL,
  `transactionTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transactionId`),
  KEY `serviceId_idx` (`serviceId`),
  CONSTRAINT `fk_transaction_service` FOREIGN KEY (`serviceId`) REFERENCES `services` (`serviceId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `userId` int NOT NULL,
  `userType` enum('Coach','Client','Organization') NOT NULL,
  `roleId` int DEFAULT NULL,
  `assigmentTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`,`userType`),
  KEY `roleId_idx` (`roleId`),
  CONSTRAINT `fk_role_coach` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_role` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userType` enum('Coach','Client','Organization') NOT NULL,
  `userCreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Coach','2025-06-19 12:31:18'),(2,'Client','2025-06-19 12:31:18'),(3,'Organization','2025-06-19 12:31:18'),(6,'Organization','2025-06-20 08:53:16'),(7,'Client','2025-06-20 09:04:40');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertransactions`
--

DROP TABLE IF EXISTS `usertransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertransactions` (
  `userId` int NOT NULL,
  `transactionId` int NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `transactionId_idx` (`transactionId`),
  CONSTRAINT `fk_transaction_client` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_transaction` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertransactions`
--

LOCK TABLES `usertransactions` WRITE;
/*!40000 ALTER TABLE `usertransactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertransactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-23 16:45:16
