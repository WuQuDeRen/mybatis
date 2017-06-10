/*
Navicat MySQL Data Transfer

Source Server         : Work
Source Server Version : 50715
Source Host           : 127.0.0.1:3306
Source Database       : testmybatis

Target Server Type    : MYSQL
Target Server Version : 50715
File Encoding         : 65001

Date: 2017-05-20 18:02:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `amdin_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`amdin_role_id`),
  KEY `FK_Admin_Id` (`admin_id`),
  KEY `FK_Role_Id` (`role_id`),
  CONSTRAINT `FK_Admin_Id` FOREIGN KEY (`admin_id`) REFERENCES `sales_admin` (`administrator_id`),
  CONSTRAINT `FK_Role_Id` FOREIGN KEY (`role_id`) REFERENCES `sales_admin_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for building
-- ----------------------------
DROP TABLE IF EXISTS `building`;
CREATE TABLE `building` (
  `building_id` int(11) NOT NULL AUTO_INCREMENT,
  `building_name` varchar(255) NOT NULL,
  `community_id` int(11) NOT NULL,
  `unit_limit` int(255) DEFAULT NULL,
  PRIMARY KEY (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community` (
  `community_id` int(11) NOT NULL AUTO_INCREMENT,
  `community_name` varchar(45) NOT NULL,
  `street_num` varchar(45) DEFAULT NULL,
  `street_name` varchar(45) DEFAULT NULL,
  `suburb` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for estate_community
-- ----------------------------
DROP TABLE IF EXISTS `estate_community`;
CREATE TABLE `estate_community` (
  `estate_company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `community_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`estate_company_id`),
  KEY `FK_Estate_Id` (`company_id`),
  KEY `FK_commId` (`community_id`),
  CONSTRAINT `FK_Estate_Id` FOREIGN KEY (`company_id`) REFERENCES `estate_company` (`company_id`),
  CONSTRAINT `FK_commId` FOREIGN KEY (`community_id`) REFERENCES `community` (`community_id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for estate_company
-- ----------------------------
DROP TABLE IF EXISTS `estate_company`;
CREATE TABLE `estate_company` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公司ID',
  `company_name` varchar(50) NOT NULL COMMENT '公司名称',
  `company_description` varchar(1000) DEFAULT NULL COMMENT '公司描述',
  `contact_number` varchar(50) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `contact_name` varchar(50) DEFAULT NULL COMMENT '联系人姓名',
  `address` varchar(500) DEFAULT NULL COMMENT '公司地址',
  `sales_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  KEY `FK_CONTONE` (`sales_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for external_gate_control_device
-- ----------------------------
DROP TABLE IF EXISTS `external_gate_control_device`;
CREATE TABLE `external_gate_control_device` (
  `device_id` varchar(100) NOT NULL,
  `device_type` varchar(10) NOT NULL,
  `device_name` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `device_produce_date` date NOT NULL,
  `device_out_factory_date` date NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `unit_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `DeviceId_UNIQUE` (`device_id`),
  KEY `UnitId_idx` (`unit_id`),
  CONSTRAINT `UnitId` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`unit_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for internal_door_control_device
-- ----------------------------
DROP TABLE IF EXISTS `internal_door_control_device`;
CREATE TABLE `internal_door_control_device` (
  `device_id` varchar(100) NOT NULL,
  `device_type` varchar(10) NOT NULL,
  `device_name` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `device_produce_date` date NOT NULL,
  `device_out_factory_date` date NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `property_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `devices_sn_UNIQUE` (`device_id`),
  KEY `PropertyId_idx` (`property_id`),
  CONSTRAINT `PropertyId` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for property
-- ----------------------------
DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `property_name` varchar(45) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `device_layout` varchar(4000) DEFAULT NULL,
  `layout_version` varchar(45) DEFAULT NULL,
  `property_number` int(20) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  UNIQUE KEY `RoomId_UNIQUE` (`property_id`),
  KEY `PropertyId_idx` (`unit_id`),
  CONSTRAINT `FK_Unit_Id` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`unit_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for property_gateway
-- ----------------------------
DROP TABLE IF EXISTS `property_gateway`;
CREATE TABLE `property_gateway` (
  `device_id` varchar(100) NOT NULL,
  `device_type` varchar(10) NOT NULL,
  `device_name` varchar(45) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `device_produce_date` date NOT NULL,
  `device_out_factory_date` date NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `property_id` int(11) DEFAULT NULL,
  `devices_layout` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  KEY `FK_property_id` (`property_id`),
  CONSTRAINT `FK_property_id` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sales_admin
-- ----------------------------
DROP TABLE IF EXISTS `sales_admin`;
CREATE TABLE `sales_admin` (
  `administrator_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `sales_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `UserId_UNIQUE` (`administrator_id`),
  UNIQUE KEY `AccountName_UNIQUE` (`account_name`),
  KEY `FK_CONTTWO` (`sales_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sales_admin_role
-- ----------------------------
DROP TABLE IF EXISTS `sales_admin_role`;
CREATE TABLE `sales_admin_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL DEFAULT '',
  `role_description` varchar(500) NOT NULL COMMENT '角色描述',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_person
-- ----------------------------
DROP TABLE IF EXISTS `tb_person`;
CREATE TABLE `tb_person` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for unit
-- ----------------------------
DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit` (
  `unit_id` int(11) NOT NULL AUTO_INCREMENT,
  `unit_name` varchar(45) DEFAULT NULL,
  `property_limit` int(11) DEFAULT NULL,
  `building_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`unit_id`),
  UNIQUE KEY `UnitId_UNIQUE` (`unit_id`),
  KEY `CommunityId_idx` (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
