const express = require('express');
const multer = require('multer');
const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');

const app = express();
const port = 8080;

// Configuração do multer para armazenar arquivos enviados
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    },
});

const upload = multer({ storage });

// Middleware para lidar com dados POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas
app.get('/', homeRoute);
app.get('/sobre', aboutRoute);

// Rota para receber dados via POST
app.post('/dados', (req, res) => {
    console.log(req.body); // Exibe os dados recebidos no console
    res.send('Dados recebidos com sucesso!');
});

// Rota para upload de arquivos
app.post('/upload', upload.single('arquivo'), (req, res) => {
    if (req.file) {
        res.send('Arquivo enviado com sucesso!');
    } else {
        res.status(400).send('Erro ao enviar o arquivo.');
    }
});

// Rota de 404
app.use((req, res) => {
    res.status(404).send('<h1>Página Não Encontrada</h1><p>A página que você está tentando acessar não existe.</p>');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}/`);
});