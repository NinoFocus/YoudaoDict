'use strict';

var mysql = require('mysql');
var config = require('../../config');


var connection = mysql.createConnection(config.mysql);
connection.connect();

function query(prepare, data) {
    data = data || [];
    if(!data instanceof Array) {
        data = [data];
    }

    var promise =  new Promise(function(resolve, reject) {
        connection.query(prepare, data, function(err, result) {
            if(err) {
                return reject(err);
            }

            return resolve(result);
        });
    });

    return promise;
}

module.exports = {
    connection: connection,
    query: query,
    execute: query
};
