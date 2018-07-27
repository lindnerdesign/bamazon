var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var log = console.log;

var red = chalk.rgb(232, 74, 95);
var orange = chalk.rgb(241, 105, 72);
var blue = chalk.rgb(50, 149, 152);
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  itemList();
});

itemList = () => {
  log(blue('. ..-->>|| WELCOME TO BAMAZON ||<<--.. .'));
  inquirer
    .prompt({
      name: "action",
      type: "confirm",
      message: "Would you like to see our product list?"
    })
    .then(function(answer) {
      if (answer.action === true){
        var query = "SELECT * FROM products";
          connection.query(query, function(err, res) {
            log(orange('\n' + 'BAMAZON PRODUCT LIST \n' + '---------------------------------------------------------------------------------------------'));
            for (var i = 0; i < res.length; i++) {
              log(("ID:" + res[i].id).padEnd(9) + "Product: " + (res[i].product_name).padEnd(20) + "Department: " + (res[i].department_name).padEnd(15) + "Price: " + (res[i].price).toString().padEnd(10) + "Quantity: " + res[i].stock_quantity);
              }
              log('\n');
              pickItems();
            })
          } else {
          exit();
      }
    });
}

pickItems = () => {
  inquirer
    .prompt([
      {
  			name: "id",
  			type: "input",
  			message: "Please enter the ID number of the item you'd like to purchase.",
  			validate: function(value) {
  				if (value <= 0 || isNaN(value)) {
  					log("Please enter a valid item ID");
  				} else {
  					return true;
  				}
  			}
  		},
  		{
  			name: "quantity",
  			type: "input",
  			message: "Please enter the quantity of the item you'd like to purchase.",
  			validate: function(value) {
  				if (isNaN(value)) {
  			    log("Please enter a valid number.");
  				} else {
  					return true;
  				}
  			}
  		}
  	]).then(function(answer) {
      itemID = answer.id;
  		itemQuantity = answer.quantity;

      connection.query("SELECT * FROM products WHERE id=" + itemID, function(err, res) {
  			selected = res[0];

        if (itemQuantity > selected.stock_quantity && selected.stock_quantity > 1) {
          log(red(`Sorry, we only have ${selected.stock_quantity} ${selected.product_name}s available.`));
          pickItems();

        } else if (itemQuantity > selected.stock_quantity && selected.stock_quantity === 1) {
          log(red(`Sorry, we only have 1 ${selected.product_name} available.`));
          pickItems();

        } else if (itemQuantity > selected.stock_quantity && selected.stock_quantity < 1) {
          log(red(`Sorry, ${selected.product_name} is out of stock.`));
          pickItems();

        } else if (+itemQuantity === 1) {
          log(blue(`You are purchasing 1 ${selected.product_name}.`));
          buyItem();

        } else {
          log(blue(`You are purchasing ${itemQuantity} ${selected.product_name}'s.`));
          buyItem();
        }
      });
    });
}

buyItem = () => {
	inquirer
    .prompt([
      {
			name: "buy",
			type: "confirm",
			message: "Would you like to check out?"
		}
    ]).then(function(answer) {
		if (answer.buy) {
			connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [itemQuantity, itemID], function(err, res) {
				if (err) throw err;
        log(blue(`Your total: $${itemQuantity * selected.price}`));
        buyDifferentItem();
			});
		} else {
			buyDifferentItem();
		}
	});
}

buyDifferentItem = () => {
	inquirer
    .prompt([
      {
			name: "differentItem",
			type: "confirm",
			message: "Would you like to purchase a different item?"
		}
    ]).then(function(answer) {
		if (answer.differentItem) {
			pickItems();
		} else {
			exit();
		}
	});
}

exit = () => {
	log(blue("Thank you, please come again!"));
	connection.end();
}