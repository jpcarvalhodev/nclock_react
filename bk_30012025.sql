-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nclock
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
INSERT INTO `accauxiliares` VALUES ('197b37b7-3b8d-4e44-b30b-543f881d4b94','Teste 4 portas-AuxIn4',0,4,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650431','2025-01-30 15:07:49.650431'),('1a75f1a6-bbbc-4121-914b-413653c899e3','Teste 4 portas-AuxOut2',1,2,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650658','2025-01-30 15:07:49.650658'),('291a5cad-c7fb-47a0-b740-d3f51dfe3f9a','Teste 4 portas-AuxIn2',0,2,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650345','2025-01-30 15:07:49.650345'),('45f66eb8-573b-4abd-ab79-935dc7828e2c','Teste 4 portas-AuxIn3',0,3,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650414','2025-01-30 15:07:49.650414'),('65c2b4ad-a0c3-4852-ad1c-272dfd57423e','Teste 4 portas-AuxOut1',1,1,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650620','2025-01-30 15:07:49.650620'),('6bd16808-bf42-4f49-89f8-d5e0d5380e1d','regterg-AuxIn1',0,1,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.131467','2025-01-30 11:48:56.131524'),('8f1ceb11-7878-44d9-a8f1-ca7f91871244','regterg-AuxOut2',1,2,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.144043','2025-01-30 11:48:56.144043'),('bb79cf9e-54b0-4d83-af28-bbb455371a22','Teste 4 portas-AuxIn1',0,1,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.645755','2025-01-30 15:07:49.645815'),('d9370d05-53af-4db6-8659-9088950fde97','regterg-AuxOut1',1,1,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.144017','2025-01-30 11:48:56.144017'),('e3caed6e-8996-452b-9640-b01e761e579e','Teste 4 portas-AuxOut4',1,4,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650668','2025-01-30 15:07:49.650668'),('f1f7581f-34d6-4594-ad0c-df488784eaf5','Teste 4 portas-AuxOut3',1,3,0,'5247c881-4637-427b-bf16-e6f067ef6e5d',NULL,0,'2025-01-30 15:07:49.650663','2025-01-30 15:07:49.650663'),('fcd5ec28-2549-4a46-b8da-5bff97225adf','regterg-AuxIn2',0,2,0,'136d9c74-a3bb-4049-95c1-85c7416ad4b0',NULL,0,'2025-01-30 11:48:56.143880','2025-01-30 11:48:56.143880');
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
INSERT INTO `accdoors` VALUES ('5147d1fa-d619-4716-b420-fa505fe1d49a',NULL,'2025-01-30 11:48:56',NULL,NULL,NULL,0,'2025-01-30 11:48:56',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'regterg-door2',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'136d9c74-a3bb-4049-95c1-85c7416ad4b0','AJYS223460212','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('555e8f6e-1baa-48b2-8348-609a63077e52',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,4,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door4',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('636a8d42-5728-4df4-97c7-dec2d3d424f4',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door2',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('8a016951-8628-4aae-8af6-b6b835493d90',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door1',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('a8f57cb8-d746-4ede-ae29-9db02db04205',NULL,'2025-01-30 15:07:49',NULL,NULL,NULL,0,'2025-01-30 15:07:49',NULL,NULL,NULL,2,NULL,NULL,0,10,0,3,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste 4 portas-door3',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'5247c881-4637-427b-bf16-e6f067ef6e5d','GQS2235000391','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c'),('b743c53b-3c6a-4866-824b-dc29ea034e7e',NULL,'2025-01-30 11:48:56',NULL,NULL,NULL,0,'2025-01-30 11:48:56',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,5,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'regterg-door1',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,'136d9c74-a3bb-4049-95c1-85c7416ad4b0','AJYS223460212','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c');
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
INSERT INTO `acchorarios` VALUES ('6beff968-1f3a-4d6d-b635-b203b9f3b125','6328b1cf-4648-4ef3-b856-4df9aeb948e4','88bd3f59-62ec-4820-8ffa-f5d1bf928f1c','2025-01-30 11:57:25',0);
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
INSERT INTO `accplanoacessos` VALUES ('ea157a68-f782-4171-abe0-2ce6c3daa20a','Plano Acesso 24H',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-01-30 11:58:34',NULL);
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
INSERT INTO `accplanohorarios` VALUES ('6328b1cf-4648-4ef3-b856-4df9aeb948e4','Plano Horario 24H',NULL,NULL,NULL,'2025-01-30 11:57:25',NULL);
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
INSERT INTO `accplanosacessodispositivos` VALUES ('08dd4125-6be3-4d0c-8512-9c989bd8feae','ea157a68-f782-4171-abe0-2ce6c3daa20a','136d9c74-a3bb-4049-95c1-85c7416ad4b0','5147d1fa-d619-4716-b420-fa505fe1d49a','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'2025-01-30 11:58:34',NULL),('08dd4140-553f-4712-8d49-e7d7ae2bf9f2','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','555e8f6e-1baa-48b2-8348-609a63077e52','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd4140-5540-46fb-8cd2-065ae7598209','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','a8f57cb8-d746-4ede-ae29-9db02db04205','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd4140-8126-404a-8119-30110b1dbf55','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','8a016951-8628-4aae-8af6-b6b835493d90','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd4140-8126-40d3-825d-a5b5b4faff0c','ea157a68-f782-4171-abe0-2ce6c3daa20a','5247c881-4637-427b-bf16-e6f067ef6e5d','636a8d42-5728-4df4-97c7-dec2d3d424f4','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL),('08dd4141-fd81-4da7-8897-69c461d81979','ea157a68-f782-4171-abe0-2ce6c3daa20a','136d9c74-a3bb-4049-95c1-85c7416ad4b0','b743c53b-3c6a-4866-824b-dc29ea034e7e','6328b1cf-4648-4ef3-b856-4df9aeb948e4',NULL,'0001-01-01 00:00:00',NULL);
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
INSERT INTO `accreaders` VALUES ('2bcb3042-fb26-4098-869c-752ccff8b288','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door4-reader1',1,0,NULL,NULL,'555e8f6e-1baa-48b2-8348-609a63077e52'),('49949434-e303-4ac1-912e-f6aa72d3121c','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door1-reader1',1,0,NULL,NULL,'8a016951-8628-4aae-8af6-b6b835493d90'),('5fbb9a4f-62e0-4229-9c3b-91417750f9a3','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door3-reader1',1,0,NULL,NULL,'a8f57cb8-d746-4ede-ae29-9db02db04205'),('605892b5-6a31-415e-aa96-732d5ef6f3ad','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door2-reader1',1,0,NULL,NULL,'5147d1fa-d619-4716-b420-fa505fe1d49a'),('88f0d4c7-1270-4dd7-b89f-5282c8b4d88c','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door2-reader2',2,1,NULL,NULL,'5147d1fa-d619-4716-b420-fa505fe1d49a'),('8d5021bf-d88c-469d-abfa-9fa01b12123c','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door2-reader2',2,1,NULL,NULL,'636a8d42-5728-4df4-97c7-dec2d3d424f4'),('8e4e8a87-d808-479f-9a73-da7d98cabec1','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door2-reader1',1,0,NULL,NULL,'636a8d42-5728-4df4-97c7-dec2d3d424f4'),('c3bb8128-a7b8-4201-a1bf-ecf023840ab8','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door4-reader2',2,1,NULL,NULL,'555e8f6e-1baa-48b2-8348-609a63077e52'),('eabfc45d-7be3-414b-a2ea-77fc6194e6ec','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door3-reader2',2,1,NULL,NULL,'a8f57cb8-d746-4ede-ae29-9db02db04205'),('ef9dcdd1-1544-4d8e-afe9-8f0da2d4efc5','2025-01-30 15:07:50','2025-01-30 15:07:49','Teste 4 portas-door1-reader2',2,1,NULL,NULL,'8a016951-8628-4aae-8af6-b6b835493d90'),('f545d3ab-82e7-4832-b272-12a9b24fd0d0','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door1-reader2',2,1,NULL,NULL,'b743c53b-3c6a-4866-824b-dc29ea034e7e'),('f5ec6cf5-563f-4ae7-aec5-379c616be4f5','2025-01-30 11:48:56','2025-01-30 11:48:56','regterg-door1-reader1',1,0,NULL,NULL,'b743c53b-3c6a-4866-824b-dc29ea034e7e');
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
INSERT INTO `acctimeseg` VALUES ('88bd3f59-62ec-4820-8ffa-f5d1bf928f1c','1',NULL,NULL,'2025-01-30 09:19:20',NULL,NULL,NULL,NULL,'2025-01-30 09:19:20',NULL,NULL,NULL,NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00',1,'23:59','00:00','00:00','00:00','00:00','00:00','24-Hour',NULL,'23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00','23:59','00:00','00:00','00:00','00:00','00:00');
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
INSERT INTO `configurations` VALUES ('configSoftware','lisenceKey','oKF0mhoP73dUT6MQu+4ZHy7qA7wibJ84ekXTUir2DYY3s5lERQVz1+L7QMWMo/pqBsgwA1Bdp3G3QOBOa9cOHOD9DmQoPBiTEYFPKA3v82Fk+x25krP/jhCtqYvaeGfsE1sLNKehHjwJuU0iUrcXBOK2OopjN1fFGy9jUC3Yo2EbXPI8HOjVYqiI20x4F9SULrrTPhy49UVTxvZChQaQVhtQSBH3VXNLiWzde2W4xwWBJ5FRsK5CcBJLQD08xKyloAW8kK/5VBpvqL5vUvRGU7Y1qdEOfFWqmiEa8oZ5Y4wYMNIbVgFeDfK38aS10GK1MjzmZEf8UI4GBtgfKGzmsb2SN45diza6ZeG42SksrD6ltuVEEb8n271usgrqx7/9WG/81PwsaM4Da5wRQQnUGxnmFDgiyQoxm6FlfLNpPD3vu6bfaWSV9jqej2kOZf4KuEyQaTdX8s5JowKRrdqIPWfY72/QjbjWf8ji9gKXTDrc05Oiiu1yZsWI3qJ77av3yzIJ9puvP7mxstWiY/GJbY7sNpN2gmmzkwEbh/wARlefHofCZXQkUZapDSe3xfv3yFm8uMnxW02yny4ksxNKwcbqnfVaJ4hEpt3bV65c4NNBa9z+geVsDvNub7bKaluuA5vvZ5GFkFBoXKk9Hk6j+3AaavCsoNGryRLrynj21CNt7oWXfD9pVy9sKm6dRvZ0'),('configSoftware','setupDate','TMbNZzjjzWcWy5ZxGr7K6jLPPm0N31BMmtJQZ2zuFSc=');
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
INSERT INTO `departments` VALUES ('016e750f-fe08-4f5a-b41c-b412c9744014',5,'Armazém',NULL,NULL),('34bab2af-bc84-4f8f-90b9-a8757117cb5e',2,'Comercial','',0),('82f635c6-8159-4505-bc60-319c2e6b506b',11,'Direcção Técnica',NULL,NULL),('911a89c0-51e5-4b93-9827-2bcdfad16229',7,'Marketing',NULL,NULL),('95d2ef59-93f9-45c9-9e46-38105531b756',9,'Secretariado Comércio',NULL,NULL),('99de001a-7b75-4a11-a7ac-f3b45ae621ca',10,'Administração',NULL,NULL),('c4ae4e42-fed5-4829-857a-97bc9741027d',6,'Compras',NULL,NULL),('d915101f-af51-4e55-ac1f-af1ad3bfb875',3,'Financeiro',NULL,NULL),('e39a109b-1323-4ae6-b14c-3118337b54a2',8,'Administrativo',NULL,NULL),('f4615987-63e1-4c78-98b8-bd3c3a81d6d3',4,'Call Center',NULL,NULL);
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
INSERT INTO `devices` VALUES ('136d9c74-a3bb-4049-95c1-85c7416ad4b0',1,'regterg','SISNID-INBIO260','192.168.1.201',9999,NULL,0,NULL,'AC Ver 5.7.8.3033 Apr 29 2022','00:17:61:12:F9:45','AJYS223460212',NULL,NULL,4,2,2,600,10,200,10,NULL,NULL,2,NULL,'FB1E','FF3FF07FF036018003060000600300000000000000000000007743F07E070080',NULL,NULL,3,2,1,1,'2025-01-30 15:36:29.305168','2025-01-30 11:48:53.157167',NULL),('5247c881-4637-427b-bf16-e6f067ef6e5d',2,'Teste 4 portas','SISNID-INBIO460','192.168.1.202',9999,NULL,0,NULL,'AC Ver 5.7.8.3033 Aug 14 2023','00:17:61:20:04:61','GQS2235000391',NULL,NULL,4,4,4,600,10,200,10,NULL,NULL,4,NULL,'FB1E','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,1,1,'2025-01-30 15:36:30.115364','2025-01-30 15:07:47.008550',NULL);
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
  CONSTRAINT `FK_Employees_Zones_ZoneId` FOREIGN KEY (`ZoneId`) REFERENCES `zones` (`ZoneID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('00e4dc68-19ef-4b2e-b8a1-cd6b2696e69f','117','Rita Helena Tavares dos Santos','Rita Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e39a109b-1323-4ae6-b14c-3118337b54a2',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('0d403358-b008-4346-ab99-2de1dc30b2cc','164','Alexandra Carvalho Paredes Gonçalves','Alexandra Gonçalves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('13ce7136-0625-4509-8b40-4cf59e53cd1c','47','Luís Alberto Alves Pereira Antunes','Luís Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('1463a54b-1eec-4c7d-b88d-115227930ebf','107','Francisco Emanuel P. P. Gomes Ribeiro','Francisco Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('175d4971-aaf2-4d5a-95eb-52ba25985709','96','João Pedro Candeias Domingues','João Domingues',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('182762b8-be66-4f8e-a575-f28e1aa07423','183','Andreia Filipa Romão Mendonça','Andreia Mendonça',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('1c6399c0-5fb0-40f5-9aa8-37ef082db075','144','Pedro Vargas Madeira Palma Amaro','Pedro Amaro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('1d22df0d-d88b-4c06-8a4b-0568dff8f994','36','Helena C. Pereira Tomás N. Esperto','Helena Esperto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d915101f-af51-4e55-ac1f-af1ad3bfb875',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,'ea157a68-f782-4171-abe0-2ce6c3daa20a'),('1fc72152-324a-4482-8bb6-e1fee9d2e670','93','Marisa Isabel Contente da Silva','Marisa Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('200391cb-4756-40d6-9907-d68f830d890c','112','Rute de Jesus Fele Cunha','Rute Cunha',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('2479edb5-0d94-49fd-8731-d50a1e6f1df8','101','Fábio André Louro Catarrinho','Fábio Catarrinho',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('2670f55d-bc5a-4119-840d-75e514e8ba23','79','Daniel Alexandre Mata Dupont de Sousa','Daniel Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('269b7af9-d264-4440-b1c7-492e9a84a25d','32','António Joaquim Pedroso B. Cachola','António Cachola',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('26b8a6ac-7d0c-4add-b8ab-72392aa33403','199','Joana Filipa Figueiredo dos Santos','Joana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('277abb8c-9e01-4897-a63c-c6495aa46765','165','Thiago Luís de Melo','Thiago Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('288af653-3131-45cd-8aec-e3c215b31a80','159','Fernando Silva das Dores','Fernando Dores',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('2fa8729c-09ca-46b6-8e17-50c8ee32551c','187','Valentim Silva Melnychuck','Valentim Melnychuck',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('305ac473-28aa-47df-bf49-bea2f7213d7c','194','Ana Cristina de Albuquerque Matias Santos','Ana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('33ff9edc-dcdb-4a72-a1a1-8fa4915755cb','27','Patrique Domingos de Sousa','Patrique Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('347b730d-121b-48b2-8d6b-ff1b464b466a','128','Valter Jorge Alves Mendes','Valter Mendes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('3715e431-fc78-47f6-8ef2-ba214656c5f1','217','Liliana dos Santos','Liliana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d915101f-af51-4e55-ac1f-af1ad3bfb875',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('3760df66-2a7c-4f32-8522-b0991bd45ada','157','Isabel Cristina Correia do Nascimento','Isabel Nascimento',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('3973189a-c7bc-44ee-ba9e-b1d2ee1bc479','23','Daniel Nuno Soares da Silva','Daniel Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('3d645ef4-3cca-4b4d-985b-bae54e079bd7','189','Daniel Gaspar Grego de Almeida','Daniel Almeida',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('3e2dfe57-cfa2-4a79-b4d5-2d40b395ff32','66','Joana Brito Ramos Azevedo','Joana Azevedo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('42119fa9-6442-479a-a328-0a4076ca8c62','124','António Manuel Almeida Pereira','António Pereira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('456487ed-fc14-4e30-9d3d-d8705352f8ac','1','fsfdsfsd','fsfdsfsd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','99de001a-7b75-4a11-a7ac-f3b45ae621ca',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('45961ca9-785b-4a85-b8e6-3c16effdb36b','125','Cláudia Patrícia Fernandes Lopes','Cláudia Lopes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','95d2ef59-93f9-45c9-9e46-38105531b756',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('47ada780-09f1-41c7-9bd8-4272281ab3a2','39','Marta Susana Alves Monteiro','Marta Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('47b0f452-b1f7-410c-b04b-25f323314724','162','Paula Dalina Nitas','Paula Nitas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('47b7c2bb-a7be-4c66-a57a-12f3bb943024','192','Diana Isabel dos Santos Oliveira','Diana Oliveira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('50c06b0b-aa99-42e4-b318-29f7bd90c68e','24','Noémia Maria Reis Porfírio','Noémia Porfírio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('538f996d-18bb-4b40-b806-fd1f7d2bcfc2','188','Soraia Filipa Ferreira Gil','Soraia Gil',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('58cbf13a-48e3-448a-a8c3-353dad9800a6','95','Leila Patrícia Pereira Marques','Leila Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('59243efa-3646-4763-9fcd-5f356aea04a0','57','Ana Sofia Fernandes Guimarães','Ana Guimarães',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','911a89c0-51e5-4b93-9827-2bcdfad16229',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('5a7260c0-a1d7-46af-8d31-12b9be5bfa79','191','Suse Paula Tomás Pires','Suse Pires',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','82f635c6-8159-4505-bc60-319c2e6b506b',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('5d2a3523-6b80-4b6a-8b7a-c5adda7fff07','55','Ana Maria da Cruz Silva Pinto','Ana Pinto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('645e4c17-7993-419d-9809-15e2efb57e3f','195','Miguel João Luz Costa','Miguel Costa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d915101f-af51-4e55-ac1f-af1ad3bfb875',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('6dd42d33-34d2-4497-88cb-7470ca8f857d','20','Flávio Pedro Martinho Diniz','Flávio Diniz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('74178752-0f5b-4807-8c08-12fe7a712bba','86','Carla Alexandra Nunes Dias','Carla Dias',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('797e3883-7b26-45cd-8066-e7f58a273c8b','216','Maria Inês Pereira Duarte','Maria Duarte',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','911a89c0-51e5-4b93-9827-2bcdfad16229',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('7f707ecb-47d4-4d76-bc06-0e72a6696c57','203','Alexandra Ribeiro Rijo','Alexandra Rijo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('814a6495-7c06-4e31-9ce7-ccaf45fb147a','56','Carlos Manuel Henriques da Cruz','Carlos Cruz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('86e23ddd-b7f8-4ed8-9c29-45cb269310c7','160','Valter Miguel Serra dos Santos','Valter Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('8703d72c-ba82-49eb-b573-f45bfd35357c','91','Tiago Alexandre Pires Guerreiro','Tiago Guerreiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('8b061114-daf6-4a61-ab1f-8cf31bd36f9b','30','Nelson Carlos Zacarias Rego','Nelson Rego',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('8eafee50-76c5-400f-85e9-a8842962dc06','206','Diogo Alexandre Vasconcelos Brito','Diogo Brito',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('956d8756-be0c-4622-b0d1-24bd53fe5bd9','153','Pedro Miguel Garcias Miranda','Pedro Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('960af073-d31d-460e-9b71-956a395d15b7','145','Cíntia Vanessa Sombreireiro Romão','Cíntia Romão',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('9757ec27-3a8a-42f2-8e5f-4601372b37e3','196','Telma Vanessa Prazeres Gomes','Telma Gomes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('9c84a3e0-6034-4622-b1ae-37aff6009fd9','141','Sofia Pacheco Medeiros de Mesquita Gabriel','Sofia Gabriel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','82f635c6-8159-4505-bc60-319c2e6b506b',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('9f294a76-7855-4060-97d2-0dc0f1165e61','85','Iulian Gheorghiță Acatrinei','Iulian Acatrinei',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('a0c712dc-e1c3-4d1f-aa8c-7c607d99389d','213','Sara dos Santos Loureiro','Sara Loureiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d915101f-af51-4e55-ac1f-af1ad3bfb875',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('a4e9c236-9273-455f-9a9d-584a2208709e','209','Francisco Maria Líbano Monteiro Rocha e Melo','Francisco Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('a4f6cd36-5052-4228-a25d-d08f219eeacf','152','Sara da Conceição Soares Amorim Correia','Sara Correia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('a5e948ee-31a1-471d-9893-fae20d83e398','205','Verónica Sofia Gonçalves Monteiro','Verónica Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('a6e83547-0281-45fa-a913-04d25cd431d3','103','João Pedro Mendes Miranda','João Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('a7efc2d6-c932-4ba6-a9cc-7841506e1cb8','172','Bruno António Calvo Gonçalves','Bruno Gonçalves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('b13f92e0-0c6a-40fd-b0a4-e0dc9a058219','38','Mário Jorge Marques Gomes Marto','Mário Marto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('bee785a9-ca9d-41e3-b969-3475633d7dbf','179','Bruno José Simões Braga','Bruno Braga',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('c1398d0c-48ee-42ad-8557-49b12f91fcf4','186','Sidney de Oliveira Cassim','Sidney Cassim',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('c17328d9-ed3b-400e-b2b6-0e1e8be28c02','167','Alex Pereira da Silva','Alex Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('c3f523f1-82e1-432d-99e2-3d786d459e8b','208','Diana Filipa dos Reis Cancela','Diana Cancela',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('c9514dfe-851a-4ce0-9ca5-7e10632e8007','133','Bárbara Filipa Cunha Sampaio','Bárbara Sampaio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('cdb8de55-0d65-423e-8f7d-1e9838c23f81','151','Ana Teresa de Simões Graça e Almeida Marques','Ana Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('ceed97ea-e58a-462b-aa1a-5adc864cb240','83','Ana Lisa Gomes Pereira Real Baptista','Ana Baptista',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('d1d728f7-34e2-4902-978a-71971865ef2f','132','Miguel Afonso Paulista Verga Caninhas','Miguel Caninhas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','99de001a-7b75-4a11-a7ac-f3b45ae621ca',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('d1df8341-9371-427a-91a8-be703791c1e4','200','Bárbara Neves Mateus Caldas Marques','Bárbara Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('d837350c-f94f-4425-a280-24d4b445b30f','123','Raquel Maria Viegas Rocha Santos','Raquel Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e39a109b-1323-4ae6-b14c-3118337b54a2',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('d97213df-942b-42e4-8023-ce20486ffe66','136','Filipe Chapman Garrido','Filipe Garrido',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('dc1d189d-5c3d-4713-9b58-56351c28c8c2','44','Florinda Maria dos Santos Miguel','Florinda Miguel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','c4ae4e42-fed5-4829-857a-97bc9741027d',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('df374016-0498-4e3a-a94c-a3d23eb3892a','51','Paula Cristina Tavares Ribeiro Miranda','Paula Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('df9869dd-9298-44d3-884a-c6703941a296','181','Jaime Maria Rodrigues Silva','Jaime Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('e1e12dce-ef7f-42af-b111-9cdbf7947ece','9','Paulo José dos Santos Mota','Paulo Mota',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('e602b758-f7cf-492b-a05e-678ce47cef77','65','Inês Filipa Marques Anacleto','Inês Anacleto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','e39a109b-1323-4ae6-b14c-3118337b54a2',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('e61a5545-8236-470a-9f2e-888f46eccd98','129','Ana Rita Alexandre Branco','Ana Branco',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d915101f-af51-4e55-ac1f-af1ad3bfb875',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('ec94fa3b-6c7e-4d9d-838c-4a2312dc40e3','214','Carla Alexandra Almeida Ribeiro','Carla Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('ef4d400b-523e-4d3f-a956-c1cde42035a2','198','João Vítor Cortegaça Évora Filipe','João Filipe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('f1237ac6-063e-4d18-ad56-170e3972748e','131','Bruno Miguel Araújo de Sousa','Bruno Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','34bab2af-bc84-4f8f-90b9-a8757117cb5e',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('f6febef0-033b-4a48-8940-149aa69ade98','22','Eduarda Cristina Alcóbia Ferreira','Eduarda Ferreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d915101f-af51-4e55-ac1f-af1ad3bfb875',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,'ea157a68-f782-4171-abe0-2ce6c3daa20a'),('f84fa4ef-b23e-413d-9f2a-50c163607377','202','Tomás Forte da Palma Antunes','Tomás Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('fd032b30-4b61-4dbd-bb21-855f370f89c7','21','Célia Maria Silvestre Silva Lúcio','Célia Lúcio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','f4615987-63e1-4c78-98b8-bd3c3a81d6d3',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('fd9066cc-f2f3-474e-8602-b53d25e1aab6','215','José Luís Leal da Silva Vaz','José Vaz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL),('fd95b030-1e07-4c48-b4cf-01f14a5d8c9d','104','Ricardo Alves Moreira','Ricardo Moreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','016e750f-fe08-4f5a-b41c-b412c9744014',NULL,NULL,'f34364f2-a02f-4111-b132-14303413d6fe',NULL,NULL,NULL);
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
INSERT INTO `employeescards` VALUES ('08dd4124-a69c-412f-876c-c94220af0e5a','f6febef0-033b-4a48-8940-149aa69ade98',NULL,NULL,1,'264'),('08dd4124-ae8e-4863-8944-9418c94890a8','1d22df0d-d88b-4c06-8a4b-0568dff8f994',NULL,NULL,1,'260');
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
INSERT INTO `entidades` VALUES ('f96d6b10-32f4-45f2-b104-6ad6e3daf556','Bio 2 - Representações e Comércio de Produtos Agro-Pecuários, S.A.',1,'Polo Industrial de Brejos de Carreteiros, Fase 2, Armazém A e B','2950-554','Quinta do Anjo',NULL,'911777384','leila.marques@bio2.pt',501488243,'www.bio2.pt',NULL,'Uploads/Profiles/cbaf675b-e175-46b9-9c62-166b47e69baa_images.png','2025-01-21 16:45:22','2025-01-22 13:57:23',1);
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
INSERT INTO `eventdevices` VALUES ('00fffcd8-3937-417a-b9f1-0d6228d28146',36,260,1,23,NULL,4,NULL,'2025-01-30 14:17:26.000000'),('013a8425-e1a4-490e-99ee-dd1ce3468f5b',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:27:54.000000'),('04117076-7809-4306-932d-7e87555b2bf7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:18:20.000000'),('075e0d42-df55-480e-949b-728ab4cfd710',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:50:00.000000'),('0ab5f837-cab1-4e2a-b63f-ec9eb60dddd7',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:10.000000'),('0c88c390-575f-4532-b8d4-f1782d21b43f',36,260,1,23,NULL,4,NULL,'2025-01-30 11:58:54.000000'),('106be28c-c192-4b02-858e-e0b0f293cd98',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:06:54.000000'),('109e4fa0-a380-43f6-b177-a3877b5f4ba3',0,NULL,0,206,NULL,200,NULL,'2025-01-30 10:58:06.000000'),('1284f1b9-f374-40b0-9f05-3823b60aafea',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:28:23.000000'),('152c292f-dd73-477f-8083-e13ae309dd2e',0,NULL,0,214,NULL,200,NULL,'2025-01-30 14:16:17.000000'),('164a513e-abc6-4759-b083-f2a778ca24b9',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:49:28.000000'),('16fbe5be-5f04-4e44-9e09-2a9b49f6b889',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:30:49.000000'),('176ea746-23be-4594-b54f-23f3e544064b',0,NULL,0,214,NULL,200,NULL,'2025-01-30 14:14:37.000000'),('18f9727d-c92b-46dd-87ce-8b530d267c52',0,NULL,0,105,NULL,200,NULL,'2025-01-30 15:08:25.000000'),('1edca50c-2234-4e92-b9ca-32a074dcd4ba',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:40:42.000000'),('209fac35-028c-45fb-8dcd-5362a4163a99',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:27:52.000000'),('20a6f5b6-1c91-4ceb-97e3-0d278593f6ad',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:50:01.000000'),('211d3dde-566f-4d3f-8812-bf9e99a9a8e1',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:06:24.000000'),('236479ab-bb2b-4eca-a1a6-3ceb125ca92a',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:24.000000'),('24aa68b5-5ddd-4fc5-a51e-058ce4edb9dd',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:33:11.000000'),('2a7be72d-fcd5-485a-924c-12e7785e6040',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('2b07feff-471e-4a81-af29-480052ea18bd',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:35:30.000000'),('2c7b363d-7473-4c23-982c-85e9ac44c8ae',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:35:42.000000'),('2eac2905-5389-4d48-afd3-efe9a01e253b',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('2fc24f13-6dcb-46c6-9d7c-bfc2216359e1',22,264,1,23,NULL,4,NULL,'2025-01-30 14:16:43.000000'),('3006c180-1751-4079-9d64-619fbe7218d2',0,NULL,0,206,NULL,200,NULL,'2025-01-30 11:11:42.000000'),('301b24d9-8dba-4db7-95fd-24fb18e5a361',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('3020c5cc-181e-49d4-9d03-2368efac1198',0,NULL,0,105,NULL,200,NULL,'2025-01-30 14:16:14.000000'),('37a0a046-e0f4-457d-9f73-0ee53525e4ee',0,NULL,0,214,NULL,200,NULL,'2025-01-30 15:08:49.000000'),('385c12d0-2486-4152-831a-0389e98018e9',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:30:48.000000'),('3d0f9f9b-c15c-414a-9133-0786a9a35082',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:04:05.000000'),('3d1da586-130d-40d1-8d7a-3134e6908afe',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:40.000000'),('401ce0ab-b0a4-4b7a-a590-e2a5bd78168c',36,260,1,23,NULL,4,NULL,'2025-01-30 11:58:49.000000'),('43d201cc-5f7f-4ba6-995b-d49e6921c4be',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:19:21.000000'),('46b3be44-8484-470d-948d-02e4c857b002',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:06:08.000000'),('48ef4bcd-6afd-4087-a54b-a219128223e7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('4b883b1b-56e0-474c-ad4d-2ecdcfc15c86',22,264,1,23,NULL,4,NULL,'2025-01-30 12:10:27.000000'),('4df3bfff-7986-4083-aadc-fa3b4c72a6ee',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:23.000000'),('55ab2482-ac3c-4c7e-9f10-75f201011bd3',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('561db0f2-1fba-425a-800b-9ff2fb491858',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:34:50.000000'),('59eaff8a-b4bc-42a2-a287-695d0218310c',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:19.000000'),('5abce151-19fc-422a-ada6-73b7557dd836',5,264,3,22,NULL,4,NULL,'2025-01-30 15:11:32.000000'),('609bfe0e-0c22-4722-b47a-dc82cd537b34',0,NULL,0,214,NULL,200,NULL,'2025-01-30 15:08:51.000000'),('624c8974-9d6d-452a-a356-8244909f78d8',0,NULL,0,105,NULL,200,NULL,'2025-01-29 11:47:31.000000'),('690e3616-9157-4a8c-939e-acd0f4502d26',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:23.000000'),('6cec45b8-9963-4987-a04c-5049c6d1ea9d',0,NULL,0,214,NULL,200,NULL,'2025-01-30 10:43:25.000000'),('6dc479a8-35fb-4fc5-bb3e-dfb2639db6a2',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:27:49.000000'),('6e297204-1e15-49b0-a799-4bb12bf7d5a6',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:11.000000'),('6fcb2538-67da-42a8-99a3-f4905ee28f46',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:30:47.000000'),('725708a5-7b86-4960-8ea9-a3de3b4cb797',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:39.000000'),('74d02ad6-d972-4e0f-b2c8-2a5710614960',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('7a59b372-adac-4ea3-9b61-17fe6395a236',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:06:29.000000'),('7e437bdf-db00-45b3-b68b-2d7ae1db0277',22,264,1,23,NULL,4,NULL,'2025-01-30 14:15:39.000000'),('83678725-fdee-483c-b1e1-84d3a962ced7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:39.000000'),('89dffc36-f964-45a2-922d-0c73dd836ece',0,NULL,0,206,NULL,200,NULL,'2025-01-30 09:22:09.000000'),('8a56c2d5-2e92-492c-8110-ba5326f7b107',0,NULL,0,206,NULL,200,NULL,'2025-01-30 11:34:06.000000'),('8a5a4623-020a-44fa-bb78-e3a0da8fe55c',1,260,3,0,NULL,4,NULL,'2025-01-30 15:11:39.000000'),('8a752df0-bbac-42a0-afe6-c621f6b68627',0,NULL,0,214,NULL,200,NULL,'2025-01-30 14:14:36.000000'),('8c2b3482-c551-42d9-a5d8-974db0cceb22',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:34:52.000000'),('8da894a0-dca1-4803-886c-10442746f520',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:08.000000'),('8df5581a-2212-4a46-81d0-31f784a69b87',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('8eb6a57f-3a6d-4e68-a3a2-5a2309c3ba43',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:50:01.000000'),('8f935625-48d2-4fd9-b99c-5d41ee80134c',0,NULL,0,206,NULL,200,NULL,'2025-01-30 10:42:38.000000'),('91b067c4-34d6-4aa0-b9a7-10a30d41f087',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:02:00.000000'),('947f140e-d815-4ace-9ab0-df9dda6a544b',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('94abd3bd-9c2c-41c0-851d-c85c34a48cb7',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:20.000000'),('952a453f-feae-43c4-ba14-de9e0f463d9d',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:33:15.000000'),('9924a784-bc6c-4f8a-8022-3a1a733876a5',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:27:01.000000'),('994f60ea-89a6-451b-9b7e-79c137b0d46f',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:06:29.000000'),('9965575f-f8fd-42d6-86c3-0f092596fb8b',36,260,1,23,NULL,4,NULL,'2025-01-30 14:16:46.000000'),('9af14090-ccc1-4997-ba36-07071c64aab1',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:20.000000'),('9b6fdcbd-1591-4990-9487-7931a8587515',22,264,1,23,NULL,4,NULL,'2025-01-30 11:58:25.000000'),('9f348c5e-e675-45b5-8e4d-2cbc881bb24d',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:47:36.000000'),('a0450a3f-605a-458e-89bb-bf9a3b5fd3c1',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('a1c7f9be-1d65-49a2-af1e-1a3116c0deca',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:08.000000'),('a22d6384-2ce7-4474-9324-87bce688dc37',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('a33b8baf-0325-4a82-9cfe-a04e1dabee5c',22,264,1,23,NULL,4,NULL,'2025-01-30 14:18:21.000000'),('a381901b-2fbd-401a-81eb-88c69381db42',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:02:04.000000'),('a741cff9-ec1b-4655-9dc8-c90078729b91',36,260,1,23,NULL,4,NULL,'2025-01-30 12:10:30.000000'),('a7bd2183-c15b-4512-a75c-b4d66579081c',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:27:52.000000'),('a7ff052e-fdeb-4c48-be0c-d00803bf9c24',22,264,1,23,NULL,4,NULL,'2025-01-30 11:58:56.000000'),('a9145a69-13f4-4770-928b-863c044ca45d',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:40:41.000000'),('a9baedf5-5add-4f2d-b556-8fba8837296c',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('a9bdb03f-b68a-4791-916d-7efd343ff3f6',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:22:21.000000'),('ae3c3222-0715-46b4-9d5b-6f7531124bc9',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:14:39.000000'),('b046fa69-c518-4dda-b4ab-9433381e8ee3',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:22:21.000000'),('b293c620-ba6b-4394-8530-8c2caf5314c0',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:35:33.000000'),('b9ff81f7-a3ef-407a-af85-9fcab060e0d5',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:33:23.000000'),('b9fff57b-b1d7-4460-8d26-58e1235bef1c',5,264,3,22,NULL,4,NULL,'2025-01-30 15:09:00.000000'),('c0c0289a-b627-4243-9dda-3f49f5080cc4',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:29:56.000000'),('c113284b-ba87-466e-a249-cee81877630f',22,264,1,23,NULL,4,NULL,'2025-01-30 11:58:52.000000'),('c2867f1b-be40-468d-852b-fdfb2007a786',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:46:00.000000'),('ca5e9317-c201-4561-a59f-0ebe9494c8ba',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:06:06.000000'),('cd609f29-8b6b-4145-8599-337da77fbd7d',36,260,1,23,NULL,4,NULL,'2025-01-30 14:18:25.000000'),('ce4b7b98-cc9b-4123-abcb-ca40b7d537fd',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:47:35.000000'),('d0008e8f-f0fa-4a9e-a3ad-3d7875c94b2f',36,260,1,23,NULL,4,NULL,'2025-01-30 11:58:27.000000'),('d102130b-e77e-4a31-bab3-2c6211154291',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:12.000000'),('d6b66fbb-6ad2-4a46-a87d-13f94b333cee',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:33:25.000000'),('dd04f640-126a-4885-b9b0-ee2483b502b9',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:05:50.000000'),('dfab506c-6a25-40ab-b5c1-91b59d89b0af',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:30:47.000000'),('e2b2dbcc-2848-4c42-a4a3-80964f4eee03',1,260,3,0,NULL,4,NULL,'2025-01-30 15:08:52.000000'),('e66e7585-b98c-4c1c-a8f7-c3240e85dd56',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:45:56.000000'),('e7623b92-71c0-4ba5-bc46-0e36faebd78e',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:50:03.000000'),('e9bcdc5c-201e-48b5-8031-5b149d734589',0,NULL,0,214,NULL,200,NULL,'2025-01-30 09:41:37.000000'),('ea470bef-4679-438b-b420-70f7044361e7',0,NULL,0,214,NULL,200,NULL,'2025-01-30 11:06:30.000000'),('efa6e981-8626-4467-84df-6a3607cfef9c',0,NULL,0,214,NULL,200,NULL,'2025-01-30 12:07:07.000000'),('f0aa6d67-19cb-4aeb-be07-baf46d066187',0,NULL,0,105,NULL,200,NULL,'2025-01-30 12:07:08.000000'),('f516cd07-37e2-4613-885d-c8d8f72ff48f',0,NULL,0,105,NULL,200,NULL,'2025-01-30 11:30:48.000000'),('f7648430-2524-472b-b4d7-85ad6e4950ac',0,NULL,0,105,NULL,200,NULL,'2025-01-30 09:41:27.000000');
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
INSERT INTO `groups` VALUES ('f34364f2-a02f-4111-b132-14303413d6fe','Geral',NULL);
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
INSERT INTO `kiosktransactions` VALUES ('0089279e-01c2-4f48-9dc8-b6ed5017cc42','2025-01-30 12:10:30.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 12:10:31.155700','2025-01-30 12:10:31.155701'),('02bc7418-6aa3-48e2-bf11-73d50cba0d54','2025-01-30 12:07:07.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:07:10.237753','2025-01-30 12:07:10.237753'),('04943f8c-376a-4e00-afd2-101d04db324c','2025-01-30 09:33:11.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:33:26.509822','2025-01-30 09:33:26.509822'),('05118950-5c9d-401d-94f0-2d954a56cfe2','2025-01-30 15:11:39.000000',1,260,'Abertura efetuada',0,3,4,'GQS2235000391','2025-01-30 15:11:40.832965','2025-01-30 15:11:40.832965'),('065b7d38-fab4-4f19-8e98-ccd5c41cdf45','2025-01-30 11:06:29.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:06:29.593848','2025-01-30 11:06:29.593848'),('09731d08-4bf1-4515-ad8d-f60b11440cd5','2025-01-30 11:58:27.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:27.020591','2025-01-30 11:58:27.020591'),('0c7a1b52-6674-4361-b70f-30a3ca79a271','2025-01-30 12:10:27.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 12:10:27.966691','2025-01-30 12:10:27.966692'),('0e4ab522-74fa-45d3-b4c7-2a17567779cd','2025-01-30 12:06:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:06:08.584348','2025-01-30 12:06:08.584349'),('1195697d-aebf-4a6f-a207-f8046a11bdce','2025-01-30 15:08:25.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 15:08:53.000689','2025-01-30 15:08:53.000689'),('128e8225-43b4-45ed-a407-61a0cc979bc0','2025-01-30 12:34:50.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:34:52.058415','2025-01-30 12:34:52.058468'),('15d2c9e0-9c7d-4166-8009-576d61a4df80','2025-01-30 09:33:15.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 09:33:29.498453','2025-01-30 09:33:29.498453'),('1a1e3439-80c9-4ff5-be6c-841cd4523df9','2025-01-30 09:41:40.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:41.307932','2025-01-30 09:41:41.307932'),('1bab8459-2498-44f0-bbef-6fd0f533a4b6','2025-01-30 11:30:49.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:30:49.560494','2025-01-30 11:30:49.560494'),('1c3184d3-5301-4563-9706-a720791e8a1d','2025-01-30 11:30:47.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:30:48.720658','2025-01-30 11:30:48.720658'),('1eb611aa-e088-4f9f-a624-209479378c9b','2025-01-30 11:47:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:47:41.240467','2025-01-30 11:47:41.240467'),('2316e756-ba01-45cf-8d06-461cefc1001d','2025-01-30 14:16:14.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 14:16:18.127593','2025-01-30 14:16:18.127593'),('25861255-2394-48a2-a558-8cd03191abea','2025-01-30 12:07:07.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:07:10.781444','2025-01-30 12:07:10.781444'),('26a9ece9-c580-446f-9d21-72f91a4bc5b6','2025-01-30 12:27:54.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:27:54.000000','2025-01-30 12:27:54.000000'),('2789271d-0168-4566-83b2-3706f66d962c','2025-01-30 11:47:19.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 11:47:40.995878','2025-01-30 11:47:40.995878'),('278c42f3-388f-42eb-9a05-45aef08c1b2f','2025-01-30 12:34:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:34:52.883023','2025-01-30 12:34:52.883023'),('2fa36ded-be4a-425b-9af9-61dc5dc6943c','2025-01-30 11:40:41.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:40:42.267706','2025-01-30 11:40:42.267763'),('3099db4a-d10a-4af2-9ea2-f0e0792d6c9d','2025-01-30 11:58:54.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:55.072230','2025-01-30 11:58:55.072230'),('314462b1-4d40-42d8-8d89-c41b98c43f14','2025-01-30 11:19:51.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:29:33.000000','2025-01-30 11:29:33.000000'),('31900804-8694-4efc-89bf-e475b3e11e96','2025-01-30 12:07:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:07:12.785921','2025-01-30 12:07:12.785921'),('33d280ba-b916-4f5b-a127-8132004a1942','2025-01-30 14:14:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 14:14:37.000000','2025-01-30 14:14:37.000000'),('34015bc7-eb42-4e97-9b61-06f6e1154b76','2025-01-30 11:49:19.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000'),('387a1b2f-61dd-4e6a-beec-1420820a80dc','2025-01-30 11:28:23.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:28:24.276031','2025-01-30 11:28:24.276078'),('3cf2a64d-918e-403b-b489-07888859b521','2025-01-30 09:41:39.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:39.988996','2025-01-30 09:41:39.988996'),('3f2bf5ef-e9f3-4f5b-b15a-1fdaafb82040','2025-01-30 11:58:49.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:50.285250','2025-01-30 11:58:50.285250'),('415a3b11-42fb-44b0-a94d-dee557b26635','2025-01-30 14:14:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 14:14:39.228923','2025-01-30 14:14:39.228923'),('439d44d4-1f32-4190-90c6-713498bf77f8','2025-01-30 09:33:25.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:33:26.755606','2025-01-30 09:33:26.755606'),('4616f369-257b-4190-9c97-875599df7a44','2025-01-30 11:18:20.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:18:22.064482','2025-01-30 11:18:22.064539'),('461fa482-d5cc-4338-a4e2-5805585d38a5','2025-01-30 11:29:56.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:48.470850','2025-01-30 11:30:48.470850'),('4b70845d-71b8-47f4-960c-217b11604e21','2025-01-30 11:11:42.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 11:14:40.274299','2025-01-30 11:14:40.274344'),('4c62480e-8a88-43dd-96d7-5376b4d1575e','2025-01-30 12:35:33.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 14:14:36.928427','2025-01-30 14:14:36.928512'),('4fe90f19-a7f2-4f89-acdf-52587fb6b8be','2025-01-30 12:07:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:07:10.890983','2025-01-30 12:07:10.890983'),('59a12ede-6878-4494-a88d-336eab9ba110','2025-01-30 11:50:03.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:50:06.010595','2025-01-30 11:50:06.010595'),('5cd7e6e6-134f-4871-b3fd-f77fafa3ecb0','2025-01-30 10:58:06.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 11:05:50.400412','2025-01-30 11:05:50.400495'),('6440e7e4-d2ed-48fb-b58a-36e32afde01b','2025-01-30 11:58:52.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:53.472594','2025-01-30 11:58:53.472594'),('65c7f933-61ee-42d7-a5cb-19b0506ad881','2025-01-30 12:27:52.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:27:53.707531','2025-01-30 12:27:53.707531'),('662b6cb9-d104-4e98-a4cd-8e0070c998ef','2025-01-30 12:30:15.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:34:52.000000','2025-01-30 12:34:52.000000'),('66af3c79-7ddf-4a19-970c-0f46b7762239','2025-01-30 11:58:56.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:56.671106','2025-01-30 11:58:56.671106'),('6702ec9a-0770-4ab8-876d-31613572cae9','2025-01-30 09:41:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:38.179445','2025-01-30 09:41:38.179445'),('677cbf26-a30c-4ac8-a89e-db021cb3175b','2025-01-30 11:29:56.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:48.000000','2025-01-30 11:30:48.000000'),('6a119509-144e-4853-bb8d-2310a89f08cb','2025-01-30 09:22:09.000000',0,NULL,'Iniciar dispositivo',206,0,200,'AJYS223460212','2025-01-30 09:22:26.925693','2025-01-30 09:22:26.925693'),('6aec0a0e-15a8-42cf-9472-f671bdd666bb','2025-01-30 09:41:37.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:38.737019','2025-01-30 09:41:38.737019'),('6afb9572-b81f-4525-85c5-0c0cfec3f558','2025-01-30 11:35:42.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 11:40:44.906245','2025-01-30 11:40:44.906245'),('7114bfc2-42bd-4fa3-a307-df966e31c08f','2025-01-30 11:50:01.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:50:03.473295','2025-01-30 11:50:03.473295'),('716eaa33-9e96-410b-8e42-9f84ae3a66e5','2025-01-30 12:02:00.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:02:05.733814','2025-01-30 12:02:05.733814'),('71802d44-e5c2-4ea8-9bf9-2af41369ee6a','2025-01-30 12:07:07.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:07:10.455976','2025-01-30 12:07:10.455976'),('724b7f6e-05a5-44d5-a0fd-d1d7b6dfc57d','2025-01-30 14:17:26.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:17:27.505292','2025-01-30 14:17:27.505292'),('726dd62c-0d0e-4585-9c38-e23461f6ed58','2025-01-30 12:27:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:27:53.826460','2025-01-30 12:27:53.826460'),('7c4bc9a5-2955-4649-9313-741e52705acd','2025-01-30 14:15:39.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:15:40.657479','2025-01-30 14:15:40.657479'),('7c590276-b92b-41c8-a44c-9017ba756301','2025-01-30 11:30:48.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:30:49.049821','2025-01-30 11:30:49.049821'),('7deea35d-6813-4194-9c5e-7b0861c88ea4','2025-01-30 14:16:46.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:16:47.245157','2025-01-30 14:16:47.245158'),('7e69b751-5826-41be-b744-2c1a65c6d4ab','2025-01-30 11:47:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:47:37.285161','2025-01-30 11:47:37.285162'),('7f3ef653-e5f0-4c1a-acb3-891b11505b56','2025-01-30 10:04:52.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000'),('83e84e75-b9f3-4296-a3a8-5db17be03a8c','2025-01-30 10:19:03.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000'),('8847a898-b8ed-46e0-a414-3df9e77e49b4','2025-01-30 12:07:07.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:07:10.565243','2025-01-30 12:07:10.565243'),('88e2c879-ee01-4454-9a1d-5275ead7c49b','2025-01-30 11:05:50.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:05:50.883717','2025-01-30 11:05:50.883717'),('894848d6-60c8-44e0-8731-6aaf8a6bcdd4','2025-01-30 12:22:23.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:22.700775','2025-01-30 12:22:22.700775'),('8986aaa2-9662-42a7-b9aa-ffa9075e3c8b','2025-01-30 09:33:23.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 09:33:29.716384','2025-01-30 09:33:29.716384'),('8cd3d849-f5ce-4e89-aea5-d35b4ad8655b','2025-01-30 11:42:01.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000'),('90204eca-e462-4f5c-a50a-3b8860e3f818','2025-01-30 09:51:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000'),('90b0d9be-11b2-4385-a2fa-4fe6084be598','2025-01-30 11:06:29.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:06:29.222478','2025-01-30 11:06:29.222478'),('912eef4f-4a26-48bd-8a5c-05fe03c0104a','2025-01-30 11:46:00.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:46:04.346940','2025-01-30 11:46:04.346940'),('913943e3-cea0-4813-969d-81e3b65aa22a','2025-01-30 14:16:17.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 14:16:18.343073','2025-01-30 14:16:18.343073'),('91517ae1-e35c-4257-acac-75bebc7d1018','2025-01-30 11:34:06.000000',0,NULL,'Iniciar dispositivo',206,0,200,'AJYS223460212','2025-01-30 11:34:19.481799','2025-01-30 11:34:19.481799'),('92e56c9c-dcd4-4657-a771-da924c83da06','2025-01-30 12:27:54.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:27:55.050842','2025-01-30 12:27:55.050842'),('93115f23-0925-4f64-84b1-4b3680fc2543','2025-01-30 10:45:12.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:07:30.000000','2025-01-30 11:07:30.000000'),('95d7cad9-14dc-477f-af2b-1232f0503ca6','2025-01-30 15:08:51.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 15:08:53.234946','2025-01-30 15:08:53.234946'),('9944a5ca-1d8d-495e-b218-509c49d942ce','2025-01-30 12:25:03.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000'),('9c0aa5d6-1eda-46f7-8e63-32c0e5f6f814','2025-01-30 10:42:38.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 10:43:28.200707','2025-01-30 10:43:28.200797'),('9d4862fe-3b75-40b4-9d1f-6329568bb45f','2025-01-30 09:41:27.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:37.956383','2025-01-30 09:41:37.956383'),('9da2cc7a-c2bd-45bd-99ca-3ebaa0ee969a','2025-01-30 11:15:57.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:19:16.000000','2025-01-30 11:19:16.000000'),('a0feca5e-dbbd-4b48-91c4-5ccbf283c054','2025-01-30 14:14:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 14:14:37.246481','2025-01-30 14:14:37.246481'),('a1b56e48-c45b-485d-bf27-92126281241f','2025-01-30 11:06:30.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:06:31.318024','2025-01-30 11:06:31.318025'),('a7239ff6-ae86-4db7-a0bc-29a9f889a41c','2025-01-30 09:19:21.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:19:23.566928','2025-01-30 09:19:23.566928'),('a8a9d13a-30ac-420c-b6d0-f0449865016c','2025-01-30 12:27:49.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:27:50.627164','2025-01-30 12:27:50.627227'),('ae257d53-964d-419d-b7a9-6d42e0aa98ea','2025-01-30 10:43:25.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 10:43:28.590457','2025-01-30 10:43:28.590458'),('b1dc6202-1957-4810-b8e0-e9c3317deb72','2025-01-30 12:22:20.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:22.021488','2025-01-30 12:22:22.021488'),('b207f394-e6cc-4ad8-90f9-f0ef2c71ddbc','2025-01-30 11:47:35.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:47:36.920314','2025-01-30 11:47:36.920314'),('b266b9fb-7e21-4a69-8f9e-253e200b05d8','2025-01-30 11:49:28.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 11:50:05.791301','2025-01-30 11:50:05.791301'),('b3a84fe6-49dc-4a1f-9995-bbb401b9608d','2025-01-30 09:41:37.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:38.514113','2025-01-30 09:41:38.514113'),('b42c9792-e2c6-41a4-a4b6-774ad578f2d5','2025-01-30 12:07:08.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:07:13.002727','2025-01-30 12:07:13.002727'),('b441eea6-db44-4025-a4ab-3481ff14bf3a','2025-01-30 12:06:54.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:07:10.021017','2025-01-30 12:07:10.021017'),('b573aaef-499d-4052-884d-e861e7c5cea9','2025-01-30 10:10:17.000000',0,NULL,'Iniciar dispositivo',206,0,200,'GQS2235000391','2025-01-30 10:44:47.000000','2025-01-30 10:44:47.000000'),('b7d424cc-7bb9-4283-a368-a4ff7b8fb678','2025-01-30 12:22:21.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:22.365670','2025-01-30 12:22:22.365670'),('b8983d98-a8c3-4dd0-b024-22fa866a527c','2025-01-30 15:11:32.000000',5,264,'Período de tempo inválido',22,3,4,'GQS2235000391','2025-01-30 15:11:33.363571','2025-01-30 15:11:33.363571'),('b8c85a11-e4eb-4df1-bf39-7143726b4045','2025-01-30 09:41:39.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 09:41:39.735497','2025-01-30 09:41:39.735497'),('ba8c9f49-d31f-4523-a0e6-1eb49631427a','2025-01-30 14:18:21.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:18:21.665856','2025-01-30 14:18:21.665856'),('bc3b2a88-2d5d-49a1-830d-d1290e456579','2025-01-30 14:16:43.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:16:44.053896','2025-01-30 14:16:44.053896'),('bd06888e-96d0-4f25-9284-330c065e010b','2025-01-30 11:50:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:50:03.588574','2025-01-30 11:50:03.588574'),('bee23dcb-96a5-4465-b730-169624ce7ca4','2025-01-30 12:30:03.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000'),('bf14277f-b028-4b33-a517-b9d9783c7ab7','2025-01-30 12:02:04.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 12:02:05.949069','2025-01-30 12:02:05.949069'),('bf6b35d8-4cea-45af-9a1f-9c9083382d28','2025-01-30 11:45:56.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:45:57.646784','2025-01-30 11:45:57.646832'),('bf767d0d-bd1d-452d-99db-6351939f9bb3','2025-01-30 11:30:47.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:48.936249','2025-01-30 11:30:48.936249'),('bfe81ae3-b76d-4dd3-b51a-ef26a5a4f12f','2025-01-30 12:07:12.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:07:13.115454','2025-01-30 12:07:13.115454'),('c2a02de4-be77-4e76-be34-aec75675d723','2025-01-30 11:58:25.000000',22,264,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 11:58:25.406843','2025-01-30 11:58:25.406900'),('cad24a75-8b24-4af2-9e36-9179b9ba159b','2025-01-30 14:18:25.000000',36,260,'Acesso não autorizado',23,1,4,'AJYS223460212','2025-01-30 14:18:26.358846','2025-01-30 14:18:26.358846'),('ce301c57-4162-4d66-9589-21d7253821c1','2025-01-30 12:22:23.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:22.921918','2025-01-30 12:22:22.921919'),('d289068c-513c-4c2f-8886-96d1ee1816e6','2025-01-30 12:07:07.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:07:12.568934','2025-01-30 12:07:12.568935'),('d46cc90d-f837-4d7c-acbc-c51675063d12','2025-01-30 12:22:11.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:21.719462','2025-01-30 12:22:21.719529'),('d73ef0e2-2f6f-4431-85bb-8450ad17b6d4','2025-01-30 12:06:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:06:08.734351','2025-01-30 12:06:08.734351'),('d95ed914-a3d7-40dc-a1f6-5aa97785c15c','2025-01-30 11:50:00.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:50:01.725840','2025-01-30 11:50:01.726013'),('dd34f27d-7d51-4515-83f4-6e8a140432eb','2025-01-30 11:35:32.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:07:51.000000','2025-01-30 15:07:51.000000'),('de72b860-e28e-4a74-97e0-feb26791a1d3','2025-01-30 11:47:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:47:37.061921','2025-01-30 11:47:37.061921'),('de935615-089e-4679-a85b-ab535992eb42','2025-01-30 15:08:49.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 15:08:50.586890','2025-01-30 15:08:50.586967'),('df9688b0-23f3-424e-b343-1b44c094add6','2025-01-30 12:35:30.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 14:14:39.000248','2025-01-30 14:14:39.000249'),('e1509930-26a8-4956-b70e-7c2d92aef45a','2025-01-30 11:47:35.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:47:36.694142','2025-01-30 11:47:36.694142'),('e24e4102-b8f4-4cb2-9643-45e3a336f4e4','2025-01-30 12:22:24.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 12:22:24.524257','2025-01-30 12:22:24.524257'),('e3d6092b-9b53-4b2d-9e8d-531f75544ce7','2025-01-30 12:25:14.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:27:54.000000','2025-01-30 12:27:54.000000'),('ea2c687b-26e3-414d-a0cc-94f33f578c86','2025-01-30 15:09:00.000000',5,264,'Período de tempo inválido',22,3,4,'GQS2235000391','2025-01-30 15:09:02.026088','2025-01-30 15:09:02.026088'),('eac4a9b5-e35c-47a5-97d8-3a8e1402e0f2','2025-01-30 11:27:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:27:02.273804','2025-01-30 11:27:02.273869'),('eb362b23-5327-4779-8510-17da184ce13e','2025-01-30 09:41:37.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:41:38.402540','2025-01-30 09:41:38.402540'),('ebce0341-1aba-4d81-ba5d-aee3c399ed0d','2025-01-30 11:14:39.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:14:40.608004','2025-01-30 11:14:40.608004'),('f049a41b-50b6-412e-bb36-95339c878cac','2025-01-30 12:22:20.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:22.248500','2025-01-30 12:22:22.248501'),('f292dc18-babf-48e8-91f7-363ba939e66d','2025-01-30 11:40:42.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'AJYS223460212','2025-01-30 11:40:45.139437','2025-01-30 11:40:45.139437'),('f3324f5c-fa51-4c20-a585-50c22f1f9c74','2025-01-30 11:47:10.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:47:36.224689','2025-01-30 11:47:36.224842'),('f445f165-e480-4569-838b-2416db5a4152','2025-01-30 15:08:14.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 15:09:06.000000','2025-01-30 15:09:06.000000'),('f623f5e8-6410-4bff-9271-684642b05718','2025-01-30 11:06:24.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:06:28.436533','2025-01-30 11:06:28.436577'),('f64d1c05-d882-45b8-8732-b10b9a7cca08','2025-01-30 11:08:05.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:15:33.000000','2025-01-30 11:15:33.000000'),('f748d8dd-4923-4955-a857-8c47b0355e21','2025-01-30 12:22:21.000000',0,NULL,'Rede desconectada',105,0,200,'AJYS223460212','2025-01-30 12:22:22.586257','2025-01-30 12:22:22.586257'),('f895f597-2797-4686-8ca6-fc3b43d894b1','2025-01-30 11:27:55.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:29:33.000000','2025-01-30 11:29:33.000000'),('f9bbacac-f29a-4a55-b08c-1c1c516d36a7','2025-01-30 11:30:48.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 11:30:49.273218','2025-01-30 11:30:49.273219'),('fa36c263-fd86-45fd-9766-5ef561b6cc29','2025-01-30 15:08:52.000000',1,260,'Abertura efetuada',0,3,4,'GQS2235000391','2025-01-30 15:08:54.293864','2025-01-30 15:08:54.293865'),('fb365e36-06ea-481f-8bdb-fd949cfdb292','2025-01-30 12:04:05.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 12:06:08.280310','2025-01-30 12:06:08.280357'),('ff890905-b750-4051-95e0-3f25af504753','2025-01-30 11:47:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'GQS2235000391','2025-01-30 11:47:37.498889','2025-01-30 11:47:37.498889'),('ffef9faa-0ee4-43d3-a18d-962670fd9da6','2025-01-29 11:47:31.000000',0,NULL,'Rede desconectada',105,0,200,'GQS2235000391','2025-01-30 09:19:22.994269','2025-01-30 09:19:22.994338');
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
INSERT INTO `useractivesessions` VALUES ('08dd4110-4d8a-472f-8b50-cc9b563b44e9','25b587e4-ca7f-49d5-9bb8-e9c4da238391','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI1YjU4N2U0LWNhN2YtNDlkNS05YmI4LWU5YzRkYTIzODM5MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzgyMzY0NDN9.798DVxMO55CjreuoEeIXb5fpN1-mTRUkpiUBYGz1NcY','501488243','2025-01-30 11:27:23.256504'),('08dd4121-3c70-48ee-8e47-ca8fc4f3bec8','25b587e4-ca7f-49d5-9bb8-e9c4da238391','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI1YjU4N2U0LWNhN2YtNDlkNS05YmI4LWU5YzRkYTIzODM5MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzgyNDM3MTV9.JzAW2fTDc9owVfqCcJzYdRw0s2pq-c3OU1kgFwbpnuo','501488243','2025-01-30 13:28:36.019671'),('08dd4138-7805-4f12-894b-f10157ad496a','25b587e4-ca7f-49d5-9bb8-e9c4da238391','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjI1YjU4N2U0LWNhN2YtNDlkNS05YmI4LWU5YzRkYTIzODM5MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MzgyNTM2OTR9.XDEXFzefn-myfa0oenty0DB3uPI8IhHboLQ46iSkKE4','501488243','2025-01-30 16:14:54.408799');
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
INSERT INTO `users` VALUES ('25b587e4-ca7f-49d5-9bb8-e9c4da238391',NULL,NULL,'nidgroup','NIDGROUP','admin@nidgroup.pt','ADMIN@NIDGROUP.PT',1,'AQAAAAIAAYagAAAAEGcIWJdcwsyXsdHlYjmfC4Zwf/J/KNo0LQer55wkNbn0pD0FlztlzjhAD7WTPemajg==','','2a75912e-3758-472d-b77b-bc63342a6ad6',NULL,0,0,NULL,0,0),('ae500c57-91db-40a6-ad70-898e210b4419',NULL,NULL,'admin','ADMIN','admin@example.com','ADMIN@EXAMPLE.COM',1,'AQAAAAIAAYagAAAAEJ0j0mNeFe5vGVZsulmXguo4oF9kqCKN4pCMPWLXcNEmM7TdzOz480OzVGi6FtSq1Q==','','69571270-11a8-4721-8eb8-03d39bfc7b24',NULL,0,0,NULL,0,0);
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

-- Dump completed on 2025-01-30 15:38:46
