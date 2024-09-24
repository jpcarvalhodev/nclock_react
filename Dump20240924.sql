-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nclock
-- ------------------------------------------------------
-- Server version	5.7.44-log

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
-- Table structure for table `accdoors`
--

DROP TABLE IF EXISTS `accdoors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accdoors` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CompanyId` varchar(255) DEFAULT NULL,
  `CreateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreaterCode` varchar(100) DEFAULT NULL,
  `CreaterId` varchar(50) DEFAULT NULL,
  `CreaterName` varchar(100) DEFAULT NULL,
  `OpVersion` int(11) DEFAULT NULL,
  `UpdateTime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UpdaterCode` varchar(100) DEFAULT NULL,
  `UpdaterId` varchar(100) DEFAULT NULL,
  `UpdaterName` varchar(100) DEFAULT NULL,
  `ActionInterval` int(11) NOT NULL,
  `ActiveTimesegId` varchar(255) DEFAULT NULL,
  `AllowSuaccessLock` varchar(255) DEFAULT NULL,
  `BackLock` tinyint(4) NOT NULL,
  `CombopenInterval` int(11) DEFAULT NULL,
  `DelayOpenTime` int(11) DEFAULT NULL,
  `DoorNo` int(11) NOT NULL,
  `DoorSensorStatus` int(11) NOT NULL,
  `Enabled` tinyint(4) DEFAULT NULL,
  `ExtDelayDrivertime` int(11) DEFAULT NULL,
  `ExtDevId` varchar(255) DEFAULT NULL,
  `ForcePwd` varchar(255) DEFAULT NULL,
  `HostStatus` int(11) DEFAULT NULL,
  `InApbDuration` int(11) DEFAULT NULL,
  `IsDisableAudio` tinyint(4) DEFAULT NULL,
  `LatchDoorType` int(11) DEFAULT NULL,
  `LatchTimeOut` int(11) DEFAULT NULL,
  `LatchTimesegId` varchar(255) DEFAULT NULL,
  `LockDelay` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `PassmodeTimesegId` varchar(255) DEFAULT NULL,
  `ReaderType` int(11) DEFAULT NULL,
  `SexInputMode` varchar(255) DEFAULT NULL,
  `SexSupervisedResistor` varchar(255) DEFAULT NULL,
  `SenInputMode` varchar(255) DEFAULT NULL,
  `SenSupervisedResistor` varchar(255) DEFAULT NULL,
  `SensorDelay` int(11) DEFAULT NULL,
  `SupperPwd` varchar(255) DEFAULT NULL,
  `VerifyMode` int(11) NOT NULL,
  `WgInputId` varchar(255) DEFAULT NULL,
  `WgInputType` int(11) DEFAULT NULL,
  `WgOutputId` varchar(255) DEFAULT NULL,
  `WgOutputType` int(11) DEFAULT NULL,
  `WgReversed` int(11) DEFAULT NULL,
  `DevId` char(36) CHARACTER SET ascii NOT NULL,
  `DevSN` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AccDoors_DevId` (`DevId`),
  CONSTRAINT `fk_acc_door_devices` FOREIGN KEY (`DevId`) REFERENCES `devices` (`ZktecoDeviceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accdoors`
--

LOCK TABLES `accdoors` WRITE;
/*!40000 ALTER TABLE `accdoors` DISABLE KEYS */;
INSERT INTO `accdoors` VALUES ('1726f965-4a53-4937-bc42-020b2ecc7829',NULL,'2024-09-20 09:46:21',NULL,NULL,NULL,0,'2024-09-20 09:46:20',NULL,NULL,NULL,2,NULL,NULL,0,10,0,4,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'C3 Pro-door4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,'0942c02f-6481-43d3-869b-b1602768aff9','AGB7234900595'),('3aed5a3f-48a6-469a-a840-8e9d28f1c238',NULL,'2024-09-20 09:46:21',NULL,NULL,NULL,0,'2024-09-20 09:46:20',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'C3 Pro-door1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,'0942c02f-6481-43d3-869b-b1602768aff9','AGB7234900595'),('8d0473ba-7087-4f16-8413-02edd39ab2be',NULL,'2024-09-20 09:46:21',NULL,NULL,NULL,0,'2024-09-20 09:46:20',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'C3 Pro-door2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,'0942c02f-6481-43d3-869b-b1602768aff9','AGB7234900595'),('9a36f4d9-4fbb-49bd-90d1-a271a516513a',NULL,'2024-09-20 09:46:21',NULL,NULL,NULL,0,'2024-09-20 09:46:20',NULL,NULL,NULL,2,NULL,NULL,0,10,0,3,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'C3 Pro-door3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,15,NULL,NULL,NULL,NULL,NULL,'0942c02f-6481-43d3-869b-b1602768aff9','AGB7234900595');
/*!40000 ALTER TABLE `accdoors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accreaders`
--

DROP TABLE IF EXISTS `accreaders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accreaders` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CreateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `NameReader` varchar(100) DEFAULT NULL,
  `ReaderNo` int(11) NOT NULL,
  `ReaderInOut` int(11) NOT NULL,
  `CommType` int(11) DEFAULT NULL,
  `Rs485ProtocolType` int(11) DEFAULT NULL,
  `DoorId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accreaders`
--

LOCK TABLES `accreaders` WRITE;
/*!40000 ALTER TABLE `accreaders` DISABLE KEYS */;
INSERT INTO `accreaders` VALUES ('002d8c68-df7f-4a45-a569-caaf262028f0','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door4-reader1',1,0,NULL,NULL,'1726f965-4a53-4937-bc42-020b2ecc7829'),('33ad371b-2167-475f-857c-551381395a87','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door3-reader7',7,0,NULL,NULL,'9a36f4d9-4fbb-49bd-90d1-a271a516513a'),('7021eb0b-55b4-453b-ba82-79cecc0df6cb','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door1-reader4',4,1,NULL,NULL,'3aed5a3f-48a6-469a-a840-8e9d28f1c238'),('af536efc-7f66-42a8-9dd9-018a7d5a3f24','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door4-reader2',2,1,NULL,NULL,'1726f965-4a53-4937-bc42-020b2ecc7829'),('b77fa36a-cf90-436e-8689-7e9a27876354','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door1-reader3',3,0,NULL,NULL,'3aed5a3f-48a6-469a-a840-8e9d28f1c238'),('c7c79aa5-1621-469a-b8b9-67ce3fdda9e5','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door2-reader5',5,0,NULL,NULL,'8d0473ba-7087-4f16-8413-02edd39ab2be'),('dbeef1dd-1fea-4414-a704-61cc721392fb','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door3-reader8',8,1,NULL,NULL,'9a36f4d9-4fbb-49bd-90d1-a271a516513a'),('f758dada-04e4-4f59-b60f-ce15d0db24b2','2024-09-20 09:46:21','2024-09-20 09:46:20','C3 Pro-door2-reader6',6,1,NULL,NULL,'8d0473ba-7087-4f16-8413-02edd39ab2be');
/*!40000 ALTER TABLE `accreaders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acctimeseg`
--

DROP TABLE IF EXISTS `acctimeseg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acctimeseg` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `AppId` varchar(255) DEFAULT NULL,
  `BioTblId` varchar(255) DEFAULT NULL,
  `CompanyId` varchar(255) DEFAULT NULL,
  `CreateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreaterCode` varchar(100) DEFAULT NULL,
  `CreaterId` varchar(50) DEFAULT NULL,
  `CreaterName` varchar(100) DEFAULT NULL,
  `OpVersion` int(11) DEFAULT NULL,
  `UpdateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `UpdaterCode` varchar(100) DEFAULT NULL,
  `UpdaterId` varchar(100) DEFAULT NULL,
  `UpdaterName` varchar(100) DEFAULT NULL,
  `BusinessId` int(11) DEFAULT NULL,
  `FridayEnd1` varchar(20) NOT NULL,
  `FridayEnd2` varchar(20) NOT NULL,
  `FridayEnd3` varchar(20) NOT NULL,
  `FridayStart1` varchar(20) NOT NULL,
  `FridayStart2` varchar(20) NOT NULL,
  `FridayStart3` varchar(20) NOT NULL,
  `HolidayType1End1` varchar(20) NOT NULL,
  `HolidayType1End2` varchar(20) NOT NULL,
  `HolidayType1End3` varchar(20) NOT NULL,
  `HolidayType1Start1` varchar(20) NOT NULL,
  `HolidayType1Start2` varchar(20) NOT NULL,
  `HolidayType1Start3` varchar(20) NOT NULL,
  `HolidayType2End1` varchar(20) NOT NULL,
  `HolidayType2End2` varchar(20) NOT NULL,
  `HolidayType2End3` varchar(20) NOT NULL,
  `HolidayType2Start1` varchar(20) NOT NULL,
  `HolidayType2Start2` varchar(20) NOT NULL,
  `HolidayType2Start3` varchar(20) NOT NULL,
  `HolidayType3End1` varchar(20) NOT NULL,
  `HolidayType3End2` varchar(20) NOT NULL,
  `HolidayType3End3` varchar(20) NOT NULL,
  `HolidayType3Start1` varchar(20) NOT NULL,
  `HolidayType3Start2` varchar(20) NOT NULL,
  `HolidayType3Start3` varchar(20) NOT NULL,
  `InitFlag` tinyint(4) NOT NULL,
  `MondayEnd1` varchar(20) NOT NULL,
  `MondayEnd2` varchar(20) NOT NULL,
  `MondayEnd3` varchar(20) NOT NULL,
  `MondayStart1` varchar(20) NOT NULL,
  `MondayStart2` varchar(20) NOT NULL,
  `MondayStart3` varchar(20) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Remark` varchar(50) DEFAULT NULL,
  `SaturdayEnd1` varchar(20) NOT NULL,
  `SaturdayEnd2` varchar(20) NOT NULL,
  `SaturdayEnd3` varchar(20) NOT NULL,
  `SaturdayStart1` varchar(20) NOT NULL,
  `SaturdayStart2` varchar(20) NOT NULL,
  `SaturdayStart3` varchar(20) NOT NULL,
  `SundayEnd1` varchar(20) NOT NULL,
  `SundayEnd2` varchar(20) NOT NULL,
  `SundayEnd3` varchar(20) NOT NULL,
  `SundayStart1` varchar(20) NOT NULL,
  `SundayStart2` varchar(20) NOT NULL,
  `SundayStart3` varchar(20) NOT NULL,
  `ThursdayEnd1` varchar(20) NOT NULL,
  `ThursdayEnd2` varchar(20) NOT NULL,
  `ThursdayEnd3` varchar(20) NOT NULL,
  `ThursdayStart1` varchar(20) NOT NULL,
  `ThursdayStart2` varchar(20) NOT NULL,
  `ThursdayStart3` varchar(20) NOT NULL,
  `TuesdayEnd1` varchar(20) NOT NULL,
  `TuesdayEnd2` varchar(20) NOT NULL,
  `TuesdayEnd3` varchar(20) NOT NULL,
  `TuesdayStart1` varchar(20) NOT NULL,
  `TuesdayStart2` varchar(20) NOT NULL,
  `TuesdayStart3` varchar(20) NOT NULL,
  `WednesdayEnd1` varchar(20) NOT NULL,
  `WednesdayEnd2` varchar(20) NOT NULL,
  `WednesdayEnd3` varchar(20) NOT NULL,
  `WednesdayStart1` varchar(20) NOT NULL,
  `WednesdayStart2` varchar(20) NOT NULL,
  `WednesdayStart3` varchar(20) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uk_hfqc9813m08be9g0ux6iysii3` (`BusinessId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acctimeseg`
--

LOCK TABLES `acctimeseg` WRITE;
/*!40000 ALTER TABLE `acctimeseg` DISABLE KEYS */;
/*!40000 ALTER TABLE `acctimeseg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alteracoespublicidades`
--

DROP TABLE IF EXISTS `alteracoespublicidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alteracoespublicidades` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `TipoAlteracao` longtext NOT NULL,
  `DataAlteracao` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alteracoespublicidades`
--

LOCK TABLES `alteracoespublicidades` WRITE;
/*!40000 ALTER TABLE `alteracoespublicidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `alteracoespublicidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CategoryID` char(36) CHARACTER SET ascii NOT NULL,
  `Code` int(11) NOT NULL,
  `Acronym` varchar(4) DEFAULT NULL,
  `Description` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('3322f0cc-2bb2-4a70-9aaf-f1927c1a8b51',2,'C2','Categoria 2'),('c069918f-f4e5-4987-8e0a-3658ec919620',1,'C1','Categoria 1');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configurations` (
  `ConfigurationID` char(36) CHARACTER SET ascii NOT NULL,
  `CompanyName` varchar(50) DEFAULT NULL,
  `ResponsibleName` varchar(50) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `City` varchar(20) DEFAULT NULL,
  `Language` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`ConfigurationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
INSERT INTO `configurations` VALUES ('61c6fda9-e472-4963-a731-b0e2e5348bc9','XPTO','Xpto Name','Street New Jesey','New York','en');
/*!40000 ALTER TABLE `configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `DepartmentID` char(36) CHARACTER SET ascii NOT NULL,
  `Code` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `PaiId` int(11) DEFAULT NULL,
  PRIMARY KEY (`DepartmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('12798892-64ee-4856-82f6-db5551241ce2',2,'Comercial','Departamento Comercial',0),('bceb48f4-e480-4d02-8443-f491ce75f7b8',1,'Aprovisionamento','Departamento Aprovisionamento',0);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `ZktecoDeviceID` char(36) CHARACTER SET ascii NOT NULL,
  `DeviceNumber` int(11) NOT NULL,
  `DeviceName` varchar(50) NOT NULL,
  `IpAddress` longtext NOT NULL,
  `Port` int(11) NOT NULL,
  `Photo` longtext,
  `Code` int(11) DEFAULT NULL,
  `Platform` longtext,
  `Firmware` longtext,
  `MacAddress` longtext,
  `SerialNumber` longtext NOT NULL,
  `ProductTime` longtext,
  `Producter` longtext,
  `ReaderCount` int(11) DEFAULT NULL,
  `AuxInCount` int(11) DEFAULT NULL,
  `AuxOutCount` int(11) DEFAULT NULL,
  `MaxUserCount` int(11) DEFAULT NULL,
  `MaxAttLogCount` int(11) DEFAULT NULL,
  `MaxFingerCount` int(11) DEFAULT NULL,
  `MaxUserFingerCount` int(11) DEFAULT NULL,
  `FaceAlg` int(11) DEFAULT NULL,
  `FPAlg` int(11) DEFAULT NULL,
  `LockCount` int(11) DEFAULT NULL,
  `TimeZone` varchar(10) DEFAULT NULL,
  `VerifyStyles` varchar(255) DEFAULT NULL,
  `EventTypes` varchar(255) DEFAULT NULL,
  `CardFormatFunOn` int(11) DEFAULT NULL,
  `DeviceProtocol` int(11) NOT NULL,
  `DeviceType` int(11) NOT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `Disabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ZktecoDeviceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES ('0942c02f-6481-43d3-869b-b1602768aff9',1,'C3 Pro','192.168.1.202',9999,NULL,0,NULL,'AC Ver 4.7.8.3033 Aug 14 2023','00:17:61:03:39:94','AGB7234900595',NULL,NULL,4,4,4,1000,10,0,10,NULL,NULL,4,NULL,'9808','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,3,2,1,1);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeeattendancetimes`
--

DROP TABLE IF EXISTS `employeeattendancetimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeeattendancetimes` (
  `AttendanceTimeId` char(36) CHARACTER SET ascii NOT NULL,
  `DeviceId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `DeviceNumber` int(11) DEFAULT NULL,
  `EmployeeId` char(50) CHARACTER SET ascii NOT NULL,
  `EnrollNumber` longtext,
  `EmployeeName` longtext,
  `VerifyMode` int(11) DEFAULT NULL,
  `InOutMode` int(11) DEFAULT NULL,
  `Workcode` int(11) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Observation` longtext,
  `AttendanceTime` datetime DEFAULT NULL,
  PRIMARY KEY (`AttendanceTimeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeeattendancetimes`
--

LOCK TABLES `employeeattendancetimes` WRITE;
/*!40000 ALTER TABLE `employeeattendancetimes` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeeattendancetimes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `EmployeeID` char(36) CHARACTER SET ascii NOT NULL,
  `EnrollNumber` longtext,
  `Name` varchar(150) NOT NULL,
  `ShortName` varchar(50) NOT NULL,
  `NameAcronym` varchar(5) DEFAULT NULL,
  `Comments` varchar(50) DEFAULT NULL,
  `Photo` longtext,
  `Address` varchar(50) DEFAULT NULL,
  `ZIPcode` longtext,
  `Locality` varchar(50) DEFAULT NULL,
  `Village` varchar(50) DEFAULT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Mobile` int(11) DEFAULT NULL,
  `Email` longtext,
  `Birthday` datetime DEFAULT NULL,
  `Nationality` longtext,
  `Gender` tinyint(4) DEFAULT NULL,
  `BInumber` longtext,
  `BIissuance` datetime DEFAULT NULL,
  `BIValidity` datetime DEFAULT NULL,
  `NIF` int(11) DEFAULT NULL,
  `AdmissionDate` datetime DEFAULT NULL,
  `ExitDate` datetime DEFAULT NULL,
  `RGPDAut` tinyint(4) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `StatusEmail` tinyint(4) DEFAULT NULL,
  `Type` longtext,
  `StatusFprint` tinyint(4) DEFAULT NULL,
  `StatusFace` tinyint(4) DEFAULT NULL,
  `StatusPalm` tinyint(4) DEFAULT NULL,
  `CompanyName` longtext,
  `CompanyNIF` int(11) DEFAULT NULL,
  `CompanyAddress` longtext,
  `CompanyLocality` longtext,
  `CompanyZipCode` longtext,
  `AcStartTime` datetime DEFAULT NULL,
  `AcEndTime` datetime DEFAULT NULL,
  `AcDisable` tinyint(4) DEFAULT NULL,
  `PassSuperAuth` tinyint(4) DEFAULT NULL,
  `DepartmentId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ProfessionId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `CategoryId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GroupId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ZoneId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ExternalEntityId` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `IX_Employees_CategoryId` (`CategoryId`),
  KEY `IX_Employees_DepartmentId` (`DepartmentId`),
  KEY `IX_Employees_ExternalEntityId` (`ExternalEntityId`),
  KEY `IX_Employees_GroupId` (`GroupId`),
  KEY `IX_Employees_ProfessionId` (`ProfessionId`),
  KEY `IX_Employees_ZoneId` (`ZoneId`),
  CONSTRAINT `FK_Employees_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`CategoryID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Employees_Departments_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`DepartmentID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Employees_ExternalEntities_ExternalEntityId` FOREIGN KEY (`ExternalEntityId`) REFERENCES `externalentities` (`ExternalEntityID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Employees_Groups_GroupId` FOREIGN KEY (`GroupId`) REFERENCES `groups` (`GroupID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Employees_Professions_ProfessionId` FOREIGN KEY (`ProfessionId`) REFERENCES `professions` (`ProfessionID`) ON DELETE CASCADE,
  CONSTRAINT `FK_Employees_Zones_ZoneId` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`ZoneID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('08dcd97f-7cc3-4cdd-857c-49224fc9051d','1','João Pedro','João Pedro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'Utente',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('08dcdbb8-4ee5-4185-82bc-223abd084fc9','2','Norberto','Norberto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,'Utente',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeescards`
--

DROP TABLE IF EXISTS `employeescards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeescards` (
  `CardId` char(36) CHARACTER SET ascii NOT NULL,
  `EmployeeId` char(36) CHARACTER SET ascii NOT NULL,
  `DevicePassword` longtext,
  `DevicePrivelage` int(11) DEFAULT NULL,
  `DeviceEnabled` tinyint(1) DEFAULT NULL,
  `CardNumber` longtext,
  PRIMARY KEY (`CardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeescards`
--

LOCK TABLES `employeescards` WRITE;
/*!40000 ALTER TABLE `employeescards` DISABLE KEYS */;
INSERT INTO `employeescards` VALUES ('08dcd97f-7cf7-4bfd-8d06-0b22e8922cfc','08dcd97f-7cc3-4cdd-857c-49224fc9051d',NULL,NULL,1,'260'),('08dcdbb8-4f00-43d9-8b0a-0f47cb0e7966','08dcdbb8-4ee5-4185-82bc-223abd084fc9',NULL,NULL,1,'261');
/*!40000 ALTER TABLE `employeescards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeesdevices`
--

DROP TABLE IF EXISTS `employeesdevices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeesdevices` (
  `EmployeeID` char(36) CHARACTER SET ascii NOT NULL,
  `DeviceID` char(36) CHARACTER SET ascii NOT NULL,
  `DeviceNumber` int(11) DEFAULT NULL,
  `DeviceSN` longtext,
  `DeviceName` longtext,
  `EmployeeDeviceId` longtext,
  `EnrollNumber` longtext,
  `EmployeeName` longtext,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`,`DeviceID`),
  KEY `IX_EmployeesDevices_DeviceID` (`DeviceID`),
  CONSTRAINT `FK_EmployeesDevices_Devices_DeviceID` FOREIGN KEY (`DeviceID`) REFERENCES `devices` (`ZktecoDeviceID`) ON DELETE CASCADE,
  CONSTRAINT `FK_EmployeesDevices_Employees_EmployeeID` FOREIGN KEY (`EmployeeID`) REFERENCES `employees` (`EmployeeID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeesdevices`
--

LOCK TABLES `employeesdevices` WRITE;
/*!40000 ALTER TABLE `employeesdevices` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeesdevices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeesfaces`
--

DROP TABLE IF EXISTS `employeesfaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeesfaces` (
  `FaceId` char(36) CHARACTER SET ascii NOT NULL,
  `EmployeeId` char(36) CHARACTER SET ascii NOT NULL,
  `FaceTmpIndex` int(11) NOT NULL,
  `FaceTmpData` longtext NOT NULL,
  `FaceTmpLength` int(11) NOT NULL,
  PRIMARY KEY (`FaceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeesfaces`
--

LOCK TABLES `employeesfaces` WRITE;
/*!40000 ALTER TABLE `employeesfaces` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeesfaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeesfingerprints`
--

DROP TABLE IF EXISTS `employeesfingerprints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeesfingerprints` (
  `FingerprintId` char(36) CHARACTER SET ascii NOT NULL,
  `EmployeeId` char(36) CHARACTER SET ascii NOT NULL,
  `FPTmpIndex` int(11) NOT NULL,
  `FPTmpData` longtext NOT NULL,
  `FPTmpLength` int(11) NOT NULL,
  `FPTmpFlag` int(11) NOT NULL,
  PRIMARY KEY (`FingerprintId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeesfingerprints`
--

LOCK TABLES `employeesfingerprints` WRITE;
/*!40000 ALTER TABLE `employeesfingerprints` DISABLE KEYS */;
/*!40000 ALTER TABLE `employeesfingerprints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventdevices`
--

DROP TABLE IF EXISTS `eventdevices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventdevices` (
  `EventId` char(36) CHARACTER SET ascii NOT NULL,
  `Pin` int(11) DEFAULT NULL,
  `CardNumber` int(11) DEFAULT NULL,
  `EventAddr` int(11) DEFAULT NULL,
  `EventType` int(11) DEFAULT NULL,
  `InOutStatus` int(11) DEFAULT NULL,
  `VerifyType` int(11) DEFAULT NULL,
  `EventIndex` int(11) DEFAULT NULL,
  `EventDate` datetime(6) NOT NULL,
  PRIMARY KEY (`EventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventdevices`
--

LOCK TABLES `eventdevices` WRITE;
/*!40000 ALTER TABLE `eventdevices` DISABLE KEYS */;
INSERT INTO `eventdevices` VALUES ('0163ded7-3c9c-4ccb-8ca5-da32d0a629da',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:27:53.000000'),('074eed5a-0c81-44ca-b707-25356b2d7433',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:27:24.000000'),('091f8b81-fcf7-4012-bd0a-3587ccbafc13',0,NULL,1,8,NULL,200,NULL,'2024-09-23 10:20:37.000000'),('13c98442-d48a-4241-9c99-5524cb644ff8',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:42:27.000000'),('15756640-97a6-4409-8030-14fb669ed58d',1,260,3,23,NULL,4,NULL,'2024-09-20 15:28:10.000000'),('158dc668-2c1c-40dc-8159-084aa5bd13ef',0,NULL,4,202,NULL,200,NULL,'2024-09-23 10:25:18.000000'),('15fc9c93-3ba3-4c78-b65b-90c578a9bab3',1,260,3,23,NULL,4,NULL,'2024-09-20 16:48:25.000000'),('19f70a8f-ce75-4f52-8573-75e734fe975c',0,NULL,1,8,NULL,200,NULL,'2024-09-23 10:16:33.000000'),('1a70e0f8-7ab7-44b0-8f9c-21be4bb2d6da',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:42:59.000000'),('1b13e18e-79f8-4076-b1b6-a287f6d0d75f',1,260,3,23,NULL,4,NULL,'2024-09-20 15:21:52.000000'),('1d1eb5a1-1b82-4f56-bc71-3a2db382072b',4,260,3,23,NULL,4,NULL,'2024-09-20 15:16:19.000000'),('1dcb5e7e-98a5-4e23-8337-09dd9b80bf7b',1,260,1,0,NULL,4,NULL,'2024-09-20 15:28:29.000000'),('1eb86026-8e80-4038-85a9-911a7c51aff6',1,260,3,23,NULL,4,NULL,'2024-09-20 15:51:07.000000'),('205832ac-f34b-4a32-901f-afceb0430048',0,NULL,4,202,NULL,200,NULL,'2024-09-20 09:37:20.000000'),('20cf7d27-88a2-4ea1-8b4c-8c7b1bc9b109',2,261,4,23,NULL,4,NULL,'2024-09-24 14:46:19.000000'),('219ab998-7b15-4150-a57a-d228c66b68e7',0,269,3,27,NULL,4,NULL,'2024-09-24 14:46:30.000000'),('2530e94d-e49d-457e-8d76-fb1a24e8dcdd',0,NULL,0,214,NULL,200,NULL,'2024-09-20 15:00:34.000000'),('27953f18-f1b8-457d-810a-ddb01072209d',0,NULL,0,206,NULL,200,NULL,'2024-09-23 09:24:43.000000'),('29a3b999-fd2a-4dc7-96af-a9d1825b4856',1,261,3,23,NULL,4,NULL,'2024-09-20 15:16:15.000000'),('2befb97d-7bfe-41b7-859c-278dd992015e',1,260,3,23,NULL,4,NULL,'2024-09-20 15:33:34.000000'),('2e3218e5-9330-4bef-a9cc-945724d58441',0,NULL,4,202,NULL,200,NULL,'2024-09-23 10:29:17.000000'),('317a0957-0146-49d5-962b-45717dcf3e8c',0,NULL,0,105,NULL,200,NULL,'2024-09-23 11:05:25.000000'),('34e73574-2c76-4f8f-83c7-6690ba260b81',1,260,3,23,NULL,4,NULL,'2024-09-20 15:24:39.000000'),('38e92579-4ef8-42cf-86a3-6eaafe1fb902',1,261,3,23,NULL,4,NULL,'2024-09-20 15:20:16.000000'),('43116161-d8b5-4e40-84bd-6b1ccfccfab8',1,260,3,0,NULL,4,NULL,'2024-09-24 14:46:57.000000'),('4404b84e-4d98-4b72-8d94-2c1ea81b33e5',0,NULL,0,206,NULL,200,NULL,'2024-09-20 09:37:05.000000'),('47867b74-9d34-4448-9166-146c29efc05a',0,NULL,0,105,NULL,200,NULL,'2024-09-23 11:05:25.000000'),('52105b39-a248-4d05-98d1-785ca2beac06',4,263,3,0,NULL,4,NULL,'2024-09-24 14:47:22.000000'),('53b9f12d-f5ce-422b-a2e8-616a0e41dd92',0,NULL,3,220,NULL,200,NULL,'2024-09-23 10:42:40.000000'),('54afe622-4e25-415e-877f-2b373f6387fb',1,261,2,0,NULL,4,NULL,'2024-09-20 09:37:17.000000'),('56a9a8c2-4be2-45b7-a6fc-31a8dca377db',0,269,3,27,NULL,4,NULL,'2024-09-24 14:46:36.000000'),('5749ddd4-9d95-45f7-8152-790f1326a115',1,260,3,21,NULL,4,NULL,'2024-09-20 15:49:11.000000'),('58c8e2b1-62db-45c7-bea1-ed8063aa4d5b',0,NULL,3,202,NULL,200,NULL,'2024-09-20 09:37:11.000000'),('59d1fa1f-24dd-4146-bf1c-92ec294ea6f7',0,NULL,0,105,NULL,200,NULL,'2024-09-24 14:31:14.000000'),('5b80f2bd-5214-44f8-80de-3cce1b4b738b',0,NULL,0,206,NULL,200,NULL,'2024-09-24 14:27:38.000000'),('6105cb28-354d-4497-a1d0-c70aafb4aa49',0,NULL,4,202,NULL,200,NULL,'2024-09-23 10:29:26.000000'),('624fab83-b03e-411d-a75f-29e23eea9d57',1,260,4,23,NULL,4,NULL,'2024-09-24 14:46:15.000000'),('62719fff-b0c1-43ef-bcc6-02f1f0262925',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:29:44.000000'),('63c97d0e-c8f2-4d86-b5a4-735ad3c45733',0,NULL,0,214,NULL,200,NULL,'2024-09-23 11:05:25.000000'),('64b16366-abe8-4606-be5c-687a68d83125',0,NULL,3,220,NULL,200,NULL,'2024-09-23 10:43:04.000000'),('656d1daa-b5cd-443d-8719-4e4c3ae61158',0,NULL,4,202,NULL,200,NULL,'2024-09-20 09:37:06.000000'),('66240bf5-5d83-4abb-bcc7-3fd6494f9919',1,260,3,23,NULL,4,NULL,'2024-09-20 15:32:46.000000'),('6bba1acf-7a44-444e-a3a7-b3d03f149b00',1,260,3,23,NULL,4,NULL,'2024-09-20 16:34:27.000000'),('6c4e3536-5bc6-461e-82bf-e18caf4f372f',0,NULL,0,105,NULL,200,NULL,'2024-09-23 11:07:07.000000'),('741cfc39-4545-4149-b48f-7e41ccd662d4',0,NULL,1,8,NULL,200,NULL,'2024-09-23 10:18:19.000000'),('7697d629-8b6a-454d-9e90-0cc9906cccc3',0,NULL,4,202,NULL,200,NULL,'2024-09-23 10:32:39.000000'),('817d9178-0a5a-4723-b189-bb084d622d3c',4,263,3,0,NULL,4,NULL,'2024-09-24 14:49:10.000000'),('86db7901-aea3-4646-a1de-b11cbab09d48',0,NULL,3,221,NULL,200,NULL,'2024-09-23 10:42:18.000000'),('8f058ad5-305a-44ed-ba98-050fe8a0d037',1,260,4,23,NULL,4,NULL,'2024-09-24 14:46:22.000000'),('8f44b54f-bdf7-4b4f-81f1-905ffe6f095f',0,NULL,0,105,NULL,200,NULL,'2024-09-23 11:05:13.000000'),('92214124-88a0-4676-b1dd-c8037b331a52',1,261,2,0,NULL,4,NULL,'2024-09-20 09:37:26.000000'),('9283fdda-7d9e-46f6-ad0c-679fe0d54323',1,260,4,23,NULL,4,NULL,'2024-09-24 14:46:17.000000'),('92be49fa-65a8-46fc-96a2-670cffe460a1',0,NULL,1,8,NULL,200,NULL,'2024-09-23 11:50:15.000000'),('96e4a2ed-df83-4d61-90c7-90b3772585d6',1,260,4,23,NULL,4,NULL,'2024-09-20 15:44:07.000000'),('990af8ce-2974-4229-9550-90e7286ef3d5',0,NULL,1,221,NULL,200,NULL,'2024-09-23 10:41:45.000000'),('9927b66e-a933-4444-b970-1d6cf3535977',1,260,3,23,NULL,4,NULL,'2024-09-20 15:50:30.000000'),('9aba38f3-bc72-46c5-92af-4e80d5c3c3d6',1,260,3,0,NULL,4,NULL,'2024-09-23 10:32:14.000000'),('9d568f08-af1b-491c-9f43-b48f71a3b8d3',1,260,3,23,NULL,4,NULL,'2024-09-20 15:34:22.000000'),('9ea894ac-b908-4c8e-a434-2b8d95bf426a',2,261,3,0,NULL,4,NULL,'2024-09-23 11:14:41.000000'),('a018d8eb-7f15-47bc-8519-d0bf6eac8d10',0,269,4,27,NULL,4,NULL,'2024-09-24 14:46:42.000000'),('a0ed2348-0625-4a9b-b134-3ee293d906ca',2,261,3,0,NULL,4,NULL,'2024-09-23 10:28:39.000000'),('a87e1b4d-be7e-4efe-b3fa-2e7b4b7b45e4',0,NULL,1,220,NULL,200,NULL,'2024-09-23 10:41:45.000000'),('ade27444-ceb6-4e59-97c6-7acab8d11a7a',0,NULL,1,8,NULL,200,NULL,'2024-09-24 14:32:17.000000'),('ae57e596-5976-49fb-909a-35f21056fe68',0,NULL,0,214,NULL,200,NULL,'2024-09-24 14:31:40.000000'),('afcd7708-bf79-4440-b64f-cadbc5f84737',0,NULL,2,220,NULL,200,NULL,'2024-09-23 10:42:04.000000'),('b033209f-afd8-4d6d-90d1-f1b7b85641e7',0,NULL,0,214,NULL,200,NULL,'2024-09-23 10:12:17.000000'),('b46e2ec3-df95-408d-b795-00bddeb5ab80',0,NULL,2,202,NULL,200,NULL,'2024-09-20 09:42:27.000000'),('b658f0fc-e733-4d60-bd61-1362db43d98a',1,260,3,0,NULL,4,NULL,'2024-09-23 10:28:36.000000'),('b8a736e7-5679-4dcb-94bb-4cd96ddcf125',0,NULL,3,220,NULL,200,NULL,'2024-09-23 10:42:18.000000'),('b9b92400-9541-4b10-8e36-d8fff977e923',2,261,3,0,NULL,4,NULL,'2024-09-23 11:14:58.000000'),('bada6aec-20f4-4819-9496-94137e332da6',3,262,3,0,NULL,4,NULL,'2024-09-23 10:28:53.000000'),('bdf9e9c4-cb80-444b-a76e-15f634710ab8',0,NULL,1,8,NULL,200,NULL,'2024-09-23 10:08:31.000000'),('bf9a00c9-e2b5-4256-8cf7-fa0ec46da4e1',0,NULL,0,105,NULL,200,NULL,'2024-09-23 10:09:27.000000'),('bfa022a5-786f-4697-8b80-60d30ea72085',0,NULL,0,214,NULL,200,NULL,'2024-09-23 11:05:25.000000'),('c04875d9-8a01-493d-997f-5025371a1e16',1,260,3,21,NULL,4,NULL,'2024-09-20 15:48:02.000000'),('c3e424e4-a252-4498-92ce-fe6200889368',1,260,3,23,NULL,4,NULL,'2024-09-20 15:45:26.000000'),('c423cb07-fe70-4e9b-8b42-7a8256c9bd5e',0,NULL,3,221,NULL,200,NULL,'2024-09-23 10:42:40.000000'),('c4b8ccce-29f9-4370-bb93-b47ade17e4fd',0,NULL,3,221,NULL,200,NULL,'2024-09-23 10:43:03.000000'),('c55f8e7c-cd87-43e2-a924-cf1da31d2649',2,261,3,0,NULL,4,NULL,'2024-09-23 10:28:46.000000'),('c6551e72-6df5-4a74-8a1e-2664c595f737',1,261,2,0,NULL,4,NULL,'2024-09-20 09:37:08.000000'),('c8cb09fb-999b-43d5-b57b-86aa86345366',1,260,3,0,NULL,4,NULL,'2024-09-23 10:29:58.000000'),('c9581377-53fc-46f7-a9ea-371fbbddb7a4',0,NULL,4,202,NULL,200,NULL,'2024-09-20 09:37:13.000000'),('ca1b62a7-d179-4e32-b3bc-565d140f7ce0',0,293,3,27,NULL,4,NULL,'2024-09-20 15:35:37.000000'),('ca472449-782c-4a1e-90c8-1fb5db7a228b',1,260,3,23,NULL,4,NULL,'2024-09-20 15:35:29.000000'),('cb36107a-fcd6-4f96-8834-3cda9416caab',1,260,4,23,NULL,4,NULL,'2024-09-24 14:46:13.000000'),('cd0ed46d-2d9a-4da3-9c79-8eafede68d2b',1,260,3,23,NULL,4,NULL,'2024-09-20 15:42:46.000000'),('d10ca30f-0475-41b3-b51c-d67fe8f8d267',0,NULL,0,214,NULL,200,NULL,'2024-09-23 11:07:06.000000'),('d183ede7-db16-44eb-9608-641e05f60833',0,NULL,4,202,NULL,200,NULL,'2024-09-23 10:23:00.000000'),('d212f621-21ff-4e0c-9137-81a63da4d33a',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:29:34.000000'),('d2a3d939-470a-4e98-be7c-aa532b0c1a7e',1,260,3,0,NULL,4,NULL,'2024-09-24 14:46:26.000000'),('d4ec5a79-c2f2-490c-90f9-a93cf5bb5adb',0,NULL,2,202,NULL,200,NULL,'2024-09-23 11:40:10.000000'),('d55e32ef-4ae3-4d1d-8b73-4480af150705',1,260,2,0,NULL,4,NULL,'2024-09-20 15:43:43.000000'),('d84e733c-d9e4-4114-af21-e8071671c8a3',0,NULL,0,214,NULL,200,NULL,'2024-09-23 11:05:26.000000'),('df978ec8-40f2-4eef-8ff5-90d8a24907fa',0,NULL,2,221,NULL,200,NULL,'2024-09-23 10:42:04.000000'),('e1a14a51-855a-4be7-b75e-b189fd71b208',1,260,3,23,NULL,4,NULL,'2024-09-20 15:21:46.000000'),('e4590dc5-45ba-41a8-a244-900ca9e5cac4',1,260,3,23,NULL,4,NULL,'2024-09-20 15:41:12.000000'),('e5ffb8f0-1288-4deb-af16-16c9ee58359b',1,260,3,23,NULL,4,NULL,'2024-09-20 15:39:58.000000'),('e7f5e79f-4d49-4888-9911-b25b809dda27',0,NULL,3,202,NULL,200,NULL,'2024-09-20 09:37:23.000000'),('eb00b3f3-7267-4f1c-a7b6-8be1da8384bd',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:32:30.000000'),('eccb7e2c-bb75-453c-b726-a3158abfbfb1',0,NULL,0,214,NULL,200,NULL,'2024-09-23 10:28:43.000000'),('edaabd7e-9304-4fce-8d92-24473e9d10b5',0,NULL,0,214,NULL,200,NULL,'2024-09-23 11:07:07.000000'),('edb86138-aa84-4ec0-82d1-581b972feaa1',1,260,3,23,NULL,4,NULL,'2024-09-20 15:28:05.000000'),('f1167abe-2506-487e-80ec-37d08a773bc0',0,NULL,4,202,NULL,200,NULL,'2024-09-23 10:32:18.000000'),('f1f98aa6-a29b-4c13-84be-37c643122a72',1,260,3,23,NULL,4,NULL,'2024-09-20 15:48:59.000000'),('f5e94c99-f5ba-45d1-9c5b-3c121439d1d1',4,263,4,23,NULL,4,NULL,'2024-09-24 14:49:06.000000'),('f8f0e3e4-0675-4f63-8948-9a130a75ccd5',1,260,3,23,NULL,4,NULL,'2024-09-20 15:46:10.000000'),('fb7fac8b-2deb-4136-99a5-e7c463c4f84a',0,267,3,27,NULL,4,NULL,'2024-09-24 14:47:14.000000'),('fe272563-4993-4ed1-bb8f-9398eca217ca',4,263,3,0,NULL,4,NULL,'2024-09-24 14:49:00.000000'),('fef67c95-c33b-48ee-a741-717c15ea3732',0,267,3,27,NULL,4,NULL,'2024-09-24 14:47:10.000000'),('ff7e901a-0812-4e4b-a939-d70174d773d8',0,NULL,0,214,NULL,200,NULL,'2024-09-20 11:24:56.000000'),('ffc0d245-53ec-47ec-98ba-7a2effaf8f54',0,NULL,2,202,NULL,200,NULL,'2024-09-23 10:42:46.000000');
/*!40000 ALTER TABLE `eventdevices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `externalentities`
--

DROP TABLE IF EXISTS `externalentities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `externalentities` (
  `ExternalEntityID` char(36) CHARACTER SET ascii NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Comments` varchar(50) DEFAULT NULL,
  `CommercialName` varchar(50) DEFAULT NULL,
  `Photo` longtext,
  `ResponsibleName` varchar(50) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `ZIPCode` longtext,
  `Locality` varchar(50) DEFAULT NULL,
  `Village` varchar(50) DEFAULT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Mobile` int(11) DEFAULT NULL,
  `Email` longtext,
  `WWW` longtext,
  `Fax` int(11) DEFAULT NULL,
  `NIF` int(11) NOT NULL,
  `DateInserted` datetime DEFAULT NULL,
  `DateUpdated` datetime DEFAULT NULL,
  `ExternalEntityTypeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`ExternalEntityID`),
  KEY `IX_ExternalEntities_ExternalEntityTypeId` (`ExternalEntityTypeId`),
  CONSTRAINT `FK_ExternalEntities_ExternalEntitieTypes_ExternalEntityTypeId` FOREIGN KEY (`ExternalEntityTypeId`) REFERENCES `externalentitietypes` (`ExternalEntityTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `externalentities`
--

LOCK TABLES `externalentities` WRITE;
/*!40000 ALTER TABLE `externalentities` DISABLE KEYS */;
/*!40000 ALTER TABLE `externalentities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `externalentitietypes`
--

DROP TABLE IF EXISTS `externalentitietypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `externalentitietypes` (
  `ExternalEntityTypeID` char(36) CHARACTER SET ascii NOT NULL,
  `Order` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `DateInserted` datetime DEFAULT NULL,
  PRIMARY KEY (`ExternalEntityTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `externalentitietypes`
--

LOCK TABLES `externalentitietypes` WRITE;
/*!40000 ALTER TABLE `externalentitietypes` DISABLE KEYS */;
/*!40000 ALTER TABLE `externalentitietypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `GroupID` char(36) CHARACTER SET ascii NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`GroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES ('633156c0-91d2-445d-9a7f-f517f33cc798','Porto','Profissao 1'),('ea3579e0-9383-494f-bf60-b99348deaee7','Maia','Profissao 2');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kiosktransactions`
--

DROP TABLE IF EXISTS `kiosktransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kiosktransactions` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `EventTime` datetime(6) NOT NULL,
  `pin` int(11) NOT NULL,
  `CardNo` int(11) DEFAULT NULL,
  `EventName` varchar(100) DEFAULT NULL,
  `EventId` int(11) NOT NULL,
  `EventDoorId` int(11) NOT NULL,
  `VerifyModeNo` int(11) NOT NULL,
  `DeviceSN` longtext NOT NULL,
  `CreateTime` datetime(6) NOT NULL,
  `UpdateTime` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kiosktransactions`
--

LOCK TABLES `kiosktransactions` WRITE;
/*!40000 ALTER TABLE `kiosktransactions` DISABLE KEYS */;
INSERT INTO `kiosktransactions` VALUES ('00037886-9737-40fe-9ae6-9ad829a6c23a','2024-09-20 15:24:39.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:24:53.753266','2024-09-20 15:24:53.753267'),('00c7778c-f274-4abe-bc67-c64743287d8b','2024-09-20 16:48:25.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 16:48:39.125678','2024-09-20 16:48:39.125680'),('00c83292-7a80-4fa2-931e-16821d35c3e1','2024-09-23 10:42:04.000000',0,NULL,'Disconnected from the auxiliary input point',220,2,200,'AGB7234900595','2024-09-23 10:42:05.770714','2024-09-23 10:42:05.770715'),('020f0b46-7114-441f-a30a-f4d22bb4e84e','2024-09-23 10:29:17.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-23 10:29:18.716428','2024-09-23 10:29:18.716429'),('03d73c45-407c-447f-b69a-b1511675df34','2024-09-20 15:21:46.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:22:00.427233','2024-09-20 15:22:00.427235'),('049b5018-84f0-41e6-a418-28dcd5a17486','2024-09-23 10:12:17.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 10:12:18.244833','2024-09-23 10:12:18.244836'),('05fca547-f092-4dfb-85f2-c044ea9a5388','2024-09-23 10:09:27.000000',0,NULL,'Network Disconnected',105,0,200,'AGB7234900595','2024-09-23 10:12:17.971774','2024-09-23 10:12:17.971875'),('096a9aa8-75d3-4ee4-9562-304ee9be4707','2024-09-24 14:49:00.000000',4,263,'Door Opens',0,3,4,'AGB7234900595','2024-09-24 14:49:03.655922','2024-09-24 14:49:03.655924'),('0a9a4acc-f411-4f5d-9312-de8995afc657','2024-09-20 09:37:11.000000',0,NULL,'Open the door by pressing the exit button',202,3,200,'AGB7234900595','2024-09-20 09:37:31.278386','2024-09-20 09:37:31.278388'),('0eced5f9-d489-4e22-b478-8a4ef8cb5e86','2024-09-23 10:29:44.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:29:45.590282','2024-09-23 10:29:45.590283'),('101a45e9-8754-4d8f-94c4-79bf09ce3f65','2024-09-24 14:46:17.000000',1,260,'Unauthorized access',23,4,4,'AGB7234900595','2024-09-24 14:46:19.756948','2024-09-24 14:46:19.756951'),('10b859ef-854a-44ce-9b6b-51eaa459cd9a','2024-09-23 10:27:24.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:28:46.031870','2024-09-23 10:28:46.031873'),('15a4d27b-d931-4654-becd-44fc16619e30','2024-09-23 11:05:25.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 11:05:26.702860','2024-09-23 11:05:26.702862'),('1976fb24-23d8-4da5-9f8f-88d79c32e3cd','2024-09-23 11:14:41.000000',2,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 11:14:42.935562','2024-09-23 11:14:42.935564'),('1a8e7f7f-26b6-4fc2-9268-c7aa876483b9','2024-09-24 14:49:10.000000',4,263,'Door Opens',0,3,4,'AGB7234900595','2024-09-24 14:49:12.873982','2024-09-24 14:49:12.873983'),('1b8301a3-7190-496b-b5aa-ce6e66334390','2024-09-23 10:08:31.000000',0,NULL,'Open the door remotely',8,1,200,'AGB7234900595','2024-09-23 10:08:32.027215','2024-09-23 10:08:32.027216'),('1e1ef13f-fba3-47f5-9d5a-2052a3dd310a','2024-09-23 10:42:18.000000',0,NULL,'Disconnected from the auxiliary input point',220,3,200,'AGB7234900595','2024-09-23 10:42:19.770992','2024-09-23 10:42:19.770993'),('20c5a5b6-e596-43ec-83d4-78b323f917c1','2024-09-24 14:47:14.000000',0,267,'Not Registered',27,3,4,'AGB7234900595','2024-09-24 14:47:16.751488','2024-09-24 14:47:16.751489'),('2646d286-82f9-4f22-aac0-3c1ff0c9da0b','2024-09-24 14:32:17.000000',0,NULL,'Open the door remotely',8,1,200,'AGB7234900595','2024-09-24 14:32:19.609062','2024-09-24 14:32:19.609063'),('28ec2bf7-4490-4f06-aaa6-034d5816b494','2024-09-20 15:41:12.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:41:26.903718','2024-09-20 15:41:26.903720'),('29010552-e207-4108-8f2f-0703068fb972','2024-09-24 14:46:15.000000',1,260,'Unauthorized access',23,4,4,'AGB7234900595','2024-09-24 14:46:17.718495','2024-09-24 14:46:17.718496'),('2a2d82e0-1b2c-431b-89fc-8be31c4b3379','2024-09-23 10:23:00.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-23 10:28:44.733877','2024-09-23 10:28:44.733922'),('2acd109d-a3c5-412d-96be-f9f171e08dbd','2024-09-20 15:21:52.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:22:06.981458','2024-09-20 15:22:06.981460'),('2acdc815-64ee-4823-8ec9-ddfb762edae3','2024-09-20 15:42:46.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:43:00.772636','2024-09-20 15:43:00.772641'),('2fbc39db-b195-422f-85a3-3a13635a3e47','2024-09-20 15:34:22.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:34:36.990855','2024-09-20 15:34:36.990856'),('32a4f291-a7e5-4853-b2f4-09de0b703604','2024-09-24 14:46:30.000000',0,269,'Not Registered',27,3,4,'AGB7234900595','2024-09-24 14:46:33.224111','2024-09-24 14:46:33.224113'),('32c4b853-5987-4a6e-9b0d-60e67ebeaba3','2024-09-20 09:37:05.000000',0,NULL,'Start Device',206,0,200,'AGB7234900595','2024-09-20 09:37:30.318174','2024-09-20 09:37:30.318215'),('333eda54-2a2b-47a5-ad2f-9a18a229bdc5','2024-09-20 09:42:27.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-20 09:42:41.195789','2024-09-20 09:42:41.195791'),('3711eab7-b5e0-4f19-aa45-328afec8e9c2','2024-09-23 09:24:43.000000',0,NULL,'Start Device',206,0,200,'AGB7234900595','2024-09-23 09:24:55.987510','2024-09-23 09:24:55.987546'),('37bdfbe2-82ba-4127-8127-6126d3c56e9c','2024-09-20 15:43:43.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-20 15:43:58.111725','2024-09-20 15:43:58.111728'),('37bf71c6-d47b-40a2-8be4-fe6f4fd26d6f','2024-09-23 11:07:07.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 11:07:08.297469','2024-09-23 11:07:08.297472'),('3c3c6257-abdb-4cd5-b7e8-1c95ff6b57cc','2024-09-24 14:46:19.000000',2,261,'Unauthorized access',23,4,4,'AGB7234900595','2024-09-24 14:46:22.294152','2024-09-24 14:46:22.294153'),('3d69acc9-5a73-4c01-8c45-f197b4e25b2d','2024-09-23 11:05:25.000000',0,NULL,'Network Disconnected',105,0,200,'AGB7234900595','2024-09-23 11:05:26.934107','2024-09-23 11:05:26.934110'),('3e12db82-c3c8-4a88-a8a0-1a32898a08cc','2024-09-20 15:16:19.000000',4,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:16:34.151315','2024-09-20 15:16:34.151318'),('3fb1b3f4-9318-4cc3-a906-4b4346280dff','2024-09-20 15:50:30.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:50:44.661724','2024-09-20 15:50:44.661727'),('43041c6b-db52-4855-9dd3-651d8007e44c','2024-09-23 10:28:43.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 10:28:47.427959','2024-09-23 10:28:47.427962'),('43cb0e4d-8ba6-46df-b068-bdf2402b4d25','2024-09-20 15:46:10.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:46:25.200680','2024-09-20 15:46:25.200681'),('524b33c7-70c0-462e-9f1c-5f3186a4d60a','2024-09-23 11:14:58.000000',2,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 11:15:00.314896','2024-09-23 11:15:00.314897'),('57819a99-24e9-4224-8af5-f0d3e221239f','2024-09-23 11:05:25.000000',0,NULL,'Network Disconnected',105,0,200,'AGB7234900595','2024-09-23 11:05:26.576275','2024-09-23 11:05:26.576277'),('5b397926-eb74-4436-81c1-9e990d67888f','2024-09-24 14:47:22.000000',4,263,'Door Opens',0,3,4,'AGB7234900595','2024-09-24 14:47:25.076909','2024-09-24 14:47:25.076910'),('5b8a455e-05d0-4bad-8d99-574e11196571','2024-09-20 09:37:20.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-20 09:37:34.461951','2024-09-20 09:37:34.461954'),('5bb3fa52-9ed0-4b1d-afe3-a8486ca08115','2024-09-23 10:28:53.000000',3,262,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 10:28:54.667362','2024-09-23 10:28:54.667364'),('5cd3c20b-7dfd-4e09-91bc-477522a3d88f','2024-09-23 10:28:36.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 10:28:47.161932','2024-09-23 10:28:47.161935'),('61b275e1-ea33-4996-b4db-4f7be985a5fd','2024-09-20 15:44:07.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:44:22.277731','2024-09-20 15:44:22.277733'),('6cfd69dd-a815-429e-b989-f94b81c34436','2024-09-20 15:51:07.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:51:22.126150','2024-09-20 15:51:22.126154'),('6d9ab27f-73ea-4778-aa18-fba71e97c12d','2024-09-23 10:32:18.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-23 10:32:19.494339','2024-09-23 10:32:19.494340'),('6fb71f1b-875d-49db-b25c-a555210dce83','2024-09-20 15:35:37.000000',0,293,'Not Registered',27,3,4,'AGB7234900595','2024-09-20 15:35:51.839187','2024-09-20 15:35:51.839189'),('7228c4c0-af2b-412f-8157-e64f3a5bf899','2024-09-20 09:37:06.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-20 09:37:30.580603','2024-09-20 09:37:30.580607'),('738b68cd-2a02-4c21-86d9-a3836fa95c98','2024-09-20 15:28:10.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:28:24.450822','2024-09-20 15:28:24.450824'),('791dfd17-a2f7-4aac-8fa0-f8331186a2f0','2024-09-20 15:33:34.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:33:48.793365','2024-09-20 15:33:48.793366'),('847463f6-37dc-4ba8-a2ca-a7ecf07f275e','2024-09-20 09:37:08.000000',1,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-20 09:37:30.924152','2024-09-20 09:37:30.924158'),('871dd37b-42dd-4ce4-b4a2-f554d80dce80','2024-09-23 10:43:03.000000',0,NULL,'The auxiliary input point is short-circuited',221,3,200,'AGB7234900595','2024-09-23 10:43:04.823573','2024-09-23 10:43:04.823575'),('89df8671-e464-4e3f-949b-a265b5eb4555','2024-09-20 15:16:15.000000',1,261,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:16:30.237671','2024-09-20 15:16:30.237675'),('8a2e6ff3-d52f-42cd-ab16-8355471a17db','2024-09-23 10:20:37.000000',0,NULL,'Open the door remotely',8,1,200,'AGB7234900595','2024-09-23 10:20:37.949601','2024-09-23 10:20:37.949602'),('8a40405f-e739-42f2-abc6-fab7fd02c45d','2024-09-23 10:28:39.000000',2,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 10:28:47.295873','2024-09-23 10:28:47.295875'),('8ad19a38-1cfc-4734-acbd-32bc31100f1e','2024-09-20 15:39:58.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:40:13.080097','2024-09-20 15:40:13.080100'),('8d7845f9-a047-4b41-8452-38c0105fd415','2024-09-23 10:29:58.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 10:30:00.126239','2024-09-23 10:30:00.126240'),('90e13ad9-0e33-4dd4-9df9-18f9c6deef16','2024-09-23 11:05:26.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 11:05:27.522208','2024-09-23 11:05:27.522208'),('9740feea-27a0-423b-99a5-600c791fe50e','2024-09-24 14:46:57.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-24 14:47:00.139730','2024-09-24 14:47:00.139731'),('9b3e43d4-8421-4dad-8b81-6db13ec4966f','2024-09-23 10:41:45.000000',0,NULL,'The auxiliary input point is short-circuited',221,1,200,'AGB7234900595','2024-09-23 10:41:46.263071','2024-09-23 10:41:46.263072'),('9d180ee7-b07d-4761-8e23-4e0c21d6f7da','2024-09-24 14:46:22.000000',1,260,'Unauthorized access',23,4,4,'AGB7234900595','2024-09-24 14:46:25.342261','2024-09-24 14:46:25.342263'),('a0c9024e-6687-4286-aa61-5d7c1aef24c7','2024-09-23 11:07:06.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 11:07:07.725680','2024-09-23 11:07:07.725681'),('a1146aaa-c02c-4f65-af51-d0e8d10244d6','2024-09-23 11:07:07.000000',0,NULL,'Network Disconnected',105,0,200,'AGB7234900595','2024-09-23 11:07:08.172987','2024-09-23 11:07:08.172988'),('a262c05f-aab4-4144-a629-e4e58adf9d1f','2024-09-23 10:25:18.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-23 10:28:45.460270','2024-09-23 10:28:45.460281'),('a2820202-6d98-4368-931b-d193de49ae11','2024-09-23 11:40:10.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 11:40:11.602528','2024-09-23 11:40:11.602529'),('a2c7ebbe-d0a3-40ea-b0b2-cf368bc61104','2024-09-24 14:27:38.000000',0,NULL,'Start Device',206,0,200,'AGB7234900595','2024-09-24 14:27:52.589759','2024-09-24 14:27:52.589794'),('a3918355-ada6-4096-92d8-95742182c077','2024-09-23 10:27:53.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:28:46.595774','2024-09-23 10:28:46.595776'),('a405ba43-4a0d-4457-9878-20589bac20df','2024-09-23 11:05:13.000000',0,NULL,'Network Disconnected',105,0,200,'AGB7234900595','2024-09-23 11:05:26.123661','2024-09-23 11:05:26.123661'),('a418d282-d9cd-4a85-a19f-126c7a0f58af','2024-09-20 15:48:59.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:49:14.022993','2024-09-20 15:49:14.022995'),('a8ebbb71-2e19-4149-8ed1-cb366f8c41bd','2024-09-24 14:31:40.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-24 14:31:42.879634','2024-09-24 14:31:42.879642'),('a902785f-818d-4a9d-bc2f-ddca15d5df72','2024-09-24 14:46:36.000000',0,269,'Not Registered',27,3,4,'AGB7234900595','2024-09-24 14:46:38.711282','2024-09-24 14:46:38.711283'),('aa6843d1-daf1-41ce-a1b4-43aba0f77d1b','2024-09-20 15:28:29.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-20 15:28:43.981234','2024-09-20 15:28:43.981235'),('ac6cea15-41db-497d-bc65-f46b96c387f2','2024-09-24 14:49:06.000000',4,263,'Unauthorized access',23,4,4,'AGB7234900595','2024-09-24 14:49:08.489563','2024-09-24 14:49:08.489566'),('af170cb5-df7d-4e97-b4dc-81a67e670929','2024-09-23 10:42:46.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:42:48.302671','2024-09-23 10:42:48.302672'),('b3fb5834-0164-44ad-8f8c-8d0e817eefcb','2024-09-20 16:34:27.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 16:34:41.451917','2024-09-20 16:34:41.451920'),('b678308b-19a5-4743-86b0-6addb78ac829','2024-09-24 14:47:10.000000',0,267,'Not Registered',27,3,4,'AGB7234900595','2024-09-24 14:47:13.003467','2024-09-24 14:47:13.003470'),('b69476c8-9c8d-4937-9a76-03b7c4d5c0df','2024-09-23 10:29:34.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:29:36.123126','2024-09-23 10:29:36.123127'),('b726d38b-d78a-4a9c-8c65-92250a8a2380','2024-09-23 10:42:40.000000',0,NULL,'The auxiliary input point is short-circuited',221,3,200,'AGB7234900595','2024-09-23 10:42:41.241350','2024-09-23 10:42:41.241351'),('b8991b85-c535-438d-b251-4e6bd0c85560','2024-09-23 10:43:04.000000',0,NULL,'Disconnected from the auxiliary input point',220,3,200,'AGB7234900595','2024-09-23 10:43:05.771944','2024-09-23 10:43:05.771946'),('ba8023c5-2558-480d-b0b4-6b65d5eb36dc','2024-09-23 10:18:19.000000',0,NULL,'Open the door remotely',8,1,200,'AGB7234900595','2024-09-23 10:18:20.025361','2024-09-23 10:18:20.025363'),('c0e027fb-9fe8-4390-adb1-8610b097b7fd','2024-09-23 10:32:39.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-23 10:32:40.917175','2024-09-23 10:32:40.917176'),('c194ba6a-0da8-4cab-9650-031c7da3e283','2024-09-20 11:24:56.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-20 11:25:10.063168','2024-09-20 11:25:10.063205'),('c216ff09-4faf-4cdc-850b-ac3046389f72','2024-09-20 15:48:02.000000',1,260,'Open the door by verification during the non-valid time period',21,3,4,'AGB7234900595','2024-09-20 15:48:17.247922','2024-09-20 15:48:17.247924'),('c38f7d26-6ee1-4367-9b09-3fc3ec0fa2ff','2024-09-24 14:46:26.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-24 14:46:28.766384','2024-09-24 14:46:28.766385'),('c7164318-4415-43d5-80f3-af61939be599','2024-09-23 10:42:40.000000',0,NULL,'Disconnected from the auxiliary input point',220,3,200,'AGB7234900595','2024-09-23 10:42:41.772722','2024-09-23 10:42:41.772723'),('c717b7ed-795d-4dac-8cef-66c0054bd7ee','2024-09-23 11:50:15.000000',0,NULL,'Open the door remotely',8,1,200,'AGB7234900595','2024-09-23 11:50:16.493085','2024-09-23 11:50:16.493087'),('ca07cd6d-31e4-464d-8577-9a7234f9314b','2024-09-23 10:41:45.000000',0,NULL,'Disconnected from the auxiliary input point',220,1,200,'AGB7234900595','2024-09-23 10:41:46.762835','2024-09-23 10:41:46.762836'),('cb221c53-504e-4c52-a19d-98d4741f3add','2024-09-23 10:32:14.000000',1,260,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 10:32:15.628827','2024-09-23 10:32:15.628828'),('cbd6cb7a-6076-434a-93cb-65fd0b101c3c','2024-09-23 10:32:30.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:32:31.600902','2024-09-23 10:32:31.600903'),('cd5e2e3c-5ae5-4647-874a-881cb1d6ba45','2024-09-23 10:16:33.000000',0,NULL,'Open the door remotely',8,1,200,'AGB7234900595','2024-09-23 10:16:33.916725','2024-09-23 10:16:33.916726'),('d78f3503-a129-4731-8508-742af5594558','2024-09-23 10:42:04.000000',0,NULL,'The auxiliary input point is short-circuited',221,2,200,'AGB7234900595','2024-09-23 10:42:05.354667','2024-09-23 10:42:05.354670'),('d9d14606-f094-46b9-b08a-80dd72e077bd','2024-09-23 10:42:27.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:42:29.213659','2024-09-23 10:42:29.213659'),('dae08970-3737-4a15-9e4a-da26842c49fa','2024-09-23 10:42:59.000000',0,NULL,'Open the door by pressing the exit button',202,2,200,'AGB7234900595','2024-09-23 10:43:01.902593','2024-09-23 10:43:01.902594'),('e6b04046-81ab-4533-a018-1dba54223478','2024-09-20 15:28:05.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:28:19.252179','2024-09-20 15:28:19.252181'),('e7012c51-ee52-4b06-9c5e-9e3e2898329e','2024-09-20 15:00:34.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-20 15:00:48.830409','2024-09-20 15:00:48.830467'),('e81ea6cb-c7be-45a2-ad99-0bf49eb452ce','2024-09-20 09:37:23.000000',0,NULL,'Open the door by pressing the exit button',202,3,200,'AGB7234900595','2024-09-20 09:37:37.117551','2024-09-20 09:37:37.117554'),('e98200cd-2dce-4213-ace5-200db42ac88e','2024-09-20 15:35:29.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:35:44.362974','2024-09-20 15:35:44.362977'),('e9a80120-1c53-4d76-b4f4-34e82a8f3d35','2024-09-24 14:46:13.000000',1,260,'Unauthorized access',23,4,4,'AGB7234900595','2024-09-24 14:46:16.020285','2024-09-24 14:46:16.020285'),('e9f6a548-ab38-4b88-84d2-5965f768b117','2024-09-20 15:20:16.000000',1,261,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:20:30.893890','2024-09-20 15:20:30.893891'),('ef15e331-9188-4817-8631-abd653102300','2024-09-20 09:37:17.000000',1,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-20 09:37:32.300803','2024-09-20 09:37:32.300805'),('f0423627-93d6-4e33-bc3f-5a4ae9a93fa1','2024-09-23 10:28:46.000000',2,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-23 10:28:47.768745','2024-09-23 10:28:47.768748'),('f0de01a1-6635-49c3-b218-952637c9bd09','2024-09-20 15:49:11.000000',1,260,'Open the door by verification during the non-valid time period',21,3,4,'AGB7234900595','2024-09-20 15:49:25.914262','2024-09-20 15:49:25.914264'),('f19a56c0-7b13-4a79-a562-4b7e3b2c34f5','2024-09-24 14:46:42.000000',0,269,'Not Registered',27,4,4,'AGB7234900595','2024-09-24 14:46:44.732729','2024-09-24 14:46:44.732731'),('f482af22-0bc4-4e7f-b57a-31f37fde220a','2024-09-20 15:45:26.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:45:41.063664','2024-09-20 15:45:41.063665'),('f502a92c-31bf-48de-9c5e-be45cb709080','2024-09-24 14:31:14.000000',0,NULL,'Network Disconnected',105,0,200,'AGB7234900595','2024-09-24 14:31:42.543533','2024-09-24 14:31:42.543568'),('f51aa902-8c1f-42e0-96bd-2f4dc0e5453c','2024-09-20 15:32:46.000000',1,260,'Unauthorized access',23,3,4,'AGB7234900595','2024-09-20 15:33:01.066286','2024-09-20 15:33:01.066287'),('f7dbbbc6-5e51-4c95-8082-8c84b497e0b9','2024-09-23 11:05:25.000000',0,NULL,'Successfully connected to the server',214,0,200,'AGB7234900595','2024-09-23 11:05:26.349507','2024-09-23 11:05:26.349508'),('f89b0c4e-116e-4bf1-849f-b91d22918305','2024-09-20 09:37:13.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-20 09:37:31.839095','2024-09-20 09:37:31.839098'),('f8bebb3b-da3b-4a35-851f-451a43629489','2024-09-23 10:29:26.000000',0,NULL,'Open the door by pressing the exit button',202,4,200,'AGB7234900595','2024-09-23 10:29:27.933661','2024-09-23 10:29:27.933663'),('fd66fb10-405a-4732-8f94-dac241bbaa26','2024-09-23 10:42:18.000000',0,NULL,'The auxiliary input point is short-circuited',221,3,200,'AGB7234900595','2024-09-23 10:42:19.254657','2024-09-23 10:42:19.254658'),('ff11aa4b-38cf-4ebc-9556-ef96b6c8a527','2024-09-20 09:37:26.000000',1,261,'Door Opens',0,3,4,'AGB7234900595','2024-09-20 09:37:39.848254','2024-09-20 09:37:39.848258');
/*!40000 ALTER TABLE `kiosktransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kiosktransactionsmb`
--

DROP TABLE IF EXISTS `kiosktransactionsmb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kiosktransactionsmb` (
  `Id` char(36) NOT NULL,
  `TransactionType` varchar(100) NOT NULL,
  `Amount` varchar(100) NOT NULL,
  `StatusCode` int(11) NOT NULL,
  `StatusMessage` varchar(100) NOT NULL,
  `ClientTicket` varchar(255) DEFAULT NULL,
  `MerchantTicket` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kiosktransactionsmb`
--

LOCK TABLES `kiosktransactionsmb` WRITE;
/*!40000 ALTER TABLE `kiosktransactionsmb` DISABLE KEYS */;
INSERT INTO `kiosktransactionsmb` VALUES ('08dcdbb0-de03-4ae6-8db9-f926afd81c19','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_968d745c-e89c-4936-b879-dc0b41f775a9.jpg','Uploads/TicketMB/Comerciante/_38f84292-ff73-494d-b25a-d21aa980c79b.jpg',NULL,'2024-09-23 10:08:31.000000'),('08dcdbb0-de14-4049-8a3f-d64ef38df129','Terminal Pagamento','0.50',12,'Transação recusada','Uploads/TicketMB/Clientes/_701aee01-90bd-4144-a35f-39db8cfbb1be.jpg','Uploads/TicketMB/Comerciante/_fe070701-c15b-4b60-a34e-a84b20a1a205.jpg',NULL,'2024-09-23 10:12:35.000000'),('08dcdbb0-de28-4249-8f76-dc5b21e1274f','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_ce5630b9-cf75-45f8-bb0b-3987b5c36a61.jpg','Uploads/TicketMB/Comerciante/_90fd761b-82e6-4db1-980c-a588b17372dd.jpg',NULL,'2024-09-23 10:16:33.000000'),('08dcdbb0-de39-47c1-8d45-2abe7bd61924','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_f32d157d-8d6c-43a8-955b-160cd50acbb3.jpg','Uploads/TicketMB/Comerciante/_febfc9cb-bc66-4de4-9834-8a983ec833e3.jpg',NULL,'2024-09-23 10:18:18.000000'),('08dcdbb0-e2b6-475b-8464-93209be9b0ac','Terminal Pagamento','0.50',12,'Transação recusada','Uploads/TicketMB/Clientes/_12004d79-5436-423d-b9a2-4c0eaa79b6a0.jpg','Uploads/TicketMB/Comerciante/_00182be4-65d9-4382-ab38-84e59d01e4e6.jpg',NULL,'2024-09-23 10:19:53.000000'),('08dcdbb0-fc87-4b18-854a-4f4a298894b6','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_afa46f91-0e08-4395-8302-430957a07170.jpg','Uploads/TicketMB/Comerciante/_39024f07-93af-4458-82f6-9769199a1a99.jpg',NULL,'2024-09-23 10:20:36.000000'),('08dcdbbd-8274-4dee-8634-a702ff7a2812','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_5d200e3c-45e9-4c77-8147-e355c31d5ebd.jpg','Uploads/TicketMB/Comerciante/_7461917f-895b-4c89-a1db-64f5613a825d.jpg',NULL,'2024-09-23 11:50:16.493087'),('08dcdbd8-6139-4636-8fa7-7faea1431600','Terminal Pagamento','0.50',10,'Transação cancelada',NULL,NULL,NULL,'2024-09-23 15:02:35.000000'),('08dcdbd8-709e-4820-8a05-139cba50b8d5','Terminal Pagamento','0.50',10,'Transação cancelada',NULL,NULL,NULL,'2024-09-23 15:03:00.000000'),('08dcdbd8-8801-492d-8516-e581c5e9f09b','Terminal Pagamento','0.50',10,'Transação cancelada',NULL,NULL,NULL,'2024-09-23 15:03:40.000000'),('08dcdc9d-3b70-446f-8cf4-2b673d01fe12','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_0fcec264-a705-4864-b941-3cd58442a343.jpg','Uploads/TicketMB/Comerciante/_269aa8ef-9fa8-4a88-b178-4baf8417ec56.jpg',NULL,'2024-09-24 14:31:41.000000'),('08dcdc9d-5042-49d0-8044-f7790576c795','Terminal Pagamento','0.50',0,'Transação bem sucedida','Uploads/TicketMB/Clientes/_3d05da1a-55e6-4720-9a71-263a0b0147b6.jpg','Uploads/TicketMB/Comerciante/_8ee8b6c4-c087-4c1f-924e-56e9a745bf1b.jpg',NULL,'2024-09-24 14:32:16.000000');
/*!40000 ALTER TABLE `kiosktransactionsmb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professions`
--

DROP TABLE IF EXISTS `professions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professions` (
  `ProfessionID` char(36) CHARACTER SET ascii NOT NULL,
  `Code` int(11) NOT NULL,
  `Acronym` varchar(4) DEFAULT NULL,
  `Description` varchar(50) NOT NULL,
  PRIMARY KEY (`ProfessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professions`
--

LOCK TABLES `professions` WRITE;
/*!40000 ALTER TABLE `professions` DISABLE KEYS */;
INSERT INTO `professions` VALUES ('65b7368b-452e-48e3-9d0f-d049df11e1fb',2,'P2','Profissao 2'),('fe202523-e6e8-4b66-883c-245292d58c17',1,'P1','Profissao 1');
/*!40000 ALTER TABLE `professions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicidades`
--

DROP TABLE IF EXISTS `publicidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicidades` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `NomeArquivo` varchar(255) NOT NULL,
  `TipoArquivo` int(11) NOT NULL,
  `Creador` varchar(100) NOT NULL,
  `Desativar` tinyint(1) NOT NULL,
  `URLArquivo` varchar(500) NOT NULL,
  `Ordem` int(11) NOT NULL,
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TempoExecucaoImagens` int(11) DEFAULT NULL,
  `DataFim` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicidades`
--

LOCK TABLES `publicidades` WRITE;
/*!40000 ALTER TABLE `publicidades` DISABLE KEYS */;
INSERT INTO `publicidades` VALUES ('31b89aac-170d-4643-90f3-589457c7c099','phone.jpg',1,'João',0,'Uploads/Midia/Imagens/phone_900p.jpg',2,'2024-09-23 10:48:22','2024-09-24 14:30:06',5,NULL),('bf61dc43-188f-4628-a543-e01d84e805c5','puzzle.jpg',1,'João',0,'Uploads/Midia/Imagens/puzzle_900p.jpg',1,'2024-09-23 08:25:57','2024-09-24 14:30:06',5,NULL),('d3e3a32c-36f6-4b2b-9fee-2f57c59bdd9b','map.jpg',1,'João',0,'Uploads/Midia/Imagens/map_990p.jpg',3,'2024-09-23 10:49:01','2024-09-24 14:30:06',5,NULL);
/*!40000 ALTER TABLE `publicidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roleclaims`
--

DROP TABLE IF EXISTS `roleclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roleclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(255) NOT NULL,
  `ClaimType` longtext,
  `ClaimValue` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_RoleClaims_RoleId` (`RoleId`),
  CONSTRAINT `FK_RoleClaims_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleclaims`
--

LOCK TABLES `roleclaims` WRITE;
/*!40000 ALTER TABLE `roleclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `roleclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(256) DEFAULT NULL,
  `NormalizedName` varchar(256) DEFAULT NULL,
  `ConcurrencyStamp` longtext,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('5eefade7-85d6-4320-a4e1-5abb0b0dd736','Admin','ADMIN',NULL),('cca0249c-b931-4618-ad9a-424d9a521e29','User','USER',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userclaims`
--

DROP TABLE IF EXISTS `userclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` varchar(255) NOT NULL,
  `ClaimType` longtext,
  `ClaimValue` longtext,
  PRIMARY KEY (`Id`),
  KEY `IX_UserClaims_UserId` (`UserId`),
  CONSTRAINT `FK_UserClaims_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userclaims`
--

LOCK TABLES `userclaims` WRITE;
/*!40000 ALTER TABLE `userclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `userclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogins`
--

DROP TABLE IF EXISTS `userlogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogins` (
  `LoginProvider` varchar(255) NOT NULL,
  `ProviderKey` varchar(255) NOT NULL,
  `ProviderDisplayName` longtext,
  `UserId` varchar(255) NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  KEY `IX_UserLogins_UserId` (`UserId`),
  CONSTRAINT `FK_UserLogins_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogins`
--

LOCK TABLES `userlogins` WRITE;
/*!40000 ALTER TABLE `userlogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `userlogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `UserId` varchar(255) NOT NULL,
  `RoleId` varchar(255) NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`),
  KEY `IX_UserRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_UserRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_UserRoles_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES ('4d3b339f-5357-433d-9952-1215fba696be','5eefade7-85d6-4320-a4e1-5abb0b0dd736');
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` varchar(255) NOT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `Email` varchar(256) DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext,
  `SecurityStamp` longtext,
  `ConcurrencyStamp` longtext,
  `PhoneNumber` longtext,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  KEY `EmailIndex` (`NormalizedEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('4d3b339f-5357-433d-9952-1215fba696be','admin','ADMIN','admin@example.com','ADMIN@EXAMPLE.COM',1,'AQAAAAIAAYagAAAAEGOnYW65VGJ2nSPBXeQVi18nnYh9BWkCvxOtodGo3STb6YUysAIzOrU00/0F5tHD/w==','','d9174e1c-3e22-4f7d-842a-4df36976c6e2',NULL,0,0,NULL,0,0),('bf61dc43-188f-4628-a543-e01d84e805c5','norberto','USER','user@example.com','USER@EXAMPLE.COM',1,'AQAAAAIAAYagAAAAEGOnYW65VGJ2nSPBXeQVi18nnYh9BWkCvxOtodGo3STb6YUysAIzOrU00/0F5tHD/w==','','d9174e1c-3e22-4f7d-842a-4df36976c6e2',NULL,0,0,NULL,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertokens`
--

DROP TABLE IF EXISTS `usertokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertokens` (
  `UserId` varchar(255) NOT NULL,
  `LoginProvider` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Value` longtext,
  PRIMARY KEY (`UserId`,`LoginProvider`,`Name`),
  CONSTRAINT `FK_UserTokens_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertokens`
--

LOCK TABLES `usertokens` WRITE;
/*!40000 ALTER TABLE `usertokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zones` (
  `ZoneID` char(36) CHARACTER SET ascii NOT NULL,
  `Type` int(11) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Photo` longtext,
  `Acronym` varchar(4) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `ZIPcode` longtext,
  `Locality` varchar(50) DEFAULT NULL,
  `Village` varchar(50) DEFAULT NULL,
  `District` varchar(50) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Mobile` int(11) DEFAULT NULL,
  `Email` longtext,
  PRIMARY KEY (`ZoneID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones`
--

LOCK TABLES `zones` WRITE;
/*!40000 ALTER TABLE `zones` DISABLE KEYS */;
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nclock'
--

--
-- Dumping routines for database 'nclock'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-24 14:54:54
