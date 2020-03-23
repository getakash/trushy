var express 	= require("express"),
	app 		= express(),
	mongoose	= require("mongoose"),
	clschema	= require("../Models/checklist");

var cardschema = new mongoose.Schema({
	Title: String,
	Duedate: Date,
	Description: String,
	Attatchment: String,
	Checklist: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "clschema"
	}]
});

module.exports = mongoose.model("card", cardschema);
