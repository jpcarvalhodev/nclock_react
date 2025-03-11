-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bio2
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
INSERT INTO `accauxiliares` VALUES ('0b688090-45c0-4853-a390-e8a80ff156dd','Placa Acessos 4-AuxIn1',0,1,0,'8e1de1a4-1a6a-466b-8467-f0c96d1a663d',NULL,0,'2025-02-06 15:41:09.634615','2025-02-06 15:41:09.634652'),('17a968ab-5d55-410a-9bba-9fcbe941986d','Placa Acessos 5-AuxOut1',1,1,0,'8f234599-b0b8-4148-9d53-89f7e2aed79f',NULL,0,'2025-02-06 15:58:21.506793','2025-02-06 15:58:21.506793'),('25db3543-c7a6-40c0-9aa4-adb28cdbf3c4','Placa Acessos 5-AuxOut2',1,2,0,'8f234599-b0b8-4148-9d53-89f7e2aed79f',NULL,0,'2025-02-06 15:58:21.506837','2025-02-06 15:58:21.506837'),('38e3bf08-ca6c-45c1-8039-5ef7af11d20b','Placa Acessos 4-AuxIn2',0,2,0,'8e1de1a4-1a6a-466b-8467-f0c96d1a663d',NULL,0,'2025-02-06 15:41:09.637659','2025-02-06 15:41:09.637659'),('3e104438-bab3-4ed8-8a57-6e7032f816a6','Placa Acessos 4-AuxOut2',1,2,0,'8e1de1a4-1a6a-466b-8467-f0c96d1a663d',NULL,0,'2025-02-06 15:41:09.637862','2025-02-06 15:41:09.637862'),('4373c0ed-0f7e-476f-ac0d-7e1c1eb59175','Placa Acessos 5-AuxIn1',0,1,0,'8f234599-b0b8-4148-9d53-89f7e2aed79f',NULL,0,'2025-02-06 15:58:21.506389','2025-02-06 15:58:21.506389'),('48959e1a-e28d-42b9-89c8-adb709af9b70','Teste-AuxIn1',0,1,0,'cf539e52-d0e6-47f4-a424-37e93f73caa5',NULL,0,'2025-03-10 16:22:46.691237','2025-03-10 16:22:46.691237'),('5296c650-9f81-474b-b82d-ae7070405748','Placa Acessos 3-AuxIn2',0,2,0,'8a16e968-771e-4e71-9ea7-5832a4a3f795',NULL,0,'2025-02-06 10:41:16.779446','2025-02-06 10:41:16.779446'),('554dd03f-aafe-47a9-aaa5-5b384e67de1e','Placa Acessos 3-AuxIn1',0,1,0,'8a16e968-771e-4e71-9ea7-5832a4a3f795',NULL,0,'2025-02-06 10:41:16.777130','2025-02-06 10:41:16.777214'),('6b0b2b69-1d57-4142-bb3c-8e7b3d1803fc','Placa Acessos 3-AuxOut2',1,2,0,'8a16e968-771e-4e71-9ea7-5832a4a3f795',NULL,0,'2025-02-06 10:41:16.779746','2025-02-06 10:41:16.779746'),('78dfc9ca-fedb-4a33-9955-3794204480f1','Teste-AuxOut1',1,1,0,'cf539e52-d0e6-47f4-a424-37e93f73caa5',NULL,0,'2025-03-10 16:22:46.691319','2025-03-10 16:22:46.691319'),('8caad063-867c-4fdc-8de6-6600acd51a1e','Teste-AuxOut2',1,2,0,'cf539e52-d0e6-47f4-a424-37e93f73caa5',NULL,0,'2025-03-10 16:22:46.691322','2025-03-10 16:22:46.691322'),('9688dcf3-4e6f-4668-8fd4-23141c1d4935','Placa Acessos 2-AuxIn2',0,2,0,'1ba68a57-92d6-496f-904f-8aa1769f5e51',NULL,0,'2025-02-05 16:09:56.074408','2025-02-05 16:09:56.074408'),('a69a7839-a564-450b-af50-95bb168b404e','Placa Acessos 1-AuxIn1',0,1,0,'e40bf054-eb90-45c3-a253-2df8b4b2c268',NULL,0,'2025-02-05 16:00:57.528853','2025-02-05 16:00:57.528880'),('a6ded36b-5953-40be-b11f-b8658f138846','Placa Acessos 1-AuxOut1',1,1,0,'e40bf054-eb90-45c3-a253-2df8b4b2c268',NULL,0,'2025-02-05 16:00:57.548569','2025-02-05 16:00:57.548569'),('b097ca76-2de4-447b-9bd6-9d85bf0d7988','Teste-AuxIn2',0,2,0,'cf539e52-d0e6-47f4-a424-37e93f73caa5',NULL,0,'2025-03-10 16:22:46.691296','2025-03-10 16:22:46.691296'),('c7677953-8220-4a77-b83e-244d20ce1178','Placa Acessos 2-AuxIn1',0,1,0,'1ba68a57-92d6-496f-904f-8aa1769f5e51',NULL,0,'2025-02-05 16:09:56.074257','2025-02-05 16:09:56.074257'),('d557c127-1853-4993-8f91-112c951196c6','Placa Acessos 2-AuxOut1',1,1,0,'1ba68a57-92d6-496f-904f-8aa1769f5e51',NULL,0,'2025-02-05 16:09:56.074436','2025-02-05 16:09:56.074436'),('d7ac4b97-c045-45be-bd2e-122a7e930a6d','Placa Acessos 5-AuxIn2',0,2,0,'8f234599-b0b8-4148-9d53-89f7e2aed79f',NULL,0,'2025-02-06 15:58:21.506759','2025-02-06 15:58:21.506759'),('d842ccdb-05be-4064-b07b-39779f6b7757','Placa Acessos 1-AuxOut2',1,2,0,'e40bf054-eb90-45c3-a253-2df8b4b2c268',NULL,0,'2025-02-05 16:00:57.548643','2025-02-05 16:00:57.548643'),('e3a2a3d8-a568-45a3-80bf-ac074471a218','Placa Acessos 3-AuxOut1',1,1,0,'8a16e968-771e-4e71-9ea7-5832a4a3f795',NULL,0,'2025-02-06 10:41:16.779667','2025-02-06 10:41:16.779667'),('f1feab71-ab1e-4e41-875e-8ebff0af5059','Placa Acessos 2-AuxOut2',1,2,0,'1ba68a57-92d6-496f-904f-8aa1769f5e51',NULL,0,'2025-02-05 16:09:56.074447','2025-02-05 16:09:56.074447'),('f7f4ec1b-f986-4f22-b379-88c296d88338','Placa Acessos 4-AuxOut1',1,1,0,'8e1de1a4-1a6a-466b-8467-f0c96d1a663d',NULL,0,'2025-02-06 15:41:09.637837','2025-02-06 15:41:09.637837'),('fd50dbbd-fd17-4fad-9bb3-30eb1d85f886','Placa Acessos 1-AuxIn2',0,2,0,'e40bf054-eb90-45c3-a253-2df8b4b2c268',NULL,0,'2025-02-05 16:00:57.548349','2025-02-05 16:00:57.548349');
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
INSERT INTO `accdoors` VALUES ('10adf7fe-0d39-476d-8cb7-4ace7d5cb703',NULL,'2025-03-10 16:22:47',NULL,NULL,NULL,0,'2025-03-10 16:22:46',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste-door1',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'cf539e52-d0e6-47f4-a424-37e93f73caa5','AJYS223460212','08dd475f-78a1-4c3b-871e-8e6e6efa80af'),('3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9',NULL,'2025-02-05 16:09:56',NULL,NULL,NULL,0,'2025-02-06 10:54:26',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta do Armazém Estupefacientes (Porta Alumínio)',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'1ba68a57-92d6-496f-904f-8aa1769f5e51','TFP5235000319','67d46bdd-4c65-45b2-8106-df50e61ce161'),('404d5fca-22a0-4d54-b6af-23a53b738c56',NULL,'2025-02-06 15:41:10',NULL,NULL,NULL,0,'2025-02-06 15:44:00',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta Armazém – Barra Antipânico',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'8e1de1a4-1a6a-466b-8467-f0c96d1a663d','TFP5235000437','67d46bdd-4c65-45b2-8106-df50e61ce161'),('626bab56-e9c0-4860-8af4-002f202e2807',NULL,'2025-02-06 15:58:21',NULL,NULL,NULL,0,'2025-02-06 17:44:48',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta de Acesso Escritório junto do refeitório (Porta madeira)',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'8f234599-b0b8-4148-9d53-89f7e2aed79f','TFP5235000422','67d46bdd-4c65-45b2-8106-df50e61ce161'),('69679c10-09a0-4c7e-8b3e-13fb5ceac57e',NULL,'2025-02-05 16:00:57',NULL,NULL,NULL,0,'2025-02-05 16:04:13',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Placa Acessos 1 Porta 2',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'e40bf054-eb90-45c3-a253-2df8b4b2c268','TFP5235000453','67d46bdd-4c65-45b2-8106-df50e61ce161'),('6c167031-81fe-456c-85a3-7e0ba0729484',NULL,'2025-02-06 15:58:21',NULL,NULL,NULL,0,'2025-02-06 17:44:37',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta Refeitório – Barra Antipânico',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'8f234599-b0b8-4148-9d53-89f7e2aed79f','TFP5235000422','67d46bdd-4c65-45b2-8106-df50e61ce161'),('738e9ba5-8fcc-4958-8885-8c5b792cabc5',NULL,'2025-03-10 16:22:47',NULL,NULL,NULL,0,'2025-03-10 16:22:46',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Teste-door2',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'cf539e52-d0e6-47f4-a424-37e93f73caa5','AJYS223460212','08dd475f-78a1-4c3b-871e-8e6e6efa80af'),('744776e7-f29d-42a7-ae21-9dff0845c696',NULL,'2025-02-05 16:09:56',NULL,NULL,NULL,0,'2025-02-05 16:12:42',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Placa Acessos 2 Porta 2',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'1ba68a57-92d6-496f-904f-8aa1769f5e51','TFP5235000319','67d46bdd-4c65-45b2-8106-df50e61ce161'),('76f4707b-a910-4332-a6d6-75e3955498ae',NULL,'2025-02-05 16:00:57',NULL,NULL,NULL,0,'2025-02-06 11:13:05',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta de Acesso Armazém (Portão Elétrico Novo)',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'e40bf054-eb90-45c3-a253-2df8b4b2c268','TFP5235000453','67d46bdd-4c65-45b2-8106-df50e61ce161'),('890a232c-aa09-4744-9b21-ab94bacd8e9f',NULL,'2025-02-06 10:41:17',NULL,NULL,NULL,0,'2025-02-06 11:11:11',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta Acessos Armazém',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'8a16e968-771e-4e71-9ea7-5832a4a3f795','TFP5235000318','67d46bdd-4c65-45b2-8106-df50e61ce161'),('89a24b10-af34-4e9a-9535-c7ff88a01adc',NULL,'2025-02-06 10:41:17',NULL,NULL,NULL,0,'2025-02-06 11:10:42',NULL,NULL,NULL,2,NULL,NULL,0,10,0,1,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Porta Acessos Colaboradores (Porta Alumínio)',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'8a16e968-771e-4e71-9ea7-5832a4a3f795','TFP5235000318','67d46bdd-4c65-45b2-8106-df50e61ce161'),('ab4319d3-1a0a-425c-829f-cd8bbabeb2d8',NULL,'2025-02-06 15:41:10',NULL,NULL,NULL,0,'2025-02-06 15:41:09',NULL,NULL,NULL,2,NULL,NULL,0,10,0,2,0,1,0,NULL,NULL,NULL,0,0,1,NULL,NULL,5,'Placa Acessos 4-door2',NULL,1,NULL,NULL,NULL,NULL,15,NULL,4,NULL,NULL,NULL,NULL,NULL,'8e1de1a4-1a6a-466b-8467-f0c96d1a663d','TFP5235000437','67d46bdd-4c65-45b2-8106-df50e61ce161');
/*!40000 ALTER TABLE `accdoors` ENABLE KEYS */;
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
INSERT INTO `accplanoacessos` VALUES ('0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','3A-Colaboradores-5AB-Escritório-1A-Armazém',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('14f5febf-487a-4911-877d-07083bba7b42','Sem acessos a Portas',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','3A-Colaboradores-1A-Armazém-5A-Refeitório',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('1e7f5288-6712-442f-b1fc-10fc92ebfa80','3A-Colaboradores-5B-Escritório',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','P - Total as Portas 1-2-3-4-5',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('82059b38-387a-4140-99d3-d5d60dd10ea9','3A-Colaboradores-5B-Escritório-1A-Armazém',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','3A-Colaboradores-5B-Escritório-4A-Porta Armazém',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('c4595e9c-f800-467d-bee8-1e611b95d55a','Teste',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('d9893323-9d19-42c8-a6d7-79fae067899b','3A-Colaboradores-5B-Escritório-1A-Armazém-2A',NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
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
INSERT INTO `accplanohorarios` VALUES ('2484d80c-3ebc-4c48-8409-43bf7d49859f','Plano Horário 12 Horas',NULL,NULL,NULL,'2025-02-07 10:09:56',NULL),('3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66','Plano Horário 24 Horas',NULL,NULL,NULL,'2025-02-05 16:18:11',NULL);
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
INSERT INTO `accplanosacessodispositivos` VALUES ('08dd475f-107a-4008-8543-1da9c01547b3','1e7f5288-6712-442f-b1fc-10fc92ebfa80','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd4787-eea6-4927-82f7-62b25b8bdac3','1e7f5288-6712-442f-b1fc-10fc92ebfa80','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd4788-07df-4b51-8bc9-67198364a6fa','82059b38-387a-4140-99d3-d5d60dd10ea9','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-7d27-4dd0-8897-e382af651a59','17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-7d27-4eae-82bd-8d44dfb1663b','17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-7d27-4eba-8e9f-a503f91c9223','17b8f7e5-1e63-40c4-9cd8-af019f6c90c9','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-8dc4-4755-8fea-5ee57d732f6c','82059b38-387a-4140-99d3-d5d60dd10ea9','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478b-8dc4-47fa-85ac-14b38e0918e3','82059b38-387a-4140-99d3-d5d60dd10ea9','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4ecd-8a79-e3ae07516247','d9893323-9d19-42c8-a6d7-79fae067899b','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4f6e-85e9-6f51fa9c3814','d9893323-9d19-42c8-a6d7-79fae067899b','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4f7a-8beb-59a2e135d663','d9893323-9d19-42c8-a6d7-79fae067899b','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-1f52-4f82-8f46-1f594e9343a9','d9893323-9d19-42c8-a6d7-79fae067899b','1ba68a57-92d6-496f-904f-8aa1769f5e51','3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-2789-498a-8f82-49f93210eff8','b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-2789-49de-8c41-4e68f7267cd5','b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','8e1de1a4-1a6a-466b-8467-f0c96d1a663d','404d5fca-22a0-4d54-b6af-23a53b738c56','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-2789-49ea-8d11-b3427ed1b7af','b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654a-4ebb-8521-5aa8a7c6ff97','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654a-4f74-866d-b4430c0c9578','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654b-40f4-8155-69d6b7b8813f','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd478c-654b-410e-8a23-f2fcf43d30dc','0ad4eac2-f566-41e2-8bc7-2c9bd67397c4','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6937-4fc1-8ab9-3b219401453a','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','1ba68a57-92d6-496f-904f-8aa1769f5e51','3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-4531-89bc-1be59e956438','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8a16e968-771e-4e71-9ea7-5832a4a3f795','89a24b10-af34-4e9a-9535-c7ff88a01adc','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-4579-8b10-9c8b0cd321b6','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8a16e968-771e-4e71-9ea7-5832a4a3f795','890a232c-aa09-4744-9b21-ab94bacd8e9f','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-458c-840a-eb0020d58f05','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8e1de1a4-1a6a-466b-8467-f0c96d1a663d','404d5fca-22a0-4d54-b6af-23a53b738c56','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-459c-86f9-bec73362aaf6','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8f234599-b0b8-4148-9d53-89f7e2aed79f','6c167031-81fe-456c-85a3-7e0ba0729484','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-45a6-89db-4b016f0ee3b0','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','8f234599-b0b8-4148-9d53-89f7e2aed79f','626bab56-e9c0-4860-8af4-002f202e2807','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd49b9-6938-45b0-8871-ea8892e6c182','5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb','e40bf054-eb90-45c3-a253-2df8b4b2c268','76f4707b-a910-4332-a6d6-75e3955498ae','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL),('08dd5ff1-fbae-42fe-8688-a66fc9719f30','c4595e9c-f800-467d-bee8-1e611b95d55a','cf539e52-d0e6-47f4-a424-37e93f73caa5','738e9ba5-8fcc-4958-8885-8c5b792cabc5','3f49b6c4-d0a5-4de7-8ea6-8db23c3edd66',NULL,'0001-01-01 00:00:00',NULL);
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
INSERT INTO `accreaders` VALUES ('0425a16c-77b5-4b7e-8dfe-224557c0cfc4','2025-03-10 16:22:47','2025-03-10 16:22:46','Teste-door2-reader1',1,0,NULL,NULL,'738e9ba5-8fcc-4958-8885-8c5b792cabc5'),('0515ad8e-e61b-4992-822b-3ddbe8bf84e4','0001-01-01 00:00:00','2025-02-07 09:50:50','Entrada Portão Elétrico Acesso Armazém',0,1,NULL,NULL,'76f4707b-a910-4332-a6d6-75e3955498ae'),('07265a8e-ad35-406e-9723-c8178a923a64','0001-01-01 00:00:00','2025-02-06 15:44:26','Entrada Porta Armazém',0,0,NULL,NULL,'404d5fca-22a0-4d54-b6af-23a53b738c56'),('0e507de4-265c-454b-a869-159842828e4d','0001-01-01 00:00:00','2025-02-07 09:52:39','Saída Porta Armazém',0,1,NULL,NULL,'404d5fca-22a0-4d54-b6af-23a53b738c56'),('186d951a-676f-4973-8273-a761d0040bf7','0001-01-01 00:00:00','2025-02-05 16:13:01',' Placa Acessos 2 Porta 2 Entrada',0,0,NULL,NULL,'744776e7-f29d-42a7-ae21-9dff0845c696'),('2285c9d1-3f02-41bc-a404-7999bd47edb9','2025-02-06 15:41:10','2025-02-06 15:41:10','Placa Acessos 4-door2-reader2',2,1,NULL,NULL,'ab4319d3-1a0a-425c-829f-cd8bbabeb2d8'),('3a105ea3-1573-4515-8864-3f8374428f39','0001-01-01 00:00:00','2025-02-07 09:52:18','Saída Porta Entrada Colaboradores',0,1,NULL,NULL,'89a24b10-af34-4e9a-9535-c7ff88a01adc'),('454e3ff4-3900-4647-90d9-f22fec54d4f9','0001-01-01 00:00:00','2025-02-07 09:50:29','Entrada Portão Elétrico Acesso Armazém',0,0,NULL,NULL,'69679c10-09a0-4c7e-8b3e-13fb5ceac57e'),('59b982b2-fef8-43e9-b22f-22cc1c971905','0001-01-01 00:00:00','2025-02-07 09:50:29','Saída Portão Elétrico Acesso Armazém',0,1,NULL,NULL,'69679c10-09a0-4c7e-8b3e-13fb5ceac57e'),('609cb29c-75f2-41f7-9ecf-b8bf7eae669a','0001-01-01 00:00:00','2025-02-07 09:51:38',' Placa Acessos 2 Porta 2 Saida',0,1,NULL,NULL,'744776e7-f29d-42a7-ae21-9dff0845c696'),('68e1d18d-4d2e-4b78-b013-520221c2b139','0001-01-01 00:00:00','2025-02-07 09:51:20','Entrada Porta Estupefacientes Acesso Armazém',0,1,NULL,NULL,'3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9'),('6e58e50a-3fd3-43a5-bbd4-3b889f6adae4','2025-03-10 16:22:47','2025-03-10 16:22:46','Teste-door1-reader1',1,0,NULL,NULL,'10adf7fe-0d39-476d-8cb7-4ace7d5cb703'),('6f99de0c-d9d6-4969-9a75-d785f8610e8c','2025-02-06 15:41:10','2025-02-06 15:41:10','Placa Acessos 4-door2-reader1',1,0,NULL,NULL,'ab4319d3-1a0a-425c-829f-cd8bbabeb2d8'),('755dd91a-a6af-45a2-955e-63990ef6369f','2025-03-10 16:22:47','2025-03-10 16:22:46','Teste-door2-reader2',2,1,NULL,NULL,'738e9ba5-8fcc-4958-8885-8c5b792cabc5'),('771eea17-8de4-42b9-b73c-858339d858de','0001-01-01 00:00:00','2025-02-06 11:10:04','Saída Porta Estupefacientes Acesso Armazém',0,0,NULL,NULL,'3606ba76-fd47-4f3a-b10f-bdd9ba5b86b9'),('7977860f-22fc-4fdc-ac53-ab1836eb4037','0001-01-01 00:00:00','2025-02-06 17:45:32','Entrada Porta de Acesso Escritório',0,0,NULL,NULL,'626bab56-e9c0-4860-8af4-002f202e2807'),('7ab8d5dc-0da2-455d-88f9-100be080eebb','0001-01-01 00:00:00','2025-02-06 11:12:11','Entrada Porta Acessos Armazém',0,0,NULL,NULL,'890a232c-aa09-4744-9b21-ab94bacd8e9f'),('9312ae7c-6811-4b07-811e-821c96268007','2025-03-10 16:22:47','2025-03-10 16:22:46','Teste-door1-reader2',2,1,NULL,NULL,'10adf7fe-0d39-476d-8cb7-4ace7d5cb703'),('9faa836e-f580-49c0-a167-ec06730f2109','0001-01-01 00:00:00','2025-02-06 11:11:39','Entrada Porta Entrada Colaboradores',0,0,NULL,NULL,'89a24b10-af34-4e9a-9535-c7ff88a01adc'),('c6b88075-2ddc-47e8-97ed-06f29b6f1da7','0001-01-01 00:00:00','2025-02-07 09:41:04','Saída Porta Refeitório',0,1,NULL,NULL,'6c167031-81fe-456c-85a3-7e0ba0729484'),('cee6c5f6-a7b3-4dba-aef1-905f4d2a8aab','0001-01-01 00:00:00','2025-02-07 09:52:05','Saída Porta Acessos Armazém',0,1,NULL,NULL,'890a232c-aa09-4744-9b21-ab94bacd8e9f'),('d3bccb58-da27-4221-b3dc-e41353edda50','0001-01-01 00:00:00','2025-02-06 17:45:13','Entrada Porta Refeitório',0,0,NULL,NULL,'6c167031-81fe-456c-85a3-7e0ba0729484'),('dcc04e0c-b94b-4a75-84c8-230124fe1118','0001-01-01 00:00:00','2025-02-06 17:45:40','Saída Porta de Acesso Escritório',0,1,NULL,NULL,'626bab56-e9c0-4860-8af4-002f202e2807'),('f93e392e-515c-4a58-8ced-fd3886a2a2ab','0001-01-01 00:00:00','2025-02-06 10:48:20','Saída Portão Elétrico Acesso Armazém',0,0,NULL,NULL,'76f4707b-a910-4332-a6d6-75e3955498ae');
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
INSERT INTO `configurations` VALUES ('configSoftware','lisenceKey','gSwnCmeyqFhucqRL9WnH1LFq88f2mBr+9KZOrc4lqtivd1ZXxkXMPNiMmwQtO2gQl5P3xEI8BeK97P6FAfMMbklzi7BhrgqjKuISWd0ww9wxodkby7wGPg+23GWrFuZtmOu1tZzoSxEuwjQEWBnrfWL9+xyR9a2U2cU78iNAHM0nFmxTJvP6/ViUxKKhs8pdm2hLc+5LVmAXLSe8B32/Vr3os/YHrsSgWYsCTeWy9PgUwY8hmdAfWYwL4wksxSfO5JzTzRxwXF1gOoajqCeqQqtaTc6AXpZKp7zl7FzTtmsKCsYvF9GStCwkpWB4sa/JWruxYzQMp92D+IBO5JipeCn1EsSibrjHEi8baKs8l06TDlK1f21DhS7iySiV36GfgBxznJ1qhsue1CFQeOi75Gwpe2qeOhdVvPKPxeeUJv3P/HvyRO1nCSenObR7z1DhbQrC+V6UT8Dyhoc30qN87Db+pG8S+7LRcr6MoTzCnwvjFhOEavyDHPjiIhxwlRVeP7gJMeFhcbNzvyTuv9ecTc1sLfhO2BCs3vwqZ4YjoCfXz5FRV8rWcQWqPt9I4u9L35WRWzNJX31rra4d1sx0k5FswObby1fj8HoD2E1PiQcA1W3sWciHfRjKXg99hnFPouT4UPhPlTeKrbeZUr+Drx0bZHwHZCt5nVRKvWrUVboIM4N40GUlmp2xtLrXNT75RwHWg+ZIhlaJATjEhvElPyrg3PyWPEowmuqX+7fL1XAcT5zqNl1cNOXAPlebICg9'),('configSoftware','setupDate','GhaUzhkyRDLLMQJt0O+uOt/wSZ1vz9oJivjVgGbUZVs=');
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
INSERT INTO `departments` VALUES ('0fc7280d-26bd-44ac-927c-c746b1c88abd',9,'Administração',NULL,NULL),('479afc0d-fa5a-4b03-b25d-b14fcf249df0',5,'Compras',NULL,NULL),('4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',4,'Armazém',NULL,NULL),('617f32ac-2f68-411a-bfe4-c32570bbd205',1,'Comercial',NULL,NULL),('8af132ca-c8b7-44c6-a775-b7e37abd6b86',6,'Marketing',NULL,NULL),('9ebba016-531b-4185-9b19-0c7bf7c73907',8,'Secretariado Comércio',NULL,NULL),('9f007f98-ffa6-418d-88f2-ca22b36e5a2b',3,'Call Center',NULL,NULL),('d49c2aac-8227-4026-9003-0c34f959e3a4',10,'Direcção Técnica',NULL,NULL),('ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',2,'Financeiro',NULL,NULL),('edcda3d0-2606-410b-9b4d-5ebd3ef27158',11,'Geral',NULL,NULL),('fccdfc47-d6b8-464f-9534-24bb0017d27e',7,'Administrativo',NULL,NULL),('ff71b171-ec2c-4d8b-889f-65eebccfc8b0',12,'Visitante',NULL,NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deviceatividades`
--

DROP TABLE IF EXISTS `deviceatividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deviceatividades` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `DeviceSN` varchar(50) NOT NULL,
  `RespName` varchar(50) NOT NULL,
  `EventName` varchar(100) NOT NULL,
  `Estado` varchar(25) NOT NULL,
  `CreatedDate` datetime NOT NULL,
  `EndDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deviceatividades`
--

LOCK TABLES `deviceatividades` WRITE;
/*!40000 ALTER TABLE `deviceatividades` DISABLE KEYS */;
INSERT INTO `deviceatividades` VALUES ('1b128456-4818-4419-b2e4-7e7ca2d0825b','AJYS223460212','admin','Reiniciar Dispositivo','Terminado','2025-03-10 16:34:30','2025-03-10 16:34:32'),('2126aa2d-0c13-4545-8b3e-6ed73ed1f757','AJYS223460212','admin','Enviar Horários par o dispositivo','Terminado','2025-03-10 16:30:10','2025-03-10 16:30:12'),('21c1c57c-ba52-4da5-a201-4fcb0f46aad3','AJYS223460212','admin','Sincronização de Hora','Terminado','2025-03-10 16:34:59','2025-03-10 16:35:04'),('25abf197-e5db-4d25-bb4a-30ea6bbd4a68','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Em Espera','2025-03-10 16:26:15',NULL),('3b6a34e1-4fcd-443d-8121-49ec4417afd7','AJYS223460212','admin','Criar novo dispositivo.','Em Espera','2025-03-10 16:13:12',NULL),('60334db0-ab9c-4236-9798-5120e78c6018','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Em Espera','2025-03-10 16:28:02',NULL),('61d5f5db-2ef4-46ed-b870-627ed08857dd','AJYS223460212','admin','Enviar Plano de Acesso para o dispositivo','Terminado','2025-03-10 16:38:27','2025-03-10 16:38:33'),('6c654bc7-74dc-49c4-99bc-37ca88d0b1f0','AJYS223460212','admin','Criar novo dispositivo.','Em Espera','2025-03-10 16:22:47',NULL),('71b52d52-a105-4e99-a702-9151754a5aac','AJYS223460212','admin','Recolher Movimentos do dispositivo','Terminado','2025-03-10 16:26:50','2025-03-10 16:26:54'),('9fb35c4f-ce2f-4c66-9b5c-38d316389afa','AJYS223460212','admin','Criar novo dispositivo.','Em Espera','2025-03-10 16:14:22',NULL),('ac16201d-e8d8-4684-811d-10bc97cd203a','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Em Espera','2025-03-10 16:27:28',NULL),('ae284594-b885-4358-bd01-7760b784eb51','AJYS223460212','admin','Reiniciar Dispositivo','Terminado','2025-03-10 16:33:24','2025-03-10 16:33:25'),('b6f01ec7-90c2-4855-bd0e-7b7ef2f4512a','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Terminado','2025-03-10 16:29:39','2025-03-10 16:31:25'),('b8469465-896f-4e8c-999f-899ddca8f461','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Terminado','2025-03-10 16:32:05','2025-03-10 16:32:17'),('c38f031e-381e-40a5-8816-dc17e62221d8','CN9A222260111','admin','Recolher Movimentos do dispositivo','Terminado','2025-03-10 17:22:46','2025-03-10 17:22:53'),('cba7b7d9-c445-4417-b58f-4760db9af00c','AJYS223460212','admin','Criar novo dispositivo.','Em Espera','2025-03-10 16:15:24',NULL),('cd4b938b-86fc-4743-922e-324627347262','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Em Espera','2025-03-10 16:24:20',NULL),('d4e968d7-12d3-4cc5-aa33-01729bfca1ae','AJYS223460212','admin','Abrir Porta','Terminado','2025-03-10 16:30:06','2025-03-10 16:30:06'),('d6389ff4-35e1-4b4b-b743-52014cb9ef4f','AJYS223460212','admin','Eliminar as Pessoas do dispositivo','Terminado','2025-03-10 16:27:12','2025-03-10 16:27:18'),('e2d7a9b1-af7a-441c-84c8-c8c1fe50cef9','AJYS223460212','admin','Enviar Pessoas para o dispositivo','Terminado','2025-03-10 16:36:39','2025-03-10 16:36:59');
/*!40000 ALTER TABLE `deviceatividades` ENABLE KEYS */;
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
INSERT INTO `devices` VALUES ('1ba68a57-92d6-496f-904f-8aa1769f5e51',2,'Placa Acessos 2','SISNID-C3-200','192.168.5.232',9999,NULL,0,NULL,'AC Ver 4.7.8.3033 Aug 14 2023','00:17:61:03:4B:4B','TFP5235000319',NULL,NULL,4,2,2,1000,10,0,10,NULL,NULL,2,NULL,'9808','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-02-12 16:27:37.315812','2025-02-05 16:09:55.117441','2025-02-06 10:41:31.021532'),('8a16e968-771e-4e71-9ea7-5832a4a3f795',3,'Placa Acessos 3','SISNID-C3-200','192.168.5.233',9999,NULL,0,NULL,'AC Ver 4.7.8.3033 Aug 14 2023','00:17:61:03:4B:4A','TFP5235000318',NULL,NULL,4,2,2,1000,10,0,10,NULL,NULL,2,NULL,'9808','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-03-06 20:04:19.852866','2025-02-06 10:41:15.764165',NULL),('8e1de1a4-1a6a-466b-8467-f0c96d1a663d',4,'Placa Acessos 4','SISNID-C3-200','192.168.5.234',9999,NULL,0,NULL,'AC Ver 4.7.8.3033 Aug 14 2023','00:17:61:03:4B:C1','TFP5235000437',NULL,NULL,4,2,2,1000,10,0,10,NULL,NULL,2,NULL,'9808','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-03-06 20:04:20.066000','2025-02-06 15:41:07.683152',NULL),('8f234599-b0b8-4148-9d53-89f7e2aed79f',5,'Placa Acessos 5','SISNID-C3-200','192.168.5.230',9999,NULL,0,NULL,'AC Ver 4.7.8.3033 Aug 14 2023','00:17:61:03:4B:B2','TFP5235000422',NULL,NULL,4,2,2,1000,10,0,10,NULL,NULL,2,NULL,'9808','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-03-06 20:04:20.070982','2025-02-06 15:58:20.052051',NULL),('cf539e52-d0e6-47f4-a424-37e93f73caa5',6,'Teste','SISNID-INBIO260','192.168.1.201',9999,'/static/media/inbio260.90c381372586e4188949.webp',0,NULL,'AC Ver 5.7.8.3033 Apr 29 2022','00:17:61:12:F9:45','AJYS223460212',NULL,NULL,4,2,2,600,10,200,10,NULL,NULL,2,NULL,'FB1E','FF3FF07FF036018003060000600300000000000000000000007743F07E070080',NULL,NULL,3,2,1,1,'2025-03-11 09:41:16.108577','2025-03-10 16:22:45.161189',NULL),('e40bf054-eb90-45c3-a253-2df8b4b2c268',1,'Placa Acessos 1','SISNID-C3-200','192.168.5.231',9999,NULL,0,NULL,'AC Ver 4.7.8.3033 Aug 14 2023','00:17:61:03:4B:D1','TFP5235000453',NULL,NULL,4,2,2,1000,10,0,10,NULL,NULL,2,NULL,'9808','FF3FF07FF036018003060000606300000000000000000000007743F07E270080',NULL,NULL,3,2,0,1,'2025-03-06 20:04:20.074263','2025-02-05 16:00:54.664303','2025-02-06 10:41:37.258561'),('eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'Teste Assiduidade','Nface-204_SISNID-1','192.168.1.169',9999,'/static/media/nface.ff12c3f13e6b5c5e5c86.webp',0,NULL,NULL,NULL,'CN9A222260111',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,2,1,1,'2025-03-11 09:41:06.570091','2025-03-10 17:22:21.959714',NULL);
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
  `IdActividade` char(36) DEFAULT NULL,
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
INSERT INTO `employeeattendancetimes` VALUES ('48d33a44-5987-4418-8f15-7e440a1a5a56','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-07 16:27:11'),('54c4b805-c7a5-4c30-95e4-1335b9b92ff9','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-03 09:47:31'),('5e075de7-10e4-41b8-a555-1201468238f5','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'db3e3fb2-41c4-4184-a991-3147be55c62f','3','Gabriel Pensador',15,0,0,0,NULL,'2025-03-10 17:29:09'),('7a38e765-61b3-4454-abe6-8cfae40ba1a1','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-07 16:21:15'),('7fedc236-b959-427d-8b25-3ab28a87b4e2','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-10 17:23:09'),('9da3ca5e-0862-4994-b769-4e5138c5eedf','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-10 17:25:46'),('af214167-8aae-4429-8794-14a2177b68d7','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-10 14:47:02'),('b81ff084-9e1e-40da-8f72-890ae4ede21f','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-07 16:24:40'),('bd012092-3a54-459f-bdc0-96578d4cd7d5','eda5b5e5-0d8c-4b1e-9e0d-a7a0365e685b',7,'00000000-0000-0000-0000-000000000000','3',NULL,15,0,0,0,NULL,'2025-03-07 16:23:05');
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
INSERT INTO `employees` VALUES ('0128f6ab-b7e1-4be8-afde-f0166e8b261f','306','Visitante 306','Visitante 306',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('01b72632-c095-45e9-95ad-a05a1df478b4','196','Telma Vanessa Prazeres Gomes','Telma Gomes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('02f86dad-621d-4efe-93e3-b2cc211498ea','189','Daniel Gaspar Grego de Almeida','Daniel Almeida',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('0407f36b-4ed8-4444-b1a7-bb3afd79bd44','125','Cláudia Patrícia Fernandes Lopes','Cláudia Lopes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9ebba016-531b-4185-9b19-0c7bf7c73907',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('071ca3f7-45be-4cc1-b02b-b5d6f48d669a','179','Bruno José Simões Braga','Bruno Braga',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('0bec8de5-f552-48ea-a4bb-8eb122e438ca','308','Visitante 308','Visitante 308',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('0d7daffb-26a3-4a14-a67f-1da3299e1dcb','56','Carlos Manuel Henriques da Cruz','Carlos Cruz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('1112c62b-78cb-4219-8783-553e743d5f09','128','Valter Jorge Alves Mendes','Valter Mendes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('1c7894b8-94eb-4062-a426-cd6d4864187c','200','Bárbara Neves Mateus Caldas Marques','Bárbara Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('1d0a0fd7-9d50-4383-9081-5c714f507bc9','47','Luís Alberto Alves Pereira Antunes','Luís Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('20216b3f-e9f9-4348-85cc-66775521e6c9','215','José Luís Leal da Silva Vaz','José Vaz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('214dd0b0-6411-440d-9129-36cd3970760d','167','Alex Pereira da Silva','Alex Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('224f3eac-3336-47cc-aea8-fb1abc0653c7','91','Tiago Alexandre Pires Guerreiro','Tiago Guerreiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('2813619f-b2ca-4f99-a220-3226059f44d8','57','Ana Sofia Fernandes Guimarães','Ana Guimarães',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8af132ca-c8b7-44c6-a775-b7e37abd6b86',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('285b207b-e872-434b-b821-6339d89176b1','172','Bruno António Calvo Gonçalves','Bruno Gonçalves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('2c0c95ea-09f7-4621-8d86-a6c4aa5f69db','101','Fábio André Louro Catarrinho','Fábio Catarrinho',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'0ad4eac2-f566-41e2-8bc7-2c9bd67397c4'),('2cca718d-6c42-4869-af33-03ad1f0254e8','222','Funcionário 222','Funcionário 222',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('2f9073d5-26bf-4aec-aff5-b8a5e56ee291','224','Funcionário 224','Funcionário 224',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('3304f9ca-4e6e-4a95-aa59-8d57a463b16d','157','Isabel Cristina Correia do Nascimento','Isabel Nascimento',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('3b78f488-b1bf-4894-bebc-d43dc72d8bbe','8','Eduarda Cristina Alcóbia Ferreira','Eduarda Ferreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('3e4c36bf-4041-4042-9b53-4e003933bfc1','218','Funcionário 218','Funcionário 218',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('3f5b66bb-5f7c-4448-b685-ed87ad8f696f','136','Filipe Chapman Garrido','Filipe Garrido',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('41fa1353-6a17-4baf-a8a9-83715d74f067','221','Funcionário 221','Funcionário 221',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('4695f9b0-4da0-4007-b6ac-262f21c326fc','159','Fernando Silva das Dores','Fernando Dores',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('527c636b-408f-4b5c-8350-5b43b9666f5f','124','António Manuel Almeida Pereira','António Pereira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('52cb29ff-7627-48cd-a0d7-e154b2ad3343','85','Iulian Gheorghiță Acatrinei','Iulian Acatrinei',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('543386f1-8f17-422c-8739-4b2ce50ff46e','83','Ana Lisa Gomes Pereira Real Baptista','Ana Baptista',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('5b9efd20-3db0-49a5-af27-8348ff65e6e3','9','Paulo José dos Santos Mota','Paulo Mota',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('5f765ec6-7745-4869-9860-31a19125e8ba','198','João Vítor Cortegaça Évora Filipe','João Filipe',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('65ad7e02-f740-4c38-9107-6f9cda82423f','95','Leila Patrícia Pereira Marques','Leila Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('662491ff-9e9f-4d68-9d8f-73ea1ffd8a4b','205','Verónica Sofia Gonçalves Monteiro','Verónica Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('66ef829f-18dd-4f5e-b1ed-8ada4f65dcf8','141','Sofia Pacheco Medeiros de Mesquita Gabriel','Sofia Gabriel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d49c2aac-8227-4026-9003-0c34f959e3a4',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('68d11e69-45d0-4684-8cff-41af2bbc7f5f','305','Visitante 305','Visitante 305',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('6979f0d3-8a60-4fd7-bb90-6461b12e3123','209','Francisco Maria Líbano Monteiro Rocha e Melo','Francisco Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('6c51a92d-5522-4420-943c-281aca83fdca','164','Alexandra Carvalho Paredes Gonçalves','Alexandra Gonçalves',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('6d1b6063-a61b-4c6a-b36c-9819ed656690','86','Carla Alexandra Nunes Dias','Carla Dias',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'b58f4c00-f4ac-40f4-8c2e-3aaa3e3b0e1a'),('6f5f9b32-1d39-4b37-bb42-77df8476f101','129','Ana Rita Alexandre Branco','Ana Branco',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('6f73905c-cd11-4501-816e-2d2534d01ada','310','Visitante 310','Visitante 310',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('795b8238-de95-413d-8290-a954cd522dc4','208','Diana Filipa dos Reis Cancela','Diana Cancela',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('7a22687d-478d-4c5f-b351-64b5e6697f33','219','Funcionário 219','Funcionário 219',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('7eeb8dc1-5f50-44a6-b370-7abb184809ab','181','Jaime Maria Rodrigues Silva','Jaime Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('7f8939e1-a11f-44a1-80e4-09b59e0b41b2','214','Carla Alexandra Almeida Ribeiro','Carla Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('8152be82-5761-4dc6-a598-f24da9f18b57','133','Bárbara Filipa Cunha Sampaio','Bárbara Sampaio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('81c1baa9-aab3-4592-ac34-70599cb63170','192','Diana Isabel dos Santos Oliveira','Diana Oliveira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('84cd6a90-d130-4d7d-af5c-08269a970b50','44','Florinda Maria dos Santos Miguel','Florinda Miguel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('8508ff80-f264-4530-bf0d-5b45f3b3664f','5','Daniel Nuno Soares da Silva','Daniel Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'c4595e9c-f800-467d-bee8-1e611b95d55a'),('8d7c4a37-05fe-4846-9efc-4e31245f93b3','206','Diogo Alexandre Vasconcelos Brito','Diogo Brito',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('8e5a276e-c6ac-45ff-ae35-b07539ec6004','223','Funcionário 223','Funcionário 223',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('932ce6c2-50f8-4502-9bac-d0bfb8b7104b','112','Rute de Jesus Fele Cunha','Rute Cunha',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('9c6bc53b-6ad4-427b-b931-dc5bc2413aa9','303','Visitante 303','Visitante 303',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('9f3a4f34-82da-411c-b0a5-a553239fa95c','30','Nelson Carlos Zacarias Rego','Nelson Rego',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('9f6c5e4e-0406-494d-a549-6fb91a4c4403','38','Mário Jorge Marques Gomes Marto','Mário Marto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('a3532009-4e85-4cb1-858e-53e8c9a4380e','65','Inês Filipa Marques Anacleto','Inês Anacleto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','fccdfc47-d6b8-464f-9534-24bb0017d27e',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('a4e7eb37-b919-4413-993a-4d3d307e0160','32','António Joaquim Pedroso B. Cachola','António Cachola',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('a6a5873f-87d7-49e6-a263-1d97a49c041d','27','Patrique Domingos de Sousa','Patrique Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('a932fb8e-8b6a-4b4f-a3f7-085850868840','123','Raquel Maria Viegas Rocha Santos','Raquel Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','fccdfc47-d6b8-464f-9534-24bb0017d27e',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('aad7a203-0d7b-4321-bda0-3daaf033f23a','20','Flávio Pedro Martinho Diniz','Flávio Diniz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('ac39f8d4-9951-48a3-b6a6-9caccfd2a28e','307','Visitante 307','Visitante 307',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('ae99efa4-a571-4703-b377-300ee47b0741','187','Valentim Silva Melnychuck','Valentim Melnychuck',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('af2f6cbe-e87e-4150-bc35-2ea40887eb96','152','Sara da Conceição Soares Amorim Correia','Sara Correia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('afabe1eb-dfe8-40e0-9f35-163ecf8296ec','194','Ana Cristina de Albuquerque Matias Santos','Ana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('b0103a18-0ddf-4c7f-b996-0ece6ca7e409','191','Suse Paula Tomás Pires','Suse Pires',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','d49c2aac-8227-4026-9003-0c34f959e3a4',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('b5348dd8-782e-4d4d-9d19-a888f06b8a6b','117','Rita Helena Tavares dos Santos','Rita Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','fccdfc47-d6b8-464f-9534-24bb0017d27e',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('b9d369ca-ea2e-434b-9ebd-976ff2b0d489','309','Visitante 309','Visitante 309',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('bb320b74-cb43-4ab7-86d9-7d7e8d095e69','107','Francisco Emanuel P. P. Gomes Ribeiro','Francisco Ribeiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('bbcbf4fc-35de-4f18-9f82-a79804ddb7b9','160','Valter Miguel Serra dos Santos','Valter Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('bdb27906-e6c7-4542-b9a8-f8943c37c162','217','Liliana dos Santos','Liliana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('bf213fbf-c9df-453f-a07e-feebfcaea19a','12','Célia Maria Silvestre Silva Lúcio','Célia Lúcio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('c01c57e6-4e1e-43cb-be37-05fe075d0d3a','55','Ana Maria da Cruz Silva Pinto','Ana Pinto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'d9893323-9d19-42c8-a6d7-79fae067899b'),('c17d2a93-62f1-4585-85b9-979c864fd229','188','Soraia Filipa Ferreira Gil','Soraia Gil',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('c25506aa-a27e-4f10-8c7e-da4af6648ae5','66','Joana Brito Ramos Azevedo','Joana Azevedo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('c29e90fb-2bfd-4fd5-bad1-3fedc6c58263','302','Visitante 302','Visitante 302',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Visitante','f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('c56f51d4-0d96-4d97-bf84-4bfd9b02d933','186','Sidney de Oliveira Cassim','Sidney Cassim',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('c5e5317d-71c0-4461-967c-116ec85ce278','301','Visitante 301','Visitante 301',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Visitante','f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('c908e2a6-3f2a-4b8f-98c0-893585a32304','162','Paula Dalina Nitas','Paula Nitas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('cdd47f3b-f961-4e47-b478-8603d1542baa','79','Daniel Alexandre Mata Dupont de Sousa','Daniel Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('d294d1d2-4882-4766-a530-699de6a176c4','195','Miguel João Luz Costa','Miguel Costa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('d41e9152-da79-40de-8f47-367d92cd2993','144','Pedro Vargas Madeira Palma Amaro','Pedro Amaro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('d861ec19-b8c0-444b-9890-1a6d8862c4a4','145','Cíntia Vanessa Sombreireiro Romão','Cíntia Romão',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('d8a23b9b-694d-4b09-9c88-97b936a71883','51','Paula Cristina Tavares Ribeiro Miranda','Paula Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('dcfcf3fb-7342-485c-bb77-a40cff2a15ad','183','Andreia Filipa Romão Mendonça','Andreia Mendonça',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('dda334a9-04f0-4499-ae0b-67a1ad40fe4f','103','João Pedro Mendes Miranda','João Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ddd35241-5c5a-4cae-a7b0-de16097bbb05','104','Ricardo Alves Moreira','Ricardo Moreira',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('de369ea2-8045-4b2c-80e0-6ef254bbc17f','199','Joana Filipa Figueiredo dos Santos','Joana Santos',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ded4510c-90c2-48bb-8d94-2a10a14f8ed8','153','Pedro Miguel Garcias Miranda','Pedro Miranda',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'d9893323-9d19-42c8-a6d7-79fae067899b'),('deeaf6b0-4eb3-4d29-8e7c-cb4c539276ea','213','Sara dos Santos Loureiro','Sara Loureiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('ed4893ef-5120-4d9f-8f68-b402ba8d40e0','93','Marisa Isabel Contente da Silva','Marisa Silva',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ed4a22a1-ad67-495c-a2cb-441f07743a1e','202','Tomás Forte da Palma Antunes','Tomás Antunes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('ed562809-5251-40af-b434-d1893acfc733','96','João Pedro Candeias Domingues','João Domingues',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('ee507f84-5535-4a03-ab39-dd2b0e4f37d7','132','Miguel Afonso Paulista Verga Caninhas','Miguel Caninhas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','0fc7280d-26bd-44ac-927c-c746b1c88abd',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('ef044621-1047-4b41-acd2-b4c3cb5da3ef','165','Thiago Luís de Melo','Thiago Melo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('efdc2e5f-1386-44f9-977a-8a58a0cced04','151','Ana Teresa de Simões Graça e Almeida Marques','Ana Marques',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('f169c7ca-d987-4c00-a930-d2e0ab1907b4','203','Alexandra Ribeiro Rijo','Alexandra Rijo',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','4ad9bb0f-0952-40f7-bec2-d9e7c2b305ce',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'17b8f7e5-1e63-40c4-9cd8-af019f6c90c9'),('f209bed8-ebe6-484f-ba9d-8fcacf794937','304','Visitante 304','Visitante 304',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','ff71b171-ec2c-4d8b-889f-65eebccfc8b0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'5f0b7ef6-ee88-4f05-bfe9-bddbe0fe9edb'),('f7816e55-951d-4f1c-bd2b-69dba2bbbea7','24','Noémia Maria Reis Porfírio','Noémia Porfírio',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','9f007f98-ffa6-418d-88f2-ca22b36e5a2b',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('f82a148b-7e20-47f3-9c0e-4ada1193515b','216','Maria Inês Pereira Duarte','Maria Duarte',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','8af132ca-c8b7-44c6-a775-b7e37abd6b86',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('f8d32f8d-0d4e-48f7-a1b2-9b41b40b8b85','131','Bruno Miguel Araújo de Sousa','Bruno Sousa',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','617f32ac-2f68-411a-bfe4-c32570bbd205',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'1e7f5288-6712-442f-b1fc-10fc92ebfa80'),('fb73a1d6-d3b9-4664-9ee0-b6a258b43516','39','Marta Susana Alves Monteiro','Marta Monteiro',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','479afc0d-fa5a-4b03-b25d-b14fcf249df0',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'82059b38-387a-4140-99d3-d5d60dd10ea9'),('fd16978d-1786-47a5-b61b-f5e0e533eac0','220','Funcionário 220','Funcionário 220',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,'f96d6b10-32f4-45f2-b104-6ad6e3daf556','edcda3d0-2606-410b-9b4d-5ebd3ef27158',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42'),('fe88d39d-8802-4aad-a9ac-fc6c35d77802','36','Helena C. Pereira Tomás N. Esperto','Helena Esperto',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'Funcionário','f96d6b10-32f4-45f2-b104-6ad6e3daf556','ddd97fb3-2d4b-45b6-aeb0-6399bfec26de',NULL,NULL,'9fced19a-8f96-4f3e-beeb-b68374abd00d',NULL,NULL,'14f5febf-487a-4911-877d-07083bba7b42');
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
INSERT INTO `employeescards` VALUES ('08dd46bc-9178-4afd-8b7f-b8a9d903c59f','8508ff80-f264-4530-bf0d-5b45f3b3664f',NULL,NULL,1,'291'),('08dd46bc-9178-4b4c-8c3f-e5b4a436d386','3b78f488-b1bf-4894-bebc-d43dc72d8bbe',NULL,NULL,1,'293'),('08dd46bc-9178-4b51-81c6-63e998bad16f','5b9efd20-3db0-49a5-af27-8348ff65e6e3',NULL,NULL,1,'10832577'),('08dd46bc-9178-4b54-84cb-077e8408169c','bf213fbf-c9df-453f-a07e-feebfcaea19a',NULL,NULL,1,'9124359'),('08dd46bc-9178-4b57-8c5a-f41499804570','aad7a203-0d7b-4321-bda0-3daaf033f23a',NULL,NULL,1,'9124360'),('08dd46bc-9178-4b5a-8cda-ee143d78a6d5','f7816e55-951d-4f1c-bd2b-69dba2bbbea7',NULL,NULL,1,'9124361'),('08dd46bc-9178-4b5d-8efb-67cc4e26be57','a6a5873f-87d7-49e6-a263-1d97a49c041d',NULL,NULL,1,'10920487'),('08dd46bc-9178-4b61-80aa-cfc933ec0f39','9f3a4f34-82da-411c-b0a5-a553239fa95c',NULL,NULL,1,'9127895'),('08dd46bc-9178-4b68-89c4-ef3bb3c246a9','a4e7eb37-b919-4413-993a-4d3d307e0160',NULL,NULL,1,'9127894'),('08dd46bc-9178-4b6b-8e2a-446debf5f3fd','fe88d39d-8802-4aad-a9ac-fc6c35d77802',NULL,NULL,1,'10920174'),('08dd46bc-9178-4b6e-8dee-52cb13ade80e','9f6c5e4e-0406-494d-a549-6fb91a4c4403',NULL,NULL,1,'10960269'),('08dd46bc-9178-4b71-8ec5-a13551c19fbc','fb73a1d6-d3b9-4664-9ee0-b6a258b43516',NULL,NULL,NULL,'10803847'),('08dd46bc-9178-4b74-8c49-39a1c0478ca8','84cd6a90-d130-4d7d-af5c-08269a970b50',NULL,NULL,NULL,'10804118'),('08dd46bc-9178-4b78-81a5-2c7d72b6ce00','1d0a0fd7-9d50-4383-9081-5c714f507bc9',NULL,NULL,NULL,'10804390'),('08dd46bc-9178-4b7b-84be-4bf7aaf59410','d8a23b9b-694d-4b09-9c88-97b936a71883',NULL,NULL,NULL,'10804663'),('08dd46bc-9178-4b7e-8798-9fdc7a330f0f','c01c57e6-4e1e-43cb-be37-05fe075d0d3a',NULL,NULL,NULL,'10804937'),('08dd46bc-9178-4b81-85fc-b6e11fdcf5c7','0d7daffb-26a3-4a14-a67f-1da3299e1dcb',NULL,NULL,NULL,'10805211'),('08dd46bc-9178-4b84-8572-d0fea0230d2a','2813619f-b2ca-4f99-a220-3226059f44d8',NULL,NULL,NULL,'10959862'),('08dd46bc-9178-4b88-8a23-8cf775ec1367','a3532009-4e85-4cb1-858e-53e8c9a4380e',NULL,NULL,NULL,'10959672'),('08dd46bc-9178-4b8b-8aa2-073004a6c0a0','c25506aa-a27e-4f10-8c7e-da4af6648ae5',NULL,NULL,NULL,'10959292'),('08dd46bc-9178-4b8e-8ac7-746aeea059ee','cdd47f3b-f961-4e47-b478-8603d1542baa',NULL,NULL,NULL,'10959078'),('08dd46bc-9178-4b91-8bae-4f34e0b646b5','543386f1-8f17-422c-8739-4b2ce50ff46e',NULL,NULL,NULL,'10958862'),('08dd46bc-9178-4b94-8c6f-3e3ca88ef089','52cb29ff-7627-48cd-a0d7-e154b2ad3343',NULL,NULL,NULL,'10958645'),('08dd46bc-9178-4b97-8d1a-fe93c43e8513','6d1b6063-a61b-4c6a-b36c-9819ed656690',NULL,NULL,NULL,'10958427'),('08dd46bc-9178-4b9a-8e27-ef8bb653eb45','224f3eac-3336-47cc-aea8-fb1abc0653c7',NULL,NULL,NULL,'10958207'),('08dd46bc-9178-4b9d-8e77-912ac52ae86a','ed4893ef-5120-4d9f-8f68-b402ba8d40e0',NULL,NULL,NULL,'10892518'),('08dd46bc-9178-4ba4-8675-eae943bd9067','65ad7e02-f740-4c38-9107-6f9cda82423f',NULL,NULL,NULL,'10892253'),('08dd46bc-9178-4ba7-8813-2ad42c7dfe63','ed562809-5251-40af-b434-d1893acfc733',NULL,NULL,NULL,'10891989'),('08dd46bc-9178-4baa-8a19-557874864a7f','2c0c95ea-09f7-4621-8d86-a6c4aa5f69db',NULL,NULL,NULL,'10891726'),('08dd46bc-9178-4bad-8b29-d4220f9eff75','dda334a9-04f0-4499-ae0b-67a1ad40fe4f',NULL,NULL,NULL,'10957308'),('08dd46bc-9178-4bb0-8e2c-840b08213f1e','ddd35241-5c5a-4cae-a7b0-de16097bbb05',NULL,NULL,NULL,'10957535'),('08dd46bc-9178-4bb4-803f-7b887ea84c8c','bb320b74-cb43-4ab7-86d9-7d7e8d095e69',NULL,NULL,NULL,'10957761'),('08dd46bc-9178-4bb7-8029-aac91a025afa','932ce6c2-50f8-4502-9bac-d0bfb8b7104b',NULL,NULL,NULL,'10957985'),('08dd46bc-9178-4bba-8159-45cdceb12bb0','b5348dd8-782e-4d4d-9d19-a888f06b8a6b',NULL,NULL,NULL,'10894674'),('08dd46bc-9178-4bbd-81c3-4d9cc3d4002f','a932fb8e-8b6a-4b4f-a3f7-085850868840',NULL,NULL,NULL,'10894401'),('08dd46bc-9178-4bc0-822b-511468005809','527c636b-408f-4b5c-8350-5b43b9666f5f',NULL,NULL,NULL,'10894129'),('08dd46bc-9178-4bc3-8340-943c5fedf326','0407f36b-4ed8-4444-b1a7-bb3afd79bd44',NULL,NULL,NULL,'10893858'),('08dd46bc-9178-4bc7-8396-47e28adebf58','1112c62b-78cb-4219-8783-553e743d5f09',NULL,NULL,NULL,'10893588'),('08dd46bc-9178-4bca-840a-cb8ccd26e74e','6f5f9b32-1d39-4b37-bb42-77df8476f101',NULL,NULL,NULL,'10893319'),('08dd46bc-9178-4bcd-8360-d71cf5fd74f3','f8d32f8d-0d4e-48f7-a1b2-9b41b40b8b85',NULL,NULL,NULL,'10893051'),('08dd46bc-9178-4bd0-829b-ee2cf6346576','ee507f84-5535-4a03-ab39-dd2b0e4f37d7',NULL,NULL,NULL,'10892784'),('08dd46bc-9178-4bd3-818f-96e11c4905ea','8152be82-5761-4dc6-a598-f24da9f18b57',NULL,NULL,NULL,'10894948'),('08dd46bc-9178-4bd5-8fec-fb5373ba630d','3f5b66bb-5f7c-4448-b685-ed87ad8f696f',NULL,NULL,NULL,'10804661'),('08dd46bc-9178-4bd9-8f32-deb3b3bd3bca','66ef829f-18dd-4f5e-b1ed-8ada4f65dcf8',NULL,NULL,NULL,'10804935'),('08dd46bc-9178-4bdd-837e-79496e0b3681','d41e9152-da79-40de-8f47-367d92cd2993',NULL,NULL,NULL,'10919861'),('08dd46bc-9178-4be0-8204-dc86e9d656ed','d861ec19-b8c0-444b-9890-1a6d8862c4a4',NULL,NULL,NULL,'10805209'),('08dd46bc-9178-4be3-81e6-866c98c54765','efdc2e5f-1386-44f9-977a-8a58a0cced04',NULL,NULL,NULL,'10815469'),('08dd46bc-9178-4be6-8172-77e17d2733f5','af2f6cbe-e87e-4150-bc35-2ea40887eb96',NULL,NULL,NULL,'10815169'),('08dd46bc-9178-4be9-8195-b5e875fce8ff','ded4510c-90c2-48bb-8d94-2a10a14f8ed8',NULL,NULL,NULL,'10814870'),('08dd46bc-9178-4bec-807a-e51a1e933965','3304f9ca-4e6e-4a95-aa59-8d57a463b16d',NULL,NULL,NULL,'10814571'),('08dd46bc-9178-4bef-8065-71bf64e3d029','4695f9b0-4da0-4007-b6ac-262f21c326fc',NULL,NULL,NULL,'10812199'),('08dd46bc-9178-4bf1-8f09-6778f5aa4710','bbcbf4fc-35de-4f18-9f82-a79804ddb7b9',NULL,NULL,NULL,'10812494'),('08dd46bc-9178-4bf5-82c8-5108efdd92eb','c908e2a6-3f2a-4b8f-98c0-893585a32304',NULL,NULL,NULL,'10812789'),('08dd46bc-9178-4bf9-8885-3c74d19737a8','6c51a92d-5522-4420-943c-281aca83fdca',NULL,NULL,NULL,'10813084'),('08dd46bc-9178-4bfc-88e0-fa0e8af04a34','ef044621-1047-4b41-acd2-b4c3cb5da3ef',NULL,NULL,NULL,'10813380'),('08dd46bc-9178-4bff-88f6-359b117122ef','214dd0b0-6411-440d-9129-36cd3970760d',NULL,NULL,NULL,'10800146'),('08dd46bc-9178-4c02-879c-f8ae4c6c9c6f','285b207b-e872-434b-b821-6339d89176b1',NULL,NULL,NULL,'10800402'),('08dd46bc-9178-4c05-8531-67ed7524b2b2','071ca3f7-45be-4cc1-b02b-b5d6f48d669a',NULL,NULL,NULL,'10800660'),('08dd46bc-9178-4c08-8487-17f7a2cf7022','7eeb8dc1-5f50-44a6-b370-7abb184809ab',NULL,NULL,NULL,'10800919'),('08dd46bc-9178-4c0b-839a-78a6fafa77fd','dcfcf3fb-7342-485c-bb77-a40cff2a15ad',NULL,NULL,NULL,'10801179'),('08dd46bc-9178-4c0e-86a8-285e5247a43c','c56f51d4-0d96-4d97-bf84-4bfd9b02d933',NULL,NULL,NULL,'10801440'),('08dd46bc-9178-4c11-86aa-d33aaeaef2b0','ae99efa4-a571-4703-b377-300ee47b0741',NULL,NULL,NULL,'10801702'),('08dd46bc-9178-4c14-8647-fd69fbbc2df9','c17d2a93-62f1-4585-85b9-979c864fd229',NULL,NULL,NULL,'10801965'),('08dd46bc-9178-4c17-86c7-3debd8fc62b2','02f86dad-621d-4efe-93e3-b2cc211498ea',NULL,NULL,NULL,'10799891'),('08dd46bc-9178-4c1b-87f7-399d67e76ecb','b0103a18-0ddf-4c7f-b996-0ece6ca7e409',NULL,NULL,NULL,'10799384'),('08dd46bc-9178-4c1e-8607-437493ea169d','81c1baa9-aab3-4592-ac34-70599cb63170',NULL,NULL,NULL,'10799132'),('08dd46bc-9178-4c21-8536-def3515b49e6','afabe1eb-dfe8-40e0-9f35-163ecf8296ec',NULL,NULL,NULL,'10798882'),('08dd46bc-9178-4c24-8537-a66c110fbfd1','d294d1d2-4882-4766-a530-699de6a176c4',NULL,NULL,NULL,'10798633'),('08dd46bc-9178-4c27-8957-3685a4c41558','01b72632-c095-45e9-95ad-a05a1df478b4',NULL,NULL,NULL,'10799637'),('08dd46bc-9178-4c2a-8974-1915903291c5','5f765ec6-7745-4869-9860-31a19125e8ba',NULL,NULL,NULL,'10809565'),('08dd46bc-9178-4c2d-8690-380e0ad1d6b7','de369ea2-8045-4b2c-80e0-6ef254bbc17f',NULL,NULL,NULL,'10809323'),('08dd46bc-9178-4c30-894c-18610a3a3a46','1c7894b8-94eb-4062-a426-cd6d4864187c',NULL,NULL,NULL,'10807101'),('08dd46bc-9178-4c33-89b5-0c8b5e90cbd4','ed4a22a1-ad67-495c-a2cb-441f07743a1e',NULL,NULL,NULL,'10807379'),('08dd46bc-9178-4c36-888a-93e8d28a3a0f','f169c7ca-d987-4c00-a930-d2e0ab1907b4',NULL,NULL,NULL,'10807657'),('08dd46bc-9178-4c3d-86ce-20a1901c2484','662491ff-9e9f-4d68-9d8f-73ea1ffd8a4b',NULL,NULL,NULL,'10808214'),('08dd46bc-9178-4c40-888d-b780cb3cd9cb','8d7c4a37-05fe-4846-9efc-4e31245f93b3',NULL,NULL,NULL,'10808493'),('08dd46bc-9178-4c43-8978-f48120c2740b','795b8238-de95-413d-8290-a954cd522dc4',NULL,NULL,NULL,'10808773'),('08dd46bc-9178-4c46-8866-2a2cb02ae062','6979f0d3-8a60-4fd7-bb90-6461b12e3123',NULL,NULL,NULL,'10809053'),('08dd46bc-9178-4c49-880f-18c2303eb418','deeaf6b0-4eb3-4d29-8e7c-cb4c539276ea',NULL,NULL,NULL,'10831639'),('08dd46bc-9178-4c4c-887e-1a1ededc0ce2','7f8939e1-a11f-44a1-80e4-09b59e0b41b2',NULL,NULL,NULL,'10831952'),('08dd46bc-9178-4c4f-8822-aa3650b78112','20216b3f-e9f9-4348-85cc-66775521e6c9',NULL,NULL,NULL,'10832265'),('08dd46bc-9178-4c52-8b7b-bbf6e8d3512e','f82a148b-7e20-47f3-9c0e-4ada1193515b',NULL,NULL,NULL,'10919548'),('08dd46bc-9178-4c55-8a32-ec6661239cdd','bdb27906-e6c7-4542-b9a8-f8943c37c162',NULL,NULL,NULL,'10831326'),('08dd46bc-9178-4c58-8aad-4a017902ecbd','3e4c36bf-4041-4042-9b53-4e003933bfc1',NULL,NULL,NULL,'10831013'),('08dd46bc-9178-4c5c-8f96-49be5c58c26e','7a22687d-478d-4c5f-b351-64b5e6697f33',NULL,NULL,NULL,'10830387'),('08dd46bc-9178-4c60-806c-cecf0d2665d1','fd16978d-1786-47a5-b61b-f5e0e533eac0',NULL,NULL,NULL,'10830074'),('08dd46bc-9178-4c62-8e4a-51c4bb9e2d6f','41fa1353-6a17-4baf-a8a9-83715d74f067',NULL,NULL,NULL,'10829761'),('08dd46bc-9178-4c65-8c49-8dfe3d740f46','2cca718d-6c42-4869-af33-03ad1f0254e8',NULL,NULL,NULL,'10919850'),('08dd46bc-9178-4c68-8b06-4883f661cbd9','8e5a276e-c6ac-45ff-ae35-b07539ec6004',NULL,NULL,NULL,'10920163'),('08dd46bc-9178-4c6b-8bcf-e813e5da7cb8','2f9073d5-26bf-4aec-aff5-b8a5e56ee291',NULL,NULL,NULL,'10917663'),('08dd46bc-9178-4c74-85d8-2447be419869','c5e5317d-71c0-4461-967c-116ec85ce278',NULL,NULL,1,'10917352'),('08dd46bc-9178-4c77-83d7-6d329bb082e2','c29e90fb-2bfd-4fd5-bad1-3fedc6c58263',NULL,NULL,1,'10857627'),('08dd46bc-9178-4c7a-859d-ec2e7dc5308e','9c6bc53b-6ad4-427b-b931-dc5bc2413aa9',NULL,NULL,NULL,'10857901'),('08dd46bc-9178-4c7d-8467-ed4bd6ae0ea0','f209bed8-ebe6-484f-ba9d-8fcacf794937',NULL,NULL,NULL,'10856791'),('08dd46bc-9178-4c80-837b-f88b1f6ba156','68d11e69-45d0-4684-8cff-41af2bbc7f5f',NULL,NULL,NULL,'10846175'),('08dd46bc-9178-4c83-8215-de18f20701d9','0128f6ab-b7e1-4be8-afde-f0166e8b261f',NULL,NULL,NULL,'10921938'),('08dd46bc-9178-4c89-8b6c-abfe0b061662','ac39f8d4-9951-48a3-b6a6-9caccfd2a28e',NULL,NULL,NULL,'10921625'),('08dd46bc-9178-4c8c-8c58-4ff10e2ffdcf','0bec8de5-f552-48ea-a4bb-8eb122e438ca',NULL,NULL,NULL,'10814272'),('08dd46bc-9178-4c91-8896-8a11195b9750','b9d369ca-ea2e-434b-9ebd-976ff2b0d489',NULL,NULL,NULL,'10813974'),('08dd46bc-9178-4c94-86db-d756ed0ac451','6f73905c-cd11-4501-816e-2d2534d01ada',NULL,NULL,NULL,'10813677');
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
-- Table structure for table `employeevisitanteacompanhantes`
--

DROP TABLE IF EXISTS `employeevisitanteacompanhantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeevisitanteacompanhantes` (
  `Id` char(36) CHARACTER SET ascii NOT NULL,
  `EmployeeVisitanteId` char(36) CHARACTER SET ascii DEFAULT NULL,
  `EmployeeId` char(36) CHARACTER SET ascii DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_EmployeeVisitanteAcompanhante_EmployeeId` (`EmployeeId`),
  KEY `IX_EmployeeVisitanteAcompanhante_EmployeeVisitanteId` (`EmployeeVisitanteId`),
  CONSTRAINT `FK_EmployeeVisitanteAcompanhante_EmployeeVisitantes_EmployeeVis~` FOREIGN KEY (`EmployeeVisitanteId`) REFERENCES `employeevisitantes` (`ID`) ON DELETE SET NULL,
  CONSTRAINT `FK_EmployeeVisitanteAcompanhante_Employees_EmployeeId` FOREIGN KEY (`EmployeeId`) REFERENCES `employees` (`EmployeeID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeevisitanteacompanhantes`
--

LOCK TABLES `employeevisitanteacompanhantes` WRITE;
/*!40000 ALTER TABLE `employeevisitanteacompanhantes` DISABLE KEYS */;
INSERT INTO `employeevisitanteacompanhantes` VALUES ('d1455512-686f-47c9-910b-959c59082105',NULL,'c29e90fb-2bfd-4fd5-bad1-3fedc6c58263');
/*!40000 ALTER TABLE `employeevisitanteacompanhantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeevisitantes`
--

DROP TABLE IF EXISTS `employeevisitantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeevisitantes` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `IDVisitante` char(36) CHARACTER SET ascii NOT NULL,
  `IDPessoa` char(36) CHARACTER SET ascii NOT NULL,
  `IDEntidadeExterna` char(36) CHARACTER SET ascii DEFAULT NULL,
  `DataInicio` datetime(6) NOT NULL,
  `DataFim` datetime(6) DEFAULT NULL,
  `DataSaida` datetime(6) DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  `IDInserido` longtext NOT NULL,
  `Obs` longtext,
  `IDViatura` int(11) DEFAULT NULL,
  `Viatura` varchar(50) DEFAULT NULL,
  `Reboque` varchar(50) DEFAULT NULL,
  `DataSaidaFecho` datetime(6) DEFAULT NULL,
  `RefDoc` varchar(150) DEFAULT NULL,
  `VisitanteNome` varchar(300) DEFAULT NULL,
  `VisitanteNif` varchar(30) DEFAULT NULL,
  `VisitanteCartaoEU` varchar(30) DEFAULT NULL,
  `VisitantePassaporte` varchar(30) DEFAULT NULL,
  `VisitanteContacto` varchar(100) DEFAULT NULL,
  `EmpresaNome` varchar(300) DEFAULT NULL,
  `EmpresaNif` varchar(30) DEFAULT NULL,
  `IDVisitanteMotivo` char(36) CHARACTER SET ascii DEFAULT NULL,
  `VisitanteMotivo` varchar(300) DEFAULT NULL,
  `IDPai` char(36) CHARACTER SET ascii DEFAULT NULL,
  `Created_at` datetime(6) NOT NULL,
  `Rem` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeevisitantes`
--

LOCK TABLES `employeevisitantes` WRITE;
/*!40000 ALTER TABLE `employeevisitantes` DISABLE KEYS */;
INSERT INTO `employeevisitantes` VALUES ('790fad7d-cf40-40df-a991-128d860cf3e7','c5e5317d-71c0-4461-967c-116ec85ce278','a4e7eb37-b919-4413-993a-4d3d307e0160','08dd5ff6-9163-45d4-8365-c6a31da9a05a','2025-03-10 17:40:00.000000','2025-03-10 17:41:17.475816','2025-03-10 17:41:17.475816',2,'f36b818d-b82c-41f8-852a-b7e6ec770ad0',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','','','','Teste','123654789',NULL,NULL,NULL,'2025-03-10 17:40:51.708514',NULL);
/*!40000 ALTER TABLE `employeevisitantes` ENABLE KEYS */;
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
INSERT INTO `eventdevices` VALUES ('0033a2ec-9bdd-4829-b1a0-0814369e39e4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:52.000000'),('005dacd3-cfcb-4a69-a005-5dfcad0bd6b6',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-06 15:47:52.000000'),('00a02c5d-9dfc-49a0-9a93-21ccfb2093a0',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:25.000000'),('00ade997-3d07-48dc-8d97-eec8d24ee0e4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:30.000000'),('00dcc70a-f69d-47b4-a59f-0d184bc7521b',96,10891989,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:09.000000'),('00e137bd-7f0f-4665-9c03-5a3540e8b60d',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('01021997-9c6c-41f2-96e2-bb29203196eb',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-03-05 13:27:55.000000'),('01c0d1c2-dc35-4550-a75c-e3214e43389b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:56.000000'),('021267b3-af54-4889-b47e-59aaf3f39b0b',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 15:15:53.000000'),('03d048b5-08a1-4bd2-b8d5-3f14c3455224',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-07 15:44:45.000000'),('04a7c559-2c59-4c13-898d-3201f1b304b3',0,267,1,NULL,27,0,4,NULL,NULL,'2025-02-05 16:19:21.000000'),('04d7f9c4-0360-4cde-a0f1-1d6585dd521f',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 17:59:00.000000'),('06d38505-aab6-40cb-ac9a-a82ac6fb7ac4',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:50.000000'),('06e6ef13-53cb-4440-b0a8-2699e7280e41',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 16:59:45.000000'),('073ca261-9a80-4b1e-a523-dd8e468731e9',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:29:04.000000'),('0905af30-c259-4adc-8f3c-55b5c54735ed',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:38:59.000000'),('0916bf03-6df8-4358-8f96-6d7ca21720ea',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:47:11.000000'),('0a2434c1-f7f4-46a7-996b-fd8857ddc679',96,10891989,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:18.000000'),('0a38c4f0-8210-42fc-953a-08a489abda3f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 12:27:34.000000'),('0a7505a7-6971-4fb9-a015-44c54afe62b9',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:48:58.000000'),('0afee293-e688-465e-8d25-faf9a4fb5149',36,267,1,NULL,0,0,4,NULL,NULL,'2025-02-05 16:53:59.000000'),('0bef7d42-2c50-4c88-819b-866cf692abf2',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:41.000000'),('0d173925-f863-4e7e-a7bb-480e5f2cba6a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('0e13186b-516d-425d-b7ea-6040f5a2d52a',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'AJYS223460212','2025-03-10 16:09:03.000000'),('0e927fe5-093b-4ab9-a108-1fb54be9b70c',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:12.000000'),('0f96c488-d763-4a52-acb3-0734cc0bc49a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:28.000000'),('0fc0c4a9-3e40-4389-b371-0ebd61200d15',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:46.000000'),('1015a8a9-3e25-478b-81ed-eceb6477e3f5',95,10892253,1,NULL,22,0,4,NULL,NULL,'2025-02-10 09:24:55.000000'),('10bdb168-4059-4368-adb1-16fd0d2f8a96',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:46:57.000000'),('10ccb735-f88e-4762-8076-453e239e0478',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 21:36:44.000000'),('1162adc7-5f5e-41c7-98d1-6ab90fd6529f',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 18:00:41.000000'),('117cc51a-f4b2-4935-aebb-d34148302467',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-03-01 12:24:29.000000'),('119a28e6-4aa4-4e45-b4d1-04d97c1fc9a3',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:21:22.000000'),('11de62f6-1e6b-4af3-8bb9-99ffa3e71eef',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:59.000000'),('1271bbca-a79f-423f-8929-57da97a9a851',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:14:08.000000'),('144e6e21-d93e-4478-af47-e965f7638bd5',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 15:24:08.000000'),('14a832c7-5ee5-48ae-9c21-4414a613a314',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:56.000000'),('15dfdb1d-1d16-4d7e-a915-bb0bfcef9bc7',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 15:14:58.000000'),('16e44936-a97c-4782-be85-ff0cca0d3c42',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 23:16:12.000000'),('1807038c-33d3-48c0-a63c-da8bf0452ad9',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:52.000000'),('18508bba-c4b5-4795-b4b0-2581ad5d6f5e',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:27:26.000000'),('18b9357e-f522-483b-b015-ba1c4831cf12',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 18:21:07.000000'),('1950d57d-2f32-48e3-a9e0-acf65447edc8',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 12:28:04.000000'),('1a243f46-05b5-477a-8c9b-c02abc76badd',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:52.000000'),('1a3ad716-3b68-43af-8f90-676bba801378',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 17:44:17.000000'),('1ad5a7f5-77e5-41e9-aa97-afd1d8b12e24',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:57:37.000000'),('1b42cfd7-9686-48a5-a928-7e626bc0081f',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:49.000000'),('1b6604ca-ffad-4144-b0c2-0e64d6501921',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 10:02:59.000000'),('1b8f315a-9b87-4ef4-88bc-da7600894ad0',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 21:36:44.000000'),('1c8a6277-3ce6-4fb9-8504-318b7df51dc0',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:23.000000'),('1ce9b993-106b-4437-966f-78dae24794b2',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:56:28.000000'),('1d99966b-d85b-4361-8efb-25f77581d358',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:21.000000'),('1f9c6c56-3117-44f4-95ee-0fcb247ef387',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:18.000000'),('1fa0fc8d-ffe4-401a-8d1f-4fa939e596f2',36,267,1,NULL,22,1,4,NULL,NULL,'2025-02-05 16:29:18.000000'),('2017cb03-7997-43f2-ac0a-60690489d2e8',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-10 16:48:29.000000'),('20821af6-8c2f-45eb-b79b-912a987faaca',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:25.000000'),('21062889-71a8-46f5-9672-48fd85112d6d',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:08.000000'),('22bcd4d5-e054-4d99-8f6f-9b00d143886e',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('248056d7-c87a-46ed-9a09-dc8df0313bbc',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:44.000000'),('24d260fb-3eed-46a8-9e7f-6abf7d428311',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-03-05 13:15:12.000000'),('253c9886-a6e7-4ff9-b4d6-7d497ead933b',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:19:51.000000'),('25853ced-37d0-4cc9-be38-5a9d5c61d5b2',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-03-01 12:24:29.000000'),('26687194-a505-4f4f-8045-16edfb3593af',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:43:58.000000'),('267e438e-04dd-471f-af56-ee0719752349',0,10892253,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:40:40.000000'),('268c3736-2894-40fc-8eb1-5a11572d4d91',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:28.000000'),('26d6ab9a-ebd0-4305-8882-2a85c7b980c4',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 23:01:33.000000'),('279c7fb2-f8b5-41e2-a378-c3f2544a1a76',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:00:02.000000'),('28a8afc6-b4a9-4acd-aa90-999dd8a1dcdd',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:31.000000'),('2a5730bd-c3f7-440e-96ee-974a8df3d7f5',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:55:54.000000'),('2d78a5c5-5590-47b5-b57c-1dfd0419913b',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:37:38.000000'),('2d7e815d-7c2d-495e-958b-a2c5d529b705',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 21:36:45.000000'),('2e477db1-2625-4bfd-8572-7d1963f37080',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:17.000000'),('2f499bb4-799e-4f01-b061-72b98033893d',0,264,1,NULL,27,0,4,NULL,NULL,'2025-02-05 17:07:28.000000'),('2f801624-9f20-4c98-95a1-adc2c862f2ec',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:24:24.000000'),('2fc4af48-f1ef-4fce-9a40-7d9577008561',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:30.000000'),('305aa0bb-b670-42a4-a667-969de63eb173',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 11:52:40.000000'),('307ac03b-09a5-47b6-bfb7-1b8eaa3acf07',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:57.000000'),('30eda850-ba45-45ae-a552-89060e04c456',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:27:09.000000'),('310b2df4-96d1-4db9-97f4-1cfbb7290ab0',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-03-01 12:24:28.000000'),('31435dcc-b998-4a7f-ac43-105d2d772cbf',0,279,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:25.000000'),('31ef1022-88a5-4c90-b521-3bed24956196',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('3201363e-462a-4f34-8755-a927fe8236b8',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 12:20:12.000000'),('32550e45-26b7-444c-a4ab-ab06bd10fc66',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:11.000000'),('32dcaae6-dbd1-4c86-b6e6-e71842ea9149',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:48:44.000000'),('331dcc17-7d84-42ab-bc93-f80035e5bbdc',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:41.000000'),('33a49515-b213-4625-bdc0-b0f8f725683b',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:54:08.000000'),('34f81d62-22cd-4cb4-9277-d8a9e727be96',0,10958427,1,NULL,27,1,4,NULL,NULL,'2025-02-12 10:56:13.000000'),('356f3b29-e600-4651-8e37-180f61185b92',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:21.000000'),('36644e48-d225-4a14-bb91-a8afd5704a00',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:13:57.000000'),('36fbc7d3-15ee-44d0-ac81-99b16b189446',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 17:44:16.000000'),('375cebf6-cca2-429b-83f8-d247c9347061',0,279,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:14:29.000000'),('386f80d8-de2c-4d73-8428-61ceefbe73b0',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:30.000000'),('38b6c1d5-936c-4260-b472-dec4282e09ca',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 23:16:37.000000'),('38e65102-2084-49c9-827c-99f8bb62bb01',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:22:26.000000'),('39d96540-826f-4531-b9c0-0f930e6affa1',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:49.000000'),('3a2bb645-194a-42c0-96ee-e49d36e7331e',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:17:35.000000'),('3b434548-f4b8-4154-a88b-6e66dd945a80',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:46:38.000000'),('3c0bf54e-9d0c-45cd-8a13-713d5325c85d',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-11 11:30:41.000000'),('3c1e74f3-bfea-4667-b3aa-667df6a5d8a4',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:06:49.000000'),('3cbbe42d-db6e-4b4d-9857-81d9d08547cd',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:30:17.000000'),('3cd0ad38-97de-4b24-afd3-a51fe9590c81',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 10:59:57.000000'),('3d9eb004-42db-4d00-a465-8bcb955e5e0f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-03-01 12:24:31.000000'),('3e35b7f5-b2ab-4b33-a15e-6c4b67037be4',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:15:01.000000'),('3eb20623-bad1-43be-9498-cef2b6e1cbf5',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 15:16:08.000000'),('3efc3794-78dd-429b-a135-7c2048a9b160',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:37:32.000000'),('3f59a790-ea71-408a-bda8-95967930dbd7',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:15:20.000000'),('402599f7-a005-4c07-a39f-ee6bcb73c1d5',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:28.000000'),('408f9cd2-d8be-4f58-b044-67e94ba6f15d',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-07 15:47:17.000000'),('40fb0427-e200-4f7a-9559-e12f89feefc8',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-03-01 12:24:29.000000'),('4105a957-af3a-4384-bc30-b3d56f5f8d53',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('41dfce9e-1976-40bc-a275-54cbaf3e5db7',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:37:36.000000'),('424f2074-6a20-4a0a-a010-a4e9b9dd98ca',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:23.000000'),('432fda9d-f04c-4999-8e3c-bdc5ebc23289',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 10:15:13.000000'),('43a82299-4b39-4e0d-8300-50be3de85f43',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:59.000000'),('44e54a75-76fd-44fc-a9fc-cd50b898b787',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:42.000000'),('44e703dc-6fba-4a78-9b13-05bca741e92f',55,10804937,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:55:11.000000'),('44fedae4-b64a-4d44-a873-163693a78db1',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:57.000000'),('459e2484-c5b2-4f71-981b-1558b06da3a9',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 21:36:42.000000'),('47175df4-2ad4-431d-9f41-b2928835cb4e',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:39:41.000000'),('4772b23d-94cb-496e-afff-4c9dd0de2b9b',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:06:29.000000'),('48e207d6-883a-47c7-8445-89af401487bb',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 12:20:12.000000'),('49022785-1b54-4223-9f0d-d65bf5c58b87',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:39:36.000000'),('4989ac1b-5430-47b2-99ec-cdd3518c014b',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 12:27:36.000000'),('49a5ea02-aaa2-4e13-801c-06ffa867a53a',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:26:33.000000'),('4a1d8f12-3b73-4311-9cdc-905b0bb74fc8',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-11 09:36:59.000000'),('4a2c45f7-0e31-4f14-9527-21dd6da52533',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:21:54.000000'),('4ba94c97-01c1-4037-b5d8-5df1b328aa21',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 15:14:58.000000'),('4c5e7733-51b4-47dc-872b-7e699d49cf7b',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 11:57:02.000000'),('4cb00d20-f863-4841-a564-f245ca41971a',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 15:15:53.000000'),('4cfe5688-d8a2-4959-a8c9-87b3721659a1',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:13:59.000000'),('4ddad253-7310-48e7-ab91-f18f701f329a',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:41:05.000000'),('4e48d594-fadb-4730-9e06-2db6c986983b',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:27:18.000000'),('4ebb38eb-2b5d-490e-9f39-d2221346121f',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:21.000000'),('4ec464a1-0bb9-4a16-b90a-b0ff9379ac22',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:44:01.000000'),('4ec4a3a0-aeb2-4885-a8a3-58e656a4b63b',38,264,1,NULL,0,0,4,NULL,NULL,'2025-02-05 17:09:17.000000'),('4f17a667-042d-4147-b14e-c3443ad22532',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:48:48.000000'),('4f9f4ef3-bbbb-4afc-be3f-0408220b18ab',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-07 10:19:44.000000'),('51633278-8555-4112-9a36-b5c401436f5d',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:29:00.000000'),('51fbd722-8c6e-46c8-9580-4c2d6a2eb19b',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 17:01:34.000000'),('524e3790-a91b-47dd-8169-7772078b19f9',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:21:36.000000'),('5275c46c-cf1e-4f73-88f9-7daf5389bb89',0,10832577,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:10:54.000000'),('545f0314-f6bb-493a-ad23-0a81ab7719e4',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:22.000000'),('54cee7ff-bf31-4cd9-a905-aa58cc5da998',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 15:16:11.000000'),('54dac106-2715-442c-a433-bbd04e35bfdf',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 12:20:12.000000'),('561389ee-4b80-4423-a9ec-950d1f8b99e9',96,10891989,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:01.000000'),('561fba38-a97d-42c2-b8f6-ed33148e5ed6',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:55:39.000000'),('5689e5fd-643a-4347-b58a-cacdbc1771df',36,267,2,NULL,0,0,4,NULL,NULL,'2025-02-05 17:02:45.000000'),('572498d0-7383-49ab-bfe3-4c39c0a4773d',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:29:11.000000'),('58b3356e-0a94-46f7-baa3-f7682c7c3c99',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:13:07.000000'),('58db82bb-fac2-4fd1-987b-da412fceafa4',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-26 15:37:29.000000'),('59d157a0-b933-44d7-9011-4ae08c501a9c',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:53:59.000000'),('5a3c4c8e-b367-4748-8ddb-cda319b40412',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:47:03.000000'),('5bc581aa-4061-40fd-b2e2-9f6c84da1f48',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:20.000000'),('5c0b6683-ab8e-4c0c-805f-44f1074cc8a5',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 11:57:03.000000'),('5c77147e-8a33-4736-93d4-42144daf71a0',0,10892253,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:40:38.000000'),('5ca07aa7-df11-463f-8933-1311eead8d9c',0,10832577,1,NULL,27,0,4,NULL,NULL,'2025-02-07 15:11:39.000000'),('5ccee037-3c00-429c-afb0-3da770cc95e5',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:06.000000'),('5d267bc0-3fab-4484-a16a-ed9d0ebdfa1d',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-10 10:08:18.000000'),('5d377f6f-5204-42b4-8c81-e1e6c7c8cac5',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 21:36:38.000000'),('5d91313a-436f-4772-a0cd-f339b7b846df',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 12:20:12.000000'),('5dd2296e-66dc-4888-ba0f-ea6e32b28f78',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:57.000000'),('5e21f892-0cd2-4d07-b92e-a2ab10468e28',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:13:14.000000'),('5eac671f-1578-4d4e-9c20-f24f31527bef',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 09:22:40.000000'),('5efd6c99-e62c-4ae3-b2b5-33609fb98278',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:58.000000'),('5f15ff22-49b7-4718-8270-381a7b7baec6',0,4,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:25:49.000000'),('5fd8d5eb-fa89-4648-b6a1-f792d18af160',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:06:55.000000'),('6140ece1-18dc-4022-946f-50d1d5da49b7',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 12:24:33.000000'),('622752da-0168-4568-8a2f-929cc91fbe90',39,10803847,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:25.000000'),('62897666-e876-4039-add1-0d941ab43e37',86,10958427,1,NULL,0,1,4,NULL,NULL,'2025-02-12 10:56:30.000000'),('63b016a7-561f-4907-8078-5d145b857c81',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:07.000000'),('63c26903-9f3a-4c68-92ef-fd577d158e0c',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'AJYS223460212','2025-03-11 09:32:15.000000'),('6465e5e1-7f2e-4ace-bdbc-03a9f19926de',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-03-01 12:24:31.000000'),('64f577b3-fa97-4516-a74b-d9362e703f4a',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-06 18:20:19.000000'),('65245df8-988f-4226-be48-3eb2f17c8be8',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 10:57:16.000000'),('663d96ee-07fd-4af7-9fd2-8705bcdbf6dd',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-03-01 12:24:32.000000'),('69176d1e-9250-4659-9807-88b81ed18d84',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:53:02.000000'),('69aa1213-6211-4ae8-a216-cfe810bd2d2e',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:30:13.000000'),('69bfd2d1-2066-4cd0-a0fd-f688d0bbc9a0',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'TFP5235000453','2025-03-05 13:13:45.000000'),('69fc9fcf-12c6-43f8-a073-8a8d4604cb5a',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 15:14:33.000000'),('6a00d954-e91f-469c-a6b5-ea53ad1f0618',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 11:57:04.000000'),('6a2bbf3d-dc9b-4e43-9c7f-329388b5900f',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:41:00.000000'),('6b30ae26-0601-4428-a9e4-1a2efa5f4f81',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:46:03.000000'),('6c266509-ed09-4479-aae5-1b3abc8a0658',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 15:14:56.000000'),('6c6a1e5c-745b-4cd6-a71e-b218f28f6c5f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 15:15:53.000000'),('6c7dbc6e-721a-4c8f-b054-a42d9a183f64',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'AJYS223460212','2025-03-10 16:33:37.000000'),('6cdda143-e89b-48ac-aa4b-4dbefa8f6c4c',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:39:35.000000'),('6d1300e3-990f-4c37-a6b9-dad41f6b9798',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 21:36:42.000000'),('6d8615f6-bb0c-42af-a465-f0ec7a9979c0',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('6e20b891-381e-43f3-bf08-c9263f19c833',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:12.000000'),('6f0dd569-c4d5-46ab-a3b0-4a316bb63173',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('6f2878c5-0faf-4738-b1aa-92276b262e36',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:28.000000'),('6f8c54d5-98a6-40ae-9289-73a8c2606f52',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('709e2b24-30ed-4026-a923-e5f62435020f',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:48:06.000000'),('7154e629-602a-4765-a323-ab762bb4fb89',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 12:28:04.000000'),('71eb6c66-bd54-4090-84b8-eb19e7291bd2',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'AJYS223460212','2025-03-10 16:45:24.000000'),('7226bcf6-a328-4dc5-ab87-f65abefa8bf4',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:48:22.000000'),('723772dc-38e2-436c-b2f1-64d3b2688f4e',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:22:16.000000'),('73344472-b82f-42c7-a47d-7c7809ac51b4',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'TFP5235000422','2025-03-05 13:27:13.000000'),('733bfbe8-fce5-42c9-9912-e59d8fd2bab7',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 17:06:51.000000'),('735a4815-0aef-4462-aa8c-a2a4cddd35b4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 12:21:34.000000'),('75e2a40a-de69-43aa-ba33-199865b1bc13',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:54:06.000000'),('7749bf5e-2bcb-4ee4-936e-fdb625d9e6e3',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:54:00.000000'),('7803d367-cbb0-4cf8-879e-47e356aac780',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:46:59.000000'),('78321d63-dc5d-4466-a386-02ebf1ccfddf',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:54:04.000000'),('7861cc04-9fae-4f04-ac35-765b428af622',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 10:15:13.000000'),('79abbb62-24d4-458e-b56b-5c42ce4067af',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('79d9ed62-9ee3-4393-ad02-2405ea05cdb7',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:27:07.000000'),('79fd4da8-89b8-42b9-965f-44416e9d4848',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 17:15:10.000000'),('7a06aef9-2365-4829-abc7-4946d6eaac83',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:44:28.000000'),('7a3d9b8a-e848-4998-8602-7760c8fc9827',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:19.000000'),('7a822e80-5555-477a-a4dc-4c2a0b0d162c',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-10 10:06:46.000000'),('7afe4de4-5ae3-497d-a2d3-4844efc54c79',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 12:27:36.000000'),('7b44ab52-644d-4b7a-86d2-41586ae00868',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:06.000000'),('7b87fec8-2b6f-4734-9581-b6f6313bb25f',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 22:55:33.000000'),('7bb3c6c0-35a1-4759-8320-48ba8f2e6204',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:27:30.000000'),('7be9df84-9101-4950-aac9-c46ef805bbd6',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 11:52:38.000000'),('7c1e01ec-b34c-4c8e-aaa3-9771dcf2bce2',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 09:22:49.000000'),('7c85987f-08a3-4888-8ebc-0a475dd7a67c',165,10813380,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:20:00.000000'),('7cf21843-e4b2-40c6-a0e0-b88d5ff912e5',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('7d429fbd-f879-44fb-b2d1-bcde60a7c0bb',8,9124358,1,NULL,23,0,4,NULL,NULL,'2025-02-12 11:26:56.000000'),('7ee9c4ae-0267-48a1-b25a-08c3a58cacb0',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-06 18:20:46.000000'),('7f9ea51b-e057-4c54-a51b-8f375fd90d89',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 10:01:10.000000'),('7fb6409a-a532-47ca-865e-31bae1a85d9d',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:43.000000'),('809d363f-bbaf-4171-a3d9-6555ee961aca',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:38:58.000000'),('80c3e02f-f92e-4001-9c9a-be44cd16e63b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:11.000000'),('8301b823-8b0b-4043-b08d-07735dc49e31',0,NULL,1,'Auxiliar de entrada conectado',221,2,200,NULL,'AJYS223460212','2025-03-11 09:32:16.000000'),('83175c47-dc1f-4732-ad61-97702387ce9b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('8344cb2b-8266-41b8-a9ac-facb00c7d5c0',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:15.000000'),('83b52b28-c520-4959-91f1-f871b3a79b15',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:28.000000'),('84f1f07c-016c-44ba-be17-25c36ac8079e',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:48:54.000000'),('851b493b-520d-457d-bce4-0afd5f5b3813',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 16:24:29.000000'),('8538f541-8575-4b98-bf4d-a5450125f1fa',27,10920487,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:59:44.000000'),('858e0224-0935-4024-8d86-cfdc6c490781',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 15:16:11.000000'),('86477874-6c45-4a83-845f-29fea34e31dd',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:08.000000'),('87583f9b-de49-433b-8217-0943e22559b7',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:00:04.000000'),('87c2ecec-ef1c-45d0-9eb3-0d695df638a9',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-26 11:11:06.000000'),('889d728e-8f5d-40c7-877f-a4e2ad844511',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 12:24:33.000000'),('88bb8ed2-92b4-4217-a008-3572be0df20a',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:13:02.000000'),('8978a4ad-ae22-4b69-945d-ba35c44ea2ac',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:19.000000'),('89f5bcfd-a97b-4bf1-8a33-fa3f69d4df8d',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 23:59:54.000000'),('8a6c6dc0-38e6-4093-bd39-a7dadcc5fc5e',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 15:23:34.000000'),('8a6d3bb9-fe20-4dc1-9c5b-1a93c3267570',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 15:14:33.000000'),('8a78e5ef-53a8-429d-85fb-0634faa7f4fc',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:54.000000'),('8b06fc87-991c-4285-b738-eb5ed90f73cb',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 12:24:37.000000'),('8b0f3e9a-2c57-4e0b-bc12-81995491bdb7',9,10832577,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:17:25.000000'),('8b302ff2-fb6e-4b71-a800-85d03e6c8ace',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:52:29.000000'),('8b616fe1-998d-4c74-a81c-13a8f8ab61d3',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:31:54.000000'),('8b68c5a4-a5f3-4ea2-a3d4-d61408cf45b9',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 12:20:47.000000'),('8c2d115b-7061-4726-acac-5386e2fc7720',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:20:30.000000'),('8cdd1d35-5418-49d2-b970-6ace303ea71b',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-25 11:29:29.000000'),('8ddca2c7-8a99-478c-91cf-70246972da67',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:23:14.000000'),('8ddf1436-fd89-46c7-a7d4-74167a7bf1e8',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:17.000000'),('8dfdddc5-1f09-4fd9-b5b1-c09675a310b8',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 12:27:36.000000'),('8e082f8d-f178-4ad9-a220-755189a6ccb0',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:31:57.000000'),('8e895fb0-0bd2-4c93-b7f8-bd2c02763990',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-12 11:00:08.000000'),('8f716c67-e57d-46f9-8b4b-6708d0c42aac',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:16:10.000000'),('904cfd0d-02e1-4695-bffa-b7a486db96bc',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:06:49.000000'),('909ec1a2-1cbb-40f7-8e7f-5b3ee704a412',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 15:14:58.000000'),('912850bb-046d-4939-95bc-541fbbbfebd3',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:29:08.000000'),('923ff6eb-2aaf-49d0-8b8b-be2c0d0e40a2',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('925e4bea-e64d-437b-b4cc-12d8270a52e8',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:14.000000'),('935b20dc-2d65-4a9c-8272-fce62fa37c4c',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:12.000000'),('935c4e14-9dd1-481c-86c0-d8c89895f33f',0,NULL,1,'Auxiliar de entrada conectado',221,2,200,NULL,'AJYS223460212','2025-03-10 16:45:25.000000'),('936f9a13-d122-46dc-84f8-2eafd9bcccf4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:01:27.000000'),('93d0bc61-ac60-4f16-9090-f79329fa262e',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000422','2025-02-12 12:28:05.000000'),('93fb5713-9e1c-4deb-adb0-c6ce8259f551',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:50.000000'),('9452148c-620c-4691-986e-bc3b2c1de6c0',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:24.000000'),('9534f715-2af1-40b1-b8a6-a291e75c4d06',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:57.000000'),('9568e683-b0fd-4f64-ad08-2d73e42d3016',5,9124357,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:59.000000'),('956cd3bf-ac3d-450a-9d48-ac8c15a8d166',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-03-01 12:24:26.000000'),('96794fce-7c33-41c2-a840-c4e7ceb0c87a',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:53:06.000000'),('96cb273a-0380-45cc-98e0-b19c0aee5a6b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('96fd3003-8a8c-48a6-bdf0-2e66b8b8cc84',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:24:56.000000'),('974216a5-9fad-43dd-9151-990a8ff15d98',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:32:00.000000'),('9794f052-276a-4727-857e-7b3b3e367544',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 09:23:09.000000'),('98115c13-efa0-4c08-a034-f54c3bcf2919',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:06.000000'),('98b830b0-b618-4093-80d5-a5445ccb5a95',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:45:08.000000'),('98d00777-6fcf-4b28-84af-ca3fc9e6f8df',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 17:29:11.000000'),('98eefccf-a10b-4192-83e3-4418d827871f',55,10804937,1,NULL,0,1,4,NULL,NULL,'2025-02-12 10:54:20.000000'),('9942670d-352f-419c-806f-5f8a0f37bbf6',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 11:52:40.000000'),('99e1af66-ff96-4f88-b8ff-870237f8c25a',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-05 23:46:48.000000'),('99efcdd7-d30a-4985-8be1-4c3bd501ad48',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 18:43:30.000000'),('99f2ddc9-ae0e-4571-9c8f-9eaa762b9389',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:01.000000'),('9b445721-f136-49c3-98cc-71f5f6dc86ee',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:39:01.000000'),('9ba282e8-1f67-455b-ab20-7c61c1d1abb6',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:14.000000'),('9d7656f9-b453-4dd6-959a-7712d4faa06b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 10:55:38.000000'),('9dbe5773-dbe9-46f8-8fa5-e112909dc111',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:25.000000'),('9e24e8fa-8daf-49ee-a5e3-47e560e8e644',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:43.000000'),('9ffd458c-30c8-4456-a1f5-5d396d1b1fbf',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:44:02.000000'),('a033e483-ad69-4c35-9598-33519f7f1bf8',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-11 09:36:32.000000'),('a083101e-70be-4036-a27d-5265c9a8b568',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:07.000000'),('a145b975-e3b4-4d37-9ca9-cfa0b4c386c8',95,10892253,1,NULL,22,0,4,NULL,NULL,'2025-02-07 15:44:39.000000'),('a1f06a34-0415-410e-9ef5-615ce6e7625a',86,10958427,2,NULL,0,0,4,NULL,NULL,'2025-02-12 10:57:07.000000'),('a2c81225-979e-44f4-add3-94fb84353b87',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-12 11:26:42.000000'),('a37c5603-3a9d-4dfa-b6d8-7b891ff09556',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 16:27:17.000000'),('a53fadd6-a7a4-46ab-8ff9-9086cebb3ac3',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'TFP5235000318','2025-02-25 10:48:04.000000'),('a56a9019-6ff3-4465-ac0b-db3fa5e3f0d4',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:15:22.000000'),('a5953f3a-5617-4fbd-95ec-cd9f6e3dfb24',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 15:15:54.000000'),('a5cd01bf-6c1a-4a42-ac15-60fa12633da6',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:39:00.000000'),('a621747e-99d2-4992-936c-961f1c8fa18c',0,6586851,2,NULL,27,0,4,NULL,NULL,'2025-02-07 09:36:59.000000'),('a84b0da0-889f-4f2a-80c2-1d305941f128',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:14:51.000000'),('a86eb43f-5deb-4272-8c43-28d96baf32c7',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:28:47.000000'),('a911e180-bd9b-4160-a31a-1fb67efa39b0',86,10958427,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:56:19.000000'),('a94512b4-0cf2-4f67-b03f-f6e4a7563255',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 15:14:32.000000'),('a96f402b-5209-4bc3-a9ae-760a6ee41ffb',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 15:45:13.000000'),('a98015da-d258-4447-97c7-cf3273126e2f',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 16:13:00.000000'),('a9eb799d-49ec-4683-a782-a850ce08ba79',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-06 11:54:53.000000'),('ab31734c-92b7-4e5b-ac96-ed118c9887b1',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:44.000000'),('ab41f81f-d2cc-4627-b165-43526aa6a458',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'AJYS223460212','2025-03-10 16:34:44.000000'),('ac4d972c-1f28-479f-b84b-c020ccde7d2a',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-10 10:08:15.000000'),('ac6bd2b6-bc29-462e-b538-17d91f182dad',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:23.000000'),('ad828432-68a8-439e-b8e7-c3c0893ade4c',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:24.000000'),('adae210b-bb9a-4d75-be82-09cb92bd1744',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:26:44.000000'),('adf08334-0c96-46c7-9328-19ac41aee2bd',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:31:55.000000'),('aebe4c1c-1303-4671-b02e-18f041068907',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-10 16:53:04.000000'),('b02ad591-e7da-453e-ac3d-18d7acb2cdbf',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 16:12:57.000000'),('b033a3a9-3a04-4782-ad1f-cb88c6f52d1e',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:55:58.000000'),('b044ae91-83a5-4df6-abe0-232d381314c9',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:25:00.000000'),('b0651ea3-7ac5-42a5-8c2f-a90adca8e52a',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 15:39:38.000000'),('b098c245-29be-49c3-9959-217d60ec74cc',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 12:21:36.000000'),('b0df22d3-27b8-4fff-b9cf-8ab57946781a',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 15:16:12.000000'),('b148a454-0256-4a76-9f00-cba955b4939f',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:36:44.000000'),('b17e8dad-d6ce-4222-9507-b26146ba8a52',36,267,1,NULL,0,1,4,NULL,NULL,'2025-02-05 16:51:13.000000'),('b1d45ae6-ca04-402e-bd94-b09f59cff4e2',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-11 11:30:58.000000'),('b2acc6b6-c242-4fc2-80af-a134d3354aa4',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:59:02.000000'),('b2e3f740-0fcf-49da-a641-c78f92275e37',153,10814870,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:52:53.000000'),('b31110b4-1667-41bd-9d6e-1fad4f47ebac',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 11:37:56.000000'),('b49380e3-33a2-4e75-b4a0-d5a7658f9e36',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 12:20:45.000000'),('b5af6906-8f22-4fbe-9f12-7d660d430003',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:26.000000'),('b5b0809a-532f-4b0a-915f-d425c2ef076c',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:53:57.000000'),('b7108a9e-58f4-48b4-bef4-c97867f9c4b2',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 11:52:39.000000'),('b76e6b95-9954-4d06-b707-ea87ec81d005',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:28.000000'),('b907b9cd-00cf-41f7-a0bc-764447a610ba',0,279,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:14:26.000000'),('b9dc0c73-be07-42ec-9d32-76a94c07613b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:21:04.000000'),('baad87c8-11e9-45aa-8c9f-ed4bf6d3fbd3',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:29:35.000000'),('bb042eb2-ae7d-424f-bbc9-4cd470ad1ab8',39,10803847,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:59:05.000000'),('bb78a848-ded4-4d82-a5fe-7bb6cb3b6925',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-10 16:52:59.000000'),('bbcb4008-5096-4eb8-bd2b-0c51f3c845a0',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-10 16:48:36.000000'),('bbe2f2b0-7675-43fe-93f8-92e982e892c1',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 12:24:34.000000'),('bc95ac0c-6334-4333-8ca1-93efa14bd9a0',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:29:24.000000'),('bca69f0b-fa58-44cf-a454-df74320f8c5f',0,10805211,1,NULL,27,0,4,NULL,NULL,'2025-02-12 10:53:11.000000'),('bcbeddf7-d8c9-46e3-9fbe-11b110ceea24',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:06:49.000000'),('be398b04-a618-4519-b3c8-e684bbf67628',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 16:50:22.000000'),('c06382ab-7632-43bf-8960-aa46e38b9ca8',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 10:55:37.000000'),('c08d5d63-0127-4d3b-bc34-deb095d12c0e',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:01:52.000000'),('c0b72b8c-8976-4203-8430-22aef94cceea',0,9124357,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:29:15.000000'),('c15dc8ed-5f10-4e56-af58-c0326886944e',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:52:21.000000'),('c2695fac-8705-442f-bd21-b951896018bb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:13:01.000000'),('c3b2b55f-e71e-4d61-a8e9-29e9a1378479',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:59:17.000000'),('c3e03f11-f9a1-4a10-9111-81e03c2a7494',55,10804937,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:54:29.000000'),('c5042c58-fbe1-4c49-a950-c8e5938bca26',36,267,1,NULL,0,0,4,NULL,NULL,'2025-02-05 16:49:19.000000'),('c50e2557-f8f3-4bcd-8876-a220c466427d',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:01.000000'),('c7eb4a4b-8014-4d98-a4ad-8d6a09eec4ff',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:30.000000'),('c802b7dc-6f6b-466a-9686-535bf124943a',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:23:34.000000'),('c8889577-cbc6-41d1-804f-50ac6661ef68',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:13.000000'),('c9843156-68b2-4761-ba7f-abe826d16390',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:00:09.000000'),('c9bbed51-89aa-4a0b-836b-eda11009e70c',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-12 11:57:03.000000'),('c9f8616b-e512-4163-9c58-53357fb046a3',95,10892253,2,NULL,0,0,4,NULL,NULL,'2025-02-07 16:12:59.000000'),('cb4b23ee-08be-4207-a279-7dc26ad8d819',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000319','2025-02-12 12:20:09.000000'),('cbd75c9e-dfa9-4a48-96bd-eda164f00825',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:55.000000'),('cc2511e6-64c7-41b1-a6ff-205b01b48468',5,9124357,2,NULL,0,0,4,NULL,NULL,'2025-02-12 11:22:24.000000'),('cd7a7c54-c644-41dd-bb24-f1346dadcd79',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-05 23:57:38.000000'),('cd89a91b-f8fb-4fa3-ab23-06461adccf1f',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:04.000000'),('cd9d678f-70dc-4ae0-9115-fa2f315dcd46',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-12 11:26:39.000000'),('cedc594c-0231-42f2-a225-c44f1e4d9018',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 11:56:31.000000'),('cfaf50be-cbc9-44d0-8778-9b38b5f7454e',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:39:42.000000'),('d0184aa4-7794-48ff-a107-f497a0b7fd63',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:12.000000'),('d0501ee8-9779-4f3a-98b4-be3ca88dc89c',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:08.000000'),('d0629d16-8170-4e7d-9a4d-672bcf9fbdd4',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000422','2025-02-12 12:27:37.000000'),('d068e257-4cb6-41a9-a099-867825e77e7b',9,10832577,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:09:46.000000'),('d0a40e5a-4540-4e20-809e-92792f83d8d7',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 16:51:06.000000'),('d146aab9-f1a4-40fe-bedd-b6008135a44a',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 15:41:09.000000'),('d17cff3c-546f-4587-a4e8-34faf3e101af',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-07 01:20:46.000000'),('d1b3d998-56c9-4127-b616-c35d1dd66948',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:33.000000'),('d1c24de7-bc9a-47d0-aa08-369ece331de2',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:06:58.000000'),('d227bbf2-adc3-4727-a7ab-011152b14634',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:31.000000'),('d23aa271-e665-4ed4-8587-40e9b58cf5c0',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 14:58:21.000000'),('d29b96a6-6013-4720-866c-339e5b120461',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 10:15:11.000000'),('d2aafeb9-df2c-4b91-845f-c457b3758f10',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 09:22:35.000000'),('d40e0b38-7ec4-460b-9650-58d2f94c48ff',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 15:47:05.000000'),('d44306d2-a1a6-4474-bb9e-4a2f6f2df187',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:19.000000'),('d4a685a8-18dc-484c-bd48-4340f6f615fc',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 11:57:01.000000'),('d580cf7c-086c-4bb5-8e64-7550949f4bda',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-07 15:46:40.000000'),('d58247d5-ee26-46bf-a53c-f2145a066316',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000319','2025-02-12 12:28:02.000000'),('d5ae0181-795f-4397-9017-27153f583206',38,264,2,NULL,0,0,4,NULL,NULL,'2025-02-05 17:09:21.000000'),('d5e04d6b-de95-40e9-a849-34e5d122cb63',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-05 16:23:26.000000'),('d61c8761-8689-4015-b648-a4314d910e88',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 20:37:30.000000'),('d631f0a1-877d-42e1-b17a-7360ebc7ed98',0,267,1,NULL,27,0,4,NULL,NULL,'2025-02-05 16:20:06.000000'),('d6a9b1d4-21b0-4d79-bb0e-671423dd70f8',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:21:06.000000'),('d6af5f80-9bf0-4b6a-be2d-2cf9bbbf8309',0,264,1,NULL,27,0,4,NULL,NULL,'2025-02-05 17:02:39.000000'),('dac97602-4b3d-413d-a8a3-60a041964e00',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000453','2025-02-12 15:23:34.000000'),('dad2373e-e57c-4590-a1ed-084862d30c8c',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:18.000000'),('dada431f-6a49-4516-b052-52b7146a8690',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:26.000000'),('dbdf0ef8-0b6b-42da-920c-5cb4c1a712ea',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:00:01.000000'),('dc1770bb-b49a-4626-beaa-267a33e14b0b',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 17:48:55.000000'),('dc6e6494-daec-4dcb-8a9d-0b49b116897b',0,9124358,1,NULL,27,0,4,NULL,NULL,'2025-02-07 10:21:46.000000'),('dca1ddce-c5d7-4f81-9ac6-d3149f68e299',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-05 16:59:46.000000'),('dd07a2f7-561c-48c0-82c6-6029ec17fad7',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-07 16:11:50.000000'),('dd2825f1-4a40-4fb0-bafc-d6650650a086',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 15:32:49.000000'),('deab231b-a51a-42cc-8d31-4f595e43be8c',0,9124358,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:13:54.000000'),('dfa209ff-0e91-443c-b7af-83c520e8f180',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:39:20.000000'),('e032d3dd-e334-4b0c-a05b-12090290e6f6',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 12:28:04.000000'),('e05fc7b1-48b7-4b67-bbfd-08f79c8cab8b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:52.000000'),('e0f17b31-5162-4a24-9bc4-3e1905166882',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 10:02:13.000000'),('e188278e-78cd-479c-abf7-45521cd0e6b6',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:44:29.000000'),('e18b91ab-dd5c-4c2d-8f4e-8b91b6c39404',95,10892253,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:13:03.000000'),('e1afe226-9756-450e-9740-4bd814ddce5e',0,9124357,1,NULL,27,0,4,NULL,NULL,'2025-02-12 11:32:00.000000'),('e25c12b0-bce0-4410-9ba9-b538daeed3fb',5,9124357,1,NULL,0,0,4,NULL,NULL,'2025-02-12 11:22:15.000000'),('e2921f25-5814-4e90-8ba2-f53f8cf2235d',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-07 10:19:01.000000'),('e2bc4311-3c5e-46db-b539-7d9bea0e403e',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000437','2025-02-12 15:14:48.000000'),('e37a5f00-e351-4a5b-91e7-57e02407ad03',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-12 12:24:33.000000'),('e39328ef-8e03-4f7e-92be-179f45207d8a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:25.000000'),('e39babc3-6aa9-4166-ae75-46276c009d36',55,10804937,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:53:02.000000'),('e47094a4-fdda-4b60-974a-f422f2a533d1',0,6586851,1,NULL,27,0,4,NULL,NULL,'2025-02-07 10:20:39.000000'),('e54db4ee-5a06-40b2-8c4b-97fac8634e03',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:19:42.000000'),('e60f7b34-ed86-49bf-82e8-0d099a7dfba7',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:24.000000'),('e83576bf-337f-4696-aeb7-03fe6854fdac',0,NULL,1,NULL,8,2,200,NULL,NULL,'2025-02-12 10:47:11.000000'),('e9385234-3cb2-46c3-b6ed-51689ecaa367',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-06 17:28:26.000000'),('ea21cd97-3e69-492d-af05-7cdfd2a5abbf',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000437','2025-02-26 15:37:30.000000'),('ea2b138f-3002-4f28-8115-19727063326c',36,267,1,NULL,22,0,4,NULL,NULL,'2025-02-05 16:25:34.000000'),('ea2c3e63-2c77-43b2-8dea-72ad3690fdcf',39,10803847,1,NULL,0,0,4,NULL,NULL,'2025-02-12 10:58:55.000000'),('eace8487-2dac-4f6d-9c52-185252f23f57',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:06:58.000000'),('ead62b9c-605b-4c2d-9f30-771eeff88364',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 10:06:48.000000'),('eb38a62f-220e-4b54-b6f2-9c40118dabf5',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:31:31.000000'),('eb5aa647-b193-4da2-8dbb-e424e75f2cb6',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:53.000000'),('ebf2ec49-d02e-46e2-924d-5ec0a37e31aa',8,9124358,2,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:57.000000'),('ec13d46f-89a8-4e2e-ba9e-c1f632f102c2',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-03-01 12:24:26.000000'),('ecae9d05-48e7-4756-ad79-520104641f7a',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 11:36:28.000000'),('ed2ae3c0-4785-4eb6-925e-71af1683546f',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-06 10:57:16.000000'),('ed414383-0abd-4866-8926-c81bf4f4400a',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-03-01 12:24:32.000000'),('ed88eb42-d19c-410a-8338-b6f19662f113',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 17:01:28.000000'),('ee270fb0-8497-4144-b5c4-d3a702ce1524',95,10892253,1,NULL,0,1,4,NULL,NULL,'2025-02-10 10:06:39.000000'),('ee8174ee-314d-457e-8253-091b2736718b',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:37:32.000000'),('eeb9ac62-42d2-4ea0-b1d0-54f622c72881',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:43.000000'),('ef07a380-57ea-4ea1-a110-961d63c19aae',95,10892253,1,NULL,22,1,4,NULL,NULL,'2025-02-10 09:58:15.000000'),('f01f3282-4341-4497-978e-70ed518c0aeb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:38:57.000000'),('f1417d38-869c-4692-a217-d7d718cdb933',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-07 12:20:45.000000'),('f18f2d2d-263b-4b0d-b47d-ebf5487b1aab',36,267,2,NULL,23,0,4,NULL,NULL,'2025-02-05 16:51:26.000000'),('f1ba888f-2446-4d35-9060-eb2341e00eb2',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000318','2025-02-12 11:52:39.000000'),('f2010b27-7c60-471a-a6e6-8c76c1bd30a6',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-05 18:43:42.000000'),('f21c7491-f31e-44ae-b3b1-e441183d90a6',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:36:57.000000'),('f29d18da-1170-433f-8186-73df7e3cdc82',0,279,2,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:27.000000'),('f2e38dcc-999d-43fc-bf36-58bce9e6afdb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:17.000000'),('f3cf2012-e38c-454f-8016-b9eaabd050fb',5,9124357,1,NULL,23,0,4,NULL,NULL,'2025-02-10 16:44:05.000000'),('f3d6a7ff-4b4d-441d-9810-8ae69f00eb98',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-05 20:36:46.000000'),('f3f2a737-7dd4-4b64-963d-434845a84622',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('f4817eb4-9138-4d42-91f3-3b29fd146479',0,NULL,0,'Conectado ao servidor com sucesso',214,2,200,NULL,'TFP5235000318','2025-02-25 11:29:32.000000'),('f49ee104-c858-4726-8a00-d52ffa5bf607',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-10 10:05:47.000000'),('f4cfcc7d-2b2f-4216-9eae-384ace52b06e',5,9124357,1,NULL,23,1,4,NULL,NULL,'2025-02-10 16:46:56.000000'),('f528dbb7-288e-4acf-b83b-935c1e451240',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('f59f179d-fae3-4ff5-b918-fafe0ffb96f6',0,0,0,NULL,214,2,200,NULL,NULL,'2025-02-06 18:20:38.000000'),('f629438e-2363-4e11-b160-54bc313769af',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 17:49:06.000000'),('f7289cc1-2249-4691-8592-cce40ad7bbf5',8,9124358,1,NULL,0,0,4,NULL,NULL,'2025-02-07 16:14:03.000000'),('f738619d-5316-4ef8-b579-8259fec5bc71',9,10832577,2,NULL,22,0,4,NULL,NULL,'2025-02-07 15:16:11.000000'),('f74b83b5-bdba-4f1d-86c9-099cc23e3829',0,NULL,0,NULL,206,2,200,NULL,NULL,'2025-02-10 08:51:29.000000'),('f7835569-0ab5-4cfa-8dfa-62a89b0673e6',9,10832577,1,NULL,23,0,4,NULL,NULL,'2025-02-07 15:06:21.000000'),('f7b9cdd6-b029-458a-ac3d-e718cefc240f',0,NULL,0,'Rede desconectada',105,2,200,NULL,'TFP5235000453','2025-02-12 15:23:18.000000'),('f7f380cf-ef24-4e74-8ed5-5b04b1725c1d',5,9124357,1,NULL,0,1,4,NULL,NULL,'2025-02-12 11:17:03.000000'),('f8610292-8d09-412d-9489-18b709b7e089',0,264,2,NULL,27,0,4,NULL,NULL,'2025-02-05 17:02:43.000000'),('f8a46ec0-80be-4298-93a3-45f89d2da0dc',0,1180213558,1,NULL,27,1,4,NULL,NULL,'2025-02-07 16:22:16.000000'),('f8d4b998-7ff8-482e-bde9-1ce7a683e9bd',36,267,1,NULL,0,0,4,NULL,NULL,'2025-02-05 17:02:53.000000'),('f99345e9-c6e7-4166-b80e-ac098e19a1b3',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 15:34:50.000000'),('f9a0c37e-b55d-4e05-a7e9-10f05ce1b627',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 10:15:22.000000'),('f9f7c143-8371-4877-88cd-5b2b0b49067a',0,NULL,0,'Iniciar dispositivo',206,2,200,NULL,'TFP5235000437','2025-02-25 10:45:12.000000'),('f9f9aa2a-d0d3-4984-9fd3-f29fb80ce012',0,0,0,NULL,206,2,200,NULL,NULL,'2025-02-06 22:44:39.000000'),('fb02f608-6a0a-4542-8071-6fd55d71d089',0,279,1,NULL,27,0,4,NULL,NULL,'2025-02-07 16:14:30.000000'),('fb117003-72d0-4b5c-a5f6-d6805f1a9271',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:35:19.000000'),('fb1701e1-9929-4ab2-b1c2-763ced3bc1fa',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-10 10:05:53.000000'),('fb2b84a0-d8c6-4d6a-906f-f4a1b31f2cdb',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 16:28:03.000000'),('fb8825e1-564f-473f-afb3-84f1c191770a',0,0,0,NULL,105,2,200,NULL,NULL,'2025-02-07 01:20:25.000000'),('fc7b605d-962d-44a9-a81a-3f2be8fe0d18',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-07 12:21:34.000000'),('fd550699-bf3e-46d2-a4f7-50c3ec89cad3',0,NULL,0,NULL,105,2,200,NULL,NULL,'2025-02-12 11:34:13.000000'),('fdbc0e8f-6d13-48b1-93fc-7bd71873178a',0,NULL,0,NULL,214,2,200,NULL,NULL,'2025-02-12 11:42:27.000000'),('ff7f682b-ee8b-4b1f-8616-b8b845f3a6cc',0,10892253,1,NULL,27,1,4,NULL,NULL,'2025-02-07 15:41:06.000000');
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
INSERT INTO `externalentities` VALUES ('08dd5ff6-9163-45d4-8365-c6a31da9a05a','Teste','','','','','','','','','',NULL,NULL,'','',NULL,123654789,'2025-03-10 17:11:16','2025-03-10 17:11:16','08dd5ff6-9621-4eb5-89ef-10872956387d');
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
INSERT INTO `externalentitietypes` VALUES ('08dd5ff6-9621-4eb5-89ef-10872956387d',1,'Teste','2025-03-10 17:11:24');
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
INSERT INTO `kiosktransactions` VALUES ('004bd3c9-330a-4beb-8b79-3c777f3af18f','2023-12-10 03:33:48.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('0054e3fb-ca14-405d-a37f-6d75f3c154ea','2025-02-07 10:13:24.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',NULL,'2025-02-07 15:13:03.000000','2025-02-07 15:13:03.000000'),('0067dd5f-10f3-4945-a822-736643af81d4','2025-02-12 11:34:14.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-12 11:35:19.988304','2025-02-12 11:35:19.988305'),('00b6da53-2d2d-463c-8d44-ba2a5c508176','2025-02-12 11:39:20.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-12 11:42:27.470400','2025-02-12 11:42:27.470400'),('0104a257-79e2-4dab-9680-01fec3ecfc46','2025-02-07 15:06:55.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-07 15:06:57.817674','2025-02-07 15:06:57.817674'),('011a5a11-53ab-4fbb-b993-8e72b749d037','2025-02-05 17:01:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 17:01:29.456196','2025-02-05 17:01:29.456197'),('01603f5d-f38d-465e-9694-5c98f23e7006','2025-02-04 19:27:49.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('020ce165-1b66-4da0-a97f-c9499a45841d','2025-02-07 15:11:39.000000',9,10832577,'Não registrado',27,1,4,'TFP5235000422',0,'2025-02-07 15:13:02.849100','2025-02-07 15:13:02.849100'),('020d207a-dd09-4634-b605-eaf3bdc34aec','2025-03-05 09:52:58.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('0292da3e-931f-46ac-8b73-21a0a1c6b9d5','2025-03-05 10:17:26.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('02d9a904-4cf4-40f7-9b48-98e79cf87a8a','2025-02-07 15:39:36.000000',0,10892253,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-07 15:39:37.130000','2025-02-07 15:39:37.130000'),('0333ef12-c076-4931-8ba8-ce80fc8ef49b','2025-02-12 12:10:05.000000',0,9127895,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:10:07.523926','2025-02-12 12:10:07.523926'),('03ec8986-d0f6-4561-8e99-1de65e88dbe2','2025-02-20 16:25:22.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('041060d4-c5aa-442a-8029-4d46c2d4ecf9','2025-02-07 15:06:21.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 15:06:21.552061','2025-02-07 15:06:21.552062'),('04188d70-529f-4a8f-8723-1f2f061d8b70','2025-02-12 11:32:00.000000',0,9124357,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 11:32:02.794510','2025-02-12 11:32:02.794510'),('0439b2f0-5334-49f4-af74-ee715ec4511e','2025-02-12 12:09:54.000000',0,10920487,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:09:55.817753','2025-02-12 12:09:55.817753'),('04755f12-4414-4852-832c-fac852a315cd','2025-02-10 16:53:04.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-10 16:53:06.277138','2025-02-10 16:53:06.277138'),('04da7bc8-061f-468b-ada5-855b756f7e28','2025-02-20 12:38:57.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('05c3f2e3-030d-481c-b05f-c7b042d89780','2025-02-07 15:34:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-07 15:34:52.982417','2025-02-07 15:34:52.982417'),('067e1502-174a-4c22-bd41-985cae2ce937','2025-02-10 16:52:59.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 16:53:01.738281','2025-02-10 16:53:01.738281'),('06f30aaa-3412-4db0-bba6-a7fd511441b3','2025-03-05 11:00:07.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('075e9f99-f138-4456-bf56-464d198f5a01','2023-12-10 02:42:42.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('0779a4c2-4fb7-43a3-ba9d-e5be4c9ac64c','2025-02-12 12:08:10.000000',0,9124358,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:08:11.860055','2025-02-12 12:08:11.860055'),('082c20bf-c351-4c7b-bace-ff8e3750574f','2025-03-05 12:38:07.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('08709c8f-e115-4f06-92bb-66197cb8fc11','2025-02-28 11:11:34.000000',0,865051144,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('087530be-08a5-4b2f-bd40-459a510b8718','2025-02-12 11:26:56.000000',8,9124358,'Acesso não autorizado',23,1,4,'TFP5235000422',0,'2025-02-12 11:26:57.072182','2025-02-12 11:26:57.072182'),('088bc48d-1fc0-4cf1-8ba3-246452b3b552','2025-02-20 11:53:16.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('08986e21-5fa9-43f9-9d40-1f49351607a4','2025-02-12 11:26:33.000000',0,9124358,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 11:26:35.118412','2025-02-12 11:26:35.118413'),('0899fafd-912d-45ff-bdd5-49b7aef6c748','2025-02-07 16:12:59.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 16:13:00.045867','2025-02-07 16:13:00.045867'),('08b4f0cc-62f1-4c34-9348-67ca066f0ba0','2025-02-05 02:28:42.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('090102c7-ea3a-4500-a748-e20cc9d79fdb','2025-02-05 17:01:27.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-05 17:01:28.051591','2025-02-05 17:01:28.051591'),('094338bb-0926-4949-ad9d-8532291b9756','2025-02-12 12:12:10.000000',0,10894129,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:12:12.097293','2025-02-12 12:12:12.097293'),('09487380-260b-49ed-90fe-977c78506be9','2025-02-20 11:43:29.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('0a0ea4b1-4f4d-401e-8523-43a3157d39aa','2025-02-05 20:36:43.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 20:36:44.317591','2025-02-05 20:36:44.317591'),('0a49edf1-3ced-4caf-91fa-8591b017f246','2025-02-07 16:27:17.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-07 16:28:04.864388','2025-02-07 16:28:04.864388'),('0a6669d1-7427-4a1e-a1d3-d05c7f13370b','2025-03-10 16:58:14.000000',5,291,'Acesso não autorizado',23,1,4,'AJYS223460212',0,'2025-03-10 16:58:15.918527','2025-03-10 16:58:15.918527'),('0ae68249-ff0b-494a-a206-550156b67402','2025-02-07 14:56:28.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:56:28.969655','2025-02-07 14:56:28.969655'),('0c03c8a3-874b-43fd-af78-151c339249ec','2025-02-12 14:53:15.000000',128,10893588,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 15:21:06.642182','2025-02-12 15:21:06.642183'),('0c119bb6-2f1f-42e5-a4f0-46c0c05fb6e1','2025-02-07 15:34:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',NULL,'2025-02-07 15:34:54.000000','2025-02-07 15:34:54.000000'),('0c57c15c-e83f-4871-8d9e-686331622b8e','2025-02-12 12:12:08.000000',124,10894129,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:12:09.524070','2025-02-12 12:12:09.524070'),('0c6c357a-be44-4e5b-8944-1f3b40f0cd96','2025-02-07 16:14:26.000000',0,279,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-07 16:14:27.095777','2025-02-07 16:14:27.095777'),('0cbb0bc8-2c1c-4a44-8f88-f812830c4594','2025-02-20 12:11:26.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('0cc5dfea-fd60-4d98-aac1-8225f3c8d74a','2025-02-12 11:36:57.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-12 11:39:00.590120','2025-02-12 11:39:00.590120'),('0cd1ed7f-e8ce-4cec-8bb7-5dcf86f28718','2025-02-10 10:05:47.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-10 10:05:55.321435','2025-02-10 10:05:55.321435'),('0ce78b26-018a-43b9-b0ae-da230ca0b86b','2025-02-12 11:35:17.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-12 11:35:20.550278','2025-02-12 11:35:20.550279'),('0cfaef19-ec0f-462a-b0ec-765cebd2167f','2023-12-10 02:42:25.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('0df7f681-c0f5-4ffa-8b2e-6a3c4c1a4a1b','2025-02-12 12:13:35.000000',36,10920174,'Acesso não autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:13:36.298036','2025-02-12 12:13:36.298036'),('0e0ee2be-4ba2-4b99-9e86-8b175992bc03','2025-02-20 16:26:50.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('0e1116d5-4823-473f-be37-4301dfcf6e69','2025-02-12 14:51:49.000000',38,10960269,'Acesso não autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 14:51:50.191089','2025-02-12 14:51:50.191089'),('0e2d8c32-dd21-40c5-8856-ada24acfbc49','2025-02-12 12:10:04.000000',30,9127895,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:10:05.551265','2025-02-12 12:10:05.551266'),('0e4cf6c5-e795-498a-b6c9-f97457bfece8','2025-02-27 18:05:50.000000',0,-2065321208,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:05:51.656591','2025-02-27 18:05:51.656591'),('0e81f0f4-b1d8-4a30-ae9e-986647c0bc93','2025-02-10 10:08:18.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-10 10:08:19.379731','2025-02-10 10:08:19.379731'),('0e94f725-7efa-4b18-ad71-89df58f4581e','2025-02-20 11:43:18.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('0ee43be5-d170-49fa-8db9-1b3a2dca602e','2025-02-05 21:36:44.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-05 20:37:31.511379','2025-02-05 20:37:31.511379'),('0f7dc89a-7b23-4e77-b8fd-f6f39ab6574a','2025-02-12 11:27:18.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:27:21.071497','2025-02-12 11:27:21.071497'),('0fc835c0-0712-43af-96e2-4652524546a6','2025-02-05 21:36:42.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-05 20:37:29.561358','2025-02-05 20:37:29.561358'),('0fecfc25-5e2d-4e91-b4be-1d68257fd91b','2025-02-07 14:58:21.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:58:22.272547','2025-02-07 14:58:22.272547'),('0ffb4544-2191-404f-93b7-9003285582dd','2025-02-07 15:01:52.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 15:01:52.540331','2025-02-07 15:01:52.540331'),('10934439-63fb-4642-8395-b8f57e240936','2025-02-12 11:36:59.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-12 11:39:00.252963','2025-02-12 11:39:00.253008'),('10c889f0-7d6c-46ee-a93c-315051d5cb6d','2025-02-20 16:22:27.000000',0,NULL,'Formato Wiegand incorreto',42,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('1115017c-04af-4f5c-911f-ca6f158456d3','2025-02-07 16:15:01.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 16:15:02.921026','2025-02-07 16:15:02.921027'),('1171f1b7-51c0-4449-af45-0e49387a3f10','2025-02-12 10:59:18.000000',96,10891989,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 10:59:19.659428','2025-02-12 10:59:19.659428'),('11997cd5-1376-4022-9bc4-43ac8697c00c','2025-02-20 12:04:12.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('12699302-bdac-4c34-b184-033375c4b908','2025-02-10 16:54:04.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 16:54:06.374892','2025-02-10 16:54:06.374892'),('12793b1a-1036-4eb7-88d4-6d2e41f20ffe','2025-02-28 08:52:30.000000',0,NULL,'Desconhecido',20,2,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('12d3af59-6e17-4ed5-adfd-fcb1f3d292ab','2025-02-05 16:59:46.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',NULL,'2025-02-05 17:01:28.000000','2025-02-05 17:01:28.000000'),('13ac2196-6cb5-46df-bf2d-0c3e2c7a6f43','2025-02-07 14:59:02.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:59:03.642189','2025-02-07 14:59:03.642189'),('13d2564e-510e-4611-b657-4bfb38d44349','2025-02-28 11:11:43.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('1427e5c8-b26e-4c57-9ad7-3c7f71e18a01','2025-02-05 17:01:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',NULL,'2025-02-05 17:01:28.000000','2025-02-05 17:01:28.000000'),('1522e3a3-7e25-4656-b8f6-63a3f7ae1f7c','2025-02-28 09:06:37.000000',0,-126431224,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('15bc6b95-69db-4eaa-94b1-fa405ccc8639','2025-02-20 12:19:06.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('15e9c13e-893d-4b8a-9fc6-3212d841836a','2025-02-20 12:41:50.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('1656efc6-183d-459c-9a2c-2935601e648d','2025-02-11 11:30:41.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000319',2,'2025-02-11 11:30:43.694577','2025-02-11 11:30:43.694577'),('16db7c8b-2108-48a8-8ba4-b67f476176ca','2025-02-12 14:54:14.000000',101,10891726,'Acesso não autorizado',23,2,4,'TFP5235000318',0,'2025-02-12 14:54:15.652106','2025-02-12 14:54:15.652106'),('1816e880-e867-4fa3-b113-88933ad2b4bc','2025-02-07 15:09:46.000000',9,10832577,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:09:46.459948','2025-02-07 15:09:46.459948'),('191b31d5-49ca-40db-a88a-b2413c392a74','2025-02-07 15:16:11.000000',9,10832577,'Período de tempo inválido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:12.076440','2025-02-07 15:16:12.076440'),('19606d69-5319-4b34-8fce-3bcaf558a3f6','2025-02-07 15:34:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-07 15:34:54.539131','2025-02-07 15:34:54.539132'),('19b8e6d6-e03e-4ea3-94f7-18b1d20c8cbc','2025-03-05 10:32:32.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('19de0939-2b79-47a4-aa94-0dc60f87a10f','2025-03-05 09:52:28.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('1a609d07-8d75-4f2c-a035-dcd8562a1c6b','2025-02-27 18:06:29.000000',0,NULL,'Desconhecido',20,2,200,'TFP5235000318',1,'2025-02-27 18:06:31.435021','2025-02-27 18:06:31.435021'),('1acd2576-60e3-486c-b602-f9573a9cc17f','2025-02-05 17:02:39.000000',0,264,'Não registrado',27,1,4,'TFP5235000453',0,'2025-02-05 17:02:40.073418','2025-02-05 17:02:40.073418'),('1aec8fe1-3abe-4497-bcf5-84a10691d468','2025-02-20 12:18:54.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('1afa57b7-a490-42d7-bca9-e3e0ac259dd5','2025-03-05 11:28:39.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('1b030da1-4420-44bd-a6ca-a626780a53ce','2025-02-27 17:01:16.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000437',1,'2025-02-27 17:01:19.431293','2025-02-27 17:01:19.431294'),('1b2d362b-7880-4860-acd2-d58b32ca31a2','2025-02-06 15:47:52.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000422',2,'2025-02-06 14:48:21.475234','2025-02-06 14:48:21.475234'),('1bdc7de2-0281-4cb6-97a0-7691ba1b02c3','2025-02-20 12:09:41.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('1c5c4e66-d875-445b-a11a-c949db91b3b4','2025-02-12 12:08:53.000000',12,9124359,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:54.326930','2025-02-12 12:08:54.326930'),('1d0b78a9-7ac6-48c0-958c-bf516b64008e','2025-02-12 12:04:36.000000',0,9124357,'Não registado',27,2,4,'TFP5235000422',0,'2025-02-12 12:04:37.505924','2025-02-12 12:04:37.505925'),('1d873ce7-9387-4c48-8b04-db9852764f9d','2025-02-07 15:34:53.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-07 15:34:55.394639','2025-02-07 15:34:55.394640'),('1e2ac0da-8237-4fae-855a-8154fceea603','2025-02-10 11:37:56.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-10 11:37:58.570769','2025-02-10 11:37:58.570769'),('1e86ccae-75d1-48f8-a936-8af737788b46','2025-02-12 11:30:13.000000',0,9124357,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:30:13.955210','2025-02-12 11:30:13.955210'),('1ede719f-7369-4374-a08d-a9d3191121e2','2025-02-28 09:06:23.000000',0,-194884088,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('1edf7a46-4628-496f-9b5f-3e5b47d544cf','2025-02-10 09:24:55.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-10 09:24:56.324790','2025-02-10 09:24:56.324790'),('1ef5c2c5-225e-4c12-821d-730d7b752114','2025-02-05 17:02:45.000000',36,267,'Abertura efetuada',0,2,4,'TFP5235000453',0,'2025-02-05 17:02:46.812123','2025-02-05 17:02:46.812123'),('1f8a7e71-1351-4131-a3e1-36310fab0c04','2025-02-05 20:37:31.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-05 20:37:31.925913','2025-02-05 20:37:31.925914'),('1f9f8fad-9aad-43ef-b0b6-6b2ec7b2a62e','2025-02-12 10:54:20.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 10:54:22.460048','2025-02-12 10:54:22.460048'),('20456f6d-7810-4590-849e-d52ae1d750c1','2025-02-12 12:10:09.000000',0,9127895,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:10:10.294449','2025-02-12 12:10:10.294449'),('20c25384-2177-4d55-8b4a-cb2614e79d57','2025-02-05 22:51:27.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('21698f0c-6123-441e-8abc-8f5604f6b56f','2025-02-12 14:42:02.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 14:42:03.982939','2025-02-12 14:42:03.982939'),('216d7994-10ce-4e35-a343-ce25897bb94f','2025-02-10 17:48:56.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-10 17:49:07.240361','2025-02-10 17:49:07.240390'),('21b52c8e-81b0-4d94-9445-ea9991f64d9b','2025-02-12 11:42:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-12 11:42:30.473241','2025-02-12 11:42:30.473241'),('2263f443-45fd-4561-836f-7a3beaaa31cc','2025-02-10 16:51:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-10 16:51:09.213623','2025-02-10 16:51:09.213623'),('22b1f33e-39e9-441b-9843-556a40e022a4','2025-02-07 15:16:18.000000',9,10832577,'Período de tempo inválido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:19.890549','2025-02-07 15:16:19.890549'),('22f79743-da91-4207-b03c-27a47baaeddb','2025-02-12 12:10:27.000000',32,9127894,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:10:28.780176','2025-02-12 12:10:28.780177'),('231b0dc4-0ecb-4460-a66a-75045cfa4bf6','2025-02-12 12:16:29.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:16:30.681925','2025-02-12 12:16:30.681925'),('233297f6-4511-45c9-a7e1-c90b8e6d3367','2025-02-11 11:30:58.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000422',2,'2025-02-11 11:30:59.807162','2025-02-11 11:30:59.807162'),('23606527-b49c-45d9-96ea-0ad3ccdd2dae','2025-02-12 12:10:05.000000',0,9127895,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:10:06.369114','2025-02-12 12:10:06.369114'),('243161b0-a579-4b0b-9100-b67325006c30','2025-02-06 18:20:19.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-06 17:21:25.220232','2025-02-06 17:21:25.220232'),('248f6366-d1d8-40dc-85c0-4385ed1f1c1c','2025-02-12 12:08:32.000000',0,10832577,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:08:33.433726','2025-02-12 12:08:33.433726'),('252cd6f1-2e95-4cfa-a69d-5b76f2b05972','2025-02-20 16:26:46.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('2582e5f4-35b3-47cc-a954-419644e99e3a','2025-02-28 10:17:03.000000',0,1315173896,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('25a1fe61-4219-4d38-958e-1d18a4f559e5','2025-02-05 17:44:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 17:44:30.853410','2025-02-05 17:44:30.853410'),('25f8ab1d-ce8b-4575-9721-ab84ff832484','2025-02-20 17:17:43.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('26520715-0438-4b27-9d7c-63fb19877f0e','2025-02-12 11:00:01.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:00:02.721019','2025-02-12 11:00:02.721020'),('26d57be6-deba-453b-a82c-34eb1c25ca15','2025-02-11 09:36:59.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',2,'2025-02-11 09:36:59.936135','2025-02-11 09:36:59.936135'),('26f90f71-8a8b-4efd-8c2e-c75b8a1f90b5','2025-02-05 20:36:42.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-05 20:36:44.228361','2025-02-05 20:36:44.228361'),('2762f79c-6d10-46ac-ae41-8919f642583f','2025-02-12 10:56:19.000000',86,10958427,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:56:20.874735','2025-02-12 10:56:20.874735'),('2786ce0a-d9e4-4b9f-9797-30ed4d1bf628','2025-02-12 12:14:57.000000',220,10830074,'Acesso não autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:14:58.240221','2025-02-12 12:14:58.240221'),('27e45375-eb6f-428d-ae9f-bccb321bed78','2025-02-07 16:13:57.000000',0,9124358,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:13:58.033978','2025-02-07 16:13:58.033978'),('27ffb8dd-b66b-41e7-9fb8-3e4e29b474b5','2025-02-12 11:34:13.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-12 11:35:19.338992','2025-02-12 11:35:19.338992'),('28702b22-d968-453b-8872-6e97c0de2a75','2025-02-05 15:51:48.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('288ff981-f528-4263-afd8-e33bd123f968','2023-12-10 01:35:40.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('289afe11-6849-4b2e-9d2e-c07f50e852ef','2025-02-12 11:00:08.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:00:10.210733','2025-02-12 11:00:10.210733'),('28c9a144-1edb-47c2-8067-897746dd29eb','2025-02-20 12:54:27.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('2903d42c-ec78-4423-9b94-7ff6804d1a67','2025-02-12 12:11:46.000000',0,10891989,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:11:47.963794','2025-02-12 12:11:47.963795'),('29a7533a-5d3c-4267-8e04-c9d9860218b7','2025-02-12 12:12:10.000000',124,10894129,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:12:11.648876','2025-02-12 12:12:11.648876'),('2bea70e3-cb45-4642-b148-ee2f4dbca60d','2025-02-10 09:55:54.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 09:55:56.246071','2025-02-10 09:55:56.246071'),('2c0c6de7-e062-4e21-aabf-b8af95e39101','2025-02-05 16:59:46.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 17:01:29.137553','2025-02-05 17:01:29.137553'),('2c0e4b77-7b4d-4f00-84a7-ffa7edee2c97','2025-03-10 17:10:18.000000',8,293,'Acesso não autorizado',23,2,4,'AJYS223460212',0,'2025-03-10 17:10:19.933666','2025-03-10 17:10:19.933666'),('2c1a6f93-5e1f-4551-99b2-7fda2aec90ff','2025-02-05 16:29:18.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',1,'2025-02-05 16:29:18.777100','2025-02-05 16:29:18.777100'),('2c92b06d-dc09-4e3b-9dd9-9c273aa6315b','2025-03-05 10:18:44.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('2ca6f4c2-3837-4091-b681-8adc88602e39','2025-02-07 15:06:29.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 15:06:30.153308','2025-02-07 15:06:30.153308'),('2cfc43c9-2aa0-4133-a531-73f4e8307dba','2025-02-12 11:39:21.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-12 11:42:30.066011','2025-02-12 11:42:30.066011'),('2d124d41-4638-43d5-b359-d8e940a8bc34','2025-02-10 16:47:03.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:47:04.255007','2025-02-10 16:47:04.255007'),('2d30a24f-79b3-4387-9d5d-ff7eec8e74a7','2025-02-07 15:16:07.000000',9,10832577,'Período de tempo inválido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:08.271986','2025-02-07 15:16:08.271986'),('2d487988-ee26-416f-83d4-070e11cca3f1','2025-02-20 17:41:59.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('2dc7fca9-eff0-4c4a-9cc7-32d44e206577','2025-02-20 11:59:41.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('2eeeefd4-990d-4b6b-9fa1-d148239f1cac','2025-02-05 23:01:33.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000453',2,'2025-02-05 15:01:56.086911','2025-02-05 15:01:56.086915'),('2efda55e-9e13-4242-9463-c5f54a0dd2dd','2025-02-10 09:22:35.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 09:22:36.998369','2025-02-10 09:22:36.998369'),('2f80139c-201e-4cad-a208-4fb34fafa152','2025-02-12 12:14:59.000000',220,10830074,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:15:00.670708','2025-02-12 12:15:00.670708'),('2f84727c-de7e-4610-85f4-cd3a2a5da8aa','2025-02-20 11:51:29.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('3083cdd1-9182-4ad4-b895-1dd1cb1e6002','2025-02-05 22:55:33.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000453',2,'2025-02-05 14:55:55.232022','2025-02-05 14:55:55.232063'),('30857b90-0d9e-4789-9e1b-4153300afa3b','2025-02-27 17:01:16.000000',0,349240840,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-27 17:01:19.109860','2025-02-27 17:01:19.109860'),('30c9e49a-ab27-4c0f-9901-f83714486ed2','2025-02-20 15:25:09.000000',167,10800146,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('30f45291-280b-49ef-8dc2-b8a67847d92e','2023-12-10 01:35:49.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('3116bac9-ebc3-4447-a500-e9153eb559ae','2025-02-07 15:46:38.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 15:46:39.181999','2025-02-07 15:46:39.181999'),('313d4195-408e-470e-867c-8b85e2ec56d6','2025-02-07 14:57:37.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:57:38.780653','2025-02-07 14:57:38.780653'),('31a1c823-8ab4-4911-89c0-4af47f37366d','2023-12-10 02:42:41.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('31fc1a25-d197-4e35-8719-ff742f1b29f5','2025-02-28 08:50:56.000000',0,205866248,'Não registado',27,2,4,'TFP5235000318',0,'2025-02-28 08:50:58.023863','2025-02-28 08:50:58.023864'),('32986eed-23c3-446c-8e44-5748725c1327','2025-02-12 12:10:11.000000',0,9127895,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:10:12.286451','2025-02-12 12:10:12.286451'),('329fefae-7aa9-469c-9753-61f58e159bd8','2025-02-12 12:14:14.000000',36,10920174,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:14:16.596581','2025-02-12 12:14:16.596582'),('333be47b-e277-412f-99b3-4bcc9b77fa80','2025-02-20 16:22:55.000000',0,NULL,'Formato Wiegand incorreto',42,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('334bff4d-9481-4277-bb68-e7dc25a53634','2025-02-04 19:26:34.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('33541f80-fa6f-4756-beb3-a60ce17880b6','2025-02-10 17:49:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-10 17:49:08.198067','2025-02-10 17:49:08.198067'),('335dc81f-4200-4f60-8f52-ca1d627a566e','2025-03-05 11:27:01.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('33d35e87-20d7-4139-ac33-150a990676b0','2025-02-07 12:21:34.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-07 12:21:36.748275','2025-02-07 12:21:36.748275'),('3415961e-78c7-40d8-9c7f-a7d8b516eaee','2025-02-06 17:28:26.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-06 17:29:13.576252','2025-02-06 17:29:13.576253'),('3415bc6a-68c7-4c01-90dc-2723e9a16fd0','2025-03-05 09:28:55.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000437',2,'2025-03-05 09:28:56.667783','2025-03-05 09:28:56.667784'),('343b7d8e-e784-4d0e-a5cc-c286b756a9bf','2025-02-12 12:08:30.000000',9,10832577,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:31.645664','2025-02-12 12:08:31.645664'),('359ff55b-0b82-4c1d-a5b9-b3e60aa8f4d3','2025-02-10 08:51:29.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000437',2,'2025-02-10 08:51:42.084190','2025-02-10 08:51:42.084190'),('35ebc630-d0ee-4c1a-9284-d84f8d58e8c3','2025-02-12 14:53:28.000000',128,10893588,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:53:29.316419','2025-02-12 14:53:29.316420'),('36445954-a422-4bc5-ac03-53fd49d3ab40','2025-02-10 10:05:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-10 10:05:55.709573','2025-02-10 10:05:55.709573'),('3693158c-6bc4-4ec6-97b5-516e268cc60a','2025-03-05 10:18:10.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('36f2f633-c1cc-4e61-b2fb-6f8d420b9e36','2025-02-12 10:59:57.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 10:59:59.252909','2025-02-12 10:59:59.252909'),('3719dc83-baa1-47ed-93cf-0572c338286c','2025-02-07 16:14:30.000000',0,279,'Não registado',27,1,4,'TFP5235000318',0,'2025-02-07 16:14:30.674080','2025-02-07 16:14:30.674081'),('372ce40d-9cf1-4d00-9f4d-5047a1bec7c4','2025-02-12 11:38:57.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',NULL,'2025-02-12 11:39:00.000000','2025-02-12 11:39:00.000000'),('37774379-0d1c-489e-8af2-dbf22084f92d','2025-03-05 12:39:14.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('3794a51e-acbf-487f-bf64-37a02400161f','2025-02-06 17:29:11.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-06 17:29:13.091039','2025-02-06 17:29:13.091039'),('37fc02ea-b9c4-4a67-8185-0a2766751f1e','2025-02-12 10:54:29.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:54:31.477962','2025-02-12 10:54:31.477962'),('384407fc-cb49-42d5-a302-bec7e1dd64b2','2025-03-06 11:00:16.000000',0,1325262344,'Não registado',27,1,4,'TFP5235000453',0,'2025-03-06 11:00:14.501135','2025-03-06 11:00:14.501135'),('386323e9-0d4d-4c32-814f-0785482c0ff3','2025-02-20 12:56:00.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('3885cd93-cd10-4b93-915b-eb310482a979','2025-02-05 17:44:17.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-05 17:44:31.093903','2025-02-05 17:44:31.093904'),('38929440-6ec4-4477-a953-cd45ef0b2ec4','2025-02-05 22:51:55.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('38f0bdd6-d091-4915-b1fb-c05736acf9ad','2025-02-12 12:09:57.000000',27,10920487,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:09:58.293016','2025-02-12 12:09:58.293016'),('39145592-b7a7-461c-a0ca-535663307dc5','2025-02-06 17:21:04.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-06 17:21:23.642327','2025-02-06 17:21:23.642357'),('39778c38-6d84-47db-ac64-7eda24123659','2025-02-28 08:50:57.000000',0,NULL,'Desconhecido',20,2,200,'TFP5235000318',0,'2025-02-28 08:50:58.610036','2025-02-28 08:50:58.610036'),('39924eab-ec3c-46d8-8d75-dab2fd9b3a1b','2025-02-07 10:20:39.000000',0,6586851,'Não registrado',27,1,4,'TFP5235000318',0,'2025-02-07 10:20:39.561437','2025-02-07 10:20:39.561437'),('3a1dc1f0-ef58-4cf3-8c7e-33abd633867a','2023-12-10 01:36:15.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('3a9d7b3d-d7dd-49c3-983c-722cc08cea80','2023-12-10 01:36:15.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('3b0213f9-56d7-4372-8c9e-18264e387e74','2025-03-05 12:37:22.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('3b281a4c-82ea-44ed-b003-cf1072214404','2025-02-20 16:22:20.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('3bdc1bf4-e552-4ee1-a40a-19406e11a78a','2025-03-05 13:02:40.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',1,'2025-03-05 13:02:41.033130','2025-03-05 13:02:41.033131'),('3bf7220d-d912-4180-ad6b-cccd6ad238e2','2025-02-12 12:12:07.000000',0,10894129,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:12:10.002116','2025-02-12 12:12:10.002117'),('3c1fca4d-f086-4482-acc4-23d9e65f6e56','2025-02-07 12:20:45.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-07 12:21:36.375143','2025-02-07 12:21:36.375144'),('3c60d010-78c2-4aa8-9cb4-2a780a863418','2025-02-07 15:32:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-07 15:34:54.221656','2025-02-07 15:34:54.221657'),('3ccddb35-37cf-4688-87a4-ac3f01fcc9b8','2025-02-05 02:29:10.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('3cdb8eb8-d424-4252-a692-3b741eb869dd','2025-02-12 11:39:20.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',NULL,'2025-02-12 11:42:29.000000','2025-02-12 11:42:29.000000'),('3d322cac-3c9a-47c8-9444-41ed0b694b2a','2025-02-10 08:51:29.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000318',2,'2025-02-10 08:51:42.087633','2025-02-10 08:51:42.087633'),('3d52fd8d-43c6-47ea-8b22-0a932ad26023','2025-02-12 11:38:59.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-12 11:39:00.769265','2025-02-12 11:39:00.769266'),('3d604e8d-c561-484b-a2ea-1360bdb75662','2025-02-10 09:58:15.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 09:58:17.832380','2025-02-10 09:58:17.832380'),('3db20d62-0c38-4206-815c-81328a7c734f','2025-03-10 16:47:41.000000',5,291,'Abertura efetuada',0,2,4,'AJYS223460212',0,'2025-03-10 16:47:42.640647','2025-03-10 16:47:42.640890'),('3ea2abab-7716-4813-964b-6bcc83a7fc79','2025-02-06 23:34:58.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('3ec90984-6158-4498-b6da-cb93d6a4a563','2025-02-06 17:21:22.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-06 17:21:24.077220','2025-02-06 17:21:24.077220'),('3f2111c4-9119-40cd-a7d9-b529bfc9ad5f','2025-02-07 15:29:24.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-07 15:29:24.852368','2025-02-07 15:29:24.852369'),('3fd218a3-1cba-4ac1-b414-cd4bcbb60a13','2025-02-20 17:41:02.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('40053d09-f356-4d34-aceb-bca273d2d444','2023-12-10 03:33:45.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('40d640ac-e3ed-4eaa-a734-645746653816','2025-02-20 11:51:39.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('410c711a-4473-4ec6-96c0-b09c6711113a','2025-02-18 12:46:01.000000',159,10812199,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('4128184d-fbe2-4e19-ac86-acfe6f1c4b71','2025-02-12 11:27:30.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:27:31.300420','2025-02-12 11:27:31.300420'),('413bbcab-9134-4859-89a6-5ab0be9d8bdb','2025-02-12 12:09:20.000000',0,9124361,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:09:23.356019','2025-02-12 12:09:23.356020'),('413f7d9b-2bfa-41e4-8277-649d5e8c1f64','2025-02-12 11:36:58.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-12 11:39:02.735942','2025-02-12 11:39:02.735942'),('41436a65-77bf-4287-9821-b02e43c4539d','2025-02-06 17:29:11.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-06 17:29:13.092663','2025-02-06 17:29:13.092663'),('414c24a5-8cc9-49cd-a3c7-0c2491270333','2025-02-12 11:34:12.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-12 11:35:18.911139','2025-02-12 11:35:18.911182'),('414ff6e6-12a8-4319-a415-eadee2474472','2025-02-05 23:16:37.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 15:16:48.463066','2025-02-05 15:16:48.463066'),('4150923e-be81-491e-ae49-102c5356954d','2025-02-12 12:14:17.000000',36,10920174,'Acesso não autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:14:18.595169','2025-02-12 12:14:18.595169'),('41b5d023-471b-4a16-ae03-cffd23ef2926','2025-02-12 14:41:10.000000',164,10813084,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:41:11.404087','2025-02-12 14:41:11.404088'),('41df4904-f0ad-4023-897f-d82563ca1793','2025-03-05 09:51:54.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('42b67b4d-840b-4829-a74e-5f296a45ac22','2025-02-28 09:06:23.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('43014f07-5416-478b-89c4-8b90d2e1de45','2025-02-12 10:57:07.000000',86,10958427,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 10:57:08.918336','2025-02-12 10:57:08.918336'),('4306253f-83a0-4a8f-9614-7f6551eb1c8d','2025-02-12 12:07:46.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:07:47.732317','2025-02-12 12:07:47.732317'),('433b12ea-fb79-4f8c-881a-1383f574733c','2025-02-12 12:17:19.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:17:20.619464','2025-02-12 12:17:20.619464'),('4354601b-f0ef-499c-b53b-5b57b81c7daf','2025-02-20 12:05:23.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('43e2e7e8-029d-4623-9bed-2a3b5018f694','2025-02-12 12:10:24.000000',0,9127894,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:10:25.675305','2025-02-12 12:10:25.675305'),('43ebfdfd-c1e5-4721-982c-138534cc1825','2025-02-18 13:17:18.000000',159,10812199,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('44b30965-14d0-4ef8-92dc-7799f02d7775','2025-02-10 16:29:00.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 16:29:02.204288','2025-02-10 16:29:02.204288'),('44bbd6c9-20ba-4ceb-89ec-44ce48d50615','2025-02-12 10:53:02.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:53:03.072232','2025-02-12 10:53:03.072232'),('44c3a85e-56f5-4f89-b154-5682cd683d30','2025-02-12 10:55:11.000000',55,10804937,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 10:55:12.654776','2025-02-12 10:55:12.654777'),('458e5059-8070-4ec9-bd03-7be576447164','2025-02-05 16:49:19.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 16:49:20.395165','2025-02-05 16:49:20.395166'),('465320c5-9ed3-40fa-a6c0-3c8c5598e70c','2025-02-05 20:36:46.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-05 20:36:46.646682','2025-02-05 20:36:46.646683'),('46de4fcc-19d9-4cf8-97d6-50d3d6b384c4','2025-02-10 16:54:08.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-10 16:54:09.805361','2025-02-10 16:54:09.805361'),('471d7c0e-3dc4-4237-a8ae-fc92f7a7df85','2025-02-05 20:37:30.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 20:37:32.717383','2025-02-05 20:37:32.717384'),('4733102f-d815-4fdb-b38a-63ffd1514098','2025-02-27 18:06:28.000000',0,-2139848952,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:06:30.234018','2025-02-27 18:06:30.234018'),('474efee4-8f78-44a8-865e-bd8441107435','2025-02-07 15:06:58.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-07 15:06:59.884308','2025-02-07 15:06:59.884308'),('47b288d9-ead2-45f1-98dc-914ac539f4fd','2025-02-18 13:17:02.000000',159,10812199,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('47b69f38-c05f-4857-81f5-36a08e54d32e','2025-02-12 12:09:47.000000',0,10920487,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:09:50.109239','2025-02-12 12:09:50.109240'),('47e44c01-e1f6-4c98-aa77-2f0d22f9f286','2025-02-18 12:44:28.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('483a6441-f208-4920-9591-7b76eaf0e6ed','2025-02-20 16:22:45.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('485f1a51-51e4-4dab-8d52-e882333c6c8f','2025-02-12 11:34:13.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-12 11:35:20.242356','2025-02-12 11:35:20.242356'),('489a0ae6-c321-47ae-8612-d128ef7bd6f8','2025-02-10 17:49:04.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-10 17:49:07.840236','2025-02-10 17:49:07.840236'),('48b0223a-1341-484b-bfda-719081998d01','2025-02-10 08:51:28.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',2,'2025-02-10 08:51:42.086415','2025-02-10 08:51:42.086415'),('48c5dabb-f864-4753-9543-6d881ef79df3','2025-02-07 16:27:17.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-07 16:28:04.671238','2025-02-07 16:28:04.671239'),('48e973ff-3124-433f-9287-55f2d7175e81','2025-02-10 11:36:30.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-10 11:37:58.749928','2025-02-10 11:37:58.749928'),('491820f1-a713-44e7-a5a0-be1205e53ebc','2025-02-07 10:13:07.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-07 10:13:07.712615','2025-02-07 10:13:07.712615'),('4934a3cf-2d84-45a9-8480-e3d878896f27','2023-12-10 01:33:45.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('49476d32-4b64-4b6a-afd5-d4b9476e8a31','2025-02-12 12:10:21.000000',0,9127894,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:10:23.562557','2025-02-12 12:10:23.562557'),('494bfeb0-4f09-4ba2-9e19-075a336074f3','2025-02-10 11:36:30.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-10 11:37:58.181422','2025-02-10 11:37:58.181422'),('4b9932aa-f386-4919-b818-07f8fd4b92ba','2025-02-06 18:21:07.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-06 17:21:26.391060','2025-02-06 17:21:26.391060'),('4c2fd88e-8d77-4630-965c-dd32352d573e','2025-02-28 09:06:27.000000',0,2007293448,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('4c8c9104-7c88-49c6-9fd3-229cab7de634','2023-12-10 03:19:03.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('4cb16e57-8ec6-4043-b0d6-8481652c7cbf','2025-02-06 17:23:14.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-06 17:23:15.084609','2025-02-06 17:23:15.084609'),('4d20259a-14a7-416e-b9cb-84057097f664','2025-02-07 15:17:25.000000',9,10832577,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:17:26.735662','2025-02-07 15:17:26.735662'),('4d391b10-c409-4ae0-8439-ee94bc6d12e7','2025-03-05 08:59:29.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000318',2,'2025-03-05 08:59:30.818371','2025-03-05 08:59:30.818371'),('4d917a66-fe54-4306-8cf1-e699d3bc52b5','2025-02-12 12:26:34.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-12 12:26:35.244506','2025-02-12 12:26:35.244506'),('4d9abca7-6952-4a32-965e-1f5ea247bb55','2025-02-05 17:06:51.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000319',2,'2025-02-05 16:08:34.434447','2025-02-05 16:08:34.434447'),('4db98340-1df4-4a6b-b3f8-9a68b29dd384','2025-02-10 10:02:59.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 10:03:01.551396','2025-02-10 10:03:01.551396'),('4dbb7b31-c12f-448b-ba62-f107d0860abf','2025-02-27 18:25:14.000000',0,NULL,'Desconhecido',20,2,200,'TFP5235000318',1,'2025-02-27 18:25:15.545344','2025-02-27 18:25:15.545344'),('4ecddadd-deec-43a5-9abd-92242076d0d9','2025-03-05 13:15:39.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',1,'2025-03-05 13:15:37.994598','2025-03-05 13:15:37.994598'),('4f0cf98b-a44b-4bd6-a276-57b28e7b5e8a','2025-03-05 15:35:06.000000',0,-1073200888,'Não registado',27,1,4,'TFP5235000437',1,'2025-03-05 15:35:07.357206','2025-03-05 15:35:07.357206'),('4f536ab6-19b8-4fb9-9b17-1009db4f909d','2025-02-12 12:25:54.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:25:55.314998','2025-02-12 12:25:55.314998'),('4f682a2c-980e-4e36-ad1a-9cfecb684b5d','2025-02-07 10:20:00.000000',165,10813380,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:20:00.458474','2025-02-07 10:20:00.458474'),('4fc0dc99-7c7e-4567-b061-cdcb8e2923b1','2023-12-10 03:19:34.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('507342f0-8c23-485e-bfef-5bc0aef8c047','2025-02-10 16:53:06.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-10 16:53:08.467641','2025-02-10 16:53:08.467641'),('50baa7b6-63ca-4f54-bba2-aec5bff6646d','2025-02-27 18:59:03.000000',0,2099831048,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-27 18:59:05.437340','2025-02-27 18:59:05.437341'),('50c81b4c-96cd-4ce4-9187-31ea6ff0fa3d','2025-02-20 16:22:31.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('50c9247f-b825-4f66-9b5d-292f7f4a6958','2025-02-07 15:16:21.000000',9,10832577,'Período de tempo inválido',22,2,4,'TFP5235000422',0,'2025-02-07 15:16:22.274341','2025-02-07 15:16:22.274341'),('513e26f1-62e0-454b-add5-b4263cc18654','2025-02-18 12:44:26.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('5153ee9c-f696-42de-878f-f1dfcb7c965a','2025-02-12 10:59:09.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:59:11.243793','2025-02-12 10:59:11.243793'),('51aadedc-79f4-43d6-883d-69127c5252b5','2025-03-06 10:49:29.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-03-06 10:49:28.761355','2025-03-06 10:49:28.761355'),('529b5ad8-b0b4-41f3-bfdf-1f79c8ff174d','2025-02-10 10:06:48.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 10:06:50.079874','2025-02-10 10:06:50.079875'),('52f5afe2-d635-4c5b-a165-8c1ed12cf182','2025-02-12 12:14:58.000000',220,10830074,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:14:59.230450','2025-02-12 12:14:59.230450'),('52f72727-34b5-4aa8-b5b5-2decad1d5bdb','2023-12-10 01:35:38.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('53a17f38-adb6-4d31-bc37-81e7f00a8935','2025-02-06 22:44:39.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000437',2,'2025-02-06 14:45:29.537191','2025-02-06 14:45:29.537192'),('53d1cbac-c926-4807-a251-60892dca9d3a','2025-02-07 14:59:44.000000',27,10920487,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:59:45.364297','2025-02-07 14:59:45.364298'),('547fe404-4a3b-4ce5-9e9e-6e39b677abab','2025-02-27 18:58:53.000000',0,-1068524536,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-27 18:58:56.254158','2025-02-27 18:58:56.254158'),('54cb29cc-c9a9-4910-bf48-86252e84b020','2025-02-12 12:07:50.000000',0,9124357,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:07:51.167715','2025-02-12 12:07:51.167715'),('55312bcd-29b7-40bb-a77e-952dd459774a','2025-02-12 12:15:05.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:15:08.027973','2025-02-12 12:15:08.027973'),('5546c73d-a447-426f-95ab-7825f433f1b6','2025-02-07 15:06:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-07 15:06:57.368872','2025-02-07 15:06:57.368995'),('5601a9d3-741f-4dce-9e78-3f4b9210b87d','2025-02-20 11:52:56.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('5614e24d-e5e9-4c46-9071-bbe92461fc95','2025-02-07 10:17:35.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:17:35.942970','2025-02-07 10:17:35.942970'),('561a765f-7b4a-4058-8773-8487b2c2f8f5','2025-02-10 09:23:09.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 09:23:09.727272','2025-02-10 09:23:09.727272'),('5718da4c-4c96-4f1b-b4be-ecb68072b5e8','2023-12-10 03:19:35.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('576abf43-a0c9-4d1d-bff2-ecffc834e8bb','2025-02-07 15:31:31.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-07 15:31:31.973756','2025-02-07 15:31:31.973757'),('579998c7-2484-4306-b120-435f0b241266','2023-12-10 03:33:57.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('57f4d044-0fa9-48d3-8ce6-b2bda672594c','2025-02-12 12:12:42.000000',0,10807101,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:12:43.796994','2025-02-12 12:12:43.796994'),('5832d261-5d18-49d2-b1d3-cc2ae0879936','2025-02-12 12:25:05.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:25:06.937708','2025-02-12 12:25:06.937708'),('584bf08c-5d1a-4dfe-8b64-8617582a4514','2025-02-28 09:06:42.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('58863e96-631e-44cc-8d3d-8e05fe9edf00','2025-02-10 09:58:19.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-10 09:58:20.832350','2025-02-10 09:58:20.832350'),('58a5e040-22d5-4fcb-8334-2421fff0f8a8','2025-02-05 17:15:10.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000318',2,'2025-02-05 16:16:09.019566','2025-02-05 16:16:09.019567'),('58a6f0c2-5c57-4905-86ba-b59f3cfe264c','2025-02-07 15:32:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-07 15:34:52.876769','2025-02-07 15:34:52.876769'),('58f16c77-82c0-4a40-9bba-2f2262cfa415','2025-02-05 18:43:42.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-05 17:44:30.853643','2025-02-05 17:44:30.853644'),('58f17247-487f-42d1-96a0-a3b577ca5b8b','2025-03-05 10:17:09.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('58f4ca0e-1e38-42b1-9e71-c7340862f636','2025-02-04 19:28:09.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('59152988-0059-4fc8-83be-c243c8d40ad3','2025-02-05 16:25:34.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-05 16:25:35.082430','2025-02-05 16:25:35.082430'),('59448927-96dd-4099-b4db-a4266f299c10','2023-12-10 03:33:57.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('594d93c9-28df-4d4b-8a87-199004c19544','2025-02-10 16:48:58.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:48:59.373564','2025-02-10 16:48:59.373564'),('5993cb1e-1d44-48d3-9fd1-eba8bed253fa','2025-02-05 17:01:34.000000',36,267,'Acesso não autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 17:01:35.390344','2025-02-05 17:01:35.390344'),('59f7bc81-71ee-40e5-a500-cad711c2032d','2025-02-07 12:20:45.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-07 12:21:36.285153','2025-02-07 12:21:36.285184'),('5a184c18-d819-4e20-a16f-9de2f706f929','2025-02-10 16:48:44.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 16:48:47.207918','2025-02-10 16:48:47.207918'),('5a4b76c1-3488-43b0-a50f-fa25c8d8b5c6','2025-02-18 12:46:36.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('5a563bcd-4c5b-4e24-b7fe-ba5c23dc243f','2025-02-07 15:14:08.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000422',0,'2025-02-07 15:14:08.832248','2025-02-07 15:14:08.832248'),('5a8d8596-7ef6-416f-b2b4-baead0ffa7ed','2025-02-07 15:32:50.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',NULL,'2025-02-07 15:34:54.000000','2025-02-07 15:34:54.000000'),('5ab5ffc0-9ad4-4f63-bfc2-9b3e5378a52b','2025-02-10 11:37:57.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-10 11:38:00.061914','2025-02-10 11:38:00.061915'),('5ae45402-e790-4c8a-b181-8de844c2e447','2025-02-07 16:14:43.000000',0,9124358,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:14:44.760932','2025-02-07 16:14:44.760932'),('5b31ac46-8fbe-4585-8133-348587ac76d5','2025-02-07 10:21:36.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:21:37.176216','2025-02-07 10:21:37.176217'),('5b651572-dcf6-4853-a641-e8661c218ad4','2025-02-12 11:17:03.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:17:05.666825','2025-02-12 11:17:05.666825'),('5b6a7c15-bc7c-439a-b7b1-953785191e4b','2025-02-07 15:46:57.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:46:57.973261','2025-02-07 15:46:57.973262'),('5baad7f2-3805-44fe-9706-9ae4df0ca0b7','2025-02-12 12:14:54.000000',220,10830074,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-12 12:14:55.351606','2025-02-12 12:14:55.351606'),('5bea3fd6-cbc8-42e8-8f3a-5e09953de10a','2025-02-07 16:13:03.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 16:13:04.959623','2025-02-07 16:13:04.959623'),('5c21671c-9279-4402-b06b-03f81368d387','2025-02-18 12:44:28.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('5c5403d4-a35a-4edf-9630-59e180d94569','2025-03-10 17:10:25.000000',0,263,'Não registado',27,2,4,'AJYS223460212',0,'2025-03-10 17:10:27.805982','2025-03-10 17:10:27.805983'),('5d02881a-60ee-4d45-b8e3-83acc469e84e','2025-02-27 18:05:40.000000',0,1162675720,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:05:41.625029','2025-02-27 18:05:41.625030'),('5d2d7b44-0833-481f-978d-8514cc5b7067','2025-02-20 12:19:41.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('5d5fe4c0-939b-45f9-a635-454150580034','2025-02-12 14:54:11.000000',101,10891726,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 15:21:07.180142','2025-02-12 15:21:07.180142'),('5ed2d304-5ad7-4d5e-9f68-b4c42687318d','2025-03-05 12:11:05.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000318',2,'2025-03-05 12:11:06.567580','2025-03-05 12:11:06.567580'),('5fa40051-7b2e-4b60-b351-d11b8d62f26a','2025-02-20 15:24:12.000000',167,10800146,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('5fbc146c-f629-4357-8c78-cdcb21a743c9','2025-02-07 16:28:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-07 16:28:03.675493','2025-02-07 16:28:03.675493'),('5fd63b39-2b70-4d0d-ab63-d7b846baf3b1','2025-02-12 11:39:21.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',NULL,'2025-02-12 11:42:30.000000','2025-02-12 11:42:30.000000'),('5ff9fa3b-9119-4fd5-82ef-a428f3003610','2025-02-05 16:20:30.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-05 16:20:30.669445','2025-02-05 16:20:30.669445'),('60c1c96f-9d1e-46a4-8398-96f2d0570052','2025-02-12 11:26:39.000000',0,9124358,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:26:40.560159','2025-02-12 11:26:40.560159'),('611064e0-5108-4da7-ad4e-fb15541f27f3','2025-02-12 11:22:26.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:22:27.716277','2025-02-12 11:22:27.716277'),('62201927-8b97-47de-b60e-3e8dbf1b2c03','2025-02-05 17:07:28.000000',0,264,'Não registrado',27,1,4,'TFP5235000453',0,'2025-02-05 17:07:28.700592','2025-02-05 17:07:28.700592'),('626ff303-361d-4741-83c7-326503ac81e0','2025-02-12 12:15:09.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:15:10.495597','2025-02-12 12:15:10.495597'),('62b663e9-f9b9-4b6a-8b4e-c39086062fcb','2025-02-12 11:36:57.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',NULL,'2025-02-12 11:39:00.000000','2025-02-12 11:39:00.000000'),('62d45360-b300-4160-b822-aa84212f855e','2025-02-07 15:06:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-07 15:07:00.119732','2025-02-07 15:07:00.119732'),('632b2ec0-6c71-4018-bc80-fc638dee25d8','2025-02-12 11:39:21.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-12 11:42:30.161106','2025-02-12 11:42:30.161106'),('633840bb-1304-4458-a915-2109c92a33a3','2025-02-12 12:09:53.000000',27,10920487,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:09:54.839133','2025-02-12 12:09:54.839133'),('633dade0-1436-4192-a943-f3d7b684575c','2025-02-07 10:15:22.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-07 10:15:24.744465','2025-02-07 10:15:24.744465'),('63519a69-0907-4f21-a6c5-36032749b80d','2023-12-10 03:32:34.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('639e732d-591d-425a-ad69-19e2acb16691','2025-02-20 11:59:00.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('63d39a14-577c-493e-a7e2-eb31ddc753fc','2025-02-05 17:02:53.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 17:02:54.372276','2025-02-05 17:02:54.372276'),('63f17251-4766-472a-b518-d94c43f445be','2025-02-12 12:08:45.000000',12,9124359,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:46.681074','2025-02-12 12:08:46.681075'),('643b7980-230b-46df-bb5b-9690b0ed3bff','2025-02-20 15:25:18.000000',167,10800146,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('6454b954-a8fc-42ce-b74f-d91f6e290159','2025-02-12 10:53:11.000000',0,10805211,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 10:53:11.789299','2025-02-12 10:53:11.789299'),('646a3f10-bd31-49b6-ad49-3feffcb42758','2025-02-20 15:00:43.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('64904afd-b023-41c8-a0b6-7665535e1e3d','2025-02-12 12:13:42.000000',36,10920174,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:13:44.107095','2025-02-12 12:13:44.107096'),('64eb7100-899b-480c-9458-76a38b3c117b','2025-02-07 15:44:45.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-07 15:44:46.407529','2025-02-07 15:44:46.407530'),('64f1a79c-8d83-444c-ab42-b7ca0b0f0b24','2025-02-12 12:11:47.000000',96,10891989,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:11:48.503667','2025-02-12 12:11:48.503668'),('650c71aa-f499-4a64-bdde-74158037c58d','2000-10-01 03:25:41.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('656082a5-2bb0-4c13-a0ba-51d909452ba9','2025-03-05 09:00:05.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000318',2,'2025-03-05 09:00:06.516211','2025-03-05 09:00:06.516211'),('66553cf3-11f6-4100-bf99-01a4eabeaadc','2025-02-05 20:36:43.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 20:36:44.629902','2025-02-05 20:36:44.629903'),('6683867a-2118-4719-8536-85061573bdf7','2023-12-10 03:33:47.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('680a7b88-c880-4a59-8e69-d73a7a785a70','2025-02-10 09:22:49.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 09:22:50.649096','2025-02-10 09:22:50.649096'),('68a82d83-d322-4d1e-8920-8681026021cc','2025-02-20 12:53:12.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('68b4083f-f65c-4423-afa6-2f73a836430f','2023-12-10 03:34:09.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('68eca08a-4f4e-4797-9be6-bdaa68d6349c','2025-02-12 12:25:10.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:25:11.724511','2025-02-12 12:25:11.724511'),('6980736f-4878-4764-8280-57ff8c389b77','2025-02-20 12:55:27.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('698beba3-56a9-4274-882d-73a915ca0c66','2025-02-12 12:08:17.000000',0,9124358,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:08:18.751722','2025-02-12 12:08:18.751723'),('69c14fd4-8b8f-4b60-9089-dc94e1317dad','2023-12-10 03:19:33.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('69f5ce05-f6dc-4a68-8fce-acb6e9255d07','2000-01-01 00:11:36.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('6a884f3f-fe91-438b-870b-737f567bd35d','2025-02-10 09:58:33.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 09:58:35.767683','2025-02-10 09:58:35.767683'),('6a8b9bdf-9780-4f0e-bbb7-2a02a3524e83','2025-02-05 21:36:45.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-05 20:37:32.723952','2025-02-05 20:37:32.723952'),('6ac5bf47-d266-48df-923f-15c09fe8fbc7','2025-02-20 12:11:15.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('6aff3acb-105e-4fa6-91ba-39328d971789','2025-02-12 10:58:55.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:58:56.415622','2025-02-12 10:58:56.415623'),('6bc2363f-bd7c-4f17-8080-3c86d5d6fe98','2025-03-05 12:11:59.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000318',2,'2025-03-05 12:12:00.991597','2025-03-05 12:12:00.991597'),('6bc87b75-d516-4b6d-8594-6bbb31efc9c6','2025-02-20 17:17:49.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('6bfcb420-31f6-48af-90ae-673963086537','2025-02-20 16:25:11.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('6c60fb53-1399-4916-93b7-7a8110ed01bb','2025-03-05 11:12:52.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('6cca2784-4f65-4df7-bb78-351db163813a','2025-03-05 10:24:00.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('6cecfa90-9861-4ed9-83f2-53daed1c37ed','2025-02-06 11:56:31.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-06 10:57:19.399770','2025-02-06 10:57:19.399771'),('6e17c145-d032-481e-a515-5a6c48fabfda','2023-12-10 03:33:47.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('6e44a75c-4e55-4e1c-8b93-fecf5f4f4445','2023-12-10 01:36:13.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('6eaf305c-cc75-4b6a-b8f0-c23233401026','2025-03-10 16:47:50.000000',8,293,'Acesso não autorizado',23,2,4,'AJYS223460212',0,'2025-03-10 16:47:52.113285','2025-03-10 16:47:52.113286'),('6ec2e35d-8bed-4947-9c09-94a5577f5ece','2025-02-10 16:44:02.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:44:04.346715','2025-02-10 16:44:04.346716'),('6ecb531a-e873-4546-b324-ff32a6f8714d','2025-02-05 16:53:59.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 16:54:00.836265','2025-02-05 16:54:00.836266'),('6fcbdaa3-3001-4561-8749-9a87f37861b3','2025-02-20 17:42:04.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('6fcdb2d4-5535-441c-85d0-b3cc9b34b9e9','2025-03-05 10:59:26.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('702691ae-fc79-4158-933c-854e2f36f3fd','2025-02-05 20:36:44.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-05 20:36:45.196670','2025-02-05 20:36:45.196670'),('7037d1fd-9d2c-458f-9977-ba11114650f8','2025-02-07 15:31:31.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',NULL,'2025-02-07 15:31:31.000000','2025-02-07 15:31:31.000000'),('706143de-94a7-45d0-b35f-bd5200ceb90d','2025-02-07 15:37:38.000000',0,10892253,'Não registado',27,1,4,'TFP5235000453',1,'2025-02-07 15:37:39.411877','2025-02-07 15:37:39.411877'),('70e37797-50bf-47e1-886d-749273c37feb','2025-02-05 15:51:19.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('7181faaa-f2df-4bcb-bab8-04bc3c0db29a','2025-02-12 11:21:54.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:21:56.437567','2025-02-12 11:21:56.437567'),('718ac731-95ad-49d6-8e11-71446f3a234a','2023-12-10 02:42:41.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('7209d5a1-11b9-408b-9495-58ab89055f53','2025-02-07 15:06:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-07 15:06:59.566037','2025-02-07 15:06:59.566037'),('72495305-25c5-4972-8624-91d0106b2f6d','2025-02-05 23:46:48.000000',0,0,'Iniciar dispositivo',206,0,200,'TFP5235000453',2,'2025-02-05 15:47:11.360053','2025-02-05 15:47:11.360053'),('7251e2bd-25b8-4bce-9333-eef8fb305a67','2025-02-10 16:46:07.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:46:10.262123','2025-02-10 16:46:10.262123'),('72fb3bfc-0b04-46ee-986a-a23ede218b84','2025-03-05 10:34:11.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('734708d8-6129-467f-8e55-13ed0c94417e','2025-02-07 15:41:06.000000',0,10892253,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-07 15:41:07.499899','2025-02-07 15:41:07.499900'),('74f816db-771d-4f2a-9b9e-1d341e1f971d','2025-02-10 11:37:56.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-10 11:37:59.086251','2025-02-10 11:37:59.086252'),('75374090-cc22-43a5-b64f-c4db02ba66fe','2025-02-12 12:11:41.000000',96,10891989,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:11:42.567418','2025-02-12 12:11:42.567419'),('75a756fa-ebbc-44e6-8e7d-b0f7b084da89','2025-02-06 10:55:38.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-06 10:57:17.739687','2025-02-06 10:57:17.739687'),('75a801a2-f86a-466d-a216-95c7265541af','2025-02-07 16:13:59.000000',0,9124358,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-07 16:14:00.019688','2025-02-07 16:14:00.019688'),('75d674bd-1e20-4276-9877-c2f44b0edc01','2025-02-05 16:59:45.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-05 17:01:27.627109','2025-02-05 17:01:27.627138'),('761ca441-2229-4156-b465-cdb43e3b54f3','2025-02-12 11:19:42.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:19:43.485709','2025-02-12 11:19:43.485710'),('764f5a1a-a576-46df-bbc3-59151d172df2','2023-12-10 03:33:48.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('766a149d-333a-4378-9f22-c70a5c78c02b','2025-02-10 10:06:46.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-10 10:06:47.248943','2025-02-10 10:06:47.248944'),('766ba013-a0e4-47a8-9d11-1b674db284c1','2025-02-12 11:39:00.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-12 11:39:02.766192','2025-02-12 11:39:02.766193'),('76e2a3e4-ed82-4983-9608-c689392fc7b3','2025-02-07 14:55:39.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:55:40.121950','2025-02-07 14:55:40.121950'),('7719faac-15a7-45cd-83b7-ea1abab9840b','2025-02-12 12:08:31.000000',9,10832577,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:32.635335','2025-02-12 12:08:32.635335'),('7733f73f-50c4-4ab0-b4e9-ae04e979444e','2025-02-07 10:15:11.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-07 10:15:22.165618','2025-02-07 10:15:22.165658'),('776670bd-aa81-48d6-b930-b51f48ff92ba','2025-02-05 20:36:44.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-05 20:36:44.885992','2025-02-05 20:36:44.885992'),('784acd05-ab8e-4631-a758-5fcf2fd02069','2025-02-07 15:13:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-07 15:13:03.004704','2025-02-07 15:13:03.004704'),('786dc9ff-2d27-4420-8845-20ab3f81e145','2023-12-10 01:35:38.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('7873e657-3fd3-46f4-a71e-6106fc741ab9','2025-02-10 11:36:28.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-10 11:37:57.919938','2025-02-10 11:37:57.919967'),('7882ce00-1e03-4318-bdf8-98e88b9f4aea','2025-02-12 11:00:02.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:00:03.512756','2025-02-12 11:00:03.512757'),('78b025f6-d91c-483a-a976-7e39b3110866','2025-02-20 12:55:35.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('78b57ec6-a67f-4bf0-8908-fa8e36782f69','2025-02-07 15:39:41.000000',0,10892253,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-07 15:39:41.780137','2025-02-07 15:39:41.780137'),('78da4395-a298-4ca1-86a2-9f4f146b5b83','2025-02-10 16:53:02.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 16:53:04.178241','2025-02-10 16:53:04.178241'),('78ea5584-9ce0-4cb2-b501-146d8fe391c7','2025-02-10 17:48:57.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-10 17:49:07.858282','2025-02-10 17:49:07.858282'),('78fc1dc6-3455-4796-9624-76eabafb5078','2025-02-05 23:59:54.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 16:00:05.783890','2025-02-05 16:00:05.783890'),('79a03fdb-4d99-4b5b-82fa-b768b26bd0f6','2025-02-12 12:13:31.000000',36,10920174,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:13:33.903496','2025-02-12 12:13:33.903496'),('7a57413b-b317-4c4a-9ab7-90cdea1040ef','2025-02-12 14:54:48.000000',101,10891726,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:54:49.567800','2025-02-12 14:54:49.567800'),('7a670f23-3115-4339-869a-dbf6269af6ea','2025-02-20 16:24:58.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('7a9f467e-0343-4d3a-b229-2a9531f0cba4','2025-02-07 15:46:59.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:46:59.740981','2025-02-07 15:46:59.740981'),('7aa6bec4-ea84-40c5-b69c-643cf17e6d1f','2025-02-20 16:22:58.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('7b1f1f1b-e32c-44de-913b-1a0739a75b32','2023-12-10 01:36:12.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('7b601120-34f6-46ba-aa35-5f0a6b4cc56e','2025-02-07 10:19:01.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 10:19:01.705888','2025-02-07 10:19:01.705888'),('7b6b8dc9-3c0a-4fb3-a7a0-8c42eafe13ef','2025-02-12 12:17:32.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:17:33.892774','2025-02-12 12:17:33.892775'),('7b75416b-70bc-49c1-ab33-21b7c3b0855e','2025-02-07 15:39:42.000000',0,10892253,'Não registado',27,1,4,'TFP5235000453',1,'2025-02-07 15:39:43.746557','2025-02-07 15:39:43.746557'),('7bdeaab8-1c79-4fc0-9c76-0f87c1a9f958','2025-02-07 15:44:39.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-07 15:44:41.202185','2025-02-07 15:44:41.202185'),('7c2dcc82-c5ff-48ae-8da9-a99338d0276b','2025-02-10 17:48:59.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-10 17:49:09.927945','2025-02-10 17:49:09.927946'),('7d37d84e-6146-4ea9-a905-44252497a73c','2025-02-12 12:07:53.000000',0,9124357,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:07:54.841939','2025-02-12 12:07:54.841940'),('7d460276-3180-4595-b898-41fd006941e4','2025-02-12 11:38:58.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-12 11:39:15.931154','2025-02-12 11:39:15.931154'),('7d6e48cd-983d-47de-b881-7be62ed99603','2023-12-10 03:19:35.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('7d92e40c-a1b4-4b07-8cc9-e37b91f9b9ab','2025-02-20 15:25:04.000000',167,10800146,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('7ded82b4-b450-48e9-a7a8-a6d8a886791e','2025-02-12 12:15:08.000000',221,10829761,'Acesso não autorizado',23,2,4,'TFP5235000422',0,'2025-02-12 12:15:09.742773','2025-02-12 12:15:09.742773'),('7e019d76-773f-4621-88b6-36ab8f583038','2025-02-12 11:34:14.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-12 11:35:19.537475','2025-02-12 11:35:19.537475'),('7e2c1118-234a-4302-b386-733260740502','2025-02-07 15:37:32.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:37:32.924733','2025-02-07 15:37:32.924733'),('7e744750-b0a0-4d51-b0e7-e27c6bcc9a1f','2025-02-12 11:27:07.000000',0,9124358,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 11:27:07.769721','2025-02-12 11:27:07.769721'),('7f9774ec-3210-479a-a68d-812c111466b8','2025-02-06 22:24:31.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',NULL,'2025-02-07 15:29:25.000000','2025-02-07 15:29:25.000000'),('7fdb4585-7472-4494-8737-82ea882eda9d','2023-12-10 03:33:55.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('80155f30-077b-4090-8d60-2641a9245635','2025-02-12 10:59:59.000000',5,9124357,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:00:01.152961','2025-02-12 11:00:01.152961'),('809e30df-f1c0-44a1-a48d-531c605b1596','2025-02-10 10:01:10.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 10:01:12.750546','2025-02-10 10:01:12.750547'),('80cf9a31-d09f-4939-a63e-c46770f2d8f5','2025-02-10 10:05:47.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-10 10:05:55.203596','2025-02-10 10:05:55.203596'),('80e18c51-1e28-4998-98a1-e1fbc0e681a2','2025-02-12 11:35:19.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-12 11:35:20.301020','2025-02-12 11:35:20.301020'),('80e94a31-5431-4e7a-a5ca-2060c1e3e613','2025-02-05 20:37:31.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-05 20:37:33.236518','2025-02-05 20:37:33.236518'),('811ab528-35cd-4690-8a37-24d44e2d3782','2025-02-07 14:59:17.000000',9,10832577,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-07 14:59:18.758107','2025-02-07 14:59:18.758107'),('81368e6e-28b1-4cbf-bfbb-e0191c88851d','2025-02-07 16:27:18.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-07 16:28:03.134838','2025-02-07 16:28:03.134870'),('818ba268-6675-459f-9257-4926c93b1f6a','2025-02-12 12:08:19.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:20.871714','2025-02-12 12:08:20.871715'),('81e60937-041c-4f71-b573-f408043ceb99','2025-02-12 10:56:13.000000',0,10958427,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 10:56:15.042405','2025-02-12 10:56:15.042405'),('82561f39-1084-46d0-840a-243f99cb2d41','2025-02-12 14:54:22.000000',101,10891726,'Acesso não autorizado',23,2,4,'TFP5235000318',0,'2025-02-12 14:54:23.105933','2025-02-12 14:54:23.105933'),('828e7776-75ef-4cb3-b1d0-19f1b93bbf86','2023-12-10 01:35:36.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('829d5fd8-98d9-40f7-9024-c934e32620b8','2025-03-05 10:17:34.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('82e72eae-e385-4e9d-9f8c-1d31920934ca','2025-02-12 12:14:12.000000',0,10920174,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:14:13.581755','2025-02-12 12:14:13.581755'),('8308a62b-82d4-4132-9945-0f0583f9ee1f','2025-02-07 15:32:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',NULL,'2025-02-07 15:34:54.000000','2025-02-07 15:34:54.000000'),('836c698d-617e-403e-82d4-04a562c4bc7f','2025-02-12 14:53:22.000000',128,10893588,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:53:23.535569','2025-02-12 14:53:23.535569'),('8393ef11-c1f8-452f-aed9-8930c03d9a4f','2025-03-05 11:09:46.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('83a20ec9-793c-42fc-8192-0f6b4d14443a','2025-02-12 12:12:41.000000',200,10807101,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:12:42.864771','2025-02-12 12:12:42.864772'),('8403d8e7-2d7c-4c13-a0a7-096064aa2a4a','2025-02-27 17:02:24.000000',0,-466508024,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-27 17:02:27.284256','2025-02-27 17:02:27.284256'),('8478b5ba-5382-42a3-b7e1-be8c92a455b5','2025-02-12 12:10:02.000000',30,9127895,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:10:03.785249','2025-02-12 12:10:03.785250'),('84df37ac-5429-4e6b-9d55-51327c2bbb86','2025-02-12 12:13:37.000000',36,10920174,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:13:38.341050','2025-02-12 12:13:38.341050'),('853a9480-a9e6-4629-8d46-1fb8b8986d83','2025-02-20 12:54:18.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('85638e69-4447-44f3-8703-b8d1a9b8a36b','2025-02-20 17:13:51.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('85a00438-4ec4-4bcf-800e-8eabda1f3baa','2025-02-07 16:13:02.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 16:13:03.320573','2025-02-07 16:13:03.320573'),('8657c644-efd2-49a3-812d-50d620756355','2023-12-10 03:19:32.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('869cb1c1-ca1a-4057-81af-9d98f1869615','2025-02-12 12:08:34.000000',0,10832577,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:08:35.255874','2025-02-12 12:08:35.255874'),('86ac33df-d667-43b5-99a8-72b51483f033','2025-02-20 16:27:37.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('876d2dbe-0f04-4776-8c0d-bbe2c827edc1','2025-02-10 09:58:26.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 09:58:28.255523','2025-02-10 09:58:28.255524'),('88ed6c4b-2a98-4ca4-9b21-824ab6b49b14','2025-02-12 11:39:20.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',NULL,'2025-02-12 11:42:27.000000','2025-02-12 11:42:27.000000'),('89a8ea5e-968e-4d60-a9fa-b44cd6234828','2025-02-05 16:53:57.000000',36,267,'Acesso não autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:53:58.483474','2025-02-05 16:53:58.483474'),('89bef0c9-6ad7-4864-9d4b-34a7bf49cbe4','2025-02-06 17:28:25.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-06 17:29:12.515954','2025-02-06 17:29:12.515984'),('89ef1c07-5d3b-450b-a0e2-e3da6d523166','2025-02-05 16:52:21.000000',36,267,'Acesso não autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:52:22.101405','2025-02-05 16:52:22.101405'),('8a201e65-f911-4e63-88bb-c1610646a6c8','2025-02-07 15:34:52.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-07 15:34:53.194037','2025-02-07 15:34:53.194037'),('8a3b242c-607e-4d76-9c75-3e18a94982a0','2025-02-07 15:10:54.000000',9,10832577,'Não registrado',27,1,4,'TFP5235000422',0,'2025-02-07 15:13:02.690782','2025-02-07 15:13:02.690782'),('8a8cb0fa-f9bb-48b1-9afe-49bf11cedf5c','2025-02-06 18:20:38.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-06 17:21:25.539255','2025-02-06 17:21:25.539255'),('8a99229a-4f7a-472f-b1ed-ec0f134a1087','2025-02-10 10:05:53.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-10 10:05:55.710151','2025-02-10 10:05:55.710151'),('8af869fc-162f-4de8-bad6-84841f29e102','2025-02-12 11:42:24.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',NULL,'2025-02-12 11:42:27.000000','2025-02-12 11:42:27.000000'),('8d5b2a89-0193-4684-8ace-7eb5b186bd4d','2025-02-28 08:52:54.000000',0,-2110347768,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('8d737462-52e0-422b-9a97-9afe3ee4676e','2025-02-05 16:29:04.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-05 16:29:04.580564','2025-02-05 16:29:04.580564'),('8df2bcdf-2c97-49f9-b6aa-d73f2236de6c','2025-02-12 12:12:12.000000',124,10894129,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:12:13.753221','2025-02-12 12:12:13.753221'),('8e8f76ef-1abb-4d90-bda1-58f7a63e4864','2025-02-07 15:39:35.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:39:36.178313','2025-02-07 15:39:36.178313'),('8ebdb949-51d8-4c4f-8779-5400b4426452','2025-02-20 12:53:00.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('8eff2067-88f1-4373-a2bf-7e537b147aa0','2025-02-12 11:42:27.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-12 11:42:31.787473','2025-02-12 11:42:31.787473'),('8f0f4cb6-b632-4487-8dfe-5798bb097d8c','2025-02-07 15:34:50.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-07 15:34:52.719543','2025-02-07 15:34:52.719543'),('8f1289c3-2ba5-411e-83a8-2f6b63904769','2025-02-05 16:23:26.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',2,'2025-02-05 16:23:26.689182','2025-02-05 16:23:26.689182'),('8f474be4-f076-487e-b464-812f19c28ea2','2025-02-10 16:50:23.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-10 16:51:08.833080','2025-02-10 16:51:08.833081'),('908fca67-1c1d-4d08-b98d-b5f11d7393d9','2025-02-05 20:37:30.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 20:37:32.878654','2025-02-05 20:37:32.878654'),('90d5f322-0aed-4dbe-8a5b-801af55c0587','2025-02-20 16:22:14.000000',0,NULL,'Formato Wiegand incorreto',42,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('90e5c72e-a263-49a7-ba21-1cf6c0aa4508','2023-12-10 03:33:56.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('91a24c8a-b35e-42a5-9321-b4e476188afa','2025-02-10 10:05:47.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-10 10:05:55.200683','2025-02-10 10:05:55.200683'),('91b3dcc7-38a9-45c1-bc21-08fe7ac71f26','2025-02-28 11:11:44.000000',0,-251288056,'Não registado',27,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('920e266c-926f-4d79-b59d-395e5939a766','2023-12-10 03:34:08.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('924b1368-2423-4f9c-8635-f9c5d9ff179e','2025-02-10 16:48:29.000000',0,9124358,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-10 16:48:32.004302','2025-02-10 16:48:32.004302'),('92d75450-1c5b-49aa-a601-49bfccbee71c','2025-02-10 08:51:29.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000453',2,'2025-02-10 08:51:42.069977','2025-02-10 08:51:42.069977'),('92f16852-0240-4150-b7a2-f494ea7e0dbb','2025-02-20 11:54:16.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('92f30e9f-52d4-4f34-ad44-f41ebaa40c7b','2025-02-05 20:37:30.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 20:37:31.406561','2025-02-05 20:37:31.406561'),('937ea538-d994-4c9a-a832-910a3010f3f3','2025-02-12 11:27:09.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:27:11.038355','2025-02-12 11:27:11.038356'),('93a4fd6d-1bc7-4301-ba69-188cf241f893','2025-02-20 12:55:46.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('93e49293-aca0-431a-99a6-c36b9fe84f1f','2025-02-12 12:09:17.000000',24,9124361,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:09:19.004128','2025-02-12 12:09:19.004129'),('941bfb35-19e4-412b-bb6a-bd46e3690457','2025-02-12 14:43:18.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:43:19.517606','2025-02-12 14:43:19.517606'),('94270642-79d2-4d28-878e-c324a0bd08d3','2025-02-12 11:16:10.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 11:16:11.578759','2025-02-12 11:16:11.578759'),('943fe338-a103-4431-b6e8-1b7cce2a63c2','2025-03-06 11:00:00.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000453',0,'2025-03-06 10:59:58.130666','2025-03-06 10:59:58.130666'),('94a4cb7e-b47a-415b-998e-54a6fe9929ee','2000-01-31 01:12:20.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('94ab223c-8ba1-4092-b1b0-77ef7874741b','2025-02-12 14:41:28.000000',164,10813084,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 14:41:30.007957','2025-02-12 14:41:30.007957'),('94e88933-d2fd-4c7e-aa47-03302101a759','2025-02-12 11:42:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-12 11:42:29.586613','2025-02-12 11:42:29.586613'),('951ff5f1-67a4-4b4e-8c16-6eb60c1091b1','2025-02-20 16:23:22.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('9598f6a3-468b-44cf-91de-dc57f99d7162','2025-02-07 16:28:03.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-07 16:28:05.177497','2025-02-07 16:28:05.177497'),('95cf1b03-cb47-4e45-be6d-6b6d5ace6065','2000-01-01 23:44:12.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('95d99281-85c6-4180-ac5b-3138b0318ba6','2025-02-06 15:45:13.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-06 14:46:00.170683','2025-02-06 14:46:00.170683'),('96243064-cb12-43c9-8250-c86c09a25ad5','2023-12-10 01:35:40.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('964ad73c-0d14-4669-8a6d-0ba5a0fa7963','2025-03-10 16:58:02.000000',8,293,'Acesso não autorizado',23,2,4,'AJYS223460212',0,'2025-03-10 16:58:04.963981','2025-03-10 16:58:04.963982'),('969c5759-9c7a-487d-a836-4dc8d6035da6','2025-02-12 12:12:38.000000',200,10807101,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:12:39.750118','2025-02-12 12:12:39.750119'),('973d146d-7e8e-4ad8-9c3d-fc83e0c1445d','2025-02-10 16:48:54.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:48:57.062680','2025-02-10 16:48:57.062680'),('97715e5f-bf3c-4a0f-891f-88e6285bc051','2025-02-07 16:14:41.000000',0,9124358,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:14:42.576206','2025-02-07 16:14:42.576206'),('97bd5050-c294-4930-8d44-7a72f16f468b','2025-03-05 10:16:39.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('97be4b67-6b24-476a-a295-2c29e59d586c','2025-02-20 17:14:03.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('97be6fcd-6f9d-4301-8d9a-3c44b9a5eefc','2025-02-05 20:36:44.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-05 20:36:46.398230','2025-02-05 20:36:46.398230'),('98462cdb-8aa4-40da-a15e-4f3f9457c56a','2025-02-12 12:07:41.000000',5,9124357,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:07:42.876169','2025-02-12 12:07:42.876169'),('98549d1b-1827-44e5-88ff-f19fbe6a2f0b','2023-12-10 01:36:11.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('98b544ad-4116-4999-8974-b15e4dae5675','2025-03-05 12:39:39.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('98f9061e-7d5c-4ca3-8d5f-2b2aa6756c0c','2025-02-20 16:22:16.000000',0,NULL,'Formato Wiegand incorreto',42,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('99963da9-5b1e-4346-ab9e-9c346e4c3d49','2025-02-12 12:25:08.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:25:10.200607','2025-02-12 12:25:10.200608'),('9a0c85de-b9b8-46f7-8d28-2e9bb245d4d2','2025-02-05 17:44:29.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-05 17:44:31.434550','2025-02-05 17:44:31.434550'),('9a94a8ce-9c06-469d-9951-3a481a4d574b','2025-02-12 11:26:42.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:26:43.294288','2025-02-12 11:26:43.294288'),('9b2e698c-ae31-417f-b87d-b2325d0e36b6','2025-02-12 12:26:38.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000422',0,'2025-02-12 12:26:39.016102','2025-02-12 12:26:39.016102'),('9b9ad37f-4060-4d1e-99fb-170b72d62aef','2023-12-10 03:33:54.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('9be7cdf7-a2cc-4f9f-bd0a-d28a314fd2fb','2025-02-12 12:25:52.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:25:53.812621','2025-02-12 12:25:53.812621'),('9c4a7a60-3169-4101-97d3-3a74b7f98af4','2025-02-27 18:14:19.000000',0,1685217032,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:14:20.722816','2025-02-27 18:14:20.722816'),('9c4d6e78-8436-47b0-b0e7-e8ed273b37dd','2025-02-10 10:08:15.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-10 10:08:16.539639','2025-02-10 10:08:16.539639'),('9ca58879-0330-4957-9a32-afb708e2c282','2025-02-12 12:08:15.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:16.927700','2025-02-12 12:08:16.927700'),('9ce14064-a314-4d55-b54a-76a221a5f400','2025-02-05 23:16:12.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 15:16:48.010617','2025-02-05 15:16:48.010655'),('9cedbf71-009f-4c2f-892b-9162095f867e','2025-02-07 15:47:17.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-07 15:47:18.150386','2025-02-07 15:47:18.150386'),('9d486ab2-1f07-40b8-9195-508d3001a5c0','2025-02-27 18:14:06.000000',0,NULL,'Desconhecido',20,2,200,'TFP5235000318',1,'2025-02-27 18:14:07.629950','2025-02-27 18:14:07.629950'),('9d6658bf-149d-4ba4-8742-fa58061ead96','2025-02-20 13:57:26.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('9db90a0d-2ea8-4cc0-92b8-99832e658e7e','2025-02-07 16:22:16.000000',0,1180213558,'Não registado',27,1,4,'TFP5235000453',1,'2025-02-07 16:22:16.860869','2025-02-07 16:22:16.860870'),('9ef5bc73-5eef-4047-85bf-c1231e61a402','2025-02-12 11:42:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-12 11:42:30.378076','2025-02-12 11:42:30.378076'),('9f46957f-e3a6-4cae-b048-898848ed88dd','2025-02-20 12:41:39.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('9fa184aa-3fc3-4133-9075-2cd155a21e21','2025-02-20 15:24:41.000000',0,10813084,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('9fda7830-cd11-4022-8a29-fdce426dff92','2025-02-05 21:36:44.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-05 20:37:31.094763','2025-02-05 20:37:31.094763'),('a0bc8bbe-d522-4d59-b5dd-4c23168ad56c','2025-02-12 12:16:26.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:16:28.008594','2025-02-12 12:16:28.008595'),('a0bf458c-de6b-4f2f-a6b4-860caecc789c','2025-02-12 14:52:00.000000',164,10813084,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 14:52:01.758363','2025-02-12 14:52:01.758363'),('a10fe60d-1971-4c79-ab06-16f9696a0563','2025-02-12 12:09:20.000000',0,9124361,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:09:21.295237','2025-02-12 12:09:21.295238'),('a12129d3-f687-472b-a405-8297fee433eb','2025-02-12 11:42:27.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',NULL,'2025-02-12 11:42:28.000000','2025-02-12 11:42:28.000000'),('a12ef075-69a2-4634-bc4d-5ec3835c9cc1','2023-12-10 03:33:45.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('a13bdecc-a2ac-4c25-8842-050883c6292d','2025-02-12 12:09:51.000000',0,10920487,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:09:52.419222','2025-02-12 12:09:52.419222'),('a189184b-8801-4e90-b985-1c10d215135a','2025-02-10 16:48:36.000000',0,9124358,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-10 16:48:37.107646','2025-02-10 16:48:37.107647'),('a18e4011-447c-4eba-80c6-328c33d923aa','2025-02-12 10:59:05.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 10:59:07.454840','2025-02-12 10:59:07.454840'),('a214ee24-7374-48fb-9efe-adf2a20c037e','2025-03-05 12:39:01.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('a252eb75-bd6e-4ce9-a5e4-c87b9b3405ef','2025-02-10 09:25:00.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-10 09:25:01.090645','2025-02-10 09:25:01.090645'),('a2bdf56f-c39f-45df-9623-a15c786b6c4c','2025-02-10 16:51:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-10 16:51:09.215034','2025-02-10 16:51:09.215034'),('a2c05825-e74e-41d1-a9b0-edc571c36f2c','2025-02-12 11:42:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',NULL,'2025-02-12 11:42:30.000000','2025-02-12 11:42:30.000000'),('a2d7a548-de53-485c-a44c-3721b1991506','2025-03-05 10:57:43.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('a2f8b539-aecd-459a-a096-a43b11fbebe3','2025-02-05 02:27:27.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('a31ad16e-5ca0-446f-abca-ff4aae5afa97','2025-03-05 09:51:52.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('a3961d74-151d-47f6-837d-99507876aa58','2025-02-20 12:54:37.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('a3e8d6f6-7e28-40be-aa89-6adfa70cd7d6','2025-02-12 12:14:20.000000',36,10920174,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:14:20.999075','2025-02-12 12:14:20.999076'),('a3eb6ba3-9a20-44e3-a8dc-af47d362644d','2025-02-12 14:54:45.000000',101,10891726,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:54:46.276568','2025-02-12 14:54:46.276569'),('a4b9a447-38dd-484b-9d2d-91dc3594c918','2025-02-07 15:34:50.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',NULL,'2025-02-07 15:34:52.000000','2025-02-07 15:34:52.000000'),('a59def1e-91d2-4583-ab74-e39c69f13987','2025-03-06 11:00:04.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000453',0,'2025-03-06 11:00:02.477132','2025-03-06 11:00:02.477132'),('a5e8d739-ba1c-4acd-9e63-712d2f76c167','2025-02-10 10:05:53.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-10 10:05:55.711711','2025-02-10 10:05:55.711711'),('a5f60369-a9bc-46c6-9de8-427601142f42','2025-02-12 11:27:26.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 11:27:27.486184','2025-02-12 11:27:27.486184'),('a5ff5155-d1ed-43a7-ae2e-cfc58102aef0','2025-02-10 16:54:06.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-10 16:54:08.084709','2025-02-10 16:54:08.084709'),('a632b4cd-3bf7-4603-a3a2-d4f2130dcc40','2025-02-07 16:14:27.000000',0,279,'Não registado',27,2,4,'TFP5235000422',0,'2025-02-07 16:14:28.423203','2025-02-07 16:14:28.423203'),('a6945c17-adec-4e61-bf03-bab18c099660','2025-02-28 08:52:52.000000',0,-1620211448,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('a6a75d76-99ed-494b-9b18-eb66d01e9202','2025-02-07 16:25:49.000000',0,4,'Não registado',27,1,4,'TFP5235000453',1,'2025-02-07 16:25:49.434845','2025-02-07 16:25:49.434846'),('a6e872bc-1c0a-4a1c-baf2-11366ad3aeba','2025-02-07 15:32:50.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-07 15:34:55.084006','2025-02-07 15:34:55.084006'),('a6edb7a8-3331-4ad1-b888-56f1f9523775','2025-03-06 11:00:34.000000',0,-95057912,'Não registado',27,1,4,'TFP5235000453',0,'2025-03-06 11:00:32.782505','2025-03-06 11:00:32.782505'),('a707b8ad-bcbb-4d7d-8011-a0fe9d8d3f1b','2025-02-12 12:13:39.000000',36,10920174,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:13:40.216103','2025-02-12 12:13:40.216103'),('a7fe4221-4328-4113-9acc-4d2b36851ace','2025-02-20 11:43:42.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('a817fea8-2266-4a6c-bcfb-f792e288903a','2025-02-20 16:23:32.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('a92902f9-66b3-4256-ac99-cbb8b00e5a71','2023-12-10 02:42:44.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('a9bfcf3d-a59f-45fe-b24a-ad3168b9a52f','2025-02-12 11:22:24.000000',5,9124357,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 11:22:25.046848','2025-02-12 11:22:25.046848'),('a9c7f3f3-5122-4b8d-a0e7-5c4398cb0181','2025-02-07 15:32:50.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-07 15:34:52.350062','2025-02-07 15:34:52.350062'),('a9d853de-a89f-4239-8658-76c85df3c2de','2025-02-06 17:16:51.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',NULL,'2025-02-06 17:23:16.000000','2025-02-06 17:23:16.000000'),('aa14dd28-5f32-4243-b463-d219ae541b4f','2025-02-28 10:34:02.000000',0,4334088,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('aa17ab9b-07c6-4621-b0c1-e1739b2da657','2025-02-07 15:41:09.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 15:41:09.997347','2025-02-07 15:41:09.997347'),('aa7acb9f-648b-43e3-965b-99999c07e742','2025-02-20 12:38:15.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('aa8649ce-dd67-40cf-bea4-4d0d217ef95d','2025-02-12 12:08:51.000000',20,9124360,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:08:52.878059','2025-02-12 12:08:52.878060'),('abe50f04-74f2-478a-aaf0-5aacfcc9634d','2025-03-05 09:28:54.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000437',2,'2025-03-05 09:28:55.828510','2025-03-05 09:28:55.828510'),('abfe886d-6892-4151-a6fb-b6049926501b','2025-02-12 12:14:54.000000',220,10830074,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:14:56.854031','2025-02-12 12:14:56.854032'),('ac0387be-e9f0-46f0-a259-677791030c94','2025-02-12 12:04:20.000000',0,9124357,'Não registado',27,1,4,'TFP5235000422',0,'2025-02-12 12:04:22.551434','2025-02-12 12:04:22.551434'),('ac078957-e0f1-4b0f-8eb3-2e347f1f29ee','2025-03-05 12:45:08.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('ac6684a2-4e64-48c1-a352-4a2877610b91','2025-02-12 12:05:48.000000',0,9124357,'Não registado',27,2,4,'TFP5235000422',0,'2025-02-12 12:05:49.184024','2025-02-12 12:05:49.184025'),('ac75c21e-4d87-485b-8bbf-e029e1711c33','2023-12-10 03:19:31.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000437',NULL,'2025-02-06 17:22:06.000000','2025-02-06 17:22:06.000000'),('ac9d8950-1833-41aa-93e4-e504b257bdd1','2025-02-05 02:27:55.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('accb77bb-7d5b-4d75-848d-6bf4ea89bd1a','2025-02-20 11:59:22.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('ad25e6da-a060-414d-a52f-aa898ddd449d','2025-02-27 18:05:43.000000',0,-1490967544,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:05:45.285149','2025-02-27 18:05:45.285149'),('ad93c7e3-7922-4d1b-a094-7e1f00898192','2025-02-12 12:08:57.000000',0,9124360,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:08:58.508593','2025-02-12 12:08:58.508593'),('adaa344f-72e6-43fb-9b91-cb359262700b','2025-02-07 16:27:17.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-07 16:28:04.973526','2025-02-07 16:28:04.973526'),('adb330e4-a265-473c-a21b-9297dcf411b9','2025-03-05 09:28:54.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000437',2,'2025-03-05 09:28:56.243160','2025-03-05 09:28:56.243160'),('adb8ab55-ae3c-4ad1-b66a-f0268103c058','2025-02-10 16:46:03.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 16:46:04.748723','2025-02-10 16:46:04.748723'),('ae685e08-68b7-4333-82fb-ced24b4d2b18','2025-02-12 12:08:33.000000',0,10832577,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:08:36.162099','2025-02-12 12:08:36.162100'),('aed07c9f-dd42-489d-b6f0-59f7305f30a5','2025-02-12 12:08:58.000000',0,9124360,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:08:59.727606','2025-02-12 12:08:59.727606'),('aef7bff0-46e6-4b12-b982-33b2f588744a','2025-02-07 15:32:49.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-07 15:34:52.662216','2025-02-07 15:34:52.662217'),('af88108f-02a3-4834-ad80-186b16f67526','2025-02-12 10:59:25.000000',39,10803847,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 10:59:26.629773','2025-02-12 10:59:26.629773'),('af90c356-aba6-4794-80ca-9eee5908ad5f','2025-03-05 10:32:42.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('afcd0f0f-9811-49f2-a611-ca4f8fe2a464','2025-02-12 11:39:21.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',NULL,'2025-02-12 11:42:30.000000','2025-02-12 11:42:30.000000'),('b0034cc7-32e4-4c54-9d0e-b818f2ee6ad0','2025-03-05 10:16:59.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('b0deabbf-4349-4d2e-a324-a0dceb242083','2025-02-12 12:15:05.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-12 12:15:06.877209','2025-02-12 12:15:06.877210'),('b0e9daa5-5743-4b37-948d-d3b9a8a465e1','2025-02-10 17:48:55.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-10 17:49:07.486326','2025-02-10 17:49:07.486326'),('b12523fd-1d89-4ea5-8902-8324cf6eaabb','2025-02-12 12:15:11.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:15:12.453571','2025-02-12 12:15:12.453572'),('b147cee2-4975-457d-87b9-e2c931fe5591','2025-02-05 20:37:32.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-05 20:37:33.394008','2025-02-05 20:37:33.394008'),('b25b1f74-65df-40df-9267-1e50c986d445','2025-02-12 12:12:44.000000',200,10807101,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:12:45.552049','2025-02-12 12:12:45.552050'),('b2ccf1c6-57aa-4c0b-b0cc-3b731eda460d','2025-03-05 09:51:55.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('b33dccc5-7c4a-43f4-8d9d-b4c84ff983fb','2025-02-04 19:27:48.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('b344bdd7-a8aa-4e3b-9418-60aa0af2c360','2025-03-05 11:27:09.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('b3f24c20-536c-42d0-a20a-698330e35d0e','2025-03-06 10:50:16.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-03-06 10:50:14.683686','2025-03-06 10:50:14.683686'),('b4250b32-c386-4b60-9a5c-e228ba47cbbe','2025-03-10 16:57:58.000000',5,291,'Abertura efetuada',0,2,4,'AJYS223460212',0,'2025-03-10 16:58:00.154500','2025-03-10 16:58:00.154702'),('b45cda80-9cd8-4073-a0dd-962e8d62b6ae','2025-02-28 08:52:52.000000',0,NULL,'Desconhecido',20,2,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('b4a24235-32e4-4734-bb93-d94dae6eafbc','2025-02-06 15:37:36.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('b4c5bc3c-c0e0-4a01-b9ca-f9d24a3f0600','2025-03-06 11:00:03.000000',0,2085271048,'Não registado',27,1,4,'TFP5235000453',0,'2025-03-06 11:00:02.112802','2025-03-06 11:00:02.112802'),('b4daf69b-6cd5-4e81-876d-ea184970c8d2','2025-02-07 15:46:40.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-07 15:46:41.078233','2025-02-07 15:46:41.078233'),('b53dbecc-6913-41b1-96fc-59294ca7dbd1','2025-02-12 12:14:18.000000',36,10920174,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-12 12:14:19.317662','2025-02-12 12:14:19.317663'),('b644920f-0bf2-445f-a501-6e29b6995014','2025-03-05 09:51:53.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('b6b16a08-793f-4711-bc82-9292ec171a19','2025-02-07 16:14:55.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 16:14:56.415609','2025-02-07 16:14:56.415609'),('b6c89674-46b7-4a70-bd09-00514102ac6d','2025-02-06 17:28:26.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-06 17:29:13.726246','2025-02-06 17:29:13.726247'),('b78cf1d1-c01c-4a08-abf4-88373706ff33','2025-02-12 11:36:57.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-12 11:39:02.447238','2025-02-12 11:39:02.447238'),('b7ea8e27-0656-462a-accf-87d3f1ab39c3','2025-02-12 11:19:51.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-12 11:19:53.658444','2025-02-12 11:19:53.658445'),('b897b68b-1b06-471b-b107-d8ee7cc3b209','2025-02-10 10:05:53.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-10 10:05:55.713716','2025-02-10 10:05:55.713717'),('b8cd4edc-6e34-4724-8475-83b6fb586559','2023-12-10 01:36:14.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('b9b1b40d-d995-4530-a3e6-63861d42190b','2025-02-07 15:32:50.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',NULL,'2025-02-07 15:34:52.000000','2025-02-07 15:34:52.000000'),('b9c972db-ec31-4c34-8b89-0353dbee5467','2025-02-05 17:02:43.000000',0,264,'Não registrado',27,2,4,'TFP5235000453',0,'2025-02-05 17:02:44.084399','2025-02-05 17:02:44.084399'),('ba8bd2aa-8edc-429f-9709-7f6058eef9d7','2025-02-07 10:19:44.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 10:19:44.898336','2025-02-07 10:19:44.898336'),('bb220e57-7cc9-4668-a32f-0b90782b3192','2025-03-05 13:29:28.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',1,'2025-03-05 13:29:27.966811','2025-03-05 13:29:27.966812'),('bb572c58-e268-46ea-923d-15b23d40b181','2025-03-05 11:31:03.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-03-05 11:31:04.802915','2025-03-05 11:31:04.802915'),('bc0b9e1f-51e1-4d69-97e6-c64a289780fe','2025-03-05 11:13:53.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('bc58f680-a37e-423c-a6de-262ec1af1455','2025-02-05 17:44:16.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 17:44:30.467635','2025-02-05 17:44:30.467635'),('bc880769-c1b1-43e4-b827-414ce8c9ebc6','2025-02-12 11:00:09.000000',0,9124358,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:00:10.154181','2025-02-12 11:00:10.154181'),('bc895ecc-2be0-432c-8a07-3d3718219fe4','2025-02-07 16:13:54.000000',0,9124358,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-07 16:13:54.956264','2025-02-07 16:13:54.956264'),('bcbf0698-25d6-401b-9259-8f8c9d49def1','2025-03-05 10:59:12.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('bcc1fb1a-07a6-42ea-a9ce-9b709a4e2184','2025-02-12 11:35:17.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-12 11:35:19.650841','2025-02-12 11:35:19.650841'),('bd0b69b5-028c-4343-8369-7bb72673dfd9','2025-02-27 18:25:23.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000318',1,'2025-02-27 18:25:25.268405','2025-02-27 18:25:25.268405'),('bd1410ee-ada8-44a8-9eac-4225a9aac8ee','2025-02-05 16:52:29.000000',36,267,'Acesso não autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:52:30.421198','2025-02-05 16:52:30.421198'),('bd68ddec-2641-4d31-a1c8-5604f0960297','2025-02-10 16:53:59.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-10 16:54:01.038245','2025-02-10 16:54:01.038245'),('bd8a21ab-09c0-46e5-899c-c4d2e1ef6859','2025-02-07 16:14:25.000000',0,279,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-07 16:14:26.274718','2025-02-07 16:14:26.274719'),('bdc64a44-5100-4755-a7b2-a1ae281bf543','2025-03-05 13:29:11.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-03-05 13:29:10.954543','2025-03-05 13:29:10.954543'),('bddf91d0-e3b1-4780-805d-5eaed7912f51','2025-02-20 15:25:33.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('bde6de45-ce03-4ff3-8e67-c0313164b572','2025-02-12 12:08:54.000000',0,9124359,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:08:57.336547','2025-02-12 12:08:57.336548'),('bdf327ea-44d9-4009-b5b1-a7b146370173','2000-10-10 03:08:47.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('be451f44-d570-43ed-bb4f-d217e7ea5255','2025-02-12 11:14:51.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:14:52.967095','2025-02-12 11:14:52.967095'),('be7d66a5-2a02-479e-83d8-9cfe884572d7','2025-02-20 16:24:45.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('be9171a0-b75c-4573-9165-b96d8e2e2bcf','2025-02-06 17:29:12.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-06 17:29:13.888134','2025-02-06 17:29:13.888134'),('be9ac1aa-2346-464a-ada5-4b6d37d644a7','2025-02-05 20:36:41.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 20:36:43.791080','2025-02-05 20:36:43.791080'),('becd894b-a852-4828-bb64-6a766f9c33c7','2025-02-07 16:12:57.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-07 16:12:58.211025','2025-02-07 16:12:58.211025'),('bf5f12dc-9769-4377-bfe0-87f3317505e4','2025-02-05 21:36:38.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-05 20:37:28.724499','2025-02-05 20:37:28.724499'),('bf802d20-ed86-47f9-817f-7fe682f88a9b','2025-02-05 20:37:25.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 20:37:30.494295','2025-02-05 20:37:30.494295'),('bf811174-4511-4970-b32d-1071db24cc9c','2025-02-12 14:52:21.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 14:52:22.145220','2025-02-12 14:52:22.145221'),('bfa40179-897a-4858-9dfa-c26cc7385125','2025-02-18 12:45:40.000000',159,10812199,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('bfa9057d-e4f7-4a44-825b-6b0ce09a41a2','2025-02-10 16:50:22.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-10 16:51:10.448329','2025-02-10 16:51:10.448330'),('bfcde583-ec81-4917-bf9b-91552d7aa503','2025-02-07 16:28:03.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-07 16:28:04.977224','2025-02-07 16:28:04.977225'),('c026279c-509e-477e-989d-a348d40e2911','2025-02-20 11:42:02.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('c094eeb2-fa4a-46ce-a030-4891d055580d','2025-02-10 16:48:06.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:48:08.478113','2025-02-10 16:48:08.478113'),('c132bb04-1c4b-4f64-9309-d41f177ee86d','2023-12-10 01:35:37.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000318',NULL,'2025-02-07 15:07:59.000000','2025-02-07 15:07:59.000000'),('c15381dd-9e3a-469c-8af6-a15fed14c4a6','2025-02-20 15:24:49.000000',0,10813084,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('c1b7cf73-feec-4b8e-8cec-f0d88c22cbb5','2025-02-04 19:29:03.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('c2b3652b-05dc-4130-ab33-f3a167cdaacf','2025-02-12 12:17:35.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:17:36.271492','2025-02-12 12:17:36.271492'),('c2f19bc8-bb8f-4afb-9dd4-feba925eb4cc','2025-02-10 10:06:39.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 10:06:42.020536','2025-02-10 10:06:42.020536'),('c3893b63-c35f-4155-8203-1bd57e273da1','2025-02-07 16:13:00.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-07 16:13:01.351341','2025-02-07 16:13:01.351341'),('c3a8af0c-afb9-4932-9f5b-29429aa48ed3','2025-02-20 17:41:11.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('c3d6eebf-6639-4800-b331-eb176c7fb2fd','2025-02-10 11:36:28.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-10 11:37:59.883046','2025-02-10 11:37:59.883047'),('c3fba10a-94af-4b1c-86de-d2c0aab189ea','2023-12-10 03:34:06.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('c4b5679c-265c-4d17-8257-d85c9df6670e','2025-02-05 16:29:35.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-05 16:29:36.076219','2025-02-05 16:29:36.076220'),('c4be0f88-f694-4cf6-a6ee-37fee10247cb','2025-02-12 10:52:53.000000',153,10814870,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:52:53.863977','2025-02-12 10:52:53.863977'),('c548ec18-c80c-48d8-a773-26e9ea992b2c','2025-02-28 11:11:16.000000',0,1828109320,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('c56c20e5-9732-4c9c-adbb-02e9b5287d77','2025-02-06 18:20:46.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-06 17:21:26.076527','2025-02-06 17:21:26.076527'),('c5a82e16-1a68-4ef1-9510-044c0c805b31','2025-02-10 16:44:01.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:44:02.488095','2025-02-10 16:44:02.488095'),('c5d2d1b9-1602-4a1e-87b6-08bc774cf4c5','2025-02-20 12:53:20.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('c6034fc9-a401-410e-9c12-5c6425d9a436','2025-03-05 10:32:51.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('c737a552-13ee-4736-a146-82f200baac43','2025-02-20 11:43:05.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('c73f1fa4-e327-4368-b752-f9872ac8e60c','2025-02-07 01:20:25.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000437',2,'2025-02-06 17:21:26.064373','2025-02-06 17:21:26.064373'),('c742a6d7-da30-4962-be8b-167e68f30301','2025-02-10 16:29:11.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-10 16:29:12.157758','2025-02-10 16:29:12.157758'),('c7af9917-2c59-4925-8572-2c43aa55809a','2025-02-12 14:54:37.000000',0,10891726,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 14:54:37.831133','2025-02-12 14:54:37.831133'),('c7cc655e-f62b-435a-a24b-8833c131d8a6','2025-02-10 16:50:23.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-10 16:51:08.880313','2025-02-10 16:51:08.880313'),('c807dc6e-d3c7-44ce-9bf5-e676bb6cfa23','2025-02-20 12:57:18.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('c84923b2-131c-4389-a0ac-12e958e24e82','2025-02-05 18:43:30.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-05 17:44:30.358818','2025-02-05 17:44:30.358863'),('c87ab414-b2a3-456f-aad3-9448b284ac34','2025-02-07 12:20:47.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-07 12:21:37.399583','2025-02-07 12:21:37.399583'),('c89a7fbd-038f-409d-bbae-84456c63f963','2025-02-10 10:05:53.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-10 10:05:55.708739','2025-02-10 10:05:55.708739'),('c904ec06-20b3-42ec-9e77-2b1f220966a8','2025-02-05 16:51:13.000000',36,267,'Abertura efetuada',0,1,4,'TFP5235000453',1,'2025-02-05 16:51:14.347271','2025-02-05 16:51:14.347271'),('c93d83a3-1ed9-4570-acdc-8c60d6b7817f','2025-02-28 08:52:30.000000',0,-1760361464,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('c9432070-0441-4771-bfe9-89fcecdfb2aa','2025-02-20 16:27:17.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('c943e32b-4b43-4696-ad7c-40bff5bd20d3','2025-03-05 10:36:40.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('c9466761-404e-487e-b053-1e6d413fc545','2025-02-12 11:42:24.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-12 11:42:27.828169','2025-02-12 11:42:27.828169'),('ca06f0eb-b8c7-40d8-b4ed-3aa0b09e998f','2025-02-10 11:37:57.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-10 11:38:00.197284','2025-02-10 11:38:00.197285'),('ca46537c-d0b4-4c73-87ee-155bbd51ed61','2025-02-10 11:37:54.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-10 11:37:58.569301','2025-02-10 11:37:58.569301'),('ca9dc1e1-e4e0-47ce-b82e-6f8c04ed056f','2025-02-20 12:52:53.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('cb1e18ac-7be0-47c1-89d5-e3a54601c7b3','2025-03-05 10:36:40.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('cb6bdb6b-6a75-4844-a0d0-83d4a1371670','2025-02-28 09:06:41.000000',0,-1373365240,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('cbab1269-5beb-413b-bff4-0ac0d12a1a77','2025-02-10 10:05:47.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-10 10:05:55.187197','2025-02-10 10:05:55.187198'),('cbef9352-bc9f-4fa9-ad9a-cc49a76ccd80','2025-03-05 10:16:50.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('cc16d994-0308-45ba-9528-ba523da4a8fe','2025-02-10 16:51:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-10 16:51:09.210677','2025-02-10 16:51:09.210678'),('cc9eebf5-aed0-4fe9-a3a5-e6bd8dbded66','2025-02-12 12:11:43.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:11:44.405627','2025-02-12 12:11:44.405628'),('ccdbf8ac-03ab-4d2e-9fc8-67dbc48450fd','2025-02-10 09:22:40.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 09:22:41.176496','2025-02-10 09:22:41.176496'),('ce0562de-654d-47cd-a12d-31411c668b4c','2025-02-07 12:21:34.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-07 12:21:36.750465','2025-02-07 12:21:36.750465'),('ce33a551-35ae-4c0c-9ba3-2b106ce34524','2025-02-12 11:42:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',NULL,'2025-02-12 11:42:29.000000','2025-02-12 11:42:29.000000'),('ce7eeefe-2d39-477f-9e08-1e6f882fd4fe','2025-02-06 17:29:11.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-06 17:29:13.178962','2025-02-06 17:29:13.178963'),('ce8ad2d0-e40c-43a9-8534-50bfb930a7a3','2025-03-10 17:10:14.000000',5,291,'Abertura efetuada',0,2,4,'AJYS223460212',0,'2025-03-10 17:10:16.732637','2025-03-10 17:10:16.732637'),('ced6cb26-461a-4b7b-9aa1-924249712db0','2025-03-05 09:51:46.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('cee89f14-ddd0-4330-9cfb-58584e29c954','2025-02-06 10:55:37.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-06 10:57:17.505696','2025-02-06 10:57:17.505838'),('cf02e6cf-6aab-4067-b7e0-66a581496676','2025-03-05 11:31:15.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-03-05 11:31:16.480655','2025-03-05 11:31:16.480655'),('cf6b2bec-addc-4ffa-8235-0f59c15cfe5a','2025-02-10 16:48:22.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-10 16:48:24.728540','2025-02-10 16:48:24.728541'),('cf9e8a82-aef6-4d1c-924c-73558b7eed8f','2025-02-07 16:28:03.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-07 16:28:05.286563','2025-02-07 16:28:05.286563'),('cfc18323-a1f8-4a4a-8d4f-0853e3afeeaa','2025-02-27 18:25:13.000000',0,2031599624,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:25:15.182445','2025-02-27 18:25:15.182445'),('cfccb922-ea31-40b6-b2a3-1e0957200b3e','2025-02-07 10:21:46.000000',0,9124358,'Não registrado',27,1,4,'TFP5235000318',0,'2025-02-07 10:21:46.632224','2025-02-07 10:21:46.632224'),('cff00a75-fe9c-4c78-a61b-670067cf1a19','2025-02-07 15:47:11.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-07 15:47:13.052394','2025-02-07 15:47:13.052394'),('d0deebfb-8403-4138-8b01-17e9398e17a0','2025-02-05 17:01:27.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',NULL,'2025-02-05 17:01:27.000000','2025-02-05 17:01:27.000000'),('d0f5078f-73bf-45af-90ce-d2fe64b8a050','2025-02-10 16:54:00.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-10 16:54:02.039904','2025-02-10 16:54:02.039904'),('d0fcc119-96a4-4d20-a2cf-346fafaa2251','2025-02-20 12:55:22.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('d113a56c-7ee4-4bd6-93f5-187227395570','2025-02-05 18:00:41.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-05 17:01:29.180892','2025-02-05 17:01:29.180892'),('d12b98a3-efdb-40dd-8507-5b24bc28f243','2025-02-20 12:00:28.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('d130740d-345a-4a13-a8ae-b4094b219aa1','2025-02-10 17:49:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-10 17:49:10.242143','2025-02-10 17:49:10.242143'),('d1cc3c05-0a38-4065-8da6-e2bf25dfa579','2025-02-12 11:38:57.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-12 11:39:00.912023','2025-02-12 11:39:00.912023'),('d1cc4bf9-49f7-4d1c-beb5-85e3b3a61ed7','2025-02-05 16:20:06.000000',0,267,'Não registrado',27,1,4,'TFP5235000453',0,'2025-02-05 16:20:06.389409','2025-02-05 16:20:06.389410'),('d242ca31-1284-4719-abdc-8c890ae52fe2','2025-02-20 12:53:37.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('d2609d7b-6357-4313-a6df-485142978c92','2025-02-11 09:36:32.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',NULL,'2025-02-11 09:36:34.000000','2025-02-11 09:36:34.000000'),('d290a9be-39fe-4f3f-866e-2d039d59da96','2025-02-06 17:28:25.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-06 17:29:12.723042','2025-02-06 17:29:12.723042'),('d29e4edb-9c17-4459-a367-f416c370c5b9','2025-02-20 12:18:45.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('d3368073-b0fd-4610-9813-78bd1d7a5032','2025-02-12 10:59:01.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 10:59:02.617674','2025-02-12 10:59:02.617675'),('d3c93c4a-7d80-4c17-a5da-e12e23313dc2','2025-03-05 11:09:33.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('d45beaee-63d4-4293-be11-6d4a5c6a2afc','2025-02-12 12:25:50.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:25:51.233121','2025-02-12 12:25:51.233122'),('d464cc59-3155-47f1-a8d4-3be1be2e1d0d','2025-02-10 16:51:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-10 16:51:10.761766','2025-02-10 16:51:10.761766'),('d48a071a-674e-4494-9990-ac17e3daa67c','2025-02-07 10:15:13.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-07 10:15:23.539981','2025-02-07 10:15:23.539982'),('d53667ac-1cc3-4c7a-ac53-5f0d858c9fe3','2025-02-20 17:23:56.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('d5761494-37b8-4c0d-97ae-1f369cfb9b36','2025-02-10 16:43:58.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000453',0,'2025-02-10 16:44:00.278941','2025-02-10 16:44:00.278941'),('d5a2674e-bbe1-4669-9ba2-0ec773d9a612','2025-02-06 17:28:25.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-06 17:29:12.870576','2025-02-06 17:29:12.870577'),('d5cf6081-dc22-4961-8500-9e6d7a36e637','2025-03-05 13:15:21.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-03-05 13:15:20.186192','2025-03-05 13:15:20.186193'),('d5e221c9-28cf-483d-96ab-c33fb1a92bed','2025-02-07 15:40:38.000000',0,10892253,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-07 15:40:39.239369','2025-02-07 15:40:39.239369'),('d615b3f8-03af-4bd9-9634-045c408f511c','2025-03-05 09:27:56.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000437',2,'2025-03-05 09:27:58.207752','2025-03-05 09:27:58.207752'),('d63e2bb5-8322-45b2-b9a9-4ef3eb4b60d1','2025-02-12 12:11:10.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:11:11.471427','2025-02-12 12:11:11.471427'),('d657005b-3178-4f37-b260-a7648dfb99b7','2025-02-05 21:36:42.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-05 20:37:30.168211','2025-02-05 20:37:30.168211'),('d66e8aa4-c907-42fe-b71d-78983e72ee40','2025-03-05 10:17:46.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('d6cb81a1-e010-43d7-8281-985f986dc349','2025-02-10 11:36:28.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-10 11:37:59.752578','2025-02-10 11:37:59.752578'),('d802f65c-d16d-4ecb-8b2a-a381e9edc45d','2025-02-10 16:46:56.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:46:59.707951','2025-02-10 16:46:59.707951'),('d8dba3ad-90cb-4029-b1cf-7c363a611223','2025-02-11 09:36:32.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-11 09:36:34.235853','2025-02-11 09:36:34.235853'),('d9a046cc-8066-4c86-a5ca-1984313c5049','2025-02-07 10:15:13.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-07 10:15:24.431672','2025-02-07 10:15:24.431672'),('d9a7a39e-7f43-4dcb-8502-4c380bb30c79','2025-02-10 16:51:08.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-10 16:51:11.002664','2025-02-10 16:51:11.002665'),('d9bb10b8-ddf4-4d48-80c0-7d13bdce7f77','2025-02-12 12:11:14.000000',39,10803847,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:11:15.919119','2025-02-12 12:11:15.919119'),('d9c19e44-bc51-41c9-a45c-caad5c5b0e64','2025-02-05 16:51:26.000000',36,267,'Acesso não autorizado',23,2,4,'TFP5235000453',0,'2025-02-05 16:51:27.215559','2025-02-05 16:51:27.215559'),('d9d4bccf-741e-4291-a829-9f2c9d4da553','2025-02-18 12:45:33.000000',159,10812199,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('d9f684b8-520e-4e32-94e5-49a2216b3f0b','2025-02-10 10:05:46.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-10 10:05:55.185737','2025-02-10 10:05:55.185767'),('da976625-350e-4bed-b521-0ba129f49753','2025-02-07 16:27:17.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-07 16:28:04.653360','2025-02-07 16:28:04.653360'),('dbb2a093-1ad6-47d4-865b-c367142b3cfc','2025-03-05 10:37:17.000000',0,NULL,'O ponto de entrada auxiliar está em curto-circuito',221,1,200,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('dbd69a7f-f091-4431-a3bb-c6782f25250d','2025-02-12 12:11:18.000000',39,10803847,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 12:11:20.010412','2025-02-12 12:11:20.010412'),('dc4fb954-33c2-4e48-89ee-73d6f7458a9c','2025-02-12 14:54:41.000000',101,10891726,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-12 14:54:42.947045','2025-02-12 14:54:42.947045'),('dcffb220-5a18-49e2-ad7d-60185a53cfc1','2025-02-07 16:11:50.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-07 16:11:51.652570','2025-02-07 16:11:51.652571'),('dd072c0e-2f3b-4fd8-817b-020080d4670f','2025-02-12 11:31:54.000000',0,9124357,'Não registado',27,1,4,'TFP5235000422',0,'2025-02-12 11:31:54.602416','2025-02-12 11:31:54.602416'),('dd40119b-e727-466f-9450-6ab004e0a345','2025-02-27 18:14:05.000000',0,985967112,'Não registado',27,2,4,'TFP5235000318',1,'2025-02-27 18:14:07.153888','2025-02-27 18:14:07.153888'),('dd559701-58a8-49b6-aea9-5b9d1ae5d89f','2025-02-07 15:40:40.000000',0,10892253,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-07 15:40:42.483920','2025-02-07 15:40:42.483920'),('dd7c8589-390f-4424-83cc-4e7e06d53f69','2025-02-20 12:53:27.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('dd990c26-b608-49e3-87c1-fc4e4dbb27a9','2025-02-10 09:55:58.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-10 09:55:59.591097','2025-02-10 09:55:59.591097'),('de13d585-6c16-463d-943b-5c00e5605d2b','2025-02-12 14:42:06.000000',38,10960269,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 14:42:07.603135','2025-02-12 14:42:07.603136'),('de2d66c0-da6e-4958-b45d-740e9d3cdcf1','2023-12-10 03:34:07.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('de352c7f-ab40-47c6-b81c-ba6eceae4bad','2025-02-12 10:56:30.000000',86,10958427,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-12 10:56:31.709317','2025-02-12 10:56:31.709317'),('de7afd1c-16bd-465e-a415-5626fef4d3fe','2025-02-12 11:28:47.000000',0,9124357,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 11:28:48.027651','2025-02-12 11:28:48.027651'),('dea14d93-08f3-407a-89cb-5a918a4dce83','2025-02-10 16:44:05.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-10 16:44:06.288145','2025-02-10 16:44:06.288145'),('deb6eea5-e506-4bae-ad98-20a9442a6b12','2025-02-10 16:50:23.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-10 16:51:08.774318','2025-02-10 16:51:08.774365'),('dfece88d-c69b-4feb-a37d-626b539cee20','2025-02-07 15:41:00.000000',0,10892253,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-07 15:41:00.414754','2025-02-07 15:41:00.414754'),('e033bf6d-7f9d-4a46-94db-50bebcff81fc','2025-02-07 01:20:46.000000',0,0,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-06 17:21:26.385513','2025-02-06 17:21:26.385513'),('e07d9bf5-75f0-4a3c-8b00-b64075cbdcc9','2025-03-05 11:27:26.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('e097eb55-9852-4ce2-82ac-9e6019aedbd1','2025-02-10 08:51:29.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000422',2,'2025-02-10 08:51:42.069756','2025-02-10 08:51:42.069756'),('e124df43-ccdc-437e-bd9d-b3a2af4ba31e','2025-03-06 10:59:59.000000',0,-454403832,'Não registado',27,1,4,'TFP5235000453',0,'2025-03-06 10:59:57.751898','2025-03-06 10:59:57.751898'),('e1670b89-2c8d-4a74-a04a-e53deb00250c','2025-02-06 17:29:12.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-06 17:29:14.035137','2025-02-06 17:29:14.035137'),('e1cb942a-4503-4110-87a7-932bb682e0ff','2025-02-27 18:25:23.000000',0,1421597192,'Não registado',27,1,4,'TFP5235000318',1,'2025-02-27 18:25:24.938496','2025-02-27 18:25:24.938496'),('e2bb11b6-479c-41b7-bb99-aab613a186f0','2025-02-12 11:35:19.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-12 11:35:19.847293','2025-02-12 11:35:19.847293'),('e30233f4-b5d9-4f1e-865f-c14e176f0835','2025-02-12 11:39:20.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000422',2,'2025-02-12 11:42:29.267177','2025-02-12 11:42:29.267177'),('e32b4d7a-5300-4abe-91e1-a1b23667f95a','2025-02-07 15:13:14.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-07 15:31:31.666259','2025-02-07 15:31:31.666259'),('e3383a51-0a14-4598-be10-4f3da931458a','2023-12-10 03:34:09.000000',0,NULL,'Abertura efetuada remotamente',8,2,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('e4874cfc-745b-41fb-958b-1fb9a6b9cdc2','2025-02-12 11:26:44.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:26:46.327974','2025-02-12 11:26:46.327974'),('e49a5d33-35ac-43ad-b045-623c957bb217','2025-02-05 15:50:34.000000',0,NULL,'Iniciar dispositivo',206,0,200,'TFP5235000319',NULL,'2025-02-05 16:09:57.000000','2025-02-05 16:09:57.000000'),('e4cbace8-90f4-4327-b4b0-5f2a5a8ed995','2023-12-10 02:42:44.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('e5061b44-2412-4856-8780-d37be218d4a4','2025-02-12 12:04:34.000000',0,9124357,'Não registado',27,2,4,'TFP5235000422',0,'2025-02-12 12:04:34.966374','2025-02-12 12:04:34.966374'),('e56d20dd-78b2-4d57-ba8d-21d3a6cb82d4','2025-02-12 12:04:16.000000',0,9124357,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 12:04:18.055966','2025-02-12 12:04:18.055966'),('e5bde3dc-f235-4803-a14f-0178bdedd32a','2025-02-18 12:44:30.000000',0,NULL,'Desconectado do ponto de entrada auxiliar',220,1,200,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('e5c78af6-eb0c-4dde-b04b-36f1fa0fba0b','2025-02-07 15:37:36.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:37:37.262755','2025-02-07 15:37:37.262755'),('e6a1b0f4-de8c-4485-aa48-c3b7a9daaf70','2025-02-07 10:15:22.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-07 10:15:23.855055','2025-02-07 10:15:23.855055'),('e6c92f34-dcb8-45ac-a2a4-75ded30ab043','2025-02-10 16:46:12.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:46:12.977127','2025-02-10 16:46:12.977127'),('e72930fe-9f75-4d8f-ba78-51b5348c5078','2025-02-10 16:50:22.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-10 16:51:10.684713','2025-02-10 16:51:10.684713'),('e7c2021d-fd93-4ca1-b4de-370f2cf2f2e3','2025-02-12 12:09:24.000000',0,9124361,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 12:09:25.087971','2025-02-12 12:09:25.087971'),('e7d92028-c20e-42b4-b523-b25dd9e142de','2025-02-07 16:14:57.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 16:14:58.693160','2025-02-07 16:14:58.693160'),('e7f1490c-bb2d-4f47-afe8-f7255cb29f38','2025-02-05 17:59:00.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-05 17:01:28.864964','2025-02-05 17:01:28.864964'),('e7f7ffe8-e12c-4e67-8171-234aebedc95a','2025-02-05 20:37:24.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',2,'2025-02-05 20:37:31.192049','2025-02-05 20:37:31.192049'),('e7f95efc-f65f-4205-9b85-9a4e82109d9b','2025-03-05 13:29:19.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000422',1,'2025-03-05 13:29:19.294839','2025-03-05 13:29:19.294839'),('e855c97b-f1cc-4d7b-8590-71644baf6d11','2023-12-10 02:42:43.000000',0,NULL,'Habilitar saída auxiliar remotamente',12,2,200,'TFP5235000422',NULL,'2025-02-06 17:22:16.000000','2025-02-06 17:22:16.000000'),('e8a37d31-0dc9-4076-a5a1-75efb12eb9a6','2025-02-12 12:12:38.000000',0,10807101,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:12:40.606674','2025-02-12 12:12:40.606674'),('e9305624-e491-4ae9-8809-8e10f37fc95c','2023-12-10 03:34:05.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('e95674ba-d6e9-45a2-b9b9-a069dea5e7c4','2025-02-05 16:45:08.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-05 16:45:08.976239','2025-02-05 16:45:08.976239'),('e9731baf-574c-4dfd-bd2e-101ebef97d8f','2025-02-12 12:10:29.000000',32,9127894,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:10:30.655656','2025-02-12 12:10:30.655656'),('e99e8e4b-54b4-4862-9c4a-60978f047e14','2025-02-05 17:09:17.000000',38,264,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-05 17:09:18.785740','2025-02-05 17:09:18.785741'),('ea01044a-454e-4327-ab99-0d2ce0a2264d','2025-02-07 15:06:58.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-07 15:07:00.435925','2025-02-07 15:07:00.435925'),('ea12e97e-2b3b-43b2-b98c-0c18ea9ef604','2025-03-05 10:32:59.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('eac1494c-d2cb-4d0d-aa04-ccf5e6ace2bc','2025-03-05 13:29:34.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-03-05 13:29:34.167237','2025-03-05 13:29:34.167237'),('eb071e42-3e2e-46c2-b425-28b0f58a277e','2025-02-10 16:48:48.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000437',1,'2025-02-10 16:48:50.002525','2025-02-10 16:48:50.002526'),('ebb92cc8-c5bd-414b-b3d4-1b7c6c7ad319','2025-02-10 16:46:19.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:46:20.210226','2025-02-10 16:46:20.210226'),('ebc8b083-488a-4547-a342-4ed7ea65cc34','2025-02-20 11:53:33.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('ebe62f59-4c17-46a4-bac0-47081b8d4ff9','2025-02-07 12:21:36.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-07 12:21:37.720856','2025-02-07 12:21:37.720856'),('ecf15728-038f-42ba-9573-d847b0098c82','2025-02-12 11:22:15.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:22:16.879766','2025-02-12 11:22:16.879766'),('ecf56d4f-e892-4e59-a4b9-1e5791a1d564','2025-03-10 16:58:18.000000',8,293,'Acesso não autorizado',23,1,4,'AJYS223460212',0,'2025-03-10 16:58:20.606850','2025-03-10 16:58:20.606851'),('ed929a10-5251-4c70-83f5-fb0b8119bf3f','2025-02-12 11:29:15.000000',0,9124357,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 11:29:17.507251','2025-02-12 11:29:17.507251'),('edb3618d-3631-446e-a436-b7e794b8b1db','2025-02-05 16:19:21.000000',0,267,'Não registrado',27,1,4,'TFP5235000453',0,'2025-02-05 16:19:21.676209','2025-02-05 16:19:21.676209'),('ef3cf523-0fbb-431a-8fe3-64723107b3be','2025-02-07 09:36:59.000000',0,6586851,'Não registrado',27,2,4,'TFP5235000453',0,'2025-02-07 09:37:00.151760','2025-02-07 09:37:00.151761'),('ef683743-529e-4e73-b73f-d246f8ad2f6c','2025-02-10 16:46:15.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-10 16:46:18.111304','2025-02-10 16:46:18.111304'),('ef780e01-6829-4b31-8833-03e6f37e63a6','2025-02-28 10:34:34.000000',0,422572552,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('effab281-6821-47e3-bc31-cd93e5a5325c','2025-02-07 16:14:29.000000',0,279,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-07 16:14:29.500595','2025-02-07 16:14:29.500595'),('f001a66d-6381-4f31-89d9-93eeded7d9f3','2025-02-07 16:14:03.000000',8,9124358,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-07 16:14:04.335956','2025-02-07 16:14:04.335956'),('f0106e40-fe9e-47d5-8dfa-4db391e49d0b','2025-02-05 17:09:21.000000',38,264,'Abertura efetuada',0,2,4,'TFP5235000453',0,'2025-02-05 17:09:22.267716','2025-02-05 17:09:22.267716'),('f0aa2e54-3a88-4566-8011-364634459302','2025-03-10 16:30:01.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'AJYS223460212',2,'2025-03-10 16:30:07.210180','2025-03-10 16:30:07.210227'),('f0b2dfef-add9-469a-a2ed-d252b40f6ceb','2023-12-10 03:33:53.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',NULL,'2025-02-05 15:05:05.000000','2025-02-05 15:05:05.000000'),('f0f36f70-7c50-41b7-9e7d-bc5efb8cce88','2025-02-27 17:01:11.000000',0,-1368151032,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-27 17:01:14.356308','2025-02-27 17:01:14.356308'),('f11524e5-0ab6-47bc-998e-3eaf68b3ab76','2025-02-12 10:47:11.000000',0,NULL,'Abertura efetuada remotamente',8,1,200,'TFP5235000453',2,'2025-02-12 10:47:11.651448','2025-02-12 10:47:11.651448'),('f1252972-db48-4acf-a968-578c7c6fbd58','2025-02-07 16:14:01.000000',8,9124358,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 16:14:02.630386','2025-02-07 16:14:02.630386'),('f1674706-35de-4cf0-b499-8c970d11281a','2025-02-20 17:14:13.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000437',NULL,'2025-02-25 11:29:32.000000','2025-02-25 11:29:32.000000'),('f218943e-4f4c-40e9-8721-256fecf99b2f','2025-02-20 12:01:20.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('f2b83247-b16f-4f88-bce5-0b3096541182','2025-02-07 16:28:03.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-07 16:28:04.971386','2025-02-07 16:28:04.971386'),('f32a206f-42bc-4d41-ae53-ab2d11a495d3','2025-02-07 15:39:38.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:39:39.759039','2025-02-07 15:39:39.759039'),('f37d333b-3af6-42ad-9e73-6a6c1fa43f42','2025-02-18 13:17:04.000000',159,10812199,'Abertura efetuada',0,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('f3ee0d0d-0850-4af0-9dfa-d457a257361d','2025-02-12 11:00:04.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 11:00:06.191481','2025-02-12 11:00:06.191481'),('f3ee4e5b-a344-4b4f-ad10-27f8049f596c','2025-02-12 11:31:55.000000',0,9124357,'Não registado',27,1,4,'TFP5235000437',1,'2025-02-12 11:31:56.411678','2025-02-12 11:31:56.411678'),('f4189b69-4e90-4ff1-8cdc-e6d801bedf95','2025-03-05 14:17:35.000000',0,393806088,'Não registado',27,1,4,'TFP5235000437',1,'2025-03-05 14:17:36.598578','2025-03-05 14:17:36.598578'),('f442de95-3449-4f82-87fa-6b3a941ca000','2025-02-20 11:55:01.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('f4445d37-29a5-46fd-a5c5-7b9aa491690a','2025-02-10 09:58:24.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000437',1,'2025-02-10 09:58:25.824653','2025-02-10 09:58:25.824653'),('f4968cbb-77e3-4c7f-abcf-f3706abe493c','2025-02-07 15:34:53.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',NULL,'2025-02-07 15:34:54.000000','2025-02-07 15:34:54.000000'),('f49e448e-bb0a-4861-a5b7-c5a068c49c5c','2025-02-10 09:24:56.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 09:24:58.590625','2025-02-10 09:24:58.590625'),('f4a6635b-253d-475c-808e-a51d66cb91af','2025-02-20 16:26:40.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('f5353149-ee09-4cee-86d1-e24d11c97241','2025-02-12 11:31:57.000000',0,9124357,'Não registado',27,1,4,'TFP5235000318',0,'2025-02-12 11:31:58.691275','2025-02-12 11:31:58.691276'),('f57d928c-f79a-4ced-a189-bc6ec22247f3','2025-02-12 11:32:00.000000',0,9124357,'Não registado',27,1,4,'TFP5235000453',0,'2025-02-12 11:32:01.440110','2025-02-12 11:32:01.440110'),('f5bb11e5-0127-4895-91ef-6a9aea46563a','2025-02-05 16:59:45.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000319',NULL,'2025-02-05 17:01:27.000000','2025-02-05 17:01:27.000000'),('f5c2eb53-4be2-4ad9-9208-9b45f8bb9dc5','2025-02-12 11:42:28.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',NULL,'2025-02-12 11:42:30.000000','2025-02-12 11:42:30.000000'),('f5ea46b1-e877-41fb-aa9e-d78fb339b642','2025-02-12 12:08:11.000000',0,9124358,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:08:13.658679','2025-02-12 12:08:13.658679'),('f60c0e09-d616-4e75-adf4-f03f5af5e18c','2025-02-05 16:22:16.000000',36,267,'Período de tempo inválido',22,1,4,'TFP5235000453',0,'2025-02-05 16:22:17.331723','2025-02-05 16:22:17.331723'),('f612c39d-f5d5-486b-9e3a-40856dbe9b3c','2025-02-12 12:09:19.000000',24,9124361,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:09:20.403036','2025-02-12 12:09:20.403036'),('f64f979f-a60a-4258-b956-45424d7eade2','2025-02-12 12:11:44.000000',96,10891989,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:11:45.930750','2025-02-12 12:11:45.930750'),('f6820201-8190-4437-b6d3-6c02e93532ec','2025-02-28 11:13:20.000000',0,9124357,'Não registado',27,1,4,'TFP5235000453',NULL,'2025-03-05 13:15:10.000000','2025-03-05 13:15:10.000000'),('f6f93289-06f4-4e27-83b1-25534291cfbc','2025-02-12 11:35:17.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000318',2,'2025-02-12 11:35:19.351618','2025-02-12 11:35:19.351618'),('f8307dc5-aae1-47c1-89ac-9d8d32a229ef','2025-02-07 15:47:05.000000',95,10892253,'Abertura efetuada',0,1,4,'TFP5235000319',1,'2025-02-07 15:47:06.234125','2025-02-07 15:47:06.234125'),('f8496b82-8509-49e2-97f5-64d309d70742','2025-02-07 15:41:05.000000',95,10892253,'Abertura efetuada',0,2,4,'TFP5235000422',0,'2025-02-07 15:41:06.013423','2025-02-07 15:41:06.013423'),('f8f63b67-c665-42c0-a9c4-91518b686698','2025-02-10 10:02:13.000000',95,10892253,'Período de tempo inválido',22,1,4,'TFP5235000319',1,'2025-02-10 10:02:14.989658','2025-02-10 10:02:14.989658'),('fa24c41a-fa98-4f28-9df4-7b1d7c2c60c6','2025-02-06 11:54:53.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000318',2,'2025-02-06 10:57:19.079208','2025-02-06 10:57:19.079209'),('fa7c4b05-7a00-4a33-99ba-a9447a1309c8','2025-02-12 12:08:49.000000',20,9124360,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 12:08:50.363430','2025-02-12 12:08:50.363430'),('fad6a38c-7823-48c5-a6ac-4c7bc4f2ed8b','2025-02-12 12:11:37.000000',0,10891989,'Não registado',27,1,4,'TFP5235000319',1,'2025-02-12 12:11:39.734680','2025-02-12 12:11:39.734680'),('fad9002c-3cac-419c-9ede-204e76c69d1c','2025-02-10 17:49:06.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000437',2,'2025-02-10 17:49:07.836520','2025-02-10 17:49:07.836520'),('fb6ab421-5d3a-4b13-b73d-e120fc60ea7a','2025-02-12 12:13:27.000000',36,10920174,'Abertura efetuada',0,1,4,'TFP5235000453',0,'2025-02-12 12:13:28.358984','2025-02-12 12:13:28.358984'),('fb731fad-35bc-49ab-8802-34cc0222e6d3','2025-02-07 10:15:20.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-07 10:15:22.609545','2025-02-07 10:15:22.609545'),('fbac1a77-3112-431e-bdac-5b54b71a4d59','2025-02-06 10:57:16.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000453',2,'2025-02-06 10:57:18.137618','2025-02-06 10:57:18.137618'),('fbd6ef72-18c5-41f1-a68b-3bf9b57e622b','2025-02-10 17:22:19.000000',0,NULL,'Rede desconectada',105,0,200,'TFP5235000453',NULL,'2025-02-11 09:36:34.000000','2025-02-11 09:36:34.000000'),('fc4cb1e5-a26d-4523-a4d6-13e1cdaa1e44','2025-02-12 12:16:32.000000',221,10829761,'Abertura efetuada',0,1,4,'TFP5235000422',0,'2025-02-12 12:16:33.470201','2025-02-12 12:16:33.470201'),('fc5cc4cc-86f9-4a2a-8431-ee37cec91583','2025-02-12 11:30:17.000000',5,9124357,'Abertura efetuada',0,1,4,'TFP5235000318',0,'2025-02-12 11:30:18.720764','2025-02-12 11:30:18.720764'),('fce4398c-1c70-4236-aeb3-20964f1cdfd3','2025-03-06 11:00:16.000000',0,NULL,'Desconhecido',20,1,200,'TFP5235000453',0,'2025-03-06 11:00:14.923063','2025-03-06 11:00:14.923063'),('fdaa602f-5932-4904-b667-3d54eab3fc3c','2025-02-20 11:41:50.000000',132,10892784,'Abertura efetuada',0,2,4,'TFP5235000318',NULL,'2025-02-25 11:29:34.000000','2025-02-25 11:29:34.000000'),('fe316c69-1bb8-48d2-a873-b96e0a8567a8','2025-02-28 11:11:42.000000',0,1525187336,'Não registado',27,1,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('fe8e3480-66b5-462d-96b3-11fba7935aa1','2025-02-12 11:39:01.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000422',2,'2025-02-12 11:39:03.053642','2025-02-12 11:39:03.053642'),('ff15a898-59d0-49f9-909d-22ef3a613e5b','2025-02-28 11:11:32.000000',0,-935019768,'Não registado',27,2,4,'TFP5235000422',NULL,'2025-03-05 13:27:54.000000','2025-03-05 13:27:54.000000'),('ff615205-e186-4169-8c2a-cf409b54476b','2025-02-12 12:07:50.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000319',1,'2025-02-12 12:07:52.613531','2025-02-12 12:07:52.613532'),('ff738695-1c19-49b0-97f6-7a59bbde44b6','2025-02-05 23:57:38.000000',0,0,'Rede desconectada',105,0,200,'TFP5235000453',2,'2025-02-05 16:00:05.291193','2025-02-05 16:00:05.291255'),('ff7b3717-8172-4641-8450-8870b1708733','2025-02-06 10:57:16.000000',0,NULL,'Conectado ao servidor com sucesso',214,0,200,'TFP5235000319',2,'2025-02-06 10:57:18.137559','2025-02-06 10:57:18.137559'),('ff7b72d8-9951-4531-a6f2-eb3bf188d38a','2025-02-12 12:26:40.000000',221,10829761,'Acesso não autorizado',23,1,4,'TFP5235000318',0,'2025-02-12 12:26:41.355963','2025-02-12 12:26:41.355964'),('ff7fb2fd-fb82-4a7a-a88e-ae79ea2c53b8','2025-02-28 08:50:51.000000',0,-4322808,'Não registado',27,2,4,'TFP5235000318',0,'2025-02-28 08:50:52.767590','2025-02-28 08:50:52.767591'),('ff8ab7dc-bd64-4a26-939c-e2292707bfd0','2025-03-06 10:58:16.000000',132,10892784,'Abertura efetuada',0,1,4,'TFP5235000453',1,'2025-03-06 10:58:14.565361','2025-03-06 10:58:14.565361'),('ff92e005-ffe1-4e38-ae1c-4bb360591da4','2025-02-10 16:29:08.000000',5,9124357,'Acesso não autorizado',23,1,4,'TFP5235000437',1,'2025-02-10 16:29:09.267182','2025-02-10 16:29:09.267182');
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
INSERT INTO `professions` VALUES ('08dd49b2-c23c-492b-8ef4-4d728517911c',1,NULL,'Profissão Geral');
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
  `TimeReboot` time DEFAULT NULL,
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
INSERT INTO `useractivesessions` VALUES ('08dd5fc4-e0eb-4494-8ae4-a347556092d7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImYzNmI4MThkLWI4MmMtNDFmOC04NTJhLWI3ZTZlYzc3MGFkMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQHNpc25pZC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc0MTYxMjUzNH0.CwvVi_1xfQJNf7N7eO5A9qSdtXWK1rBM8IC2PADO8q4','501488243','2025-03-10 13:15:34.812879'),('08dd5fde-bd3d-4e1a-8694-4ce8f89c06c6','f36b818d-b82c-41f8-852a-b7e6ec770ad0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImYzNmI4MThkLWI4MmMtNDFmOC04NTJhLWI3ZTZlYzc3MGFkMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQHNpc25pZC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTc0MTYyMzY0MX0.Jxo2rJpMU_7VgSwk0tSXxdcM_yS-JpH-zyRDjSmcpl4','501488243','2025-03-10 16:20:41.870428'),('08dd607c-cac1-4403-88a9-e3bf53232e94','2a11069b-085a-452b-b6a3-cacf7d5d0360','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjJhMTEwNjliLTA4NWEtNDUyYi1iNmEzLWNhY2Y3ZDVkMDM2MCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJuaWRncm91cCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQG5pZGdyb3VwLnB0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3NDE2OTE1MjR9.2A92TBdq6sf5oxrzyX2ba2QGPHOA_q-uJdw55dDAUNw','501488243','2025-03-11 11:12:05.009647');
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
INSERT INTO `userroles` VALUES ('2a11069b-085a-452b-b6a3-cacf7d5d0360','50dcbe53-b050-486a-b35f-5d21e56b9686'),('b16fe40c-5184-4386-b3ac-fd5519a77956','50dcbe53-b050-486a-b35f-5d21e56b9686'),('bf02de50-28ef-4595-b653-6b970f66288f','50dcbe53-b050-486a-b35f-5d21e56b9686'),('f36b818d-b82c-41f8-852a-b7e6ec770ad0','50dcbe53-b050-486a-b35f-5d21e56b9686');
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
INSERT INTO `users` VALUES ('2a11069b-085a-452b-b6a3-cacf7d5d0360',NULL,NULL,'nidgroup','NIDGROUP','admin@nidgroup.pt','ADMIN@NIDGROUP.PT',1,'AQAAAAIAAYagAAAAEPqG7/NTluH+9T4aRlpAmgLNTcTM2VyFkv7JVVwCBgbjz4HO5EO+/OLpH3GxnXN8qg==','','2264d3d0-e091-473e-84ca-f067c58e86f7',NULL,0,0,NULL,0,0),('b16fe40c-5184-4386-b3ac-fd5519a77956','Valter Santos',NULL,'valter','VALTER','valter.santos@bio2.pt','VALTER.SANTOS@BIO2.PT',1,'AQAAAAIAAYagAAAAEFX9rtSI/f6ZGoUQxsVIieMK3YFC6wKkIuQWYAEWCJIsCNYlYa4tWxjcIzuFy+Yq+w==','MAP5ZJO5RM4QRFUL25DRY6QFEMVCR4WW','3793ff35-ae3a-486b-81ea-0f56719fbca4',NULL,0,0,NULL,1,0),('bf02de50-28ef-4595-b653-6b970f66288f','Leila Marques',NULL,'leila','LEILA','leila.marques@bio2.pt','LEILA.MARQUES@BIO2.PT',1,'AQAAAAIAAYagAAAAECL19c74NLuIzq/wqL+1wpeC86+jP3sieg3zIct64bZJZPrnd7yWp+pG8gNBXvLSUQ==','OXA2NNMX6EBP2V7ESGRRKZMCVCKITM45','3b29d889-b52a-4725-afc7-dcb8f72cac85',NULL,0,0,NULL,1,0),('f36b818d-b82c-41f8-852a-b7e6ec770ad0','Administrador',NULL,'admin','ADMIN','admin@sisnid.com','ADMIN@SISNID.COM',1,'AQAAAAIAAYagAAAAECpl3rJeAlmMhJbhMYK1zOULxz2jBztFgJYTQWLS3hPc9q2R/BHo9mSGJZeXvfqqhw==','PMUJ4MJHRZDFPDXF4RG3H2NIAOSRQUJR','60e347a0-4838-42f5-a315-3947b0d7218a',NULL,0,0,NULL,0,0);
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
INSERT INTO `userstasks` VALUES ('0285a9c7-7eab-40b3-9e41-f01189f617ff','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 17:08:55.302303'),('02bf6574-dfa4-4643-a45d-3d405fc3c2a0','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','externalentitytype',1,'Criação do tipo para Empresa Externa Teste','2025-03-10 17:11:24.199109'),('0626d635-a9e3-49d8-b55d-d3359752bcf0','b16fe40c-5184-4386-b3ac-fd5519a77956','valter','auth',1,'Utilizador com sessão iniciada','2025-02-19 15:46:07.397095'),('16ff9819-0185-4495-b65d-a0ffd1cf1c1f','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-03-10 16:22:16.201263'),('1bfd0e3c-df2c-4875-a264-70451148edf3','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','externalentity',2,'Atualização da Empresa Externa Teste','2025-03-10 17:11:28.405343'),('1c9d93d1-773d-4f10-9cdb-48c9155e38ec','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',0,'Sessão encerrada pelo utilizador','2025-02-19 16:02:07.078194'),('1ebf7cd7-5647-4c90-a9f8-3300be363f48','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-24 11:30:14.308095'),('1f62f579-8e7e-41d1-bdb6-6ef65434708c','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','groups',2,'Atualização do grupo com o nome Geral','2025-02-05 16:57:47.480270'),('1fddd6db-71ad-4b40-bd04-23ec60329c62','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-19 15:41:26.871182'),('289d7644-6641-4621-8688-37e8f3d4037d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-03-06 11:05:55.738851'),('2b236714-5a5b-4810-ac6c-51b7e523cf1d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-07 15:00:21.087208'),('2fb45f59-4c1b-41a8-97f5-7f35991371fc','b16fe40c-5184-4386-b3ac-fd5519a77956','valter','auth',1,'Utilizador com sessão iniciada','2025-03-06 11:16:38.552915'),('337ace83-40cf-4eac-b73b-936bb39a4ca2','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-03-05 13:09:09.524021'),('34596f0e-ab9e-4504-9c41-d517fdc85ed7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-02-05 15:19:30.367198'),('38e7298d-1e75-468f-befe-50600dcc9e03','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-10 17:53:48.752664'),('3b169ca2-6730-48fc-b86c-7277f2862a62','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-04 17:26:59.571469'),('457cbff9-9b14-4fab-97f4-e282549d6dde','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-17 12:46:55.334553'),('49b23627-c024-4f27-88b3-ffa6f816e661','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-11 09:44:30.123552'),('4c3e2b72-eef5-4e18-bede-eb0b70a39bfa','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Mário Marto','2025-02-17 16:08:35.732075'),('4e4e6c7c-9bda-42b7-bcbf-79b92f811daa','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Célia Lúcio','2025-02-05 15:16:54.693439'),('4fd497be-8f77-4755-827c-028ca3a6c3a4','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-10 11:39:08.710595'),('520754f9-2469-405e-80cb-df519c39912d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-04 17:35:19.036520'),('5282abe8-5afe-4d60-ac25-970d0349a021','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-20 11:29:23.578453'),('53a5505f-b9a8-4c31-aeb1-0415c3193724','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-21 15:03:43.128963'),('53f7efdf-b576-4296-8090-c239522d4d96','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-19 17:37:33.909798'),('541325c7-1600-4cba-8f83-46302685ea97','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',0,'Sessão encerrada pelo utilizador','2025-02-20 11:32:11.778284'),('585e00d0-67fb-43c7-bfcf-137b1b5494b7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-03-10 14:20:41.824703'),('5a2370cd-8e86-4aed-b755-ac7970e57e92','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-13 14:39:36.911759'),('5a4b7296-ab1f-42ce-8dea-408e5c1867bd','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-20 14:49:34.719178'),('5a6c6790-edd6-479f-aa87-4bb30e7ec534','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-18 15:39:57.857507'),('5ada6d07-e6fb-4d5a-8c76-c790831d1980','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',0,'Sessão encerrada pelo utilizador','2025-02-25 11:49:30.332867'),('5b77e2ce-4fd2-48ea-a0d2-4baa3281db21','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-19 15:45:52.947095'),('5c0c3231-9c8e-4128-aa8f-c49907602d8a','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Helena Esperto','2025-02-17 16:08:28.623746'),('618faa7a-155c-4846-853e-e0da1e0acf0e','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-05 15:16:19.278323'),('67bec692-7551-493a-9f14-801a69978be4','b16fe40c-5184-4386-b3ac-fd5519a77956','valter','auth',0,'Sessão encerrada pelo utilizador','2025-02-19 15:46:12.365123'),('7251f8c0-45a2-41be-b590-12fa53686a33','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Paulo Mota','2025-02-12 09:53:37.718469'),('73731b38-eefb-45df-a33d-97e70a7c39a7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-17 15:41:06.175397'),('754ae4f2-4c9f-4cbf-a7a1-bf586be89714','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-19 15:46:33.004956'),('756cf852-5f50-43b5-abcf-0745d5455712','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-03-10 16:36:19.252308'),('7a13897d-7541-4d84-9fad-5a9f826e2195','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',0,'Sessão encerrada pelo utilizador','2025-02-19 15:47:14.476667'),('7a69f8a0-22de-4369-a396-514302928a51','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-25 10:33:04.497405'),('85f702c7-96f7-4f05-b8ab-3f7330260615','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-24 09:12:30.086780'),('879ef1c9-9121-4a43-a549-f1ca1077cb88','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-10 10:00:36.139028'),('87d31680-7ba9-4317-bb87-0afe6351d8ec','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Eduarda Ferreira','2025-03-10 16:36:28.828285'),('8ad09805-6438-4f8c-810f-ae05aab2b846','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-19 15:47:09.996966'),('8c3080e8-f63d-469b-84da-6f487a488d92','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','departament',1,'Criação do departamento Geral','2025-02-05 16:57:23.710898'),('8d9b0157-1039-4b4c-9adb-ba9e08bfd22d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-03-10 11:15:34.658470'),('8f023ac9-0be9-4731-ac53-7c669ca5a867','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',1,'Criação da pessoa Gabriel Pensador','2025-03-10 17:27:05.195624'),('94e1982b-1b5b-4389-b8e1-7e4223d533c7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-26 10:07:34.421555'),('96caafbf-8b0a-494f-bf14-e8e09e217281','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-17 15:44:01.837946'),('9a3cf948-820f-4b49-9d00-254a06d4151a','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-20 11:32:24.047378'),('9ac5e489-aa76-48fc-b06b-1da2fe936cd0','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-19 13:20:25.638962'),('9b896968-805b-40c3-95f9-d521b2a63d04','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-18 10:29:52.366427'),('9ee561ef-8409-45dd-8c87-711074ec7f00','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-19 15:47:36.606927'),('a2237fa8-9ac8-430e-b3c3-60dbbab466df','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-10 17:53:25.788565'),('a2c4578f-9617-4eb3-a09f-32e936b8d74e','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 09:59:25.855232'),('a93beeba-9ca4-4f3c-81c5-a1de02605490','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',0,'Sessão encerrada pelo utilizador','2025-02-20 11:38:51.837292'),('ac306f61-774a-4866-8bc7-d1ed83482b8f','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-21 10:15:33.468356'),('ad77ffec-a9f7-4379-a5ce-d6f8f9c271d9','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-20 16:46:58.045989'),('b4550edd-1b3c-4068-af08-fb0154a7a33b','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-11 15:48:52.126029'),('b89aab63-b0a9-478f-8600-2f5357d7dbcf','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','externalentity',1,'Criação da Empresa Externa Teste','2025-03-10 17:11:16.273833'),('be7523b7-d6b8-4247-b86d-7d4126c01efe','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-07 10:52:24.033188'),('c6125126-2bc0-4da9-a78f-8b1751fb44ba','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-24 15:58:27.424759'),('c739f4dc-1559-4d26-b97e-d6f343ab7914','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-27 17:34:37.776321'),('c86316bc-0969-42aa-ac89-9de46115e5a0','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-25 16:30:17.903813'),('c8f1891c-78b3-4358-ad68-a88281d4e0d7','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 14:27:09.101219'),('ce551f99-6af0-4ac5-aff2-d96a9219916f','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-06 17:14:27.094201'),('ceca931a-9757-49e1-90f3-ac81d0fe4b31','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-25 11:45:29.308024'),('d5786035-80da-46ab-8557-058fa7630609','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-03-10 17:41:33.707520'),('d60af7f3-a741-4e9a-b914-59977c684395','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-19 15:46:56.661328'),('d6e16633-4b72-4f4d-ae29-b5ba29addd3d','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-20 11:26:54.658977'),('de8b6352-731e-4236-b7a2-b5be26408385','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-05 15:07:25.823053'),('e0d87de0-33e1-4c77-8fbd-3ed5653b3b2e','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-19 15:58:22.775225'),('e7385698-6217-4729-a86e-d378a4455144','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Helena Esperto','2025-02-12 09:53:54.243590'),('e859d648-9563-4a72-a16f-19102a260669','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-17 09:06:38.150045'),('eb8d6309-c992-4d67-8d79-95eb9ae0b126','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-10 10:09:05.844081'),('ebd674cb-0519-49e5-ac92-acb4f31200e5','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-17 15:43:59.110674'),('efe346df-c9b7-41bb-a64f-7fbcf22dae9b','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','departament',1,'Criação do departamento Visitante','2025-02-05 16:57:31.144119'),('f368255e-5e52-4138-94cf-91a4edb1104d','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-28 10:59:35.362546'),('f3b6e313-48e4-499c-bebd-4b2b8627eb27','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','employee',2,'Atualização da pessoa Daniel Silva','2025-02-05 15:20:17.790728'),('f5b3dd0a-cda4-455b-9e09-1b8f40a62644','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-27 17:11:57.015056'),('f743073b-aee4-4864-95cb-8f2b35a7c7ad','bf02de50-28ef-4595-b653-6b970f66288f','leila','auth',1,'Utilizador com sessão iniciada','2025-02-21 15:17:38.212618'),('fb6ea541-066b-4d78-b531-bba8e11f64e2','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',0,'Sessão encerrada pelo utilizador','2025-02-07 16:28:16.872435'),('ff6d179d-86df-4e0f-bb7b-f89e488a9b89','f36b818d-b82c-41f8-852a-b7e6ec770ad0','admin','auth',1,'Utilizador com sessão iniciada','2025-02-12 09:49:45.027147');
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
-- Table structure for table `visitantesmotivos`
--

DROP TABLE IF EXISTS `visitantesmotivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitantesmotivos` (
  `ID` char(36) CHARACTER SET ascii NOT NULL,
  `Descricao` varchar(100) DEFAULT NULL,
  `Created_at` datetime(6) NOT NULL,
  `rem` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitantesmotivos`
--

LOCK TABLES `visitantesmotivos` WRITE;
/*!40000 ALTER TABLE `visitantesmotivos` DISABLE KEYS */;
INSERT INTO `visitantesmotivos` VALUES ('08dd5ff6-8502-414d-83db-b183ad5efa06','Teste','2025-03-10 17:10:55.450976',0);
/*!40000 ALTER TABLE `visitantesmotivos` ENABLE KEYS */;
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
INSERT INTO `zones` VALUES ('08dd475b-b228-415d-8ce5-88a0a053a048',0,'Zona Armazém',NULL,NULL,'ZA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('08dd475b-c2c7-41b4-84d8-fcb036cad910',NULL,'Zona Escritório',NULL,NULL,'ZE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bio2'
--

--
-- Dumping routines for database 'bio2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-11  9:41:17
