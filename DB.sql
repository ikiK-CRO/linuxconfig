CREATE TABLE IF NOT EXISTS `kategorije` (
    `kat_id` int(11) NOT NULL AUTO_INCREMENT,
    `kat_naziv` varchar(256) NOT NULL,
    PRIMARY KEY (`kat_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `kategorije` (`kat_naziv`) VALUES ('Kuća');
INSERT INTO `kategorije` (`kat_naziv`) VALUES ('Stan');
INSERT INTO `kategorije` (`kat_naziv`) VALUES ('Poslovni prostor');
INSERT INTO `kategorije` (`kat_naziv`) VALUES ('Zemljište' );


CREATE TABLE IF NOT EXISTS `nekretnine` (
    `nek_id` int(11) NOT NULL AUTO_INCREMENT,
    `nek_naslov` varchar(256) NOT NULL,
    `nek_cijena` varchar(50),
    `kat_id` int(11) NOT NULL,
    PRIMARY KEY (`nek_id`),
    FOREIGN KEY (`kat_id` ) REFERENCES `kategorije` (`kat_id` ) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;