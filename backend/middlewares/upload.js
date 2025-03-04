const multer = require('multer');
// multer is a middleware that allows us to parse form data.
// It is specifically designed to parse form data that contains files.

module.exports = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: function ( req, file, returnCallback){
            returnCallback(null, Date.now() + `-${file.originalname}`)
            
        }
    })
})