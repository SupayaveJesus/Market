const db = require("../config/pgConnection");
const Conversation = require("../Models/conversations");

class ConversationsRepository {
  async createConversation(ad_id, sender_id, receiver_id) {
    const sql = `
      INSERT INTO conversations (ad_id, sender_id, receiver_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(sql, [ad_id, sender_id, receiver_id]);
    return new Conversation(result.rows[0]);
  }

  async getByAdAndUsers(ad_id, user1_id, user2_id) {
    const sql = `
      SELECT * FROM conversations
      WHERE ad_id = $1 AND (
        (sender_id = $2 AND receiver_id = $3) OR
        (sender_id = $3 AND receiver_id = $2)
      )
    `;
    const result = await db.query(sql, [ad_id, user1_id, user2_id]);
    return result.rows[0] ? new Conversation(result.rows[0]) : null;
  }

  async findOrCreate(ad_id, sender_id, receiver_id) {
    const existing = await this.getByAdAndUsers(ad_id, sender_id, receiver_id);
    if (existing) return existing;
    return await this.createConversation(ad_id, sender_id, receiver_id);
  }

  async getUserConversations(user_id) {
    const sql = `
      SELECT c.*, 
             a.title AS ad_title,
             u1.first_name || ' ' || u1.last_name AS sender_name,
             u2.first_name || ' ' || u2.last_name AS receiver_name
      FROM conversations c
      JOIN ads a ON a.id = c.ad_id
      JOIN users u1 ON u1.id_user = c.sender_id
      JOIN users u2 ON u2.id_user = c.receiver_id
      WHERE c.sender_id = $1 OR c.receiver_id = $1
      ORDER BY c.id DESC
    `;
    const result = await db.query(sql, [user_id]);
    return result.rows.map(row => ({ ...row }));
  }

  async getById(id) {
    const sql = `SELECT * FROM conversations WHERE id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0] ? new Conversation(result.rows[0]) : null;
  }
}

module.exports = new ConversationsRepository();
