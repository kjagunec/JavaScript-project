/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.36 : Database - njp
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`njp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `njp`;

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`) values 
(1,'Mlijeko'),
(2,'Vrhnja'),
(3,'Maslac, kajmaci i namazi'),
(4,'Sirutka i mlaćenica'),
(6,'Jogurti i kiselo mlijeko'),
(7,'Sirevi-svježi, meki, polutvrdi');

/*Table structure for table `posts` */

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` mediumtext COLLATE utf8mb4_unicode_ci,
  `picture` tinytext COLLATE utf8mb4_unicode_ci,
  `idUsers` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_posts_users_idx` (`idUsers`),
  CONSTRAINT `fk_posts_users` FOREIGN KEY (`idUsers`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `posts` */

insert  into `posts`(`id`,`title`,`text`,`picture`,`idUsers`) values 
(2,'Naslov','Tekst','https://picsum.photos/600',10),
(3,'Title ipsum','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt interdum aliquam. Maecenas id felis eu sapien auctor consectetur nec. ','https://picsum.photos/200',10),
(4,'Title2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac tincidunt erat, mollis suscipit urna. Nam mollis metus a ullamcorper faucibus. Duis feugiat erat justo, nec elementum tortor porttitor facilisis. ','https://picsum.photos/200',10),
(5,'Title3','text3','https://picsum.photos/500',10),
(10,'Naslov','Sed imperdiet elit leo, sed porta ligula mollis in. Etiam ut dolor nibh. Nulla vitae mauris non ante rutrum dictum. Curabitur condimentum ac nibh vitae sollicitudin. Donec dapibus lorem quis arcu gravida, ac suscipit nunc condimentum. Maecenas bibendum dui sed fermentum pretium. Phasellus faucibus tellus in augue porttitor, sed hendrerit. ','https://picsum.photos/300',10);

/*Table structure for table `products` */

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` tinytext COLLATE utf8mb4_unicode_ci,
  `idCategories` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_categories1_idx` (`idCategories`),
  CONSTRAINT `fk_products_categories1` FOREIGN KEY (`idCategories`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `products` */

insert  into `products`(`id`,`name`,`picture`,`idCategories`) values 
(1,'Mlijeko','https://media.gettyimages.com/id/594838587/photo/glass-of-milk.jpg?s=2048x2048&w=gi&k=20&c=kp71uhU_Uenr2Ox8k0c630pNqw-M6Bp3DnAvw_fl3o4=',1),
(4,'Jogurt','https://media.gettyimages.com/id/1197615423/photo/yogurt-in-bowl-on-wooden-table-healthy-eating.webp?s=1024x1024&w=gi&k=20&c=GU-Zrfhloug8l6UmDEXTG9MJrI9mpyP3TUkUJo1Uubo=',6),
(5,'Sir','https://media.gettyimages.com/id/859268416/photo/cheese-chunk-isolated-on-white-background.jpg?s=2048x2048&w=gi&k=20&c=eJE-0duhWEh2THMUc2Pw7jUmOMl2fn-4g3ZXb0KlJFI=',7),
(6,'Kiselo vrhnje','https://media.gettyimages.com/id/1250028245/photo/bowl-of-sour-cream.webp?s=1024x1024&w=gi&k=20&c=PXrQ-Ob9DmrGYesWT4X7JIgLaguijv5sGKUNQxXscCA=',2),
(7,'Svježi sir','https://media.gettyimages.com/id/159738389/photo/cottage-cheese-in-a-bowl.webp?s=1024x1024&w=gi&k=20&c=GmkKunb0Z3yqqSS9Nm6LBBAkCg9e3U4l2UXpuPBvifQ=',7),
(8,'Mlaćenica','https://media.gettyimages.com/id/88309493/photo/pitcher-of-buttermilk.webp?s=1024x1024&w=gi&k=20&c=6kdJbRtDw8Lpa26pMALRKyYC08bxE54v6veoBV-9PDw=',4),
(9,'Mliječni namaz','https://media.gettyimages.com/id/165700150/photo/just-opened-box-cream-cheese-isolated-on-white.webp?s=1024x1024&w=gi&k=20&c=V58PeS7GNCIYzLGS1PK317a_aaNfc5vm94S29kNLLAs=',3),
(10,'Maslac','https://media.gettyimages.com/id/157675533/photo/fresh-butter.webp?s=1024x1024&w=gi&k=20&c=_-XLv3EKgMpNsFZbxjqiQRgTIfwIighVm_AKtjbxE6E=',3),
(12,'Sirevi','https://media.gettyimages.com/id/471370503/photo/wooden-cheese-board-isolated-on-white-backdrop.webp?s=1024x1024&w=gi&k=20&c=7NUiFJrDRkW1ITjl6BXnwwT-9niFThkN2MtE74PbHRk=',7);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin` tinyint DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`username`,`admin`,`salt`) values 
(10,'admin@a','55ed28fe3dfa94352b95793986cac2109820c1cf377a235884c3348fa1bdaa0931f1a7dc0d7fad1adeefe41eb5abf254b37f175ca6adc6ef9216f027a7ed5d7d','admin',1,'ISxoJMAKeLddiOf4t5Wjf5edHkZgTRKQ9o1ma90ad4BtdlxMmNigV523x3AvQ6rehy+zoKMzDGWUSyCmKrp5uXWN7ihwyU0IPdudkRXBY5D9M5GIhAtFwrCH5zfYl6JU3cqA6NPI0zg/BxvUxdmBYa58xVHXJuLGVgxiayX3D4A='),
(11,'user@a','152a1c9cfcac1634e88774c0f00ff8b36b502507d99250d4da1e025ee6932fc593cfa3fc015b7cd91d63b9d5d964172536c730c9bcf91bc8d3771db41ba49c0b','user',0,'V7loAIWCbVKAFtKMUbI27q+pd92GOzmPQXnf5UKkXZKE6OXZY6xbqDwlNF2ycEjFENBSAvgd1UZsS75rd+HSTxvHGcOuZZKj7FQgvQtsQXiIrlmiuGQj1SctFIE6imFDgUDdvXKmLtWollhxX3NbemWx6P6IUN2f/OZle7V/kng=');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
