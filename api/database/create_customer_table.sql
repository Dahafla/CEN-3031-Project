CREATE TABLE IF NOT EXISTS customers(
	customer_id int UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
	first_name varchar(35) NOT NULL,
	last_name varchar(35) NOT NULL,
	dob date NOT NULL,
	phone_number varchar(20) NOT NULL UNIQUE,
    PRIMARY KEY (customer_id)
);