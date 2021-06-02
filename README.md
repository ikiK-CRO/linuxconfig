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

- Server up: sudo docker-compose up -d
- Ulazak u php image: docker exec -it linuxconfig_php-httpd_1 bash 
- Instalacija i aktivacija mysqli: docker-php-ext-install mysqli, docker-php-ext-enable mysqli, apachectl restart


# TEST

Početna: http://localhost/

- server down: sudo docker-compose down