import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// configuration for multer middleware
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// check whether upload file is a valid image file
function checkFileType(file, cb) {
  const allowFileTypes = /jpg|jpeg|png/;
  const isValidExtansionName = allowFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMimeType = allowFileTypes.test(file.mimetype);

  if (isValidExtansionName && isValidMimeType) {
    return cb(null, true);
  } else {
    cb("Invalid image file.");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
