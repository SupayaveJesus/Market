const db = require("../config/pgConnection");
const Ad = require("../Models/ads");
const path = require("path");

class AdsRepository {
  async getAllAds(limit = 10, offset = 0) {
    const sql = `
      SELECT a.*, 
             c.name AS category_name,
             u.first_name || ' ' || u.last_name AS seller_name,
             JSON_AGG(
                JSON_BUILD_OBJECT('id', i.id, 'url_img', CONCAT('/uploads/', i.url_img))
             ) AS images
      FROM ads a
      JOIN category c ON a.id_category = c.id
      JOIN users u ON a.id_user = u.id_user
      LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad' AND i.deleted_at IS NULL
      WHERE a.deleted_at IS NULL AND a.is_active = TRUE
      GROUP BY a.id, c.name, u.first_name, u.last_name
      ORDER BY a.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await db.query(sql, [limit, offset]);
    return result.rows.map((row) => new Ad(row));
  }

  async getAdsByCategory(categoryId, limit = 10, offset = 0) {
    const sql = `
      SELECT a.*, 
             c.name AS category_name,
             JSON_AGG(
                JSON_BUILD_OBJECT('id', i.id, 'url_img', CONCAT('/uploads/', i.url_img))
             ) AS images
      FROM ads a
      JOIN category c ON a.id_category = c.id
      LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad' AND i.deleted_at IS NULL
      WHERE a.id_category = $1 AND a.deleted_at IS NULL AND a.is_active = TRUE
      GROUP BY a.id, c.name
      ORDER BY a.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await db.query(sql, [categoryId, limit, offset]);
    return result.rows.map((row) => new Ad(row));
  }

  async getAdById(id) {
    const sql = `
      SELECT a.*, 
             c.name AS category_name,
             u.first_name || ' ' || u.last_name AS seller_name,
             JSON_AGG(
                JSON_BUILD_OBJECT('id', i.id, 'url_img', CONCAT('/uploads/', i.url_img))
             ) AS images
      FROM ads a
      JOIN users u ON a.id_user = u.id_user
      JOIN category c ON a.id_category = c.id
      LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad' AND i.deleted_at IS NULL
      WHERE a.id = $1 AND a.deleted_at IS NULL
      GROUP BY a.id, c.name, u.first_name, u.last_name
    `;
    const result = await db.query(sql, [id]);
    return result.rows.length ? new Ad(result.rows[0]) : null;
  }

  async createAd(data) {
    const sql = `
      INSERT INTO ads (title, description, price, is_active, is_featured, id_user, id_category)
      VALUES ($1, $2, $3, TRUE, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      data.title,
      data.description,
      parseFloat(data.price),
      data.is_featured === "true" || data.is_featured === true,
      data.id_user,
      parseInt(data.id_category),
    ];
    const result = await db.query(sql, values);
    return new Ad(result.rows[0]);
  }

  async updateAd(id, data) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    values.push(id);

    const sql = `
      UPDATE ads
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${index} AND deleted_at IS NULL
      RETURNING *
    `;
    const result = await db.query(sql, values);
    return result.rows.length ? new Ad(result.rows[0]) : null;
  }

  async deleteAd(id) {
    await db.query(`UPDATE ads SET deleted_at = NOW() WHERE id = $1`, [id]);
    await db.query(
      `UPDATE image SET deleted_at = NOW() WHERE entity_id = $1 AND entity_type = 'ad'`,
      [id]
    );
  }

  async deleteImage(imageId) {
    await db.query(`UPDATE image SET deleted_at = NOW() WHERE id = $1`, [
      imageId,
    ]);
  }

  async getFeaturedAds(limit = 10, offset = 0) {
    const sql = `
      SELECT a.*, 
       c.name AS category_name,
       u.first_name || ' ' || u.last_name AS seller_name,
       JSON_AGG(
          JSON_BUILD_OBJECT('id', i.id, 'url_img', CONCAT('/uploads/', i.url_img))
       ) AS images
        FROM ads a
        JOIN category c ON a.id_category = c.id
        JOIN users u ON a.id_user = u.id_user
        LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad' AND i.deleted_at IS NULL
        WHERE a.is_featured = TRUE AND a.deleted_at IS NULL AND a.is_active = TRUE
        GROUP BY a.id, c.name, u.first_name, u.last_name
        ORDER BY a.created_at DESC
        LIMIT $1 OFFSET $2
  `;
    const result = await db.query(sql, [limit, offset]);
    return result.rows.map((row) => new Ad(row));
  }

  async addImagesToAd(adId, imageNames) {
    const values = imageNames
      .map((name) => {
        const filename = path.basename(name); 
        return `('${adId}', '${filename}', 'ad')`;
      })
      .join(", ");

    const sql = `
      INSERT INTO image (entity_id, url_img, entity_type)
      VALUES ${values}
    `;
    await db.query(sql);
  }
  async getById(id) {
    const sql = `SELECT * FROM ads WHERE id = $1 AND is_active = true`;
    const result = await db.query(sql, [id]);
    return result.rows[0] ? new Ad(result.rows[0]) : null;
  }

  async getOwnerByAdId(ad_id){
    const result = await db.query(`SELECT id_user FROM ads WHERE id = $1`, [ad_id]);
    return result.rows[0] || null;
  }

  async searchAds(searchTerm = '', categoryId = null, limit = 10, offset = 0) {
  const values = [];
  let conditions = `a.deleted_at IS NULL AND a.is_active = TRUE`;
  let index = 1;

  if (searchTerm) {
    conditions += ` AND (LOWER(a.title) LIKE $${index} OR LOWER(a.description) LIKE $${index + 1})`;
    values.push(`%${searchTerm.toLowerCase()}%`);
    values.push(`%${searchTerm.toLowerCase()}%`);
    index += 2;
  }

  if (categoryId) {
    conditions += ` AND a.id_category = $${index}`;
    values.push(categoryId);
    index++;
  }

  values.push(limit);
  values.push(offset);

  const sql = `
    SELECT a.*, 
           c.name AS category_name,
           u.first_name || ' ' || u.last_name AS seller_name,
           JSON_AGG(
              JSON_BUILD_OBJECT('id', i.id, 'url_img', CONCAT('/uploads/', i.url_img))
           ) AS images
    FROM ads a
    JOIN category c ON a.id_category = c.id
    JOIN users u ON a.id_user = u.id_user
    LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad' AND i.deleted_at IS NULL
    WHERE ${conditions}
    GROUP BY a.id, c.name, u.first_name, u.last_name
    ORDER BY a.created_at DESC
    LIMIT $${values.length - 1} OFFSET $${values.length}
  `;

  const result = await db.query(sql, values);
  return result.rows.map((row) => new Ad(row));
}


}

module.exports = new AdsRepository();
