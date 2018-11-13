-- MySQL Script generated by MySQL Workbench
-- Tue Nov 13 09:32:47 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Post` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Content` LONGTEXT NOT NULL,
  `WhenPosted` TIMESTAMP NULL,
  `isPrivate` TINYINT NOT NULL,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`ID`),
  INDEX `UserID_idx` (`UserID` ASC),
  CONSTRAINT `post_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Comments` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  `UserID` INT NOT NULL,
  `Message` VARCHAR(255) NOT NULL,
  `WhenMessaged` TIMESTAMP NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  INDEX `Post_idx` (`PostID` ASC),
  INDEX `UserID_idx` (`UserID` ASC),
  CONSTRAINT `comments_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `mydb`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `comments_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SharedPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SharedPost` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  INDEX `PostID_idx` (`PostID` ASC),
  INDEX `UserID_idx` (`UserID` ASC),
  CONSTRAINT `sharedpost_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `mydb`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sharedpost_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `mydb`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Lifestyle`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Lifestyle` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  CONSTRAINT `lifestyle_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `mydb`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Gaming`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Gaming` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  CONSTRAINT `gaming_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `mydb`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Vehicles` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  CONSTRAINT `vehicles_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `mydb`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Technology`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Technology` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  CONSTRAINT `technology_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `mydb`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
