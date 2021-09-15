const express = require('express');
const router = express.Router({ mergeParams: true });
const Expense = require('./models/expenses');
const User = require('./models/users');
const Group = require('./models/groups');


//group routes
router.get('/groups',function(req,res, next){
    Group.find({}).sort({_id: -1}).limit(15).then(function(group) {
        res.send(group);
    }).catch(next);
});

router.get('/groups/:groupId', function(req, res, next){
    // Expense.findOneAndUpdate({_id:
    //     req.params.id}, req.body).then(function(expense) {
    Group.findOne({groupId: req.params.groupId}).then(function(group) {
        res.send(group);
    }).catch(next);
    // })
});

router.post('/groups', function(req, res, next){
    Group.create(req.body).then(function(group) {
        res.send(group);
        console.log('success')
    }).catch(err=>{
        console.log(err)
    });
});

// router.post('/groups/:id', function(req, res, next){
//     Group.create(req.body).then(function(group) {
//         res.send(group);
//         console.log('success')
//     }).catch(err=>{
//         console.log(err)
//     });
// });

//user routes
router.get('/groups/:groupId/users',function(req,res, next){
    // Group.findOne({groupId: req.params.groupId}).then(function(group) {
    // User.find({groupId}).then(function (q) {
    //
    // })
    // User.find({groupIds: req.params.groupId}).sort({_id: -1}).limit(15).then(function (user) {
        // user.forEach(v=> {
        //     v.groupIds.find({groupId: req.params.groupId})
        // })
        Group.findOne({groupId: req.params.groupId}).then(function(group) {
        // console.log(group.users)
        // user.groupIds.find({}).then(function (group) {
        //     User.find(group.users).then(function(user) {
        //         res.send(user);
        //     })
        //
            let a = group.map(grou =>grou.users)
            console.log(group.users);
            User.find({a}).then(function (user) {
                res.send(user);
                console.log(user)
            })

        //     console.log(user)
        // }).catch(err=> console.log(err))
        // console.log(req.params.groupId)
    }).catch(next);
    // })
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
    // let data = User.create(req.body).then(function (user) {
    //     console.log(this.user)
    // })

    Group.findOne({groupId: req.params.groupId}).then(function(group) {
        User.create(req.body).then(function (users) {
            // let a = group.users.push(user);
            group.users= users;
            res.send(users);
            // console.log(user);
            console.log(group);
            console.log(users);
        // }).catch(err => {
        //     console.log(err);
        })
    });
    // Group.findOneAndUpdate({groupId: req.params.groupId}, {username: 'vadim'}).then(function(group) {
    //     res.send(group);
    //     console.log(req.body)
    // }).catch(err => {
    //     console.log(err)
    // });
});

//expense routes
router.get('/groups/:groupId/expenses',function(req,res, next){
    console.log(req.params);
    Expense.find({_id: req.params.id}).sort({_id: -1}).limit(15).then(function(expenses) {
        res.send(expenses);
    }).catch(err=>{
        console.log(err)
    });
});

router.post('/groups/:groupId/expenses', function(req, res, next){
    Expense.create(req.body).then(function(expense) {
        res.send(expense);
    }).catch(next);
});

router.put('/expenses/:id', function(req, res, next){
    Expense.findOneAndUpdate({_id:
    req.params.id}, req.body).then(function(expense) {
        Expense.findOne({_id: req.params.id}).then(function(expense) {
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