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
   start();
  // console.log('We're connected!');
});


function start(){
  console.log("\n --------------------------- \n");
  connection.query("SELECT FROM * products", function (err,response) {
    if (err) throw err;
      // console.log(response);
    var productId = [];
    for (var i = 0; i < response.length; i++){
      productId.push(response[i]["item_id"]);
    };
  })

  inquirer
  .prompt ([
    {
      name: "id",
      type: "input",
      message: "What would you like to do?"
    }
  ])


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
