DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(4) NOT NULL,
  stock_quantity FLOAT(10) NOT NULL,
  product_sales DECIMAL(10),
  PRIMARY KEY (id)
);

USE bamazon_db;

CREATE TABLE departments(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs DECIMAL(10) NOT NULL,
  PRIMARY KEY (id)
);

-- Departments
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Womens", 4000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Fitness", 1300);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Kitchen", 2500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Pets", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Outdoor", 5500);


-- Products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Workout Leggings", "Womens", 50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gym Shoes", "Fitness", 125, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen", 80, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rice Cooker", "Kitchen", 35, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Collar", "Pets", 15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dog Frisbee", "Pets", 12, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing Pole", "Outdoor", 150, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grill", "Outdoor", 1500, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoor", 250, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sunglasses", "Womens", 75, 75);