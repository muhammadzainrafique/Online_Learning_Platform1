const DatauriParser = require('datauri/parser');
const path = require('path');
const getDataUri = (file) => {
    const parser = new DatauriParser();
    const fileExt = path.extname(file.originalname).toString();
    console.log('file extensioni', fileExt);
    return parser.format(fileExt, file.buffer)
}

module.exports = getDataUri;