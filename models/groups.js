const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');
const Expense = require('./expenses');

// create groups schema & model
const GroupSchema = new Schema({
    groupId: {
        type: Number
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: Expense
    }]
});


const Group = mongoose.model('group',GroupSchema);

module.exports = Group;