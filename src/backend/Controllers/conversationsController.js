const conversationsService = require("../Services/conversationsService");
const conversationsRepository = require("../Repository/conversationsRepository");
const adsRepository = require("../Repository/adsRepository");
const { handleRequest } = require("../utils/handleRequest");

class conversationsController{
    
    async start(req, res) {
        await handleRequest(async (id_user, ad_id) => {
            const ad = await adsRepository.getById(ad_id);
            if (!ad) throw new Error("Anuncio no encontrado");
    
            const receiver_id = ad.id_user;
    
            
            if (id_user === receiver_id) {
                throw new Error("No puedes iniciar conversación contigo mismo");
            }
    
            const existing = await conversationsRepository.getByAdAndUsers(ad_id, id_user, receiver_id);
            if (existing) return { 
                message: "Conversación ya existente", 
                data: existing 
            };
    
            const conversation = await conversationsRepository.createConversation(ad_id, id_user, receiver_id);
            return { 
                message: "Conversación creada", 
                data: conversation 
            };

        }, [req.user.id_user, req.body.ad_id], res);
    }
    
    async getMyConversations(req, res){
        await handleRequest(async(id_user) => {
            const conv = await conversationsService.getUserConversations(id_user);
            return{
                message : "Conversations obtained",
                data : conv
            };
        },[req.user.id_user],res);
    }
}

module.exports = new conversationsController();