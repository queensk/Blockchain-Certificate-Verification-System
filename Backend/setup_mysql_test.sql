-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS BCV_test_db;
CREATE USER IF NOT EXISTS 'BCV_test'@'localhost' IDENTIFIED BY 'BCV_test_pwd';
GRANT ALL PRIVILEGES ON `BCV_test_db`.* TO 'BCV_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'BCV_test'@'localhost';
FLUSH PRIVILEGES;
