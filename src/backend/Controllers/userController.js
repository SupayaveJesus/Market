const { handleRequest } = require('../utils/handleRequest');
const { validateEmail } = require('../utils/validation');
const userService = require('../Services/userService');
const jwt = require('jsonwebtoken');

class userController {
    
    async register(req, res) {
        await handleRequest(async (userData) => {
            if (userData.email && !userData.mail) {
                userData.mail = userData.email;
            }
            
            if (!validateEmail(userData.mail)) {
                return res.status(400).json({ error: 'Correo electrónico inválido' });
            }
            if (!userData.password || userData.password.length < 6) {
                return res.status(400).json({ error: 'Contraseña inválida, debe tener al menos 6 caracteres' });
            }
            if (!userData.first_name || userData.first_name.trim() === '') {
                return res.status(400).json({ error: 'El nombre es obligatorio' });
            }
            if (!userData.last_name || userData.last_name.trim() === '') {
                return res.status(400).json({ error: 'El apellido es obligatorio' });
            }

            const user = await userService.registerUser(userData);
            const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return {
                message: 'Registro exitoso',
                token,
                user: {
                    id_user: user.id_user,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    mail: user.mail,
                },
            };
        }, [req.body], res);
    }


    async login(req, res) {
        await handleRequest(async (mail, password) => {
            if (!validateEmail(mail)) {
                throw new Error('Correo electrónico inválido');
            }

            const user = await userService.login(mail, password);

            const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, { expiresIn: '7d' });

            return {
                message: 'Inicio de Sesión exitoso',
                token,
                user: {
                    id_user: user.id_user,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    mail: user.mail,
                },
            };
        }, [req.body.mail || req.body.email, req.body.password], res);
    }
        async getProfile(req, res) {
        await handleRequest(async (id_user) => {
            const user = await userService.getUserById(id_user);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return {
                message: 'Perfil de usuario',
                user: {
                    id_user: user.id_user,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    mail: user.mail,
                },
            };
        }, [req.user.id_user], res);
    }
    async getUserAds(req,res){
        await handleRequest(async(id_user) => {
            const ads= await userService.getUserAds(id_user);
            if (!ads) {
                throw new Error('Anuncios no encontrados');
            }
            return{
                message: 'Anuncios del usuario obtenidos exitosamente',
                ads,
            };
        }, [req.user.id_user], res);
    }
}

module.exports = new userController();
