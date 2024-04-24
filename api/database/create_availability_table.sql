CREATE TABLE IF NOT EXISTS availability(
    table_number INT UNSIGNED ZEROFILL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    PRIMARY KEY (table_number, date, time),
    FOREIGN KEY (table_number) REFERENCES tables(table_number)
);