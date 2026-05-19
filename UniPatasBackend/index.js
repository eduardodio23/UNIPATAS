const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pet_vida'
});

db.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar no banco de dados:', erro);
    return;
  }
  console.log('✅ Conectado ao MySQL com sucesso!');
});

app.get('/tutores', (req, res) => {
  const comandoSql = 'SELECT * FROM tutores';

  db.query(comandoSql, (erro, resultados) => {
    if (erro) {
      res.status(500).send('Erro ao buscar tutores');
      return;
    }
    res.json(resultados);
  });
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`🚀 Servidor do Uni Patas rodando na porta http://localhost:${PORTA}`);
});