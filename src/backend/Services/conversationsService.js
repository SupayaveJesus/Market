const conversationsRepository = require('../Repository/conversationsRepository');
const messagesRepository = require('../Repository/messageRepository');


class ConversationsService{
    async sendMessage(ad_id, sender_id, receiver_id, message){
        const conversation = await conversationsRepository.findOrCreate(ad_id, sender_id, receiver_id);
        const newMessage = await messagesRepository.createMessage(conversation.id, sender_id, message);
        return newMessage;
    }
    
    async getUserConversations(user_id){
        return await conversationsRepository.getUserConversations(user_id);
    }
    
    async getMessages(conversation_id){
        return await messagesRepository.getMessagesByConversation(conversation_id);
    }
}
module.exports = new ConversationsService();