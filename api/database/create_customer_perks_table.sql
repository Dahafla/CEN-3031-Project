CREATE TABLE IF NOT EXISTS customer_perks(
    customer_id INT UNSIGNED ZEROFILL,
    perk_id INT UNSIGNED ZEROFILL NOT NULL,
    PRIMARY KEY (customer_id, perk_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (perk_id) REFERENCES perks(perk_id)
);