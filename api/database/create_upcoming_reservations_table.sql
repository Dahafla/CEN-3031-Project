CREATE TABLE IF NOT EXISTS upcoming_reservations(
    reservation_id INT UNSIGNED ZEROFILL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(35) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    party_size INT UNSIGNED NOT NULL,
    table_number INT UNSIGNED NOT NULL,
    customer_id INT UNSIGNED ZEROFILL,
    applied_perk INT UNSIGNED ZEROFILL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (table_number) REFERENCES availability(table_number),
    FOREIGN KEY (applied_perk) REFERENCES perks(perk_id)
);