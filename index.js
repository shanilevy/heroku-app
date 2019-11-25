process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
process.env.DATABASE_URL='postgres://idqzigdqonfohm:e49008a778f92b0f817cc2ef97e52339bf80533f42abd42f3ee60aa047cadfbf@ec2-184-73-192-172.compute-1.amazonaws.com:5432/daa7e1qqkik4t0'

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
       client.query('SELECT nickname FROM users WHERE age = (SELECT MAX(age) FROM users);SELECT name FROM salesforce.account WHERE numberofemployees = (SELECT MIN(numberofemployees) FROM salesforce.account)', function(err,result){
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send("This is " + result[0].rows[0].nickname + "'s first Heroku Application! " + '<br/>' + result[0].rows[0].nickname + " is the Founder of the Smallest Company:  " + result[1].rows[0].name);
       })
   })
});

const port = process.env.PORT || 5000

app.listen(port, function() {
        console.log("Listening on " + port);
});
