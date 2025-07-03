ALTER TABLE ads ALTER COLUMN id DROP DEFAULT;
ALTER TABLE ads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

-- Para la tabla users
ALTER TABLE users ALTER COLUMN id_user DROP DEFAULT;
ALTER TABLE users ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY;

-- Para la tabla category
ALTER TABLE category ALTER COLUMN id DROP DEFAULT;
ALTER TABLE category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;



-- Para la tabla image
ALTER TABLE image ALTER COLUMN id DROP DEFAULT;
ALTER TABLE image ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

-- Para la tabla saved_ads
ALTER TABLE saved_ads ALTER COLUMN id DROP DEFAULT;
ALTER TABLE saved_ads ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

-- Para la tabla conversations
ALTER TABLE conversations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE conversations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

-- Para la tabla messages
ALTER TABLE messages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE messages ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;

DELETE FROM image WHERE url_img LIKE 'D:%';
SELECT * FROM image WHERE entity_type = 'ad' ORDER BY id DESC;

DELETE FROM ads WHERE id = 5;
DELETE FROM image WHERE entity_id = 5;


ALTER TABLE saved_ads
RENAME COLUMN user_id TO id_user;

INSERT INTO category (name, description) 
VALUES ('Mod', 'Productos para vestir facherit@');

DELETE FROM saved_ads WHERE id_user IS NULL;

DELETE FROM users
WHERE id_user NOT IN (SELECT DISTINCT id_user FROM ads);

SELECT *
FROM image
WHERE entity_id = 7 AND entity_type = 'ad' AND deleted_at IS NULL;



--triggers--

--elimina img cuando se borre anuncio--
SELECT a.*, i.url_img, u.first_name, c.name AS category_name
FROM ads a
LEFT JOIN image i ON i.entity_id = a.id AND i.entity_type = 'ad'
JOIN users u ON u.id_user = a.id_user
JOIN category c ON c.id = a.id_category
WHERE (LOWER(a.title) LIKE LOWER('%zapato%') OR LOWER(a.description) LIKE LOWER('%zapato%'))
  AND a.is_active = true;

--triggers, limpieza de img cuando se elimine el ads--

CREATE OR REPLACE FUNCTION delete_ad_images()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM image WHERE entity_id = OLD.id AND entity_type = 'ad';
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_delete_images_with_ad
AFTER DELETE ON ads
FOR EACH ROW
EXECUTE FUNCTION delete_ad_images();



ALTER TABLE saved_ads
ADD COLUMN saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


select * from users;
select * from ads a ;		
select * from image i ;
select * from category c ;
select * from saved_ads sa ;
select * from conversations c ;
select * from messages m ;