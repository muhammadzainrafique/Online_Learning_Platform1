const multer = require('multer');

const storage = multer.memoryStorage()
const sigleUpload = multer({storage}).single("file");
module.exports = sigleUpload;