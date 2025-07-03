const adService = require('../Services/adsService');
const { handleRequest } = require('../utils/handleRequest');

class AdController {
    async create(req, res) {
        await handleRequest(async (adData, files) => {
            const images = files?.map(file => file.path);
            adData = {
                ...adData,
                images,
                id_user: req.user.id_user
            };
            const ad = await adService.createAd(adData);
            return { message: "Anuncio creado exitosamente", data: ad };
        }, [req.body, req.files], res);
    }

    async getAll(req, res) {
        await handleRequest(async (limit, offset) => {
            limit = Number.isInteger(limit) && limit > 0 ? limit : 10;
            offset = Number.isInteger(offset) && offset >= 0 ? offset : 0;

            const ads = await adService.getAllAds(limit, offset);
            return { message: "Anuncios obtenidos correctamente", data: ads };
        }, [parseInt(req.query.limit), parseInt(req.query.offset)], res);
    }

    async getById(req, res) {
        await handleRequest(async (adId) => {
            const ad = await adService.getAdById(adId);
            if (!ad) throw new Error('Anuncio no encontrado');
            return { message: "Anuncio obtenido correctamente", data: ad };
        }, [req.params.id], res);
    }

    async update(req, res) {
        await handleRequest(async (adId, adData, userId, files) => {
            const ad = await adService.updateAd(adId, adData, userId, files);
            if (!ad) throw new Error('Anuncio no autorizado. No eres dueño de este anuncio!');
            return { message: "Anuncio actualizado correctamente", data: ad };
        }, [req.params.id, req.body, req.user.id_user, req.files], res);
    }

    // Eliminar anuncio (solo lógico: marca deleted_at)
    async delete(req, res) {
        await handleRequest(async (adId, userId) => {
            await adService.deleteAd(adId, userId);
            return { message: "Anuncio eliminado correctamente" };
        }, [req.params.id, req.user.id_user], res);
    }

    async getByCategory(req, res) {
        await handleRequest(async (categoryId, search, limit, offset) => {
            const ads = await adService.searchAds(search, categoryId, limit, offset);
            return { message: "Anuncios por categoría obtenidos correctamente", data: ads };
        }, [
            parseInt(req.params.categoryId),
            req.query.search || '',
            parseInt(req.query.limit) || 10,
            parseInt(req.query.offset) || 0
        ], res);
    }


    async getFeatured(req, res) {
        await handleRequest(async (limit, offset) => { 
            const ads = await adService.getFeaturedAds(limit, offset);
            return { message: "Anuncios destacados obtenidos correctamente", data: ads };
        }, [parseInt(req.query.limit), parseInt(req.query.offset)], res);
    }

    async search(req, res) {
    await handleRequest(async (search, categoryId, limit, offset) => {
        const results = await adService.searchAds(search, categoryId, limit, offset);
        return { message: "Resultados de búsqueda", data: results };
    }, [
        req.query.search || '',
        req.query.category_id ? parseInt(req.query.category_id) : null,
        
    ], res);
}   
}

module.exports = new AdController();
