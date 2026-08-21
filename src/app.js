const express = require('express');
const healthRoute = require('./routes/health');
const errorHandler = require('./middlewares/errorHandler');

function criarApp() {
  const app = express();

  app.use(express.json());

  app.use('/health', healthRoute);

  // Rota não mapeada
  app.use((req, res) => {
    res.status(404).json({ error: { message: 'Rota não encontrada.' } });
  });

  // Tratamento global de erros: sempre por último
  app.use(errorHandler);

  return app;
}

module.exports = criarApp;
