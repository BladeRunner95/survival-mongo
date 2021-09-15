const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

mongoose.connect('mongodb://localhost/ourdata',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
//support to serve static files
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
// console.log(req);
app.use('/api',require('./routes'));
app.use(function(err,req,res,next){
    console.log(req);
    res.status(422).send({error: err.message});
});

app.get('/api', (req, res) => res.send('Its working!'));

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
