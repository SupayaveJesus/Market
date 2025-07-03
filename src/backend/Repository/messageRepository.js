const db = require('../config/pgConnection');
const Message = require('../Models/messages');

class MessagesRepository {
  async createMessage(conversation_id, sender_id, message) {
    const sql = `
      INSERT INTO messages (conversation_id, sender_id, message, sent_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    const result = await db.query(sql, [conversation_id, sender_id, message]);
    return new Message(result.rows[0]);
  }

  async getMessagesByConversation(conversation_id) {
    const sql = `
      SELECT m.*, u.first_name, u.last_name
      FROM messages m
      JOIN users u ON u.id_user = m.sender_id
      WHERE m.conversation_id = $1
      ORDER BY m.sent_at ASC
    `;
    const result = await db.query(sql, [conversation_id]);
    return result.rows.map(row => ({
      id: row.id,
      sender_id: row.sender_id,
      conversation_id: row.conversation_id,
      message: row.message,
      sent_at: row.sent_at,
      sender_name: `${row.first_name} ${row.last_name}`
    }));
  }
}

module.exports = new MessagesRepository();
