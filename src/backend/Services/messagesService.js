const messagesRepository = require('../Repository/messageRepository');

class MessagesService {
  async sendMessage(conversation_id, sender_id, message) {
    return await messagesRepository.createMessage(conversation_id, sender_id, message);
  }

  async getMessages(conversation_id) {
    return await messagesRepository.getMessagesByConversation(conversation_id);
  }
}

module.exports = new MessagesService();
