const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default || require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);// we used this line because passportLocalMongoose will automatically
// generate the username and do salting and some inbuilt functions

module.exports = mongoose.model("User", userSchema);
