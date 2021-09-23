const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Group = require("./groups");

// create user schema & model
const UserSchema = new Schema({
    userId: {
        type: Number,
    },
    username: {
        type: String,
    },
    groupIds: [{
        type: Schema.Types.ObjectId,
        ref: Group
    }]
});


const User = mongoose.model('user',UserSchema);

module.exports = User;