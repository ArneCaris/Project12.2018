-- MySQL Script generated by MySQL Workbench
-- Mon Nov 19 10:11:06 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema dilog
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dilog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dilog` DEFAULT CHARACTER SET utf8 ;
USE `dilog` ;

-- -----------------------------------------------------
-- Table `dilog`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dilog`.`User` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dilog`.`Post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dilog`.`Post` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Content` LONGTEXT NOT NULL,
  `Category` VARCHAR(35) NULL,
  `isPrivate` TINYINT NOT NULL,
  `LastEdit` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  PRIMARY KEY (`ID`),
  INDEX `UserID_idx` (`UserID` ASC),
  CONSTRAINT `post_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `dilog`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dilog`.`Comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dilog`.`Comments` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  `UserID` INT NOT NULL,
  `Message` VARCHAR(255) NOT NULL,
  `LastEdit` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  INDEX `Post_idx` (`PostID` ASC),
  INDEX `UserID_idx` (`UserID` ASC),
  CONSTRAINT `comments_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `dilog`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `comments_UserID`
    FOREIGN KEY (`UserID`)
    REFERENCES `dilog`.`User` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dilog`.`SharedPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dilog`.`SharedPost` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PostID` INT NOT NULL,
  `Owner` VARCHAR(45) NOT NULL,
  `Viewer` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC),
  INDEX `PostID_idx` (`PostID` ASC),
  CONSTRAINT `sharedpost_PostID`
    FOREIGN KEY (`PostID`)
    REFERENCES `dilog`.`Post` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
