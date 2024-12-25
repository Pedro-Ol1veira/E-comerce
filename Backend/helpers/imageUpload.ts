import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const imageStore = multer.diskStorage({
  destination: "public/images/products",
  filename: function (req, file, cb) {
    const photoId = uuidv4();
    cb(null, photoId);
  },
});

const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg)&/)) {
      return cb(new Error("Envie apenas arquivos jpg ou png"))
    }
    cb(null, true);
  },
});

export default imageUpload;
