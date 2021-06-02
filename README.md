# NEKRETNINE ZADATAK
 Izvedba: Docker / PHP - MySQL/MariaDB - Vue

 Testirano na MAC OSX Big Sur, LINUX UBUNTU 20.4

# PREDUVJETI
Instalacije na OS-u: 
- Docker
- Github CLI
 # UPUTE
- git clone git@github.com:ikiK-CRO/linuxconfig.git
- cd linuxconfig
- sudo docker-compose up -d --build


phpMyAdmin: http://localhost:8081/index.php

-  MYSQL_USER: 'root'
-  MYSQL_PASSWORD: 'rootpwd'

Kreirati polja u bazi MYSQL_DATABASE: 'testdb' koristeći SQL iz datoteke DB.sql iz root-a.

//server up / down

sudo docker-compose up -d

sudo docker-compose down

//enter php image

docker exec -it linuxconfig_php-httpd_1 bash 

//install and activate mysqli

docker-php-ext-install mysqli 

docker-php-ext-enable mysqli

apachectl restart


# TEST

Početna: http://localhost/
