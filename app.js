var express 	= require("express"),
	app 		= express(),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser"),
	user		= require("./Models/user"),
	card		= require("./Models/card"),
	checklist	= require("./Models/checklist");

mongoose.connect("mongodb://localhost:27017/trashy",{ useNewUrlParser: true });

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:"true"}));

// user.create({
// 	Username: "dolgy pantro",
// 	Emailid: "dolgypantro@gmail.com",
// 	Password: "slims1",
// 	Title: "office party"
// }, function(err, user){
// 	if(err){
// 	console.log(err);
// 	}else{
// 		console.log("new user signed in");
// 		console.log(user);
// 	}
// });

// card.create({
// 	Title: "pack clothes",
// 	Duedate: Date.now(),
// 	Description: "ugeiyftigyughkjjjjjjjvyfxfcvbnmnnnnn",
// 	Attatchment: "jhutfutuy",
	
// }, function(err, card){
// 	user.findOne({Username: "akaskverma"}, function(err, founduser){
// 		if(err){
// 		console.log(err);
// 	}else{
// 		founduser.Card.push(card);
// 		console.log(founduser);
// 	}
// 	})
// })

// checklist.create({
// 	Description: "walk my dog"
// }, function(err,checklist){
// 	card.findOne({Title: "pack clothes"}, function(err, foundcard){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			foundcard.Checklist.push(checklist);
// 			console.log(foundcard);
// 		}
// 	})
// })


app.get("/", function(req, res){
	res.render("landing");
})

app.get("/login",function(req,res){
	res.render("login");
})

app.post("/login", function(req,res){
	user.create(req.body.user, function(err, user){
		if(err){
			console.log(err);
		}else{
			var userid = user._id;
			console.log("new user loggedin");
			res.redirect("/login/"+userid);   
		}
	})
})

app.get("/login/:id", function(req, res){
	res.render("home");
})

app.post("/login/:id", function(req,res){
	user.create(req.body.boardTitle, function(err, user){
		
	})
})

app.listen(3300, function(){
	console.log("The trashy server has started");
})