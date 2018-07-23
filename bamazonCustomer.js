var mysql = require("mysql");
var inquirer = require("inquirer");

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
  // console.log("connected as id " + connection.threadId);
  // itemsForSale();
});

// function itemsForSale() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     console.log('ITEMS FOR SALE: \n'
//     + 'ID  |  Product Name  | Department  |  Quanity');
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].stock_quanity);
//     }
//     console.log("-----------------------------------");
//   });
// }

function itemsForSale() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i]);
            }
            return choiceArray;
          },
          message: "Current Items Available on Bamazon!"
        },
        {
          name: "IDandQuantity",
          type: "input",
          message: "If you'd like to make a purchase, please specify item [ID] and [Quantity] you need."
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].id && results[i].quantity === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if product is still in stock
        if (chosenItem.quanity < parseInt(0) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                id: answer.id
              },
              {
                quantity: chosenItem.quanity
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order has been placed successfully!");
              // start();
            }
          );
        }
        else {
          // Quantity isnt high enough, start over
          console.log("Insufficent Quantity");
          // start();
        }
      });
  });
}
