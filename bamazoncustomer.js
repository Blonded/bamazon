
// NPM install packages
// ALL packages are REQUIRED for this app to function properly.
var mysql = require ("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

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
	console.log("\n   !WELCOME TO BAMAZON!   \n");
	console.log("\n --------------------------- \n");


  // creating a connection to the sql documents products table, pulling data
  connection.query("SELECT * FROM products", function (err,response) {
    // if there is an error then it will throw an error,
    // if not it will log the response.
    if (err) throw err;
      // console.log(response);

		// instantiate
				var table = new Table({
				    head: ['Id', 'Product Name', 'Department', 'Price', 'In-Stock'],
						 colWidths: [4, 20, 15, 7, 14]
				});


    //   // adding the products into an array so they are easier to select from
    for (var i = 0; i < response.length; i++){
      table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity] );
    };



		console.log(table.toString());
	//
  })



// prompt the user with the navigated question
  inquirer
  .prompt ([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the item you would like to purchase? [Quit with Q]"

    }
  ])

}


function productPurchase(){
// What is the id of the product you would like to purchase?
}

function productConsumerQuantity(){
  // How many units of this product would you like to buy?

	// inquirer
	// .prompt([
	// 	{
	// 		type: "input",
	// 		name: "quantity",
	// 		message: "What is the quantity of this product you would like to purchase?",
	// 		validate: // validate function, users input
	// 	}
	// ])
}

function remainingProduct(){

  // Once the customer has placed the order, your application should check
  // if your store has enough of the product to meet the customer's request.

}

// If not, the app should log a phrase like Insufficient quantity!,
// and then prevent the order from going through.
//
// However, if your store does have enough of the product, you should fulfill the customer's order.
//
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.





function quit() {
    console.log("\n --------------------------------- \n");
    console.log("Thanks for using *Bamazon* !");
    console.log("\n --------------------------------- \n");
    connection.end();
};
