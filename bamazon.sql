DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NULL,
department_name VARCHAR (50) NULL,
price FLOAT,
stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Apple", "Produce", 1, 210),
("Mango", "Produce", 3, 29),
("La Croix", "Beverages", 2, 100),
("Kombucha", "Beverages", 5, 37),
("Hershey's Kisses", "Candy", 5, 45),
("Reeses", "Candy", 4, 68),
("Vanilla Candle", "Home", 12, 140),
("Fur Blanket", "Home", 45, 80),
("Apple Air", "Electronics", 1200, 302),
("Flatscreen TV", "Electronics", 1000, 32);



CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR (200),
  overhead FLOAT,
  PRIMARY KEY (department_id)
);

INSERT INTO department (department_name, overhead)
VALUES
("Home", 950),
("Electronics", 1200),
("Candy", 500),
("Beverages", 700),
("Produce", 500),
("Clothing", 900),
("Food", 650);

SELECT * FROM products
