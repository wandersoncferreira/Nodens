var MongoClient = require('mongodb').MongoClient
var ini = require('ini');
var format = require('util').format
var assert = require('assert');
var fs = require('fs');

var config = ini.parse(fs.readFileSync('../nodens.ini', 'utf-8'));

function databaseURL(config){
    var user = config.database.user
    var pwd = config.database.password
    var hostname = config.database.hostname
    var port = config.database.port
    var database = config.database.db_name
    var url = format("mongodb://%s:%s@%s:%s/%s", user, pwd, hostname, port, database)
    return url
}

function testConnection(url){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
    });
}

// testing database connection
console.log("Testando a conexão com o banco mongo na Amazon")
testConnection(databaseURL(config))
