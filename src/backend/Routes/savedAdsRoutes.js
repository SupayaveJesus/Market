const express = require('express');
const router = express.Router();
const savedAdsController = require('../Controllers/savedController');
const authenticateJWT = require('../middleware/authenticateJWT');

// Guardar un anuncio
router.post('/', authenticateJWT, savedAdsController.save);
//obtener todos los anuncios guardados de un usuario
router.get('/', authenticateJWT, savedAdsController.getAll);
// Eliminar un anuncio guardado
router.delete('/:ad_id', authenticateJWT, savedAdsController.remove);

module.exports = router;
    