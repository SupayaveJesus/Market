const userModel =  require('../Models/user')
const { query } = require('../config/pgConnection');

class userRepository{
    async createUser (userData) {
        const sql= `
            INSERT INTO users (first_name, last_name, mail, password)
            VALUES ($1, $2, $3, $4) 
            RETURNING id_user, first_name, last_name, mail
        `;
        const result = await query(sql,[
            userData.first_name,
            userData.last_name,
            userData.mail,
            userData.password,
        ]);
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }
    async getUserByEmail (mail) {
        const sql = `SELECT * FROM users WHERE mail = $1`;
        const result = await query(sql,[mail]);
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }
    
    async getUserById(id_user){
        const sql = `
            SELECT id_user, first_name, last_name, mail
            FROM users
            WHERE id_user = $1
        `;
        const result = await query(sql, [id_user]);
        return result.rows.length ? new userModel(result.rows[0]) : null;
    }

    async getUserAds(id_user){
        const sql = `
            SELECT a.*, (
                SELECT url_img
                FROM image
                WHERE entity_id = a.id AND entity_type = 'ad' AND deleted_at IS NULL
                LIMIT 1

            ) AS image
            FROM ads a
            WHERE a.id_user = $1 AND a.deleted_at IS NULL
            ORDER BY a.created_at DESC
        `;
        const result = await query(sql, [id_user]);
        return result.rows;
    }  
}

module.exports = new userRepository();