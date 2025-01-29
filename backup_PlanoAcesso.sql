-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nclock5
-- ------------------------------------------------------
-- Server version	5.7.31

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
-- Table structure for table `accauxiliares`
--

DROP TABLE IF EXISTS `accauxiliares`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accauxiliares` (
  `AuxId` char(36) CHARACTER SET ascii NOT NULL,
  `Nome` longtext NOT NULL,
  `AuxInOut` int(11) NOT NULL,
  `AuxNo` int(11) NOT NULL,
  `AuxType` int(11) NOT NULL,
  `DeviceId` char(36) CHARACTER SET ascii NOT NULL,
  `TimezoneId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Enabled` tinyint(1) DEFAULT NULL,
  `CreatedData` datetime(6) NOT NULL,
  `UpdatedData` datetime(6) NOT NULL,
  PRIMARY KEY (`AuxId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accauxiliares`
--

LOCK TABLES `accauxiliares` WRITE;
/*!40000 ALTER TABLE `accauxiliares` DISABLE KEYS */;
/*!40000 ALTER TABLE `accauxiliares` ENABLE KEYS */;
UNLOCK TABLES;

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
  `TimezoneId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AccDoors_DevId` (`DevId`),
  KEY `IX_AccDoors_TimezoneId` (`TimezoneId`),
  CONSTRAINT `fk_acc_door_devices` FOREIGN KEY (`DevId`) REFERENCES `devices` (`ZktecoDeviceID`),
  CONSTRAINT `fk_acc_door_timesec` FOREIGN KEY (`TimezoneId`) REFERENCES `acctimeseg` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accdoors`
--

LOCK TABLES `accdoors` WRITE;
/*!40000 ALTER TABLE `accdoors` DISABLE KEYS */;
INSERT INTO `accdoors` VALUES ('28650afa-5553-4673-800b-2a7af7118a71',NULL,'2025-01-17 14:26:03',NULL,NULL,NULL,0,'2025-01-17 14:26:02',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Inbio 460 Teste-door1',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'9c6e7164-734a-4162-9bbb-4915ea3fa964','GQS2235000391','08dd1f48-c01f-4a73-857e-1b861c659e8e'),('7243b348-3836-4d2b-ae5d-df8fd3a49bee',NULL,'2025-01-17 14:26:03',NULL,NULL,NULL,0,'2025-01-17 14:26:02',NULL,NULL,NULL,2,NULL,NULL,0,10,0,4,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Inbio 460 Teste-door4',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'9c6e7164-734a-4162-9bbb-4915ea3fa964','GQS2235000391','08dd1f48-c01f-4a73-857e-1b861c659e8e'),('81e6f20a-129a-41d5-abd4-24c99071f40c',NULL,'2025-01-17 14:26:03',NULL,NULL,NULL,0,'2025-01-17 15:15:48',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Inbio 460 Teste-door2',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'c5cbe8a3-9387-4980-8ea4-c16ed33564e0','CN9A222260111','fff25598-9e39-4bc5-95e2-96e222e5339e'),('8e4a8ce5-370c-4f9e-be90-5a191e9aaad1',NULL,'2025-01-17 14:26:03',NULL,NULL,NULL,0,'2025-01-17 15:35:52',NULL,NULL,NULL,2,NULL,NULL,0,10,0,3,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,1,'Inbio 460 Teste-door3',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,'9c6e7164-734a-4162-9bbb-4915ea3fa964','GQS2235000391','fff25598-9e39-4bc5-95e2-96e222e5339e'),('b487e46c-8123-4511-8d54-f2dc7e156178',NULL,'2025-01-17 14:26:03',NULL,NULL,NULL,0,'2025-01-17 15:15:48',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Inbio 460 Teste-door2',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'9c6e7164-734a-4162-9bbb-4915ea3fa964','GQS2235000391','fff25598-9e39-4bc5-95e2-96e222e5339e');
/*!40000 ALTER TABLE `accdoors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accesscontroles`
--

DROP TABLE IF EXISTS `accesscontroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accesscontroles` (
  `AcId` char(36) CHARACTER SET ascii NOT NULL,
  `EmployeesId` char(36) CHARACTER SET ascii NOT NULL,
  `DoorId` char(36) CHARACTER SET ascii NOT NULL,
  `TimezoneId` char(36) CHARACTER SET ascii NOT NULL,
  `CreaterName` varchar(255) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `UpdateDate` datetime(6) NOT NULL,
  PRIMARY KEY (`AcId`),
  KEY `IX_AccessControles_DoorId` (`DoorId`),
  KEY `IX_AccessControles_EmployeesId` (`EmployeesId`),
  KEY `IX_AccessControles_TimezoneId` (`TimezoneId`),
  CONSTRAINT `FK_AccessControles_AccDoors_DoorId` FOREIGN KEY (`DoorId`) REFERENCES `accdoors` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AccessControles_AccTimeSeg_TimezoneId` FOREIGN KEY (`TimezoneId`) REFERENCES `acctimeseg` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_AccessControles_Employees_EmployeesId` FOREIGN KEY (`EmployeesId`) REFERENCES `employees` (`EmployeeID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesscontroles`
--

LOCK TABLES `accesscontroles` WRITE;
/*!40000 ALTER TABLE `accesscontroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `accesscontroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acchorarioperiodos`
--

DROP TABLE IF EXISTS `acchorarioperiodos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acchorarioperiodos` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Nome` varchar(100) DEFAULT NULL,
  `D1E1` time DEFAULT NULL,
  `D1S1` time DEFAULT NULL,
  `D2E1` time DEFAULT NULL,
  `D2S1` time DEFAULT NULL,
  `D3E1` time DEFAULT NULL,
  `D3S1` time DEFAULT NULL,
  `D4E1` time DEFAULT NULL,
  `D4S1` time DEFAULT NULL,
  `D5E1` time DEFAULT NULL,
  `D5S1` time DEFAULT NULL,
  `D6E1` time DEFAULT NULL,
  `D6S1` time DEFAULT NULL,
  `D7E1` time DEFAULT NULL,
  `D7S1` time DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acchorarioperiodos`
--

LOCK TABLES `acchorarioperiodos` WRITE;
/*!40000 ALTER TABLE `acchorarioperiodos` DISABLE KEYS */;
/*!40000 ALTER TABLE `acchorarioperiodos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acchorarios`
--

DROP TABLE IF EXISTS `acchorarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acchorarios` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `IDPlano` char(36) CHARACTER SET ascii NOT NULL,
  `IDPeriodo` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `IX_AccHorarios_IDPlano` (`IDPlano`),
  CONSTRAINT `FK_AccHorarios_AccPlanoHorarios_IDPlano` FOREIGN KEY (`IDPlano`) REFERENCES `accplanohorarios` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acchorarios`
--

LOCK TABLES `acchorarios` WRITE;
/*!40000 ALTER TABLE `acchorarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `acchorarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accplanoacessos`
--

DROP TABLE IF EXISTS `accplanoacessos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accplanoacessos` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Tipo` smallint(6) DEFAULT NULL,
  `TipoVerificacao` smallint(6) DEFAULT NULL,
  `VerificacaoFixa` tinyint(1) DEFAULT NULL,
  `DataInicio` datetime DEFAULT NULL,
  `DataFim` datetime DEFAULT NULL,
  `Opc` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT NULL,
  `SaldoZonaCarregamento` tinyint(1) DEFAULT NULL,
  `SaldoZonaLotacao` tinyint(1) DEFAULT NULL,
  `AsWithAc` tinyint(1) DEFAULT NULL,
  `AcOutWithAs` tinyint(1) DEFAULT NULL,
  `AcOutWithAsOffset` smallint(6) DEFAULT NULL,
  `MasterOnline` tinyint(1) DEFAULT NULL,
  `RespAuthOnline` tinyint(1) DEFAULT NULL,
  `RespAuthOnlineOffset` int(11) DEFAULT NULL,
  `AcGrpHR` tinyint(1) DEFAULT NULL,
  `OConfig` longtext,
  `CreatedDate` datetime DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accplanoacessos`
--

LOCK TABLES `accplanoacessos` WRITE;
/*!40000 ALTER TABLE `accplanoacessos` DISABLE KEYS */;
INSERT INTO `accplanoacessos` VALUES ('10c08059-eff4-462c-b51d-70af0e714e1d','Plano acesso 2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-26 21:55:34',NULL),('8d9c73fe-2e1a-406e-b4c0-4b32f12854da','Plano acesso 1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-26 21:55:30',NULL);
/*!40000 ALTER TABLE `accplanoacessos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accplanohorarios`
--

DROP TABLE IF EXISTS `accplanohorarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accplanohorarios` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Nome` varchar(150) DEFAULT NULL,
  `Descricao` varchar(250) DEFAULT NULL,
  `Tipo` int(11) DEFAULT NULL,
  `Opc` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `Rem` bit(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accplanohorarios`
--

LOCK TABLES `accplanohorarios` WRITE;
/*!40000 ALTER TABLE `accplanohorarios` DISABLE KEYS */;
INSERT INTO `accplanohorarios` VALUES ('191ceb41-b687-4ac2-976a-3e1863bfe078','Plano Horario 1',NULL,NULL,NULL,'2025-01-23 22:26:33',NULL);
/*!40000 ALTER TABLE `accplanohorarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accplanosacessodispositivos`
--

DROP TABLE IF EXISTS `accplanosacessodispositivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accplanosacessodispositivos` (
  `IDPlanosAcessoDispositivo` char(36) CHARACTER SET ascii NOT NULL,
  `IDPlanoAcesso` char(36) CHARACTER SET ascii NOT NULL,
  `IDTerminal` char(36) CHARACTER SET ascii NOT NULL,
  `IDPorta` char(36) CHARACTER SET ascii NOT NULL,
  `IDPlanoHorario` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Nivel` int(11) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `Rem` bit(1) DEFAULT NULL,
  PRIMARY KEY (`IDPlanosAcessoDispositivo`),
  KEY `IX_AccPlanosAcessoDispositivos_ID` (`IDPlanoAcesso`),
  KEY `IX_AccPlanosAcessoDispositivos_IDPlanoHorario` (`IDPlanoHorario`),
  CONSTRAINT `FK_AccPlanosAcessoDispositivos_AccPlanoAcessos_ID` FOREIGN KEY (`IDPlanoAcesso`) REFERENCES `accplanoacessos` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_AccPlanosAcessoDispositivos_AccPlanoHorarios_IDPlanoHorario` FOREIGN KEY (`IDPlanoHorario`) REFERENCES `accplanohorarios` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accplanosacessodispositivos`
--

LOCK TABLES `accplanosacessodispositivos` WRITE;
/*!40000 ALTER TABLE `accplanosacessodispositivos` DISABLE KEYS */;
INSERT INTO `accplanosacessodispositivos` VALUES ('2af89d7e-2ed4-4e90-9012-83d39eeb0587','10c08059-eff4-462c-b51d-70af0e714e1d','9c6e7164-734a-4162-9bbb-4915ea3fa964','7243b348-3836-4d2b-ae5d-df8fd3a49bee','191ceb41-b687-4ac2-976a-3e1863bfe078',NULL,'2025-01-26 22:03:24',_binary '\0'),('4b384f36-c6e0-4527-a87d-130a408a2600','8d9c73fe-2e1a-406e-b4c0-4b32f12854da','9c6e7164-734a-4162-9bbb-4915ea3fa964','b487e46c-8123-4511-8d54-f2dc7e156178','191ceb41-b687-4ac2-976a-3e1863bfe078',NULL,'2025-01-26 22:04:46',_binary '\0'),('90f969f6-2540-4a60-b55b-1d258cb2581d','8d9c73fe-2e1a-406e-b4c0-4b32f12854da','9c6e7164-734a-4162-9bbb-4915ea3fa964','28650afa-5553-4673-800b-2a7af7118a71','191ceb41-b687-4ac2-976a-3e1863bfe078',NULL,'2025-01-26 22:04:46',_binary '\0'),('96a5a46f-12bc-4a6f-a050-4e25b47dfa11','8d9c73fe-2e1a-406e-b4c0-4b32f12854da','c5cbe8a3-9387-4980-8ea4-c16ed33564e0','81e6f20a-129a-41d5-abd4-24c99071f40c','191ceb41-b687-4ac2-976a-3e1863bfe078',NULL,'2025-01-26 22:04:46',_binary '\0'),('c94fdccb-d75d-41bb-a06d-b81d97611d9e','10c08059-eff4-462c-b51d-70af0e714e1d','9c6e7164-734a-4162-9bbb-4915ea3fa964','8e4a8ce5-370c-4f9e-be90-5a191e9aaad1','191ceb41-b687-4ac2-976a-3e1863bfe078',NULL,'2025-01-26 22:03:24',_binary '\0');
/*!40000 ALTER TABLE `accplanosacessodispositivos` ENABLE KEYS */;
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
INSERT INTO `acctimeseg` VALUES ('08dd1f48-c01f-4a73-857e-1b861c659e8e','2',NULL,NULL,'2024-12-18 09:45:47',NULL,NULL,'admin',NULL,'2024-12-18 09:55:00',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','19:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00',0,'23:59','00:00','00:00','19:00','00:00','00:00','06-Horas','12-Horas','23:59','00:00','00:00','19:00','00:00','00:00','23:59','00:00','00:00','19:00','00:00','00:00','23:59','00:00','00:00','19:00','00:00','00:00','23:59','00:00','00:00','19:00','00:00','00:00','23:59','00:00','00:00','19:00','00:00','00:00'),('08dd2020-24fa-4a3d-86a9-347151d7a7f3','3',NULL,NULL,'2024-12-19 11:27:38',NULL,NULL,'',NULL,'2024-12-19 15:17:06',NULL,NULL,NULL,NULL,'08:00','00:00','00:00','19:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00',1,'08:00','00:00','00:00','19:00','00:00','00:00','19h-08h',NULL,'08:00','00:00','00:00','19:00','00:00','00:00','08:00','00:00','00:00','19:00','00:00','00:00','08:00','00:00','00:00','15:18','00:00','00:00','08:00','00:00','00:00','19:00','00:00','00:00','08:00','00:00','00:00','19:00','00:00','00:00'),('08dd2e3d-89e9-4503-8dab-17201a1ea858','4',NULL,NULL,'2025-01-06 10:33:19',NULL,NULL,'admin',NULL,'2025-01-06 10:33:47',NULL,NULL,NULL,NULL,'00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00',1,'00:00','00:00','00:00','02:00','00:00','00:00','fwefrwerf',NULL,'00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','02:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00'),('08dd2e3d-dd15-4312-877c-a6de275f62b4','5',NULL,NULL,'2025-01-06 10:35:39',NULL,NULL,'admin',NULL,'2025-01-06 10:36:13',NULL,NULL,NULL,NULL,'00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00',1,'00:00','00:00','00:00','02:00','00:00','00:00','dgdgdfgdfg',NULL,'00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','02:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00'),('fff25598-9e39-4bc5-95e2-96e222e5339e','1',NULL,NULL,'2024-10-29 00:48:40',NULL,NULL,NULL,NULL,'2024-10-29 00:48:40',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00',1,'23:59','00:00','00:00','00:00','00:00','00:00','24-Hour',NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00');
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
-- Table structure for table `atthorarioperiodo`
--

DROP TABLE IF EXISTS `atthorarioperiodo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atthorarioperiodo` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `IDHorario` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT NULL,
  `Nome` longtext,
  `Tipo` smallint(6) DEFAULT NULL,
  `Inicio` datetime(6) DEFAULT NULL,
  `Fim` datetime(6) DEFAULT NULL,
  `DiaProcessa` smallint(6) DEFAULT NULL,
  `Objectivo` datetime(6) DEFAULT NULL,
  `TolEntrada` datetime(6) DEFAULT NULL,
  `TolSaida` datetime(6) DEFAULT NULL,
  `Arredonda` datetime(6) DEFAULT NULL,
  `AutoTipo` smallint(6) DEFAULT NULL,
  `CreatedDate` datetime(6) DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  `HorarioID` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `IX_AttHorarioPeriodo_HorarioID` (`HorarioID`),
  CONSTRAINT `FK_AttHorarioPeriodo_AttHorarios_HorarioID` FOREIGN KEY (`HorarioID`) REFERENCES `atthorarios` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atthorarioperiodo`
--

LOCK TABLES `atthorarioperiodo` WRITE;
/*!40000 ALTER TABLE `atthorarioperiodo` DISABLE KEYS */;
/*!40000 ALTER TABLE `atthorarioperiodo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atthorarios`
--

DROP TABLE IF EXISTS `atthorarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atthorarios` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Sigla` varchar(4) DEFAULT NULL,
  `Codigo` varchar(15) DEFAULT NULL,
  `Nome` varchar(50) DEFAULT NULL,
  `Cor` varchar(50) DEFAULT NULL,
  `HoraInicio` datetime DEFAULT NULL,
  `DiaInicio` smallint(6) DEFAULT NULL,
  `HoraFim` datetime DEFAULT NULL,
  `DiaFim` smallint(6) DEFAULT NULL,
  `Objectivo` datetime DEFAULT NULL,
  `IDCodTrab` int(11) DEFAULT NULL,
  `IDCodExtra` int(11) DEFAULT NULL,
  `IDCodFalta` int(11) DEFAULT NULL,
  `IDCodNaoDefinido` int(11) DEFAULT NULL,
  `IDCodTol` int(11) DEFAULT NULL,
  `IDCodServ` int(11) DEFAULT NULL,
  `ArredondaTrab` time DEFAULT NULL,
  `ArredondaExtra` time DEFAULT NULL,
  `ArredondaFalta` time DEFAULT NULL,
  `ArredondaNaoDefinido` time DEFAULT NULL,
  `ArredondaTol` time DEFAULT NULL,
  `ArredondaServ` time DEFAULT NULL,
  `Tipo` tinyint(1) DEFAULT NULL,
  `Opc` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  `MinMov` int(11) DEFAULT NULL,
  `TipoAutoMovs` smallint(6) DEFAULT NULL,
  `MovIgnorarReal` tinyint(1) DEFAULT NULL,
  `IntervaloDescTudo` tinyint(1) DEFAULT NULL,
  `IDCodExtra2` int(11) DEFAULT NULL,
  `MDFCEE` tinyint(1) DEFAULT NULL,
  `FaltaDiaTol` tinyint(1) DEFAULT NULL,
  `FaltaDiaMesTol` tinyint(1) DEFAULT NULL,
  `FaltaDiaMesTolMax` time DEFAULT NULL,
  `OConfig` longtext,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atthorarios`
--

LOCK TABLES `atthorarios` WRITE;
/*!40000 ALTER TABLE `atthorarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `atthorarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attplanotrabalhohorario`
--

DROP TABLE IF EXISTS `attplanotrabalhohorario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attplanotrabalhohorario` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `IDPlano` char(36) CHARACTER SET ascii NOT NULL,
  `DiaDif` int(11) NOT NULL,
  `IDHorario` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Tipo` smallint(6) DEFAULT NULL,
  `CreatedDate` datetime(6) DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  `PlanoTrabalhoID` char(36) CHARACTER SET ascii DEFAULT NULL,
  `HorarioID` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_AttPlanoTrabalhoHorario_HorarioID` (`HorarioID`),
  KEY `IX_AttPlanoTrabalhoHorario_PlanoTrabalhoID` (`PlanoTrabalhoID`),
  CONSTRAINT `FK_AttPlanoTrabalhoHorario_AttHorarios_HorarioID` FOREIGN KEY (`HorarioID`) REFERENCES `atthorarios` (`ID`),
  CONSTRAINT `FK_AttPlanoTrabalhoHorario_AttPlanoTrabalhos_PlanoTrabalhoID` FOREIGN KEY (`PlanoTrabalhoID`) REFERENCES `attplanotrabalhos` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attplanotrabalhohorario`
--

LOCK TABLES `attplanotrabalhohorario` WRITE;
/*!40000 ALTER TABLE `attplanotrabalhohorario` DISABLE KEYS */;
/*!40000 ALTER TABLE `attplanotrabalhohorario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attplanotrabalhos`
--

DROP TABLE IF EXISTS `attplanotrabalhos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attplanotrabalhos` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Codigo` varchar(15) DEFAULT NULL,
  `Nome` varchar(50) NOT NULL,
  `Tipo` smallint(6) NOT NULL,
  `DataRef` datetime DEFAULT NULL,
  `Feriados` tinyint(1) DEFAULT NULL,
  `IDHorarioFeriado` int(11) DEFAULT NULL,
  `IDHorarioFolga` int(11) DEFAULT NULL,
  `IDHorarioNormal` int(11) DEFAULT NULL,
  `MaxFolgas` smallint(6) DEFAULT NULL,
  `MinInterFolgas` smallint(6) DEFAULT NULL,
  `MaxInterFolgas` smallint(6) DEFAULT NULL,
  `Compensa` tinyint(1) DEFAULT NULL,
  `CompensaPeriodo` smallint(6) DEFAULT NULL,
  `IDCompEfectivo` int(11) DEFAULT NULL,
  `IDCompFalta` int(11) DEFAULT NULL,
  `IDCompCredito` int(11) DEFAULT NULL,
  `IDCompDebito` int(11) DEFAULT NULL,
  `IDCompCreditoTmp` int(11) DEFAULT NULL,
  `IDCompDebitoTmp` int(11) DEFAULT NULL,
  `IDCompExtra` int(11) DEFAULT NULL,
  `CompTransDebito` tinyint(1) DEFAULT NULL,
  `CompTransCredito` tinyint(1) DEFAULT NULL,
  `CompTransDebitoMax` varchar(6) DEFAULT NULL,
  `CompTransCreditoMax` varchar(6) DEFAULT NULL,
  `CompTransCreditoMin` varchar(6) DEFAULT NULL,
  `CompObjectivo` varchar(10) DEFAULT NULL,
  `CompExtra` tinyint(1) DEFAULT NULL,
  `CompExtraSeg` tinyint(1) DEFAULT NULL,
  `CompExtraSegPeriodo` smallint(6) DEFAULT NULL,
  `CompExtraSegIDCod` int(11) DEFAULT NULL,
  `CompExtraSegMaxDia` datetime DEFAULT NULL,
  `CompExtraSegMaxPeriodo` datetime DEFAULT NULL,
  `CompFalta` tinyint(1) DEFAULT NULL,
  `CompensaAuto` tinyint(1) DEFAULT NULL,
  `CompensaCredAus` tinyint(1) DEFAULT NULL,
  `CompensaCredAusPeriodo` smallint(6) DEFAULT NULL,
  `CompensaCredAusPeriodoMax` datetime DEFAULT NULL,
  `CompensaCredAusOrigemIDCod` int(11) DEFAULT NULL,
  `CompensaCredAusDestinoIDCod` int(11) DEFAULT NULL,
  `CompensaCredAusConverte` tinyint(1) DEFAULT NULL,
  `CompensaCredAusDiaMax` datetime DEFAULT NULL,
  `CompensaCredAusAuto` tinyint(1) DEFAULT NULL,
  `CompensaCredFerias` tinyint(1) DEFAULT NULL,
  `CompensaCredFeriasMaxDia` datetime DEFAULT NULL,
  `CompensaCredFeriasMaxMes` datetime DEFAULT NULL,
  `CompensaCredFeriasIDCod` int(11) DEFAULT NULL,
  `CompensaCredFeriasTempoMeioDia` datetime DEFAULT NULL,
  `CompensaCredFeriasTempoDia` datetime DEFAULT NULL,
  `CompensaSaldoNegativoJust` tinyint(1) DEFAULT NULL,
  `CompensaSaldoNegativoJustDia` datetime DEFAULT NULL,
  `CompensaSaldoNegativoJustMeioDia` datetime DEFAULT NULL,
  `BancoHoras` tinyint(1) DEFAULT NULL,
  `IDBancoHorasCredito` int(11) DEFAULT NULL,
  `IDBancoHorasCredito1` int(11) DEFAULT NULL,
  `IDBancoHorasCredito2` int(11) DEFAULT NULL,
  `IDBancoHorasCredito3` int(11) DEFAULT NULL,
  `IDBancoHoras` int(11) DEFAULT NULL,
  `IDBancoHoras1` int(11) DEFAULT NULL,
  `IDBancoHoras2` int(11) DEFAULT NULL,
  `IDBancoHoras3` int(11) DEFAULT NULL,
  `EnableBancoHorasDia` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasSemana` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasMes` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasAno` tinyint(1) DEFAULT NULL,
  `BancoHorasDia` smallint(6) DEFAULT NULL,
  `BancoHorasSemana` smallint(6) DEFAULT NULL,
  `BancoHorasMes` smallint(6) DEFAULT NULL,
  `BancoHorasAno` smallint(6) DEFAULT NULL,
  `EnableBancoHorasDiaDebito` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasSemanaDebito` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasMesDebito` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasAnoDebito` tinyint(1) DEFAULT NULL,
  `EnableBancoHorasAutorizacaoCred` tinyint(1) DEFAULT NULL,
  `FimMesDia` int(11) DEFAULT NULL,
  `Opc` int(11) DEFAULT NULL,
  `CalcSeg` int(11) DEFAULT NULL,
  `FeriasIgnorarFds` tinyint(1) DEFAULT NULL,
  `SubRefMin` datetime DEFAULT NULL,
  `OConfig` longtext,
  `CreatedDate` datetime DEFAULT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attplanotrabalhos`
--

LOCK TABLES `attplanotrabalhos` WRITE;
/*!40000 ALTER TABLE `attplanotrabalhos` DISABLE KEYS */;
/*!40000 ALTER TABLE `attplanotrabalhos` ENABLE KEYS */;
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
INSERT INTO `categories` VALUES ('24e1044b-b660-4fe4-8fe4-5c9ca9630b05',2,'C2','Categoria 2'),('e5ec8b6c-c6f9-40f6-aac4-c14fd4b5bda9',1,'C1','Categoria 1');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configurations`
--

DROP TABLE IF EXISTS `configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configurations` (
  `Id` varchar(50) NOT NULL,
  `Variavel` varchar(255) NOT NULL,
  `Valor` longtext NOT NULL,
  PRIMARY KEY (`Id`,`Variavel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configurations`
--

LOCK TABLES `configurations` WRITE;
/*!40000 ALTER TABLE `configurations` DISABLE KEYS */;
INSERT INTO `configurations` VALUES ('configSoftware','lisenceKey','ewFSI7u1plizO6Ya+FeYCZ6yqv+X1DZv3rep96+W44dUE6sEFGEQXYsE/OTqHKhui3uWWWtDx+F+uD4PsXLP4ndyChuuD/CzPkmQQrOohoQT5NbXu3kyuhWK5pH6ZVoLBO8sXOxFljyRMwWe2Yb48+l4P2hIaIuWQ09W3g/bhutJUmUObsW2AYwmFqXtq1JcdojtIiB8x9zoEGcXADOJiQiJhK+FTLfIlTiHFrPWhMHzwz6tMhHoc3IZJOPvddnv9N4yL+T3V1tHowCt50EtyW/u492WLcKlMtGe7/Dti9jn1RcDxQnQjRtbgZLLTSjRlBjYMPfz9Nml9wWntJsKx7OPcEE61WW7NXnz/iqm4iLJs+BrI7p1E2Ym6YLUbsa8HeOs38WZXoThhFvDKser8oOs3vDYyyioT0TIgdv7ou2pPLVYO5F3smDME+eUHiU7ukhdbsv/HFBOOjo+N/Mpe/ayPEZJ0Ek1X4kDSC8EHtJLy2x7h4WGbcSYbrdbL9V9+cm4DqSyykOFnIuWPUbuqWqmuGp4kHqCg6sXtbAi9h+sohg5jepKSyDdV8gVYK6L7uu62oYhx+DyYLgnWLyGghJluV4D/wakFUEiyhBXujiVrUaL5VIuc3q99e0ueL/G9g+0ShChf9ZJ5HV7nieA/iBpzG72t4LNseCX4EfdIloXwOljj2Pvyt2KP8R9cnrwzKsbQsbZad3t99IgLXc7Dg=='),('configSoftware','setupDate','UN2B2FsgIvAjh04WzRpJzUPPyF17Ltw8ymfYh8ZA0tQ=');
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
INSERT INTO `departments` VALUES ('c0fc56d1-8e38-4e41-baff-4a9676ca7241',2,'Comercial','Departamento Comercial',0),('eeb6ec6f-248d-40f2-bcd0-c350d5af45c1',1,'Aprovisionamento','Departamento Aprovisionamento',0);
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
  `Model` varchar(50) DEFAULT NULL,
  `IpAddress` longtext,
  `Port` int(11) DEFAULT NULL,
  `Photo` longtext,
  `Code` int(11) DEFAULT NULL,
  `Platform` longtext,
  `Firmware` longtext,
  `MacAddress` longtext,
  `SerialNumber` longtext,
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
  `AccSupportFunList` varchar(255) DEFAULT NULL,
  `CardFormatFunOn` int(11) DEFAULT NULL,
  `DeviceProtocol` int(11) DEFAULT NULL,
  `DeviceType` int(11) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  `Enabled` tinyint(1) DEFAULT NULL,
  `UpdateStatus` datetime(6) DEFAULT NULL,
  `CreatedDate` datetime(6) DEFAULT NULL,
  `UpdatedDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`ZktecoDeviceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES ('9c6e7164-734a-4162-9bbb-4915ea3fa964',1,'Inbio 460 Teste','SISNID-INBIO460','192.168.1.202',9999,NULL,0,NULL,'AC Ver 5.7.8.3033 Aug 14 2023','00:17:61:20:04:61','GQS2235000391',NULL,NULL,4,4,4,600,10,200,10,NULL,NULL,4,NULL,'FB1E','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-01-25 15:38:10.243843','2025-01-17 14:26:00.411108',NULL),('a6be496e-2383-4eba-bb4d-c0829f8b6e10',3,'asxsx<zx',NULL,NULL,0,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0,NULL,'2025-01-17 17:21:50.296490',NULL),('c5cbe8a3-9387-4980-8ea4-c16ed33564e0',2,'Eface10','Nface-204_SISNID-1','192.168.1.164',9999,NULL,0,NULL,NULL,NULL,'CN9A222260111',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,1,0,1,'2025-01-25 15:38:10.363291','2025-01-17 16:55:38.412740',NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicesscheduledtask`
--

DROP TABLE IF EXISTS `devicesscheduledtask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicesscheduledtask` (
  `TaskId` char(36) CHARACTER SET ascii NOT NULL,
  `SerialNumber` varchar(100) NOT NULL,
  `Command` longtext NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  PRIMARY KEY (`TaskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicesscheduledtask`
--

LOCK TABLES `devicesscheduledtask` WRITE;
/*!40000 ALTER TABLE `devicesscheduledtask` DISABLE KEYS */;
/*!40000 ALTER TABLE `devicesscheduledtask` ENABLE KEYS */;
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
  `Phone` bigint(20) DEFAULT NULL,
  `Mobile` bigint(20) DEFAULT NULL,
  `Email` longtext,
  `Birthday` datetime DEFAULT NULL,
  `Nationality` longtext,
  `Gender` tinyint(4) DEFAULT NULL,
  `BInumber` longtext,
  `BIissuance` datetime DEFAULT NULL,
  `BIValidity` datetime DEFAULT NULL,
  `NIF` int(15) DEFAULT NULL,
  `AdmissionDate` datetime DEFAULT NULL,
  `ExitDate` datetime DEFAULT NULL,
  `RGPDAut` tinyint(4) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `StatusEmail` tinyint(4) DEFAULT NULL,
  `StatusFprint` tinyint(4) DEFAULT NULL,
  `StatusFace` tinyint(4) DEFAULT NULL,
  `StatusPalm` tinyint(4) DEFAULT NULL,
  `Type` longtext,
  `EntidadeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `DepartmentId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ProfessionId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `CategoryId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `GroupId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ZoneId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `ExternalEntityId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `AccPlanoAcessoID` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `IX_Employees_AccPlanoAcessoID` (`AccPlanoAcessoID`),
  KEY `IX_Employees_CategoryId` (`CategoryId`),
  KEY `IX_Employees_DepartmentId` (`DepartmentId`),
  KEY `IX_Employees_EntidadeId` (`EntidadeId`),
  KEY `IX_Employees_ExternalEntityId` (`ExternalEntityId`),
  KEY `IX_Employees_GroupId` (`GroupId`),
  KEY `IX_Employees_ProfessionId` (`ProfessionId`),
  KEY `IX_Employees_ZoneId` (`ZoneId`),
  CONSTRAINT `FK_Employees_AccPlanoAcessos_AccPlanoAcessoID` FOREIGN KEY (`AccPlanoAcessoID`) REFERENCES `accplanoacessos` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_Categories_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`CategoryID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_Departments_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`DepartmentID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_Entidades_EntidadeId` FOREIGN KEY (`EntidadeId`) REFERENCES `entidades` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_ExternalEntities_ExternalEntityId` FOREIGN KEY (`ExternalEntityId`) REFERENCES `externalentities` (`ExternalEntityID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_Groups_GroupId` FOREIGN KEY (`GroupId`) REFERENCES `groups` (`GroupID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_Professions_ProfessionId` FOREIGN KEY (`ProfessionId`) REFERENCES `professions` (`ProfessionID`) ON DELETE SET NULL,
  CONSTRAINT `FK_Employees_Zones_ZoneId` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`ZoneID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('08dd027a-7e2b-4847-849e-fa26156ec10b','8','Deolinda Pereira','Deolinda Pereira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('08dd148c-db9d-495f-8572-58d292857f20','4','Carmen Duarte rrr','Carmen rrr',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('7ab0e746-6f58-49c0-b639-1281f46cc02c','3','Luísa Carvalho','Luísa Carvalho',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('899a94a0-021b-4452-a350-c3235fe86a73','2','Jorge Andrade','Jorge Andrade','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('8e4a8ce5-370c-4f9e-be90-5a191e9aaad1','10','Lurdes Carvalho','Lurdes Carvalho',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('9574d4bd-ff8c-48b8-b746-ebc56e4701a4','6','Rosa Neto','Rosa Neto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('9fb23e25-d10b-4dbc-9e92-824d4d197990','1','Gabriel Duarte da Silva','Gabriel Silva','GS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b6f955bb-165f-4b1a-95fb-974ee026f915','5','Filipa Moreira','Filipa Moreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
-- Table structure for table `entidades`
--

DROP TABLE IF EXISTS `entidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidades` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Nome` varchar(200) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Morada` varchar(100) DEFAULT NULL,
  `CPostal` varchar(50) DEFAULT NULL,
  `Localidade` varchar(50) DEFAULT NULL,
  `Telefone` varchar(50) DEFAULT NULL,
  `Telemovel` varchar(50) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `NIF` bigint(20) NOT NULL,
  `WWW` varchar(255) DEFAULT NULL,
  `Observacoes` varchar(250) DEFAULT NULL,
  `Logotipo` varchar(500) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime NOT NULL,
  `Enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entidades`
--

LOCK TABLES `entidades` WRITE;
/*!40000 ALTER TABLE `entidades` DISABLE KEYS */;
INSERT INTO `entidades` VALUES ('2b4b8457-6928-48d5-9771-47686001ee6c','Demo',1,NULL,NULL,NULL,NULL,NULL,NULL,123456789,NULL,NULL,NULL,'2025-01-25 11:23:52','2025-01-25 15:35:08',1);
/*!40000 ALTER TABLE `entidades` ENABLE KEYS */;
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
  `Phone` bigint(20) DEFAULT NULL,
  `Mobile` bigint(20) DEFAULT NULL,
  `Email` longtext,
  `WWW` longtext,
  `Fax` bigint(20) DEFAULT NULL,
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
INSERT INTO `groups` VALUES ('64f1bc22-5fc3-459f-82a7-4c1509dd0609','Maia','Profissao 2'),('c833de18-e4c2-4ffe-bd60-44b2a1c2e242','Porto','Profissao 1');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kioskaberturasdistancia`
--

DROP TABLE IF EXISTS `kioskaberturasdistancia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kioskaberturasdistancia` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `NomeResponsavel` varchar(50) NOT NULL,
  `NomeEvento` varchar(255) NOT NULL,
  `Observacoes` longtext,
  `DeviceId` char(36) CHARACTER SET ascii NOT NULL,
  `DoorId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kioskaberturasdistancia`
--

LOCK TABLES `kioskaberturasdistancia` WRITE;
/*!40000 ALTER TABLE `kioskaberturasdistancia` DISABLE KEYS */;
/*!40000 ALTER TABLE `kioskaberturasdistancia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kioskocorrencias`
--

DROP TABLE IF EXISTS `kioskocorrencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kioskocorrencias` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `DataCreate` datetime(6) NOT NULL,
  `Responsavel` varchar(50) NOT NULL,
  `Observacoes` longtext,
  `TipoOcorrencia` int(11) NOT NULL,
  `DeviceId` char(36) CHARACTER SET ascii NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kioskocorrencias`
--

LOCK TABLES `kioskocorrencias` WRITE;
/*!40000 ALTER TABLE `kioskocorrencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `kioskocorrencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kioskrecolhamoedeiros`
--

DROP TABLE IF EXISTS `kioskrecolhamoedeiros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kioskrecolhamoedeiros` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `DataRecolha` datetime(6) NOT NULL,
  `PessoaResponsavel` longtext NOT NULL,
  `NumeroMoedas` int(11) NOT NULL,
  `NumeroMoedasSistema` int(11) NOT NULL,
  `DiferencaMoedas` int(11) NOT NULL,
  `DiferencaEuros` decimal(65,30) NOT NULL,
  `ValorTotalRecolhido` decimal(65,30) NOT NULL,
  `ValorTotalSistema` decimal(65,30) NOT NULL,
  `Observacoes` longtext,
  `TipoRecolha` int(11) NOT NULL,
  `DeviceID` char(36) CHARACTER SET ascii NOT NULL,
  `DataFimRecolha` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kioskrecolhamoedeiros`
--

LOCK TABLES `kioskrecolhamoedeiros` WRITE;
/*!40000 ALTER TABLE `kioskrecolhamoedeiros` DISABLE KEYS */;
/*!40000 ALTER TABLE `kioskrecolhamoedeiros` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `kiosktransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kiosktransactionsmb`
--

DROP TABLE IF EXISTS `kiosktransactionsmb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kiosktransactionsmb` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `TPId` char(36) CHARACTER SET ascii NOT NULL,
  `TransactionType` int(11) DEFAULT NULL,
  `Amount` longtext NOT NULL,
  `StatusCode` int(11) NOT NULL,
  `StatusMessage` text,
  `ClientTicket` varchar(255) DEFAULT NULL,
  `MerchantTicket` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DeviceSN` longtext,
  `Timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kiosktransactionsmb`
--

LOCK TABLES `kiosktransactionsmb` WRITE;
/*!40000 ALTER TABLE `kiosktransactionsmb` DISABLE KEYS */;
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
INSERT INTO `professions` VALUES ('11e0d3cd-dc9e-4bc5-ba72-859b1fc74f6e',2,'P2','Profissao 2'),('3fef8c1b-c436-4375-a38b-23cda7285221',1,'P1','Profissao 1');
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
INSERT INTO `roles` VALUES ('95dcddd3-98f1-4c35-8c85-29bd8bd39382','Admin','ADMIN',NULL),('dca16a83-6196-4de5-bb26-0e3cb57780f9','User','USER',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminalpagamentofunctions`
--

DROP TABLE IF EXISTS `terminalpagamentofunctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terminalpagamentofunctions` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `TPId` char(36) CHARACTER SET ascii NOT NULL,
  `Type` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `CreateDate` datetime(6) NOT NULL,
  `UpdateDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminalpagamentofunctions`
--

LOCK TABLES `terminalpagamentofunctions` WRITE;
/*!40000 ALTER TABLE `terminalpagamentofunctions` DISABLE KEYS */;
/*!40000 ALTER TABLE `terminalpagamentofunctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminalpagamentos`
--

DROP TABLE IF EXISTS `terminalpagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terminalpagamentos` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `NomeQuiosque` longtext NOT NULL,
  `Modelo` longtext NOT NULL,
  `EstadoTerminal` int(11) NOT NULL,
  `TimeReboot` time(6) NOT NULL,
  `CreateTime` datetime(6) NOT NULL,
  `UpdateTime` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminalpagamentos`
--

LOCK TABLES `terminalpagamentos` WRITE;
/*!40000 ALTER TABLE `terminalpagamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `terminalpagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminalpagamentosfechoabertura`
--

DROP TABLE IF EXISTS `terminalpagamentosfechoabertura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terminalpagamentosfechoabertura` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `TPId` longtext,
  `Timestamp` datetime(6) NOT NULL,
  `FechoImage` varchar(255) DEFAULT NULL,
  `AberturaImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminalpagamentosfechoabertura`
--

LOCK TABLES `terminalpagamentosfechoabertura` WRITE;
/*!40000 ALTER TABLE `terminalpagamentosfechoabertura` DISABLE KEYS */;
/*!40000 ALTER TABLE `terminalpagamentosfechoabertura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terminalpagamentosstatus`
--

DROP TABLE IF EXISTS `terminalpagamentosstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `terminalpagamentosstatus` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `TPId` char(36) CHARACTER SET ascii NOT NULL,
  `TipoStatus` int(11) NOT NULL,
  `NomeStatus` longtext NOT NULL,
  `Timespam` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terminalpagamentosstatus`
--

LOCK TABLES `terminalpagamentosstatus` WRITE;
/*!40000 ALTER TABLE `terminalpagamentosstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `terminalpagamentosstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useractivesessions`
--

DROP TABLE IF EXISTS `useractivesessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useractivesessions` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `UserId` varchar(450) NOT NULL,
  `Token` varchar(2000) NOT NULL,
  `EntidadeNIF` longtext NOT NULL,
  `ExpiryDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useractivesessions`
--

LOCK TABLES `useractivesessions` WRITE;
/*!40000 ALTER TABLE `useractivesessions` DISABLE KEYS */;
INSERT INTO `useractivesessions` VALUES ('08dd3d55-0ac9-426d-86e5-820cd5141d94','2a25541b-22b6-4eca-a3ff-2170d0d2391c','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMjU1NDFiLTIyYjYtNGVjYS1hM2ZmLTIxNzBkMGQyMzkxYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzc4MjYxNjF9.5O1HtTS4w3AJBxjBdNCJdIrdyKwK7M2uScbGXVdzeHw','0','2025-01-25 17:29:21.881990');
/*!40000 ALTER TABLE `useractivesessions` ENABLE KEYS */;
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
INSERT INTO `userroles` VALUES ('2a25541b-22b6-4eca-a3ff-2170d0d2391c','95dcddd3-98f1-4c35-8c85-29bd8bd39382'),('3d6b7adb-ce60-4b45-9b66-2c0353394d4f','95dcddd3-98f1-4c35-8c85-29bd8bd39382');
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
  `Name` longtext,
  `ProfileImagePath` longtext,
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
INSERT INTO `users` VALUES ('2a25541b-22b6-4eca-a3ff-2170d0d2391c',NULL,NULL,'nidgroup','NIDGROUP','admin@nidgroup.pt','ADMIN@NIDGROUP.PT',1,'AQAAAAIAAYagAAAAEFqp2NloXTed8obs9Qos5tDxLB7BMfT7o+IIrun+24ktlz2rfFXsC9lLGwi6uH0v1g==','','e0bc88d0-e4e9-421a-ac12-17808797ff28',NULL,0,0,NULL,0,0),('3d6b7adb-ce60-4b45-9b66-2c0353394d4f',NULL,NULL,'admin','ADMIN','admin@example.com','ADMIN@EXAMPLE.COM',1,'AQAAAAIAAYagAAAAEGdD55RShgVBBP7+9DPhn0s3W/7iUiAhUQ8rb+iWJxm6p8RXB1qh1Ew0Zxe2Q+mOaw==','','1bed5384-4699-4695-bd30-0f8a91f7f720',NULL,0,0,NULL,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userstasks`
--

DROP TABLE IF EXISTS `userstasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userstasks` (
  `TaskId` char(36) CHARACTER SET ascii NOT NULL,
  `UserId` longtext NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `TaskName` varchar(100) NOT NULL,
  `TaskType` int(2) NOT NULL,
  `Description` longtext NOT NULL,
  `CreatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`TaskId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userstasks`
--

LOCK TABLES `userstasks` WRITE;
/*!40000 ALTER TABLE `userstasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `userstasks` ENABLE KEYS */;
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
-- Table structure for table `viewcameras`
--

DROP TABLE IF EXISTS `viewcameras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewcameras` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `NumeroCamera` int(11) NOT NULL,
  `NomeCamera` varchar(100) NOT NULL,
  `Ip` longtext,
  `Url` varchar(200) NOT NULL,
  `UserCamera` longtext,
  `PasswordCamera` longtext,
  `CreatedDate` datetime(6) NOT NULL,
  `UpdatedDate` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewcameras`
--

LOCK TABLES `viewcameras` WRITE;
/*!40000 ALTER TABLE `viewcameras` DISABLE KEYS */;
/*!40000 ALTER TABLE `viewcameras` ENABLE KEYS */;
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
  `Phone` bigint(20) DEFAULT NULL,
  `Mobile` bigint(20) DEFAULT NULL,
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-27 10:14:54
