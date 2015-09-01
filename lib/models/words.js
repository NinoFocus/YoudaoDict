var db = require('./db')

module.exports = {
    getAll: function() {
        return db.query('SELECT * FROM word');
    },

    getByName: function(name) {
        return db.query('SELECT * FROM word WHERE name = ?', [name])
    },

    create: function(name, translate) {
        return db.execute('INSERT INTO word (name, translate) VALUES (?, ?)', [name, translate])
    }
}
