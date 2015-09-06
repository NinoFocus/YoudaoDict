import db from './db'

export default {
    getAll: () => {
        return db.query('SELECT * FROM word')
    },

    getByName: (name) => {
        return db.query('SELECT * FROM word WHERE name = ?', [name])
    },

    create: (name, translate) => {
        return db.execute('INSERT INTO word (name, translate) VALUES (?, ?)', [name, translate])
    }
}
