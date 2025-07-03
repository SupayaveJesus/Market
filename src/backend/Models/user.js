class User{
    constructor({ id_user, first_name, last_name, mail, password }) {
        this.id_user = id_user;           
        this.first_name = first_name;
        this.last_name = last_name;
        this.mail = mail;
        this.password = password;
    }
}

module.exports = User;