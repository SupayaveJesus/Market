const adsRepository = require("../Repository/adsRepository");
const path = require("path");

class adsService {
  async createAd(data, files) {
    const ad = await adsRepository.createAd(data);
    const adId = ad.id;

    // Subir imágenes desde archivos
    if (files && files.length > 0) {
      const imageNames = files.map((file) => path.basename(file.path));
      await adsRepository.addImagesToAd(adId, imageNames);
    }

    // Subir imágenes desde rutas
    if (data.images) {
      const imageArray = Array.isArray(data.images)
        ? data.images
        : [data.images];
      await adsRepository.addImagesToAd(adId, imageArray);
    }

    return ad;
  }

  async getAllAds(limit, offset) {
    return await adsRepository.getAllAds(limit, offset);
  }

  async getAdById(adId) {
    return await adsRepository.getAdById(adId);
  }

  async updateAd(adId, data, userId, files) {
    const ad = await adsRepository.getAdById(adId);

    if (!ad || ad.id_user !== userId) {
      return null; 
    }

    const updatedFields = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        updatedFields[key] = value;
      }
    }

    await adsRepository.updateAd(adId, updatedFields);

    if (files && files.length > 0) {
      const imageNames = files.map((file) => path.basename(file.path));
      await adsRepository.addImagesToAd(adId, imageNames);
    }

    if (data.images) {
      const imageArray = Array.isArray(data.images)
        ? data.images
        : [data.images];
      await adsRepository.addImagesToAd(adId, imageArray);
    }

    return await adsRepository.getAdById(adId);
  }

  async deleteAd(adId, userId) {
    return await adsRepository.deleteAd(adId, userId);
  }

  async getAdsByCategory(categoryId, limit, offset) {
    return await adsRepository.getAdsByCategory(categoryId, limit, offset);
  }

  async getFeaturedAds(limit, offset) {
    return await adsRepository.getFeaturedAds(limit, offset);
  }

  async updateIsFeatured(adId, isFeatured) {
    return await adsRepository.updateIsFeatured(adId, isFeatured);
  }

  async deleteImage(imageId) {
    return await adsRepository.deleteImage(imageId);
  }

  async searchAds(searchTerm, categoryId, limit, offset) {
    return await adsRepository.searchAds(searchTerm, categoryId, limit, offset);
  }
}

module.exports = new adsService();
