# Banco de dados da lista de operadoras ANS

Recebe solicitações do <a href='https://github.com/pablofsc/interface-ic'>front</a> e as realiza no banco de dados. <br>
Este projeto deve ser hospedado no Heroku com um banco PostgreSQL devidamente configurado e carregado com os dados <a href='http://www.ans.gov.br/externo/site_novo/informacoes_avaliacoes_oper/lista_cadop.asp'>deste CSV<a>.

## Principais tecnologias utilizadas
- Node.js
- Express.js
- node-postgres para manuseio do banco PostgreSQL

## Executar
- `npm i` para instalar as dependências; <br>
- `npm run dev` ou `node .` para executar. <br>

## Requisitos
O projeto requer um arquivo `.env` com os seguintes valores:
- `PORT`: porta em que o projeto deve operar (e.g. 3000)
- `DATABASE_URL`: URL do banco de dados

Quando executado no Heroku, estes dados já são providos diretamente à aplicação, portanto o projeto não deve sofrer deploy com as variáveis de ambiente.
