const express = require('express');
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('../../helper_functions/generator');
let fs = require('fs-extra');

//GENERIC UPLOAD ROUTE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `media/uploads/${req.params.type}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, uuidv4() + ext)
    }
});

var upload = multer({ storage: storage }).single('file');

//routes
router.post('/uploadImage/:type', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
        if (err || typeof req.file === 'undefined') {
            next(res.json("error while uploading", err, 500));
        } else {
            path = req.file.filename;
            next(res.json(true, 200, 'Upload Success', path));
        }
    });
});

module.exports = router;