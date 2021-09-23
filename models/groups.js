const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create groups schema & model
const GroupSchema = new Schema({
    groupId: {
        type: Number
    },
});


const Group = mongoose.model('group',GroupSchema);

module.exports = Group;