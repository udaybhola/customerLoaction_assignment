var express = require('express');
var app = express();

const MongoClient = require('mongodb').MongoClient;

const config = require('./config.json');
const dataObj = require('./data.js');

const port = process.env.PORT || '4000';

var db;

// MongoDb Connection
MongoClient.connect(config.connectionString,function(err,client){
    if (err) throw err;
    db = client.db("customerLocation")
    db.createCollection("customers",
     function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.collection("customers").createIndex( { loc : "2dsphere" } )
         db.collection("customers").insertMany(dataObj);
    });
});

// Get request to get desired data
app.get('/customerLocation',(req,res)=>{   

    db.collection("customers").find(
        {
           "loc": {
             $near: {
               $geometry: {
                  type: "Point",
                  coordinates: [-6.257664, 53.339428]
               },
               $maxDistance: 100000
             }
           }
        })
        .sort({user_id: 1})
        .map( e => {
            return {
                user_id: e.user_id,
                name: e.name
            }
        })
        .toArray((err, result) => {
            if (err) return console.log(err)
            res.json(result);
        });
});

//Server connection
app.listen(port,()=>{
    console.log("Running on port", port);
});