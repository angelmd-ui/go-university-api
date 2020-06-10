
const multer = require('multer')


/*const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|mp4|pdf|docx|doc|gif$i/)) {
      cb(new Error('El archivo no es soportado'), false)
      // return 
    }
    cb(null, true)
  }
}).single('photo')*/
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|mp4|pdf|docx|doc|gif$i/)) {
      cb(new Error('El archivo no es soportado'), false)
      // return 
    }
    cb(null, true)
  }
}).single('photo')


module.exports = upload;