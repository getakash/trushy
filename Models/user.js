var express 			= require("express"),
	app 				= express(),
	mongoose			= require("mongoose"),
	boardtitleschema	= require("../Models/boardtitles"),
	passportLocalMongoose			= require("passport-local-mongoose");


var userschema = new mongoose.Schema({
	username: String,
	Password: String,
	Secretnumber: Number,
	Boardtitle: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "boardtitleschema"
	}],
});

userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userschema);