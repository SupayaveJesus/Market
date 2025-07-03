// backend/user/userRoute.js

const express = require('express');
const userController = require('../Controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Registro y login
router.post('/register', userController.register);
router.post('/login', userController.login);

// Perfil del usuario
router.get('/profile', authenticateJWT, userController.getProfile);

// Anuncios del usuario autenticado
router.get('/my-ads', authenticateJWT, userController.getUserAds);

module.exports = router;
