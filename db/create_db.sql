-- Tabla de usuarios
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    mail VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabla de categorías
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tabla de anuncios
CREATE TABLE ads (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    id_user INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
    id_category INTEGER REFERENCES category(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de imágenes (relacionada con ads u otras entidades)
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    entity_id INTEGER NOT NULL,
    url_img TEXT NOT NULL,
    alt_text TEXT,
    entity_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de anuncios guardados
CREATE TABLE saved_ads (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
    ad_id INTEGER REFERENCES ads(id) ON DELETE CASCADE
);

-- Tabla de conversaciones
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    ad_id INTEGER REFERENCES ads(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id_user),
    receiver_id INTEGER REFERENCES users(id_user)
);

-- Tabla de mensajes
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id_user),
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);