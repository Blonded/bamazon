
// NPM install packages
// ALL packages are REQUIRED for this app to function properly.
var mysql = require ("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var total = 0;

// creating connection with mysql, via local host
var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_DB"
});

//global reusable variable with no value.
var itemChosen;


connection.connect(function (err) {
    if (err) throw err;
    directory();
	 getCurrentVal();
  // console.log('We're connected!');
});

function getCurrentVal(product) {
	connection.query("SELECT * FROM products", function (err,response) {

    if (err) throw err;
		for (var i = 0 ; i < response.length; i++) {

			if (response[i].product_name === product) {
				itemChosen = response[i].stock_quantity
			}
		}

// console.log(itemChosen)

  })
}

// function to display the table and it's items results
function directory(){

	console.log("\n --------------------------- \n");
	console.log("\n   !WELCOME TO BAMAZON!   \n");
	console.log("\n --------------------------- \n");


  // creating a connection to the sql documents products table, pulling data
  connection.query("SELECT * FROM products", function (err,response) {
    // if there is an error then it will throw an error, if not it will log the response.
    if (err) throw err;
      // console.log(response);

		// instantiate table (cli-table2)
				var table = new Table({
				    head: ['Id', 'Product Name', 'Department', 'Price', 'In-Stock'],
						 colWidths: [4, 20, 15, 7, 14]
				});

    for (var i = 0; i < response.length; i++){
      table.push([response[i].item_id, response[i].product_name, response[i].department_name, response[i].price, response[i].stock_quantity]);
    };
		console.log(table.toString());
		//give option for user to quit application before starting
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

// function to prompt the user on what id of
// the item they would like to purchase
function productPurchase(){
// What is the id of the product you would like to purchase?
inquirer
.prompt ([
	{
	name: "id",
	type: "input",
	message: "\n What is the ID of the item you would like to purchase? \n",
	validate: function(value){
		if(isNaN(value) === false){
			return true;
		} else if (isNaN(value === true)) {
			console.log("\n Please enter a valid ID number. \n");
		}
}
	}
]);
productConsumerQuantity();
}

  // Function to decipher the quantity of the item that the customer wants
function productConsumerQuantity(){
	inquirer
	.prompt([
		{
			type: "input",
			name: "quantity",
			message: "\n What is the quantity of this product you would like to purchase? \n",
			validate: function(value){
				if(isNaN(value) === false){
					return true;
				} else if (isNaN(value === true)) {
					console.log("\n Please enter a number. \n");
					return false;
				}
		}
		}
	]).then(function(answer){
		if (answer.quantity > response[answer.item_id - 1].stock_quantity){
			console.log("Sorry, we have an insufficient amount of that item.")
			optionalQuit();
		} else {
			connection.query(
				"UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity:
						(response[answer.item_id - 1].stock_quantity - parseInt(answer.amount)),
						sales:
						(response[answer.item_id - 1].stock_quantity + parseInt(answer.amount))
					},
					{
						item_id: answer.item_id
					}
				],
				function (err){
					if (err) throw error;
					else{
						console.log("Your items been added!");
						optionalQuit();
					}
				}
			)
			total += (response[answer.item_ID - 1].price * answer.amount)
		}
	})
};


// a function to quit and thanks for using bamazon!
function quit() {
    console.log("\n --------------------------------- \n");
    console.log("Thanks for using *Bamazon* !");
    console.log("\n --------------------------------- \n");
    connection.end();
};
