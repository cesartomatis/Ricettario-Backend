const multer = require('multer');

// const storage = multer.diskStorage({
// 	destination: function(req, file, cb) {
// 		cb(null, './uploads/');
// 	},
// 	filename: function(req, file, cb) {
// 		cb(null, `${Date.now()}_${uuidv4()}_${file.originalname}`);
// 	}
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	// if (file.mimetype.startsWith("image")) {} //allow all image types
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const imageUpload = multer({ storage, fileFilter });

module.exports = imageUpload;
