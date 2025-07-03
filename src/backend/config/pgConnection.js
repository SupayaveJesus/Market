require('dotenv').config();
const { Pool } = require('pg');

console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD);

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'market',
    password: process.env.PGPASSWORD || 'root',
    port: process.env.PGPORT || 5432,
    allowExitOnIdle: true
});


const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
};

const end = () => pool.end();

module.exports = {
    query,
    end
};
