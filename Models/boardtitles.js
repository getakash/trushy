var express 	= require("express"),
	app 		= express(),
	mongoose	= require("mongoose"),
	cardschema	= require("../Models/card");

var boardtitleschema = new mongoose.Schema({
	Title: String,
	Cards: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "cardschema"
	}]
});

module.exports = mongoose.model("boardtitle", boardtitleschema);