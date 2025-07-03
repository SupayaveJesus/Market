const db = require("../config/pgConnection");
const SavedAd = require("../Models/savedAds");

class SavedAdsRepository {
  async saveAd(id_user, ad_id) {
    const sql = `
        INSERT INTO saved_ads (id_user, ad_id)
        VALUES ($1, $2)
        RETURNING *
      `;
    const result = await db.query(sql, [id_user, ad_id]);
    return new SavedAd(result.rows[0]);
  }

  async getUserSavedAds(id_user) {
    const sql = `
        SELECT sa.*, a.title, a.price,
              u.first_name || ' ' || u.last_name AS seller_name,
              JSON_AGG(
                CASE 
                  WHEN i.id IS NOT NULL AND i.url_img IS NOT NULL THEN
                  JSON_BUILD_OBJECT('id', i.id, 'url_img', i.url_img)
                END
              ) AS images
        FROM saved_ads sa
        JOIN ads a ON sa.ad_id = a.id
        JOIN users u ON a.id_user = u.id_user
        LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad' AND i.deleted_at IS NULL
        WHERE sa.id_user = $1
        GROUP BY sa.id, a.title, a.price, u.first_name, u.last_name
        ORDER BY sa.id DESC
      `;
    const result = await db.query(sql, [id_user]);

    return result.rows.map((row) => ({
      id: row.id,
      id_user: row.id_user,
      ad_id: row.ad_id,
      title: row.title,
      price: row.price,
      seller_name: row.seller_name, 
      images: row.images.filter((img) => img !== null), // seguridad extra
    }));
  }

  async removeSavedAd(id_user, ad_id) {
    await db.query(`DELETE FROM saved_ads WHERE id_user = $1 AND ad_id = $2`, [
      id_user,
      ad_id,
    ]);
  }

  async isAdSaved(id_user, ad_id) {
    const result = await db.query(
      `SELECT * FROM saved_ads WHERE id_user = $1 AND ad_id = $2`,
      [id_user, ad_id]
    );
    return result.rows.length > 0;
  }
}

module.exports = new SavedAdsRepository();
