const criarApp = require('./app');
const env = require('./config/env');

const app = criarApp();

app.listen(env.port, () => {
  console.log(`[integra_SUS_HMMV] rodando em modo ${env.nodeEnv} na porta ${env.port}`);
});
