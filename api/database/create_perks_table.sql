CREATE TABLE IF NOT EXISTS perks(
    perk_id INT UNSIGNED ZEROFILL AUTO_INCREMENT PRIMARY KEY,
    perk_name VARCHAR(50) NOT NULL,
    category ENUM('Discount', 'Free Item', 'Meal Upgrade', 'BOGO', 'Other') NOT NULL,
    perk_description VARCHAR(255) NOT NULL,
    perk_criteria VARCHAR(255) NOT NULL,
    active_status BOOLEAN NOT NULL,
    start_date DATE,
    end_date DATE
);