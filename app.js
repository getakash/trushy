var express = require("express"),
	app 	= express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
})

app.get("/home", function(req, res){
	res.render("home");
})

app.listen(3300, function(){
	console.log("The trashy server has started");
})