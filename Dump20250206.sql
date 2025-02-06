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
INSERT INTO `accauxiliares` VALUES ('197b37b7-3b8d-4e44-b30b-543f881d4b94','Teste 4 portas-AuxIn4',0,4,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650431','2025-01-30 15:07:49.650431'),('1a75f1a6-bbbc-4121-914b-413653c899e3','Teste 4 portas-AuxOut2',1,2,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650658','2025-01-30 15:07:49.650658'),('291a5cad-c7fb-47a0-b740-d3f51dfe3f9a','Teste 4 portas-AuxIn2',0,2,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650345','2025-01-30 15:07:49.650345'),('45f66eb8-573b-4abd-ab79-935dc7828e2c','Teste 4 portas-AuxIn3',0,3,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650414','2025-01-30 15:07:49.650414'),('65c2b4ad-a0c3-4852-ad1c-272dfd57423e','Teste 4 portas-AuxOut1',1,1,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650620','2025-01-30 15:07:49.650620'),('6bd16808-bf42-4f49-89f8-d5e0d5380e1d','regterg-AuxIn1',0,1,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.131467','2025-01-30 11:48:56.131524'),('8f1ceb11-7878-44d9-a8f1-ca7f91871244','regterg-AuxOut2',1,2,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.144043','2025-01-30 11:48:56.144043'),('bb79cf9e-54b0-4d83-af28-bbb455371a22','Teste 4 portas-AuxIn1',0,1,0,'5247c881-4637-427b-bf16-e6f067ef6e5d','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c',0,'2025-01-30 15:07:49.645755','2025-02-05 16:13:06.689391'),('d9370d05-53af-4db6-8659-9088950fde97','regterg-AuxOut1',1,1,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.144017','2025-01-30 11:48:56.144017'),('e3caed6e-8996-452b-9640-b01e761e579e','Teste 4 portas-AuxOut4',1,4,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650668','2025-01-30 15:07:49.650668'),('f1f7581f-34d6-4594-ad0c-df488784eaf5','Teste 4 portas-AuxOut3',1,3,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650663','2025-01-30 15:07:49.650663'),('fcd5ec28-2549-4a46-b8da-5bff97225adf','regterg-AuxIn2',0,2,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.143880','2025-01-30 11:48:56.143880');
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
INSERT INTO `accdoors` VALUES ('5147d1fa-d619-4716-b420-fa505fe1d49a',NULL,'2025-01-30 11:48:56',NULL,NULL,NULL,0,'2025-01-30 11:48:56',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'regterg-door2',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'136d9c74-a3bb-4049-95c1-85c7416ad4b0','AJYS223460212','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('555e8f6e-1baa-48b2-8348-609a63077e52',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,4,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door4',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('636a8d42-5728-4df4-97c7-dec2d3d424f4',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door2',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('8a016951-8628-4aae-8af6-b6b835493d90',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-02-05 16:11:42',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door1',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('a8f57cb8-d746-4ede-ae29-9db02db04205',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,3,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door3',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('b743c53b-3c6a-4866-824b-dc29ea034e7e',NULL,'2025-01-30 11:48:56',NULL,NULL,NULL,0,'2025-01-30 11:48:56',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'regterg-door1',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'136d9c74-a3bb-4049-95c1-85c7416ad4b0','AJYS223460212','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c');
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
INSERT INTO `acchorarios` VALUES ('6beff968-1f3a-4d6d-b635-b203b9f3b125','6328b1cf-4648-4ef3-b856-4df9aeb948e4','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c','2025-01-30 11:57:25',0),('df5dd181-dc68-4e11-a4ae-28df53e4600b','f7484b59-4680-4ac4-b228-a287226b6057','08dd44fe-5bbd-4904-8989-36a46def17fe','2025-02-04 09:29:32',0);
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
INSERT INTO `accplanoacessos` VALUES ('ea157a68-f782-4171-abe0-2ce6c3daa20a','Plano Acesso 24H',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-30 11:58:34',NULL),('f6d292d5-558e-406b-8907-da7c5f534acd','Teste',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-31 10:09:55',NULL);
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
INSERT INTO `accplanohorarios` VALUES ('6328b1cf-4648-4ef3-b856-4df9aeb948e4','Plano Horario 24H',NULL,NULL,NULL,'2025-01-30 11:57:25',NULL),('f7484b59-4680-4ac4-b228-a287226b6057','Teste',NULL,NULL,NULL,'2025-02-04 09:29:32',NULL);
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
INSERT INTO `accplanosacessodispositivos` VALUES ('08dd44ff-76a7-4783-82bc-4c635eb402a8','f6d292d5-558e-406b-8907-da7c5f534acd','5247c881-4637-427b-bf16-e6f067ef6e5d','636a8d42-5728-4df4-97c7-dec2d3d424f4','f7484b59-4680-4ac4-b228-a287226b6057',NULL,'0001-01-01 00:00:00',NULL),('08dd44ff-76a7-47ae-86cb-a4e576df784c','f6d292d5-558e-406b-8907-da7c5f534acd','5247c881-4637-427b-bf16-e6f067ef6e5d','8a016951-8628-4aae-8af6-b6b835493d90','f7484b59-4680-4ac4-b228-a287226b6057',NULL,'0001-01-01 00:00:00',NULL),('08dd45df-c44d-4c2c-84b3-1a21ad28732b','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','8a016951-8628-4aae-8af6-b6b835493d90','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd45df-c44e-436f-83d1-8051bc9cf26d','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','636a8d42-5728-4df4-97c7-dec2d3d424f4','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd45df-c44e-43ae-8949-8128049932cd','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','a8f57cb8-d746-4ede-ae29-9db02db04205','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd45df-c44e-43c2-8b02-7bf4a46c871f','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','555e8f6e-1baa-48b2-8348-609a63077e52','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL);
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
INSERT INTO `accreaders` VALUES ('2bcb3042-fb26-4098-869c-752ccff8b288','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door4-reader1',1,0,NULL,NULL,'555e8f6e-1baa-48b2-8348-609a63077e52'),('49949434-e303-4ac1-912e-f6aa72d3121c','0001-01-01 00:00:00','2025-02-06 14:52:47','Teste 4 portas-door1-reader1',0,0,NULL,NULL,'8a016951-8628-4aae-8af6-b6b835493d90'),('5fbb9a4f-62e0-4229-9c3b-91417750f9a3','0001-01-01 00:00:00','2025-02-06 14:52:54','Teste 4 portas-door3-reader1',0,0,NULL,NULL,'a8f57cb8-d746-4ede-ae29-9db02db04205'),('605892b5-6a31-415e-aa96-732d5ef6f3ad','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door2-reader1',1,0,NULL,NULL,'5147d1fa-d619-4716-b420-fa505fe1d49a'),('88f0d4c7-1270-4dd7-b89f-5282c8b4d88c','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door2-reader2',2,1,NULL,NULL,'5147d1fa-d619-4716-b420-fa505fe1d49a'),('8d5021bf-d88c-469d-abfa-9fa01b12123c','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door2-reader2',2,1,NULL,NULL,'636a8d42-5728-4df4-97c7-dec2d3d424f4'),('8e4e8a87-d808-479f-9a73-da7d98cabec1','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door2-reader1',1,0,NULL,NULL,'636a8d42-5728-4df4-97c7-dec2d3d424f4'),('c3bb8128-a7b8-4201-a1bf-ecf023840ab8','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door4-reader2',2,1,NULL,NULL,'555e8f6e-1baa-48b2-8348-609a63077e52'),('eabfc45d-7be3-414b-a2ea-77fc6194e6ec','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door3-reader2',2,1,NULL,NULL,'a8f57cb8-d746-4ede-ae29-9db02db04205'),('ef9dcdd1-1544-4d8e-afe9-8f0da2d4efc5','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door1-reader2',2,1,NULL,NULL,'8a016951-8628-4aae-8af6-b6b835493d90'),('f545d3ab-82e7-4832-b272-12a9b24fd0d0','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door1-reader2',2,1,NULL,NULL,'b743c53b-3c6a-4866-824b-dc29ea034e7e'),('f5ec6cf5-563f-4ae7-aec5-379c616be4f5','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door1-reader1',1,0,NULL,NULL,'b743c53b-3c6a-4866-824b-dc29ea034e7e');
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
INSERT INTO `acctimeseg` VALUES ('08dd44fe-5bbd-4904-8989-36a46def17fe','2',NULL,NULL,'2025-02-04 09:29:00',NULL,NULL,'admin',NULL,'2025-02-04 09:29:00',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00',1,'13:00','00:00','00:00','08:00','00:00','00:00','Teste',NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','13:00','00:00','00:00','08:00','00:00','00:00','13:00','00:00','00:00','08:00','00:00','00:00'),('88bd3f59-62ec-4820-8ffa-f5d1bf928f1c','1',NULL,NULL,'2025-01-30 09:19:20',NULL,NULL,NULL,NULL,'2025-01-30 09:19:20',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00',1,'23:59','00:00','00:00','00:00','00:00','00:00','24-Hour',NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00');
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
INSERT INTO `categories` VALUES ('08dd45f2-2eb1-4870-88e5-2951afe03a9b',1,'TT','teste');
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
INSERT INTO `configurations` VALUES ('configKiosk','amount','0,50'),('configKiosk','emails','joao.pedro@sisnid.com'),('configKiosk','totalmoedas','500'),('configSoftware','lisenceKey','TWpW35vFo4Rnb44op9UAXxxxj+u1FLPmp0jzRO+/zrclQ2MD39g7GEoDFUH9gb21wJaG1UDr8tjk+b+ZHWky+BWQTBRfJ1JGwC3CkT6EInchmeByNFrG2gBsUW1h8cBGqiVFzfWagTCUIbldKoy36h7Vz/k2eeTrQGWBCr4qRdhcRPwdCpz9WM/hU/EFTh4g1F6fTY8U2royc8VXpWFOAHGc1Z1QtCskp0CfWXqge8HV9NpR4S5quGrhdpMAZV0otvMrdc0uvNo+AX0lhNNldxj7W/HycTeqHJf0GJlcClylHzeRaUl6PSt+6IMCv4mC6lBGIdp4g75s0EYNBBaQOv/MVzB2eTdFv8FK+RbWe3q2KpHvIHYi6yMiS7JZo3uVyF6h+s3BHXXWydbgVi4aTJ8UyhiKQLSqnXbcKtEzLP8zq8TaDI2QoCgxJ2niBi7vjfm5e3cc4kbsQ3VDfKYHLFT48VZ4fBBiu60bwBAh5+EcPvgHPmuF1Vglsf5E3zAUiCZwlBLLtXHbWl5lXl8Vv/55OuK8s0RqGVQtrcfXLTY9ThAd4oYwaY3g45E4I9Trp46Fc/eDw6fFSad4OzmoJZ2iApiER/W+AL0NyGJZH6QDjsgHSSCpP60CJfRjt/Px0ootXmkMzNYo4PM9lJMKzgBhd0VQprsPrdMIa/ZtUJAZi7UrxmxckwUPknl7522p'),('configSoftware','setupDate','TMbNZzjjzWcWy5ZxGr7K6jLPPm0N31BMmtJQZ2zuFSc=');
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
INSERT INTO `devices` VALUES ('136d9c74-a3bb-4049-95c1-85c7416ad4b0',1,'regterg','SISNID-INBIO260','192.168.1.201',9999,'/static/media/inbio260.90c381372586e4188949.webp',0,NULL,'AC Ver 5.7.8.3033 Apr 29 2022','00:17:61:12:F9:45','AJYS223460212',NULL,NULL,4,2,2,600,10,200,10,NULL,NULL,2,NULL,'FB1E','FF3FF07FF036018003060000600300000000000000000000007743F07E070080',NULL,NULL,3,2,0,1,'2025-01-30 17:01:16.928142','2025-01-30 11:48:53.157167','2025-02-06 15:55:07.734310'),('5247c881-4637-427b-bf16-e6f067ef6e5d',2,'Teste 4 portas','SISNID-INBIO460','192.168.1.202',9999,'/static/media/inbio460.5a2aee4986a45d9d5c49.webp',0,NULL,'AC Ver 5.7.8.3033 Aug 14 2023','00:17:61:20:04:61','GQS2235000391',NULL,NULL,4,4,4,600,10,200,10,NULL,NULL,4,NULL,'FB1E','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-02-05 12:03:06.826371','2025-01-30 15:07:47.008550','2025-02-06 15:47:54.955944');
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
INSERT INTO `devicesscheduledtask` VALUES ('0a0c15fb-63a8-4b53-9f00-c11906df42a4','GQS2235000391','DATA UPDATE outrelaysetting Num=1	OutType=1	ActionType=0	TimezoneId=1','2025-02-05 16:12:03.450231'),('115677ff-3121-4bd0-8c2f-bed48fd70437','GQS2235000391','SET OPTIONS Door1CloseAndLock=0,Door1Drivertime=5,Door1SuperuserBypassLockdown=0,Door1InTimeAPB=0,Door1SensorType=0,Door1Detectortime=,Door1Intertime=2,Door1REXInput=1,Door1REXTimeOut=0,Door1VerifyType=4,Door1DelayOpenTime=0,Door1MultiCardInterTime=10,ExtDoor1DelayDrivertime=5,Door1ValidTZ=1,Door1SupperPassWord=,Door1ForcePassWord=,Door1KeepOpenTimeZone=0,Reader1AutoMatch=1','2025-02-05 16:06:32.544713'),('1846ad1f-bd08-44fc-bc17-fbd40a24bdd9','GQS2235000391','DATA UPDATE userauthorize Pin=36	AuthorizeTimezoneId=2	AuthorizeDoorId=3\n\nPin=9	AuthorizeTimezoneId=2	AuthorizeDoorId=3\n\nPin=22	AuthorizeTimezoneId=2	AuthorizeDoorId=3\n','2025-02-05 12:09:41.561186'),('1aa96706-9fbd-444d-a420-9e06d4bded9e','GQS2235000391','DATA UPDATE user Pin=117	Password=0	Group=0	StartTime=0	EndTime=0	Name=Rita Santos	SuperAuthorize=0	Disable=0\nPin=164	Password=0	Group=0	StartTime=0	EndTime=0	Name=Alexandra Gonçalves	SuperAuthorize=0	Disable=0\nPin=47	Password=0	Group=0	StartTime=0	EndTime=0	Name=Luís Antunes	SuperAuthorize=0	Disable=0\nPin=107	Password=0	Group=0	StartTime=0	EndTime=0	Name=Francisco Ribeiro	SuperAuthorize=0	Disable=0\nPin=96	Password=0	Group=0	StartTime=0	EndTime=0	Name=João Domingues	SuperAuthorize=0	Disable=0\nPin=183	Password=0	Group=0	StartTime=0	EndTime=0	Name=Andreia Mendonça	SuperAuthorize=0	Disable=0\nPin=144	Password=0	Group=0	StartTime=0	EndTime=0	Name=Pedro Amaro	SuperAuthorize=0	Disable=0\nPin=36	Password=	Group=0	StartTime=0	EndTime=0	Name=Helena Esperto	SuperAuthorize=	Disable=0\nPin=93	Password=0	Group=0	StartTime=0	EndTime=0	Name=Marisa Silva	SuperAuthorize=0	Disable=0\nPin=112	Password=0	Group=0	StartTime=0	EndTime=0	Name=Rute Cunha	SuperAuthorize=0	Disable=0\nPin=101	Password=0	Group=0	StartTime=0	EndTime=0	Name=Fábio Catarrinho	SuperAuthorize=0	Disable=0\nPin=79	Password=0	Group=0	StartTime=0	EndTime=0	Name=Daniel Sousa	SuperAuthorize=0	Disable=0\nPin=32	Password=0	Group=0	StartTime=0	EndTime=0	Name=António Cachola	SuperAuthorize=0	Disable=0\nPin=199	Password=0	Group=0	StartTime=0	EndTime=0	Name=Joana Santos	SuperAuthorize=0	Disable=0\nPin=165	Password=0	Group=0	StartTime=0	EndTime=0	Name=Thiago Melo	SuperAuthorize=0	Disable=0\nPin=159	Password=0	Group=0	StartTime=0	EndTime=0	Name=Fernando Dores	SuperAuthorize=0	Disable=0\nPin=187	Password=0	Group=0	StartTime=0	EndTime=0	Name=Valentim Melnychuck	SuperAuthorize=0	Disable=0\nPin=194	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ana Santos	SuperAuthorize=0	Disable=0\nPin=27	Password=0	Group=0	StartTime=0	EndTime=0	Name=Patrique Sousa	SuperAuthorize=0	Disable=0\nPin=128	Password=0	Group=0	StartTime=0	EndTime=0	Name=Valter Mendes	SuperAuthorize=0	Disable=0\nPin=217	Password=0	Group=0	StartTime=0	EndTime=0	Name=Liliana Santos	SuperAuthorize=0	Disable=0\nPin=157	Password=0	Group=0	StartTime=0	EndTime=0	Name=Isabel Nascimento	SuperAuthorize=0	Disable=0\nPin=23	Password=0	Group=0	StartTime=0	EndTime=0	Name=Daniel Silva	SuperAuthorize=0	Disable=0\nPin=189	Password=0	Group=0	StartTime=0	EndTime=0	Name=Daniel Almeida	SuperAuthorize=0	Disable=0\nPin=66	Password=0	Group=0	StartTime=0	EndTime=0	Name=Joana Azevedo	SuperAuthorize=0	Disable=0\nPin=124	Password=0	Group=0	StartTime=0	EndTime=0	Name=António Pereira	SuperAuthorize=0	Disable=0\nPin=125	Password=0	Group=0	StartTime=0	EndTime=0	Name=Cláudia Lopes	SuperAuthorize=0	Disable=0\nPin=39	Password=0	Group=0	StartTime=0	EndTime=0	Name=Marta Monteiro	SuperAuthorize=0	Disable=0\nPin=162	Password=0	Group=0	StartTime=0	EndTime=0	Name=Paula Nitas	SuperAuthorize=0	Disable=0\nPin=192	Password=0	Group=0	StartTime=0	EndTime=0	Name=Diana Oliveira	SuperAuthorize=0	Disable=0\nPin=24	Password=0	Group=0	StartTime=0	EndTime=0	Name=Noémia Porfírio	SuperAuthorize=0	Disable=0\nPin=188	Password=0	Group=0	StartTime=0	EndTime=0	Name=Soraia Gil	SuperAuthorize=0	Disable=0\nPin=95	Password=0	Group=0	StartTime=0	EndTime=0	Name=Leila Marques	SuperAuthorize=0	Disable=0\nPin=57	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ana Guimarães	SuperAuthorize=0	Disable=0\nPin=191	Password=0	Group=0	StartTime=0	EndTime=0	Name=Suse Pires	SuperAuthorize=0	Disable=0\nPin=55	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ana Pinto	SuperAuthorize=0	Disable=0\nPin=195	Password=0	Group=0	StartTime=0	EndTime=0	Name=Miguel Costa	SuperAuthorize=0	Disable=0\nPin=20	Password=54321	Group=0	StartTime=0	EndTime=0	Name=Flávio Diniz	SuperAuthorize=	Disable=0\nPin=86	Password=0	Group=0	StartTime=0	EndTime=0	Name=Carla Dias	SuperAuthorize=0	Disable=0\nPin=216	Password=0	Group=0	StartTime=0	EndTime=0	Name=Maria Duarte	SuperAuthorize=0	Disable=0\nPin=203	Password=0	Group=0	StartTime=0	EndTime=0	Name=Alexandra Rijo	SuperAuthorize=0	Disable=0\nPin=56	Password=0	Group=0	StartTime=0	EndTime=0	Name=Carlos Cruz	SuperAuthorize=0	Disable=0\nPin=160	Password=0	Group=0	StartTime=0	EndTime=0	Name=Valter Santos	SuperAuthorize=0	Disable=0\nPin=91	Password=0	Group=0	StartTime=0	EndTime=0	Name=Tiago Guerreiro	SuperAuthorize=0	Disable=0\nPin=30	Password=0	Group=0	StartTime=0	EndTime=0	Name=Nelson Rego	SuperAuthorize=0	Disable=0\nPin=206	Password=0	Group=0	StartTime=0	EndTime=0	Name=Diogo Brito	SuperAuthorize=0	Disable=0\nPin=153	Password=0	Group=0	StartTime=0	EndTime=0	Name=Pedro Miranda	SuperAuthorize=0	Disable=0\nPin=145	Password=0	Group=0	StartTime=0	EndTime=0	Name=Cíntia Romão	SuperAuthorize=0	Disable=0\nPin=196	Password=0	Group=0	StartTime=0	EndTime=0	Name=Telma Gomes	SuperAuthorize=0	Disable=0\nPin=141	Password=0	Group=0	StartTime=0	EndTime=0	Name=Sofia Gabriel	SuperAuthorize=0	Disable=0\nPin=85	Password=0	Group=0	StartTime=0	EndTime=0	Name=Iulian Acatrinei	SuperAuthorize=0	Disable=0\nPin=213	Password=0	Group=0	StartTime=0	EndTime=0	Name=Sara Loureiro	SuperAuthorize=0	Disable=0\nPin=209	Password=0	Group=0	StartTime=0	EndTime=0	Name=Francisco Melo	SuperAuthorize=0	Disable=0\nPin=152	Password=0	Group=0	StartTime=0	EndTime=0	Name=Sara Correia	SuperAuthorize=0	Disable=0\nPin=205	Password=0	Group=0	StartTime=0	EndTime=0	Name=Verónica Monteiro	SuperAuthorize=0	Disable=0\nPin=103	Password=0	Group=0	StartTime=0	EndTime=0	Name=João Miranda	SuperAuthorize=0	Disable=0\nPin=172	Password=0	Group=0	StartTime=0	EndTime=0	Name=Bruno Gonçalves	SuperAuthorize=0	Disable=0\nPin=38	Password=0	Group=0	StartTime=0	EndTime=0	Name=Mário Marto	SuperAuthorize=0	Disable=0\nPin=179	Password=0	Group=0	StartTime=0	EndTime=0	Name=Bruno Braga	SuperAuthorize=0	Disable=0\nPin=186	Password=0	Group=0	StartTime=0	EndTime=0	Name=Sidney Cassim	SuperAuthorize=0	Disable=0\nPin=167	Password=0	Group=0	StartTime=0	EndTime=0	Name=Alex Silva	SuperAuthorize=0	Disable=0\nPin=208	Password=0	Group=0	StartTime=0	EndTime=0	Name=Diana Cancela	SuperAuthorize=0	Disable=0\nPin=133	Password=0	Group=0	StartTime=0	EndTime=0	Name=Bárbara Sampaio	SuperAuthorize=0	Disable=0\nPin=151	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ana Marques	SuperAuthorize=0	Disable=0\nPin=83	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ana Baptista	SuperAuthorize=0	Disable=0\nPin=132	Password=0	Group=0	StartTime=0	EndTime=0	Name=Miguel Caninhas	SuperAuthorize=0	Disable=0\nPin=200	Password=0	Group=0	StartTime=0	EndTime=0	Name=Bárbara Marques	SuperAuthorize=0	Disable=0\nPin=123	Password=0	Group=0	StartTime=0	EndTime=0	Name=Raquel Santos	SuperAuthorize=0	Disable=0\nPin=136	Password=0	Group=0	StartTime=0	EndTime=0	Name=Filipe Garrido	SuperAuthorize=0	Disable=0\nPin=44	Password=0	Group=0	StartTime=0	EndTime=0	Name=Florinda Miguel	SuperAuthorize=0	Disable=0\nPin=51	Password=0	Group=0	StartTime=0	EndTime=0	Name=Paula Miranda	SuperAuthorize=0	Disable=0\nPin=181	Password=0	Group=0	StartTime=0	EndTime=0	Name=Jaime Silva	SuperAuthorize=0	Disable=0\nPin=9	Password=12345	Group=0	StartTime=0	EndTime=0	Name=Paulo Mota	SuperAuthorize=	Disable=0\nPin=65	Password=0	Group=0	StartTime=0	EndTime=0	Name=Inês Anacleto	SuperAuthorize=0	Disable=0\nPin=129	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ana Branco	SuperAuthorize=0	Disable=0\nPin=214	Password=0	Group=0	StartTime=0	EndTime=0	Name=Carla Ribeiro	SuperAuthorize=0	Disable=0\nPin=198	Password=0	Group=0	StartTime=0	EndTime=0	Name=João Filipe	SuperAuthorize=0	Disable=0\nPin=131	Password=0	Group=0	StartTime=0	EndTime=0	Name=Bruno Sousa	SuperAuthorize=0	Disable=0\nPin=22	Password=	Group=0	StartTime=0	EndTime=0	Name=Eduarda Ferreira	SuperAuthorize=	Disable=0\nPin=202	Password=0	Group=0	StartTime=0	EndTime=0	Name=Tomás Antunes	SuperAuthorize=0	Disable=0\nPin=21	Password=0	Group=0	StartTime=0	EndTime=0	Name=Célia Lúcio	SuperAuthorize=0	Disable=0\nPin=215	Password=0	Group=0	StartTime=0	EndTime=0	Name=José Vaz	SuperAuthorize=0	Disable=0\nPin=104	Password=0	Group=0	StartTime=0	EndTime=0	Name=Ricardo Moreira	SuperAuthorize=0	Disable=0','2025-02-05 12:09:41.555850'),('1dc2e5d2-3519-4e32-b7c1-b947669825d8','GQS2235000391','DATA DELETE ReaderWGFormat DoorID=1','2025-02-05 16:08:09.244316'),('21307bb4-8d0e-48af-a7bb-00be9edc599a','GQS2235000391','DATA DELETE ReaderWGFormat DoorID=1','2025-02-05 16:11:42.208786'),('33ba7ace-a6ba-46fc-84ec-40711bdb0dcb','GQS2235000391','DATA UPDATE InputIOSetting Number=1	InType=0	TimeZoneId=1','2025-02-05 16:11:21.064768'),('3717ba75-6e5e-482c-b782-dca5f15a1f53','GQS2235000391','DATA UPDATE InputIOSetting Number=1	InType=0	TimeZoneId=1','2025-02-05 16:09:30.588624'),('38542bf8-768f-400c-b9b8-6b48cfa72b45','GQS2235000391','DATA UPDATE mulcarduser Pin=36	CardNo=104	LossCardFlag=0	CardType=0\nPin=9	CardNo=114	LossCardFlag=0	CardType=0\nPin=22	CardNo=108	LossCardFlag=0	CardType=0','2025-02-05 12:09:41.558473'),('3ae04c7e-dafd-494b-8e80-3864e52a1086','GQS2235000391','DATA DELETE mulcarduser Pin=117\nPin=164\nPin=47\nPin=107\nPin=96\nPin=183\nPin=144\nPin=36\nPin=93\nPin=112\nPin=101\nPin=79\nPin=32\nPin=199\nPin=165\nPin=159\nPin=187\nPin=194\nPin=27\nPin=128\nPin=217\nPin=157\nPin=23\nPin=189\nPin=66\nPin=124\nPin=125\nPin=39\nPin=162\nPin=192\nPin=24\nPin=188\nPin=95\nPin=57\nPin=191\nPin=55\nPin=195\nPin=20\nPin=86\nPin=216\nPin=203\nPin=56\nPin=160\nPin=91\nPin=30\nPin=206\nPin=153\nPin=145\nPin=196\nPin=141\nPin=85\nPin=213\nPin=209\nPin=152\nPin=205\nPin=103\nPin=172\nPin=38\nPin=179\nPin=186\nPin=167\nPin=208\nPin=133\nPin=151\nPin=83\nPin=132\nPin=200\nPin=123\nPin=136\nPin=44\nPin=51\nPin=181\nPin=9\nPin=65\nPin=129\nPin=214\nPin=198\nPin=131\nPin=22\nPin=202\nPin=21\nPin=215\nPin=104','2025-02-05 12:09:41.549922'),('449bef1d-1cb1-4273-a3e1-4311c5401a12','GQS2235000391','SET OPTIONS Door1CloseAndLock=0,Door1Drivertime=5,Door1SuperuserBypassLockdown=0,Door1InTimeAPB=0,Door1SensorType=0,Door1Detectortime=,Door1Intertime=2,Door1REXInput=1,Door1REXTimeOut=0,Door1VerifyType=4,Door1DelayOpenTime=0,Door1MultiCardInterTime=10,ExtDoor1DelayDrivertime=5,Door1ValidTZ=1,Door1SupperPassWord=,Door1ForcePassWord=,Door1KeepOpenTimeZone=0,Reader1AutoMatch=1','2025-02-05 16:08:09.244362'),('478cc1ae-f888-4136-98bb-f5062f2e3576','GQS2235000391','SET OPTIONS Door1CloseAndLock=0,Door1Drivertime=5,Door1SuperuserBypassLockdown=0,Door1InTimeAPB=0,Door1SensorType=0,Door1Detectortime=,Door1Intertime=2,Door1REXInput=1,Door1REXTimeOut=0,Door1VerifyType=4,Door1DelayOpenTime=0,Door1MultiCardInterTime=10,ExtDoor1DelayDrivertime=5,Door1ValidTZ=1,Door1SupperPassWord=,Door1ForcePassWord=,Door1KeepOpenTimeZone=0,Reader1AutoMatch=1','2025-02-05 16:09:30.588629'),('5041049f-9e3c-48d9-943a-0588fa1ff9b0','GQS2235000391','SET OPTIONS Door1CloseAndLock=0,Door1Drivertime=5,Door1SuperuserBypassLockdown=0,Door1InTimeAPB=0,Door1SensorType=0,Door1Detectortime=,Door1Intertime=2,Door1REXInput=1,Door1REXTimeOut=0,Door1VerifyType=4,Door1DelayOpenTime=0,Door1MultiCardInterTime=10,ExtDoor1DelayDrivertime=5,Door1ValidTZ=1,Door1SupperPassWord=,Door1ForcePassWord=,Door1KeepOpenTimeZone=0,Reader1AutoMatch=1','2025-02-05 16:03:38.716416'),('5406e4db-be18-4e49-ab63-d87dbd55018f','GQS2235000391','DATA UPDATE InputIOSetting Number=1	InType=0	TimeZoneId=1','2025-02-05 16:03:38.716405'),('6c3f8b53-918d-486e-88ab-e9d9cf1ab375','GQS2235000391','SET OPTIONS Door1CloseAndLock=0,Door1Drivertime=5,Door1SuperuserBypassLockdown=0,Door1InTimeAPB=0,Door1SensorType=0,Door1Detectortime=,Door1Intertime=2,Door1REXInput=1,Door1REXTimeOut=0,Door1VerifyType=4,Door1DelayOpenTime=0,Door1MultiCardInterTime=10,ExtDoor1DelayDrivertime=5,Door1ValidTZ=1,Door1SupperPassWord=,Door1ForcePassWord=,Door1KeepOpenTimeZone=0,Reader1AutoMatch=1','2025-02-05 16:11:42.208806'),('75f62ae1-e13a-45ac-bb3e-56c562b5bb90','GQS2235000391','DATA DELETE ReaderWGFormat DoorID=1','2025-02-05 16:11:21.064730'),('7f0b9d27-f251-4de5-b49e-745d2ecda711','GQS2235000391','DATA DELETE ReaderWGFormat DoorID=1','2025-02-05 16:03:38.716285'),('83e6d2c2-743b-4aa2-9e5b-6e6894ab08b9','GQS2235000391','DATA UPDATE userauthorize\nPin=20	AuthorizeTimezoneId=1	AuthorizeDoorId=15\nPin=9	AuthorizeTimezoneId=1	AuthorizeDoorId=15','2025-02-05 12:22:33.202269'),('8a670535-da6f-4118-93de-e55a48522ba7','GQS2235000391','DATA UPDATE InputIOSetting Number=1	InType=0	TimeZoneId=1','2025-02-05 16:08:09.244358'),('8df1efd2-4bc4-4f69-ab7c-c6876e090f25','GQS2235000391','DATA DELETE userauthorize Pin=36\n\nPin=9\n\nPin=22\n','2025-02-05 12:09:41.552934'),('8e72898b-2cac-4fc8-ac50-90fa9a118e26','GQS2235000391','DATA UPDATE outrelaysetting Num=1	OutType=1	ActionType=0	TimezoneId=1','2025-02-05 16:13:00.335565'),('91b90da8-e9d6-4171-932b-89fd335ac7f5','GQS2235000391','DATA UPDATE InputIOSetting Number=1	InType=0	TimeZoneId=1','2025-02-05 16:11:42.208805'),('92442c79-bcf8-4aa4-b5d5-44ed3e892ef8','GQS2235000391','DATA UPDATE outrelaysetting Num=1	OutType=1	ActionType=0	TimezoneId=1','2025-02-05 16:13:06.697134'),('a02cb0e8-daff-4f04-be57-1a00168fe6fc','GQS2235000391','DATA DELETE user Pin=117\nPin=164\nPin=47\nPin=107\nPin=96\nPin=183\nPin=144\nPin=36\nPin=93\nPin=112\nPin=101\nPin=79\nPin=32\nPin=199\nPin=165\nPin=159\nPin=187\nPin=194\nPin=27\nPin=128\nPin=217\nPin=157\nPin=23\nPin=189\nPin=66\nPin=124\nPin=125\nPin=39\nPin=162\nPin=192\nPin=24\nPin=188\nPin=95\nPin=57\nPin=191\nPin=55\nPin=195\nPin=20\nPin=86\nPin=216\nPin=203\nPin=56\nPin=160\nPin=91\nPin=30\nPin=206\nPin=153\nPin=145\nPin=196\nPin=141\nPin=85\nPin=213\nPin=209\nPin=152\nPin=205\nPin=103\nPin=172\nPin=38\nPin=179\nPin=186\nPin=167\nPin=208\nPin=133\nPin=151\nPin=83\nPin=132\nPin=200\nPin=123\nPin=136\nPin=44\nPin=51\nPin=181\nPin=9\nPin=65\nPin=129\nPin=214\nPin=198\nPin=131\nPin=22\nPin=202\nPin=21\nPin=215\nPin=104','2025-02-05 12:09:41.545442'),('bc667508-9f4f-4062-8663-76a35a366fc9','GQS2235000391','DATA UPDATE InputIOSetting Number=1	InType=0	TimeZoneId=1','2025-02-05 16:06:32.544710'),('c1152a12-a70e-4531-8190-a006d6e91b1a','GQS2235000391','DATA DELETE ReaderWGFormat DoorID=1','2025-02-05 16:06:32.544678'),('e5a3692f-16da-4175-b2c3-2a3050ff8cf8','GQS2235000391','DATA DELETE userauthorize Pin=20\nPin=9','2025-02-05 12:22:33.053504'),('f315b402-93dc-454e-81ff-34654535e0c6','GQS2235000391','DATA UPDATE outrelaysetting Num=1	OutType=1	ActionType=0	TimezoneId=1','2025-02-05 16:12:12.210768'),('f6fce1bb-ed4b-4a72-9437-7442b83b689d','GQS2235000391','SET OPTIONS Door1CloseAndLock=0,Door1Drivertime=5,Door1SuperuserBypassLockdown=0,Door1InTimeAPB=0,Door1SensorType=0,Door1Detectortime=,Door1Intertime=2,Door1REXInput=1,Door1REXTimeOut=0,Door1VerifyType=4,Door1DelayOpenTime=0,Door1MultiCardInterTime=10,ExtDoor1DelayDrivertime=5,Door1ValidTZ=1,Door1SupperPassWord=,Door1ForcePassWord=,Door1KeepOpenTimeZone=0,Reader1AutoMatch=1','2025-02-05 16:11:21.064771'),('ff45cf89-64f2-4740-a57e-816cc28c3064','GQS2235000391','DATA DELETE ReaderWGFormat DoorID=1','2025-02-05 16:09:30.588593');
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
INSERT INTO `employeeattendancetimes` VALUES ('08dd41e4-902f-43da-8097-a2e6b7f00c5d','5247c881-4637-427b-bf16-e6f067ef6e5d',2,'13ce7136-0625-4509-8b40-4cf59e53cd1c','47','Luís Alberto Alves Pereira Antunes',NULL,0,NULL,2,NULL,'2025-01-31 10:46:00'),('08dd4466-b256-45fb-8715-739c30e09ecf','5247c881-4637-427b-bf16-e6f067ef6e5d',2,'5d2a3523-6b80-4b6a-8b7a-c5adda7fff07','55','Ana Maria da Cruz Silva Pinto',NULL,0,NULL,2,NULL,'2025-02-03 15:23:00'),('08dd453c-c3fc-41ab-82e2-c10147c46d82',NULL,NULL,'b13f92e0-0c6a-40fd-b0a4-e0dc9a058219','38','Mário Jorge Marques Gomes Marto',NULL,0,NULL,3,'teste','2025-02-04 16:55:00');
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
INSERT INTO `employees` VALUES ('05036274-6f67-4209-be74-235f665195eb','85','Iulian Gheorghiță Acatrinei','Iulian Acatrinei',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('0a853401-1d56-45b3-b098-b7c4a17c1503','131','Bruno Miguel Araújo de Sousa','Bruno Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('0b112fc1-5786-419f-b5f6-4d6d66d4cde7','22','Eduarda Cristina Alcóbia Ferreira','Eduarda Ferreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ac96b1d0-825b-4e92-b15c-6dac758c7478',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('0d5ed265-4bec-4c2f-b1b3-bf792ef1006b','206','Diogo Alexandre Vasconcelos Brito','Diogo Brito',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('1228dee2-40d1-46ee-a9ad-5cf95e7dc6ef','79','Daniel Alexandre Mata Dupont de Sousa','Daniel Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('12871356-520f-4565-8225-e603eb1ff399','96','João Pedro Candeias Domingues','João Domingues',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('1581679c-fd92-424d-9791-bebfad692df9','215','José Luís Leal da Silva Vaz','José Vaz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('18c0f8a1-5aff-4b6e-a7b7-8ecad253b0f8','172','Bruno António Calvo Gonçalves','Bruno Gonçalves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('1d5bb335-1147-42f4-aec2-3e075a696b67','23','Daniel Nuno Soares da Silva','Daniel Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('1da5a910-b233-4388-86ad-6262e58d7b69','159','Fernando Silva das Dores','Fernando Dores',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('20283403-cd6a-49e1-8635-9a87ee9d6361','104','Ricardo Alves Moreira','Ricardo Moreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('20434383-440a-4879-8889-48931b8025a3','192','Diana Isabel dos Santos Oliveira','Diana Oliveira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('20f5f13a-0737-4f1c-b2fc-20f3589b0b36','179','Bruno José Simões Braga','Bruno Braga',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('2374ae59-aa20-4dfb-805c-71756c62bbbc','24','Noémia Maria Reis Porfírio','Noémia Porfírio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('24344c3d-a4ef-41e5-a067-b2939a8d0d03','47','Luís Alberto Alves Pereira Antunes','Luís Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('28405cac-d574-4d1d-8e59-45e16c1d0822','20','Flávio Pedro Martinho Diniz','Flávio Diniz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('2a431c43-4bdc-4929-9ae4-bc90c31dd459','188','Soraia Filipa Ferreira Gil','Soraia Gil',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('2a4fdb69-0082-4d2f-a1f2-aaccb4e698dd','186','Sidney de Oliveira Cassim','Sidney Cassim',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('2a89299a-6650-4d26-88af-98a80f67a941','95','Leila Patrícia Pereira Marques','Leila Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('2f96572d-dd0a-40b1-be10-156669e87c96','51','Paula Cristina Tavares Ribeiro Miranda','Paula Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('3031a8a0-c925-4262-ab20-f1a7aaaa7232','39','Marta Susana Alves Monteiro','Marta Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('33622f97-b189-4d60-8c1e-dd1ed7e2b6c1','162','Paula Dalina Nitas','Paula Nitas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('33ccbdc1-e055-4ad7-844d-84aa82c5227d','117','Rita Helena Tavares dos Santos','Rita Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','1898c316-8878-4859-ae99-c13626c47590',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('36b12b65-0efc-4b6c-9120-8fdd3e15e0a8','164','Alexandra Carvalho Paredes Gonçalves','Alexandra Gonçalves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('36c6fa4e-39cc-4a6c-b79b-73168f5a7a20','66','Joana Brito Ramos Azevedo','Joana Azevedo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('39854ab7-3abd-4da1-87c1-216cc5ac8627','216','Maria Inês Pereira Duarte','Maria Duarte',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d4ef0534-91b5-4b67-8200-80a79b66ff16',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('3e2bdb41-9df7-4cb4-9d2e-0528af044b55','141','Sofia Pacheco Medeiros de Mesquita Gabriel','Sofia Gabriel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d424a9cb-73b9-445f-98dc-07dc0650548d',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('43ad0a0d-a4fa-4729-b98d-2b04edb1a9b6','123','Raquel Maria Viegas Rocha Santos','Raquel Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','1898c316-8878-4859-ae99-c13626c47590',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('49c9f94b-f8e8-48a1-a10f-bb358fb9568c','157','Isabel Cristina Correia do Nascimento','Isabel Nascimento',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('4cf8bf26-9b8a-464e-b35a-7a023b65b1e7','56','Carlos Manuel Henriques da Cruz','Carlos Cruz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('4e43f339-a3a9-4430-ad98-816b5ed9d586','196','Telma Vanessa Prazeres Gomes','Telma Gomes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('4eb32934-a1de-4774-b980-0cdecd5f9a9b','205','Verónica Sofia Gonçalves Monteiro','Verónica Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('4fdbb218-1a70-4361-ae9a-1b3bd2e0302c','208','Diana Filipa dos Reis Cancela','Diana Cancela',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('546bd404-994a-45cf-ade8-d0f92196f4bd','198','João Vítor Cortegaça Évora Filipe','João Filipe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('550081e2-3537-466d-ab65-3c3dc89bb101','145','Cíntia Vanessa Sombreireiro Romão','Cíntia Romão',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('55bc8779-aaa6-42c7-a098-bb0cfa4f2d25','103','João Pedro Mendes Miranda','João Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('5cc7f7ab-9323-4d1b-b4a1-0a947093b6e6','151','Ana Teresa de Simões Graça e Almeida Marques','Ana Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('5d7775d1-5667-45d5-a6f7-c09710d0e06f','167','Alex Pereira da Silva','Alex Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('60e39afe-b42b-4fd0-b45f-11fdf6eefdbe','144','Pedro Vargas Madeira Palma Amaro','Pedro Amaro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('70bbf9d2-56df-421a-ab04-86c8077f2035','191','Suse Paula Tomás Pires','Suse Pires',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d424a9cb-73b9-445f-98dc-07dc0650548d',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('70f9d5a2-2dc4-4368-92ea-11db521410cf','202','Tomás Forte da Palma Antunes','Tomás Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('7322767e-54f6-4e7d-bd6f-61ec928a3af0','44','Florinda Maria dos Santos Miguel','Florinda Miguel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('74e340d6-e72e-4c21-a51c-ff01a6c2b9eb','124','António Manuel Almeida Pereira','António Pereira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('78871ef7-94e4-4784-9ae3-fe53b2ed97a3','21','Célia Maria Silvestre Silva Lúcio','Célia Lúcio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('7d894dd3-d397-45ea-9d0e-5b192bf5c2e6','36','Helena C. Pereira Tomás N. Esperto','Helena Esperto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ac96b1d0-825b-4e92-b15c-6dac758c7478',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('81b6cbee-39ba-4f4c-88af-dc745103e297','38','Mário Jorge Marques Gomes Marto','Mário Marto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('86d80d56-d6e8-4028-9a6b-f1aa43c8ec85','183','Andreia Filipa Romão Mendonça','Andreia Mendonça',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('891f1468-c515-4a6c-9cf8-64d40dab8c0f','125','Cláudia Patrícia Fernandes Lopes','Cláudia Lopes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','32c91216-2130-418a-bd6c-02cea8d80442',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('8ccae9bc-127f-48ab-80fc-d941b7417552','199','Joana Filipa Figueiredo dos Santos','Joana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('9dd58a74-eb3d-4dfe-b672-09431e2bb580','83','Ana Lisa Gomes Pereira Real Baptista','Ana Baptista',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('a12c8e8f-4fc0-4c3b-b206-d7ee1fe8e333','217','Liliana dos Santos','Liliana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ac96b1d0-825b-4e92-b15c-6dac758c7478',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('a230a0db-ef3d-4724-8dd6-dbdca44f7e09','9','Paulo José dos Santos Mota','Paulo Mota',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('a68f1c20-602a-4617-bae0-515ff759e33f','213','Sara dos Santos Loureiro','Sara Loureiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ac96b1d0-825b-4e92-b15c-6dac758c7478',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('a894ae70-be4f-45db-9696-4172388d007d','55','Ana Maria da Cruz Silva Pinto','Ana Pinto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('b25a1347-dedf-4fd7-8f59-844b4a04dc58','27','Patrique Domingos de Sousa','Patrique Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('b3e99e86-2137-42d8-ad0f-c303888bfcd4','152','Sara da Conceição Soares Amorim Correia','Sara Correia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('b84c20d6-2c77-47e6-9adc-f47b17eccf50','57','Ana Sofia Fernandes Guimarães','Ana Guimarães',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d4ef0534-91b5-4b67-8200-80a79b66ff16',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('b8651179-0488-4c96-b28b-c20f37803c16','181','Jaime Maria Rodrigues Silva','Jaime Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('bb8db21c-fa88-476a-8c70-a237525f7a1d','187','Valentim Silva Melnychuck','Valentim Melnychuck',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('bfed88f3-e101-4def-be9e-cec260ef9149','209','Francisco Maria Líbano Monteiro Rocha e Melo','Francisco Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('c5462565-376a-4df9-9ac6-b7e045ee22d0','195','Miguel João Luz Costa','Miguel Costa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ac96b1d0-825b-4e92-b15c-6dac758c7478',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('c9556af1-6736-4fbb-a318-e7ea7df49fbc','133','Bárbara Filipa Cunha Sampaio','Bárbara Sampaio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('cab62b95-e8a7-4bb8-9144-2bab566243a0','160','Valter Miguel Serra dos Santos','Valter Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('cda57b39-1cca-4c27-be27-ff0bdc56740f','91','Tiago Alexandre Pires Guerreiro','Tiago Guerreiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('cfa915cb-934c-4a2a-adbf-6f53d363aa5b','153','Pedro Miguel Garcias Miranda','Pedro Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('cfec4803-a99a-4af3-9b74-e7200fb86efb','136','Filipe Chapman Garrido','Filipe Garrido',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('d240b791-4862-4297-ae05-bc5efe5a74a7','200','Bárbara Neves Mateus Caldas Marques','Bárbara Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('d3739c2a-0aef-46f3-ab66-ee910e06db8e','93','Marisa Isabel Contente da Silva','Marisa Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('d57a85c5-af16-4bf6-9232-fced538e48e0','165','Thiago Luís de Melo','Thiago Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('d5c35293-981f-4cb8-ac92-e0e6a1e9a42d','32','António Joaquim Pedroso B. Cachola','António Cachola',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('d970ac10-fa34-458b-bfbf-3e8aba630145','132','Miguel Afonso Paulista Verga Caninhas','Miguel Caninhas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','0d082151-01ee-4a36-b724-b32409423c58',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('dcff82e0-e4cc-4064-81fc-1e04fd78cbd0','112','Rute de Jesus Fele Cunha','Rute Cunha',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('e6a6773e-b719-487a-a9ce-db818fb397ea','30','Nelson Carlos Zacarias Rego','Nelson Rego',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f81f7cc-eed4-4758-b7ee-e8715c25d311',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('ee72bf3f-5643-4311-882f-b318b9dd3dd9','65','Inês Filipa Marques Anacleto','Inês Anacleto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','1898c316-8878-4859-ae99-c13626c47590',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('f08a4593-0ab7-43d4-8769-388549d55d1c','203','Alexandra Ribeiro Rijo','Alexandra Rijo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('f22a29b2-9eaa-4098-921a-40dcc78a79ec','128','Valter Jorge Alves Mendes','Valter Mendes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('f54c7aed-b35c-458b-a265-c6e50459af0d','214','Carla Alexandra Almeida Ribeiro','Carla Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('f7a640c7-4ff6-434e-90f7-4b16aa6e7280','86','Carla Alexandra Nunes Dias','Carla Dias',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e31e5044-4015-44f5-9f98-a613a6bc6333',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('f8da1ab7-c52d-4216-9da7-1d716e447809','194','Ana Cristina de Albuquerque Matias Santos','Ana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('faf28f99-7e59-48a3-a4e6-9fd4563e90dc','101','Fábio André Louro Catarrinho','Fábio Catarrinho',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('fcac83cf-c8d0-4733-bd22-911ff6ee2c68','189','Daniel Gaspar Grego de Almeida','Daniel Almeida',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8cd4d7a1-155d-4256-b372-12414875cf77',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('fe22aaaa-2795-4889-907d-7fce36029917','129','Ana Rita Alexandre Branco','Ana Branco',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ac96b1d0-825b-4e92-b15c-6dac758c7478',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL),('ff089e6a-19cd-4cd7-94d3-237bca88f91f','107','Francisco Emanuel P. P. Gomes Ribeiro','Francisco Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','b444c276-5506-4c7d-8c26-edc3db688d39',NULL,NULL,'adf21acc-6bab-4a66-b2ae-5b0911e4af6f',NULL,NULL,NULL);
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
INSERT INTO `entidades` VALUES ('f96d6b10-32f4-45f2-b104-6ad6e3daf556','Bio 2 - Representações e Comércio de Produtos Agro-Pecuários, S.A.',1,'Polo Industrial de Brejos de Carreteiros, Fase 2, Armazém A e B','2950-554','Quinta do Anjo',NULL,'911777384','leila.marques@bio2.pt',501488243,'www.bio2.pt',NULL,NULL,'2025-01-21 16:45:22','2025-02-05 14:32:15',1);
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
INSERT INTO `eventdevices` VALUES ('00fffcd8-3937-417a-b9f1-0d6228d28146',36,260,1,23,NULL,4,NULL,'2025-01-30 14:17:26.000000'),('013a8425-e1a4-490e-99ee-dd1ce3468f5b',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:27:54.000000'),('04117076-7809-4306-932d-7e87555b2bf7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:18:20.000000'),('075e0d42-df55-480e-949b-728ab4cfd710',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:50:00.000000'),('0ab5f837-cab1-4e2a-b63f-ec9eb60dddd7',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:10.000000'),('0c88c390-575f-4532-b8d4-f1782d21b43f',36,260,1,23,NULL,4,NULL,'2025-01-30 11:58:54.000000'),('106be28c-c192-4b02-858e-e0b0f293cd98',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:06:54.000000'),('109e4fa0-a380-43f6-b177-a3877b5f4ba3',0,NULL,0,206,NULL,200,NULL,'2025-01-30 10:58:06.000000'),('12043556-23bf-4da2-bc7f-47d17fed6cc9',22,264,1,0,0,4,NULL,'2025-02-04 14:31:56.000000'),('1284f1b9-f374-40b0-9f05-3823b60aafea',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:28:23.000000'),('152c292f-dd73-477f-8083-e13ae309dd2e',0,NULL,0,214,NULL,200,NULL,'2025-01-30 14:16:17.000000'),('157edd0d-8683-4f02-a63b-44915a75e342',0,NULL,0,105,2,200,NULL,'2025-02-05 12:00:01.000000'),('16029f91-e1aa-4c08-8e0e-9ba630f2d83b',0,NULL,1,41,0,3,NULL,'2025-02-04 09:52:02.000000'),('164a513e-abc6-4759-b083-f2a778ca24b9',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:49:28.000000'),('16a0a08c-d85b-491a-946c-671e630ab2a4',0,NULL,1,41,0,3,NULL,'2025-02-04 09:48:24.000000'),('16fbe5be-5f04-4e44-9e09-2a9b49f6b889',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:30:49.000000'),('176ea746-23be-4594-b54f-23f3e544064b',0,NULL,0,214,NULL,200,NULL,'2025-01-30 14:14:37.000000'),('18f9727d-c92b-46dd-87ce-8b530d267c52',0,NULL,0,105,NULL,200,NULL,'2025-01-30 15:08:25.000000'),('19c94c56-5570-4a9f-ae96-6044342a214d',0,NULL,0,214,2,200,NULL,'2025-02-04 12:21:37.000000'),('1a3ab521-2c84-4360-bfdb-06cacbef7a78',36,260,1,0,1,4,NULL,'2025-02-04 14:31:49.000000'),('1c445e68-5281-4d01-a35e-cdcd2f94ca72',0,NULL,0,105,2,200,NULL,'2025-02-05 09:36:35.000000'),('1d52bd11-bbcb-4025-be1f-e708b8cfccef',0,NULL,1,27,0,3,NULL,'2025-02-04 09:41:35.000000'),('1edca50c-2234-4e92-b9ca-32a074dcd4ba',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:40:42.000000'),('1ffafba1-c303-4a86-a9bd-50e2024e82db',0,NULL,0,214,2,200,NULL,'2025-02-04 10:10:26.000000'),('209fac35-028c-45fb-8dcd-5362a4163a99',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:27:52.000000'),('20a6f5b6-1c91-4ceb-97e3-0d278593f6ad',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:50:01.000000'),('211d3dde-566f-4d3f-8812-bf9e99a9a8e1',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:06:24.000000'),('236479ab-bb2b-4eca-a1a6-3ceb125ca92a',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:24.000000'),('24aa68b5-5ddd-4fc5-a51e-058ce4edb9dd',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:33:11.000000'),('29dd1f8d-8583-4a23-9ade-0e408fc910ff',22,264,1,0,1,4,NULL,'2025-02-04 14:35:37.000000'),('2a7be72d-fcd5-485a-924c-12e7785e6040',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('2b07feff-471e-4a81-af29-480052ea18bd',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:35:30.000000'),('2c7b363d-7473-4c23-982c-85e9ac44c8ae',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:35:42.000000'),('2d5f4e70-ca00-4cb8-8a70-227809e42f5b',0,NULL,0,214,2,200,NULL,'2025-02-04 09:28:21.000000'),('2eac2905-5389-4d48-afd3-efe9a01e253b',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('2fc24f13-6dcb-46c6-9d7c-bfc2216359e1',22,264,1,23,NULL,4,NULL,'2025-01-30 14:16:43.000000'),('3006c180-1751-4079-9d64-619fbe7218d2',0,NULL,0,206,NULL,200,NULL,'2025-01-30 11:11:42.000000'),('301b24d9-8dba-4db7-95fd-24fb18e5a361',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('3020c5cc-181e-49d4-9d03-2368efac1198',0,NULL,0,105,NULL,200,NULL,'2025-01-30 14:16:14.000000'),('30e1830b-0693-40e8-97d7-9b668f826f05',36,260,1,0,1,4,NULL,'2025-02-04 09:57:50.000000'),('33cfe620-a263-4c78-b8b1-7d7106546c88',36,260,1,0,1,4,NULL,'2025-02-04 09:37:45.000000'),('37a0a046-e0f4-457d-9f73-0ee53525e4ee',0,NULL,0,214,NULL,200,NULL,'2025-01-30 15:08:49.000000'),('385c12d0-2486-4152-831a-0389e98018e9',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:30:48.000000'),('3acd48d4-3222-4754-86fc-89e441c18d12',0,NULL,0,105,2,200,NULL,'2025-02-05 09:36:23.000000'),('3d0f9f9b-c15c-414a-9133-0786a9a35082',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:04:05.000000'),('3d1da586-130d-40d1-8d7a-3134e6908afe',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:40.000000'),('401ce0ab-b0a4-4b7a-a590-e2a5bd78168c',36,260,1,23,NULL,4,NULL,'2025-01-30 11:58:49.000000'),('41888916-37c3-49dd-ba35-841bf08e959c',0,NULL,0,214,2,200,NULL,'2025-02-05 09:34:38.000000'),('43d201cc-5f7f-4ba6-995b-d49e6921c4be',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:19:21.000000'),('46b3be44-8484-470d-948d-02e4c857b002',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:06:08.000000'),('48ef4bcd-6afd-4087-a54b-a219128223e7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('4b883b1b-56e0-474c-ad4d-2ecdcfc15c86',22,264,1,23,NULL,4,NULL,'2025-01-30 12:10:27.000000'),('4df3bfff-7986-4083-aadc-fa3b4c72a6ee',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:23.000000'),('54442e8d-a70c-4b95-859b-61bf8e0aeb6c',36,260,1,22,1,4,NULL,'2025-02-04 14:37:10.000000'),('55ab2482-ac3c-4c7e-9f10-75f201011bd3',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('561db0f2-1fba-425a-800b-9ff2fb491858',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:34:50.000000'),('59eaff8a-b4bc-42a2-a287-695d0218310c',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:19.000000'),('5abce151-19fc-422a-ada6-73b7557dd836',5,264,3,22,NULL,4,NULL,'2025-01-30 15:11:32.000000'),('5b331089-a12c-4642-9292-64e74c218423',0,NULL,1,41,0,3,NULL,'2025-02-04 10:32:09.000000'),('5e62fd37-f143-4785-ba77-7ec994a9a041',0,NULL,0,214,2,200,NULL,'2025-02-04 14:19:33.000000'),('5f3fb8c8-d473-4858-b139-0634a5e39de1',0,NULL,0,214,2,200,NULL,'2025-02-05 09:36:35.000000'),('609bfe0e-0c22-4722-b47a-dc82cd537b34',0,NULL,0,214,NULL,200,NULL,'2025-01-30 15:08:51.000000'),('624c8974-9d6d-452a-a356-8244909f78d8',0,NULL,0,105,NULL,200,NULL,'2025-01-29 11:47:31.000000'),('63558ebd-b63f-4f65-9487-988996479521',0,NULL,0,105,2,200,NULL,'2025-02-05 09:36:32.000000'),('639dd1fc-e650-414e-bc6a-ad28102d07c4',0,NULL,1,41,0,3,NULL,'2025-02-04 09:48:32.000000'),('662b0362-3918-44da-8515-b1d44eb05c27',0,NULL,0,105,2,200,NULL,'2025-02-05 10:25:57.000000'),('6684f671-4a28-4417-87e8-9cdefc34f949',0,NULL,0,214,2,200,NULL,'2025-02-05 09:36:35.000000'),('690e3616-9157-4a8c-939e-acd0f4502d26',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:23.000000'),('6cec45b8-9963-4987-a04c-5049c6d1ea9d',0,NULL,0,214,NULL,200,NULL,'2025-01-30 10:43:25.000000'),('6dc479a8-35fb-4fc5-bb3e-dfb2639db6a2',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:27:49.000000'),('6e297204-1e15-49b0-a799-4bb12bf7d5a6',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:11.000000'),('6fcb2538-67da-42a8-99a3-f4905ee28f46',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:30:47.000000'),('725708a5-7b86-4960-8ea9-a3de3b4cb797',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:39.000000'),('74d02ad6-d972-4e0f-b2c8-2a5710614960',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('7a59b372-adac-4ea3-9b61-17fe6395a236',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:06:29.000000'),('7d266487-f64c-4db2-a8e9-a41a509f3f09',0,NULL,1,41,0,3,NULL,'2025-02-04 10:15:03.000000'),('7e437bdf-db00-45b3-b68b-2d7ae1db0277',22,264,1,23,NULL,4,NULL,'2025-01-30 14:15:39.000000'),('83678725-fdee-483c-b1e1-84d3a962ced7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:39.000000'),('8670248b-a351-45af-b62d-e354815bbf3f',0,NULL,0,214,2,200,NULL,'2025-02-05 10:25:57.000000'),('880ee8f0-777f-495f-9bcc-2645af210332',0,NULL,0,214,2,200,NULL,'2025-02-05 09:36:33.000000'),('89dffc36-f964-45a2-922d-0c73dd836ece',0,NULL,0,206,NULL,200,NULL,'2025-01-30 09:22:09.000000'),('8a56c2d5-2e92-492c-8110-ba5326f7b107',0,NULL,0,206,NULL,200,NULL,'2025-01-30 11:34:06.000000'),('8a5a4623-020a-44fa-bb78-e3a0da8fe55c',1,260,3,0,NULL,4,NULL,'2025-01-30 15:11:39.000000'),('8a752df0-bbac-42a0-afe6-c621f6b68627',0,NULL,0,214,NULL,200,NULL,'2025-01-30 14:14:36.000000'),('8c2b3482-c551-42d9-a5d8-974db0cceb22',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:34:52.000000'),('8da894a0-dca1-4803-886c-10442746f520',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:08.000000'),('8df5581a-2212-4a46-81d0-31f784a69b87',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('8e88715d-15db-4220-a547-83905f4208a2',0,NULL,0,214,2,200,NULL,'2025-02-05 09:36:29.000000'),('8eb6a57f-3a6d-4e68-a3a2-5a2309c3ba43',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:50:01.000000'),('8f935625-48d2-4fd9-b99c-5d41ee80134c',0,NULL,0,206,NULL,200,NULL,'2025-01-30 10:42:38.000000'),('91b067c4-34d6-4aa0-b9a7-10a30d41f087',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:02:00.000000'),('947f140e-d815-4ace-9ab0-df9dda6a544b',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('94abd3bd-9c2c-41c0-851d-c85c34a48cb7',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:20.000000'),('952a453f-feae-43c4-ba14-de9e0f463d9d',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:33:15.000000'),('9924a784-bc6c-4f8a-8022-3a1a733876a5',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:27:01.000000'),('994f60ea-89a6-451b-9b7e-79c137b0d46f',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:06:29.000000'),('9965575f-f8fd-42d6-86c3-0f092596fb8b',36,260,1,23,NULL,4,NULL,'2025-01-30 14:16:46.000000'),('99b6a1f8-a5f9-4d70-af87-e2149800df6f',0,NULL,1,27,0,3,NULL,'2025-02-04 09:41:48.000000'),('9af14090-ccc1-4997-ba36-07071c64aab1',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:20.000000'),('9b6fdcbd-1591-4990-9487-7931a8587515',22,264,1,23,NULL,4,NULL,'2025-01-30 11:58:25.000000'),('9c178f87-68c0-49f8-adff-bbff15c225fd',36,260,1,22,0,4,NULL,'2025-02-04 14:37:07.000000'),('9d2f6e36-1f4d-4b7a-8248-a3c2fbc19d7a',36,260,1,0,0,4,NULL,'2025-02-04 09:37:53.000000'),('9f348c5e-e675-45b5-8e4d-2cbc881bb24d',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:36.000000'),('a0450a3f-605a-458e-89bb-bf9a3b5fd3c1',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('a17cbaaa-85f9-4001-82ae-e7bfb2355ec7',9,276,1,0,0,4,NULL,'2025-02-04 09:51:44.000000'),('a1c7f9be-1d65-49a2-af1e-1a3116c0deca',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:08.000000'),('a22d6384-2ce7-4474-9324-87bce688dc37',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('a33b8baf-0325-4a82-9cfe-a04e1dabee5c',22,264,1,23,NULL,4,NULL,'2025-01-30 14:18:21.000000'),('a381901b-2fbd-401a-81eb-88c69381db42',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:02:04.000000'),('a741cff9-ec1b-4655-9dc8-c90078729b91',36,260,1,23,NULL,4,NULL,'2025-01-30 12:10:30.000000'),('a7bd2183-c15b-4512-a75c-b4d66579081c',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:27:52.000000'),('a7ff052e-fdeb-4c48-be0c-d00803bf9c24',22,264,1,23,NULL,4,NULL,'2025-01-30 11:58:56.000000'),('a88c7722-30d0-4d62-99c1-7e5ab6fe01b4',0,NULL,0,105,2,200,NULL,'2025-02-04 09:26:02.000000'),('a9145a69-13f4-4770-928b-863c044ca45d',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:40:41.000000'),('a9baedf5-5add-4f2d-b556-8fba8837296c',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('a9bdb03f-b68a-4791-916d-7efd343ff3f6',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:21.000000'),('aa5ad90f-4da1-463f-8e67-60be0ccaef8d',0,NULL,1,41,0,3,NULL,'2025-02-04 10:10:47.000000'),('aba7a259-ff01-45a7-9646-bec8c11851b6',0,NULL,0,206,2,200,NULL,'2025-02-04 09:23:41.000000'),('abfbf170-de7f-45fc-a2fb-df80ddaf35d2',22,264,1,22,1,4,NULL,'2025-02-04 14:37:04.000000'),('ae3c3222-0715-46b4-9d5b-6f7531124bc9',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:14:39.000000'),('ae3cecb6-c6a3-4766-b028-6038c45ff073',0,NULL,1,41,0,3,NULL,'2025-02-04 09:51:23.000000'),('b046fa69-c518-4dda-b4ab-9433381e8ee3',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:21.000000'),('b293c620-ba6b-4394-8530-8c2caf5314c0',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:35:33.000000'),('b8fcd51c-1dfd-4cb5-b563-99cb713e92d4',0,NULL,0,214,2,200,NULL,'2025-02-05 10:25:56.000000'),('b944323e-3ad2-4f78-b461-b82c40cd93c5',9,276,1,23,0,4,NULL,'2025-02-04 09:49:40.000000'),('b9ff81f7-a3ef-407a-af85-9fcab060e0d5',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:33:23.000000'),('b9fff57b-b1d7-4460-8d26-58e1235bef1c',5,264,3,22,NULL,4,NULL,'2025-01-30 15:09:00.000000'),('be5244e5-b0fb-4b16-9568-f48fb8c3cf66',0,NULL,0,214,2,200,NULL,'2025-02-05 12:01:02.000000'),('c0c0289a-b627-4243-9dda-3f49f5080cc4',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:29:56.000000'),('c113284b-ba87-466e-a249-cee81877630f',22,264,1,23,NULL,4,NULL,'2025-01-30 11:58:52.000000'),('c2867f1b-be40-468d-852b-fdfb2007a786',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:46:00.000000'),('ca5e9317-c201-4561-a59f-0ebe9494c8ba',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:06:06.000000'),('cb94dad9-0dda-4cdb-9866-e12876c23d74',36,260,1,0,1,4,NULL,'2025-02-04 09:31:08.000000'),('cd609f29-8b6b-4145-8599-337da77fbd7d',36,260,1,23,NULL,4,NULL,'2025-01-30 14:18:25.000000'),('ce4b7b98-cc9b-4123-abcb-ca40b7d537fd',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('d0008e8f-f0fa-4a9e-a3ad-3d7875c94b2f',36,260,1,23,NULL,4,NULL,'2025-01-30 11:58:27.000000'),('d102130b-e77e-4a31-bab3-2c6211154291',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:12.000000'),('d223e04a-f7e6-42be-b40c-d8cd6193ff9a',22,264,1,0,1,4,NULL,'2025-02-04 14:33:06.000000'),('d4967257-159f-466a-8b2b-c8bc4b87d899',0,NULL,1,41,0,3,NULL,'2025-02-04 10:16:42.000000'),('d6b66fbb-6ad2-4a46-a87d-13f94b333cee',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:33:25.000000'),('dd04f640-126a-4885-b9b0-ee2483b502b9',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:05:50.000000'),('dfab506c-6a25-40ab-b5c1-91b59d89b0af',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:30:47.000000'),('e2b2dbcc-2848-4c42-a4a3-80964f4eee03',1,260,3,0,NULL,4,NULL,'2025-01-30 15:08:52.000000'),('e2f1faca-363a-4210-98c9-d7f40169287e',36,260,1,0,1,4,NULL,'2025-02-04 09:30:58.000000'),('e47950c3-737a-4577-9d1f-de25674adfd7',36,260,1,0,0,4,NULL,'2025-02-04 09:31:16.000000'),('e66e7585-b98c-4c1c-a8f7-c3240e85dd56',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:45:56.000000'),('e7623b92-71c0-4ba5-bc46-0e36faebd78e',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:50:03.000000'),('e9bcdc5c-201e-48b5-8031-5b149d734589',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('ea470bef-4679-438b-b420-70f7044361e7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:06:30.000000'),('efa6e981-8626-4467-84df-6a3607cfef9c',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('f0aa6d67-19cb-4aeb-be07-baf46d066187',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:08.000000'),('f3c5ba57-3629-4e23-9b67-3f0327d316d1',9,276,1,0,0,4,NULL,'2025-02-04 09:58:07.000000'),('f3efce02-305f-4add-ace1-a8209d5b0087',0,NULL,0,105,2,200,NULL,'2025-02-05 09:36:33.000000'),('f516cd07-37e2-4613-885d-c8d8f72ff48f',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:30:48.000000'),('f7648430-2524-472b-b4d7-85ad6e4950ac',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:27.000000'),('f7af8ed1-3151-4e6f-82bf-d43a85702293',36,260,1,0,0,4,NULL,'2025-02-04 14:33:12.000000'),('fd4d5c1d-6963-4a82-ac45-da92a17c3551',0,NULL,1,41,0,3,NULL,'2025-02-04 09:51:36.000000'),('ffe4366f-b630-4978-89d0-0a1c0fb03303',0,NULL,1,27,0,3,NULL,'2025-02-04 09:42:57.000000');
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
INSERT INTO `externalentities` VALUES ('08dd45f3-f369-4a9c-8fc8-3256ee8672b8','Teste',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,123456789,'2025-02-05 14:47:02','2025-02-05 14:47:02','08dd45f3-e86d-4c75-829f-d0277edc5487');
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
INSERT INTO `externalentitietypes` VALUES ('08dd45f3-e86d-4c75-829f-d0277edc5487',1,'Teste','2025-02-05 14:46:44');
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
INSERT INTO `groups` VALUES ('adf21acc-6bab-4a66-b2ae-5b0911e4af6f','Geral',NULL);
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
INSERT INTO `kioskrecolhamoedeiros` VALUES ('3bbb46af-60ab-43f3-8788-938e950a6f31','2025-01-31 17:09:30.142015','admin',100,0,100,50.000000000000000000000000000000,50.000000000000000000000000000000,0.000000000000000000000000000000,NULL,1,'5247c881-4637-427b-bf16-e6f067ef6e5d','2025-01-31 17:09:30.142013');
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
  `InOutStatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kiosktransactions`
--

LOCK TABLES `kiosktransactions` WRITE;
/*!40000 ALTER TABLE `kiosktransactions` DISABLE KEYS */;
INSERT INTO `kiosktransactions` VALUES ('0089279e-01c2-4f48-9dc8-b6ed5017cc42','2025-01-30 12:10:30.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 12:10:31.155700','2025-01-30 12:10:31.155701',0),('02bc7418-6aa3-48e2-bf11-73d50cba0d54','2025-01-30 12:07:07.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:07:10.237753','2025-01-30 12:07:10.237753',NULL),('04943f8c-376a-4e00-afd2-101d04db324c','2025-01-30 09:33:11.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:33:26.509822','2025-01-30 09:33:26.509822',NULL),('04e1bc30-f363-4811-8e67-e751154f89a7','2025-02-04 14:19:33.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 14:19:34.216207','2025-02-04 14:19:34.216207',2),('05118950-5c9d-401d-94f0-2d954a56cfe2','2025-01-30 15:11:39.000000',1,260,'Abertura efetuada',0,3,4,'GQS2235000391','2025-01-30 15:11:40.832965','2025-01-30 15:11:40.832965',1),('065b7d38-fab4-4f19-8e98-ccd5c41cdf45','2025-01-30 11:06:29.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:06:29.593848','2025-01-30 11:06:29.593848',NULL),('08dd4448-9d71-4f0c-8bd3-fe26516d4840','2025-02-03 11:47:00.000000',22,264,'Movimento manual',0,3,200,'AJYS223460212','2025-02-03 11:48:02.501188','0001-01-01 00:00:00.000000',0),('08dd4449-443a-40cb-80f9-864cd4dbfd31','2025-02-03 11:52:00.000000',22,264,'Movimento manual',0,3,200,'GQS2235000391','2025-02-03 11:52:42.442347','0001-01-01 00:00:00.000000',0),('08dd4449-5b97-41ce-88ab-97b62d306856','2025-02-03 11:53:00.000000',47,0,'Movimento manual',0,3,200,'GQS2235000391','2025-02-03 11:53:21.640788','0001-01-01 00:00:00.000000',0),('08dd4449-88c5-491f-8a97-db96cbfdcc7e','2025-02-03 11:54:00.000000',51,0,'Movimento manual',0,3,200,'GQS2235000391','2025-02-03 11:54:37.442626','0001-01-01 00:00:00.000000',0),('09731d08-4bf1-4515-ad8d-f60b11440cd5','2025-01-30 11:58:27.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:27.020591','2025-01-30 11:58:27.020591',NULL),('0b7420b3-05d3-42aa-b363-1ef098b82a3f','2025-02-04 09:31:16.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:31:20.205733','2025-02-04 09:31:20.205733',0),('0c7a1b52-6674-4361-b70f-30a3ca79a271','2025-01-30 12:10:27.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 12:10:27.966691','2025-01-30 12:10:27.966692',NULL),('0d6f850e-7407-4a03-9bfa-b46466d6f070','2025-02-05 10:25:57.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 10:25:57.384541','2025-02-05 10:25:57.384541',2),('0d8f79bb-3522-48ef-bd22-878e6e940b3b','2025-02-04 09:51:36.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 09:51:36.261525','2025-02-04 09:51:36.261525',0),('0e4ab522-74fa-45d3-b4c7-2a17567779cd','2025-01-30 12:06:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:06:08.584348','2025-01-30 12:06:08.584349',NULL),('11040c42-1309-4979-98cd-f39f73a850ff','2025-02-04 17:00:59.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 09:34:37.000000','2025-02-05 09:34:37.000000',NULL),('1195697d-aebf-4a6f-a207-f8046a11bdce','2025-01-30 15:08:25.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 15:08:53.000689','2025-01-30 15:08:53.000689',NULL),('128e8225-43b4-45ed-a407-61a0cc979bc0','2025-01-30 12:34:50.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:34:52.058415','2025-01-30 12:34:52.058468',NULL),('150f1461-3e71-4894-a9b0-4ccdebbbe1a7','2025-02-04 09:42:57.000000',0,NULL,'Não registrado',27,1,3,'GQS2235000391','2025-02-04 09:42:57.752666','2025-02-04 09:42:57.752666',0),('15d2c9e0-9c7d-4166-8009-576d61a4df80','2025-01-30 09:33:15.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 09:33:29.498453','2025-01-30 09:33:29.498453',NULL),('1a1e3439-80c9-4ff5-be6c-841cd4523df9','2025-01-30 09:41:40.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:41.307932','2025-01-30 09:41:41.307932',NULL),('1aaf4e2f-24d4-43d2-9218-52a8aa1355d4','2025-02-05 09:34:38.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 09:34:37.636998','2025-02-05 09:34:37.636998',2),('1bab8459-2498-44f0-bbef-6fd0f533a4b6','2025-01-30 11:30:49.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:30:49.560494','2025-01-30 11:30:49.560494',NULL),('1c3184d3-5301-4563-9706-a720791e8a1d','2025-01-30 11:30:47.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:30:48.720658','2025-01-30 11:30:48.720658',NULL),('1c68fc0c-16cf-482f-91ae-605dac2ca001','2025-02-04 14:35:37.000000',22,264,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:35:52.297458','2025-02-04 09:35:52.297459',1),('1eb611aa-e088-4f9f-a624-209479378c9b','2025-01-30 11:47:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:47:41.240467','2025-01-30 11:47:41.240467',NULL),('2316e756-ba01-45cf-8d06-461cefc1001d','2025-01-30 14:16:14.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 14:16:18.127593','2025-01-30 14:16:18.127593',NULL),('25861255-2394-48a2-a558-8cd03191abea','2025-01-30 12:07:07.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:07:10.781444','2025-01-30 12:07:10.781444',NULL),('26a9ece9-c580-446f-9d21-72f91a4bc5b6','2025-01-30 12:27:54.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:27:54.000000','2025-01-30 12:27:54.000000',NULL),('2789271d-0168-4566-83b2-3706f66d962c','2025-01-30 11:47:19.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 11:47:40.995878','2025-01-30 11:47:40.995878',NULL),('278c42f3-388f-42eb-9a05-45aef08c1b2f','2025-01-30 12:34:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:34:52.883023','2025-01-30 12:34:52.883023',NULL),('292c6668-aeb3-4021-9966-4eb7cd101367','2025-02-04 14:37:10.000000',36,260,'Período de tempo inválido',22,1,4,'GQS2235000391','2025-02-04 09:37:25.255277','2025-02-04 09:37:25.255278',1),('2dbe05a8-71ad-44ab-ab26-a7945c2057f2','2025-02-04 09:31:08.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:31:12.264754','2025-02-04 09:31:12.264755',1),('2fa36ded-be4a-425b-9af9-61dc5dc6943c','2025-01-30 11:40:41.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:40:42.267706','2025-01-30 11:40:42.267763',NULL),('3099db4a-d10a-4af2-9ea2-f0e0792d6c9d','2025-01-30 11:58:54.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:55.072230','2025-01-30 11:58:55.072230',NULL),('314462b1-4d40-42d8-8d89-c41b98c43f14','2025-01-30 11:19:51.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:29:33.000000','2025-01-30 11:29:33.000000',NULL),('31900804-8694-4efc-89bf-e475b3e11e96','2025-01-30 12:07:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:07:12.785921','2025-01-30 12:07:12.785921',NULL),('33d280ba-b916-4f5b-a127-8132004a1942','2025-01-30 14:14:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 14:14:37.000000','2025-01-30 14:14:37.000000',NULL),('34015bc7-eb42-4e97-9b61-06f6e1154b76','2025-01-30 11:49:19.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000',NULL),('37e5d281-d2b3-453d-925f-7844ffb72fe7','2025-02-04 14:31:56.000000',22,264,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:32:11.761787','2025-02-04 09:32:11.761788',0),('387a1b2f-61dd-4e6a-beec-1420820a80dc','2025-01-30 11:28:23.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:28:24.276031','2025-01-30 11:28:24.276078',NULL),('3cf2a64d-918e-403b-b489-07888859b521','2025-01-30 09:41:39.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:39.988996','2025-01-30 09:41:39.988996',NULL),('3f2bf5ef-e9f3-4f5b-b15a-1fdaafb82040','2025-01-30 11:58:49.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:50.285250','2025-01-30 11:58:50.285250',NULL),('415a3b11-42fb-44b0-a94d-dee557b26635','2025-01-30 14:14:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 14:14:39.228923','2025-01-30 14:14:39.228923',NULL),('439d44d4-1f32-4190-90c6-713498bf77f8','2025-01-30 09:33:25.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:33:26.755606','2025-01-30 09:33:26.755606',NULL),('45dce04f-5d6b-49ed-954b-685418e6f7a1','2025-02-05 09:36:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 09:36:34.524539','2025-02-05 09:36:34.524540',2),('4616f369-257b-4190-9c97-875599df7a44','2025-01-30 11:18:20.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:18:22.064482','2025-01-30 11:18:22.064539',NULL),('461fa482-d5cc-4338-a4e2-5805585d38a5','2025-01-30 11:29:56.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:48.470850','2025-01-30 11:30:48.470850',NULL),('46df02a3-3dd4-4b4f-bae9-2d9ac4e21348','2025-02-04 12:21:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 12:21:39.402975','2025-02-04 12:21:39.403170',2),('46f790e9-40da-4295-8b55-b6f1dc36e03d','2025-02-04 09:52:02.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 09:52:02.408862','2025-02-04 09:52:02.408862',0),('4719e50d-7b3e-4e32-8e53-e69376c14d53','2025-02-04 09:37:53.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:37:53.750898','2025-02-04 09:37:53.750899',0),('494cf998-50fa-495a-b1d0-eaa408dbe4b6','2025-02-04 12:21:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 12:21:39.000000','2025-02-04 12:21:39.000000',NULL),('4b70845d-71b8-47f4-960c-217b11604e21','2025-01-30 11:11:42.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 11:14:40.274299','2025-01-30 11:14:40.274344',NULL),('4bbd3281-8ec5-41ba-810c-36b1bbbb7f88','2025-02-04 09:41:35.000000',0,NULL,'Não registrado',27,1,3,'GQS2235000391','2025-02-04 09:41:35.952537','2025-02-04 09:41:35.952538',0),('4c62480e-8a88-43dd-96d7-5376b4d1575e','2025-01-30 12:35:33.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 14:14:36.928427','2025-01-30 14:14:36.928512',NULL),('4fe90f19-a7f2-4f89-acdf-52587fb6b8be','2025-01-30 12:07:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:07:10.890983','2025-01-30 12:07:10.890983',NULL),('5082913a-7a87-4442-aa89-cc2919bde443','2025-02-05 09:34:38.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 09:34:37.000000','2025-02-05 09:34:37.000000',NULL),('55a2b038-1c49-4b97-bb6e-42064c255953','2025-02-04 14:37:04.000000',22,264,'Período de tempo inválido',22,1,4,'GQS2235000391','2025-02-04 09:37:19.026069','2025-02-04 09:37:19.026069',1),('56175e15-b741-46a0-ba36-20b1d8f51534','2025-02-04 10:32:09.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 10:32:09.524753','2025-02-04 10:32:09.524907',0),('5777a6db-e9b3-4f01-ac74-f6f322f67131','2025-02-04 09:51:44.000000',9,276,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:51:44.552035','2025-02-04 09:51:44.552035',0),('5803700d-ad73-49c6-b308-c99dc450275a','2025-02-03 16:55:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 09:23:56.000000','2025-02-04 09:23:56.000000',NULL),('59a12ede-6878-4494-a88d-336eab9ba110','2025-01-30 11:50:03.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:50:06.010595','2025-01-30 11:50:06.010595',NULL),('5a0e8c63-fd7b-47e9-8c36-ccc8becdcc15','2025-02-04 10:09:42.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-04 10:10:33.000000','2025-02-04 10:10:33.000000',NULL),('5cd7e6e6-134f-4871-b3fd-f77fafa3ecb0','2025-01-30 10:58:06.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 11:05:50.400412','2025-01-30 11:05:50.400495',NULL),('60d09ab3-95c9-4c81-befc-c1d922b2d0b0','2025-02-04 10:10:26.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 10:10:26.445071','2025-02-04 10:10:26.445071',2),('61d41f12-a046-48b1-b4df-4112e826d87b','2025-02-05 12:00:01.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 12:01:03.058222','2025-02-05 12:01:03.058223',2),('6258e289-0cb8-4640-b815-ead1b5a91b82','2025-02-04 09:41:48.000000',0,NULL,'Não registrado',27,1,3,'GQS2235000391','2025-02-04 09:41:49.020515','2025-02-04 09:41:49.020516',0),('6440e7e4-d2ed-48fb-b58a-36e32afde01b','2025-01-30 11:58:52.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:53.472594','2025-01-30 11:58:53.472594',NULL),('6481fa40-74d3-4479-a1b8-f5cc72959410','2025-02-04 09:49:40.000000',9,276,'Acesso não autorizado',23,1,4,'GQS2235000391','2025-02-04 09:49:40.275805','2025-02-04 09:49:40.275806',0),('65c7f933-61ee-42d7-a5cb-19b0506ad881','2025-01-30 12:27:52.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:27:53.707531','2025-01-30 12:27:53.707531',NULL),('662b6cb9-d104-4e98-a4cd-8e0070c998ef','2025-01-30 12:30:15.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:34:52.000000','2025-01-30 12:34:52.000000',NULL),('66af3c79-7ddf-4a19-970c-0f46b7762239','2025-01-30 11:58:56.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:56.671106','2025-01-30 11:58:56.671106',NULL),('6702ec9a-0770-4ab8-876d-31613572cae9','2025-01-30 09:41:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:38.179445','2025-01-30 09:41:38.179445',NULL),('677cbf26-a30c-4ac8-a89e-db021cb3175b','2025-01-30 11:29:56.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:48.000000','2025-01-30 11:30:48.000000',NULL),('68f8dacb-f97d-4dec-ab44-16c2d373afda','2025-02-04 09:37:45.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:37:46.165796','2025-02-04 09:37:46.165797',1),('6a119509-144e-4853-bb8d-2310a89f08cb','2025-01-30 09:22:09.000000',0,NULL,'Iniciar dispositivo',206,0,200,'AJYS223460212','2025-01-30 09:22:26.925693','2025-01-30 09:22:26.925693',NULL),('6aec0a0e-15a8-42cf-9472-f671bdd666bb','2025-01-30 09:41:37.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:38.737019','2025-01-30 09:41:38.737019',NULL),('6afb9572-b81f-4525-85c5-0c0cfec3f558','2025-01-30 11:35:42.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 11:40:44.906245','2025-01-30 11:40:44.906245',NULL),('6c95fae0-4196-4ce7-b204-b751c92502ef','2025-02-04 12:29:50.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 09:34:37.000000','2025-02-05 09:34:37.000000',NULL),('6f40f01f-b8a7-4236-bb19-3e3ec55029a3','2025-02-04 09:30:58.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:31:01.657134','2025-02-04 09:31:01.657134',1),('7114bfc2-42bd-4fa3-a307-df966e31c08f','2025-01-30 11:50:01.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:50:03.473295','2025-01-30 11:50:03.473295',NULL),('716eaa33-9e96-410b-8e42-9f84ae3a66e5','2025-01-30 12:02:00.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:02:05.733814','2025-01-30 12:02:05.733814',NULL),('71802d44-e5c2-4ea8-9bf9-2af41369ee6a','2025-01-30 12:07:07.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:07:10.455976','2025-01-30 12:07:10.455976',NULL),('724b7f6e-05a5-44d5-a0fd-d1d7b6dfc57d','2025-01-30 14:17:26.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:17:27.505292','2025-01-30 14:17:27.505292',NULL),('726dd62c-0d0e-4585-9c38-e23461f6ed58','2025-01-30 12:27:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:27:53.826460','2025-01-30 12:27:53.826460',NULL),('7442434b-d1ff-4898-9cb3-e24a29730a55','2025-02-05 12:01:02.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 12:01:03.271305','2025-02-05 12:01:03.271306',2),('79034e8b-0ae3-41f7-a611-3211d9ce702a','2025-02-05 09:36:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 09:36:35.040677','2025-02-05 09:36:35.040678',2),('7c4bc9a5-2955-4649-9313-741e52705acd','2025-01-30 14:15:39.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:15:40.657479','2025-01-30 14:15:40.657479',NULL),('7c590276-b92b-41c8-a44c-9017ba756301','2025-01-30 11:30:48.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:30:49.049821','2025-01-30 11:30:49.049821',NULL),('7deea35d-6813-4194-9c5e-7b0861c88ea4','2025-01-30 14:16:46.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:16:47.245157','2025-01-30 14:16:47.245158',NULL),('7e69b751-5826-41be-b744-2c1a65c6d4ab','2025-01-30 11:47:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:47:37.285161','2025-01-30 11:47:37.285162',NULL),('7f3ef653-e5f0-4c1a-acb3-891b11505b56','2025-01-30 10:04:52.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000',NULL),('804cae2c-0b86-413b-8812-feb67dd9d4ab','2025-02-05 09:36:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 09:36:34.758890','2025-02-05 09:36:34.758890',2),('83e84e75-b9f3-4296-a3a8-5db17be03a8c','2025-01-30 10:19:03.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000',NULL),('844f35a8-68ec-448b-9888-3c5fe292eff3','2025-02-04 09:23:41.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-02-04 09:23:56.566623','2025-02-04 09:23:56.566710',2),('8847a898-b8ed-46e0-a414-3df9e77e49b4','2025-01-30 12:07:07.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:07:10.565243','2025-01-30 12:07:10.565243',NULL),('88e2c879-ee01-4454-9a1d-5275ead7c49b','2025-01-30 11:05:50.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:05:50.883717','2025-01-30 11:05:50.883717',NULL),('89455d83-a0ab-4b48-b563-30c2fd6f009d','2025-02-04 14:33:12.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:33:27.708941','2025-02-04 09:33:27.708941',0),('894848d6-60c8-44e0-8731-6aaf8a6bcdd4','2025-01-30 12:22:23.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:22.700775','2025-01-30 12:22:22.700775',NULL),('895c702d-8343-483e-86d2-072ad9dc7c26','2025-02-05 10:25:09.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 10:25:55.000000','2025-02-05 10:25:55.000000',NULL),('8986aaa2-9662-42a7-b9aa-ffa9075e3c8b','2025-01-30 09:33:23.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 09:33:29.716384','2025-01-30 09:33:29.716384',NULL),('8cd3d849-f5ce-4e89-aea5-d35b4ad8655b','2025-01-30 11:42:01.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000',NULL),('90204eca-e462-4f5c-a50a-3b8860e3f818','2025-01-30 09:51:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000',NULL),('90b0d9be-11b2-4385-a2fa-4fe6084be598','2025-01-30 11:06:29.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:06:29.222478','2025-01-30 11:06:29.222478',NULL),('912eef4f-4a26-48bd-8a5c-05fe03c0104a','2025-01-30 11:46:00.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:46:04.346940','2025-01-30 11:46:04.346940',NULL),('913943e3-cea0-4813-969d-81e3b65aa22a','2025-01-30 14:16:17.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 14:16:18.343073','2025-01-30 14:16:18.343073',NULL),('91517ae1-e35c-4257-acac-75bebc7d1018','2025-01-30 11:34:06.000000',0,NULL,'Iniciar dispositivo',206,0,200,'AJYS223460212','2025-01-30 11:34:19.481799','2025-01-30 11:34:19.481799',NULL),('9196792b-ffbe-476b-89ce-ff29fa8f39e4','2025-02-04 09:58:07.000000',9,276,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:58:08.283724','2025-02-04 09:58:08.283724',0),('92e56c9c-dcd4-4657-a771-da924c83da06','2025-01-30 12:27:54.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:27:55.050842','2025-01-30 12:27:55.050842',NULL),('92e6f9d1-8cac-4b4a-b1bd-923e7f70a2af','2025-02-04 14:33:06.000000',22,264,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:33:21.066962','2025-02-04 09:33:21.066962',1),('93115f23-0925-4f64-84b1-4b3680fc2543','2025-01-30 10:45:12.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:07:30.000000','2025-01-30 11:07:30.000000',NULL),('934fa76d-088d-40a4-94d4-f1b8bf5f8afb','2025-02-05 09:36:32.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 09:36:32.024409','2025-02-05 09:36:32.024409',2),('95d0d6dd-881f-43b7-9f75-0e1f6cd8359e','2025-02-05 10:25:56.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 10:25:55.713422','2025-02-05 10:25:55.713423',2),('95d7cad9-14dc-477f-af2b-1232f0503ca6','2025-01-30 15:08:51.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 15:08:53.234946','2025-01-30 15:08:53.234946',NULL),('9648552b-77ff-4683-8902-c27f6fbec82c','2025-02-04 10:15:03.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 10:15:03.140450','2025-02-04 10:15:03.140451',0),('980e26b7-36eb-4153-89de-5f74aff8d0a9','2025-02-04 09:48:32.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 09:48:32.404642','2025-02-04 09:48:32.404642',0),('9944a5ca-1d8d-495e-b218-509c49d942ce','2025-01-30 12:25:03.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000',NULL),('9c0aa5d6-1eda-46f7-8e63-32c0e5f6f814','2025-01-30 10:42:38.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 10:43:28.200707','2025-01-30 10:43:28.200797',NULL),('9d4862fe-3b75-40b4-9d1f-6329568bb45f','2025-01-30 09:41:27.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:37.956383','2025-01-30 09:41:37.956383',NULL),('9da2cc7a-c2bd-45bd-99ca-3ebaa0ee969a','2025-01-30 11:15:57.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:19:16.000000','2025-01-30 11:19:16.000000',NULL),('a0feca5e-dbbd-4b48-91c4-5ccbf283c054','2025-01-30 14:14:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 14:14:37.246481','2025-01-30 14:14:37.246481',NULL),('a1b56e48-c45b-485d-bf27-92126281241f','2025-01-30 11:06:30.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:06:31.318024','2025-01-30 11:06:31.318025',NULL),('a490ebaf-a4c1-454d-92a3-6fd80d9f678b','2025-02-04 09:48:24.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 09:48:24.893976','2025-02-04 09:48:24.893977',0),('a7239ff6-ae86-4db7-a0bc-29a9f889a41c','2025-01-30 09:19:21.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:19:23.566928','2025-01-30 09:19:23.566928',NULL),('a8a9d13a-30ac-420c-b6d0-f0449865016c','2025-01-30 12:27:49.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:27:50.627164','2025-01-30 12:27:50.627227',NULL),('a9af750a-ecfe-4ade-b105-bba2d5610caf','2025-02-04 09:28:21.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 09:28:25.790400','2025-02-04 09:28:25.790400',2),('ac0a7e72-7a8e-4917-a3cc-c565e7e4c5ee','2025-02-04 09:26:02.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-04 09:28:25.530898','2025-02-04 09:28:25.530932',2),('ae2425d2-8304-452e-bede-e4d81627469f','2025-02-04 10:16:42.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 10:16:42.066556','2025-02-04 10:16:42.066557',0),('ae257d53-964d-419d-b7a9-6d42e0aa98ea','2025-01-30 10:43:25.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 10:43:28.590457','2025-01-30 10:43:28.590458',NULL),('b1dc6202-1957-4810-b8e0-e9c3317deb72','2025-01-30 12:22:20.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:22.021488','2025-01-30 12:22:22.021488',NULL),('b207f394-e6cc-4ad8-90f9-f0ef2c71ddbc','2025-01-30 11:47:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:47:36.920314','2025-01-30 11:47:36.920314',NULL),('b266b9fb-7e21-4a69-8f9e-253e200b05d8','2025-01-30 11:49:28.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 11:50:05.791301','2025-01-30 11:50:05.791301',NULL),('b3a84fe6-49dc-4a1f-9995-bbb401b9608d','2025-01-30 09:41:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:38.514113','2025-01-30 09:41:38.514113',NULL),('b42c9792-e2c6-41a4-a4b6-774ad578f2d5','2025-01-30 12:07:08.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:07:13.002727','2025-01-30 12:07:13.002727',NULL),('b441eea6-db44-4025-a4ab-3481ff14bf3a','2025-01-30 12:06:54.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:07:10.021017','2025-01-30 12:07:10.021017',NULL),('b573aaef-499d-4052-884d-e861e7c5cea9','2025-01-30 10:10:17.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000',NULL),('b70957b6-932e-4cab-af29-13d716a19107','2025-02-04 09:57:50.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:57:50.570645','2025-02-04 09:57:50.570645',1),('b7d424cc-7bb9-4283-a368-a4ff7b8fb678','2025-01-30 12:22:21.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:22.365670','2025-01-30 12:22:22.365670',NULL),('b8983d98-a8c3-4dd0-b024-22fa866a527c','2025-01-30 15:11:32.000000',5,264,'Período de tempo inválido',22,3,4,'GQS2235000391','2025-01-30 15:11:33.363571','2025-01-30 15:11:33.363571',NULL),('b8c85a11-e4eb-4df1-bf39-7143726b4045','2025-01-30 09:41:39.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:39.735497','2025-01-30 09:41:39.735497',NULL),('ba5c2fdd-0939-424b-b5b6-0b175328c845','2025-02-05 09:36:33.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 09:36:32.769675','2025-02-05 09:36:32.769676',2),('ba8c9f49-d31f-4523-a0e6-1eb49631427a','2025-01-30 14:18:21.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:18:21.665856','2025-01-30 14:18:21.665856',NULL),('bc3b2a88-2d5d-49a1-830d-d1290e456579','2025-01-30 14:16:43.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:16:44.053896','2025-01-30 14:16:44.053896',NULL),('bd06888e-96d0-4f25-9284-330c065e010b','2025-01-30 11:50:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:50:03.588574','2025-01-30 11:50:03.588574',NULL),('bee23dcb-96a5-4465-b730-169624ce7ca4','2025-01-30 12:30:03.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000',NULL),('bf14277f-b028-4b33-a517-b9d9783c7ab7','2025-01-30 12:02:04.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:02:05.949069','2025-01-30 12:02:05.949069',NULL),('bf6b35d8-4cea-45af-9a1f-9c9083382d28','2025-01-30 11:45:56.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:45:57.646784','2025-01-30 11:45:57.646832',NULL),('bf767d0d-bd1d-452d-99db-6351939f9bb3','2025-01-30 11:30:47.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:48.936249','2025-01-30 11:30:48.936249',NULL),('bfd2a86b-3feb-44d8-8a32-c3a86dc03c55','2025-02-04 09:51:23.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 09:51:23.246664','2025-02-04 09:51:23.246664',0),('bfe81ae3-b76d-4dd3-b51a-ef26a5a4f12f','2025-01-30 12:07:12.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:07:13.115454','2025-01-30 12:07:13.115454',NULL),('c2a02de4-be77-4e76-be34-aec75675d723','2025-01-30 11:58:25.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:25.406843','2025-01-30 11:58:25.406900',NULL),('c8271c83-bad6-4799-a24d-fdb48a52bcec','2025-02-04 14:31:49.000000',36,260,'Abertura efetuada',0,1,4,'GQS2235000391','2025-02-04 09:32:04.254745','2025-02-04 09:32:04.254745',1),('cad24a75-8b24-4af2-9e36-9179b9ba159b','2025-01-30 14:18:25.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:18:26.358846','2025-01-30 14:18:26.358846',NULL),('cb28febb-194a-4c8e-b475-a49063d7f7fc','2025-02-04 09:28:21.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-04 09:28:25.000000','2025-02-04 09:28:25.000000',NULL),('cd73411f-d9cc-4893-ae19-6a407f701316','2025-02-03 17:41:05.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-04 09:23:56.000000','2025-02-04 09:23:56.000000',NULL),('ce301c57-4162-4d66-9589-21d7253821c1','2025-01-30 12:22:23.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:22.921918','2025-01-30 12:22:22.921919',NULL),('d289068c-513c-4c2f-8886-96d1ee1816e6','2025-01-30 12:07:07.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:07:12.568934','2025-01-30 12:07:12.568935',NULL),('d46cc90d-f837-4d7c-acbc-c51675063d12','2025-01-30 12:22:11.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:21.719462','2025-01-30 12:22:21.719529',NULL),('d6384684-5508-4c2d-85d5-3ffcafc2dc50','2025-02-04 10:10:47.000000',0,NULL,'Desconhecido',41,1,3,'GQS2235000391','2025-02-04 10:10:47.162705','2025-02-04 10:10:47.162705',0),('d73ef0e2-2f6f-4431-85bb-8450ad17b6d4','2025-01-30 12:06:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:06:08.734351','2025-01-30 12:06:08.734351',NULL),('d95ed914-a3d7-40dc-a1f6-5aa97785c15c','2025-01-30 11:50:00.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:50:01.725840','2025-01-30 11:50:01.726013',NULL),('dd34f27d-7d51-4515-83f4-6e8a140432eb','2025-01-30 11:35:32.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000',NULL),('ddad08e3-f66c-4d06-b375-e6e2531a40ff','2025-02-05 10:25:57.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 10:25:57.273886','2025-02-05 10:25:57.273886',2),('de72b860-e28e-4a74-97e0-feb26791a1d3','2025-01-30 11:47:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:47:37.061921','2025-01-30 11:47:37.061921',NULL),('de935615-089e-4679-a85b-ab535992eb42','2025-01-30 15:08:49.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 15:08:50.586890','2025-01-30 15:08:50.586967',NULL),('df9688b0-23f3-424e-b343-1b44c094add6','2025-01-30 12:35:30.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 14:14:39.000248','2025-01-30 14:14:39.000249',NULL),('e1509930-26a8-4956-b70e-7c2d92aef45a','2025-01-30 11:47:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:47:36.694142','2025-01-30 11:47:36.694142',NULL),('e200705c-52c0-48c7-8ea8-7b84cf611658','2025-02-04 14:37:07.000000',36,260,'Período de tempo inválido',22,1,4,'GQS2235000391','2025-02-04 09:37:22.365178','2025-02-04 09:37:22.365179',0),('e24e4102-b8f4-4cb2-9643-45e3a336f4e4','2025-01-30 12:22:24.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:24.524257','2025-01-30 12:22:24.524257',NULL),('e35c5ad2-6557-4c27-b5a6-ff6564e4a05d','2025-02-04 12:11:28.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-04 12:21:39.000000','2025-02-04 12:21:39.000000',NULL),('e3d6092b-9b53-4b2d-9e8d-531f75544ce7','2025-01-30 12:25:14.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:27:54.000000','2025-01-30 12:27:54.000000',NULL),('e4b99ff4-286c-4079-98ea-07236e0c4b5f','2025-02-05 09:36:33.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 09:36:33.122625','2025-02-05 09:36:33.122625',2),('ea2c687b-26e3-414d-a0cc-94f33f578c86','2025-01-30 15:09:00.000000',5,264,'Período de tempo inválido',22,3,4,'GQS2235000391','2025-01-30 15:09:02.026088','2025-01-30 15:09:02.026088',NULL),('eac4a9b5-e35c-47a5-97d8-3a8e1402e0f2','2025-01-30 11:27:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:27:02.273804','2025-01-30 11:27:02.273869',NULL),('eb362b23-5327-4779-8510-17da184ce13e','2025-01-30 09:41:37.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:38.402540','2025-01-30 09:41:38.402540',NULL),('ebce0341-1aba-4d81-ba5d-aee3c399ed0d','2025-01-30 11:14:39.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:14:40.608004','2025-01-30 11:14:40.608004',NULL),('f049a41b-50b6-412e-bb36-95339c878cac','2025-01-30 12:22:20.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:22.248500','2025-01-30 12:22:22.248501',NULL),('f292dc18-babf-48e8-91f7-363ba939e66d','2025-01-30 11:40:42.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:40:45.139437','2025-01-30 11:40:45.139437',NULL),('f3324f5c-fa51-4c20-a585-50c22f1f9c74','2025-01-30 11:47:10.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:47:36.224689','2025-01-30 11:47:36.224842',NULL),('f445f165-e480-4569-838b-2416db5a4152','2025-01-30 15:08:14.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:09:06.000000','2025-01-30 15:09:06.000000',NULL),('f623f5e8-6410-4bff-9271-684642b05718','2025-01-30 11:06:24.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:06:28.436533','2025-01-30 11:06:28.436577',NULL),('f64d1c05-d882-45b8-8732-b10b9a7cca08','2025-01-30 11:08:05.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:15:33.000000','2025-01-30 11:15:33.000000',NULL),('f748d8dd-4923-4955-a857-8c47b0355e21','2025-01-30 12:22:21.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:22.586257','2025-01-30 12:22:22.586257',NULL),('f895f597-2797-4686-8ca6-fc3b43d894b1','2025-01-30 11:27:55.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:29:33.000000','2025-01-30 11:29:33.000000',NULL),('f9bbacac-f29a-4a55-b08c-1c1c516d36a7','2025-01-30 11:30:48.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:49.273218','2025-01-30 11:30:49.273219',NULL),('fa216d7c-2e12-4903-a9d0-b331b134b9e4','2025-02-05 09:36:23.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-02-05 09:36:29.632075','2025-02-05 09:36:29.632117',2),('fa36c263-fd86-45fd-9766-5ef561b6cc29','2025-01-30 15:08:52.000000',1,260,'Abertura efetuada',0,3,4,'GQS2235000391','2025-01-30 15:08:54.293864','2025-01-30 15:08:54.293865',NULL),('fb365e36-06ea-481f-8bdb-fd949cfdb292','2025-01-30 12:04:05.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:06:08.280310','2025-01-30 12:06:08.280357',NULL),('fbd204a9-59f9-4b34-b0c8-9a2819f467ff','2025-02-05 09:36:29.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-02-05 09:36:29.893512','2025-02-05 09:36:29.893512',2),('ff890905-b750-4051-95e0-3f25af504753','2025-01-30 11:47:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:47:37.498889','2025-01-30 11:47:37.498889',NULL),('ffef9faa-0ee4-43d3-a18d-962670fd9da6','2025-01-29 11:47:31.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:19:22.994269','2025-01-30 09:19:22.994338',NULL);
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
INSERT INTO `professions` VALUES ('72ce9da6-58e7-4991-b07c-973dfc962d2b',2,'P2','Profissao 2'),('7b77eed5-24ac-4b2f-945c-a8ef8a32f235',1,'P1','Profissao 1');
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
INSERT INTO `roles` VALUES ('0a9fe4a6-b5b4-457a-a4e1-e284b291346e','User','USER',NULL),('b96baa02-9b01-461f-a719-5bda256b1727','Admin','ADMIN',NULL);
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
INSERT INTO `useractivesessions` VALUES ('08dd45dd-2471-414e-852f-fd2c7ed698be','ae500c57-91db-40a6-ad70-898e210b4419','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFlNTAwYzU3LTkxZGItNDBhNi1hZDcwLTg5OGUyMTBiNDQxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzg3NjQyMjV9._C_lX7mjepqKlTNMmvxrLlhVdFilRgnsEKzrRnWLMJk','501488243','2025-02-05 14:03:45.795767'),('08dd45ef-9fa2-4769-848e-f772ea26863e','ae500c57-91db-40a6-ad70-898e210b4419','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFlNTAwYzU3LTkxZGItNDBhNi1hZDcwLTg5OGUyMTBiNDQxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzg3NzIxNjN9.h6Gyk3ZKX-q315yHZnEfu_qK61Z94IMOTRss1CGwmBw','501488243','2025-02-05 16:16:03.420307'),('08dd468d-95e8-4317-8d54-9a58f4ad0d9f','ae500c57-91db-40a6-ad70-898e210b4419','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFlNTAwYzU3LTkxZGItNDBhNi1hZDcwLTg5OGUyMTBiNDQxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzg4NDAwMDd9.KO1b6FROVK-hMfLkb-eFgDkmwSUg668pd0znDcEjWpA','501488243','2025-02-06 11:06:47.571228'),('08dd469e-c33b-46d6-8a1e-aa3458619755','ae500c57-91db-40a6-ad70-898e210b4419','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFlNTAwYzU3LTkxZGItNDBhNi1hZDcwLTg5OGUyMTBiNDQxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzg4NDczODV9.zoWiNE0t2ul_7_uTMMvUIgpiDoMRGf6CGBqU7rmxk80','501488243','2025-02-06 13:09:45.070656'),('08dd46b9-0fd5-4496-8ac6-be9325b5968f','ae500c57-91db-40a6-ad70-898e210b4419','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFlNTAwYzU3LTkxZGItNDBhNi1hZDcwLTg5OGUyMTBiNDQxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzg4NTg2ODB9.2SwsTkAncS5LZTQcusa02U47jcehNbCEeoMZJ3QXrp0','501488243','2025-02-06 16:18:00.500681'),('08dd46ca-14b0-4bd1-8be0-08225350b7e0','ae500c57-91db-40a6-ad70-898e210b4419','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFlNTAwYzU3LTkxZGItNDBhNi1hZDcwLTg5OGUyMTBiNDQxOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGV4YW1wbGUuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3Mzg4NjU5OTB9.wKkCYOnoYqWqLq4Sf7xCW3s6MTTsGSXMAeZj3tdVNzg','501488243','2025-02-06 18:19:50.090098');
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
INSERT INTO `userroles` VALUES ('25b587e4-ca7f-49d5-9bb8-e9c4da238391','b96baa02-9b01-461f-a719-5bda256b1727'),('ae500c57-91db-40a6-ad70-898e210b4419','b96baa02-9b01-461f-a719-5bda256b1727');
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
INSERT INTO `users` VALUES ('25b587e4-ca7f-49d5-9bb8-e9c4da238391',NULL,NULL,'nidgroup','NIDGROUP','admin@nidgroup.pt','ADMIN@NIDGROUP.PT',1,'AQAAAAIAAYagAAAAEGcIWJdcwsyXsdHlYjmfC4Zwf/J/KNo0LQer55wkNbn0pD0FlztlzjhAD7WTPemajg==','','2a75912e-3758-472d-b77b-bc63342a6ad6',NULL,0,0,NULL,0,0),('ae500c57-91db-40a6-ad70-898e210b4419','Admin',NULL,'admin','ADMIN','admin@example.com','ADMIN@EXAMPLE.COM',1,'AQAAAAIAAYagAAAAEJ0j0mNeFe5vGVZsulmXguo4oF9kqCKN4pCMPWLXcNEmM7TdzOz480OzVGi6FtSq1Q==','','06a932e2-3d75-4a68-a820-7f41872648eb',NULL,0,0,NULL,0,0);
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
INSERT INTO `userstasks` VALUES ('00b24bcb-22d5-4c15-a95e-5ff12c5896a0','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-05 11:35:11.844174'),('031e2fc8-e824-41aa-976e-094d1fdd32ce','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-04 10:07:02.960652'),('03b6f7b9-7016-4709-8e7d-da15fd7fff50','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-04 09:46:01.553258'),('048965c7-010c-4619-a398-5d9ebed2973d','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 12:08:59.433928'),('053dbaa1-93b7-4c93-821d-146a2a796d7b','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-05 15:21:35.611985'),('06454105-104d-4dbc-957c-c20dc293c967','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 15:55:02.448638'),('0c5c1e3a-c251-4391-9f7d-faf0a829a4a0','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-04 09:44:11.110638'),('0fe9b56d-fc83-4d4f-8f8a-257860a1e28b','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentity',1,'Criação da Empresa Externa Teste','2025-02-05 14:47:01.967490'),('112eb5b0-2cc6-4a0d-b898-a210470f022d','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-04 09:45:32.628900'),('11c5141f-6145-401c-bdc8-0eeaba413370','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Eduarda Ferreira','2025-02-05 09:56:11.278921'),('141f6f1e-b74c-476f-803e-b3c790b71791','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-05 09:37:38.150340'),('14413fdf-4bfe-4319-abed-06998d9573a1','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 14:16:03.416426'),('1566f379-68ec-4e36-9918-4629d8eb45e6','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 14:19:31.609689'),('19f4e904-54af-428f-9b6c-c7de8efc8183','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 10:08:04.574098'),('1b5df23a-2398-4452-8531-e17e42caf95f','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 12:03:45.790554'),('1fa8be3b-e1f6-48bd-9e49-52902b6e1988','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 15:14:56.384706'),('20128ef3-de38-45ea-85ee-d21620d357d6','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 11:09:45.060080'),('2a211e79-6f6d-45e0-bcc3-360b5b95250f','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Flávio Diniz','2025-02-05 09:48:30.104101'),('2da94df4-3422-4504-b31d-0b441a29ffd9','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 09:06:47.402372'),('2f6fbb0b-fb3c-4672-886a-0e516233a4cc','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-05 09:44:28.558228'),('30b32922-d206-4c54-9714-f4c02ad42c9a','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 12:14:21.125508'),('347e69f3-5aae-4538-8823-a9fc0a3fb3aa','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Patrique Sousa','2025-02-05 15:26:47.576683'),('3ac588a7-8b8e-4f81-9380-dc89dec74878','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-01-31 16:01:44.847684'),('3bf155aa-d267-4100-8701-dc647ebeab33','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-01-31 14:37:02.943309'),('45e7e760-ee2c-4218-9ef7-3d977e7a3048','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-05 15:21:59.031092'),('4aba6d28-e3cd-4024-868b-5b2077ff76e3','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 16:19:49.964753'),('4dc02276-6ef4-4f1e-afbf-ce684c46d322','ae500c57-91db-40a6-ad70-898e210b4419','admin','departament',2,'Atualização do departamento Call Center','2025-02-05 09:59:59.121471'),('55b77cd4-1f7b-48d7-9cb0-e99fe738e1f3','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 14:18:00.483576'),('5a62a977-e572-49b2-9d36-4536ba7e9c78','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Noémia Porfírio','2025-02-05 09:56:22.412608'),('5ed5ad4a-68dc-4571-b11a-9aa8f60ede7c','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-04 09:47:27.327448'),('637358e6-47bd-474c-8352-4f32f7b692fd','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Flávio Diniz','2025-02-05 15:26:32.255713'),('6670f2f7-3a60-44ab-859e-1ca8e4855395','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 09:31:10.721459'),('69a43b06-c9d9-4476-9171-4a7dc4b11bf6','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-01-31 14:32:55.729030'),('6a2f21f2-9d74-4735-91b7-6a4f8de42d71','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-02-05 09:59:13.820825'),('6c21367d-80a6-4376-8acf-eabba722d712','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Flávio Diniz','2025-02-04 10:08:18.256060'),('6d6a22b7-5067-47f9-8de9-b655b4c8aef5','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-04 09:04:35.091880'),('6d9c9b4f-e96e-4aa4-a8cb-81a337941b44','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 16:16:52.682731'),('6f6bb23e-e716-4928-b4a8-e640bd23420d','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Célia Lúcio','2025-02-03 16:45:26.894706'),('7253463f-ef04-4786-a514-038468a7ad82','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentitytype',3,'Criação do Tipo para Empresa Externa Teste','2025-02-05 14:46:30.507096'),('7358691f-3f8e-4f7c-a081-355a0bb88798','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 12:18:35.757596'),('75607de2-1896-4b30-bb75-eb773f29e90b','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Célia Lúcio','2025-02-05 09:56:06.117248'),('7c11ac69-076c-4113-ba68-de7a89de6856','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-01-31 09:06:10.509264'),('7c5653b3-019e-4a3a-b33b-c8f805c60d00','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Flávio Diniz','2025-02-03 16:46:29.542786'),('7f9f6a11-90df-4716-ab6d-9d9327891d9b','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-05 17:42:12.732483'),('82787d26-68ef-4970-9616-7620f9c9b16c','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 12:18:32.110138'),('84320e9a-1a43-40c9-b63e-61e63751b80d','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 16:38:07.844344'),('8590c2fa-513c-49a7-b03d-901a95968c92','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-04 09:40:26.830257'),('87899f8d-b3fc-468a-a5f3-8265b60caaf3','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-04 11:05:14.709780'),('884bfbf6-d9a2-4578-96b0-b7c95f601113','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentity',1,'Criação da Empresa Externa Teste','2025-02-05 14:42:16.305633'),('895377a9-530f-4d2e-9aa9-097b1df6095f','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 14:19:35.657299'),('8c44d102-a627-49ee-93af-00125d6d1448','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-04 16:05:52.153871'),('8e07945b-d451-48ca-81ed-b7d3931b1b4a','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 15:49:54.013656'),('8eac53f7-6fc7-4544-ae6a-6920a5b34f7e','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentity',1,'Criação da Empresa Externa Teste','2025-02-05 14:36:49.556820'),('8f43bc8f-379b-4a05-80ac-4e3e9b877efe','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-02-05 09:56:16.748918'),('8fb82bcf-6b50-4c91-8483-74a05e619ddc','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentitytype',1,'Criação do tipo para Empresa Externa Teste','2025-02-05 14:36:56.725557'),('95e6b9a9-21db-484e-b090-f7e4ab1778b7','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 09:37:27.887075'),('96611a82-4da4-4047-93fa-fc01a768efd2','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 17:34:33.555742'),('9780daf6-7487-4d18-a63e-efc0adfc7407','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 12:17:45.935609'),('99cf4dd3-2b3b-4ffd-bcdc-da039d7259a2','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 15:19:34.862785'),('9a493721-65ed-4775-ba7d-ac187645faa9','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 10:08:21.106794'),('a0d75d20-b598-4a63-aa1f-04a120c55a68','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-05 12:02:27.400667'),('a1719796-0a4f-44f6-81df-de7fbce6617d','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 12:17:49.087767'),('a4967c03-6356-40dd-a971-a0b6521f4bf6','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 11:37:45.578478'),('ae565e34-a6eb-4e04-8944-ac0928213f94','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-03 12:23:28.852669'),('b5d9813d-d5bd-4acf-aebd-892ca3d63f14','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-04 14:20:51.259896'),('b5f37468-ebbb-4b5d-a619-4665c6972a68','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',3,'Eliminação da(s) pessoa(s) com id System.Collections.Generic.List`1[System.Guid]','2025-02-03 11:55:14.273253'),('b6573718-5bdd-4178-be81-4cdc84efbcad','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 12:14:14.184251'),('bb90ebf0-57db-4a31-adeb-9cbb8c6c8369','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-03 12:23:24.055699'),('bf9fbd19-b37d-4c65-b2cf-cbdb11ead689','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-05 16:37:07.042367'),('c22381e9-3681-42c5-a4b3-e6b376385a66','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-01-31 15:59:52.446068'),('c3d36e84-074c-4113-b4eb-d80dfcac21c5','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-01-31 17:35:32.084533'),('ccb5c92d-f229-49e9-b39d-0d454b80fffd','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentity',2,'Atualização da Empresa Externa Teste','2025-02-05 14:37:08.366832'),('d263d8f1-2f9a-44d3-98b8-4aa6c11be1dd','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-01-31 11:08:26.365955'),('d45a691b-9350-45c5-be7c-5782330b4a0b','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-01-31 15:05:31.182694'),('d55f8f41-48f9-474a-ab16-e33dc824f720','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-02-05 09:59:22.811475'),('d89aa306-e9ea-4e98-a731-1563a2cd22b0','ae500c57-91db-40a6-ad70-898e210b4419','admin','externalentitytype',1,'Criação do tipo para Empresa Externa Teste','2025-02-05 14:46:43.539539'),('d934cbba-3e78-4d78-ac92-4b3815d15c40','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-05 15:21:11.552226'),('da11c3bd-6629-49e1-9a56-3dbf3c098862','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Flávio Diniz','2025-02-05 15:22:12.680642'),('da65f810-e207-4ad3-af34-4c313617860b','ae500c57-91db-40a6-ad70-898e210b4419','admin','category',1,'Criação da categoria teste','2025-02-05 14:34:22.437542'),('dc5f7023-9971-4894-8c47-7266c0dc9e1a','ae500c57-91db-40a6-ad70-898e210b4419','admin','zone',1,'Criação da zona com o nome Teste','2025-02-05 14:34:07.780183'),('e7a04e82-03f9-49a4-816a-f2b66694301d','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-02-05 09:56:39.113368'),('ec469f2a-c81b-4c4b-b6cc-f7d0b72d8f50','ae500c57-91db-40a6-ad70-898e210b4419','admin','employee',2,'Atualização da pessoa Marta Monteiro','2025-02-03 16:50:15.021170'),('ef061e14-c47a-465d-a136-55c6758ee9ed','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-04 17:00:20.375922'),('f2c87454-672a-454a-b58b-f99b8f8075c3','ae500c57-91db-40a6-ad70-898e210b4419','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 09:37:42.017586');
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
INSERT INTO `zones` VALUES ('08dd45f2-25f3-4919-8fa8-5d02e6799d30',NULL,'Teste',NULL,NULL,'TT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nclock2'
--

--
-- Dumping routines for database 'nclock2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-06 16:52:55
