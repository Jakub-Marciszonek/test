-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema CoollaCalendar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CoollaCalendar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CoollaCalendar` ;
USE `CoollaCalendar` ;

-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Services` (
  `serviceId` INT NOT NULL AUTO_INCREMENT,
  `serviceName` VARCHAR(45) NOT NULL,
  `serviceDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`serviceId`),
  UNIQUE INDEX `serviceName_UNIQUE` (`serviceName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userType` ENUM('Coach', 'Client', 'Organization') NOT NULL,
  `userCreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`));


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Coaches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Coaches` (
  `coachId` INT NOT NULL AUTO_INCREMENT,
  `coachName` VARCHAR(45) NOT NULL,
  `coachSurname` VARCHAR(45) NOT NULL,
  `coachPhone` VARCHAR(16) NULL,
  `coachEmail` VARCHAR(45) NULL,
  PRIMARY KEY (`coachId`),
  UNIQUE INDEX `coachEmail_UNIQUE` (`coachEmail` ASC),
  UNIQUE INDEX `coachPhone_UNIQUE` (`coachPhone` ASC),
  CONSTRAINT `fk_user_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `CoollaCalendar`.`Users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Organizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Organizations` (
  `organizationId` INT NOT NULL AUTO_INCREMENT,
  `organizationName` VARCHAR(100) NOT NULL,
  `organizationEmail` VARCHAR(45) NULL,
  `organizationPhone` VARCHAR(45) NULL,
  `prefferedContact` ENUM('Email', 'Phone') NULL,
  `organizationAdress` VARCHAR(100) NULL,
  PRIMARY KEY (`organizationId`),
  UNIQUE INDEX `organizationName_UNIQUE` (`organizationName` ASC),
  CONSTRAINT `fk_user_organization`
    FOREIGN KEY (`organizationId`)
    REFERENCES `CoollaCalendar`.`Users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Clients` (
  `clientId` INT NOT NULL,
  `organizationId` INT NULL,
  `clientStatus` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  `clientName` VARCHAR(45) NOT NULL,
  `clientSurname` VARCHAR(45) NULL,
  `clientAge` INT(11) NULL,
  `clientPhone` VARCHAR(16) NULL,
  `clientEmail` VARCHAR(45) NULL,
  `clientDescription` VARCHAR(255) NULL,
  `clientSex` ENUM('Female', 'Male', 'Other') NULL,
  `clientAttachments` VARCHAR(255) NULL,
  `clientLimit` INT NULL,
  `clientBalance` INT NULL,
  PRIMARY KEY (`clientId`),
  INDEX `organizationId_idx` (`organizationId` ASC),
  UNIQUE INDEX `clientPhone_UNIQUE` (`clientPhone` ASC),
  UNIQUE INDEX `clientEmail_UNIQUE` (`clientEmail` ASC),
  CONSTRAINT `fk_clients_organization`
    FOREIGN KEY (`organizationId`)
    REFERENCES `CoollaCalendar`.`Organizations` (`organizationId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_client_user`
    FOREIGN KEY (`clientId`)
    REFERENCES `CoollaCalendar`.`Users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Events` (
  `eventId` INT NOT NULL AUTO_INCREMENT,
  `clientId` INT NOT NULL,
  `coachId` INT NOT NULL,
  `serviceId` INT NOT NULL,
  `eventName` VARCHAR(100) NOT NULL,
  `eventDescription` VARCHAR(255) NULL,
  `eventNote` VARCHAR(255) NULL,
  `eventDate` DATE NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  `eventAttendance` ENUM('Present', 'Not present') NULL,
  `eventAttachments` VARCHAR(255) NULL,
  `eventLocation` ENUM('On-site', 'Online') NULL,
  `eventCreatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eventId`),
  INDEX `serviceId_idx` (`serviceId` ASC),
  INDEX `coachId_idx` (`coachId` ASC),
  INDEX `clientId_idx` (`clientId` ASC),
  CONSTRAINT `fk_event_service`
    FOREIGN KEY (`serviceId`)
    REFERENCES `CoollaCalendar`.`Services` (`serviceId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_event_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `CoollaCalendar`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_event_client`
    FOREIGN KEY (`clientId`)
    REFERENCES `CoollaCalendar`.`Clients` (`clientId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`OperatingHours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`OperatingHours` (
  `hoursId` INT NOT NULL AUTO_INCREMENT,
  `coachId` INT NOT NULL,
  `isOpen` TINYINT(1) NOT NULL,
  `weekDay` TINYINT NOT NULL,
  `openTime` TIME NULL,
  `closeTime` TIME NULL,
  PRIMARY KEY (`hoursId`),
  INDEX `coachId_idx` (`coachId` ASC),
  CONSTRAINT `fk_hours_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `CoollaCalendar`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`OperatingExceptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`OperatingExceptions` (
  `exceptionId` INT NOT NULL AUTO_INCREMENT,
  `coachId` INT NOT NULL,
  `exceptionDate` DATE NOT NULL,
  `isOpen` TINYINT(1) NULL DEFAULT 0,
  `openTime` TIME NOT NULL,
  `closeTime` TIME NOT NULL,
  `exceptionDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`exceptionId`),
  INDEX `coachId_idx` (`coachId` ASC),
  CONSTRAINT `fk_exceptions_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `CoollaCalendar`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Specializations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Specializations` (
  `specializationId` INT NOT NULL AUTO_INCREMENT,
  `specializationName` VARCHAR(45) NULL,
  `specializationDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`specializationId`),
  UNIQUE INDEX `specializationName_UNIQUE` (`specializationName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`CoachSpecialization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`CoachSpecialization` (
  `coachId` INT NOT NULL,
  `specializationId` INT NOT NULL,
  PRIMARY KEY (`coachId`, `specializationId`),
  INDEX `specializationId_idx` (`specializationId` ASC),
  CONSTRAINT `fk_coach_specialization`
    FOREIGN KEY (`specializationId`)
    REFERENCES `CoollaCalendar`.`Specializations` (`specializationId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_specialization_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `CoollaCalendar`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Roles` (
  `roleId` INT NOT NULL AUTO_INCREMENT,
  `roleName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE INDEX `roleName_UNIQUE` (`roleName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`UserRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`UserRole` (
  `userId` INT NOT NULL,
  `userType` ENUM('Coach', 'Client', 'Organization') NOT NULL,
  `roleId` INT NULL,
  `assigmentTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`, `userType`),
  INDEX `roleId_idx` (`roleId` ASC),
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`roleId`)
    REFERENCES `CoollaCalendar`.`Roles` (`roleId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_coach`
    FOREIGN KEY (`userId`)
    REFERENCES `CoollaCalendar`.`Users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Permissions` (
  `perrmissionId` INT NOT NULL AUTO_INCREMENT,
  `permissionName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`perrmissionId`),
  UNIQUE INDEX `permissionName_UNIQUE` (`permissionName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`RolePermission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`RolePermission` (
  `roleId` INT NOT NULL,
  `perrmissionId` INT NOT NULL,
  PRIMARY KEY (`roleId`, `perrmissionId`),
  INDEX `permissionId_idx` (`perrmissionId` ASC),
  CONSTRAINT `fk_permission_role`
    FOREIGN KEY (`roleId`)
    REFERENCES `CoollaCalendar`.`Roles` (`roleId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_permission`
    FOREIGN KEY (`perrmissionId`)
    REFERENCES `CoollaCalendar`.`Permissions` (`perrmissionId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Feedback` (
  `feedbackId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `feedbackType` ENUM('Calendart', 'Service') NOT NULL,
  `feedbackContent` VARCHAR(255) NOT NULL,
  `feedbackTimeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackId`),
  INDEX `fk_feedback_client_idx` (`userId` ASC),
  CONSTRAINT `fk_feedback_user`
    FOREIGN KEY (`userId`)
    REFERENCES `CoollaCalendar`.`Users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`Transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`Transactions` (
  `transactionId` INT NOT NULL AUTO_INCREMENT,
  `serviceId` INT NOT NULL,
  `transactionTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transactionName` VARCHAR(45) NOT NULL,
  `transactionDescription` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`transactionId`),
  INDEX `serviceId_idx` (`serviceId` ASC),
  CONSTRAINT `fk_transaction_service`
    FOREIGN KEY (`serviceId`)
    REFERENCES `CoollaCalendar`.`Services` (`serviceId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CoollaCalendar`.`UserTransactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CoollaCalendar`.`UserTransactions` (
  `userId` INT NOT NULL,
  `transactionId` INT NOT NULL,
  PRIMARY KEY (`userId`, `transactionId`),
  INDEX `transactionId_idx` (`transactionId` ASC),
  CONSTRAINT `fk_transaction_client`
    FOREIGN KEY (`userId`)
    REFERENCES `CoollaCalendar`.`Users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_transaction`
    FOREIGN KEY (`transactionId`)
    REFERENCES `CoollaCalendar`.`Transactions` (`transactionId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
