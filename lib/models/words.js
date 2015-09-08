import db from './db'

export default {
    getAll: () => db.query('SELECT * FROM word'),

    getByName: (name) => db.query('SELECT * FROM word WHERE name = ?', [name]) ,

    create: (name, translate) => db.execute('INSERT INTO word (name, translate) VALUES (?, ?)', [name, translate])
}
