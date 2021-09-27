CREATE TABLE products (
    id INT, 
    name VARCHAR(50),
    price INT, 
    on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <=5)
);

INSERT INTO restaurants (name, location, price_range) values (123, "macdonals", "newyork", 3);
SELECT * FROM restaurants
DROP TABLE restaurants
SELECT * FROM restaurants WHERE id = 1