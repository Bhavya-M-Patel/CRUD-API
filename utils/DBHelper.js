const Pool = require('pg').Pool;

const pool = new Pool({
    user: String(process.env.db_user),
    password: String(process.env.db_pass),
    database: String(process.env.db_name),
    host: String(process.env.db_host)
})

module.exports = {
    query: async (sql, params) => await pool.query(sql, params),
}