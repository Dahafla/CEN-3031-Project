CREATE TABLE IF NOT EXISTS employees(
	employee_id int UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name varchar(35) NOT NULL,
	last_name varchar(35) NOT NULL,
	username varchar(35) NOT NULL,
	password varchar(35) NOT NULL,
	manager BOOLEAN NOT NULL
);