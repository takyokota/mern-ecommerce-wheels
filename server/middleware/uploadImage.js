const multer = require('multer');

// middleware for uploading image files
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb({ message: 'Only .png, .jpg, or .jpeg file allowed!' }, false);
    }
  }
}).single('images');

module.exports = { upload };