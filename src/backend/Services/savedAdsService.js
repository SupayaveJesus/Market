const adsRepository = require('../Repository/adsRepository');
const savedAdsRepository = require('../Repository/savedAdsRepository');

class SavedAdsService {
    async saveAd(id_user, ad_id) {
      
      const alreadySaved = await savedAdsRepository.isAdSaved(id_user, ad_id);
      
      if (alreadySaved) {
        throw new Error('El anuncio ya fue guardado');
      }

      const adOwner = await adsRepository.getOwnerByAdId(ad_id);
      if(!adOwner){
        throw new Error('El anuncio no existe');
      }
      if(adOwner.id_user === id_user){
        throw new Error('No puedes guardar tu propio anuncio');
      }
      return await savedAdsRepository.saveAd(id_user, ad_id);
    }
  
    async getUserSavedAds(id_user) {
      return await savedAdsRepository.getUserSavedAds(id_user);
    }
  
    async removeSavedAd(id_user, ad_id) {
      return await savedAdsRepository.removeSavedAd(id_user, ad_id);
    }
}
  
  module.exports = new SavedAdsService();