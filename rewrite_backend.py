from pathlib import Path
path = Path(r'c:\Users\aluno.den\Documents\PA-99160\UniPatasBackend\index.js')
code = '''const express = require('express');
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
  initializeDatabase();
});

function initializeDatabase() {
  const createTables = [
    `CREATE TABLE IF NOT EXISTS clientes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      email VARCHAR(150),
      telefone VARCHAR(50),
      endereco VARCHAR(255),
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`,

    `CREATE TABLE IF NOT EXISTS pets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cliente_id INT,
      nome VARCHAR(150) NOT NULL,
      especie VARCHAR(100),
      raca VARCHAR(100),
      idade INT,
      observacoes TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
    ) ENGINE=InnoDB;`,

    `CREATE TABLE IF NOT EXISTS produtos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10,2) NOT NULL DEFAULT 0,
      estoque INT NOT NULL DEFAULT 0,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;`,

    `CREATE TABLE IF NOT EXISTS vendas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cliente_id INT,
      total DECIMAL(10,2) NOT NULL DEFAULT 0,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL
    ) ENGINE=InnoDB;`,

    `CREATE TABLE IF NOT EXISTS venda_itens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      venda_id INT NOT NULL,
      produto_id INT NOT NULL,
      quantidade INT NOT NULL,
      preco_unitario DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (venda_id) REFERENCES vendas(id) ON DELETE CASCADE,
      FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;`,

    `CREATE TABLE IF NOT EXISTS movimentacoes_estoque (
      id INT AUTO_INCREMENT PRIMARY KEY,
      produto_id INT NOT NULL,
      quantidade INT NOT NULL,
      tipo ENUM('entrada','saida') NOT NULL,
      motivo VARCHAR(255),
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;`
  ];

  createTables.forEach((sql) => {
    db.query(sql, (erro) => {
      if (erro) {
        console.error('Erro ao inicializar tabela:', erro);
      }
    });
  });
}

function handleQuery(res, erro, resultados, mensagemErro) {
  if (erro) {
    console.error(mensagemErro, erro);
    res.status(500).json({ error: mensagemErro });
    return false;
  }
  return true;
}

app.get('/clientes', (req, res) => {
  db.query('SELECT * FROM clientes ORDER BY id DESC', (erro, resultados) => {
    if (!handleQuery(res, erro, resultados, 'Erro ao buscar clientes')) return;
    res.json(resultados);
  });
});

app.post('/clientes', (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  db.query(
    'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)',
    [nome, email, telefone, endereco],
    (erro, resultados) => {
      if (!handleQuery(res, erro, resultados, 'Erro ao cadastrar cliente')) return;
      res.json({ id: resultados.insertId, nome, email, telefone, endereco });
    }
  );
});

app.get('/pets', (req, res) => {
  const sql = `SELECT p.*, c.nome as cliente_nome FROM pets p
    LEFT JOIN clientes c ON p.cliente_id = c.id
    ORDER BY p.id DESC`;
  db.query(sql, (erro, resultados) => {
    if (!handleQuery(res, erro, resultados, 'Erro ao buscar pets')) return;
    res.json(resultados);
  });
});

app.post('/pets', (req, res) => {
  const { cliente_id, nome, especie, raca, idade, observacoes } = req.body;
  db.query(
    'INSERT INTO pets (cliente_id, nome, especie, raca, idade, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
    [cliente_id || null, nome, especie, raca, idade || null, observacoes],
    (erro, resultados) => {
      if (!handleQuery(res, erro, resultados, 'Erro ao cadastrar pet')) return;
      res.json({ id: resultados.insertId, cliente_id, nome, especie, raca, idade, observacoes });
    }
  );
});

app.get('/produtos', (req, res) => {
  db.query('SELECT * FROM produtos ORDER BY id DESC', (erro, resultados) => {
    if (!handleQuery(res, erro, resultados, 'Erro ao buscar produtos')) return;
    res.json(resultados);
  });
});

app.post('/produtos', (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;
  db.query(
    'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)',
    [nome, descricao, preco || 0, estoque || 0],
    (erro, resultados) => {
      if (!handleQuery(res, erro, resultados, 'Erro ao cadastrar produto')) return;
      res.json({ id: resultados.insertId, nome, descricao, preco, estoque });
    }
  );
});

app.get('/estoque', (req, res) => {
  db.query(
    'SELECT id, nome, preco, estoque FROM produtos ORDER BY nome',
    (erro, resultados) => {
      if (!handleQuery(res, erro, resultados, 'Erro ao buscar estoque')) return;
      res.json(resultados);
    }
  );
});

app.get('/movimentacoes', (req, res) => {
  const sql = `SELECT m.*, p.nome AS produto_nome FROM movimentacoes_estoque m
    LEFT JOIN produtos p ON m.produto_id = p.id
    ORDER BY m.id DESC LIMIT 50`;
  db.query(sql, (erro, resultados) => {
    if (!handleQuery(res, erro, resultados, 'Erro ao buscar movimentações')) return;
    res.json(resultados);
  });
});

app.post('/estoque/saida', (req, res) => {
  const { produto_id, quantidade, motivo } = req.body;
  if (!produto_id || !quantidade || quantidade <= 0) {
    return res.status(400).json({ error: 'Produto e quantidade válidos são obrigatórios.' });
  }

  db.query('SELECT estoque FROM produtos WHERE id = ?', [produto_id], (erro, resultados) => {
    if (!handleQuery(res, erro, resultados, 'Erro ao verificar produto')) return;
    if (!resultados.length) return res.status(404).json({ error: 'Produto não encontrado.' });

    const estoqueAtual = resultados[0].estoque;
    const novoEstoque = estoqueAtual - quantidade;
    if (novoEstoque < 0) {
      return res.status(400).json({ error: 'Estoque insuficiente.' });
    }

    db.query('UPDATE produtos SET estoque = ? WHERE id = ?', [novoEstoque, produto_id], (erro) => {
      if (!handleQuery(res, erro, null, 'Erro ao atualizar estoque')) return;
      db.query(
        'INSERT INTO movimentacoes_estoque (produto_id, quantidade, tipo, motivo) VALUES (?, ?, ?, ?)',
        [produto_id, quantidade, 'saida', motivo],
        (erroMov) => {
          if (!handleQuery(res, erroMov, null, 'Erro ao registrar movimentação')) return;
          res.json({ produto_id, quantidade, tipo: 'saida', motivo, novoEstoque });
        }
      );
    });
  });
});

app.get('/vendas', (req, res) => {
  const sql = `SELECT v.*, c.nome AS cliente_nome FROM vendas v
    LEFT JOIN clientes c ON v.cliente_id = c.id
    ORDER BY v.id DESC`;
  db.query(sql, (erro, resultados) => {
    if (!handleQuery(res, erro, resultados, 'Erro ao buscar vendas')) return;
    res.json(resultados);
  });
});

app.post('/vendas', (req, res) => {
  const { cliente_id, itens } = req.body;
  if (!Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ error: 'Itens da venda são obrigatórios.' });
  }

  let total = 0;
  itens.forEach((item) => {
    total += item.preco_unitario * item.quantidade;
  });

  db.beginTransaction((erroTransacao) => {
    if (erroTransacao) {
      return res.status(500).json({ error: 'Erro ao iniciar transação de venda.' });
    }

    db.query(
      'INSERT INTO vendas (cliente_id, total) VALUES (?, ?)',
      [cliente_id || null, total],
      (erroVenda, resultadoVenda) => {
        if (erroVenda) {
          return db.rollback(() => res.status(500).json({ error: 'Erro ao registrar venda.' }));
        }

        const vendaId = resultadoVenda.insertId;
        const itensPromises = itens.map((item) => {
          return new Promise((resolve, reject) => {
            db.query(
              'INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
              [vendaId, item.produto_id, item.quantidade, item.preco_unitario],
              (erroItem) => {
                if (erroItem) return reject(erroItem);
                db.query('SELECT estoque FROM produtos WHERE id = ?', [item.produto_id], (erroEstoque, resultadosEstoque) => {
                  if (erroEstoque) return reject(erroEstoque);
                  const estoqueAtual = resultadosEstoque[0]?.estoque ?? 0;
                  const novoEstoque = estoqueAtual - item.quantidade;
                  if (novoEstoque < 0) return reject(new Error('Estoque insuficiente para um dos produtos.'));
                  db.query('UPDATE produtos SET estoque = ? WHERE id = ?', [novoEstoque, item.produto_id], (erroAtualiza) => {
                    if (erroAtualiza) return reject(erroAtualiza);
                    db.query(
                      'INSERT INTO movimentacoes_estoque (produto_id, quantidade, tipo, motivo) VALUES (?, ?, ?, ?)',
                      [item.produto_id, item.quantidade, 'saida', 'Venda'],
                      (erroMov) => {
                        if (erroMov) return reject(erroMov);
                        resolve();
                      }
                    );
                  });
                });
              }
            );
          });
        });

        Promise.all(itensPromises)
          .then(() => {
            db.commit((erroCommit) => {
              if (erroCommit) {
                return db.rollback(() => res.status(500).json({ error: 'Erro ao confirmar venda.' }));
              }
              res.json({ id: vendaId, cliente_id, total, itens });
            });
          })
          .catch((erroItens) => {
            db.rollback(() => {
              console.error('Erro ao processar itens de venda:', erroItens);
              res.status(500).json({ error: 'Erro ao processar item de venda.' });
            });
          });
      }
    );
  });
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`🚀 Servidor do Uni Patas rodando na porta http://localhost:${PORTA}`);
});'''
path.write_text(code, encoding='utf-8')
