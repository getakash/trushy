var mongoose	= require("mongoose");

var userschema = new mongoose.Schema({
	Username: String,
	Emailid: String,
	Password: String,
	Boardtitle: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}],
});

module.exports = mongoose.model("user", userschema);