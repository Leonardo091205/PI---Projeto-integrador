
const aboutRoute = (req, res) => {
    res.statusCode = 200; // Codigo de status 200 OK
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Sobre</h1><p>Esta e uma pagina sobre o servidor.</p>');
};

module.exports = aboutRoute; // Exporta a funçao para uso no servidor