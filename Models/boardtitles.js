var mongoose	= require("mongoose");

var boardtitleschema = new mongoose.Schema({
	Title: String,
	Cards: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});

module.exports = mongoose.model("boardtitle", boardtitleschema);