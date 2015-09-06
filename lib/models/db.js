import mysql from 'mysql'
import config from '../../config'

let connection = mysql.createConnection(config.mysql)

function query(prepare, data = []) {
    if(!data instanceof Array) {
        data = [data];
    }

    return new Promise((resolve, reject) => {
        connection.query(prepare, data, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}

export default {
    connection,
    query,
    execute: query
}
