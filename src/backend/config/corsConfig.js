const corsOptions = {
    origin: true, // Permitir TODOS los orígenes en desarrollo
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Session-id', 'X-Requested-With', 'X-Real-IP', 'X-Forwarded-For', 'X-Forwarded-Proto'],
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
