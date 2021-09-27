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
INSERT INTO restaurants (name, location, price_range) values (123, "macdonals", "newyork", 3) RETURNING *;
SELECT * FROM restaurants
DROP TABLE restaurants
SELECT * FROM restaurants WHERE id = 1
UPDATE restaurants SET name = 'biggs', location = 'ekiti', price_range=1 WHERE id = 1
DELETE FROM restaurants WHERE id=2

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurants_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);


SELECT * FROM reviews;
JOIN restaurants ON reviews.restaurants_id = restaurants.id;