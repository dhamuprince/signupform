let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
 { v4: uuidv4 } = require('uuid')
router = express.Router();
 
// User model
let File = require('../models/Files');
 
const DIR = '../server/app/public';
 
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, DIR);
},
filename: (req, file, cb) => {
const fileName = file.originalname.toLowerCase().split(' ').join('-');
cb(null, uuidv4() + '-' + fileName)
}
});
 
var upload = multer({
storage: storage,
fileFilter: (req, file, cb) => {
if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
cb(null, true);
} else {
cb(null, false);
return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
}
}
});
 
router.post('/fileupload', upload.single('image'), (req, res, next) => {
const url = req.protocol + '://' + req.get('host')
const fileinstance = new File({
_id: new mongoose.Types.ObjectId(),
name: req.body.name,
image: url + '/public/' + req.file.filename
});
fileinstance.save().then(result => {
res.status(201).json({
message: "File uploaded successfully!",
userCreated: {
_id: result._id,
image: result.image
}
})
}).catch(err => {
console.log(err),
res.status(500).json({
error: err
});
})
})



 
module.exports = router;