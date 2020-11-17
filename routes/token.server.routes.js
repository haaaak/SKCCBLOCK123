var trade = require('../controllers/token.server.controller'),
    users = require('../controllers/user.server.controller');
var express = require('express');
const multer = require('multer');

var upload = multer({ storage: multer.memoryStorage() });
module.exports = function(app,user) {

  app.route('/Seller').get(trade.Slist).post(upload.single('userfile'),trade.upload_file);
  app.route('/Seller/publish').get(trade.publish);
  app.route('/Seller/OwnerChange').post(trade.change);
  app.route('/Buyer/buy').post(trade.buying);
  app.route('/Buyer').get(trade.Blist);  



}
