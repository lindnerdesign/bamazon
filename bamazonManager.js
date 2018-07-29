var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var log = console.log;

var red = chalk.rgb(232, 74, 95);
var orange = chalk.rgb(241, 105, 72);
var blue = chalk.rgb(50, 149, 152);

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  managerList();
});

managerList = () => {
  log(blue('. ..-->>|| WELCOME TO MY BAMAZON MANAGER TOOL ||<<--.. .'));
  inquirer
    .prompt({
      name: "managerList",
      type: "rawlist",
      message: "Please pick what action you would like: ",
      choices: ['View products for sale','View low inventory','Add to inventory','Add new item','Exit Bamazon Manager Tool']
    })
    .then(function(answer) {
        if (answer.managerList === 'View products for sale'){
            displayProduct();
        
        } else if (answer.managerList === 'View low inventory'){
            lowInventory();
        
        } else if (answer.managerList === 'Add to inventory'){
            addInventory();
        
        } else if (answer.managerList === 'Add new item'){
            addNewItem();

        } else if (answer.managerList === 'Exit Bamazon Manager Tool') {
            exit();
        }
    });
}

displayProduct = () => {
    var query = "SELECT * FROM products";
    connection.query(query,(err, res) => {
        if (err) throw err;
        // console.log(JSON.stringify(res));
        bamazonList(res);
    })
}

bamazonList = (res) => {
    
    // connection.query(query,(err, res) => {
      log(orange('\n' + 'BAMAZON PRODUCT LIST \n' + '---------------------------------------------------------------------------------------------'));
      for (var i = 0; i < res.length; i++) {
        log(("ID:" + res[i].id).padEnd(9) + "Product: " + (res[i].product_name).padEnd(20) + "Department: " + (res[i].department_name).padEnd(15) + "Price: " + (res[i].price).toString().padEnd(10) + "Quantity: " + res[i].stock_quantity);
        }
        log('\n');
        managerPrompt();
};

managerPrompt = () => {
    inquirer
    .prompt({
			name: "toolList",
			type: "confirm",
			message: "Would you like to view the Managers Tool list?"
	
	}).then(function(answer) {
		if (answer.toolList) {
			managerList();
		} else {
			exit();
		}
	});
}

lowInventory = () => {
    var queryStock = "SELECT * FROM products WHERE stock_quantity < 5";

    connection.query(queryStock,(err, res) => {
        if (err) throw err;
        
        // console.log(`Results: ${JSON.stringify(res)}\n`)
		if (res.length === 0) {
            log(red('No items are low in inventory'));
            managerPrompt();
		} else {
            log(red('Low Inventory'));
            bamazonList(res);
		}
	});
}

addInventory = () => {
    inquirer
    .prompt([
        {
        name: "itemID",
        type: "input",
        message: "Enter item ID you would like to add product to.",
        validate: function(value) {
            if (value <= 0 || isNaN(value)) {
                log("Not a valid ID number.");
            } else {
                return true;
            }
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many items of this product would you like to add to its inventory?",
        validate: function(value) {
            if (value <= 0 || isNaN(value)) {
                log("Not a valid ID number.");
            } else {
                return true;
            }
        }
    }
]).then(function(answer) {
    connection.query("SELECT * FROM products WHERE id = ?",[answer.itemID],(err, res) => {
        if (err) throw err;
        selected = res[0];
    });

    connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?", [answer.quantity, answer.itemID], (err, res) => {
        if (err) throw err;
        log(blue("The inventory has been successfully updated!"));

        inquirer
        .prompt([
            {
                name: "addAnother",
                type: "confirm",
                message: "Would you like to update another item?"
            }
        ]).then(function(answer) {
            if (answer.addAnother) {
                addInventory();
                managerPrompt();
            } else {
                managerPrompt();
            }
            });
        });
    });
}

addNewItem = (res) => {
    inquirer
    .prompt([
        {
            name: "product",
            type: "input",
            message: "Enter product name:"
        },
        {
            name: "department",
            type: "input",
            message: "Enter department name:"
        },
        {
            name: "price",
            type: "input",
            message: "Enter product price:"
        },
        {
            name: "quantity",
            type: "input",
            message: "Enter quantity of product:"
        }
        ]).then(function(answer) {
            connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
            },
            function(err, res){
                if (err) throw err;
                log(blue(`Successfully added to the inventory!`));
                managerPrompt();
            });
        });
    }

exit = () => {
	log(blue("Logged out of Bamazon Manager tool"));
	connection.end();
}