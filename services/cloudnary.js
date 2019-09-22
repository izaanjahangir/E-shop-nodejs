const cloudinary = require("cloudinary").v2;

const CLOUDNARY_CONFIG = {
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUNDARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET
};

cloudinary.config(CLOUDNARY_CONFIG);

const uploadImage = (file, folderpath) => {
  return new Promise((resolve, reject) => {
    const path = file.path;
    const originalname = file.originalname;
    const uploadPath = folderpath ? `${folderpath}/` : "";
    const uniqueFilename =
      originalname.slice(0, originalname.lastIndexOf(".")) + "-" + Date.now();

    const public_id = `${uploadPath}${uniqueFilename}`;

    cloudinary.uploader.upload(path, { public_id }, (err, image) => {
      if (err) return reject(err);

      resolve(image);
    });
  });
};

module.exports = {
  uploadImage
};
