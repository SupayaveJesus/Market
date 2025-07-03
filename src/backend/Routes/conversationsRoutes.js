const express = require('express');
const router = express.Router();

const conversationsController = require('../Controllers/conversationsController');
const authMiddleware = require('../middleware/authenticateJWT');

// iniciar una conversación
// POST: /api/conversations
router.post('/', authMiddleware, conversationsController.start);
// obtener conversaciones del usuario
// GET: /api/conversations
router.get('/', authMiddleware, conversationsController.getMyConversations);

module.exports = router;