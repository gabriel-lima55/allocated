const Sequelize = require('sequelize');
const config = require('./index.js');

let sequelize;

let connectionUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
if (connectionUrl && connectionUrl.includes('railway.internal')) {
  connectionUrl = null;
}
if (connectionUrl) {
  const isPlanetScale = connectionUrl.includes('psdb.cloud');
  const opts = {
    dialect: 'mysql',
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  };
  if (connectionUrl.includes('ssl=') || isPlanetScale) {
    opts.dialectOptions = { ssl: { rejectUnauthorized: true } };
  }
  sequelize = new Sequelize(connectionUrl, opts);
} else {
  sequelize = new Sequelize(config.database.development);
}

module.exports = sequelize;
