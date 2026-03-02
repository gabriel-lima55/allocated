Sistema Allocated, baseado no projeto MVP integrando 3 disciplinas do 4º ano

## Rodar localmente

```bash
npm install
cp .env.example .env   # edite .env com suas credenciais do banco
npm run dev
```

## Banco de dados: Railway

1. Crie uma conta em [railway.app](https://railway.app).
2. **New Project** → **Deploy MySQL** (ou "Add Plugin" → MySQL).
3. Clique no serviço MySQL → aba **Variables** (ou **Connect**). Copie a **MYSQL_URL** (connection string).
4. No seu projeto, crie um `.env` e defina:
   ```bash
   DATABASE_URL=valor_da_MYSQL_URL
   ```
   O Railway entrega algo como `mysql://root:xxx@containers-us-west-xxx.railway.app:PORT/railway`. Cole esse valor em `DATABASE_URL`.
5. Rode `npm run dev`. Na primeira execução o Sequelize pode criar as tabelas com `sync()` (ou crie manualmente no **Data** do Railway).
6. **Na Vercel:** em Environment Variables, adicione `DATABASE_URL` com a mesma MYSQL_URL do Railway (no Railway: MySQL → Connect → "Public Networking" se a API estiver fora do Railway).

## Deploy na Vercel

1. Conecte o repositório em [vercel.com](https://vercel.com) ou use `npx vercel`.
2. **Variáveis de ambiente** (Project → Settings → Environment Variables):
   - **PlanetScale:** defina só `DATABASE_URL` com a connection string.
   - **Ou:** `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (e `DB_SSL=true` se não for PlanetScale).
3. Deploy: push no Git ou `vercel --prod`.

A API ficará em `https://seu-projeto.vercel.app/usuarios` e `.../reservas`.
