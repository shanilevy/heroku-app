process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const express = require('express')
const app = express()
var pg = require('pg')
var format = require('pg-format')

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://voowoatewzvwue:c4eeee1fc1ac890004741cdb9430174943542e06b2da624b71e24b20dfbbd0f5@ec2-54-83-9-169.compute-1.amazonaws.com:5432/d6csm3ko6nahd',
//  connectionString: process.env.DATABASE_URL,
//  ssl: true
});

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT u.nickname FROM users u WHERE age = (SELECT MAX(age) FROM users)', function (err, result) {
	//client.query('SELECT * FROM users', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(result.rows);
	      res.status(200).send(result.rows[0].nickname);
       })
   })
});

const port = process.env.PORT || 5000

app.listen(port, function() {
	console.log("Listening on " + port);
});

