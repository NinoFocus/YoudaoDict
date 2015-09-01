#!/usr/bin/env babel-node

var co = require('co')
var models = require('./lib/models')
var dict = require('./lib/dict')
var print = require('./lib/print')

var q = process.argv.slice(2).join(' ')

co(function* (){
    // 查询数据库
    var data = yield models.words.getByName(q);

    if(data && data.length) {
        data = data[0];
        print(data.translate);
    } else {
        // 查询有道词典
        data = yield dict.query(q);
        print(data);
        var errorCode = JSON.parse(data).errorCode;

        if(errorCode == 0) {
            // 保存到数据库
            yield models.words.create(q, data);
        }
    }

    models.connection.end();
}).catch(function(err) {
    if(err.code == 'ETIMEDOUT') {
        dict.query(q).then(print);
    } else {
        console.error(err);
    }

    models.connection.end();
})
