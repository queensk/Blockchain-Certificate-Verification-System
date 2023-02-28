-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS BCV_dev_db;
CREATE USER IF NOT EXISTS 'BCV_dev'@'localhost' IDENTIFIED BY 'BCV_dev_pwd';
GRANT ALL PRIVILEGES ON `BCV_dev_db`.* TO 'BCV_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'BCV_dev'@'localhost';
FLUSH PRIVILEGES;
