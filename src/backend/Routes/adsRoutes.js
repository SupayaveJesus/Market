const express = require('express');
const AdController = require('../Controllers/adsController');
const { upload } = require('../middleware/uploadMiddleware');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();

// Buscar anuncios 
router.get('/search', AdController.search);

// Obtener anuncios destacados
router.get('/featured/all', AdController.getFeatured);

// Obtener anuncios por categoría con búsqueda opcional
router.get('/category/:categoryId', AdController.getByCategory);

// Crear anuncio 
router.post('/', authenticateJWT, upload.array('images'), AdController.create);

// Obtener todos los anuncios activos 
router.get('/', AdController.getAll);

// Obtener anuncio por ID 
router.get('/:id', AdController.getById);

// Actualizar anuncio 
router.put('/:id', authenticateJWT, upload.array('images'), AdController.update);

// Eliminar anuncio 
router.delete('/:id', authenticateJWT, AdController.delete);

module.exports = router;
