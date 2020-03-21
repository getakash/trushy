var mongoose	= require("mongoose"); 

var checklistschema = new mongoose.Schema({
	Descripion: String
})

module.exports = mongoose.model("checklist", checklistschema);