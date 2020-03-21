var mongoose	= require("mongoose"); 

var cardschema = new mongoose.Schema({
	Title: String,
	Duedate: Date,
	Description: String,
	Attatchment: String,
	Checklist: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});

module.exports = mongoose.model("card", cardschema);
