process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
process.env.DATABASE_URL='postgres://fbvjipcramitmu:3832a153f43ef2660e9f3b447f49b49a366ffdcc47699083dc00925766d02502@ec2-54-83-192-245.compute-1.amazonaws.com:5432/d1ne6ps3ppob84'

const express = require('express')
const app = express()
var pg = require('pg')
var format = require('pg-format')

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
//  ssl: true
});

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT nickname FROM users WHERE age = (SELECT MAX(age) FROM users);SELECT name FROM salesforce.account WHERE numberofemployees = (SELECT MAX(numberofemployees) FROM salesforce.account)', function(err,result){
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send("This is " + result[0].rows[0].nickname + "'s first Heroku Application! " + '<br/>' + result[0].rows[0].nickname + " is the Founder of the Biggest Company:  " + result[1].rows[0].name);
       })
   })
});


const port = process.env.PORT || 5000

app.listen(port, function() {
        console.log("Listening on " + port);
});
