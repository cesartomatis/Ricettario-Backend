const sharp = require('sharp');
const uuidv4 = require('uuid/v4');

const imageResize = async (req, res, next) => {
	if (req.file) {
		const filePath = `uploads/${Date.now()}_${uuidv4()}_${
			req.file.originalname
		}`;
		await sharp(req.file.buffer)
			.resize(500, 500, {
				fit: sharp.fit.inside,
				withoutEnlargement: true
			})
			.toFormat('jpeg')
			.jpeg({ quality: 90 })
			.toFile(filePath);
		req.photoPath = filePath;
	}
	next();
};

module.exports = imageResize;
