const userRepository = require('../Repository/userRepository');

class UserService {

  async registerUser(userData) {
    const existing = await userRepository.getUserByEmail(userData.mail);
    if (existing) {
        throw new Error('El correo ya está registrado , prueba con otro');
    }

    const newUser = await userRepository.createUser(userData);

    if (!newUser) {
        throw new Error('Error al registrar el usuario');
    }

    return newUser;
  }

  async login(mail, password) {
    const user = await userRepository.getUserByEmail(mail);
    if (!user) {
      throw new Error('Correo electrónico inválido');
    }

    if (user.password !== password) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }

  async authenticate(email, password) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('Credenciales inválidas');

    if (user.password !== password) {
      throw new Error('Credenciales inválidas');
    }

    return user;
  }

  async getUserById(id_user) {
    return await userRepository.getUserById(id_user);
  }

  async getUserAds(id_user) {
    return await userRepository.getUserAds(id_user);
  }
}

module.exports = new UserService();
