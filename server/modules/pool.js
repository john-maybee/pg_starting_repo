const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database:'lydian_intro',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
    console.log('postgres is connected');
});

pool.on('error', (error) => {
    console.log('error with postgres pool, ', error);
});

module.exports = Pool;