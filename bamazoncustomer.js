var mysql = require ("mysql");
var inquirer = require("inquirer");
var table = require("cli-table2");

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;
  //  start();
  console.log('connnnnnnected');
    // connection.end();
});


function start(){


  // The app should then prompt users with two messages.
  // The first should ask them the ID of the product they would like to buy.
  // The second message should ask how many units of the product they would like to buy.

}






function quitApp() {
    console.log("\n --------------------------------- \n");
    console.log("Thanks for using *Bamazon* !");
    console.log("\n --------------------------------- \n");
    connection.end();
};
