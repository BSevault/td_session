const mariadb = require('mariadb');

const pool = mariadb.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "webapp",
    password: "monsupermotdepasse",
    database: "session_test",
    port: 3307
});

module.exports = pool;
