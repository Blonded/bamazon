
// NPM install packages
// ALL packages are REQUIRED for this app to function properly.
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var total = 0;

// creating connection with mysql, via local host
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_DB"
});

//global reusable variable with no value.
var itemQuant;


connection.connect(function (err) {
	if (err) throw err;
	directory();

	// console.log('We're connected!');
});



// function to display the table and it's items results
function directory() {

	console.log("\n --------------------------- \n");
	console.log("\n   !WELCOME TO BAMAZON!   \n");
	console.log("\n --------------------------- \n");


	// creating a connection to the sql documents products table, pulling data
	connection.query("SELECT * FROM products", function (err, response) {
		// if there is an error then it will throw an error, if not it will log the response.
		if (err) throw err;
		// console.log(response);

		// instantiate table (cli-table2)
		var table = new Table({
			head: ['Id', 'Product Name', 'Department','Price', 'In-Stock'],
			colWidths: [4, 20, 15, 10, 7]
		});

		for (var i = 0; i < response.length; i++) {
			table.push([response[i].item_id, response[i].product_name, response[i].department_name,  response[i].price, response[i].stock_quantity]);
		};
		console.log(table.toString());
		//give option for user to quit application before starting
		// optionalQuit();
		productConsumerQuantity();

	})
};
//====================PseudoCode====================
//1. Make it so that you only call the quit function after the user buys stuff
//2. Show them table after they buy something
//3. (priority) SHhow user grand total after they buy stuff


//====================PseudoCode====================
// prompt the user with the navigated question

function optionalQuit() {
	inquirer
		.prompt([
			{
				name: "quit",
				type: "list",
				choices: ["yes", "no"],
				message: "Would you like to quit?"
			}
		]).then(function (answer) {

			if (answer.quit === "yes") {
				quit();
			} else {
				productConsumerQuantity();
			}
		});
} // closes the function



// Function to decipher the quantity of the item that the customer wants
function productConsumerQuantity() {
	inquirer
		.prompt([
			{
				name: "id",
				type: "input",
				message: "\n What is the ID of the item you would like to purchase? \n",
				validate: function (value) {
					if (isNaN(value) === false) {
						return true;
						productConsumerQuantity();
					} else if (isNaN(value === true)) {
						console.log("\n Please enter a valid ID number. \n");
					}
				}
			},
			{
				type: "input",
				name: "quantity",
				message: "\n What is the quantity of this product you would like to purchase? \n",
				validate: function (value) {
					if (isNaN(value) === false) {
						return true;
					} else if (isNaN(value === true)) {
						console.log("\n Please enter a number. \n");
						return false;
					}
				}
			}
		]).then(function (answer) {
			// console.log(answer.id)
			// getCurrentVal(answer.id)


			connection.query("SELECT * FROM products", function (err, response) {

				if (err) throw err;

				function getProdQuant() {
					for (var i = 0; i < response.length; i++) {

						if (response[i].item_id === parseInt(answer.id)) {
							return response[i].stock_quantity
						}
					}

				}


				function getProdPrice() {
					for (var i = 0; i < response.length; i++) {

						if (response[i].item_id === parseInt(answer.id)) {
							return response[i].price;
						}
					}
				}


			if (answer.quantity > itemQuant) {
				console.log("Sorry, we have an insufficient amount of that item.")
				optionalQuit();
			} else {

				var diff = (getProdQuant() - parseInt(answer.quantity))

				connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							"stock_quantity":
								diff
						},
						{
							"item_id": parseInt(answer.id)
						}
					],
					function (err) {
						if (err) throw err;
						else {
							console.log("Your items been added!");
							directory();
							optionalQuit();
						}
					}
				)

				total = 0;
				total += (getProdPrice() * answer.quantity)
				console.log("\n Thanks for shopping, your total is $" + total + "\n");
			}

		})
	})
};


// a function to quit and thanks for using bamazon!
function quit() {
	console.log("\n --------------------------------- \n");
	console.log("Thanks for using *Bamazon* !");
	console.log("\n --------------------------------- \n");
	connection.end();
};
