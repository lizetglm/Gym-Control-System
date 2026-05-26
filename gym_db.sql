-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gym_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Socio',8,'add_socio'),(26,'Can change Socio',8,'change_socio'),(27,'Can delete Socio',8,'delete_socio'),(28,'Can view Socio',8,'view_socio'),(29,'Can add Pago',7,'add_pago'),(30,'Can change Pago',7,'change_pago'),(31,'Can delete Pago',7,'delete_pago'),(32,'Can view Pago',7,'view_pago'),(33,'Can add Entrenador',10,'add_entrenador'),(34,'Can change Entrenador',10,'change_entrenador'),(35,'Can delete Entrenador',10,'delete_entrenador'),(36,'Can view Entrenador',10,'view_entrenador'),(37,'Can add Clase',9,'add_clase'),(38,'Can change Clase',9,'change_clase'),(39,'Can delete Clase',9,'delete_clase'),(40,'Can view Clase',9,'view_clase'),(41,'Can add Inscripción',11,'add_inscripcionclase'),(42,'Can change Inscripción',11,'change_inscripcionclase'),(43,'Can delete Inscripción',11,'delete_inscripcionclase'),(44,'Can view Inscripción',11,'view_inscripcionclase'),(45,'Can add Producto',12,'add_producto'),(46,'Can change Producto',12,'change_producto'),(47,'Can delete Producto',12,'delete_producto'),(48,'Can view Producto',12,'view_producto'),(49,'Can add Venta',14,'add_venta'),(50,'Can change Venta',14,'change_venta'),(51,'Can delete Venta',14,'delete_venta'),(52,'Can view Venta',14,'view_venta'),(53,'Can add Detalle de Venta',13,'add_detalleventa'),(54,'Can change Detalle de Venta',13,'change_detalleventa'),(55,'Can delete Detalle de Venta',13,'delete_detalleventa'),(56,'Can view Detalle de Venta',13,'view_detalleventa'),(57,'Can add Movimiento de Caja',15,'add_movimientocaja'),(58,'Can change Movimiento de Caja',15,'change_movimientocaja'),(59,'Can delete Movimiento de Caja',15,'delete_movimientocaja'),(60,'Can view Movimiento de Caja',15,'view_movimientocaja');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1200000$pXkIyiBGZV8t5pTwBJzAym$zmAj1CB0jvKpW7BkDZzhylJNzXIKw5H+jMpj/Hayd2I=',NULL,1,'root','','','root@gmail.com',1,1,'2026-05-25 19:16:33.824102'),(2,'pbkdf2_sha256$1200000$3Y7MrQz6xQfPBLNfjzJhBw$VNmpzOPp3ADC7H8zMI6EgONl/FmhAIupHeS7OsJfPhc=',NULL,1,'paveg','','','paveg@gmail.com',1,1,'2026-05-25 19:17:02.884007');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `dia_semana` varchar(15) NOT NULL,
  `hora_inicio` time(6) NOT NULL,
  `hora_fin` time(6) NOT NULL,
  `cupo` int unsigned NOT NULL,
  `estado` varchar(15) NOT NULL,
  `entrenador_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clases_entrenador_id_06137cdd_fk_entrenadores_id` (`entrenador_id`),
  CONSTRAINT `clases_entrenador_id_06137cdd_fk_entrenadores_id` FOREIGN KEY (`entrenador_id`) REFERENCES `entrenadores` (`id`),
  CONSTRAINT `clases_chk_1` CHECK ((`cupo` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (1,'Spinning Matutino','Lunes','07:00:00.000000','08:00:00.000000',20,'activa',1),(2,'Spinning Matutino','Miércoles','07:00:00.000000','08:00:00.000000',20,'activa',1),(3,'Spinning Matutino','Viernes','07:00:00.000000','08:00:00.000000',20,'activa',1),(4,'Spinning Intensivo','Martes','18:00:00.000000','19:00:00.000000',15,'activa',1),(5,'Spinning Intensivo','Jueves','18:00:00.000000','19:00:00.000000',15,'activa',1),(6,'Yoga Básico','Lunes','09:00:00.000000','10:00:00.000000',15,'activa',2),(7,'Yoga Básico','Miércoles','09:00:00.000000','10:00:00.000000',15,'activa',2),(8,'Yoga Avanzado','Martes','19:00:00.000000','20:00:00.000000',12,'activa',2),(9,'Yoga Avanzado','Viernes','19:00:00.000000','20:00:00.000000',12,'activa',2),(10,'CrossFit','Lunes','06:00:00.000000','07:00:00.000000',20,'activa',3),(11,'CrossFit','Miércoles','06:00:00.000000','07:00:00.000000',20,'activa',3),(12,'CrossFit','Viernes','06:00:00.000000','07:00:00.000000',20,'activa',3),(13,'Zumba','Martes','17:00:00.000000','18:00:00.000000',25,'activa',4),(14,'Zumba','Jueves','17:00:00.000000','18:00:00.000000',25,'activa',4),(15,'Zumba','Sábado','10:00:00.000000','11:00:00.000000',25,'activa',4),(16,'Pilates','Miércoles','11:00:00.000000','12:00:00.000000',12,'activa',2),(17,'Pilates','Viernes','11:00:00.000000','12:00:00.000000',12,'activa',2),(18,'Musculación Básica','Lunes','08:00:00.000000','09:00:00.000000',15,'activa',5),(19,'Musculación Básica','Martes','08:00:00.000000','09:00:00.000000',15,'activa',5),(20,'Musculación Básica','Miércoles','08:00:00.000000','09:00:00.000000',15,'activa',5),(21,'Musculación Básica','Jueves','08:00:00.000000','09:00:00.000000',15,'activa',5),(22,'Musculación Básica','Viernes','08:00:00.000000','09:00:00.000000',15,'activa',5),(23,'Boxing','Martes','07:00:00.000000','08:00:00.000000',12,'activa',6),(24,'Boxing','Jueves','07:00:00.000000','08:00:00.000000',12,'activa',6),(25,'Stretching y Movilidad','Viernes','20:00:00.000000','21:00:00.000000',15,'inactiva',2);
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_ventas`
--

DROP TABLE IF EXISTS `detalle_ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_ventas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cantidad` int unsigned NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `producto_id` bigint NOT NULL,
  `venta_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `detalle_ventas_producto_id_7c825a44_fk_productos_id` (`producto_id`),
  KEY `detalle_ventas_venta_id_a48402cb_fk_ventas_id` (`venta_id`),
  CONSTRAINT `detalle_ventas_producto_id_7c825a44_fk_productos_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `detalle_ventas_venta_id_a48402cb_fk_ventas_id` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`),
  CONSTRAINT `detalle_ventas_chk_1` CHECK ((`cantidad` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_ventas`
--

LOCK TABLES `detalle_ventas` WRITE;
/*!40000 ALTER TABLE `detalle_ventas` DISABLE KEYS */;
INSERT INTO `detalle_ventas` VALUES (1,1,320.00,320.00,8,1),(2,3,15.00,45.00,1,1),(3,1,65.00,65.00,15,1),(4,1,280.00,280.00,9,2),(5,1,350.00,350.00,10,2),(6,2,35.00,70.00,3,2),(7,1,95.00,95.00,21,2),(8,2,55.00,110.00,5,3),(9,2,65.00,130.00,15,3),(10,1,350.00,350.00,10,4),(11,2,45.00,90.00,6,4),(12,4,15.00,60.00,1,4),(13,1,280.00,280.00,9,5),(14,2,320.00,640.00,8,6),(15,2,35.00,70.00,3,7),(16,2,55.00,110.00,17,7),(17,1,260.00,260.00,11,8),(18,2,32.00,64.00,4,8),(19,1,65.00,65.00,15,8),(20,1,320.00,320.00,8,9),(21,1,280.00,280.00,9,9),(22,2,55.00,110.00,5,10),(23,1,35.00,35.00,3,10),(24,1,15.00,15.00,1,10),(25,1,350.00,350.00,10,11),(26,1,260.00,260.00,11,11),(27,1,180.00,180.00,18,11),(28,3,65.00,195.00,15,12),(29,1,45.00,45.00,6,12),(30,1,45.00,45.00,16,12),(31,1,320.00,320.00,8,13),(32,1,280.00,280.00,9,13),(33,2,15.00,30.00,1,13),(34,1,260.00,260.00,11,14),(35,1,280.00,280.00,9,14);
/*!40000 ALTER TABLE `detalle_ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(15,'caja','movimientocaja'),(9,'clases','clase'),(10,'clases','entrenador'),(11,'clases','inscripcionclase'),(5,'contenttypes','contenttype'),(12,'productos','producto'),(6,'sessions','session'),(7,'socios','pago'),(8,'socios','socio'),(13,'ventas','detalleventa'),(14,'ventas','venta');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-05-25 08:10:01.828194'),(2,'auth','0001_initial','2026-05-25 08:10:03.114210'),(3,'admin','0001_initial','2026-05-25 08:10:03.404891'),(4,'admin','0002_logentry_remove_auto_add','2026-05-25 08:10:03.416754'),(5,'admin','0003_logentry_add_action_flag_choices','2026-05-25 08:10:03.429351'),(6,'contenttypes','0002_remove_content_type_name','2026-05-25 08:10:03.650573'),(7,'auth','0002_alter_permission_name_max_length','2026-05-25 08:10:03.783181'),(8,'auth','0003_alter_user_email_max_length','2026-05-25 08:10:03.816638'),(9,'auth','0004_alter_user_username_opts','2026-05-25 08:10:03.831525'),(10,'auth','0005_alter_user_last_login_null','2026-05-25 08:10:03.932965'),(11,'auth','0006_require_contenttypes_0002','2026-05-25 08:10:03.939406'),(12,'auth','0007_alter_validators_add_error_messages','2026-05-25 08:10:03.949704'),(13,'auth','0008_alter_user_username_max_length','2026-05-25 08:10:04.095501'),(14,'auth','0009_alter_user_last_name_max_length','2026-05-25 08:10:04.216761'),(15,'auth','0010_alter_group_name_max_length','2026-05-25 08:10:04.246902'),(16,'auth','0011_update_proxy_permissions','2026-05-25 08:10:04.258224'),(17,'auth','0012_alter_user_first_name_max_length','2026-05-25 08:10:04.388057'),(18,'caja','0001_initial','2026-05-25 08:10:04.433972'),(19,'socios','0001_initial','2026-05-25 08:10:04.659375'),(20,'clases','0001_initial','2026-05-25 08:10:05.194579'),(21,'productos','0001_initial','2026-05-25 08:10:05.247099'),(22,'sessions','0001_initial','2026-05-25 08:10:05.322356'),(23,'socios','0002_remove_socio_estado','2026-05-25 08:10:05.414179'),(24,'ventas','0001_initial','2026-05-25 08:10:05.858166');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrenadores`
--

DROP TABLE IF EXISTS `entrenadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrenadores` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrenadores`
--

LOCK TABLES `entrenadores` WRITE;
/*!40000 ALTER TABLE `entrenadores` DISABLE KEYS */;
INSERT INTO `entrenadores` VALUES (1,'Miguel Torres','Ciclismo Indoor','4451112233'),(2,'Laura Sánchez','Yoga y Pilates','4452223344'),(3,'Raúl Mendoza','CrossFit y Funcional','4453334455'),(4,'Carmen Vega','Zumba y Aeróbicos','4454445566'),(5,'Héctor Ríos','Musculación y Fuerza','4455556677'),(6,'Daniela Cruz','Boxing y Artes Marciales','4456667788');
/*!40000 ALTER TABLE `entrenadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones_clase`
--

DROP TABLE IF EXISTS `inscripciones_clase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_clase` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_inscripcion` datetime(6) NOT NULL,
  `clase_id` bigint NOT NULL,
  `socio_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `inscripciones_clase_socio_id_clase_id_fad07957_uniq` (`socio_id`,`clase_id`),
  KEY `inscripciones_clase_clase_id_ac3d986d_fk_clases_id` (`clase_id`),
  CONSTRAINT `inscripciones_clase_clase_id_ac3d986d_fk_clases_id` FOREIGN KEY (`clase_id`) REFERENCES `clases` (`id`),
  CONSTRAINT `inscripciones_clase_socio_id_4649bd4d_fk_socios_id` FOREIGN KEY (`socio_id`) REFERENCES `socios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones_clase`
--

LOCK TABLES `inscripciones_clase` WRITE;
/*!40000 ALTER TABLE `inscripciones_clase` DISABLE KEYS */;
INSERT INTO `inscripciones_clase` VALUES (1,'2026-01-12 09:00:00.000000',1,1),(2,'2026-01-22 09:00:00.000000',1,2),(3,'2026-01-08 09:00:00.000000',1,3),(4,'2026-02-20 09:00:00.000000',2,4),(5,'2026-03-03 09:00:00.000000',2,5),(6,'2026-01-10 09:00:00.000000',3,17),(7,'2026-01-22 09:00:00.000000',3,18),(8,'2026-05-05 09:00:00.000000',1,29),(9,'2026-04-03 09:00:00.000000',4,7),(10,'2026-04-27 09:00:00.000000',4,8),(11,'2026-03-03 09:00:00.000000',5,19),(12,'2026-02-03 09:00:00.000000',5,20),(13,'2026-05-12 09:00:00.000000',4,30),(14,'2026-03-24 09:00:00.000000',10,6),(15,'2026-04-05 09:00:00.000000',10,26),(16,'2026-04-16 09:00:00.000000',11,27),(17,'2026-04-26 09:00:00.000000',11,28),(18,'2026-05-05 09:00:00.000000',12,29),(19,'2026-05-20 09:00:00.000000',10,31),(20,'2026-03-27 09:00:00.000000',12,25),(21,'2026-01-08 09:00:00.000000',19,3),(22,'2026-03-03 09:00:00.000000',21,5),(23,'2026-04-03 09:00:00.000000',19,7),(24,'2026-01-22 09:00:00.000000',20,18),(25,'2026-02-03 09:00:00.000000',22,20),(26,'2026-05-24 09:00:00.000000',18,32),(27,'2026-02-17 09:00:00.000000',6,21),(28,'2026-02-28 09:00:00.000000',6,22),(29,'2026-03-07 09:00:00.000000',7,23),(30,'2026-03-16 09:00:00.000000',7,24),(31,'2026-05-12 09:00:00.000000',6,30),(32,'2026-05-03 09:00:00.000000',15,2),(33,'2026-03-24 09:00:00.000000',13,6),(34,'2026-05-20 09:00:00.000000',14,31),(35,'2026-04-16 09:00:00.000000',15,27),(36,'2026-02-03 09:00:00.000000',23,20),(37,'2026-02-28 09:00:00.000000',24,22),(38,'2026-03-27 09:00:00.000000',23,25),(39,'2026-02-17 09:00:00.000000',17,21),(40,'2026-04-05 09:00:00.000000',16,26),(41,'2026-05-25 13:19:38.177103',24,2);
/*!40000 ALTER TABLE `inscripciones_clase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos_caja`
--

DROP TABLE IF EXISTS `movimientos_caja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos_caja` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo` varchar(10) NOT NULL,
  `concepto` varchar(200) NOT NULL,
  `monto` decimal(12,2) NOT NULL,
  `fecha` datetime(6) NOT NULL,
  `referencia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos_caja`
--

LOCK TABLES `movimientos_caja` WRITE;
/*!40000 ALTER TABLE `movimientos_caja` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimientos_caja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo_membresia` varchar(20) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `fecha_pago` datetime(6) NOT NULL,
  `fecha_fin` date NOT NULL,
  `socio_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pagos_socio_id_0e41b1d1_fk_socios_id` (`socio_id`),
  CONSTRAINT `pagos_socio_id_0e41b1d1_fk_socios_id` FOREIGN KEY (`socio_id`) REFERENCES `socios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'anual',4200.00,'tarjeta','2026-01-10 00:00:00.000000','2027-01-10',1),(2,'mensual',450.00,'efectivo','2026-05-02 00:00:00.000000','2026-06-01',2),(3,'semestral',2300.00,'transferencia','2026-01-05 00:00:00.000000','2026-07-05',3),(4,'mensual',450.00,'efectivo','2026-05-03 00:00:00.000000','2026-06-02',4),(5,'trimestral',1200.00,'tarjeta','2026-03-01 00:00:00.000000','2026-05-30',5),(6,'mensual',450.00,'efectivo','2026-05-04 00:00:00.000000','2026-06-03',6),(7,'trimestral',1200.00,'tarjeta','2026-04-01 00:00:00.000000','2026-06-30',7),(8,'mensual',450.00,'efectivo','2026-05-05 00:00:00.000000','2026-06-04',8),(9,'mensual',450.00,'efectivo','2026-05-01 00:00:00.000000','2026-05-31',17),(10,'semestral',2300.00,'transferencia','2026-01-15 00:00:00.000000','2026-07-15',18),(11,'trimestral',1200.00,'tarjeta','2026-03-01 00:00:00.000000','2026-05-31',19),(12,'anual',4200.00,'tarjeta','2026-02-01 00:00:00.000000','2027-02-01',20),(13,'trimestral',1200.00,'transferencia','2026-03-15 00:00:00.000000','2026-06-13',21),(14,'mensual',450.00,'efectivo','2026-05-01 00:00:00.000000','2026-05-31',22),(15,'mensual',450.00,'tarjeta','2026-05-01 00:00:00.000000','2026-05-31',23),(16,'trimestral',1200.00,'efectivo','2026-03-01 00:00:00.000000','2026-05-30',24),(17,'mensual',450.00,'tarjeta','2026-05-05 00:00:00.000000','2026-06-04',25),(18,'mensual',450.00,'efectivo','2026-05-01 00:00:00.000000','2026-05-31',26),(19,'trimestral',1200.00,'tarjeta','2026-04-01 00:00:00.000000','2026-06-30',27),(20,'mensual',450.00,'transferencia','2026-05-01 00:00:00.000000','2026-05-31',28),(21,'mensual',450.00,'tarjeta','2026-05-03 00:00:00.000000','2026-06-02',29),(22,'mensual',450.00,'efectivo','2026-05-10 00:00:00.000000','2026-06-09',30),(23,'mensual',450.00,'transferencia','2026-05-18 00:00:00.000000','2026-06-17',31),(24,'mensual',450.00,'efectivo','2026-05-22 00:00:00.000000','2026-06-21',32),(25,'mensual',450.00,'efectivo','2026-02-01 00:00:00.000000','2026-03-03',9),(26,'mensual',450.00,'efectivo','2026-03-01 00:00:00.000000','2026-03-31',10),(27,'mensual',450.00,'tarjeta','2026-04-01 00:00:00.000000','2026-04-30',11),(28,'mensual',450.00,'efectivo','2026-01-05 00:00:00.000000','2026-02-04',12),(29,'mensual',450.00,'efectivo','2025-12-01 00:00:00.000000','2025-12-31',14),(30,'trimestral',1200.00,'tarjeta','2025-09-01 00:00:00.000000','2025-11-30',15),(31,'mensual',400.00,'efectivo','2026-05-25 08:25:21.001688','2026-06-25',33),(32,'mensual',400.00,'efectivo','2026-05-25 08:26:24.319345','2026-06-25',34),(33,'mensual',400.00,'efectivo','2026-05-25 13:13:11.308415','2026-06-25',13);
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `productos_chk_1` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Agua 500ml','Bebidas',15.00,80),(2,'Botella de Agua 1L','Bebidas',25.00,60),(3,'Gatorade 600ml','Bebidas',35.00,50),(4,'Powerade 600ml','Bebidas',32.00,45),(5,'Monster Energy 473ml','Bebidas',55.00,30),(6,'Gatorlyte 500ml','Bebidas',45.00,25),(7,'Jugo Natural 500ml','Bebidas',30.00,35),(8,'Whey Proteína Scoop','Suplementos',320.00,20),(9,'Creatina 300g','Suplementos',280.00,14),(10,'Pre-Entreno 300g','Suplementos',350.00,12),(11,'BCAA 300g','Suplementos',260.00,9),(12,'L-Carnitina 60 caps','Suplementos',220.00,8),(13,'Multivitamínico 60 tabs','Suplementos',180.00,15),(14,'Glutamina 300g','Suplementos',200.00,10),(15,'Barra de Proteína','Snacks',65.00,50),(16,'Granola 200g','Snacks',45.00,30),(17,'Almendras 100g','Snacks',55.00,25),(18,'Guantes de Gym','Accesorios',180.00,15),(19,'Cuerda para Saltar','Accesorios',120.00,20),(20,'Banda de Resistencia','Accesorios',150.00,18),(21,'Toalla Microfibra','Accesorios',95.00,25);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socios`
--

DROP TABLE IF EXISTS `socios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `correo` varchar(254) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socios`
--

LOCK TABLES `socios` WRITE;
/*!40000 ALTER TABLE `socios` DISABLE KEYS */;
INSERT INTO `socios` VALUES (1,'Carlos','Mendoza Ríos','carlos.mendoza@gmail.com','4451000001','2025-01-10'),(2,'Sofía','Torres Guzmán','sofia.torres@gmail.com','4451000002','2025-01-20'),(3,'Diego','Ramírez López','diego.ramirez@hotmail.com','4451000003','2025-02-05'),(4,'Valentina','Cruz Herrera','vale.herrera@gmail.com','4451000004','2025-02-18'),(5,'Andrés','Flores Castillo','andres.flores@gmail.com','4451000005','2025-03-03'),(6,'Camila','Reyes Morales','camila.reyes@outlook.com','4451000006','2025-03-22'),(7,'Luis','García Vázquez','luis.garcia@gmail.com','4451000007','2025-04-08'),(8,'Isabella','Martínez Pérez','isa.martinez@gmail.com','4451000008','2025-04-25'),(9,'Rodrigo','Hernández Soto','rodrigo.hdz@gmail.com','4451000009','2025-05-06'),(10,'Daniela','Jiménez Ruiz','dani.jimenez@hotmail.com','4451000010','2025-05-20'),(11,'Miguel','González Aguilar','miguel.gonza@gmail.com','4451000011','2025-06-10'),(12,'Lucía','Moreno Delgado','lucia.moreno@gmail.com','4451000012','2025-06-28'),(13,'Fernando','Díaz Vargas','fer.diaz@outlook.com','4451000013','2025-07-14'),(14,'Mariana','Romero Fuentes','mariana.romero@gmail.com','4451000014','2025-08-05'),(15,'Sebastián','Ortiz Mendoza','seba.ortiz@gmail.com','4451000015','2025-09-12'),(16,'Iván','Lozano Cervantes','ivan.lozano@gmail.com','4451000016','2025-09-28'),(17,'Ana','Ramírez Vega','ana.ramirez@hotmail.com','4451000017','2026-01-08'),(18,'Roberto','Martínez Torres','roberto.martinez@gmail.com','4451000018','2026-01-20'),(19,'María','González López','maria.gonzalez@gmail.com','4451000019','2026-01-28'),(20,'Luis','Pérez Mendoza','luis.perez@gmail.com','4451000020','2026-02-04'),(21,'Sofía','Flores Castillo','sofia.flores@gmail.com','4451000021','2026-02-15'),(22,'Diego','Sánchez Morales','diego.sanchez@yahoo.com','4451000022','2026-02-26'),(23,'Andrea','Luna Paredes','andrea.luna@gmail.com','4451000023','2026-03-05'),(24,'Valentina','Cruz Jiménez','valentina.cruz@gmail.com','4451000024','2026-03-14'),(25,'Alejandro','Reyes Gutiérrez','alejandro.reyes@gmail.com','4451000025','2026-03-25'),(26,'Isabella','Mendoza Vargas','isabella.mendoza@gmail.com','4451000026','2026-04-03'),(27,'Gabriela','Moreno Ríos','gabriela.moreno@gmail.com','4451000027','2026-04-14'),(28,'Sebastián','Delgado Fuentes','sebastian.delgado@gmail.com','4451000028','2026-04-24'),(29,'Emilio','Castillo Vega','emilio.castillo@gmail.com','4451000029','2026-05-03'),(30,'Lucía','Navarro Fuentes','lucia.navarro@gmail.com','4451000030','2026-05-10'),(31,'Mateo','Ríos Ibarra','mateo.rios@gmail.com','4451000031','2026-05-18'),(32,'Daniela','Suárez Ochoa','daniela.suarez@gmail.com','4451000032','2026-05-22'),(33,'Jesus','Rosiles','jesusrosilesg18@gmail.com','4454577468','2026-05-25'),(34,'Lizet','Lopez','llopez@gmail.com','4451191618','2026-05-25'),(35,'Juan','Perez','jperez@gmail.com','4481581516','2026-05-25');
/*!40000 ALTER TABLE `socios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total` decimal(12,2) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `fecha_venta` datetime(6) NOT NULL,
  `socio_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ventas_socio_id_92fb1c80_fk_socios_id` (`socio_id`),
  CONSTRAINT `ventas_socio_id_92fb1c80_fk_socios_id` FOREIGN KEY (`socio_id`) REFERENCES `socios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,385.00,'efectivo','2026-02-08 10:30:00.000000',NULL),(2,730.00,'tarjeta','2026-02-20 16:00:00.000000',NULL),(3,162.00,'efectivo','2026-03-05 11:00:00.000000',NULL),(4,500.00,'transferencia','2026-03-18 09:30:00.000000',NULL),(5,245.00,'tarjeta','2026-03-28 18:00:00.000000',NULL),(6,640.00,'tarjeta','2026-04-04 10:00:00.000000',NULL),(7,182.00,'efectivo','2026-04-15 13:30:00.000000',NULL),(8,395.00,'transferencia','2026-04-26 17:00:00.000000',NULL),(9,450.00,'tarjeta','2026-05-03 09:00:00.000000',NULL),(10,162.00,'efectivo','2026-05-08 12:00:00.000000',NULL),(11,700.00,'transferencia','2026-05-14 10:30:00.000000',NULL),(12,275.00,'tarjeta','2026-05-19 16:00:00.000000',NULL),(13,530.00,'efectivo','2026-05-23 11:00:00.000000',NULL),(14,626.40,'efectivo','2026-05-25 13:20:56.127343',NULL);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-25 19:19:12
