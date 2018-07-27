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
            bamazonList();
        
        } else if (answer.managerList === 'View low inventory'){
            lowInventory();
        
        } else if (answer.managerList === 'Add to inventory'){
            addInventory();
        
        } else if (answer.managerList === 'Add new item'){
            newNewItem();

        } else if (answer.managerList === 'Exit Bamazon Manager Tool') {
            exit();
        }
    });
}

bamazonList = () => {
    var query = "SELECT * FROM products";

    connection.query(query, function(err, res) {
      log(orange('\n' + 'BAMAZON PRODUCT LIST \n' + '---------------------------------------------------------------------------------------------'));
      for (var i = 0; i < res.length; i++) {
        log(("ID:" + res[i].id).padEnd(9) + "Product: " + (res[i].product_name).padEnd(20) + "Department: " + (res[i].department_name).padEnd(15) + "Price: " + (res[i].price).toString().padEnd(10) + "Quantity: " + res[i].stock_quantity);
        }
        log('\n');
        managerPrompt();
    }
)};

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

    connection.query(queryStock, function(err, res){
		if (err) throw err;
		if (res.length === 0) {
            log(red('No items are low in inventory'));
            managerPrompt();
		} else {
            log(red('Low Inventory'));
            //TODO: Why does this not pull only low responses? Gives all responses.
            bamazonList(res);
		}
	});
}

addInventory = () => {
//TODO add to stock_quantity
}

addNewItem = () => {
//TODO add to all products columns
}

exit = () => {
	log(blue("Logged out of Bamazon Manager tool"));
	connection.end();
}