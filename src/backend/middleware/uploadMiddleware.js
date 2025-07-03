const multer = require('multer');
const path = require('path');
const fs = require('fs')

const UPLOADS_PATH = path.join(__dirname, '..', 'uploads');

//crea uploads
if(!fs.existsSync(UPLOADS_PATH)){
    fs.mkdirSync(UPLOADS_PATH, {recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_PATH);
    }, 
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Solo (jpeg, jpg, png) images'));
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = { upload };
