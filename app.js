var express 		= require("express"),
	app 			= express(),
	mongoose		= require("mongoose"),
	bodyParser		= require("body-parser"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	passportLocalMongoose			= require("passport-local-mongoose"),
	user			= require("./Models/user"),
	card			= require("./Models/card"),
	checklist		= require("./Models/checklist"),
	boardtitle		= require("./Models/boardtitles"),
	methodOverride	= require("method-override");

app.use(require("express-session")({
	secret: "I am Good",
	resave: false,
	saveUninitialized: false
}))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new LocalStrategy(user.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://akash:Zigzagzoo1node a@cluster0-2jgld.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:"true"}));
app.use(methodOverride("_method"));
app.use(function(req, res, next){
	res.locals.currentuser = req.user;
	next();
});

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

// boardtitle.create({
// 	Title: "isolation day 2",
// }, function(err, bt){
// 	user.findOne({Username: "dolgy pantro"}, function(err, founduser){
// 		if(err){
// 		console.log(err);
// 	}else{
// 		founduser.Boardtitle.push(bt);
// 		console.log(founduser);
// 	}
// 	})
// })


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
	res.render("landing", {currentuser: req.user});
})

app.get("/signup",function(req,res){
	res.render("signup");
})

app.get("/forgotpassword", function(req, res){
	res.render("forgotpwd");
})

app.post("/forgotpassword", function(req, res){
	user.findOne({username: req.body.username}, function(err, founduser){
		if(err){
			console.log(err);
			res.redirect("/forgotpassword");
		}else{
			if(req.body.number == founduser.Secretnumber){
				res.redirect("/passwordrecovery/"+founduser._id);
			}else{
				res.redirect("/forgotpassword");
			}
				
		}
	})
})

app.get("/passwordrecovery/:id", function(req, res){
	user.findById(req.params.id, function(err, founduser){
		if(err){
			console.log(err);
		}else{
			console.log(founduser.Password);
			res.send(founduser.Password);
		}
	})
	
})

app.post("/signup", function(req,res){
	user.register(new user({username: req.body.username, Password: req.body.password, Secretnumber: req.body.secretno}), req.body.password, function(err, userr){
		if(err){
			console.log(err);
			res.redirect("/signup");
		}else{
			passport.authenticate("local")(req, res, function(){
				console.log("new user loggedin");
			res.redirect("/signup/"+userr._id);
			})
			
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
					console.log(err);											n
				}else{
					founduser.Boardtitle.push(boardtitle1);
					founduser.save(function(err, updateduser){
						if(err){
							console.log(err);
						}else{
							console.log(updateduser.Boardtitle);
							res.redirect("/signup/"+req.params.id+"/main");
							console.log("woohoo");
						}
					})
					
				}
	})
	}
})
})

app.get("/login", function(req,res){
	res.render("login");
})

app.post("/login",function(req, res, next){
	user.findOne({username: req.body.username}, function(err, founduser){
		if(err){
			console.log(err);
		}else{
			console.log(req.body.username);
			console.log(founduser._id);
			
		passport.authenticate("local", {
	successRedirect: '/signup/'+founduser._id+'/main',
	failureRedirect: "/login"
	})(req, res, next);
		}
	})
	
})

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
})

app.get("/signup/:id/main", function(req, res){
	user.findById(req.params.id, function(err, founduser){
		if(err){
			console.log(err);
		}else{
			boardtitle.find({_id: {"$in":founduser.Boardtitle}}, function(err, foundboard){
				if(err){
					console.log(err);
				}else{
					res.render("main", {userid: req.params.id, username: founduser.username, board: foundboard });
				}
			})
		}
	});
	
})

app.get("/signup/:id1/main/:id2", function(req, res){
	user.findById(req.params.id1, function(err, founduser){
		if(err){
			console.log(err);
		}else{
			boardtitle.findById(req.params.id2, function(err, foundboard){
				if(err){
					console.log(err);
				}else{
					card.find({_id: {"$in":foundboard.Cards}}, function(err, foundcard){
						if(err){
							console.log(err)
						}else{
							res.render("cards", {user: founduser, board: foundboard, card: foundcard});
						}
					})
				}
			})
		}
	})
})




app.post("/signup/:id1/main/:id2/newcard", function(req, res){
	card.create(req.body.carddata, function(err, createdcard){
		if(err){
			console.log(err);
		}else{
			boardtitle.findById(req.params.id2, function(err, foundboard){
				if(err){
					console.log(err);														
				}else{
					foundboard.Cards.push(createdcard);
					foundboard.save(function(err, updatedboard){
						if(err){
							console.log(err);
						}else{
							console.log(updatedboard.Cards);
							console.log(createdcard);
							res.redirect("/signup/"+req.params.id1+"/main/"+req.params.id2);
						}
					})
					
				}
	})
	}
})
	
})

app.get("/signup/:id1/:id2/:id3", function(req, res){
	card.findById(req.params.id3, function(err, foundcard){
		if(err){
			console.log(err);
		}else{
			res.render("cardshow", {card: foundcard, userid: req.params.id1, boardid: req.params.id2 });
		}
	})
	
})


app.put("/signup/:id1/:id2/:id3", function(req,res){
	card.findByIdAndUpdate(req.params.id3, req.body.carddata, function(err, updatedcard){
		if(err){
			console.log(err);
		}else{
			res.redirect("/signup/"+req.params.id1+"/"+req.params.id2+"/"+req.params.id3);
		}
	})
})


app.delete("/signup/:id1/:id2", function(req, res){
	boardtitle.findByIdAndRemove(req.params.id2, function(err, nul){
		if(err){
	 		console.log(err);
	 	}else{
			user.findById(req.params.id1, function(err, founduser){
				if(err){
					console.log(err);
				}else{
					founduser.Boardtitle.remove(req.params.id2);
					founduser.save(function(err,data){
						if(err){
							console.log(err);
						}else{
							console.log("..........");
					console.log(founduser.Boardtitle);
					res.redirect("/signup/"+req.params.id1+"/main");
						}
					})
					
						}
					})
				}
			})
	})

app.delete("/signup/:id1/:id2/:id3", function(req, res){
	card.findByIdAndRemove(req.params.id3, function(err, nul){
		if(err){
	 		console.log(err);
	 	}else{
			boardtitle.findById(req.params.id2, function(err, foundboard){
				if(err){
					console.log(err);
				}else{
					foundboard.Cards.remove(req.params.id2);
					foundboard.save(function(err,data){
						if(err){
							console.log(err);
						}else{
							console.log("..........");
					res.redirect("/signup/"+req.params.id1+"/main/"+req.params.id2);
						}
					})
					
						}
					})
				}
			})
	})

app.listen(3300,'0.0.0.0/0', function(){
	console.log("The trashy server has started");
})