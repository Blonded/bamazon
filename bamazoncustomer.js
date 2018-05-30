
// NPM install packages
// ALL packages are REQUIRED for this app to function properly.
var mysql = require ("mysql");
var inquirer = require("inquirer");
var table = require("cli-table2");

// creating connection with mysql, via local host
var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;
   start();
  // console.log('We're connected!');
});

// start function: to prompt the user where they want to go, and what options
// they have available to them.
function start(){
  console.log("\n --------------------------- \n");
  // creating a connection to the sql documents products table, pulling data
  connection.query("SELECT FROM * products", function (err,response) {
    // if there is an error then it will throw an error,
    // if not it will log the response.
    if (err) throw err;
      // console.log(response);

      // adding the products into an array so they are easier to select from
    var productId = [];
    for (var i = 0; i < response.length; i++){
      productId.push(response[i]["item_id"]);
    };
  })
// prompt the user with the navigated question
  inquirer
  .prompt ([
    {
      name: "id",
      type: "input",
      message: "What would you like to do?"
    }
  ])

}

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

function productPurchase(){
// What is the id of the product you would like to purchase?
}

function productConsumerQuantity(){
  // How many units of this product would you like to buy?
}





function quit() {
    console.log("\n --------------------------------- \n");
    console.log("Thanks for using *Bamazon* !");
    console.log("\n --------------------------------- \n");
    connection.end();
};
