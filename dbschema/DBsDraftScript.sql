-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sakila
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sakila
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sakila` ;
USE `sakila` ;

-- -----------------------------------------------------
-- Table `sakila`.`Services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Services` (
  `serviceId` INT NOT NULL AUTO_INCREMENT,
  `serviceName` VARCHAR(45) NOT NULL,
  `serviceDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`serviceId`),
  UNIQUE INDEX `serviceName_UNIQUE` (`serviceName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Coaches`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Coaches` (
  `coachId` INT NOT NULL AUTO_INCREMENT,
  `coachName` VARCHAR(45) NOT NULL,
  `coachSurname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`coachId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Organizations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Organizations` (
  `organizationsId` INT NOT NULL AUTO_INCREMENT,
  `organizationName` VARCHAR(100) NOT NULL,
  `organizationEmail` VARCHAR(45) NULL,
  `organizationPhone` VARCHAR(45) NULL,
  `prefferedContact` ENUM('Email', 'Phone') NULL,
  `organizationAdress` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`organizationsId`),
  UNIQUE INDEX `organizationName_UNIQUE` (`organizationName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Clients` (
  `clientId` INT NOT NULL AUTO_INCREMENT,
  `organizationId` INT NOT NULL DEFAULT 1,
  `clientStatus` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  `clientName` VARCHAR(45) NOT NULL,
  `clientSurname` VARCHAR(45) NULL,
  `ageGroup` ENUM('18-25', '26-34', '35-54', '54+') NULL,
  `clientPhone` VARCHAR(45) NULL,
  `clientEmail` VARCHAR(45) NULL,
  `prefferedContact` ENUM('Email', 'Phone') NULL,
  `clientLocation` VARCHAR(100) NULL,
  `clientDescription` VARCHAR(255) NULL,
  `clientGender` ENUM('Femaile', 'Male', 'Other') NULL,
  `clientAttachments` VARCHAR(100) NULL,
  `clientLimit` INT NULL,
  `clientBalance` INT NULL,
  PRIMARY KEY (`clientId`),
  INDEX `organizationId_idx` (`organizationId` ASC),
  CONSTRAINT `fk_clients_organization`
    FOREIGN KEY (`organizationId`)
    REFERENCES `sakila`.`Organizations` (`organizationsId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Events` (
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
  `attendance` TINYINT(1) NULL,
  `eventLocation` TINYINT(1) NULL,
  PRIMARY KEY (`eventId`),
  INDEX `serviceId_idx` (`serviceId` ASC),
  INDEX `coachId_idx` (`coachId` ASC),
  INDEX `clientId_idx` (`clientId` ASC),
  CONSTRAINT `fk_event_service`
    FOREIGN KEY (`serviceId`)
    REFERENCES `sakila`.`Services` (`serviceId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_event_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `sakila`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_event_client`
    FOREIGN KEY (`clientId`)
    REFERENCES `sakila`.`Clients` (`clientId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);


-- -----------------------------------------------------
-- Table `sakila`.`OperatingHours`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`OperatingHours` (
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
    REFERENCES `sakila`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT);


-- -----------------------------------------------------
-- Table `sakila`.`OperatingExceptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`OperatingExceptions` (
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
    REFERENCES `sakila`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Specializatons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Specializatons` (
  `specializationId` INT NOT NULL AUTO_INCREMENT,
  `specializationName` VARCHAR(45) NULL,
  `specializationDescription` VARCHAR(255) NULL,
  PRIMARY KEY (`specializationId`),
  UNIQUE INDEX `specializationName_UNIQUE` (`specializationName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`CoachSpecialization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`CoachSpecialization` (
  `coachId` INT NOT NULL,
  `specializationId` INT NOT NULL,
  PRIMARY KEY (`coachId`, `specializationId`),
  INDEX `specializationId_idx` (`specializationId` ASC),
  CONSTRAINT `fk_coach_specialization`
    FOREIGN KEY (`specializationId`)
    REFERENCES `sakila`.`Specializatons` (`specializationId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_specialization_coach`
    FOREIGN KEY (`coachId`)
    REFERENCES `sakila`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Roles` (
  `roleId` INT NOT NULL AUTO_INCREMENT,
  `roleName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE INDEX `roleName_UNIQUE` (`roleName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`UserRole`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`UserRole` (
  `userId` INT NOT NULL,
  `userType` ENUM('Coach', 'Client', 'Organization') NOT NULL,
  `roleId` INT NULL,
  `assigmentTime` TIMESTAMP GENERATED ALWAYS AS (CURRENT_TIMESTAMP) VIRTUAL,
  PRIMARY KEY (`userId`, `userType`),
  INDEX `roleId_idx` (`roleId` ASC),
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`roleId`)
    REFERENCES `sakila`.`Roles` (`roleId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_coach`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Coaches` (`coachId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_organization`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Organizations` (`organizationsId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_client`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Clients` (`clientId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Permissions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Permissions` (
  `perrmissionId` INT NOT NULL AUTO_INCREMENT,
  `permissionName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`perrmissionId`),
  UNIQUE INDEX `permissionName_UNIQUE` (`permissionName` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`RolePermission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`RolePermission` (
  `roleId` INT NOT NULL,
  `perrmissionId` INT NOT NULL,
  PRIMARY KEY (`roleId`, `perrmissionId`),
  INDEX `permissionId_idx` (`perrmissionId` ASC),
  CONSTRAINT `fk_permission_role`
    FOREIGN KEY (`roleId`)
    REFERENCES `sakila`.`Roles` (`roleId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_permission`
    FOREIGN KEY (`perrmissionId`)
    REFERENCES `sakila`.`Permissions` (`perrmissionId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Feedback` (
  `feedbackId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `userType` ENUM('Client', 'Organization') NOT NULL,
  `feedbackContent` VARCHAR(255) NOT NULL,
  `feedbackTimeStamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackId`),
  INDEX `ClientId_idx` (`userId` ASC),
  CONSTRAINT `fk_feedback_client`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Clients` (`clientId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_feedback_organization`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Organizations` (`organizationsId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`Transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`Transactions` (
  `transactionId` INT NOT NULL AUTO_INCREMENT,
  `serviceId` INT NOT NULL,
  `transactionTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transactionId`),
  INDEX `serviceId_idx` (`serviceId` ASC),
  CONSTRAINT `fk_transaction_service`
    FOREIGN KEY (`serviceId`)
    REFERENCES `sakila`.`Services` (`serviceId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sakila`.`UserTransactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sakila`.`UserTransactions` (
  `userId` INT NOT NULL,
  `userType` ENUM('Client', 'Organization') NOT NULL,
  `transactionId` INT NULL,
  PRIMARY KEY (`userId`, `userType`),
  INDEX `transactionId_idx` (`transactionId` ASC),
  CONSTRAINT `fk_transaction_client`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Clients` (`clientId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_transaction_organization`
    FOREIGN KEY (`userId`)
    REFERENCES `sakila`.`Organizations` (`organizationsId`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_user_transaction`
    FOREIGN KEY (`transactionId`)
    REFERENCES `sakila`.`Transactions` (`transactionId`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;

USE `sakila` ;

-- -----------------------------------------------------
-- procedure rewards_report
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$


CREATE PROCEDURE `sakila`.`rewards_report` (
    IN min_monthly_purchases TINYINT UNSIGNED
    , IN min_dollar_amount_purchased DECIMAL(10,2) UNSIGNED
    , OUT count_rewardees INT
)
LANGUAGE SQL
NOT DETERMINISTIC 
READS SQL DATA
SQL SECURITY DEFINER
COMMENT 'Provides a customizable report on best customers'
proc: BEGIN
    
    DECLARE last_month_start DATE;
    DECLARE last_month_end DATE;

    /* Some sanity checks... */
    IF min_monthly_purchases = 0 THEN
        SELECT 'Minimum monthly purchases parameter must be > 0';
        LEAVE proc;
    END IF;
    IF min_dollar_amount_purchased = 0.00 THEN
        SELECT 'Minimum monthly dollar amount purchased parameter must be > $0.00';
        LEAVE proc;
    END IF;

    /* Determine start and end time periods */
    SET last_month_start = DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH);
    SET last_month_start = STR_TO_DATE(CONCAT(YEAR(last_month_start),'-',MONTH(last_month_start),'-01'),'%Y-%m-%d');
    SET last_month_end = LAST_DAY(last_month_start);

    /* 
        Create a temporary storage area for 
        Customer IDs.  
    */
    CREATE TEMPORARY TABLE tmpCustomer (customer_id SMALLINT UNSIGNED NOT NULL PRIMARY KEY);

    /* 
        Find all customers meeting the 
        monthly purchase requirements
    */
    INSERT INTO tmpCustomer (customer_id)
    SELECT p.customer_id 
    FROM payment AS p
    WHERE DATE(p.payment_date) BETWEEN last_month_start AND last_month_end
    GROUP BY customer_id
    HAVING SUM(p.amount) > min_dollar_amount_purchased
    AND COUNT(customer_id) > min_monthly_purchases;

    /* Populate OUT parameter with count of found customers */
    SELECT COUNT(*) FROM tmpCustomer INTO count_rewardees;

    /* 
        Output ALL customer information of matching rewardees.
        Customize output as needed.
    */
    SELECT c.* 
    FROM tmpCustomer AS t   
    INNER JOIN customer AS c ON t.customer_id = c.customer_id;

    /* Clean up */
    DROP TABLE tmpCustomer;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function get_customer_balance
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$


CREATE FUNCTION `sakila`.`get_customer_balance`(p_customer_id INT, p_effective_date DATETIME) RETURNS DECIMAL(5,2)
    DETERMINISTIC
    READS SQL DATA
BEGIN

       #OK, WE NEED TO CALCULATE THE CURRENT BALANCE GIVEN A CUSTOMER_ID AND A DATE
       #THAT WE WANT THE BALANCE TO BE EFFECTIVE FOR. THE BALANCE IS:
       #   1) RENTAL FEES FOR ALL PREVIOUS RENTALS
       #   2) ONE DOLLAR FOR EVERY DAY THE PREVIOUS RENTALS ARE OVERDUE
       #   3) IF A FILM IS MORE THAN RENTAL_DURATION * 2 OVERDUE, CHARGE THE REPLACEMENT_COST
       #   4) SUBTRACT ALL PAYMENTS MADE BEFORE THE DATE SPECIFIED

  DECLARE v_rentfees DECIMAL(5,2); #FEES PAID TO RENT THE VIDEOS INITIALLY
  DECLARE v_overfees INTEGER;      #LATE FEES FOR PRIOR RENTALS
  DECLARE v_payments DECIMAL(5,2); #SUM OF PAYMENTS MADE PREVIOUSLY

  SELECT IFNULL(SUM(film.rental_rate),0) INTO v_rentfees
    FROM film, inventory, rental
    WHERE film.film_id = inventory.film_id
      AND inventory.inventory_id = rental.inventory_id
      AND rental.rental_date <= p_effective_date
      AND rental.customer_id = p_customer_id;

  SELECT IFNULL(SUM(IF((TO_DAYS(rental.return_date) - TO_DAYS(rental.rental_date)) > film.rental_duration,
        ((TO_DAYS(rental.return_date) - TO_DAYS(rental.rental_date)) - film.rental_duration),0)),0) INTO v_overfees
    FROM rental, inventory, film
    WHERE film.film_id = inventory.film_id
      AND inventory.inventory_id = rental.inventory_id
      AND rental.rental_date <= p_effective_date
      AND rental.customer_id = p_customer_id;


  SELECT IFNULL(SUM(payment.amount),0) INTO v_payments
    FROM payment

    WHERE payment.payment_date <= p_effective_date
    AND payment.customer_id = p_customer_id;

  RETURN v_rentfees + v_overfees - v_payments;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure film_in_stock
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$


CREATE PROCEDURE `sakila`.`film_in_stock`(IN p_film_id INT, IN p_store_id INT, OUT p_film_count INT)
READS SQL DATA
BEGIN
     SELECT inventory_id
     FROM inventory
     WHERE film_id = p_film_id
     AND store_id = p_store_id
     AND inventory_in_stock(inventory_id);

     SELECT FOUND_ROWS() INTO p_film_count;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure film_not_in_stock
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$


CREATE PROCEDURE `sakila`.`film_not_in_stock`(IN p_film_id INT, IN p_store_id INT, OUT p_film_count INT)
READS SQL DATA
BEGIN
     SELECT inventory_id
     FROM inventory
     WHERE film_id = p_film_id
     AND store_id = p_store_id
     AND NOT inventory_in_stock(inventory_id);

     SELECT FOUND_ROWS() INTO p_film_count;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function inventory_held_by_customer
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$


CREATE FUNCTION `sakila`.`inventory_held_by_customer`(p_inventory_id INT) RETURNS INT
READS SQL DATA
BEGIN
  DECLARE v_customer_id INT;
  DECLARE EXIT HANDLER FOR NOT FOUND RETURN NULL;

  SELECT customer_id INTO v_customer_id
  FROM rental
  WHERE return_date IS NULL
  AND inventory_id = p_inventory_id;

  RETURN v_customer_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- function inventory_in_stock
-- -----------------------------------------------------

DELIMITER $$
USE `sakila`$$


CREATE FUNCTION `sakila`.`inventory_in_stock`(p_inventory_id INT) RETURNS BOOLEAN
READS SQL DATA
BEGIN
    DECLARE v_rentals INT;
    DECLARE v_out     INT;

    #AN ITEM IS IN-STOCK IF THERE ARE EITHER NO ROWS IN THE rental TABLE
    #FOR THE ITEM OR ALL ROWS HAVE return_date POPULATED

    SELECT COUNT(*) INTO v_rentals
    FROM rental
    WHERE inventory_id = p_inventory_id;

    IF v_rentals = 0 THEN
      RETURN TRUE;
    END IF;

    SELECT COUNT(rental_id) INTO v_out
    FROM inventory LEFT JOIN rental USING(inventory_id)
    WHERE inventory.inventory_id = p_inventory_id
    AND rental.return_date IS NULL;

    IF v_out > 0 THEN
      RETURN FALSE;
    ELSE
      RETURN TRUE;
    END IF;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
