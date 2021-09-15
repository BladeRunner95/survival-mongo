const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create expense schema & model
const ExpenseSchema = new Schema({
    name: {
        type: String,
    },
    participants: {
        type: Array,
    },
    amount: {
        type: Number
    },
    fromEach: {
        type: Number
    },
    creatorId: {
        type: Number
    },
    creatorName: {
        type: String
    },
    isClosed: {
        type: Boolean
    },
    notPaid: {
        type: Array,
    },
    createdAt: {
        type: String
    }
});


const Expense = mongoose.model('expense',ExpenseSchema);

module.exports = Expense;