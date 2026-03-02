const dbHost = process.env.DB_HOST || '';
const isPlanetScale = dbHost.includes('psdb.cloud') || process.env.USE_PLANETSCALE === 'true';

const development = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'allocated',
};

// PlanetScale (e qualquer MySQL remoto) exige SSL
if (isPlanetScale || process.env.DB_SSL === 'true') {
  development.dialectOptions = {
    ssl: {
      rejectUnauthorized: true,
    },
  };
}

module.exports = {
  database: {
    development,
  },
};
