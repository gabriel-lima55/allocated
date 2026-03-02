const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
    const code = err.original?.code ?? err.parent?.errors?.[0]?.code;
    if (code === 'ECONNREFUSED' || code === 'ENOTFOUND') {
      const url = process.env.DATABASE_URL || process.env.MYSQL_URL || '';
      if (url.includes('railway.internal')) {
        console.error('\n>>> Para rodar no seu PC, use a URL PÚBLICA do Railway, não mysql.railway.internal.');
        console.error('    No Railway: MySQL → Connect → "Public Networking" / variável com host .railway.app ou .rlwy.net\n');
      }
    }
    process.exit(1);
  });
