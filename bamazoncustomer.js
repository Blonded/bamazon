
// NPM install packages
// ALL packages are REQUIRED for this app to function properly.
var mysql = require ("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

// creating connection with mysql, via local host
var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_DB"
});
var itemChosen;

connection.connect(function (err) {
    if (err) throw err;
    directory();
	 getCurrentVal("Reeses")
  // console.log('We're connected!');
});

function getCurrentVal(product) {
	connection.query("SELECT * FROM products", function (err,response) {
		// console.log("im listening")
    if (err) throw err;
		for (var i = 0 ; i < response.length; i++) {

			if (response[i].product_name === product) {
				itemChosen = response[i].stock_quantity
			}
		}

// console.log(itemChosen)

  })
}

// start function: to prompt the user where they want to go, and what options
// they have available to them.
function directory(){

	console.log("\n --------------------------- \n");
	console.log("\n   !WELCOME TO BAMAZON!   \n");
	console.log("\n --------------------------- \n");


  // creating a connection to the sql documents products table, pulling data
  connection.query("SELECT * FROM products", function (err,response) {
    // if there is an error then it will throw an error, if not it will log the response.
    if (err) throw err;
      // console.log(response);

		// instantiate
				var table = new Table({
				    head: ['Id', 'Product Name', 'Department', 'Price', 'In-Stock'],
						 colWidths: [4, 20, 15, 7, 14]
				});

    for (var i = 0; i < response.length; i++){
      table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]);
    };
		console.log(table.toString());
		optionalQuit();
  })
};
//====================PseudoCode====================
//1. Make inquirer prompt that asks for quantity
//2. grab values of item and how much they want (ex: answer. id && answer.quantity)
//3. Query your db (like the read function in icecream. Find how much the user currently has of that item )
//4. do an update (see also the icecream example, and subtract the user's input from the current value in the db)
//Hint: meh - answers


//====================PseudoCode====================
// prompt the user with the navigated question

function optionalQuit(){
	inquirer
	.prompt ([
{
	name: "quit",
	type: "list",
	choices: ["yes", "no"],
	message: "Would you like to quit?"
}
]).then(function(answer) {

	if (answer.quit === "yes") {
	quit();
} else {
	productPurchase();
}
	});
} // closes the function


		// {
    //   name: "id",
    //   type: "input",
    //   message: "What is the ID of the item you would like to purchase?",
		// 	validate: function(value){
		// 		if(isNaN(value)=== false){
		// 			return true;
		// 		} else if (isNaN(value === true)) {
		// 			console.log("Please enter a valid ID number.");
		// 		}
		// 	}
    // }


function productPurchase(){
// What is the id of the product you would like to purchase?
inquirer
.prompt ([
	{
	name: "id",
	type: "input",
	message: "What is the ID of the item you would like to purchase?",
	validate: function(value){
		if(isNaN(value) === false){
			return true;
		} else if (isNaN(value === true)) {
			console.log("\n Please enter a valid ID number. \n");
		}
}
	}
]);
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
};

function remainingProduct(){

  // Once the customer has placed the order, your application should check
  // if your store has enough of the product to meet the customer's request.

};

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
