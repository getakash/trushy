var express 	= require("express"),
	app 		= express(),
	mongoose	= require("mongoose"),
	bodyParser	= require("body-parser"),
	request		= require("request"),
	user		= require("./Models/user"),
	card		= require("./Models/card"),
	checklist	= require("./Models/checklist"),
	boardtitle	= require("./Models/boardtitles");

mongoose.connect("mongodb://localhost:27017/trashy",{ useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:"true"}));

// user.create({
// 	Username: "dolgy pantro",
// 	Emailid: "dolgypantro@gmail.com",
// 	Password: "slims1",
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

app.get("/signup",function(req,res){
	res.render("signup");
})

app.post("/signup", function(req,res){
	user.create(req.body.user, function(err, user){
		if(err){
			console.log(err);
		}else{
			var userid = user._id;
			console.log("new user loggedin");
			res.redirect("/signup/"+userid);
		}
	})
})

app.get("/signup/:id", function(req, res){
	var userid= req.params.id;
	res.render("home", {userid: userid});
})

app.post("/signup/:id", function(req,res){
	boardtitle.create(req.body.boardtitle, function(err, boardtitle1){
		if(err){
			console.log(err);
		}else{
			console.log("woo");
			user.findById(req.params.id, function(err, founduser){
				if(err){
					console.log(err);
				}else{
					founduser.Boardtitle.push(boardtitle1);
					res.redirect("/signup/"+req.params.id+"/main");
					console.log("woohoo");
				}
	})
	}
})
})

app.get("/login", function(req,res){
	res.render("login");
})

app.get("/signup/:id/main", function(req, res){
	res.render("main");
})

app.listen(3300, function(){
	console.log("The trashy server has started");
})