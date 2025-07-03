class Ad {
    constructor({ id, title, description, price, is_active, is_featured, id_user, id_category, created_at, deleted_at, updated_at, category_name, seller_name, images }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.is_active = is_active;
        this.is_featured = is_featured;
        this.id_user = id_user;
        this.id_category = id_category;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
        this.updated_at = updated_at;
        this.category_name = category_name;
        this.seller_name = seller_name;
        this.images = images || [];
    }
}

module.exports = Ad;
