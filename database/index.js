const { Pool } = require('pg');
const postgresqlConfig = require('./config');

const db = new Pool(postgresqlConfig);

module.exports = db;
