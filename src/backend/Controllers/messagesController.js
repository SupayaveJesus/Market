const messagesService = require("../Services/messagesService");
const { handleRequest } = require("../utils/handleRequest");

class MessagesController {
  async send(req, res) {
    await handleRequest(
      async (conversation_id, sender_id, message) => {
        const msg = await messagesService.sendMessage(
          conversation_id,
          sender_id,
          message
        );
        return {
          message: "Mensaje enviado correctamente",
          data: msg,
        };
      },
      [req.body.conversation_id, req.user.id_user, req.body.message],
      res
    );
  }

  async getMessages(req, res) {
    await handleRequest(
      async (conversation_id) => {
        const messages = await messagesService.getMessages(conversation_id);
        return {
          message: "Mensajes obtenidos correctamente",
          data: messages,
        };
      },
      [req.params.id_conversation],
      res
    );
  }
}

module.exports = new MessagesController();
