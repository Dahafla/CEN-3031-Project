CREATE TABLE IF NOT EXISTS customers(
	customer_id int UNSIGNED ZEROFILL AUTO_INCREMENT PRIMARY KEY,
	first_name varchar(35) NOT NULL,
	last_name varchar(35) NOT NULL,
	dob date NOT NULL,
	phone_number varchar(20) NOT NULL UNIQUE
);