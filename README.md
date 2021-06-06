# NEKRETNINE ZADATAK
 Izvedba: Docker / PHP - MySQL/MariaDB - konbinacija vanilla JS i Vue3, Bootstrap, jQuery

 Testirano na MAC OSX Big Sur, LINUX UBUNTU 20.4

# PREDUVJETI
Instalacije na OS-u: 
- Docker
- Github CLI
 # UPUTE
- ```git clone git@github.com:ikiK-CRO/linuxconfig.git```
- ```cd linuxconfig```
- ```sudo docker-compose up -d --build```


phpMyAdmin: http://localhost:8081/index.php

-  MYSQL_USER: 'root'
-  MYSQL_PASSWORD: 'rootpwd'

Kreirati polja u bazi MYSQL_DATABASE: 'testdb' koristeći SQL iz datoteke DB.sql iz root-a.

- Server up: ```sudo docker-compose up -d```
- Ulazak u php image: ```docker exec -it linuxconfig_php-httpd_1 bash```
- Instalacija i aktivacija mysqli, mod_rewrite: ```docker-php-ext-install mysqli```, ```a2enmod rewrite```,  ```apachectl restart```


# TEST

Početna: http://localhost/


- U gonjem desnom kutu se nalazi "login", koristite sljdeće podatke: admin, admin
- Nakon logina pokazat će se ikona "plus", "edit" i "trash"...

- server down: ```sudo docker-compose down```