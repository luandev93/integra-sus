// Middleware de tratamento global de erros.
// Precisa ser o último da cadeia (assinatura de 4 argumentos é o que
// o Express usa para reconhecer um error handler).
function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const isDev = (process.env.NODE_ENV || 'development') !== 'production';

  console.error(`[erro] ${req.method} ${req.originalUrl} ->`, err);

  res.status(status).json({
    error: {
      message: err.message || 'Erro interno no gateway de interoperabilidade.',
      ...(isDev && { stack: err.stack }),
    },
  });
}

module.exports = errorHandler;
