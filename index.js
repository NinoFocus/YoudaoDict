#!/usr/bin/env babel-node

import Dict from './lib/dict'
import co from 'co'
import models, {connection} from './lib/models'
import print from './lib/print'

let q = process.argv.slice(2).join(' ')
let dict = new Dict(q)

co(function* (){
    connection.connect()

    // 查询数据库
    var data = yield models.words.getByName(q);

    if(data && data.length) {
        data = data[0];
        print(data.translate);
    } else {
        // 查询有道词典
        data = yield dict.query();
        print(data);
        var errorCode = JSON.parse(data).errorCode;

        if(errorCode == 0) {
            // 保存到数据库
            yield models.words.create(q, data);
        }
    }

    connection.end();
}).catch(function(err) {
    if(err.code == 'ETIMEDOUT') {
        dict.query().then(print);
    } else {
        console.error(err)
    }

    connection.end();
})
