require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');

const corsOptions = require('./config/corsConfig');

const userRoutes = require('./Routes/userRoutes');
const adsRoutes = require('./Routes/adsRoutes'); 
const savedAdsRoutes = require('./Routes/savedAdsRoutes');
const conversationsRoutes = require('./Routes/conversationsRoutes');
const messagesRoutes = require('./Routes/messageRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));


// Servir imágenes desde 
//app.use('/images', express.static(process.env.UPLOADS_PATH));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/saved', savedAdsRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/messages', messagesRoutes);

// Middleware de errores
app.use(errorMiddleware);

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});
