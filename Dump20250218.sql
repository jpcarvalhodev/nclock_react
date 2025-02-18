-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nclock2
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
INSERT INTO `accauxiliares` VALUES ('4255cad2-166a-418d-a1f9-136d18cb0e63','Teste-AuxOut2',1,2,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103371','2025-02-18 12:00:09.103371'),('4384d71f-8acc-41d5-bc77-e24887b500f1','Teste-AuxIn3',0,3,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103080','2025-02-18 12:00:09.103080'),('9bff436e-ef05-4e74-bccf-dbde0c5dd5e2','Teste-AuxOut3',1,3,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103386','2025-02-18 12:00:09.103386'),('a30e5213-b1c0-442e-9c94-f7c826e9c8b9','Teste-AuxIn2',0,2,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103053','2025-02-18 12:00:09.103053'),('a43abccc-2bcd-4746-ab01-ecaadf910c6a','Teste-AuxOut1',1,1,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103330','2025-02-18 12:00:09.103330'),('c9d2efc3-7468-4c1b-bd33-56ebb36b39f8','Teste-AuxIn4',0,4,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103097','2025-02-18 12:00:09.103098'),('df48287e-0250-4e94-9b38-6d66d883fc8d','Teste-AuxIn1',0,1,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.102528','2025-02-18 12:00:09.102665'),('ffae5d4e-0133-4128-87e9-984a0f1b49bc','Teste-AuxOut4',1,4,0,'958bd09d-c5b9-4291-83d1-1d0404004ae1',NULL,0,'2025-02-18 12:00:09.103405','2025-02-18 12:00:09.103405');
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
INSERT INTO `accdoors` VALUES ('2e25d700-176c-4e8e-919a-abda71e7941d',NULL,'2025-02-18 12:00:09',NULL,NULL,NULL,0,'2025-02-18 12:00:09',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste-door1',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'958bd09d-c5b9-4291-83d1-1d0404004ae1','GQS2235000391','08dd475f-78a1-4c3b-871e-8e6e6efa80af'),('35dae3a4-af1d-4e03-9420-df4989ac64c6',NULL,'2025-02-18 12:00:09',NULL,NULL,NULL,0,'2025-02-18 12:00:09',NULL,NULL,NULL,2,NULL,NULL,0,10,0,4,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste-door4',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'958bd09d-c5b9-4291-83d1-1d0404004ae1','GQS2235000391','08dd475f-78a1-4c3b-871e-8e6e6efa80af'),('35fa8254-94cd-491a-a5f3-26105f52f84a',NULL,'2025-02-18 12:00:09',NULL,NULL,NULL,0,'2025-02-18 12:00:09',NULL,NULL,NULL,2,NULL,NULL,0,10,0,3,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste-door3',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'958bd09d-c5b9-4291-83d1-1d0404004ae1','GQS2235000391','08dd475f-78a1-4c3b-871e-8e6e6efa80af'),('58dc6d18-1547-4525-9eb5-09228adf49f3',NULL,'2025-02-18 12:00:09',NULL,NULL,NULL,0,'2025-02-18 12:00:09',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste-door2',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'958bd09d-c5b9-4291-83d1-1d0404004ae1','GQS2235000391','08dd475f-78a1-4c3b-871e-8e6e6efa80af');
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
INSERT INTO `acchorarios` VALUES ('1ee0c688-4ffc-41ea-ae0a-658adaf37c88','2484d80c-3ebc-4c48-8409-43bf7d49859f','08dd475f-78a1-4c3b-871e-8e6e6efa80af','2025-02-07 10:09:56',0),('87c20fe8-0e2b-4778-a9b0-7cb0bb77796b','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66','67d46bdd-4c65-45b2-8106-df50e61ce161','2025-02-05 16:18:11',0);
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
INSERT INTO `accplanoacessos` VALUES ('0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','3A-Colaboradores-5AB-Escrit?rio-1A-Armaz?m',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('14f5febf-487a-4911-877d-07083bba7b42','Sem acessos a Portas',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','3A-Colaboradores-1A-Armaz?m-5A-Refeit?rio',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1e7f5288-6712-442f-b1fc-10fc92ebfa80','3A-Colaboradores-5B-Escrit?rio',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','P - Total as Portas 1-2-3-4-5',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('82059b38-387a-4140-99d3-d5d60dd10ea9','3A-Colaboradores-5B-Escrit?rio-1A-Armaz?m',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','3A-Colaboradores-5B-Escrit?rio-4A-Porta Armaz?m',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('d9893323-9d19-42c8-a6d7-79fae067899b','3A-Colaboradores-5B-Escrit?rio-1A-Armaz?m-2A',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
INSERT INTO `accplanohorarios` VALUES ('2484d80c-3ebc-4c48-8409-43bf7d49859f','Plano Hor?rio 12 Horas',NULL,NULL,NULL,'2025-02-07 10:09:56',NULL),('3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66','Plano Hor?rio 24 Horas',NULL,NULL,NULL,'2025-02-05 16:18:11',NULL);
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
  KEY `IX_AccPlanosAcessoDispositivos_IDPlanoAcesso` (`IDPlanoAcesso`),
  KEY `IX_AccPlanosAcessoDispositivos_IDPlanoHorario` (`IDPlanoHorario`),
  CONSTRAINT `FK_AccPlanosAcessoDispositivos_AccPlanoAcessos_IDPlanoAcesso` FOREIGN KEY (`IDPlanoAcesso`) REFERENCES `accplanoacessos` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_AccPlanosAcessoDispositivos_AccPlanoHorarios_IDPlanoHorario` FOREIGN KEY (`IDPlanoHorario`) REFERENCES `accplanohorarios` (`ID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accplanosacessodispositivos`
--

LOCK TABLES `accplanosacessodispositivos` WRITE;
/*!40000 ALTER TABLE `accplanosacessodispositivos` DISABLE KEYS */;
INSERT INTO `accplanosacessodispositivos` VALUES ('08dd475f-107a-4008-8543-1da9c01547b3','1e7f5288-6712-442f-b1fc-10fc92ebfa80','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd4787-eea6-4927-82f7-62b25b8bdac3','1e7f5288-6712-442f-b1fc-10fc92ebfa80','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd4788-07df-4b51-8bc9-67198364a6fa','82059b38-387a-4140-99d3-d5d60dd10ea9','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-7d27-4dd0-8897-e382af651a59','17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-7d27-4eae-82bd-8d44dfb1663b','17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-7d27-4eba-8e9f-a503f91c9223','17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-8dc4-4755-8fea-5ee57d732f6c','82059b38-387a-4140-99d3-d5d60dd10ea9','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-8dc4-47fa-85ac-14b38e0918e3','82059b38-387a-4140-99d3-d5d60dd10ea9','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4ecd-8a79-e3ae07516247','d9893323-9d19-42c8-a6d7-79fae067899b','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4f6e-85e9-6f51fa9c3814','d9893323-9d19-42c8-a6d7-79fae067899b','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4f7a-8beb-59a2e135d663','d9893323-9d19-42c8-a6d7-79fae067899b','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4f82-8f46-1f594e9343a9','d9893323-9d19-42c8-a6d7-79fae067899b','1ba68a57-92d6-496f-904f-8aa1769f5e51','3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-2789-498a-8f82-49f93210eff8','b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-2789-49de-8c41-4e68f7267cd5','b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','8e1de1a4-1a6a-466b-8467-f0c96d1a663d','404d5fca-22a0-4d54-b6af-23a53b738c56','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-2789-49ea-8d11-b3427ed1b7af','b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654a-4ebb-8521-5aa8a7c6ff97','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654a-4f74-866d-b4430c0c9578','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654b-40f4-8155-69d6b7b8813f','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654b-410e-8a23-f2fcf43d30dc','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6937-4fc1-8ab9-3b219401453a','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','1ba68a57-92d6-496f-904f-8aa1769f5e51','3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-4531-89bc-1be59e956438','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-4579-8b10-9c8b0cd321b6','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8a16e968-771e-4e71-9ea7-5832a4a3f795','890a232c-aa09-4744-9b21-ab94bacd8e9f','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-458c-840a-eb0020d58f05','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8e1de1a4-1a6a-466b-8467-f0c96d1a663d','404d5fca-22a0-4d54-b6af-23a53b738c56','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-459c-86f9-bec73362aaf6','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-45a6-89db-4b016f0ee3b0','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-45b0-8871-ea8892e6c182','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL);
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
INSERT INTO `accreaders` VALUES ('4b0ec824-c0fe-4e49-9779-494f8286b89c','2025-02-18 12:00:09','2025-02-18 12:00:09','Teste-door2-reader1',1,0,NULL,NULL,'58dc6d18-1547-4525-9eb5-09228adf49f3'),('90c0c055-99a1-4345-9a5c-c7b9cad184d7','2025-02-18 12:00:09','2025-02-18 12:00:09','Teste-door3-reader1',1,0,NULL,NULL,'35fa8254-94cd-491a-a5f3-26105f52f84a'),('91d241ed-5038-4b17-a720-f89aef5bd894','2025-02-18 12:00:09','2025-02-18 12:00:09','Teste-door4-reader1',1,0,NULL,NULL,'35dae3a4-af1d-4e03-9420-df4989ac64c6'),('a3c4bd09-86f7-4fa9-842a-ef2488ca6fdf','2025-02-18 12:00:09','2025-02-18 12:00:09','Teste-door1-reader1',1,0,NULL,NULL,'2e25d700-176c-4e8e-919a-abda71e7941d');
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
INSERT INTO `acctimeseg` VALUES ('08dd475f-78a1-4c3b-871e-8e6e6efa80af','2',NULL,NULL,'2025-02-07 10:09:12',NULL,NULL,'nidgroup',NULL,'2025-02-07 10:09:22',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','12:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00',1,'23:59','00:00','00:00','12:00','00:00','00:00','12-Horas',NULL,'23:59','00:00','00:00','12:00','00:00','00:00','23:59','00:00','00:00','12:00','00:00','00:00','23:59','00:00','00:00','12:00','00:00','00:00','23:59','00:00','00:00','12:00','00:00','00:00','23:59','00:00','00:00','12:00','00:00','00:00'),('67d46bdd-4c65-45b2-8106-df50e61ce161','1',NULL,NULL,'2025-02-03 23:52:13',NULL,NULL,NULL,NULL,'2025-02-07 10:09:27',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00',1,'23:59','00:00','00:00','00:00','00:00','00:00','24-Horas',NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00');
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
INSERT INTO `categories` VALUES ('08dd49b2-a490-4a66-8a70-f1caa3c5f551',1,NULL,'Categoria Geral');
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
INSERT INTO `configurations` VALUES ('configSoftware','lisenceKey','ewFSI7u1plizO6Ya+FeYCZ93btPfghOVvEfYt+nJWDcY89gTTH0ZTMv7bPKLXJwK0i9+5/iIpagXR4y+yz37elU7H+4Fxaj4db2Obey1BsPjV1zVzj3K0Az5jB//uwcPzA9Hm72Wi8F6s9tO0eKre9+t/Aj4QSod4l1WMIIjkJwG4o+hzjZRj/bU3O/mAigPUVLbtRmJysPckSU6vDSo1E7zwf3WF0yp4PINTfakLjDZKPjveNby1U2PhTV356/+lNPRhEDgu78D+hqq18pCYtB5eOGmIvBsuZgssuvSp0lI/YHUAOokem6NQ/RfRAkB6MwY89z3RaMTC0e+RO3lVHj52vbkJbbqzAB+XskRvZTQ1fZPEPRNNBf/wfwSHMjzmUh75YfIzclXlBfDsGudaX4VBZ1yvp+cZhF/ioB6SqDJrXC087EeoKOlg+kSut1UhdT6w+Ulz6XkaokwnePcvw6WRtFCarMeGXXc9UStUMcv47tAYbuhDwR8aYbclB/sN9h8hlAUZ0jtyRqJcoOdxGiYwRGSxsr0tiYxgh6lYjHSvgnP1j8WG6ex7icFhlKrnf3cLHs2xb020G+qWjAf3gzWHQBAHQXCdgHKKiLSRXbS80sFdbPqXQIwo9WTUaTVUcKrfiOmI14U48hV9dGF8KREwIAuNT3hVZko44UppcXiKSaAmZOiqthXqkvzFFqF'),('configSoftware','setupDate','GhaUzhkyRDLLMQJt0O+uOt/wSZ1vz9oJivjVgGbUZVs=');
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
INSERT INTO `departments` VALUES ('0d082151-01ee-4a36-b724-b32409423c58',9,'Administração',NULL,NULL),('1898c316-8878-4859-ae99-c13626c47590',7,'Administrativo',NULL,NULL),('32c91216-2130-418a-bd6c-02cea8d80442',8,'Secretariado Comércio',NULL,NULL),('8cd4d7a1-155d-4256-b372-12414875cf77',5,'Compras',NULL,NULL),('9f81f7cc-eed4-4758-b7ee-e8715c25d311',1,'Comercial',NULL,NULL),('ac96b1d0-825b-4e92-b15c-6dac758c7478',2,'Financeiro',NULL,NULL),('b444c276-5506-4c7d-8c26-edc3db688d39',4,'Armazém',NULL,NULL),('d424a9cb-73b9-445f-98dc-07dc0650548d',10,'Direcção Técnica',NULL,NULL),('d4ef0534-91b5-4b67-8200-80a79b66ff16',6,'Marketing',NULL,NULL),('e31e5044-4015-44f5-9f98-a613a6bc6333',3,'Call Center',NULL,NULL);
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
INSERT INTO `devices` VALUES ('958bd09d-c5b9-4291-83d1-1d0404004ae1',1,'Teste','SISNID-INBIO460','192.168.1.202',9999,NULL,0,NULL,'AC Ver 5.7.8.3033 Aug 14 2023','00:17:61:20:04:61','GQS2235000391',NULL,NULL,4,4,4,600,10,200,10,NULL,NULL,4,NULL,'FB1E','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,1,1,'2025-02-18 15:23:09.648716','2025-02-18 12:00:07.433430',NULL);
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
INSERT INTO `employeeattendancetimes` VALUES ('08dd4c21-499a-4f06-887b-c1eeffc4facf','e40bf054-eb90-45c3-a253-2df8b4b2c268',1,'fb73a1d6-d3b9-4664-9ee0-b6a258b43516','39','Marta Susana Alves Monteiro',NULL,0,NULL,2,NULL,'2025-02-13 11:26:00'),('08dd4c21-4d71-4f3b-835f-eb1305598e32','1ba68a57-92d6-496f-904f-8aa1769f5e51',2,'84cd6a90-d130-4d7d-af5c-08269a970b50','44','Florinda Maria dos Santos Miguel',NULL,0,NULL,2,NULL,'2025-02-13 11:26:00'),('08dd4c21-5139-4ee4-8bf1-682c88973200','8a16e968-771e-4e71-9ea7-5832a4a3f795',3,'65ad7e02-f740-4c38-9107-6f9cda82423f','95','Leila Patr?cia Pereira Marques',NULL,0,NULL,2,NULL,'2025-02-13 11:26:00'),('08dd4c21-54cc-40ce-8592-50f8744ed84e','8e1de1a4-1a6a-466b-8467-f0c96d1a663d',4,'ed562809-5251-40af-b434-d1893acfc733','96','Jo?o Pedro Candeias Domingues',NULL,0,NULL,2,NULL,'2025-02-13 11:26:00'),('08dd4c21-57f0-4027-8613-300728070ece','8f234599-b0b8-4148-9d53-89f7e2aed79f',5,'2c0c95ea-09f7-4621-8d86-a6c4aa5f69db','101','F?bio Andr? Louro Catarrinho',NULL,0,NULL,2,NULL,'2025-02-13 11:27:00'),('08dd4f63-f7b9-4681-807a-93bb4342758d','8a16e968-771e-4e71-9ea7-5832a4a3f795',3,'071ca3f7-45be-4cc1-b02b-b5d6f48d669a','179','Bruno Jos? Sim?es Braga',NULL,0,NULL,2,NULL,'2025-02-17 15:01:00');
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
  CONSTRAINT `FK_Employees_Zones_ZoneId` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`ZoneID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('0128f6ab-b7e1-4be8-afde-f0166e8b261f','306','Visitante 306','Visitante 306',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('01b72632-c095-45e9-95ad-a05a1df478b4','196','Telma Vanessa Prazeres Gomes','Telma Gomes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('02f86dad-621d-4efe-93e3-b2cc211498ea','189','Daniel Gaspar Grego de Almeida','Daniel Almeida',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('0407f36b-4ed8-4444-b1a7-bb3afd79bd44','125','Cl?udia Patr?cia Fernandes Lopes','Cl?udia Lopes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('071ca3f7-45be-4cc1-b02b-b5d6f48d669a','179','Bruno Jos? Sim?es Braga','Bruno Braga',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('0bec8de5-f552-48ea-a4bb-8eb122e438ca','308','Visitante 308','Visitante 308',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('0d7daffb-26a3-4a14-a67f-1da3299e1dcb','56','Carlos Manuel Henriques da Cruz','Carlos Cruz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('1112c62b-78cb-4219-8783-553e743d5f09','128','Valter Jorge Alves Mendes','Valter Mendes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('1c7894b8-94eb-4062-a426-cd6d4864187c','200','B?rbara Neves Mateus Caldas Marques','B?rbara Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('1d0a0fd7-9d50-4383-9081-5c714f507bc9','47','Lu?s Alberto Alves Pereira Antunes','Lu?s Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('20216b3f-e9f9-4348-85cc-66775521e6c9','215','Jos? Lu?s Leal da Silva Vaz','Jos? Vaz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('214dd0b0-6411-440d-9129-36cd3970760d','167','Alex Pereira da Silva','Alex Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('224f3eac-3336-47cc-aea8-fb1abc0653c7','91','Tiago Alexandre Pires Guerreiro','Tiago Guerreiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('2813619f-b2ca-4f99-a220-3226059f44d8','57','Ana Sofia Fernandes Guimar?es','Ana Guimar?es',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('285b207b-e872-434b-b821-6339d89176b1','172','Bruno Ant?nio Calvo Gon?alves','Bruno Gon?alves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('2c0c95ea-09f7-4621-8d86-a6c4aa5f69db','101','F?bio Andr? Louro Catarrinho','F?bio Catarrinho',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'0ad4eac2-f566-41e2-8bc7-2c9bd67397c4'),('2cca718d-6c42-4869-af33-03ad1f0254e8','222','Funcion?rio 222','Funcion?rio 222',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('2f9073d5-26bf-4aec-aff5-b8a5e56ee291','224','Funcion?rio 224','Funcion?rio 224',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('3304f9ca-4e6e-4a95-aa59-8d57a463b16d','157','Isabel Cristina Correia do Nascimento','Isabel Nascimento',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('3b78f488-b1bf-4894-bebc-d43dc72d8bbe','8','Eduarda Cristina Alc?bia Ferreira','Eduarda Ferreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('3e4c36bf-4041-4042-9b53-4e003933bfc1','218','Funcion?rio 218','Funcion?rio 218',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('3f5b66bb-5f7c-4448-b685-ed87ad8f696f','136','Filipe Chapman Garrido','Filipe Garrido',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('41fa1353-6a17-4baf-a8a9-83715d74f067','221','Funcion?rio 221','Funcion?rio 221',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('4695f9b0-4da0-4007-b6ac-262f21c326fc','159','Fernando Silva das Dores','Fernando Dores',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('527c636b-408f-4b5c-8350-5b43b9666f5f','124','Ant?nio Manuel Almeida Pereira','Ant?nio Pereira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('52cb29ff-7627-48cd-a0d7-e154b2ad3343','85','Iulian Gheorghi?a Acatrinei','Iulian Acatrinei',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('543386f1-8f17-422c-8739-4b2ce50ff46e','83','Ana Lisa Gomes Pereira Real Baptista','Ana Baptista',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('5b9efd20-3db0-49a5-af27-8348ff65e6e3','9','Paulo Jos? dos Santos Mota','Paulo Mota',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('5f765ec6-7745-4869-9860-31a19125e8ba','198','Jo?o V?tor Cortega?a ?vora Filipe','Jo?o Filipe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('65ad7e02-f740-4c38-9107-6f9cda82423f','95','Leila Patr?cia Pereira Marques','Leila Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('662491ff-9e9f-4d68-9d8f-73ea1ffd8a4b','205','Ver?nica Sofia Gon?alves Monteiro','Ver?nica Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('66ef829f-18dd-4f5e-b1ed-8ada4f65dcf8','141','Sofia Pacheco Medeiros de Mesquita Gabriel','Sofia Gabriel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('68d11e69-45d0-4684-8cff-41af2bbc7f5f','305','Visitante 305','Visitante 305',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('6979f0d3-8a60-4fd7-bb90-6461b12e3123','209','Francisco Maria L?bano Monteiro Rocha e Melo','Francisco Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('6c51a92d-5522-4420-943c-281aca83fdca','164','Alexandra Carvalho Paredes Gon?alves','Alexandra Gon?alves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('6d1b6063-a61b-4c6a-b36c-9819ed656690','86','Carla Alexandra Nunes Dias','Carla Dias',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a'),('6f5f9b32-1d39-4b37-bb42-77df8476f101','129','Ana Rita Alexandre Branco','Ana Branco',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('6f73905c-cd11-4501-816e-2d2534d01ada','310','Visitante 310','Visitante 310',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('795b8238-de95-413d-8290-a954cd522dc4','208','Diana Filipa dos Reis Cancela','Diana Cancela',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('7a22687d-478d-4c5f-b351-64b5e6697f33','219','Funcion?rio 219','Funcion?rio 219',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('7eeb8dc1-5f50-44a6-b370-7abb184809ab','181','Jaime Maria Rodrigues Silva','Jaime Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('7f8939e1-a11f-44a1-80e4-09b59e0b41b2','214','Carla Alexandra Almeida Ribeiro','Carla Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('8152be82-5761-4dc6-a598-f24da9f18b57','133','B?rbara Filipa Cunha Sampaio','B?rbara Sampaio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('81c1baa9-aab3-4592-ac34-70599cb63170','192','Diana Isabel dos Santos Oliveira','Diana Oliveira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('84cd6a90-d130-4d7d-af5c-08269a970b50','44','Florinda Maria dos Santos Miguel','Florinda Miguel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('8508ff80-f264-4530-bf0d-5b45f3b3664f','5','Daniel Nuno Soares da Silva','Daniel Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('8d7c4a37-05fe-4846-9efc-4e31245f93b3','206','Diogo Alexandre Vasconcelos Brito','Diogo Brito',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('8e5a276e-c6ac-45ff-ae35-b07539ec6004','223','Funcion?rio 223','Funcion?rio 223',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('932ce6c2-50f8-4502-9bac-d0bfb8b7104b','112','Rute de Jesus Fele Cunha','Rute Cunha',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('9c6bc53b-6ad4-427b-b931-dc5bc2413aa9','303','Visitante 303','Visitante 303',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('9f3a4f34-82da-411c-b0a5-a553239fa95c','30','Nelson Carlos Zacarias Rego','Nelson Rego',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcion?rio','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('9f6c5e4e-0406-494d-a549-6fb91a4c4403','38','M?rio Jorge Marques Gomes Marto','M?rio Marto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('a3532009-4e85-4cb1-858e-53e8c9a4380e','65','In?s Filipa Marques Anacleto','In?s Anacleto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('a4e7eb37-b919-4413-993a-4d3d307e0160','32','Ant?nio Joaquim Pedroso B. Cachola','Ant?nio Cachola',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcion?rio','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('a6a5873f-87d7-49e6-a263-1d97a49c041d','27','Patrique Domingos de Sousa','Patrique Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcion?rio','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('a932fb8e-8b6a-4b4f-a3f7-085850868840','123','Raquel Maria Viegas Rocha Santos','Raquel Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('aad7a203-0d7b-4321-bda0-3daaf033f23a','20','Fl?vio Pedro Martinho Diniz','Fl?vio Diniz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcion?rio','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('ac39f8d4-9951-48a3-b6a6-9caccfd2a28e','307','Visitante 307','Visitante 307',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('ae99efa4-a571-4703-b377-300ee47b0741','187','Valentim Silva Melnychuck','Valentim Melnychuck',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('af2f6cbe-e87e-4150-bc35-2ea40887eb96','152','Sara da Concei??o Soares Amorim Correia','Sara Correia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('afabe1eb-dfe8-40e0-9f35-163ecf8296ec','194','Ana Cristina de Albuquerque Matias Santos','Ana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('b0103a18-0ddf-4c7f-b996-0ece6ca7e409','191','Suse Paula Tom?s Pires','Suse Pires',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('b5348dd8-782e-4d4d-9d19-a888f06b8a6b','117','Rita Helena Tavares dos Santos','Rita Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('b9d369ca-ea2e-434b-9ebd-976ff2b0d489','309','Visitante 309','Visitante 309',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('bb320b74-cb43-4ab7-86d9-7d7e8d095e69','107','Francisco Emanuel P. P. Gomes Ribeiro','Francisco Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('bbcbf4fc-35de-4f18-9f82-a79804ddb7b9','160','Valter Miguel Serra dos Santos','Valter Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('bdb27906-e6c7-4542-b9a8-f8943c37c162','217','Liliana dos Santos','Liliana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('bf213fbf-c9df-453f-a07e-feebfcaea19a','12','C?lia Maria Silvestre Silva L?cio','C?lia L?cio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('c01c57e6-4e1e-43cb-be37-05fe075d0d3a','55','Ana Maria da Cruz Silva Pinto','Ana Pinto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'d9893323-9d19-42c8-a6d7-79fae067899b'),('c17d2a93-62f1-4585-85b9-979c864fd229','188','Soraia Filipa Ferreira Gil','Soraia Gil',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('c25506aa-a27e-4f10-8c7e-da4af6648ae5','66','Joana Brito Ramos Azevedo','Joana Azevedo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('c29e90fb-2bfd-4fd5-bad1-3fedc6c58263','302','Visitante 302','Visitante 302',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('c56f51d4-0d96-4d97-bf84-4bfd9b02d933','186','Sidney de Oliveira Cassim','Sidney Cassim',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('c5e5317d-71c0-4461-967c-116ec85ce278','301','Visitante 301','Visitante 301',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('c908e2a6-3f2a-4b8f-98c0-893585a32304','162','Paula Dalina Nitas','Paula Nitas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('cdd47f3b-f961-4e47-b478-8603d1542baa','79','Daniel Alexandre Mata Dupont de Sousa','Daniel Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('d294d1d2-4882-4766-a530-699de6a176c4','195','Miguel Jo?o Luz Costa','Miguel Costa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('d41e9152-da79-40de-8f47-367d92cd2993','144','Pedro Vargas Madeira Palma Amaro','Pedro Amaro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('d861ec19-b8c0-444b-9890-1a6d8862c4a4','145','C?ntia Vanessa Sombreireiro Rom?o','C?ntia Rom?o',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('d8a23b9b-694d-4b09-9c88-97b936a71883','51','Paula Cristina Tavares Ribeiro Miranda','Paula Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('dcfcf3fb-7342-485c-bb77-a40cff2a15ad','183','Andreia Filipa Rom?o Mendon?a','Andreia Mendon?a',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('dda334a9-04f0-4499-ae0b-67a1ad40fe4f','103','Jo?o Pedro Mendes Miranda','Jo?o Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ddd35241-5c5a-4cae-a7b0-de16097bbb05','104','Ricardo Alves Moreira','Ricardo Moreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('de369ea2-8045-4b2c-80e0-6ef254bbc17f','199','Joana Filipa Figueiredo dos Santos','Joana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ded4510c-90c2-48bb-8d94-2a10a14f8ed8','153','Pedro Miguel Garcias Miranda','Pedro Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'d9893323-9d19-42c8-a6d7-79fae067899b'),('deeaf6b0-4eb3-4d29-8e7c-cb4c539276ea','213','Sara dos Santos Loureiro','Sara Loureiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('ed4893ef-5120-4d9f-8f68-b402ba8d40e0','93','Marisa Isabel Contente da Silva','Marisa Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ed4a22a1-ad67-495c-a2cb-441f07743a1e','202','Tom?s Forte da Palma Antunes','Tom?s Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ed562809-5251-40af-b434-d1893acfc733','96','Jo?o Pedro Candeias Domingues','Jo?o Domingues',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('ee507f84-5535-4a03-ab39-dd2b0e4f37d7','132','Miguel Afonso Paulista Verga Caninhas','Miguel Caninhas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('ef044621-1047-4b41-acd2-b4c3cb5da3ef','165','Thiago Lu?s de Melo','Thiago Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('efdc2e5f-1386-44f9-977a-8a58a0cced04','151','Ana Teresa de Sim?es Gra?a e Almeida Marques','Ana Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('f169c7ca-d987-4c00-a930-d2e0ab1907b4','203','Alexandra Ribeiro Rijo','Alexandra Rijo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('f209bed8-ebe6-484f-ba9d-8fcacf794937','304','Visitante 304','Visitante 304',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('f7816e55-951d-4f1c-bd2b-69dba2bbbea7','24','No?mia Maria Reis Porf?rio','No?mia Porf?rio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcion?rio','f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('f82a148b-7e20-47f3-9c0e-4ada1193515b','216','Maria In?s Pereira Duarte','Maria Duarte',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('f8d32f8d-0d4e-48f7-a1b2-9b41b40b8b85','131','Bruno Miguel Ara?jo de Sousa','Bruno Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('fb73a1d6-d3b9-4664-9ee0-b6a258b43516','39','Marta Susana Alves Monteiro','Marta Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('fd16978d-1786-47a5-b61b-f5e0e533eac0','220','Funcion?rio 220','Funcion?rio 220',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('fe88d39d-8802-4aad-a9ac-fc6c35d77802','36','Helena C. Pereira Tom?s N. Esperto','Helena Esperto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556',NULL,NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42');
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
INSERT INTO `employeescards` VALUES ('08dd46bc-9178-4afd-8b7f-b8a9d903c59f','8508ff80-f264-4530-bf0d-5b45f3b3664f',NULL,NULL,1,'9124357'),('08dd46bc-9178-4b4c-8c3f-e5b4a436d386','3b78f488-b1bf-4894-bebc-d43dc72d8bbe',NULL,NULL,1,'9124358'),('08dd46bc-9178-4b51-81c6-63e998bad16f','5b9efd20-3db0-49a5-af27-8348ff65e6e3',NULL,NULL,1,'10832577'),('08dd46bc-9178-4b54-84cb-077e8408169c','bf213fbf-c9df-453f-a07e-feebfcaea19a',NULL,NULL,1,'9124359'),('08dd46bc-9178-4b57-8c5a-f41499804570','aad7a203-0d7b-4321-bda0-3daaf033f23a',NULL,NULL,1,'9124360'),('08dd46bc-9178-4b5a-8cda-ee143d78a6d5','f7816e55-951d-4f1c-bd2b-69dba2bbbea7',NULL,NULL,1,'9124361'),('08dd46bc-9178-4b5d-8efb-67cc4e26be57','a6a5873f-87d7-49e6-a263-1d97a49c041d',NULL,NULL,1,'10920487'),('08dd46bc-9178-4b61-80aa-cfc933ec0f39','9f3a4f34-82da-411c-b0a5-a553239fa95c',NULL,NULL,1,'9127895'),('08dd46bc-9178-4b68-89c4-ef3bb3c246a9','a4e7eb37-b919-4413-993a-4d3d307e0160',NULL,NULL,1,'9127894'),('08dd46bc-9178-4b6b-8e2a-446debf5f3fd','fe88d39d-8802-4aad-a9ac-fc6c35d77802',NULL,NULL,1,'10920174'),('08dd46bc-9178-4b6e-8dee-52cb13ade80e','9f6c5e4e-0406-494d-a549-6fb91a4c4403',NULL,NULL,NULL,'10960269'),('08dd46bc-9178-4b71-8ec5-a13551c19fbc','fb73a1d6-d3b9-4664-9ee0-b6a258b43516',NULL,NULL,NULL,'10803847'),('08dd46bc-9178-4b74-8c49-39a1c0478ca8','84cd6a90-d130-4d7d-af5c-08269a970b50',NULL,NULL,NULL,'10804118'),('08dd46bc-9178-4b78-81a5-2c7d72b6ce00','1d0a0fd7-9d50-4383-9081-5c714f507bc9',NULL,NULL,NULL,'10804390'),('08dd46bc-9178-4b7b-84be-4bf7aaf59410','d8a23b9b-694d-4b09-9c88-97b936a71883',NULL,NULL,NULL,'10804663'),('08dd46bc-9178-4b7e-8798-9fdc7a330f0f','c01c57e6-4e1e-43cb-be37-05fe075d0d3a',NULL,NULL,NULL,'10804937'),('08dd46bc-9178-4b81-85fc-b6e11fdcf5c7','0d7daffb-26a3-4a14-a67f-1da3299e1dcb',NULL,NULL,NULL,'10805211'),('08dd46bc-9178-4b84-8572-d0fea0230d2a','2813619f-b2ca-4f99-a220-3226059f44d8',NULL,NULL,NULL,'10959862'),('08dd46bc-9178-4b88-8a23-8cf775ec1367','a3532009-4e85-4cb1-858e-53e8c9a4380e',NULL,NULL,NULL,'10959672'),('08dd46bc-9178-4b8b-8aa2-073004a6c0a0','c25506aa-a27e-4f10-8c7e-da4af6648ae5',NULL,NULL,NULL,'10959292'),('08dd46bc-9178-4b8e-8ac7-746aeea059ee','cdd47f3b-f961-4e47-b478-8603d1542baa',NULL,NULL,NULL,'10959078'),('08dd46bc-9178-4b91-8bae-4f34e0b646b5','543386f1-8f17-422c-8739-4b2ce50ff46e',NULL,NULL,NULL,'10958862'),('08dd46bc-9178-4b94-8c6f-3e3ca88ef089','52cb29ff-7627-48cd-a0d7-e154b2ad3343',NULL,NULL,NULL,'10958645'),('08dd46bc-9178-4b97-8d1a-fe93c43e8513','6d1b6063-a61b-4c6a-b36c-9819ed656690',NULL,NULL,NULL,'10958427'),('08dd46bc-9178-4b9a-8e27-ef8bb653eb45','224f3eac-3336-47cc-aea8-fb1abc0653c7',NULL,NULL,NULL,'10958207'),('08dd46bc-9178-4b9d-8e77-912ac52ae86a','ed4893ef-5120-4d9f-8f68-b402ba8d40e0',NULL,NULL,NULL,'10892518'),('08dd46bc-9178-4ba4-8675-eae943bd9067','65ad7e02-f740-4c38-9107-6f9cda82423f',NULL,NULL,NULL,'10892253'),('08dd46bc-9178-4ba7-8813-2ad42c7dfe63','ed562809-5251-40af-b434-d1893acfc733',NULL,NULL,NULL,'10891989'),('08dd46bc-9178-4baa-8a19-557874864a7f','2c0c95ea-09f7-4621-8d86-a6c4aa5f69db',NULL,NULL,NULL,'10891726'),('08dd46bc-9178-4bad-8b29-d4220f9eff75','dda334a9-04f0-4499-ae0b-67a1ad40fe4f',NULL,NULL,NULL,'10957308'),('08dd46bc-9178-4bb0-8e2c-840b08213f1e','ddd35241-5c5a-4cae-a7b0-de16097bbb05',NULL,NULL,NULL,'10957535'),('08dd46bc-9178-4bb4-803f-7b887ea84c8c','bb320b74-cb43-4ab7-86d9-7d7e8d095e69',NULL,NULL,NULL,'10957761'),('08dd46bc-9178-4bb7-8029-aac91a025afa','932ce6c2-50f8-4502-9bac-d0bfb8b7104b',NULL,NULL,NULL,'10957985'),('08dd46bc-9178-4bba-8159-45cdceb12bb0','b5348dd8-782e-4d4d-9d19-a888f06b8a6b',NULL,NULL,NULL,'10894674'),('08dd46bc-9178-4bbd-81c3-4d9cc3d4002f','a932fb8e-8b6a-4b4f-a3f7-085850868840',NULL,NULL,NULL,'10894401'),('08dd46bc-9178-4bc0-822b-511468005809','527c636b-408f-4b5c-8350-5b43b9666f5f',NULL,NULL,NULL,'10894129'),('08dd46bc-9178-4bc3-8340-943c5fedf326','0407f36b-4ed8-4444-b1a7-bb3afd79bd44',NULL,NULL,NULL,'10893858'),('08dd46bc-9178-4bc7-8396-47e28adebf58','1112c62b-78cb-4219-8783-553e743d5f09',NULL,NULL,NULL,'10893588'),('08dd46bc-9178-4bca-840a-cb8ccd26e74e','6f5f9b32-1d39-4b37-bb42-77df8476f101',NULL,NULL,NULL,'10893319'),('08dd46bc-9178-4bcd-8360-d71cf5fd74f3','f8d32f8d-0d4e-48f7-a1b2-9b41b40b8b85',NULL,NULL,NULL,'10893051'),('08dd46bc-9178-4bd0-829b-ee2cf6346576','ee507f84-5535-4a03-ab39-dd2b0e4f37d7',NULL,NULL,NULL,'10892784'),('08dd46bc-9178-4bd3-818f-96e11c4905ea','8152be82-5761-4dc6-a598-f24da9f18b57',NULL,NULL,NULL,'10894948'),('08dd46bc-9178-4bd5-8fec-fb5373ba630d','3f5b66bb-5f7c-4448-b685-ed87ad8f696f',NULL,NULL,NULL,'10804661'),('08dd46bc-9178-4bd9-8f32-deb3b3bd3bca','66ef829f-18dd-4f5e-b1ed-8ada4f65dcf8',NULL,NULL,NULL,'10804935'),('08dd46bc-9178-4bdd-837e-79496e0b3681','d41e9152-da79-40de-8f47-367d92cd2993',NULL,NULL,NULL,'10919861'),('08dd46bc-9178-4be0-8204-dc86e9d656ed','d861ec19-b8c0-444b-9890-1a6d8862c4a4',NULL,NULL,NULL,'10805209'),('08dd46bc-9178-4be3-81e6-866c98c54765','efdc2e5f-1386-44f9-977a-8a58a0cced04',NULL,NULL,NULL,'10815469'),('08dd46bc-9178-4be6-8172-77e17d2733f5','af2f6cbe-e87e-4150-bc35-2ea40887eb96',NULL,NULL,NULL,'10815169'),('08dd46bc-9178-4be9-8195-b5e875fce8ff','ded4510c-90c2-48bb-8d94-2a10a14f8ed8',NULL,NULL,NULL,'10814870'),('08dd46bc-9178-4bec-807a-e51a1e933965','3304f9ca-4e6e-4a95-aa59-8d57a463b16d',NULL,NULL,NULL,'10814571'),('08dd46bc-9178-4bef-8065-71bf64e3d029','4695f9b0-4da0-4007-b6ac-262f21c326fc',NULL,NULL,NULL,'10812199'),('08dd46bc-9178-4bf1-8f09-6778f5aa4710','bbcbf4fc-35de-4f18-9f82-a79804ddb7b9',NULL,NULL,NULL,'10812494'),('08dd46bc-9178-4bf5-82c8-5108efdd92eb','c908e2a6-3f2a-4b8f-98c0-893585a32304',NULL,NULL,NULL,'10812789'),('08dd46bc-9178-4bf9-8885-3c74d19737a8','6c51a92d-5522-4420-943c-281aca83fdca',NULL,NULL,NULL,'10813084'),('08dd46bc-9178-4bfc-88e0-fa0e8af04a34','ef044621-1047-4b41-acd2-b4c3cb5da3ef',NULL,NULL,NULL,'10813380'),('08dd46bc-9178-4bff-88f6-359b117122ef','214dd0b0-6411-440d-9129-36cd3970760d',NULL,NULL,NULL,'10800146'),('08dd46bc-9178-4c02-879c-f8ae4c6c9c6f','285b207b-e872-434b-b821-6339d89176b1',NULL,NULL,NULL,'10800402'),('08dd46bc-9178-4c05-8531-67ed7524b2b2','071ca3f7-45be-4cc1-b02b-b5d6f48d669a',NULL,NULL,NULL,'10800660'),('08dd46bc-9178-4c08-8487-17f7a2cf7022','7eeb8dc1-5f50-44a6-b370-7abb184809ab',NULL,NULL,NULL,'10800919'),('08dd46bc-9178-4c0b-839a-78a6fafa77fd','dcfcf3fb-7342-485c-bb77-a40cff2a15ad',NULL,NULL,NULL,'10801179'),('08dd46bc-9178-4c0e-86a8-285e5247a43c','c56f51d4-0d96-4d97-bf84-4bfd9b02d933',NULL,NULL,NULL,'10801440'),('08dd46bc-9178-4c11-86aa-d33aaeaef2b0','ae99efa4-a571-4703-b377-300ee47b0741',NULL,NULL,NULL,'10801702'),('08dd46bc-9178-4c14-8647-fd69fbbc2df9','c17d2a93-62f1-4585-85b9-979c864fd229',NULL,NULL,NULL,'10801965'),('08dd46bc-9178-4c17-86c7-3debd8fc62b2','02f86dad-621d-4efe-93e3-b2cc211498ea',NULL,NULL,NULL,'10799891'),('08dd46bc-9178-4c1b-87f7-399d67e76ecb','b0103a18-0ddf-4c7f-b996-0ece6ca7e409',NULL,NULL,NULL,'10799384'),('08dd46bc-9178-4c1e-8607-437493ea169d','81c1baa9-aab3-4592-ac34-70599cb63170',NULL,NULL,NULL,'10799132'),('08dd46bc-9178-4c21-8536-def3515b49e6','afabe1eb-dfe8-40e0-9f35-163ecf8296ec',NULL,NULL,NULL,'10798882'),('08dd46bc-9178-4c24-8537-a66c110fbfd1','d294d1d2-4882-4766-a530-699de6a176c4',NULL,NULL,NULL,'10798633'),('08dd46bc-9178-4c27-8957-3685a4c41558','01b72632-c095-45e9-95ad-a05a1df478b4',NULL,NULL,NULL,'10799637'),('08dd46bc-9178-4c2a-8974-1915903291c5','5f765ec6-7745-4869-9860-31a19125e8ba',NULL,NULL,NULL,'10809565'),('08dd46bc-9178-4c2d-8690-380e0ad1d6b7','de369ea2-8045-4b2c-80e0-6ef254bbc17f',NULL,NULL,NULL,'10809323'),('08dd46bc-9178-4c30-894c-18610a3a3a46','1c7894b8-94eb-4062-a426-cd6d4864187c',NULL,NULL,NULL,'10807101'),('08dd46bc-9178-4c33-89b5-0c8b5e90cbd4','ed4a22a1-ad67-495c-a2cb-441f07743a1e',NULL,NULL,NULL,'10807379'),('08dd46bc-9178-4c36-888a-93e8d28a3a0f','f169c7ca-d987-4c00-a930-d2e0ab1907b4',NULL,NULL,NULL,'10807657'),('08dd46bc-9178-4c3d-86ce-20a1901c2484','662491ff-9e9f-4d68-9d8f-73ea1ffd8a4b',NULL,NULL,NULL,'10808214'),('08dd46bc-9178-4c40-888d-b780cb3cd9cb','8d7c4a37-05fe-4846-9efc-4e31245f93b3',NULL,NULL,NULL,'10808493'),('08dd46bc-9178-4c43-8978-f48120c2740b','795b8238-de95-413d-8290-a954cd522dc4',NULL,NULL,NULL,'10808773'),('08dd46bc-9178-4c46-8866-2a2cb02ae062','6979f0d3-8a60-4fd7-bb90-6461b12e3123',NULL,NULL,NULL,'10809053'),('08dd46bc-9178-4c49-880f-18c2303eb418','deeaf6b0-4eb3-4d29-8e7c-cb4c539276ea',NULL,NULL,NULL,'10831639'),('08dd46bc-9178-4c4c-887e-1a1ededc0ce2','7f8939e1-a11f-44a1-80e4-09b59e0b41b2',NULL,NULL,NULL,'10831952'),('08dd46bc-9178-4c4f-8822-aa3650b78112','20216b3f-e9f9-4348-85cc-66775521e6c9',NULL,NULL,NULL,'10832265'),('08dd46bc-9178-4c52-8b7b-bbf6e8d3512e','f82a148b-7e20-47f3-9c0e-4ada1193515b',NULL,NULL,NULL,'10919548'),('08dd46bc-9178-4c55-8a32-ec6661239cdd','bdb27906-e6c7-4542-b9a8-f8943c37c162',NULL,NULL,NULL,'10831326'),('08dd46bc-9178-4c58-8aad-4a017902ecbd','3e4c36bf-4041-4042-9b53-4e003933bfc1',NULL,NULL,NULL,'10831013'),('08dd46bc-9178-4c5c-8f96-49be5c58c26e','7a22687d-478d-4c5f-b351-64b5e6697f33',NULL,NULL,NULL,'10830387'),('08dd46bc-9178-4c60-806c-cecf0d2665d1','fd16978d-1786-47a5-b61b-f5e0e533eac0',NULL,NULL,NULL,'10830074'),('08dd46bc-9178-4c62-8e4a-51c4bb9e2d6f','41fa1353-6a17-4baf-a8a9-83715d74f067',NULL,NULL,NULL,'10829761'),('08dd46bc-9178-4c65-8c49-8dfe3d740f46','2cca718d-6c42-4869-af33-03ad1f0254e8',NULL,NULL,NULL,'10919850'),('08dd46bc-9178-4c68-8b06-4883f661cbd9','8e5a276e-c6ac-45ff-ae35-b07539ec6004',NULL,NULL,NULL,'10920163'),('08dd46bc-9178-4c6b-8bcf-e813e5da7cb8','2f9073d5-26bf-4aec-aff5-b8a5e56ee291',NULL,NULL,NULL,'10917663'),('08dd46bc-9178-4c74-85d8-2447be419869','c5e5317d-71c0-4461-967c-116ec85ce278',NULL,NULL,NULL,'10917352'),('08dd46bc-9178-4c77-83d7-6d329bb082e2','c29e90fb-2bfd-4fd5-bad1-3fedc6c58263',NULL,NULL,NULL,'10857627'),('08dd46bc-9178-4c7a-859d-ec2e7dc5308e','9c6bc53b-6ad4-427b-b931-dc5bc2413aa9',NULL,NULL,NULL,'10857901'),('08dd46bc-9178-4c7d-8467-ed4bd6ae0ea0','f209bed8-ebe6-484f-ba9d-8fcacf794937',NULL,NULL,NULL,'10856791'),('08dd46bc-9178-4c80-837b-f88b1f6ba156','68d11e69-45d0-4684-8cff-41af2bbc7f5f',NULL,NULL,NULL,'10846175'),('08dd46bc-9178-4c83-8215-de18f20701d9','0128f6ab-b7e1-4be8-afde-f0166e8b261f',NULL,NULL,NULL,'10921938'),('08dd46bc-9178-4c89-8b6c-abfe0b061662','ac39f8d4-9951-48a3-b6a6-9caccfd2a28e',NULL,NULL,NULL,'10921625'),('08dd46bc-9178-4c8c-8c58-4ff10e2ffdcf','0bec8de5-f552-48ea-a4bb-8eb122e438ca',NULL,NULL,NULL,'10814272'),('08dd46bc-9178-4c91-8896-8a11195b9750','b9d369ca-ea2e-434b-9ebd-976ff2b0d489',NULL,NULL,NULL,'10813974'),('08dd46bc-9178-4c94-86db-d756ed0ac451','6f73905c-cd11-4501-816e-2d2534d01ada',NULL,NULL,NULL,'10813677');
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
INSERT INTO `entidades` VALUES ('f96d6b10-32f4-45f2-b104-6ad6e3daf556','Bio 2 - Representa??es e Com?rcio de Produtos Agro-Pecu?rios, S.A.',1,'Polo Industrial de Brejos de Carreteiros, Fase 2, Armaz?m A e B','2950-554','Quinta do Anjo',NULL,'911777384','leila.marques@bio2.pt',501488243,'www.bio2.pt',NULL,'Uploads/Profiles/cbaf675b-e175-46b9-9c62-166b47e69baa_images.png','2025-01-21 16:45:22','2025-01-22 13:57:23',1);
/*!40000 ALTER TABLE `entidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventdevices`
--

DROP TABLE IF EXISTS `eventdevices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventdevices` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `Pin` int(11) DEFAULT NULL,
  `CardNo` int(11) DEFAULT NULL,
  `EventDoorId` int(11) DEFAULT NULL,
  `EventName` varchar(50) DEFAULT NULL,
  `EventId` int(11) DEFAULT NULL,
  `InOutStatus` int(11) DEFAULT NULL,
  `VerifyModeNo` int(11) DEFAULT NULL,
  `EventIndex` int(11) DEFAULT NULL,
  `DeviceSN` varchar(45) DEFAULT NULL,
  `EventTime` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventdevices`
--

LOCK TABLES `eventdevices` WRITE;
/*!40000 ALTER TABLE `eventdevices` DISABLE KEYS */;
INSERT INTO `eventdevices` VALUES ('0033a2ec-9bdd-4829-b1a0-0814369e39e4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:52.000000'),('005dacd3-cfcb-4a69-a005-5dfcad0bd6b6',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-06 15:47:52.000000'),('00a02c5d-9dfc-49a0-9a93-21ccfb2093a0',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:25.000000'),('00ade997-3d07-48dc-8d97-eec8d24ee0e4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:30.000000'),('00dcc70a-f69d-47b4-a59f-0d184bc7521b',96,10891989,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:09.000000'),('00e137bd-7f0f-4665-9c03-5a3540e8b60d',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('01c0d1c2-dc35-4550-a75c-e3214e43389b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:56.000000'),('021267b3-af54-4889-b47e-59aaf3f39b0b',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 15:15:53.000000'),('03d048b5-08a1-4bd2-b8d5-3f14c3455224',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-07 15:44:45.000000'),('04a7c559-2c59-4c13-898d-3201f1b304b3',0,267,1,NULL,27,0,4,NULL,NULL,'2025-02-05 16:19:21.000000'),('04d7f9c4-0360-4cde-a0f1-1d6585dd521f',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 17:59:00.000000'),('06d38505-aab6-40cb-ac9a-a82ac6fb7ac4',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:50.000000'),('06e6ef13-53cb-4440-b0a8-2699e7280e41',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 16:59:45.000000'),('073ca261-9a80-4b1e-a523-dd8e468731e9',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:29:04.000000'),('0905af30-c259-4adc-8f3c-55b5c54735ed',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:38:59.000000'),('0916bf03-6df8-4358-8f96-6d7ca21720ea',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:47:11.000000'),('0a2434c1-f7f4-46a7-996b-fd8857ddc679',96,10891989,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:18.000000'),('0a38c4f0-8210-42fc-953a-08a489abda3f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 12:27:34.000000'),('0a7505a7-6971-4fb9-a015-44c54afe62b9',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:48:58.000000'),('0afee293-e688-465e-8d25-faf9a4fb5149',36,267,1,NULL,0,0,4,NULL,NULL,'2025-02-05 16:53:59.000000'),('0bef7d42-2c50-4c88-819b-866cf692abf2',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:41.000000'),('0d173925-f863-4e7e-a7bb-480e5f2cba6a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('0e927fe5-093b-4ab9-a108-1fb54be9b70c',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:12.000000'),('0f96c488-d763-4a52-acb3-0734cc0bc49a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:28.000000'),('0fc0c4a9-3e40-4389-b371-0ebd61200d15',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:46.000000'),('1015a8a9-3e25-478b-81ed-eceb6477e3f5',95,10892253,1,NULL,22,0,4,NULL,NULL,'2025-02-10 09:24:55.000000'),('10bdb168-4059-4368-adb1-16fd0d2f8a96',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:46:57.000000'),('10ccb735-f88e-4762-8076-453e239e0478',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 21:36:44.000000'),('1162adc7-5f5e-41c7-98d1-6ab90fd6529f',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 18:00:41.000000'),('119a28e6-4aa4-4e45-b4d1-04d97c1fc9a3',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:21:22.000000'),('11de62f6-1e6b-4af3-8bb9-99ffa3e71eef',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:59.000000'),('1271bbca-a79f-423f-8929-57da97a9a851',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:14:08.000000'),('144e6e21-d93e-4478-af47-e965f7638bd5',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 15:24:08.000000'),('14a832c7-5ee5-48ae-9c21-4414a613a314',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:56.000000'),('15dfdb1d-1d16-4d7e-a915-bb0bfcef9bc7',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 15:14:58.000000'),('16e44936-a97c-4782-be85-ff0cca0d3c42',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 23:16:12.000000'),('1807038c-33d3-48c0-a63c-da8bf0452ad9',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:52.000000'),('18508bba-c4b5-4795-b4b0-2581ad5d6f5e',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:27:26.000000'),('18b9357e-f522-483b-b015-ba1c4831cf12',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 18:21:07.000000'),('1950d57d-2f32-48e3-a9e0-acf65447edc8',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 12:28:04.000000'),('1a243f46-05b5-477a-8c9b-c02abc76badd',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:52.000000'),('1a3ad716-3b68-43af-8f90-676bba801378',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 17:44:17.000000'),('1ad5a7f5-77e5-41e9-aa97-afd1d8b12e24',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:57:37.000000'),('1b42cfd7-9686-48a5-a928-7e626bc0081f',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:49.000000'),('1b6604ca-ffad-4144-b0c2-0e64d6501921',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 10:02:59.000000'),('1b8f315a-9b87-4ef4-88bc-da7600894ad0',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 21:36:44.000000'),('1c8a6277-3ce6-4fb9-8504-318b7df51dc0',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:23.000000'),('1ce9b993-106b-4437-966f-78dae24794b2',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:56:28.000000'),('1d99966b-d85b-4361-8efb-25f77581d358',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:21.000000'),('1f9c6c56-3117-44f4-95ee-0fcb247ef387',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:18.000000'),('1fa0fc8d-ffe4-401a-8d1f-4fa939e596f2',36,267,1,NULL,22,1,4,NULL,NULL,'2025-02-05 16:29:18.000000'),('2017cb03-7997-43f2-ac0a-60690489d2e8',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-10 16:48:29.000000'),('20821af6-8c2f-45eb-b79b-912a987faaca',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:25.000000'),('21062889-71a8-46f5-9672-48fd85112d6d',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:08.000000'),('21adda64-8c8e-4652-9ba2-0dae6900b641',0,NULL,1,'Auxiliar de entrada conectado',221,2,200,NULL,'GQS2235000391','2025-02-18 12:23:27.000000'),('22bcd4d5-e054-4d99-8f6f-9b00d143886e',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('23bdf1cb-497a-425f-b7f5-6ea9daacc58b',0,NULL,1,'Auxiliar de entrada conectado',221,2,200,NULL,'GQS2235000391','2025-02-18 14:21:01.000000'),('248056d7-c87a-46ed-9a09-dc8df0313bbc',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:44.000000'),('253c9886-a6e7-4ff9-b4d6-7d497ead933b',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:19:51.000000'),('26687194-a505-4f4f-8045-16edfb3593af',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:43:58.000000'),('267e438e-04dd-471f-af56-ee0719752349',0,10892253,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:40:40.000000'),('268c3736-2894-40fc-8eb1-5a11572d4d91',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:28.000000'),('26a50152-359a-48bb-a277-932a89dc683d',0,NULL,0,'Rede desconectada',105,2,200,NULL,'GQS2235000391','2025-02-18 12:20:14.000000'),('26d6ab9a-ebd0-4305-8882-2a85c7b980c4',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 23:01:33.000000'),('279c7fb2-f8b5-41e2-a378-c3f2544a1a76',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:00:02.000000'),('28a8afc6-b4a9-4acd-aa90-999dd8a1dcdd',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:31.000000'),('2a5730bd-c3f7-440e-96ee-974a8df3d7f5',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:55:54.000000'),('2d78a5c5-5590-47b5-b57c-1dfd0419913b',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:37:38.000000'),('2d7e815d-7c2d-495e-958b-a2c5d529b705',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 21:36:45.000000'),('2e477db1-2625-4bfd-8572-7d1963f37080',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:17.000000'),('2f499bb4-799e-4f01-b061-72b98033893d',0,264,1,NULL,27,0,4,NULL,NULL,'2025-02-05 17:07:28.000000'),('2f801624-9f20-4c98-95a1-adc2c862f2ec',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:24:24.000000'),('2fc4af48-f1ef-4fce-9a40-7d9577008561',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:30.000000'),('305aa0bb-b670-42a4-a667-969de63eb173',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 11:52:40.000000'),('307ac03b-09a5-47b6-bfb7-1b8eaa3acf07',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:57.000000'),('30eda850-ba45-45ae-a552-89060e04c456',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:27:09.000000'),('31435dcc-b998-4a7f-ac43-105d2d772cbf',0,279,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:25.000000'),('31ef1022-88a5-4c90-b521-3bed24956196',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('3201363e-462a-4f34-8755-a927fe8236b8',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 12:20:12.000000'),('32550e45-26b7-444c-a4ab-ab06bd10fc66',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:11.000000'),('32dcaae6-dbd1-4c86-b6e6-e71842ea9149',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:48:44.000000'),('331dcc17-7d84-42ab-bc93-f80035e5bbdc',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:41.000000'),('33a49515-b213-4625-bdc0-b0f8f725683b',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:54:08.000000'),('34f81d62-22cd-4cb4-9277-d8a9e727be96',0,10958427,1,NULL,27,1,4,NULL,NULL,'2025-02-12 10:56:13.000000'),('356f3b29-e600-4651-8e37-180f61185b92',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:21.000000'),('359f64d1-e8f4-428b-b151-40ece3d6ff40',0,NULL,1,'Auxiliar de entrada desconectado',220,2,200,NULL,'GQS2235000391','2025-02-18 12:25:43.000000'),('36644e48-d225-4a14-bb91-a8afd5704a00',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:13:57.000000'),('36fbc7d3-15ee-44d0-ac81-99b16b189446',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 17:44:16.000000'),('375cebf6-cca2-429b-83f8-d247c9347061',0,279,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:14:29.000000'),('37b00e3b-f04a-4e5a-8b19-f665c8d4522a',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'GQS2235000391','2025-02-18 12:20:43.000000'),('386f80d8-de2c-4d73-8428-61ceefbe73b0',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:30.000000'),('38b6c1d5-936c-4260-b472-dec4282e09ca',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 23:16:37.000000'),('38e65102-2084-49c9-827c-99f8bb62bb01',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:22:26.000000'),('39d96540-826f-4531-b9c0-0f930e6affa1',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:49.000000'),('3a2bb645-194a-42c0-96ee-e49d36e7331e',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:17:35.000000'),('3b434548-f4b8-4154-a88b-6e66dd945a80',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:46:38.000000'),('3c0bf54e-9d0c-45cd-8a13-713d5325c85d',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-11 11:30:41.000000'),('3c1e74f3-bfea-4667-b3aa-667df6a5d8a4',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:06:49.000000'),('3cbbe42d-db6e-4b4d-9857-81d9d08547cd',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:30:17.000000'),('3cd0ad38-97de-4b24-afd3-a51fe9590c81',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 10:59:57.000000'),('3e35b7f5-b2ab-4b33-a15e-6c4b67037be4',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:15:01.000000'),('3eb20623-bad1-43be-9498-cef2b6e1cbf5',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 15:16:08.000000'),('3efc3794-78dd-429b-a135-7c2048a9b160',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:37:32.000000'),('3f59a790-ea71-408a-bda8-95967930dbd7',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:15:20.000000'),('402599f7-a005-4c07-a39f-ee6bcb73c1d5',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:28.000000'),('408f9cd2-d8be-4f58-b044-67e94ba6f15d',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-07 15:47:17.000000'),('4105a957-af3a-4384-bc30-b3d56f5f8d53',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('41dfce9e-1976-40bc-a275-54cbaf3e5db7',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:37:36.000000'),('424f2074-6a20-4a0a-a010-a4e9b9dd98ca',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:23.000000'),('432fda9d-f04c-4999-8e3c-bdc5ebc23289',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 10:15:13.000000'),('43a82299-4b39-4e0d-8300-50be3de85f43',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:59.000000'),('44e54a75-76fd-44fc-a9fc-cd50b898b787',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:42.000000'),('44e703dc-6fba-4a78-9b13-05bca741e92f',55,10804937,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:55:11.000000'),('44fedae4-b64a-4d44-a873-163693a78db1',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:57.000000'),('459e2484-c5b2-4f71-981b-1558b06da3a9',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 21:36:42.000000'),('47175df4-2ad4-431d-9f41-b2928835cb4e',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:39:41.000000'),('4772b23d-94cb-496e-afff-4c9dd0de2b9b',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:06:29.000000'),('48e207d6-883a-47c7-8445-89af401487bb',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 12:20:12.000000'),('49022785-1b54-4223-9f0d-d65bf5c58b87',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:39:36.000000'),('4989ac1b-5430-47b2-99ec-cdd3518c014b',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 12:27:36.000000'),('49a5ea02-aaa2-4e13-801c-06ffa867a53a',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:26:33.000000'),('4a1d8f12-3b73-4311-9cdc-905b0bb74fc8',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-11 09:36:59.000000'),('4a2c45f7-0e31-4f14-9527-21dd6da52533',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:21:54.000000'),('4b3ef8ee-5cd6-47ef-8592-c0143ae9ceb3',0,NULL,1,'Auxiliar de entrada desconectado',220,2,200,NULL,'GQS2235000391','2025-02-18 12:27:53.000000'),('4ba94c97-01c1-4037-b5d8-5df1b328aa21',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 15:14:58.000000'),('4bf0d605-c94a-4f77-af8e-b68b84636937',0,NULL,1,'Auxiliar de entrada conectado',221,2,200,NULL,'GQS2235000391','2025-02-18 12:26:40.000000'),('4c5e7733-51b4-47dc-872b-7e699d49cf7b',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 11:57:02.000000'),('4cb00d20-f863-4841-a564-f245ca41971a',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 15:15:53.000000'),('4cfe5688-d8a2-4959-a8c9-87b3721659a1',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:13:59.000000'),('4ddad253-7310-48e7-ab91-f18f701f329a',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:41:05.000000'),('4e48d594-fadb-4730-9e06-2db6c986983b',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:27:18.000000'),('4ebb38eb-2b5d-490e-9f39-d2221346121f',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:21.000000'),('4ec464a1-0bb9-4a16-b90a-b0ff9379ac22',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:44:01.000000'),('4ec4a3a0-aeb2-4885-a8a3-58e656a4b63b',38,264,1,NULL,0,0,4,NULL,NULL,'2025-02-05 17:09:17.000000'),('4f17a667-042d-4147-b14e-c3443ad22532',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:48:48.000000'),('4f9f4ef3-bbbb-4afc-be3f-0408220b18ab',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-07 10:19:44.000000'),('51633278-8555-4112-9a36-b5c401436f5d',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:29:00.000000'),('51fbd722-8c6e-46c8-9580-4c2d6a2eb19b',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 17:01:34.000000'),('524e3790-a91b-47dd-8169-7772078b19f9',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:21:36.000000'),('5275c46c-cf1e-4f73-88f9-7daf5389bb89',0,10832577,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:10:54.000000'),('545f0314-f6bb-493a-ad23-0a81ab7719e4',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:22.000000'),('54cee7ff-bf31-4cd9-a905-aa58cc5da998',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 15:16:11.000000'),('54dac106-2715-442c-a433-bbd04e35bfdf',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 12:20:12.000000'),('561389ee-4b80-4423-a9ec-950d1f8b99e9',96,10891989,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:01.000000'),('561fba38-a97d-42c2-b8f6-ed33148e5ed6',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:55:39.000000'),('5689e5fd-643a-4347-b58a-cacdbc1771df',36,267,2,NULL,0,0,4,NULL,NULL,'2025-02-05 17:02:45.000000'),('572498d0-7383-49ab-bfe3-4c39c0a4773d',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:29:11.000000'),('58b3356e-0a94-46f7-baa3-f7682c7c3c99',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:13:07.000000'),('59d157a0-b933-44d7-9011-4ae08c501a9c',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:53:59.000000'),('5a3c4c8e-b367-4748-8ddb-cda319b40412',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:47:03.000000'),('5bc581aa-4061-40fd-b2e2-9f6c84da1f48',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:20.000000'),('5c0b6683-ab8e-4c0c-805f-44f1074cc8a5',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 11:57:03.000000'),('5c77147e-8a33-4736-93d4-42144daf71a0',0,10892253,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:40:38.000000'),('5ca07aa7-df11-463f-8933-1311eead8d9c',0,10832577,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:11:39.000000'),('5ccee037-3c00-429c-afb0-3da770cc95e5',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:06.000000'),('5d267bc0-3fab-4484-a16a-ed9d0ebdfa1d',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-10 10:08:18.000000'),('5d377f6f-5204-42b4-8c81-e1e6c7c8cac5',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 21:36:38.000000'),('5d91313a-436f-4772-a0cd-f339b7b846df',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 12:20:12.000000'),('5dd2296e-66dc-4888-ba0f-ea6e32b28f78',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:57.000000'),('5e21f892-0cd2-4d07-b92e-a2ab10468e28',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:13:14.000000'),('5eac671f-1578-4d4e-9c20-f24f31527bef',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 09:22:40.000000'),('5efd6c99-e62c-4ae3-b2b5-33609fb98278',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:58.000000'),('5f15ff22-49b7-4718-8270-381a7b7baec6',0,4,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:25:49.000000'),('5f5e47a6-0c3f-4c91-a653-97a7438fd740',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'GQS2235000391','2025-02-18 12:20:58.000000'),('5fd8d5eb-fa89-4648-b6a1-f792d18af160',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:06:55.000000'),('6140ece1-18dc-4022-946f-50d1d5da49b7',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 12:24:33.000000'),('622752da-0168-4568-8a2f-929cc91fbe90',39,10803847,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:25.000000'),('62897666-e876-4039-add1-0d941ab43e37',86,10958427,1,NULL,0,1,4,NULL,NULL,'2025-02-12 10:56:30.000000'),('63b016a7-561f-4907-8078-5d145b857c81',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:07.000000'),('64f577b3-fa97-4516-a74b-d9362e703f4a',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-06 18:20:19.000000'),('65245df8-988f-4226-be48-3eb2f17c8be8',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 10:57:16.000000'),('69176d1e-9250-4659-9807-88b81ed18d84',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:53:02.000000'),('69aa1213-6211-4ae8-a216-cfe810bd2d2e',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:30:13.000000'),('69fc9fcf-12c6-43f8-a073-8a8d4604cb5a',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 15:14:33.000000'),('6a00d954-e91f-469c-a6b5-ea53ad1f0618',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 11:57:04.000000'),('6a2bbf3d-dc9b-4e43-9c7f-329388b5900f',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:41:00.000000'),('6b30ae26-0601-4428-a9e4-1a2efa5f4f81',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:46:03.000000'),('6c266509-ed09-4479-aae5-1b3abc8a0658',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 15:14:56.000000'),('6c6a1e5c-745b-4cd6-a71e-b218f28f6c5f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 15:15:53.000000'),('6cdda143-e89b-48ac-aa4b-4dbefa8f6c4c',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:39:35.000000'),('6d1300e3-990f-4c37-a6b9-dad41f6b9798',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 21:36:42.000000'),('6d8615f6-bb0c-42af-a465-f0ec7a9979c0',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('6e20b891-381e-43f3-bf08-c9263f19c833',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:12.000000'),('6f0dd569-c4d5-46ab-a3b0-4a316bb63173',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('6f2878c5-0faf-4738-b1aa-92276b262e36',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:28.000000'),('6f8c54d5-98a6-40ae-9289-73a8c2606f52',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('709e2b24-30ed-4026-a923-e5f62435020f',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:48:06.000000'),('7154e629-602a-4765-a323-ab762bb4fb89',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 12:28:04.000000'),('7226bcf6-a328-4dc5-ab87-f65abefa8bf4',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:48:22.000000'),('723772dc-38e2-436c-b2f1-64d3b2688f4e',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:22:16.000000'),('733bfbe8-fce5-42c9-9912-e59d8fd2bab7',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 17:06:51.000000'),('735a4815-0aef-4462-aa8c-a2a4cddd35b4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 12:21:34.000000'),('75e2a40a-de69-43aa-ba33-199865b1bc13',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:54:06.000000'),('7749bf5e-2bcb-4ee4-936e-fdb625d9e6e3',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:54:00.000000'),('7803d367-cbb0-4cf8-879e-47e356aac780',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:46:59.000000'),('78321d63-dc5d-4466-a386-02ebf1ccfddf',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:54:04.000000'),('7861cc04-9fae-4f04-ac35-765b428af622',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 10:15:13.000000'),('79abbb62-24d4-458e-b56b-5c42ce4067af',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('79d9ed62-9ee3-4393-ad02-2405ea05cdb7',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:27:07.000000'),('79fd4da8-89b8-42b9-965f-44416e9d4848',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 17:15:10.000000'),('7a06aef9-2365-4829-abc7-4946d6eaac83',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:44:28.000000'),('7a3d9b8a-e848-4998-8602-7760c8fc9827',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:19.000000'),('7a822e80-5555-477a-a4dc-4c2a0b0d162c',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-10 10:06:46.000000'),('7afe4de4-5ae3-497d-a2d3-4844efc54c79',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 12:27:36.000000'),('7b44ab52-644d-4b7a-86d2-41586ae00868',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:06.000000'),('7b87fec8-2b6f-4734-9581-b6f6313bb25f',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 22:55:33.000000'),('7bb3c6c0-35a1-4759-8320-48ba8f2e6204',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:27:30.000000'),('7be9df84-9101-4950-aac9-c46ef805bbd6',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 11:52:38.000000'),('7c1e01ec-b34c-4c8e-aaa3-9771dcf2bce2',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 09:22:49.000000'),('7c85987f-08a3-4888-8ebc-0a475dd7a67c',165,10813380,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:20:00.000000'),('7cf21843-e4b2-40c6-a0e0-b88d5ff912e5',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('7d429fbd-f879-44fb-b2d1-bcde60a7c0bb',8,9124358,1,NULL,23,0,4,NULL,NULL,'2025-02-12 11:26:56.000000'),('7ee9c4ae-0267-48a1-b25a-08c3a58cacb0',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-06 18:20:46.000000'),('7f9ea51b-e057-4c54-a51b-8f375fd90d89',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 10:01:10.000000'),('7fb6409a-a532-47ca-865e-31bae1a85d9d',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:43.000000'),('809d363f-bbaf-4171-a3d9-6555ee961aca',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:38:58.000000'),('80c3e02f-f92e-4001-9c9a-be44cd16e63b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:11.000000'),('83175c47-dc1f-4732-ad61-97702387ce9b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('8344cb2b-8266-41b8-a9ac-facb00c7d5c0',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:15.000000'),('83b52b28-c520-4959-91f1-f871b3a79b15',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:28.000000'),('84f1f07c-016c-44ba-be17-25c36ac8079e',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:48:54.000000'),('851b493b-520d-457d-bce4-0afd5f5b3813',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 16:24:29.000000'),('8538f541-8575-4b98-bf4d-a5450125f1fa',27,10920487,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:59:44.000000'),('858e0224-0935-4024-8d86-cfdc6c490781',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 15:16:11.000000'),('86477874-6c45-4a83-845f-29fea34e31dd',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:08.000000'),('87583f9b-de49-433b-8217-0943e22559b7',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:00:04.000000'),('8896f53d-896f-4e5e-8961-26edd564dcb3',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'GQS2235000391','2025-02-18 14:16:58.000000'),('889d728e-8f5d-40c7-877f-a4e2ad844511',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 12:24:33.000000'),('88bb8ed2-92b4-4217-a008-3572be0df20a',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:13:02.000000'),('8978a4ad-ae22-4b69-945d-ba35c44ea2ac',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:19.000000'),('89f5bcfd-a97b-4bf1-8a33-fa3f69d4df8d',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 23:59:54.000000'),('8a6c6dc0-38e6-4093-bd39-a7dadcc5fc5e',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 15:23:34.000000'),('8a6d3bb9-fe20-4dc1-9c5b-1a93c3267570',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 15:14:33.000000'),('8a78e5ef-53a8-429d-85fb-0634faa7f4fc',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:54.000000'),('8b06fc87-991c-4285-b738-eb5ed90f73cb',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 12:24:37.000000'),('8b0f3e9a-2c57-4e0b-bc12-81995491bdb7',9,10832577,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:17:25.000000'),('8b302ff2-fb6e-4b71-a800-85d03e6c8ace',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:52:29.000000'),('8b616fe1-998d-4c74-a81c-13a8f8ab61d3',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:31:54.000000'),('8b68c5a4-a5f3-4ea2-a3d4-d61408cf45b9',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 12:20:47.000000'),('8c2d115b-7061-4726-acac-5386e2fc7720',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:20:30.000000'),('8ddca2c7-8a99-478c-91cf-70246972da67',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:23:14.000000'),('8ddf1436-fd89-46c7-a7d4-74167a7bf1e8',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:17.000000'),('8dfdddc5-1f09-4fd9-b5b1-c09675a310b8',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 12:27:36.000000'),('8e082f8d-f178-4ad9-a220-755189a6ccb0',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:31:57.000000'),('8e895fb0-0bd2-4c93-b7f8-bd2c02763990',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-12 11:00:08.000000'),('8f716c67-e57d-46f9-8b4b-6708d0c42aac',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:16:10.000000'),('904cfd0d-02e1-4695-bffa-b7a486db96bc',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:06:49.000000'),('909ec1a2-1cbb-40f7-8e7f-5b3ee704a412',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 15:14:58.000000'),('912850bb-046d-4939-95bc-541fbbbfebd3',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:29:08.000000'),('923ff6eb-2aaf-49d0-8b8b-be2c0d0e40a2',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('925e4bea-e64d-437b-b4cc-12d8270a52e8',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:14.000000'),('935b20dc-2d65-4a9c-8272-fce62fa37c4c',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:12.000000'),('936f9a13-d122-46dc-84f8-2eafd9bcccf4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:01:27.000000'),('93d0bc61-ac60-4f16-9090-f79329fa262e',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 12:28:05.000000'),('93fb5713-9e1c-4deb-adb0-c6ce8259f551',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:50.000000'),('9452148c-620c-4691-986e-bc3b2c1de6c0',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:24.000000'),('9534f715-2af1-40b1-b8a6-a291e75c4d06',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:57.000000'),('9568e683-b0fd-4f64-ad08-2d73e42d3016',5,9124357,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:59.000000'),('96794fce-7c33-41c2-a840-c4e7ceb0c87a',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:53:06.000000'),('96cb273a-0380-45cc-98e0-b19c0aee5a6b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('96fd3003-8a8c-48a6-bdf0-2e66b8b8cc84',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:24:56.000000'),('974216a5-9fad-43dd-9151-990a8ff15d98',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:32:00.000000'),('9794f052-276a-4727-857e-7b3b3e367544',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 09:23:09.000000'),('98115c13-efa0-4c08-a034-f54c3bcf2919',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:06.000000'),('98b830b0-b618-4093-80d5-a5445ccb5a95',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:45:08.000000'),('98d00777-6fcf-4b28-84af-ca3fc9e6f8df',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:11.000000'),('98eefccf-a10b-4192-83e3-4418d827871f',55,10804937,1,NULL,0,1,4,NULL,NULL,'2025-02-12 10:54:20.000000'),('9942670d-352f-419c-806f-5f8a0f37bbf6',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 11:52:40.000000'),('99e1af66-ff96-4f88-b8ff-870237f8c25a',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 23:46:48.000000'),('99efcdd7-d30a-4985-8be1-4c3bd501ad48',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 18:43:30.000000'),('99f2ddc9-ae0e-4571-9c8f-9eaa762b9389',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:01.000000'),('9b445721-f136-49c3-98cc-71f5f6dc86ee',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:39:01.000000'),('9ba282e8-1f67-455b-ab20-7c61c1d1abb6',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:14.000000'),('9d7656f9-b453-4dd6-959a-7712d4faa06b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 10:55:38.000000'),('9dbe5773-dbe9-46f8-8fa5-e112909dc111',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:25.000000'),('9e24e8fa-8daf-49ee-a5e3-47e560e8e644',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:43.000000'),('9ffd458c-30c8-4456-a1f5-5d396d1b1fbf',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:44:02.000000'),('a033e483-ad69-4c35-9598-33519f7f1bf8',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-11 09:36:32.000000'),('a083101e-70be-4036-a27d-5265c9a8b568',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:07.000000'),('a145b975-e3b4-4d37-9ca9-cfa0b4c386c8',95,10892253,1,NULL,22,0,4,NULL,NULL,'2025-02-07 15:44:39.000000'),('a1f06a34-0415-410e-9ef5-615ce6e7625a',86,10958427,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:57:07.000000'),('a2c81225-979e-44f4-add3-94fb84353b87',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-12 11:26:42.000000'),('a37c5603-3a9d-4dfa-b6d8-7b891ff09556',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('a56a9019-6ff3-4465-ac0b-db3fa5e3f0d4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:15:22.000000'),('a5953f3a-5617-4fbd-95ec-cd9f6e3dfb24',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 15:15:54.000000'),('a5cd01bf-6c1a-4a42-ac15-60fa12633da6',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:39:00.000000'),('a621747e-99d2-4992-936c-961f1c8fa18c',0,6586851,2,NULL,27,0,4,NULL,NULL,'2025-02-07 09:36:59.000000'),('a84b0da0-889f-4f2a-80c2-1d305941f128',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:14:51.000000'),('a86eb43f-5deb-4272-8c43-28d96baf32c7',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:28:47.000000'),('a911e180-bd9b-4160-a31a-1fb67efa39b0',86,10958427,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:56:19.000000'),('a94512b4-0cf2-4f67-b03f-f6e4a7563255',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 15:14:32.000000'),('a96f402b-5209-4bc3-a9ae-760a6ee41ffb',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 15:45:13.000000'),('a98015da-d258-4447-97c7-cf3273126e2f',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 16:13:00.000000'),('a9eb799d-49ec-4683-a782-a850ce08ba79',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-06 11:54:53.000000'),('ab31734c-92b7-4e5b-ac96-ed118c9887b1',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:44.000000'),('ac4d972c-1f28-479f-b84b-c020ccde7d2a',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-10 10:08:15.000000'),('ac6bd2b6-bc29-462e-b538-17d91f182dad',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:23.000000'),('ad828432-68a8-439e-b8e7-c3c0893ade4c',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:24.000000'),('adae210b-bb9a-4d75-be82-09cb92bd1744',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:26:44.000000'),('adf08334-0c96-46c7-9328-19ac41aee2bd',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:31:55.000000'),('aebe4c1c-1303-4671-b02e-18f041068907',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:53:04.000000'),('b02ad591-e7da-453e-ac3d-18d7acb2cdbf',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 16:12:57.000000'),('b033a3a9-3a04-4782-ad1f-cb88c6f52d1e',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:55:58.000000'),('b044ae91-83a5-4df6-abe0-232d381314c9',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:25:00.000000'),('b0651ea3-7ac5-42a5-8c2f-a90adca8e52a',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:39:38.000000'),('b098c245-29be-49c3-9959-217d60ec74cc',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 12:21:36.000000'),('b0df22d3-27b8-4fff-b9cf-8ab57946781a',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 15:16:12.000000'),('b148a454-0256-4a76-9f00-cba955b4939f',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:44.000000'),('b17e8dad-d6ce-4222-9507-b26146ba8a52',36,267,1,NULL,0,1,4,NULL,NULL,'2025-02-05 16:51:13.000000'),('b1d45ae6-ca04-402e-bd94-b09f59cff4e2',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-11 11:30:58.000000'),('b2acc6b6-c242-4fc2-80af-a134d3354aa4',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:59:02.000000'),('b2e3f740-0fcf-49da-a641-c78f92275e37',153,10814870,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:52:53.000000'),('b31110b4-1667-41bd-9d6e-1fad4f47ebac',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:56.000000'),('b49380e3-33a2-4e75-b4a0-d5a7658f9e36',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 12:20:45.000000'),('b5af6906-8f22-4fbe-9f12-7d660d430003',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:26.000000'),('b5b0809a-532f-4b0a-915f-d425c2ef076c',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:53:57.000000'),('b7108a9e-58f4-48b4-bef4-c97867f9c4b2',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 11:52:39.000000'),('b76e6b95-9954-4d06-b707-ea87ec81d005',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:28.000000'),('b907b9cd-00cf-41f7-a0bc-764447a610ba',0,279,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:14:26.000000'),('b9dc0c73-be07-42ec-9d32-76a94c07613b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:21:04.000000'),('baad87c8-11e9-45aa-8c9f-ed4bf6d3fbd3',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:29:35.000000'),('bb042eb2-ae7d-424f-bbc9-4cd470ad1ab8',39,10803847,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:05.000000'),('bb78a848-ded4-4d82-a5fe-7bb6cb3b6925',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:52:59.000000'),('bbcb4008-5096-4eb8-bd2b-0c51f3c845a0',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-10 16:48:36.000000'),('bbe2f2b0-7675-43fe-93f8-92e982e892c1',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 12:24:34.000000'),('bc95ac0c-6334-4333-8ca1-93efa14bd9a0',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:29:24.000000'),('bca69f0b-fa58-44cf-a454-df74320f8c5f',0,10805211,1,NULL,27,0,4,NULL,NULL,'2025-02-12 10:53:11.000000'),('bcbeddf7-d8c9-46e3-9fbe-11b110ceea24',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:06:49.000000'),('be398b04-a618-4519-b3c8-e684bbf67628',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:22.000000'),('c06382ab-7632-43bf-8960-aa46e38b9ca8',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 10:55:37.000000'),('c08d5d63-0127-4d3b-bc34-deb095d12c0e',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:01:52.000000'),('c0b72b8c-8976-4203-8430-22aef94cceea',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:29:15.000000'),('c15dc8ed-5f10-4e56-af58-c0326886944e',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:52:21.000000'),('c21317bf-289b-403a-ae4c-bca809b0b500',0,NULL,1,'Auxiliar de entrada desconectado',220,2,200,NULL,'GQS2235000391','2025-02-18 14:21:00.000000'),('c2695fac-8705-442f-bd21-b951896018bb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:13:01.000000'),('c3b2b55f-e71e-4d61-a8e9-29e9a1378479',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:59:17.000000'),('c3e03f11-f9a1-4a10-9111-81e03c2a7494',55,10804937,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:54:29.000000'),('c5042c58-fbe1-4c49-a950-c8e5938bca26',36,267,1,NULL,0,0,4,NULL,NULL,'2025-02-05 16:49:19.000000'),('c50e2557-f8f3-4bcd-8876-a220c466427d',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:01.000000'),('c7eb4a4b-8014-4d98-a4ad-8d6a09eec4ff',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:30.000000'),('c802b7dc-6f6b-466a-9686-535bf124943a',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:23:34.000000'),('c8889577-cbc6-41d1-804f-50ac6661ef68',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:13.000000'),('c9843156-68b2-4761-ba7f-abe826d16390',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:00:09.000000'),('c9bbed51-89aa-4a0b-836b-eda11009e70c',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 11:57:03.000000'),('c9f8616b-e512-4163-9c58-53357fb046a3',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 16:12:59.000000'),('cb4b23ee-08be-4207-a279-7dc26ad8d819',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 12:20:09.000000'),('cbd75c9e-dfa9-4a48-96bd-eda164f00825',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:55.000000'),('cc2511e6-64c7-41b1-a6ff-205b01b48468',5,9124357,2,NULL,0,0,4,NULL,NULL,'2025-02-12 11:22:24.000000'),('cd7a7c54-c644-41dd-bb24-f1346dadcd79',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 23:57:38.000000'),('cd89a91b-f8fb-4fa3-ab23-06461adccf1f',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:04.000000'),('cd9d678f-70dc-4ae0-9115-fa2f315dcd46',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:26:39.000000'),('cedc594c-0231-42f2-a225-c44f1e4d9018',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 11:56:31.000000'),('cfaf50be-cbc9-44d0-8778-9b38b5f7454e',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:39:42.000000'),('d0184aa4-7794-48ff-a107-f497a0b7fd63',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:12.000000'),('d0501ee8-9779-4f3a-98b4-be3ca88dc89c',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:08.000000'),('d0629d16-8170-4e7d-9a4d-672bcf9fbdd4',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 12:27:37.000000'),('d068e257-4cb6-41a9-a099-867825e77e7b',9,10832577,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:09:46.000000'),('d07ee4c6-9e92-4109-8193-1d03ed19b4c8',0,NULL,1,'Auxiliar de entrada conectado',221,2,200,NULL,'GQS2235000391','2025-02-18 12:28:01.000000'),('d0a40e5a-4540-4e20-809e-92792f83d8d7',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:06.000000'),('d146aab9-f1a4-40fe-bedd-b6008135a44a',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:41:09.000000'),('d17cff3c-546f-4587-a4e8-34faf3e101af',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-07 01:20:46.000000'),('d1b3d998-56c9-4127-b616-c35d1dd66948',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:33.000000'),('d1c24de7-bc9a-47d0-aa08-369ece331de2',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:06:58.000000'),('d227bbf2-adc3-4727-a7ab-011152b14634',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:31.000000'),('d23aa271-e665-4ed4-8587-40e9b58cf5c0',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:58:21.000000'),('d29b96a6-6013-4720-866c-339e5b120461',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 10:15:11.000000'),('d2aafeb9-df2c-4b91-845f-c457b3758f10',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 09:22:35.000000'),('d40e0b38-7ec4-460b-9650-58d2f94c48ff',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 15:47:05.000000'),('d44306d2-a1a6-4474-bb9e-4a2f6f2df187',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:19.000000'),('d4a685a8-18dc-484c-bd48-4340f6f615fc',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 11:57:01.000000'),('d580cf7c-086c-4bb5-8e64-7550949f4bda',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-07 15:46:40.000000'),('d58247d5-ee26-46bf-a53c-f2145a066316',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 12:28:02.000000'),('d5ae0181-795f-4397-9017-27153f583206',38,264,2,NULL,0,0,4,NULL,NULL,'2025-02-05 17:09:21.000000'),('d5e04d6b-de95-40e9-a849-34e5d122cb63',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-05 16:23:26.000000'),('d61c8761-8689-4015-b648-a4314d910e88',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:30.000000'),('d631f0a1-877d-42e1-b17a-7360ebc7ed98',0,267,1,NULL,27,0,4,NULL,NULL,'2025-02-05 16:20:06.000000'),('d6a9b1d4-21b0-4d79-bb0e-671423dd70f8',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:21:06.000000'),('d6af5f80-9bf0-4b6a-be2d-2cf9bbbf8309',0,264,1,NULL,27,0,4,NULL,NULL,'2025-02-05 17:02:39.000000'),('dac97602-4b3d-413d-a8a3-60a041964e00',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:23:34.000000'),('dad2373e-e57c-4590-a1ed-084862d30c8c',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:18.000000'),('dada431f-6a49-4516-b052-52b7146a8690',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:26.000000'),('dbdf0ef8-0b6b-42da-920c-5cb4c1a712ea',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:00:01.000000'),('dc1770bb-b49a-4626-beaa-267a33e14b0b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:55.000000'),('dc6e6494-daec-4dcb-8a9d-0b49b116897b',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 10:21:46.000000'),('dca1ddce-c5d7-4f81-9ac6-d3149f68e299',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 16:59:46.000000'),('dd07a2f7-561c-48c0-82c6-6029ec17fad7',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 16:11:50.000000'),('dd2825f1-4a40-4fb0-bafc-d6650650a086',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:49.000000'),('deab231b-a51a-42cc-8d31-4f595e43be8c',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:13:54.000000'),('dfa209ff-0e91-443c-b7af-83c520e8f180',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:20.000000'),('e032d3dd-e334-4b0c-a05b-12090290e6f6',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 12:28:04.000000'),('e05fc7b1-48b7-4b67-bbfd-08f79c8cab8b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:52.000000'),('e0f17b31-5162-4a24-9bc4-3e1905166882',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 10:02:13.000000'),('e188278e-78cd-479c-abf7-45521cd0e6b6',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:44:29.000000'),('e18b91ab-dd5c-4c2d-8f4e-8b91b6c39404',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:13:03.000000'),('e1afe226-9756-450e-9740-4bd814ddce5e',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:32:00.000000'),('e25c12b0-bce0-4410-9ba9-b538daeed3fb',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:22:15.000000'),('e2921f25-5814-4e90-8ba2-f53f8cf2235d',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:19:01.000000'),('e2bc4311-3c5e-46db-b539-7d9bea0e403e',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 15:14:48.000000'),('e37a5f00-e351-4a5b-91e7-57e02407ad03',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 12:24:33.000000'),('e39328ef-8e03-4f7e-92be-179f45207d8a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:25.000000'),('e39babc3-6aa9-4166-ae75-46276c009d36',55,10804937,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:53:02.000000'),('e3b7b28a-92f7-4304-bae9-b01fa627128c',0,NULL,0,'Rede desconectada',105,2,200,NULL,'GQS2235000391','2025-02-18 12:20:47.000000'),('e47094a4-fdda-4b60-974a-f422f2a533d1',0,6586851,1,NULL,27,0,4,NULL,NULL,'2025-02-07 10:20:39.000000'),('e54db4ee-5a06-40b2-8c4b-97fac8634e03',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:19:42.000000'),('e60f7b34-ed86-49bf-82e8-0d099a7dfba7',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:24.000000'),('e83576bf-337f-4696-aeb7-03fe6854fdac',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-12 10:47:11.000000'),('e9385234-3cb2-46c3-b6ed-51689ecaa367',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:26.000000'),('ea2b138f-3002-4f28-8115-19727063326c',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:25:34.000000'),('ea2c3e63-2c77-43b2-8dea-72ad3690fdcf',39,10803847,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:58:55.000000'),('eace8487-2dac-4f6d-9c52-185252f23f57',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:06:58.000000'),('ead62b9c-605b-4c2d-9f30-771eeff88364',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 10:06:48.000000'),('eb38a62f-220e-4b54-b6f2-9c40118dabf5',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:31:31.000000'),('eb5aa647-b193-4da2-8dbb-e424e75f2cb6',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:53.000000'),('ebf2ec49-d02e-46e2-924d-5ec0a37e31aa',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:57.000000'),('ecae9d05-48e7-4756-ad79-520104641f7a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:28.000000'),('ed2ae3c0-4785-4eb6-925e-71af1683546f',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 10:57:16.000000'),('ed88eb42-d19c-410a-8338-b6f19662f113',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:01:28.000000'),('ee270fb0-8497-4144-b5c4-d3a702ce1524',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 10:06:39.000000'),('ee8174ee-314d-457e-8253-091b2736718b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:32.000000'),('eeb9ac62-42d2-4ea0-b1d0-54f622c72881',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:43.000000'),('ef07a380-57ea-4ea1-a110-961d63c19aae',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:15.000000'),('f01f3282-4341-4497-978e-70ed518c0aeb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:38:57.000000'),('f1417d38-869c-4692-a217-d7d718cdb933',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 12:20:45.000000'),('f18f2d2d-263b-4b0d-b47d-ebf5487b1aab',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:51:26.000000'),('f1ba888f-2446-4d35-9060-eb2341e00eb2',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 11:52:39.000000'),('f2010b27-7c60-471a-a6e6-8c76c1bd30a6',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 18:43:42.000000'),('f21c7491-f31e-44ae-b3b1-e441183d90a6',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:57.000000'),('f29d18da-1170-433f-8186-73df7e3cdc82',0,279,2,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:27.000000'),('f2e38dcc-999d-43fc-bf36-58bce9e6afdb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:17.000000'),('f3cf2012-e38c-454f-8016-b9eaabd050fb',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:44:05.000000'),('f3d6a7ff-4b4d-441d-9810-8ae69f00eb98',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:46.000000'),('f3f2a737-7dd4-4b64-963d-434845a84622',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('f49ee104-c858-4726-8a00-d52ffa5bf607',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('f4cfcc7d-2b2f-4216-9eae-384ace52b06e',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:56.000000'),('f528dbb7-288e-4acf-b83b-935c1e451240',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('f59f179d-fae3-4ff5-b918-fafe0ffb96f6',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 18:20:38.000000'),('f629438e-2363-4e11-b160-54bc313769af',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:06.000000'),('f7289cc1-2249-4691-8592-cce40ad7bbf5',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:03.000000'),('f738619d-5316-4ef8-b579-8259fec5bc71',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:11.000000'),('f74b83b5-bdba-4f1d-86c9-099cc23e3829',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('f7835569-0ab5-4cfa-8dfa-62a89b0673e6',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:06:21.000000'),('f7b9cdd6-b029-458a-ac3d-e718cefc240f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 15:23:18.000000'),('f7f380cf-ef24-4e74-8ed5-5b04b1725c1d',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:17:03.000000'),('f8610292-8d09-412d-9489-18b709b7e089',0,264,2,NULL,27,0,4,NULL,NULL,'2025-02-05 17:02:43.000000'),('f8a46ec0-80be-4298-93a3-45f89d2da0dc',0,1180213558,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:22:16.000000'),('f8d4b998-7ff8-482e-bde9-1ce7a683e9bd',36,267,1,NULL,0,0,4,NULL,NULL,'2025-02-05 17:02:53.000000'),('f99345e9-c6e7-4166-b80e-ac098e19a1b3',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:50.000000'),('f9a0c37e-b55d-4e05-a7e9-10f05ce1b627',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:15:22.000000'),('f9f9aa2a-d0d3-4984-9fd3-f29fb80ce012',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-06 22:44:39.000000'),('fb02f608-6a0a-4542-8071-6fd55d71d089',0,279,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:30.000000'),('fb117003-72d0-4b5c-a5f6-d6805f1a9271',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:19.000000'),('fb1701e1-9929-4ab2-b1c2-763ced3bc1fa',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('fb2b84a0-d8c6-4d6a-906f-f4a1b31f2cdb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('fb8825e1-564f-473f-afb3-84f1c191770a',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-07 01:20:25.000000'),('fc7b605d-962d-44a9-a81a-3f2be8fe0d18',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 12:21:34.000000'),('fd550699-bf3e-46d2-a4f7-50c3ec89cad3',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:13.000000'),('fdbc0e8f-6d13-48b1-93fc-7bd71873178a',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:27.000000'),('ff7f682b-ee8b-4b1f-8616-b8b845f3a6cc',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:41:06.000000');
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
INSERT INTO `groups` VALUES ('9fced19a-8f96-4f3e-beeb-b68374abd00d','Grupo Geral','Grupo Geral');
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
  `InOutStatus` int(11) DEFAULT NULL,
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
INSERT INTO `kiosktransactions` VALUES ('004bd3c9-330a-4beb-8b79-3c777f3af18f','2023-12-10 03:33:48.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('020ce165-1b66-4da0-a97f-c9499a45841d','2025-02-07 15:11:39.000000',9,10832577,'N?o registrado',27,1,4,'TFP5235000422',0,'2025-02-07 15:13:02.849100','2025-02-07 15:13:02.849100'),('02d9a904-4cf4-40f7-9b48-98e79cf87a8a','2025-02-07 15:39:36.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-07 15:39:37.130000','2025-02-07 15:39:37.130000'),('0333ef12-c076-4931-8ba8-ce80fc8ef49b','2025-02-12 12:10:05.000000',0,9127895,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:10:07.523926','2025-02-12 12:10:07.523926'),('041060d4-c5aa-442a-8029-4d46c2d4ecf9','2025-02-07 15:06:21.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 15:06:21.552061','2025-02-07 15:06:21.552062'),('04188d70-529f-4a8f-8723-1f2f061d8b70','2025-02-12 11:32:00.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 11:32:02.794510','2025-02-12 11:32:02.794510'),('0439b2f0-5334-49f4-af74-ee715ec4511e','2025-02-12 12:09:54.000000',0,10920487,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:09:55.817753','2025-02-12 12:09:55.817753'),('04755f12-4414-4852-832c-fac852a315cd','2025-02-10 16:53:04.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-10 16:53:06.277138','2025-02-10 16:53:06.277138'),('067e1502-174a-4c22-bd41-985cae2ce937','2025-02-10 16:52:59.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 16:53:01.738281','2025-02-10 16:53:01.738281'),('075e9f99-f138-4456-bf56-464d198f5a01','2023-12-10 02:42:42.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('0779a4c2-4fb7-43a3-ba9d-e5be4c9ac64c','2025-02-12 12:08:10.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:08:11.860055','2025-02-12 12:08:11.860055'),('087530be-08a5-4b2f-bd40-459a510b8718','2025-02-12 11:26:56.000000',8,9124358,'Acesso n?o autorizado',23,1,4,'TFP5235000422',0,'2025-02-12 11:26:57.072182','2025-02-12 11:26:57.072182'),('08986e21-5fa9-43f9-9d40-1f49351607a4','2025-02-12 11:26:33.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 11:26:35.118412','2025-02-12 11:26:35.118413'),('0899fafd-912d-45ff-bdd5-49b7aef6c748','2025-02-07 16:12:59.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 16:13:00.045867','2025-02-07 16:13:00.045867'),('08dd4f47-fa1d-438d-8d5c-4ab693bcf5ff','2025-02-17 11:41:00.000000',306,10921938,'Movimento manual',0,1,200,'TFP5235000453',0,'2025-02-17 11:41:11.395856','0001-01-01 00:00:00.000000'),('094338bb-0926-4949-ad9d-8532291b9756','2025-02-12 12:12:10.000000',0,10894129,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:12:12.097293','2025-02-12 12:12:12.097293'),('0ae68249-ff0b-494a-a206-550156b67402','2025-02-07 14:56:28.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:56:28.969655','2025-02-07 14:56:28.969655'),('0c03c8a3-874b-43fd-af78-151c339249ec','2025-02-12 14:53:15.000000',128,10893588,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 15:21:06.642182','2025-02-12 15:21:06.642183'),('0c57c15c-e83f-4871-8d9e-686331622b8e','2025-02-12 12:12:08.000000',124,10894129,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:12:09.524070','2025-02-12 12:12:09.524070'),('0c6c357a-be44-4e5b-8944-1f3b40f0cd96','2025-02-07 16:14:26.000000',0,279,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-07 16:14:27.095777','2025-02-07 16:14:27.095777'),('0df7f681-c0f5-4ffa-8b2e-6a3c4c1a4a1b','2025-02-12 12:13:35.000000',36,10920174,'Acesso n?o autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:13:36.298036','2025-02-12 12:13:36.298036'),('0e1116d5-4823-473f-be37-4301dfcf6e69','2025-02-12 14:51:49.000000',38,10960269,'Acesso n?o autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 14:51:50.191089','2025-02-12 14:51:50.191089'),('0e2d8c32-dd21-40c5-8856-ada24acfbc49','2025-02-12 12:10:04.000000',30,9127895,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:10:05.551265','2025-02-12 12:10:05.551266'),('0e81f0f4-b1d8-4a30-ae9e-986647c0bc93','2025-02-10 10:08:18.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-10 10:08:19.379731','2025-02-10 10:08:19.379731'),('0f7dc89a-7b23-4e77-b8fd-f6f39ab6574a','2025-02-12 11:27:18.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:27:21.071497','2025-02-12 11:27:21.071497'),('0fecfc25-5e2d-4e91-b4be-1d68257fd91b','2025-02-07 14:58:21.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:58:22.272547','2025-02-07 14:58:22.272547'),('0ffb4544-2191-404f-93b7-9003285582dd','2025-02-07 15:01:52.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 15:01:52.540331','2025-02-07 15:01:52.540331'),('1115017c-04af-4f5c-911f-ca6f158456d3','2025-02-07 16:15:01.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 16:15:02.921026','2025-02-07 16:15:02.921027'),('1171f1b7-51c0-4449-af45-0e49387a3f10','2025-02-12 10:59:18.000000',96,10891989,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 10:59:19.659428','2025-02-12 10:59:19.659428'),('12699302-bdac-4c34-b184-033375c4b908','2025-02-10 16:54:04.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 16:54:06.374892','2025-02-10 16:54:06.374892'),('13ac2196-6cb5-46df-bf2d-0c3e2c7a6f43','2025-02-07 14:59:02.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:59:03.642189','2025-02-07 14:59:03.642189'),('1656efc6-183d-459c-9a2c-2935601e648d','2025-02-11 11:30:41.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000319',2,'2025-02-11 11:30:43.694577','2025-02-11 11:30:43.694577'),('16db7c8b-2108-48a8-8ba4-b67f476176ca','2025-02-12 14:54:14.000000',101,10891726,'Acesso n?o autorizado',23,2,4,'TFP5235000318',0,'2025-02-12 14:54:15.652106','2025-02-12 14:54:15.652106'),('1816e880-e867-4fa3-b113-88933ad2b4bc','2025-02-07 15:09:46.000000',9,10832577,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:09:46.459948','2025-02-07 15:09:46.459948'),('191b31d5-49ca-40db-a88a-b2413c392a74','2025-02-07 15:16:11.000000',9,10832577,'Per?odo de tempo inv?lido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:12.076440','2025-02-07 15:16:12.076440'),('1acd2576-60e3-486c-b602-f9573a9cc17f','2025-02-05 17:02:39.000000',0,264,'N?o registrado',27,1,4,'TFP5235000453',0,'2025-02-05 17:02:40.073418','2025-02-05 17:02:40.073418'),('1c5c4e66-d875-445b-a11a-c949db91b3b4','2025-02-12 12:08:53.000000',12,9124359,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:54.326930','2025-02-12 12:08:54.326930'),('1d0b78a9-7ac6-48c0-958c-bf516b64008e','2025-02-12 12:04:36.000000',0,9124357,'N?o registado',27,2,4,'TFP5235000422',0,'2025-02-12 12:04:37.505924','2025-02-12 12:04:37.505925'),('1e86ccae-75d1-48f8-a936-8af737788b46','2025-02-12 11:30:13.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:30:13.955210','2025-02-12 11:30:13.955210'),('1edf7a46-4628-496f-9b5f-3e5b47d544cf','2025-02-10 09:24:55.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-10 09:24:56.324790','2025-02-10 09:24:56.324790'),('1ef5c2c5-225e-4c12-821d-730d7b752114','2025-02-05 17:02:45.000000',36,267,'Abertura efetuada',0,2,4,'TFP5235000453',0,'2025-02-05 17:02:46.812123','2025-02-05 17:02:46.812123'),('1f7561cf-efc4-45bf-9eaf-12d02d6690d2','2025-02-18 12:21:21.000000',0,486586838,'Não registado',27,1,4,'GQS2235000391',0,'2025-02-18 12:21:21.317042','2025-02-18 12:21:21.317290'),('1f9f8fad-9aad-43ef-b0b6-6b2ec7b2a62e','2025-02-12 10:54:20.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 10:54:22.460048','2025-02-12 10:54:22.460048'),('20456f6d-7810-4590-849e-d52ae1d750c1','2025-02-12 12:10:09.000000',0,9127895,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:10:10.294449','2025-02-12 12:10:10.294449'),('21698f0c-6123-441e-8abc-8f5604f6b56f','2025-02-12 14:42:02.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 14:42:03.982939','2025-02-12 14:42:03.982939'),('22b1f33e-39e9-441b-9843-556a40e022a4','2025-02-07 15:16:18.000000',9,10832577,'Per?odo de tempo inv?lido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:19.890549','2025-02-07 15:16:19.890549'),('22f79743-da91-4207-b03c-27a47baaeddb','2025-02-12 12:10:27.000000',32,9127894,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:10:28.780176','2025-02-12 12:10:28.780177'),('231b0dc4-0ecb-4460-a66a-75045cfa4bf6','2025-02-12 12:16:29.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:16:30.681925','2025-02-12 12:16:30.681925'),('233297f6-4511-45c9-a7e1-c90b8e6d3367','2025-02-11 11:30:58.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000422',2,'2025-02-11 11:30:59.807162','2025-02-11 11:30:59.807162'),('23606527-b49c-45d9-96ea-0ad3ccdd2dae','2025-02-12 12:10:05.000000',0,9127895,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:10:06.369114','2025-02-12 12:10:06.369114'),('248f6366-d1d8-40dc-85c0-4385ed1f1c1c','2025-02-12 12:08:32.000000',0,10832577,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:08:33.433726','2025-02-12 12:08:33.433726'),('26520715-0438-4b27-9d7c-63fb19877f0e','2025-02-12 11:00:01.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:00:02.721019','2025-02-12 11:00:02.721020'),('26d57be6-deba-453b-a82c-34eb1c25ca15','2025-02-11 09:36:59.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',2,'2025-02-11 09:36:59.936135','2025-02-11 09:36:59.936135'),('2762f79c-6d10-46ac-ae41-8919f642583f','2025-02-12 10:56:19.000000',86,10958427,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:56:20.874735','2025-02-12 10:56:20.874735'),('2786ce0a-d9e4-4b9f-9797-30ed4d1bf628','2025-02-12 12:14:57.000000',220,10830074,'Acesso n?o autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:14:58.240221','2025-02-12 12:14:58.240221'),('27e45375-eb6f-428d-ae9f-bccb321bed78','2025-02-07 16:13:57.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:13:58.033978','2025-02-07 16:13:58.033978'),('288ff981-f528-4263-afd8-e33bd123f968','2023-12-10 01:35:40.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('289afe11-6849-4b2e-9d2e-c07f50e852ef','2025-02-12 11:00:08.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:00:10.210733','2025-02-12 11:00:10.210733'),('2903d42c-ec78-4423-9b94-7ff6804d1a67','2025-02-12 12:11:46.000000',0,10891989,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:11:47.963794','2025-02-12 12:11:47.963795'),('29a7533a-5d3c-4267-8e04-c9d9860218b7','2025-02-12 12:12:10.000000',124,10894129,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:12:11.648876','2025-02-12 12:12:11.648876'),('2bea70e3-cb45-4642-b148-ee2f4dbca60d','2025-02-10 09:55:54.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 09:55:56.246071','2025-02-10 09:55:56.246071'),('2c1a6f93-5e1f-4551-99b2-7fda2aec90ff','2025-02-05 16:29:18.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',1,'2025-02-05 16:29:18.777100','2025-02-05 16:29:18.777100'),('2ca6f4c2-3837-4091-b681-8adc88602e39','2025-02-07 15:06:29.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 15:06:30.153308','2025-02-07 15:06:30.153308'),('2d124d41-4638-43d5-b359-d8e940a8bc34','2025-02-10 16:47:03.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:47:04.255007','2025-02-10 16:47:04.255007'),('2d30a24f-79b3-4387-9d5d-ff7eec8e74a7','2025-02-07 15:16:07.000000',9,10832577,'Per?odo de tempo inv?lido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:08.271986','2025-02-07 15:16:08.271986'),('2efda55e-9e13-4242-9463-c5f54a0dd2dd','2025-02-10 09:22:35.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 09:22:36.998369','2025-02-10 09:22:36.998369'),('2f80139c-201e-4cad-a208-4fb34fafa152','2025-02-12 12:14:59.000000',220,10830074,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:15:00.670708','2025-02-12 12:15:00.670708'),('3116bac9-ebc3-4447-a500-e9153eb559ae','2025-02-07 15:46:38.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 15:46:39.181999','2025-02-07 15:46:39.181999'),('313d4195-408e-470e-867c-8b85e2ec56d6','2025-02-07 14:57:37.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:57:38.780653','2025-02-07 14:57:38.780653'),('31a1c823-8ab4-4911-89c0-4af47f37366d','2023-12-10 02:42:41.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('32986eed-23c3-446c-8e44-5748725c1327','2025-02-12 12:10:11.000000',0,9127895,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:10:12.286451','2025-02-12 12:10:12.286451'),('329fefae-7aa9-469c-9753-61f58e159bd8','2025-02-12 12:14:14.000000',36,10920174,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:14:16.596581','2025-02-12 12:14:16.596582'),('343b7d8e-e784-4d0e-a5cc-c286b756a9bf','2025-02-12 12:08:30.000000',9,10832577,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:31.645664','2025-02-12 12:08:31.645664'),('35ebc630-d0ee-4c1a-9284-d84f8d58e8c3','2025-02-12 14:53:28.000000',128,10893588,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:53:29.316419','2025-02-12 14:53:29.316420'),('36f2f633-c1cc-4e61-b2fb-6f8d420b9e36','2025-02-12 10:59:57.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 10:59:59.252909','2025-02-12 10:59:59.252909'),('3719dc83-baa1-47ed-93cf-0572c338286c','2025-02-07 16:14:30.000000',0,279,'N?o registado',27,1,4,'TFP5235000318',0,'2025-02-07 16:14:30.674080','2025-02-07 16:14:30.674081'),('37fc02ea-b9c4-4a67-8185-0a2766751f1e','2025-02-12 10:54:29.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:54:31.477962','2025-02-12 10:54:31.477962'),('38f0bdd6-d091-4915-b1fb-c05736acf9ad','2025-02-12 12:09:57.000000',27,10920487,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:09:58.293016','2025-02-12 12:09:58.293016'),('39924eab-ec3c-46d8-8d75-dab2fd9b3a1b','2025-02-07 10:20:39.000000',0,6586851,'N?o registrado',27,1,4,'TFP5235000318',0,'2025-02-07 10:20:39.561437','2025-02-07 10:20:39.561437'),('3a1dc1f0-ef58-4cf3-8c7e-33abd633867a','2023-12-10 01:36:15.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('3a9d7b3d-d7dd-49c3-983c-722cc08cea80','2023-12-10 01:36:15.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('3bf7220d-d912-4180-ad6b-cccd6ad238e2','2025-02-12 12:12:07.000000',0,10894129,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:12:10.002116','2025-02-12 12:12:10.002117'),('3d604e8d-c561-484b-a2ea-1360bdb75662','2025-02-10 09:58:15.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 09:58:17.832380','2025-02-10 09:58:17.832380'),('40053d09-f356-4d34-aceb-bca273d2d444','2023-12-10 03:33:45.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('4128184d-fbe2-4e19-ac86-acfe6f1c4b71','2025-02-12 11:27:30.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:27:31.300420','2025-02-12 11:27:31.300420'),('413bbcab-9134-4859-89a6-5ab0be9d8bdb','2025-02-12 12:09:20.000000',0,9124361,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:09:23.356019','2025-02-12 12:09:23.356020'),('4150923e-be81-491e-ae49-102c5356954d','2025-02-12 12:14:17.000000',36,10920174,'Acesso n?o autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:14:18.595169','2025-02-12 12:14:18.595169'),('41b5d023-471b-4a16-ae03-cffd23ef2926','2025-02-12 14:41:10.000000',164,10813084,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:41:11.404087','2025-02-12 14:41:11.404088'),('43014f07-5416-478b-89c4-8b90d2e1de45','2025-02-12 10:57:07.000000',86,10958427,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 10:57:08.918336','2025-02-12 10:57:08.918336'),('4306253f-83a0-4a8f-9614-7f6551eb1c8d','2025-02-12 12:07:46.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:07:47.732317','2025-02-12 12:07:47.732317'),('433b12ea-fb79-4f8c-881a-1383f574733c','2025-02-12 12:17:19.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:17:20.619464','2025-02-12 12:17:20.619464'),('43e2e7e8-029d-4623-9bed-2a3b5018f694','2025-02-12 12:10:24.000000',0,9127894,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:10:25.675305','2025-02-12 12:10:25.675305'),('44b30965-14d0-4ef8-92dc-7799f02d7775','2025-02-10 16:29:00.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 16:29:02.204288','2025-02-10 16:29:02.204288'),('44bbd6c9-20ba-4ceb-89ec-44ce48d50615','2025-02-12 10:53:02.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:53:03.072232','2025-02-12 10:53:03.072232'),('44c3a85e-56f5-4f89-b154-5682cd683d30','2025-02-12 10:55:11.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 10:55:12.654776','2025-02-12 10:55:12.654777'),('458e5059-8070-4ec9-bd03-7be576447164','2025-02-05 16:49:19.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 16:49:20.395165','2025-02-05 16:49:20.395166'),('46de4fcc-19d9-4cf8-97d6-50d3d6b384c4','2025-02-10 16:54:08.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-10 16:54:09.805361','2025-02-10 16:54:09.805361'),('47b69f38-c05f-4857-81f5-36a08e54d32e','2025-02-12 12:09:47.000000',0,10920487,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:09:50.109239','2025-02-12 12:09:50.109240'),('49476d32-4b64-4b6a-afd5-d4b9476e8a31','2025-02-12 12:10:21.000000',0,9127894,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:10:23.562557','2025-02-12 12:10:23.562557'),('4d20259a-14a7-416e-b9cb-84057097f664','2025-02-07 15:17:25.000000',9,10832577,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:17:26.735662','2025-02-07 15:17:26.735662'),('4d917a66-fe54-4306-8cf1-e699d3bc52b5','2025-02-12 12:26:34.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-12 12:26:35.244506','2025-02-12 12:26:35.244506'),('4db98340-1df4-4a6b-b3f8-9a68b29dd384','2025-02-10 10:02:59.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 10:03:01.551396','2025-02-10 10:03:01.551396'),('4f536ab6-19b8-4fb9-9b17-1009db4f909d','2025-02-12 12:25:54.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:25:55.314998','2025-02-12 12:25:55.314998'),('4f682a2c-980e-4e36-ad1a-9cfecb684b5d','2025-02-07 10:20:00.000000',165,10813380,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:20:00.458474','2025-02-07 10:20:00.458474'),('4fc0dc99-7c7e-4567-b061-cdcb8e2923b1','2023-12-10 03:19:34.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('507342f0-8c23-485e-bfef-5bc0aef8c047','2025-02-10 16:53:06.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-10 16:53:08.467641','2025-02-10 16:53:08.467641'),('50c9247f-b825-4f66-9b5d-292f7f4a6958','2025-02-07 15:16:21.000000',9,10832577,'Per?odo de tempo inv?lido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:22.274341','2025-02-07 15:16:22.274341'),('5153ee9c-f696-42de-878f-f1dfcb7c965a','2025-02-12 10:59:09.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:59:11.243793','2025-02-12 10:59:11.243793'),('529b5ad8-b0b4-41f3-bfdf-1f79c8ff174d','2025-02-10 10:06:48.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 10:06:50.079874','2025-02-10 10:06:50.079875'),('52f5afe2-d635-4c5b-a165-8c1ed12cf182','2025-02-12 12:14:58.000000',220,10830074,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:14:59.230450','2025-02-12 12:14:59.230450'),('52f72727-34b5-4aa8-b5b5-2decad1d5bdb','2023-12-10 01:35:38.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('53d1cbac-c926-4807-a251-60892dca9d3a','2025-02-07 14:59:44.000000',27,10920487,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:59:45.364297','2025-02-07 14:59:45.364298'),('54cb29cc-c9a9-4910-bf48-86252e84b020','2025-02-12 12:07:50.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:07:51.167715','2025-02-12 12:07:51.167715'),('55312bcd-29b7-40bb-a77e-952dd459774a','2025-02-12 12:15:05.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:15:08.027973','2025-02-12 12:15:08.027973'),('5614e24d-e5e9-4c46-9071-bbe92461fc95','2025-02-07 10:17:35.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:17:35.942970','2025-02-07 10:17:35.942970'),('561a765f-7b4a-4058-8773-8487b2c2f8f5','2025-02-10 09:23:09.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 09:23:09.727272','2025-02-10 09:23:09.727272'),('5718da4c-4c96-4f1b-b4be-ecb68072b5e8','2023-12-10 03:19:35.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('579998c7-2484-4306-b120-435f0b241266','2023-12-10 03:33:57.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('57f4d044-0fa9-48d3-8ce6-b2bda672594c','2025-02-12 12:12:42.000000',0,10807101,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:12:43.796994','2025-02-12 12:12:43.796994'),('5832d261-5d18-49d2-b1d3-cc2ae0879936','2025-02-12 12:25:05.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:25:06.937708','2025-02-12 12:25:06.937708'),('58863e96-631e-44cc-8d3d-8e05fe9edf00','2025-02-10 09:58:19.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-10 09:58:20.832350','2025-02-10 09:58:20.832350'),('59152988-0059-4fc8-83be-c243c8d40ad3','2025-02-05 16:25:34.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-05 16:25:35.082430','2025-02-05 16:25:35.082430'),('59448927-96dd-4099-b4db-a4266f299c10','2023-12-10 03:33:57.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('594d93c9-28df-4d4b-8a87-199004c19544','2025-02-10 16:48:58.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:48:59.373564','2025-02-10 16:48:59.373564'),('5993cb1e-1d44-48d3-9fd1-eba8bed253fa','2025-02-05 17:01:34.000000',36,267,'Acesso n?o autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 17:01:35.390344','2025-02-05 17:01:35.390344'),('5a184c18-d819-4e20-a16f-9de2f706f929','2025-02-10 16:48:44.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 16:48:47.207918','2025-02-10 16:48:47.207918'),('5a563bcd-4c5b-4e24-b7fe-ba5c23dc243f','2025-02-07 15:14:08.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000422',0,'2025-02-07 15:14:08.832248','2025-02-07 15:14:08.832248'),('5ae45402-e790-4c8a-b181-8de844c2e447','2025-02-07 16:14:43.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:14:44.760932','2025-02-07 16:14:44.760932'),('5b31ac46-8fbe-4585-8133-348587ac76d5','2025-02-07 10:21:36.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:21:37.176216','2025-02-07 10:21:37.176217'),('5b651572-dcf6-4853-a641-e8661c218ad4','2025-02-12 11:17:03.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:17:05.666825','2025-02-12 11:17:05.666825'),('5b6a7c15-bc7c-439a-b7b1-953785191e4b','2025-02-07 15:46:57.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:46:57.973261','2025-02-07 15:46:57.973262'),('5baad7f2-3805-44fe-9706-9ae4df0ca0b7','2025-02-12 12:14:54.000000',220,10830074,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-12 12:14:55.351606','2025-02-12 12:14:55.351606'),('5bea3fd6-cbc8-42e8-8f3a-5e09953de10a','2025-02-07 16:13:03.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 16:13:04.959623','2025-02-07 16:13:04.959623'),('5d5fe4c0-939b-45f9-a635-454150580034','2025-02-12 14:54:11.000000',101,10891726,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 15:21:07.180142','2025-02-12 15:21:07.180142'),('5ff9fa3b-9119-4fd5-82ef-a428f3003610','2025-02-05 16:20:30.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-05 16:20:30.669445','2025-02-05 16:20:30.669445'),('60c1c96f-9d1e-46a4-8398-96f2d0570052','2025-02-12 11:26:39.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:26:40.560159','2025-02-12 11:26:40.560159'),('611064e0-5108-4da7-ad4e-fb15541f27f3','2025-02-12 11:22:26.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:22:27.716277','2025-02-12 11:22:27.716277'),('62201927-8b97-47de-b60e-3e8dbf1b2c03','2025-02-05 17:07:28.000000',0,264,'N?o registrado',27,1,4,'TFP5235000453',0,'2025-02-05 17:07:28.700592','2025-02-05 17:07:28.700592'),('626ff303-361d-4741-83c7-326503ac81e0','2025-02-12 12:15:09.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:15:10.495597','2025-02-12 12:15:10.495597'),('633840bb-1304-4458-a915-2109c92a33a3','2025-02-12 12:09:53.000000',27,10920487,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:09:54.839133','2025-02-12 12:09:54.839133'),('63d39a14-577c-493e-a7e2-eb31ddc753fc','2025-02-05 17:02:53.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 17:02:54.372276','2025-02-05 17:02:54.372276'),('63f17251-4766-472a-b518-d94c43f445be','2025-02-12 12:08:45.000000',12,9124359,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:46.681074','2025-02-12 12:08:46.681075'),('6454b954-a8fc-42ce-b74f-d91f6e290159','2025-02-12 10:53:11.000000',0,10805211,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 10:53:11.789299','2025-02-12 10:53:11.789299'),('64904afd-b023-41c8-a0b6-7665535e1e3d','2025-02-12 12:13:42.000000',36,10920174,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:13:44.107095','2025-02-12 12:13:44.107096'),('64eb7100-899b-480c-9458-76a38b3c117b','2025-02-07 15:44:45.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-07 15:44:46.407529','2025-02-07 15:44:46.407530'),('64f1a79c-8d83-444c-ab42-b7ca0b0f0b24','2025-02-12 12:11:47.000000',96,10891989,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:11:48.503667','2025-02-12 12:11:48.503668'),('6683867a-2118-4719-8536-85061573bdf7','2023-12-10 03:33:47.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('680a7b88-c880-4a59-8e69-d73a7a785a70','2025-02-10 09:22:49.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 09:22:50.649096','2025-02-10 09:22:50.649096'),('68b4083f-f65c-4423-afa6-2f73a836430f','2023-12-10 03:34:09.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('68eca08a-4f4e-4797-9be6-bdaa68d6349c','2025-02-12 12:25:10.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:25:11.724511','2025-02-12 12:25:11.724511'),('698beba3-56a9-4274-882d-73a915ca0c66','2025-02-12 12:08:17.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:08:18.751722','2025-02-12 12:08:18.751723'),('69c14fd4-8b8f-4b60-9089-dc94e1317dad','2023-12-10 03:19:33.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('6a884f3f-fe91-438b-870b-737f567bd35d','2025-02-10 09:58:33.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 09:58:35.767683','2025-02-10 09:58:35.767683'),('6aff3acb-105e-4fa6-91ba-39328d971789','2025-02-12 10:58:55.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:58:56.415622','2025-02-12 10:58:56.415623'),('6d9fac6c-35cd-459b-bb84-ecc1a5a67268','2025-02-18 12:21:36.000000',0,486586838,'Não registado',27,1,4,'GQS2235000391',0,'2025-02-18 12:21:35.870305','2025-02-18 12:21:35.870305'),('6e17c145-d032-481e-a515-5a6c48fabfda','2023-12-10 03:33:47.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('6e44a75c-4e55-4e1c-8b93-fecf5f4f4445','2023-12-10 01:36:13.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('6ec2e35d-8bed-4947-9c09-94a5577f5ece','2025-02-10 16:44:02.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:44:04.346715','2025-02-10 16:44:04.346716'),('6ecb531a-e873-4546-b324-ff32a6f8714d','2025-02-05 16:53:59.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 16:54:00.836265','2025-02-05 16:54:00.836266'),('706143de-94a7-45d0-b35f-bd5200ceb90d','2025-02-07 15:37:38.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000453',1,'2025-02-07 15:37:39.411877','2025-02-07 15:37:39.411877'),('7181faaa-f2df-4bcb-bab8-04bc3c0db29a','2025-02-12 11:21:54.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:21:56.437567','2025-02-12 11:21:56.437567'),('718ac731-95ad-49d6-8e11-71446f3a234a','2023-12-10 02:42:41.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('7251e2bd-25b8-4bce-9333-eef8fb305a67','2025-02-10 16:46:07.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:46:10.262123','2025-02-10 16:46:10.262123'),('734708d8-6129-467f-8e55-13ed0c94417e','2025-02-07 15:41:06.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-07 15:41:07.499899','2025-02-07 15:41:07.499900'),('75374090-cc22-43a5-b64f-c4db02ba66fe','2025-02-12 12:11:41.000000',96,10891989,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:11:42.567418','2025-02-12 12:11:42.567419'),('75a801a2-f86a-466d-a216-95c7265541af','2025-02-07 16:13:59.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-07 16:14:00.019688','2025-02-07 16:14:00.019688'),('761ca441-2229-4156-b465-cdb43e3b54f3','2025-02-12 11:19:42.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:19:43.485709','2025-02-12 11:19:43.485710'),('764f5a1a-a576-46df-bbc3-59151d172df2','2023-12-10 03:33:48.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('766a149d-333a-4378-9f22-c70a5c78c02b','2025-02-10 10:06:46.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-10 10:06:47.248943','2025-02-10 10:06:47.248944'),('76e2a3e4-ed82-4983-9608-c689392fc7b3','2025-02-07 14:55:39.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:55:40.121950','2025-02-07 14:55:40.121950'),('7719faac-15a7-45cd-83b7-ea1abab9840b','2025-02-12 12:08:31.000000',9,10832577,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:32.635335','2025-02-12 12:08:32.635335'),('786dc9ff-2d27-4420-8845-20ab3f81e145','2023-12-10 01:35:38.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('7882ce00-1e03-4318-bdf8-98e88b9f4aea','2025-02-12 11:00:02.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:00:03.512756','2025-02-12 11:00:03.512757'),('78b57ec6-a67f-4bf0-8908-fa8e36782f69','2025-02-07 15:39:41.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-07 15:39:41.780137','2025-02-07 15:39:41.780137'),('78da4395-a298-4ca1-86a2-9f4f146b5b83','2025-02-10 16:53:02.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 16:53:04.178241','2025-02-10 16:53:04.178241'),('79a03fdb-4d99-4b5b-82fa-b768b26bd0f6','2025-02-12 12:13:31.000000',36,10920174,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:13:33.903496','2025-02-12 12:13:33.903496'),('7a57413b-b317-4c4a-9ab7-90cdea1040ef','2025-02-12 14:54:48.000000',101,10891726,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:54:49.567800','2025-02-12 14:54:49.567800'),('7a9f467e-0343-4d3a-b229-2a9531f0cba4','2025-02-07 15:46:59.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:46:59.740981','2025-02-07 15:46:59.740981'),('7b1f1f1b-e32c-44de-913b-1a0739a75b32','2023-12-10 01:36:12.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('7b601120-34f6-46ba-aa35-5f0a6b4cc56e','2025-02-07 10:19:01.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:19:01.705888','2025-02-07 10:19:01.705888'),('7b6b8dc9-3c0a-4fb3-a7a0-8c42eafe13ef','2025-02-12 12:17:32.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:17:33.892774','2025-02-12 12:17:33.892775'),('7b75416b-70bc-49c1-ab33-21b7c3b0855e','2025-02-07 15:39:42.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000453',1,'2025-02-07 15:39:43.746557','2025-02-07 15:39:43.746557'),('7bdeaab8-1c79-4fc0-9c76-0f87c1a9f958','2025-02-07 15:44:39.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-07 15:44:41.202185','2025-02-07 15:44:41.202185'),('7d37d84e-6146-4ea9-a905-44252497a73c','2025-02-12 12:07:53.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:07:54.841939','2025-02-12 12:07:54.841940'),('7d6e48cd-983d-47de-b881-7be62ed99603','2023-12-10 03:19:35.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('7ded82b4-b450-48e9-a7a8-a6d8a886791e','2025-02-12 12:15:08.000000',221,10829761,'Acesso n?o autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:15:09.742773','2025-02-12 12:15:09.742773'),('7e2c1118-234a-4302-b386-733260740502','2025-02-07 15:37:32.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:37:32.924733','2025-02-07 15:37:32.924733'),('7e744750-b0a0-4d51-b0e7-e27c6bcc9a1f','2025-02-12 11:27:07.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 11:27:07.769721','2025-02-12 11:27:07.769721'),('7fdb4585-7472-4494-8737-82ea882eda9d','2023-12-10 03:33:55.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('80155f30-077b-4090-8d60-2641a9245635','2025-02-12 10:59:59.000000',5,9124357,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:00:01.152961','2025-02-12 11:00:01.152961'),('809e30df-f1c0-44a1-a48d-531c605b1596','2025-02-10 10:01:10.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 10:01:12.750546','2025-02-10 10:01:12.750547'),('811ab528-35cd-4690-8a37-24d44e2d3782','2025-02-07 14:59:17.000000',9,10832577,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:59:18.758107','2025-02-07 14:59:18.758107'),('818ba268-6675-459f-9257-4926c93b1f6a','2025-02-12 12:08:19.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:20.871714','2025-02-12 12:08:20.871715'),('81e60937-041c-4f71-b573-f408043ceb99','2025-02-12 10:56:13.000000',0,10958427,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 10:56:15.042405','2025-02-12 10:56:15.042405'),('824f3d15-b379-4f50-ba94-d150980a7a5a','2025-02-18 12:22:10.000000',0,1110061828,'Não registado',27,1,4,'GQS2235000391',0,'2025-02-18 12:22:10.100211','2025-02-18 12:22:10.100211'),('82561f39-1084-46d0-840a-243f99cb2d41','2025-02-12 14:54:22.000000',101,10891726,'Acesso n?o autorizado',23,2,4,'TFP5235000318',0,'2025-02-12 14:54:23.105933','2025-02-12 14:54:23.105933'),('828e7776-75ef-4cb3-b1d0-19f1b93bbf86','2023-12-10 01:35:36.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('82e72eae-e385-4e9d-9f8c-1d31920934ca','2025-02-12 12:14:12.000000',0,10920174,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:14:13.581755','2025-02-12 12:14:13.581755'),('836c698d-617e-403e-82d4-04a562c4bc7f','2025-02-12 14:53:22.000000',128,10893588,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:53:23.535569','2025-02-12 14:53:23.535569'),('83a20ec9-793c-42fc-8192-0f6b4d14443a','2025-02-12 12:12:41.000000',200,10807101,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:12:42.864771','2025-02-12 12:12:42.864772'),('8478b5ba-5382-42a3-b7e1-be8c92a455b5','2025-02-12 12:10:02.000000',30,9127895,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:10:03.785249','2025-02-12 12:10:03.785250'),('84df37ac-5429-4e6b-9d55-51327c2bbb86','2025-02-12 12:13:37.000000',36,10920174,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:13:38.341050','2025-02-12 12:13:38.341050'),('85a00438-4ec4-4bcf-800e-8eabda1f3baa','2025-02-07 16:13:02.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 16:13:03.320573','2025-02-07 16:13:03.320573'),('8657c644-efd2-49a3-812d-50d620756355','2023-12-10 03:19:32.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('869cb1c1-ca1a-4057-81af-9d98f1869615','2025-02-12 12:08:34.000000',0,10832577,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:08:35.255874','2025-02-12 12:08:35.255874'),('876d2dbe-0f04-4776-8c0d-bbe2c827edc1','2025-02-10 09:58:26.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 09:58:28.255523','2025-02-10 09:58:28.255524'),('89a8ea5e-968e-4d60-a9fa-b44cd6234828','2025-02-05 16:53:57.000000',36,267,'Acesso n?o autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:53:58.483474','2025-02-05 16:53:58.483474'),('89ef1c07-5d3b-450b-a0e2-e3da6d523166','2025-02-05 16:52:21.000000',36,267,'Acesso n?o autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:52:22.101405','2025-02-05 16:52:22.101405'),('8a3b242c-607e-4d76-9c75-3e18a94982a0','2025-02-07 15:10:54.000000',9,10832577,'N?o registrado',27,1,4,'TFP5235000422',0,'2025-02-07 15:13:02.690782','2025-02-07 15:13:02.690782'),('8d737462-52e0-422b-9a97-9afe3ee4676e','2025-02-05 16:29:04.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-05 16:29:04.580564','2025-02-05 16:29:04.580564'),('8df2bcdf-2c97-49f9-b6aa-d73f2236de6c','2025-02-12 12:12:12.000000',124,10894129,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:12:13.753221','2025-02-12 12:12:13.753221'),('8e8f76ef-1abb-4d90-bda1-58f7a63e4864','2025-02-07 15:39:35.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:39:36.178313','2025-02-07 15:39:36.178313'),('8f1289c3-2ba5-411e-83a8-2f6b63904769','2025-02-05 16:23:26.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',2,'2025-02-05 16:23:26.689182','2025-02-05 16:23:26.689182'),('90e5c72e-a263-49a7-ba21-1cf6c0aa4508','2023-12-10 03:33:56.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('920e266c-926f-4d79-b59d-395e5939a766','2023-12-10 03:34:08.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('924b1368-2423-4f9c-8635-f9c5d9ff179e','2025-02-10 16:48:29.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-10 16:48:32.004302','2025-02-10 16:48:32.004302'),('937ea538-d994-4c9a-a832-910a3010f3f3','2025-02-12 11:27:09.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:27:11.038355','2025-02-12 11:27:11.038356'),('93e49293-aca0-431a-99a6-c36b9fe84f1f','2025-02-12 12:09:17.000000',24,9124361,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:09:19.004128','2025-02-12 12:09:19.004129'),('941bfb35-19e4-412b-bb6a-bd46e3690457','2025-02-12 14:43:18.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:43:19.517606','2025-02-12 14:43:19.517606'),('94270642-79d2-4d28-878e-c324a0bd08d3','2025-02-12 11:16:10.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:16:11.578759','2025-02-12 11:16:11.578759'),('94ab223c-8ba1-4092-b1b0-77ef7874741b','2025-02-12 14:41:28.000000',164,10813084,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 14:41:30.007957','2025-02-12 14:41:30.007957'),('96243064-cb12-43c9-8250-c86c09a25ad5','2023-12-10 01:35:40.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('969c5759-9c7a-487d-a836-4dc8d6035da6','2025-02-12 12:12:38.000000',200,10807101,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:12:39.750118','2025-02-12 12:12:39.750119'),('973d146d-7e8e-4ad8-9c3d-fc83e0c1445d','2025-02-10 16:48:54.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:48:57.062680','2025-02-10 16:48:57.062680'),('97715e5f-bf3c-4a0f-891f-88e6285bc051','2025-02-07 16:14:41.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:14:42.576206','2025-02-07 16:14:42.576206'),('98462cdb-8aa4-40da-a15e-4f3f9457c56a','2025-02-12 12:07:41.000000',5,9124357,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:07:42.876169','2025-02-12 12:07:42.876169'),('98549d1b-1827-44e5-88ff-f19fbe6a2f0b','2023-12-10 01:36:11.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('99963da9-5b1e-4346-ab9e-9c346e4c3d49','2025-02-12 12:25:08.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:25:10.200607','2025-02-12 12:25:10.200608'),('9a94a8ce-9c06-469d-9951-3a481a4d574b','2025-02-12 11:26:42.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:26:43.294288','2025-02-12 11:26:43.294288'),('9b2e698c-ae31-417f-b87d-b2325d0e36b6','2025-02-12 12:26:38.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000422',0,'2025-02-12 12:26:39.016102','2025-02-12 12:26:39.016102'),('9b9ad37f-4060-4d1e-99fb-170b72d62aef','2023-12-10 03:33:54.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('9be7cdf7-a2cc-4f9f-bd0a-d28a314fd2fb','2025-02-12 12:25:52.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:25:53.812621','2025-02-12 12:25:53.812621'),('9c4d6e78-8436-47b0-b0e7-e8ed273b37dd','2025-02-10 10:08:15.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-10 10:08:16.539639','2025-02-10 10:08:16.539639'),('9ca58879-0330-4957-9a32-afb708e2c282','2025-02-12 12:08:15.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:16.927700','2025-02-12 12:08:16.927700'),('9cedbf71-009f-4c2f-892b-9162095f867e','2025-02-07 15:47:17.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-07 15:47:18.150386','2025-02-07 15:47:18.150386'),('9db90a0d-2ea8-4cc0-92b8-99832e658e7e','2025-02-07 16:22:16.000000',0,1180213558,'N?o registado',27,1,4,'TFP5235000453',1,'2025-02-07 16:22:16.860869','2025-02-07 16:22:16.860870'),('a0bc8bbe-d522-4d59-b5dd-4c23168ad56c','2025-02-12 12:16:26.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:16:28.008594','2025-02-12 12:16:28.008595'),('a0bf458c-de6b-4f2f-a6b4-860caecc789c','2025-02-12 14:52:00.000000',164,10813084,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 14:52:01.758363','2025-02-12 14:52:01.758363'),('a10fe60d-1971-4c79-ab06-16f9696a0563','2025-02-12 12:09:20.000000',0,9124361,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:09:21.295237','2025-02-12 12:09:21.295238'),('a12ef075-69a2-4634-bc4d-5ec3835c9cc1','2023-12-10 03:33:45.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('a13bdecc-a2ac-4c25-8842-050883c6292d','2025-02-12 12:09:51.000000',0,10920487,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:09:52.419222','2025-02-12 12:09:52.419222'),('a189184b-8801-4e90-b985-1c10d215135a','2025-02-10 16:48:36.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-10 16:48:37.107646','2025-02-10 16:48:37.107647'),('a18e4011-447c-4eba-80c6-328c33d923aa','2025-02-12 10:59:05.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:59:07.454840','2025-02-12 10:59:07.454840'),('a252eb75-bd6e-4ce9-a5e4-c87b9b3405ef','2025-02-10 09:25:00.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-10 09:25:01.090645','2025-02-10 09:25:01.090645'),('a3e8d6f6-7e28-40be-aa89-6adfa70cd7d6','2025-02-12 12:14:20.000000',36,10920174,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:14:20.999075','2025-02-12 12:14:20.999076'),('a3eb6ba3-9a20-44e3-a8dc-af47d362644d','2025-02-12 14:54:45.000000',101,10891726,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:54:46.276568','2025-02-12 14:54:46.276569'),('a5f60369-a9bc-46c6-9de8-427601142f42','2025-02-12 11:27:26.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 11:27:27.486184','2025-02-12 11:27:27.486184'),('a5ff5155-d1ed-43a7-ae2e-cfc58102aef0','2025-02-10 16:54:06.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-10 16:54:08.084709','2025-02-10 16:54:08.084709'),('a632b4cd-3bf7-4603-a3a2-d4f2130dcc40','2025-02-07 16:14:27.000000',0,279,'N?o registado',27,2,4,'TFP5235000422',0,'2025-02-07 16:14:28.423203','2025-02-07 16:14:28.423203'),('a6a75d76-99ed-494b-9b18-eb66d01e9202','2025-02-07 16:25:49.000000',0,4,'N?o registado',27,1,4,'TFP5235000453',1,'2025-02-07 16:25:49.434845','2025-02-07 16:25:49.434846'),('a707b8ad-bcbb-4d7d-8011-a0fe9d8d3f1b','2025-02-12 12:13:39.000000',36,10920174,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:13:40.216103','2025-02-12 12:13:40.216103'),('a92902f9-66b3-4256-ac99-cbb8b00e5a71','2023-12-10 02:42:44.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('a9bfcf3d-a59f-45fe-b24a-ad3168b9a52f','2025-02-12 11:22:24.000000',5,9124357,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:22:25.046848','2025-02-12 11:22:25.046848'),('aa17ab9b-07c6-4621-b0c1-e1739b2da657','2025-02-07 15:41:09.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:41:09.997347','2025-02-07 15:41:09.997347'),('aa8649ce-dd67-40cf-bea4-4d0d217ef95d','2025-02-12 12:08:51.000000',20,9124360,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:52.878059','2025-02-12 12:08:52.878060'),('abfe886d-6892-4151-a6fb-b6049926501b','2025-02-12 12:14:54.000000',220,10830074,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:14:56.854031','2025-02-12 12:14:56.854032'),('ac0387be-e9f0-46f0-a259-677791030c94','2025-02-12 12:04:20.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000422',0,'2025-02-12 12:04:22.551434','2025-02-12 12:04:22.551434'),('ac6684a2-4e64-48c1-a352-4a2877610b91','2025-02-12 12:05:48.000000',0,9124357,'N?o registado',27,2,4,'TFP5235000422',0,'2025-02-12 12:05:49.184024','2025-02-12 12:05:49.184025'),('ac75c21e-4d87-485b-8bbf-e029e1711c33','2023-12-10 03:19:31.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('ad93c7e3-7922-4d1b-a094-7e1f00898192','2025-02-12 12:08:57.000000',0,9124360,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:08:58.508593','2025-02-12 12:08:58.508593'),('adb8ab55-ae3c-4ad1-b66a-f0268103c058','2025-02-10 16:46:03.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 16:46:04.748723','2025-02-10 16:46:04.748723'),('ae685e08-68b7-4333-82fb-ced24b4d2b18','2025-02-12 12:08:33.000000',0,10832577,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:08:36.162099','2025-02-12 12:08:36.162100'),('aed07c9f-dd42-489d-b6f0-59f7305f30a5','2025-02-12 12:08:58.000000',0,9124360,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:08:59.727606','2025-02-12 12:08:59.727606'),('af88108f-02a3-4834-ad80-186b16f67526','2025-02-12 10:59:25.000000',39,10803847,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 10:59:26.629773','2025-02-12 10:59:26.629773'),('b0deabbf-4349-4d2e-a324-a0dceb242083','2025-02-12 12:15:05.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-12 12:15:06.877209','2025-02-12 12:15:06.877210'),('b12523fd-1d89-4ea5-8902-8324cf6eaabb','2025-02-12 12:15:11.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:15:12.453571','2025-02-12 12:15:12.453572'),('b25b1f74-65df-40df-9267-1e50c986d445','2025-02-12 12:12:44.000000',200,10807101,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:12:45.552049','2025-02-12 12:12:45.552050'),('b4daf69b-6cd5-4e81-876d-ea184970c8d2','2025-02-07 15:46:40.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-07 15:46:41.078233','2025-02-07 15:46:41.078233'),('b53dbecc-6913-41b1-96fc-59294ca7dbd1','2025-02-12 12:14:18.000000',36,10920174,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:14:19.317662','2025-02-12 12:14:19.317663'),('b6b16a08-793f-4711-bc82-9292ec171a19','2025-02-07 16:14:55.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 16:14:56.415609','2025-02-07 16:14:56.415609'),('b7ea8e27-0656-462a-accf-87d3f1ab39c3','2025-02-12 11:19:51.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:19:53.658444','2025-02-12 11:19:53.658445'),('b8cd4edc-6e34-4724-8475-83b6fb586559','2023-12-10 01:36:14.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('b9c972db-ec31-4c34-8b89-0353dbee5467','2025-02-05 17:02:43.000000',0,264,'N?o registrado',27,2,4,'TFP5235000453',0,'2025-02-05 17:02:44.084399','2025-02-05 17:02:44.084399'),('ba8bd2aa-8edc-429f-9709-7f6058eef9d7','2025-02-07 10:19:44.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 10:19:44.898336','2025-02-07 10:19:44.898336'),('bc880769-c1b1-43e4-b827-414ce8c9ebc6','2025-02-12 11:00:09.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:00:10.154181','2025-02-12 11:00:10.154181'),('bc895ecc-2be0-432c-8a07-3d3718219fe4','2025-02-07 16:13:54.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-07 16:13:54.956264','2025-02-07 16:13:54.956264'),('bd1410ee-ada8-44a8-9eac-4225a9aac8ee','2025-02-05 16:52:29.000000',36,267,'Acesso n?o autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:52:30.421198','2025-02-05 16:52:30.421198'),('bd68ddec-2641-4d31-a1c8-5604f0960297','2025-02-10 16:53:59.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-10 16:54:01.038245','2025-02-10 16:54:01.038245'),('bd8a21ab-09c0-46e5-899c-c4d2e1ef6859','2025-02-07 16:14:25.000000',0,279,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:14:26.274718','2025-02-07 16:14:26.274719'),('bde6de45-ce03-4ff3-8e67-c0313164b572','2025-02-12 12:08:54.000000',0,9124359,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:08:57.336547','2025-02-12 12:08:57.336548'),('be451f44-d570-43ed-bb4f-d217e7ea5255','2025-02-12 11:14:51.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:14:52.967095','2025-02-12 11:14:52.967095'),('becd894b-a852-4828-bb64-6a766f9c33c7','2025-02-07 16:12:57.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-07 16:12:58.211025','2025-02-07 16:12:58.211025'),('bf811174-4511-4970-b32d-1071db24cc9c','2025-02-12 14:52:21.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:52:22.145220','2025-02-12 14:52:22.145221'),('c094eeb2-fa4a-46ce-a030-4891d055580d','2025-02-10 16:48:06.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:48:08.478113','2025-02-10 16:48:08.478113'),('c132bb04-1c4b-4f64-9309-d41f177ee86d','2023-12-10 01:35:37.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('c2b3652b-05dc-4130-ab33-f3a167cdaacf','2025-02-12 12:17:35.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:17:36.271492','2025-02-12 12:17:36.271492'),('c2f19bc8-bb8f-4afb-9dd4-feba925eb4cc','2025-02-10 10:06:39.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 10:06:42.020536','2025-02-10 10:06:42.020536'),('c3893b63-c35f-4155-8203-1bd57e273da1','2025-02-07 16:13:00.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-07 16:13:01.351341','2025-02-07 16:13:01.351341'),('c3fba10a-94af-4b1c-86de-d2c0aab189ea','2023-12-10 03:34:06.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('c4b5679c-265c-4d17-8257-d85c9df6670e','2025-02-05 16:29:35.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-05 16:29:36.076219','2025-02-05 16:29:36.076220'),('c4be0f88-f694-4cf6-a6ee-37fee10247cb','2025-02-12 10:52:53.000000',153,10814870,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:52:53.863977','2025-02-12 10:52:53.863977'),('c5a82e16-1a68-4ef1-9510-044c0c805b31','2025-02-10 16:44:01.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:44:02.488095','2025-02-10 16:44:02.488095'),('c742a6d7-da30-4962-be8b-167e68f30301','2025-02-10 16:29:11.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-10 16:29:12.157758','2025-02-10 16:29:12.157758'),('c7af9917-2c59-4925-8572-2c43aa55809a','2025-02-12 14:54:37.000000',0,10891726,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 14:54:37.831133','2025-02-12 14:54:37.831133'),('c904ec06-20b3-42ec-9e77-2b1f220966a8','2025-02-05 16:51:13.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',1,'2025-02-05 16:51:14.347271','2025-02-05 16:51:14.347271'),('cc9eebf5-aed0-4fe9-a3a5-e6bd8dbded66','2025-02-12 12:11:43.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:11:44.405627','2025-02-12 12:11:44.405628'),('ccdbf8ac-03ab-4d2e-9fc8-67dbc48450fd','2025-02-10 09:22:40.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 09:22:41.176496','2025-02-10 09:22:41.176496'),('cf6b2bec-addc-4ffa-8235-0f59c15cfe5a','2025-02-10 16:48:22.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-10 16:48:24.728540','2025-02-10 16:48:24.728541'),('cfccb922-ea31-40b6-b2a3-1e0957200b3e','2025-02-07 10:21:46.000000',0,9124358,'N?o registrado',27,1,4,'TFP5235000318',0,'2025-02-07 10:21:46.632224','2025-02-07 10:21:46.632224'),('cff00a75-fe9c-4c78-a61b-670067cf1a19','2025-02-07 15:47:11.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 15:47:13.052394','2025-02-07 15:47:13.052394'),('d0f5078f-73bf-45af-90ce-d2fe64b8a050','2025-02-10 16:54:00.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 16:54:02.039904','2025-02-10 16:54:02.039904'),('d1cc4bf9-49f7-4d1c-beb5-85e3b3a61ed7','2025-02-05 16:20:06.000000',0,267,'N?o registrado',27,1,4,'TFP5235000453',0,'2025-02-05 16:20:06.389409','2025-02-05 16:20:06.389410'),('d3368073-b0fd-4610-9813-78bd1d7a5032','2025-02-12 10:59:01.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:59:02.617674','2025-02-12 10:59:02.617675'),('d45beaee-63d4-4293-be11-6d4a5c6a2afc','2025-02-12 12:25:50.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:25:51.233121','2025-02-12 12:25:51.233122'),('d5761494-37b8-4c0d-97ae-1f369cfb9b36','2025-02-10 16:43:58.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 16:44:00.278941','2025-02-10 16:44:00.278941'),('d5e221c9-28cf-483d-96ab-c33fb1a92bed','2025-02-07 15:40:38.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-07 15:40:39.239369','2025-02-07 15:40:39.239369'),('d63e2bb5-8322-45b2-b9a9-4ef3eb4b60d1','2025-02-12 12:11:10.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:11:11.471427','2025-02-12 12:11:11.471427'),('d802f65c-d16d-4ecb-8b2a-a381e9edc45d','2025-02-10 16:46:56.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:46:59.707951','2025-02-10 16:46:59.707951'),('d9bb10b8-ddf4-4d48-80c0-7d13bdce7f77','2025-02-12 12:11:14.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:11:15.919119','2025-02-12 12:11:15.919119'),('d9c19e44-bc51-41c9-a45c-caad5c5b0e64','2025-02-05 16:51:26.000000',36,267,'Acesso n?o autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:51:27.215559','2025-02-05 16:51:27.215559'),('dbd69a7f-f091-4431-a3bb-c6782f25250d','2025-02-12 12:11:18.000000',39,10803847,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:11:20.010412','2025-02-12 12:11:20.010412'),('dc4fb954-33c2-4e48-89ee-73d6f7458a9c','2025-02-12 14:54:41.000000',101,10891726,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 14:54:42.947045','2025-02-12 14:54:42.947045'),('dcffb220-5a18-49e2-ad7d-60185a53cfc1','2025-02-07 16:11:50.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-07 16:11:51.652570','2025-02-07 16:11:51.652571'),('dd072c0e-2f3b-4fd8-817b-020080d4670f','2025-02-12 11:31:54.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000422',0,'2025-02-12 11:31:54.602416','2025-02-12 11:31:54.602416'),('dd559701-58a8-49b6-aea9-5b9d1ae5d89f','2025-02-07 15:40:40.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-07 15:40:42.483920','2025-02-07 15:40:42.483920'),('dd990c26-b608-49e3-87c1-fc4e4dbb27a9','2025-02-10 09:55:58.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-10 09:55:59.591097','2025-02-10 09:55:59.591097'),('de13d585-6c16-463d-943b-5c00e5605d2b','2025-02-12 14:42:06.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:42:07.603135','2025-02-12 14:42:07.603136'),('de2d66c0-da6e-4958-b45d-740e9d3cdcf1','2023-12-10 03:34:07.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('de352c7f-ab40-47c6-b81c-ba6eceae4bad','2025-02-12 10:56:30.000000',86,10958427,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 10:56:31.709317','2025-02-12 10:56:31.709317'),('de7afd1c-16bd-465e-a415-5626fef4d3fe','2025-02-12 11:28:47.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 11:28:48.027651','2025-02-12 11:28:48.027651'),('dea14d93-08f3-407a-89cb-5a918a4dce83','2025-02-10 16:44:05.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-10 16:44:06.288145','2025-02-10 16:44:06.288145'),('dfece88d-c69b-4feb-a37d-626b539cee20','2025-02-07 15:41:00.000000',0,10892253,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-07 15:41:00.414754','2025-02-07 15:41:00.414754'),('e3383a51-0a14-4598-be10-4f3da931458a','2023-12-10 03:34:09.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('e4874cfc-745b-41fb-958b-1fb9a6b9cdc2','2025-02-12 11:26:44.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:26:46.327974','2025-02-12 11:26:46.327974'),('e4cbace8-90f4-4327-b4b0-5f2a5a8ed995','2023-12-10 02:42:44.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('e5061b44-2412-4856-8780-d37be218d4a4','2025-02-12 12:04:34.000000',0,9124357,'N?o registado',27,2,4,'TFP5235000422',0,'2025-02-12 12:04:34.966374','2025-02-12 12:04:34.966374'),('e56d20dd-78b2-4d57-ba8d-21d3a6cb82d4','2025-02-12 12:04:16.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:04:18.055966','2025-02-12 12:04:18.055966'),('e5c78af6-eb0c-4dde-b04b-36f1fa0fba0b','2025-02-07 15:37:36.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:37:37.262755','2025-02-07 15:37:37.262755'),('e6c92f34-dcb8-45ac-a2a4-75ded30ab043','2025-02-10 16:46:12.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:46:12.977127','2025-02-10 16:46:12.977127'),('e7c2021d-fd93-4ca1-b4de-370f2cf2f2e3','2025-02-12 12:09:24.000000',0,9124361,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:09:25.087971','2025-02-12 12:09:25.087971'),('e7d92028-c20e-42b4-b523-b25dd9e142de','2025-02-07 16:14:57.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 16:14:58.693160','2025-02-07 16:14:58.693160'),('e855c97b-f1cc-4d7b-8590-71644baf6d11','2023-12-10 02:42:43.000000',0,NULL,'Habilitar sa?da auxiliar remotamente',12,2,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('e8a37d31-0dc9-4076-a5a1-75efb12eb9a6','2025-02-12 12:12:38.000000',0,10807101,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:12:40.606674','2025-02-12 12:12:40.606674'),('e9305624-e491-4ae9-8809-8e10f37fc95c','2023-12-10 03:34:05.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('e95674ba-d6e9-45a2-b9b9-a069dea5e7c4','2025-02-05 16:45:08.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-05 16:45:08.976239','2025-02-05 16:45:08.976239'),('e9731baf-574c-4dfd-bd2e-101ebef97d8f','2025-02-12 12:10:29.000000',32,9127894,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:10:30.655656','2025-02-12 12:10:30.655656'),('e99e8e4b-54b4-4862-9c4a-60978f047e14','2025-02-05 17:09:17.000000',38,264,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 17:09:18.785740','2025-02-05 17:09:18.785741'),('eb071e42-3e2e-46c2-b425-28b0f58a277e','2025-02-10 16:48:48.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 16:48:50.002525','2025-02-10 16:48:50.002526'),('ebb92cc8-c5bd-414b-b3d4-1b7c6c7ad319','2025-02-10 16:46:19.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:46:20.210226','2025-02-10 16:46:20.210226'),('ecf15728-038f-42ba-9573-d847b0098c82','2025-02-12 11:22:15.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:22:16.879766','2025-02-12 11:22:16.879766'),('ed929a10-5251-4c70-83f5-fb0b8119bf3f','2025-02-12 11:29:15.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 11:29:17.507251','2025-02-12 11:29:17.507251'),('edb3618d-3631-446e-a436-b7e794b8b1db','2025-02-05 16:19:21.000000',0,267,'N?o registrado',27,1,4,'TFP5235000453',0,'2025-02-05 16:19:21.676209','2025-02-05 16:19:21.676209'),('ef3cf523-0fbb-431a-8fe3-64723107b3be','2025-02-07 09:36:59.000000',0,6586851,'N?o registrado',27,2,4,'TFP5235000453',0,'2025-02-07 09:37:00.151760','2025-02-07 09:37:00.151761'),('ef683743-529e-4e73-b73f-d246f8ad2f6c','2025-02-10 16:46:15.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:46:18.111304','2025-02-10 16:46:18.111304'),('effab281-6821-47e3-bc31-cd93e5a5325c','2025-02-07 16:14:29.000000',0,279,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-07 16:14:29.500595','2025-02-07 16:14:29.500595'),('f001a66d-6381-4f31-89d9-93eeded7d9f3','2025-02-07 16:14:03.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 16:14:04.335956','2025-02-07 16:14:04.335956'),('f0106e40-fe9e-47d5-8dfa-4db391e49d0b','2025-02-05 17:09:21.000000',38,264,'Abertura efetuada',0,2,4,'TFP5235000453',0,'2025-02-05 17:09:22.267716','2025-02-05 17:09:22.267716'),('f0b2dfef-add9-469a-a2ed-d252b40f6ceb','2023-12-10 03:33:53.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('f11524e5-0ab6-47bc-998e-3eaf68b3ab76','2025-02-12 10:47:11.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',2,'2025-02-12 10:47:11.651448','2025-02-12 10:47:11.651448'),('f1252972-db48-4acf-a968-578c7c6fbd58','2025-02-07 16:14:01.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 16:14:02.630386','2025-02-07 16:14:02.630386'),('f32a206f-42bc-4d41-ae53-ab2d11a495d3','2025-02-07 15:39:38.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:39:39.759039','2025-02-07 15:39:39.759039'),('f3ee0d0d-0850-4af0-9dfa-d457a257361d','2025-02-12 11:00:04.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 11:00:06.191481','2025-02-12 11:00:06.191481'),('f3ee4e5b-a344-4b4f-ad10-27f8049f596c','2025-02-12 11:31:55.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:31:56.411678','2025-02-12 11:31:56.411678'),('f4445d37-29a5-46fd-a5c5-7b9aa491690a','2025-02-10 09:58:24.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000437',1,'2025-02-10 09:58:25.824653','2025-02-10 09:58:25.824653'),('f49e448e-bb0a-4861-a5b7-c5a068c49c5c','2025-02-10 09:24:56.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 09:24:58.590625','2025-02-10 09:24:58.590625'),('f5353149-ee09-4cee-86d1-e24d11c97241','2025-02-12 11:31:57.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000318',0,'2025-02-12 11:31:58.691275','2025-02-12 11:31:58.691276'),('f57d928c-f79a-4ced-a189-bc6ec22247f3','2025-02-12 11:32:00.000000',0,9124357,'N?o registado',27,1,4,'TFP5235000453',0,'2025-02-12 11:32:01.440110','2025-02-12 11:32:01.440110'),('f5ea46b1-e877-41fb-aa9e-d78fb339b642','2025-02-12 12:08:11.000000',0,9124358,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:08:13.658679','2025-02-12 12:08:13.658679'),('f60c0e09-d616-4e75-adf4-f03f5af5e18c','2025-02-05 16:22:16.000000',36,267,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000453',0,'2025-02-05 16:22:17.331723','2025-02-05 16:22:17.331723'),('f612c39d-f5d5-486b-9e3a-40856dbe9b3c','2025-02-12 12:09:19.000000',24,9124361,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:09:20.403036','2025-02-12 12:09:20.403036'),('f64f979f-a60a-4258-b956-45424d7eade2','2025-02-12 12:11:44.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:11:45.930750','2025-02-12 12:11:45.930750'),('f8307dc5-aae1-47c1-89ac-9d8d32a229ef','2025-02-07 15:47:05.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-07 15:47:06.234125','2025-02-07 15:47:06.234125'),('f8496b82-8509-49e2-97f5-64d309d70742','2025-02-07 15:41:05.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:41:06.013423','2025-02-07 15:41:06.013423'),('f8f63b67-c665-42c0-a9c4-91518b686698','2025-02-10 10:02:13.000000',95,10892253,'Per?odo de tempo inv?lido',22,1,4,'TFP5235000319',1,'2025-02-10 10:02:14.989658','2025-02-10 10:02:14.989658'),('fa7c4b05-7a00-4a33-99ba-a9447a1309c8','2025-02-12 12:08:49.000000',20,9124360,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:50.363430','2025-02-12 12:08:50.363430'),('fad6a38c-7823-48c5-a6ac-4c7bc4f2ed8b','2025-02-12 12:11:37.000000',0,10891989,'N?o registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:11:39.734680','2025-02-12 12:11:39.734680'),('fb6ab421-5d3a-4b13-b73d-e120fc60ea7a','2025-02-12 12:13:27.000000',36,10920174,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:13:28.358984','2025-02-12 12:13:28.358984'),('fc4cb1e5-a26d-4523-a4d6-13e1cdaa1e44','2025-02-12 12:16:32.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:16:33.470201','2025-02-12 12:16:33.470201'),('fc5cc4cc-86f9-4a2a-8431-ee37cec91583','2025-02-12 11:30:17.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:30:18.720764','2025-02-12 11:30:18.720764'),('ff615205-e186-4169-8c2a-cf409b54476b','2025-02-12 12:07:50.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:07:52.613531','2025-02-12 12:07:52.613532'),('ff7b72d8-9951-4531-a6f2-eb3bf188d38a','2025-02-12 12:26:40.000000',221,10829761,'Acesso n?o autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:26:41.355963','2025-02-12 12:26:41.355964'),('ff92e005-ffe1-4e38-ae1c-4bb360591da4','2025-02-10 16:29:08.000000',5,9124357,'Acesso n?o autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:29:09.267182','2025-02-10 16:29:09.267182');
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
INSERT INTO `professions` VALUES ('08dd49b2-c23c-492b-8ef4-4d728517911c',1,NULL,'Profiss?o Geral');
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
INSERT INTO `roles` VALUES ('50dcbe53-b050-486a-b35f-5d21e56b9686','Admin','ADMIN',NULL),('51cb4b10-413e-4622-abc3-9e637cfc0e60','User','USER',NULL);
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
INSERT INTO `useractivesessions` VALUES ('08dd4f32-4fb8-4a0d-8705-7e4cdfb26207','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzk3OTAzNjZ9.11Hodhk0K5zQeW_zBkakgOi-tN6p8q0ZFEeaP7Rikv4','501488243','2025-02-17 11:06:06.062253'),('08dd4f43-c397-47fb-8868-3119639c63ee','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzk3OTc4NjF9.MUZHel3b2h7JW-7W73LkdBtGIwd9yUEuYbcVHIeMFpQ','501488243','2025-02-17 13:11:01.933347'),('08dd4f60-70f0-448a-809e-8e94df84698c','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzk4MTAxNzh9.B7Jnt73h2RmUWOnldqxi5HfsfXRwtfs4xHn2L1GrhEQ','501488243','2025-02-17 16:36:18.665327'),('08dd4ffc-54a2-4685-811e-d59ec9a14957','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzk4NzcxMzJ9.ZOsflUhhERPSLR7NP6iuHqbSMnprK6EbUiSsZtxIPZc','501488243','2025-02-18 11:12:12.668540'),('08dd500d-e534-44cf-8e6b-1cab0409bdff','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzk4ODQ2NzZ9.n82w7FylFdYjYAqUt_RLOvTZx-W7WCEXwTpxyuosiFA','501488243','2025-02-18 13:17:56.655366'),('08dd5027-622b-49d1-8fd9-52b55db92a7e','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzk4OTU2MjN9.299nagPwV8T_EKAuitNVhqphOEyjzhDmIyLfw6ebRSA','501488243','2025-02-18 16:20:23.738315');
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
INSERT INTO `userroles` VALUES ('2a11069b-085a-452b-b6a3-cacf7d5d0360','50dcbe53-b050-486a-b35f-5d21e56b9686'),('f36b818d-b82c-41f8-852a-b7e6ec770ad0','50dcbe53-b050-486a-b35f-5d21e56b9686');
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
INSERT INTO `users` VALUES ('2a11069b-085a-452b-b6a3-cacf7d5d0360',NULL,NULL,'nidgroup','NIDGROUP','admin@nidgroup.pt','ADMIN@NIDGROUP.PT',1,'AQAAAAIAAYagAAAAEPqG7/NTluH+9T4aRlpAmgLNTcTM2VyFkv7JVVwCBgbjz4HO5EO+/OLpH3GxnXN8qg==','','2264d3d0-e091-473e-84ca-f067c58e86f7',NULL,0,0,NULL,0,0),('f36b818d-b82c-41f8-852a-b7e6ec770ad0','Administrador',NULL,'admin','ADMIN','admin@example.com','ADMIN@EXAMPLE.COM',1,'AQAAAAIAAYagAAAAECpl3rJeAlmMhJbhMYK1zOULxz2jBztFgJYTQWLS3hPc9q2R/BHo9mSGJZeXvfqqhw==','PMUJ4MJHRZDFPDXF4RG3H2NIAOSRQUJR','ef498af0-e7cf-464e-9caf-38a45f011004',NULL,0,0,NULL,0,0);
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
INSERT INTO `userstasks` VALUES ('0285a9c7-7eab-40b3-9e41-f01189f617ff','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-05 17:08:55.302303'),('1f62f579-8e7e-41d1-bdb6-6ef65434708c','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','groups',2,'Atualiza??o do grupo com o nome Geral','2025-02-05 16:57:47.480270'),('2b236714-5a5b-4810-ac6c-51b7e523cf1d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-07 15:00:21.087208'),('2c68ff1d-d960-4808-89ba-2d1a68e2504a','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-13 11:44:02.461976'),('34596f0e-ab9e-4504-9c41-d517fdc85ed7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualiza??o da pessoa Daniel Silva','2025-02-05 15:19:30.367198'),('38e7298d-1e75-468f-befe-50600dcc9e03','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sess?o encerrada pelo utilizador','2025-02-10 17:53:48.752664'),('3b169ca2-6730-48fc-b86c-7277f2862a62','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-04 17:26:59.571469'),('49b23627-c024-4f27-88b3-ffa6f816e661','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-11 09:44:30.123552'),('4e4e6c7c-9bda-42b7-bcbf-79b92f811daa','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualiza??o da pessoa C?lia L?cio','2025-02-05 15:16:54.693439'),('4fd497be-8f77-4755-827c-028ca3a6c3a4','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-10 11:39:08.710595'),('520754f9-2469-405e-80cb-df519c39912d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sess?o encerrada pelo utilizador','2025-02-04 17:35:19.036520'),('618faa7a-155c-4846-853e-e0da1e0acf0e','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualiza??o da pessoa Paulo Mota','2025-02-05 15:16:19.278323'),('7251f8c0-45a2-41be-b590-12fa53686a33','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualiza??o da pessoa Paulo Mota','2025-02-12 09:53:37.718469'),('879ef1c9-9121-4a43-a549-f1ca1077cb88','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-10 10:00:36.139028'),('8c3080e8-f63d-469b-84da-6f487a488d92','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','departament',1,'Cria??o do departamento Geral','2025-02-05 16:57:23.710898'),('a2237fa8-9ac8-430e-b3c3-60dbbab466df','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-10 17:53:25.788565'),('a2c4578f-9617-4eb3-a09f-32e936b8d74e','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-06 09:59:25.855232'),('b4550edd-1b3c-4068-af08-fb0154a7a33b','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-11 15:48:52.126029'),('be7523b7-d6b8-4247-b86d-7d4126c01efe','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-07 10:52:24.033188'),('c2542e01-c9fa-425d-8e67-02488d63fc77','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-13 12:41:36.380003'),('c8f1891c-78b3-4358-ad68-a88281d4e0d7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-06 14:27:09.101219'),('ce551f99-6af0-4ac5-aff2-d96a9219916f','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-06 17:14:27.094201'),('de8b6352-731e-4236-b7a2-b5be26408385','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-05 15:07:25.823053'),('e7385698-6217-4729-a86e-d378a4455144','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualiza??o da pessoa Helena Esperto','2025-02-12 09:53:54.243590'),('eb8d6309-c992-4d67-8d79-95eb9ae0b126','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sess?o encerrada pelo utilizador','2025-02-10 10:09:05.844081'),('efe346df-c9b7-41bb-a64f-7fbcf22dae9b','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','departament',1,'Cria??o do departamento Visitante','2025-02-05 16:57:31.144119'),('f3b6e313-48e4-499c-bebd-4b2b8627eb27','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualiza??o da pessoa Daniel Silva','2025-02-05 15:20:17.790728'),('fb6ea541-066b-4d78-b531-bba8e11f64e2','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sess?o encerrada pelo utilizador','2025-02-07 16:28:16.872435'),('ff6d179d-86df-4e0f-bb7b-f89e488a9b89','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sess?o iniciada','2025-02-12 09:49:45.027147');
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
INSERT INTO `zones` VALUES ('08dd475b-b228-415d-8ce5-88a0a053a048',0,'Zona Armaz?m',NULL,NULL,'ZA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('08dd475b-c2c7-41b4-84d8-fcb036cad910',NULL,'Zona Escrit?rio',NULL,NULL,'ZE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nclock2'
--

--
-- Dumping routines for database 'nclock2'
--
/*!50003 DROP PROCEDURE IF EXISTS `InsertDepartments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertDepartments`()
BEGIN
  DECLARE counter INT DEFAULT 1;
  WHILE counter <= 10000 DO
    INSERT INTO `nclock2`.`departments` (`DepartmentID`, `Code`, `Name`, `Description`, `PaiId`)
    VALUES (UUID(), counter, CONCAT('Department ', counter), 'Generated department', NULL);
    SET counter = counter + 1;
  END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertDepartments2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertDepartments2`()
BEGIN
  DECLARE counter INT DEFAULT 1;
  WHILE counter <= 100000 DO
    INSERT INTO `nclock2`.`departments` (`DepartmentID`, `Code`, `Name`, `Description`, `PaiId`)
    VALUES (UUID(), counter, CONCAT('Department ', counter), 'Generated department', NULL);
    SET counter = counter + 1;
  END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 15:23:11
