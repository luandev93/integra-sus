const { Router } = require('express');

const router = Router();
const iniciadoEm = Date.now();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    servico: 'integra_SUS_HMMV',
    ambiente: process.env.NODE_ENV || 'development',
    uptimeSegundos: Math.floor((Date.now() - iniciadoEm) / 1000),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
