const cloudinary = require("./cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile_images",
        format: async (req, file) => file.mimetype.split("/")[1],
    }
})

const upload = multer({storage: storage});

module.exports = upload;
