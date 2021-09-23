const express = require('express');
const router = express.Router({ mergeParams: true });
const Expense = require('./models/expenses');
const User = require('./models/users');
const Group = require('./models/groups');


//group routes
router.get('/groups',function(req,res, next){
    Group.find({}).sort({_id: -1}).limit(15).then(function(group) {
        res.send(group);
        console.log(group);
    }).catch(next);
});

router.get('/groups/:groupId', function(req, res, next){
    Group.findOne({groupId: req.params.groupId}).then(function(group) {
        res.send(group);
    }).catch(next);
});

router.post('/groups', function(req, res, next){
    Group.find({}).then(function(groups) {
        //add new group if not added already
        if (groups.length > 0) { groups.forEach(group => group.groupId === req.body.groupId ?
            res.send('the group is already added') :
            Group.create(req.body).then(function (group) {
                res.send(group);
                console.log('success')
            }).catch(err => {
                console.log(err);
            }))
    } else {
            Group.create(req.body).then(function (group) {
                res.send(group);
                console.log('success')
            })
        }
    })

});

//user routes
router.get('/groups/:groupId/users',function(req,res, next){

        Group.findOne({groupId: req.params.groupId}).then(function(group) {
            let groupIdr = group._id;
            User.find({groupIds: groupIdr}).then(function (user) {
                res.send(user);
                user.forEach(v=> console.log(v.groupIds));
            })
    }).catch(next);
});

router.get('/groups/:groupId/users/:userId',function(req,res, next){
    console.log(req.params);
    User.find({_id: req.params.id}).sort({_id: -1}).limit(15).then(function(users) {
        res.send(users);
    }).catch(err=>{
        console.log(err)
    });
});

router.post('/groups/:groupId/users', function(req, res, next){

    Group.findOne({groupId: req.params.groupId}).then(function(group) {
        let groupId= group._id;
        User.create(req.body).then(function (users) {
            users.groupIds.push(groupId);
            users.save();
            // group.users= users;
            res.send(users);
            console.log(group);
            console.log(users);
        }).catch(err => {
            console.log(err)
        });
    }).catch(err => {
            console.log(err)
    });
});

//expense routes
router.get('/groups/:groupId/expenses',function(req,res, next){
    Group.findOne({groupId: req.params.groupId}).then(function(group) {
        let groupIdr = group._id;
        Expense.find({groupIds: groupIdr}).sort({_id: -1}).limit(15).then(function (expenses) {
            res.send(expenses);
        }).catch(err => {
            console.log(err)
        });
    });
});

router.post('/groups/:groupId/expenses', function(req, res, next){
    Group.findOne({groupId: req.params.groupId}).then(function(group) {
        let groupId= group._id;
    Expense.create(req.body).then(function(expense) {
        expense.groupIds.push(groupId);
        expense.save();
        // group.users= users;
        console.log(group);
        console.log(expense);
        res.send(expense);
    }).catch(next);
    });
});

router.put('/expenses/:id', function(req, res, next){
        Expense.findOneAndUpdate({_id: req.params.id}, req.body).then(function (expense) {
            Expense.findOne({_id: req.params.id}).then(function (expense) {
                res.send(expense);
            }).catch(next);
        })
});

router.delete('/expenses/:id',function(req,res,next){
    Expense.findOneAndDelete({_id: req.params.id}).then(function(expense){
        res.send(expense);
    }).catch(err => console.log(err));
});


module.exports = router;