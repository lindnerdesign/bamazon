DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INTEGER DEFAULT 0,
  stock_quanity INTEGER DEFAULT 0,
  PRIMARY KEY (id)
);


-- one
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("workout leggings", "womens", 50, 5);

-- two
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("gym shoes", "fitness", 125, 5);

-- three
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("blender", "kitchen", 80, 3);

-- four
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("rice cooker", "kitchen", 35, 2);

-- five
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("dog collar", "pets", 15, 5);

-- six
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("dog frisbee", "pets", 12, 5);

-- seven
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("fishing pole", "outdoor", 150, 2);

-- eight
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("grill", "outdoor", 1500, 1);

-- nine
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("tent", "outdoor", 250, 2);

-- ten
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("sunglasses", "womens", 75, 2);
