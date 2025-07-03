const express = require('express');
const router = express.Router();
const messagesController = require('../Controllers/messagesController');
const authenticateJWT = require('../middleware/authenticateJWT');

// Enviar mensaje
router.post('/', authenticateJWT, messagesController.send);

// Obtener mensajes por conversación
router.get('/:id_conversation', authenticateJWT, messagesController.getMessages);

module.exports = router;
