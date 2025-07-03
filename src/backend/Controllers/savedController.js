const { handleRequest } = require('../utils/handleRequest');
const savedAdsService = require('../Services/savedAdsService');

class SavedAdsController {
  async save(req, res) {
    await handleRequest(async (id_user, ad_id) => {
      const savedAd = await savedAdsService.saveAd(id_user, ad_id);
      return { 
        message: 'Anuncio guardado correctamente', 
        data: savedAd 
      };
    }, [req.user.id_user, req.body.ad_id], res);
  }

  async getAll(req, res) {
    await handleRequest(async (id_user) => {
      const saved = await savedAdsService.getUserSavedAds(id_user);
      return { 
        message: 'Anuncios guardados obtenidos correctamente', 
        data: saved
       };
    }, [req.user.id_user], res);
  }

  async remove(req, res) {
    await handleRequest(async (id_user, ad_id) => {
      await savedAdsService.removeSavedAd(id_user, ad_id);
      return { message: 'Anuncio eliminado de guardados' };
    }, [req.user.id_user, req.params.ad_id], res);
  }
}

module.exports = new SavedAdsController();
