#!/usr/bin/env node

var http  = require('http')

function query(q) {
    q = encodeURIComponent(q)
    var url = 'http://fanyi.youdao.com/openapi.do?keyfrom=Nino-Tips&key=1127122345&type=data&doctype=json&version=1.1&q=' + q

    return new Promise(function(resolve, reject) {
        http.get(url, function(res) {
            res.setEncoding('utf-8')
            res.on('data', function(data) {
                resolve(data);
            })
        }).on('error', function(err) {
            reject(err);
        })
    });
}

module.exports = {
    query: query
}

