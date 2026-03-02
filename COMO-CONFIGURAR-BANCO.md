# Onde pegar os dados do MySQL no Railway

A interface do Railway **não** tem um menu "Connect" na esquerda. Os dados ficam em **Variables** e, para conectar do seu PC, você precisa ativar o **TCP Proxy** em **Settings**.

---

## Opção 1: Aba Variables

1. No Railway, clique no seu projeto.
2. Clique no **quadrado do MySQL** (o serviço do banco).
3. No **topo** da tela deve ter abas: **Deployments**, **Variables**, **Settings**, etc.
4. Clique na aba **Variables**.
5. Você vai ver uma lista com nomes e valores. Procure:
   - **MYSQLHOST** → se o valor for algo como **xxxx.proxy.rlwy.net**, esse é o host público. Copie esse valor para **DB_HOST** no seu `.env`.
   - **MYSQLPORT** → copie o número para **DB_PORT** no seu `.env`.
   - **MYSQLUSER** → normalmente `root` (já está no .env).
   - **MYSQLPASSWORD** → sua senha (já está no .env).
   - **MYSQLDATABASE** → normalmente `railway` (já está no .env).

Se **MYSQLHOST** for **mysql.railway.internal**, a conexão é só interna. Aí use a **Opção 2** para criar o endereço público.

---

## Opção 2: Ativar TCP Proxy (para ter host e porta públicos)

1. Com o serviço **MySQL** aberto, clique na aba **Settings** (no topo).
2. Role até achar a parte **Networking** (ou **Rede**).
3. Procure **TCP Proxy** (ou “Proxy TCP”).
   - Se estiver desligado, **ative** (toggle ou botão).
   - O Railway vai mostrar um **domínio** (tipo `xxxx.proxy.rlwy.net`) e uma **porta** (um número).
4. Anote ou copie:
   - **Domínio** → no `.env`, em **DB_HOST=**, cole esse domínio.
   - **Porta** → no `.env`, em **DB_PORT=**, cole esse número.
5. Salve o `.env` (Ctrl+S).

Depois rode de novo no terminal: `npm run dev`.

---

## Resumo

| Onde no Railway | O que fazer |
|-----------------|------------|
| Aba **Variables** | Ver **MYSQLHOST** e **MYSQLPORT**. Se MYSQLHOST for `.proxy.rlwy.net`, use esses valores no .env em DB_HOST e DB_PORT. |
| Aba **Settings** → **Networking** → **TCP Proxy** | Se Variables só tiver `mysql.railway.internal`, ative o TCP Proxy aqui e use o domínio e a porta que aparecerem em DB_HOST e DB_PORT. |

No seu **.env**:

- **DB_HOST=** valor do host (ex: `monorail.proxy.rlwy.net`)
- **DB_PORT=** valor da porta (ex: `12345`)

Sem espaço depois do `=`.
