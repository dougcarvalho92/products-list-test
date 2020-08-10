const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const mime = require("mime-types");
module.exports = {
  des: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },

    filename: (req, file, cb) => {
      const { product_id, image_name } = req.body;
      let ext = mime.extension(file.mimetype);
      var name = "";

      if (image_name && product_id) {
        name =
          image_name.substring(
            image_name.lastIndexOf("/images/"),
            image_name.lastIndexOf(".")
          ) + `.${ext}`;
      }

      if (!product_id) {
        crypto.randomBytes(16, (err, hash) => {
          if (err) {
            cb(err);
          }
          name = `${hash.toString("hex")}.${ext}`;

          cb(null, name);
        });
      } else {
        cb(null, name);
      }
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
};
