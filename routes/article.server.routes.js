var trade = require('../controllers/article.server.controller'),
    users = require('../controllers/user.server.controller');
var express = require('express');
multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    console.log(req.user);
    cb(null, file.originalname) 
  }
});
var upload = multer({ storage: storage })

module.exports = function(app,user) {

  app.route('/Seller').get(trade.Slist).post(upload.single('userfile'),trade.upload_file);
  app.route('/Seller/publish').get(trade.publish);
  app.route('/Seller/OwnerChange').post(trade.change);
  app.route('/Buyer/buy').post(trade.buying);
  


}
