class Messages{
    constructor({id, conversation_id, sender_id, message, sent_at}){
        this.id = id;
        this.conversation_id = conversation_id;
        this.sender_id = sender_id;
        this.message = message;
        this.sent_at = sent_at;
    }
}

module.exports = Messages;