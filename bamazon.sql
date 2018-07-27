DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(4) NOT NULL,
  stock_quantity FLOAT(10) NOT NULL,
  PRIMARY KEY (id)
);


-- one
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Workout Leggings", "Womens", 50, 5);

-- two
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gym Shoes", "Fitness", 125, 5);

-- three
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen", 80, 3);

-- four
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rice Cooker", "Kitchen", 35, 2);

-- five
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Collar", "Pets", 15, 5);

-- six
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Frisbee", "Pets", 12, 5);

-- seven
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing Pole", "Outdoor", 150, 2);

-- eight
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grill", "Outdoor", 1500, 1);

-- nine
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoor", 250, 2);

-- ten
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sunglasses", "Womens", 75, 2);
