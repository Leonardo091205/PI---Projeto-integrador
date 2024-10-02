
const homeRoute = (req, res) => {
    res.statusCode = 200; // C�digo de status 200 OK
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Pagina Inicial</h1><p>Bem-vindo ao servidor HTTP!</p>');
};

module.exports = homeRoute; // Exporta a funcao para uso no servidor
