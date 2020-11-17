require('dotenv').config();
var express = require('express');
var ejs = require('ejs');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var path = require('path');
var tunnel = require('tunnel-ssh');

module.exports=function(){
var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(function(){
  console.log('Connected to db Successfully');
}).catch(function(e){
  console.error(e);
});
app.use(flash());
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : 'false',
  saveUninitialized : true
}));
require('../models/count.server.model.js');
require('../models/user.server.model.js');
require('../models/article.server.model.js');

app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname,'../views')));
console.log(path.join(__dirname,'../views'));
app.set('views','./views');
app.set('view engine','ejs');

require('../routes/user.server.routes.js')(app);
require('../routes/index.server.routes.js')(app);
require('../routes/article.server.routes.js')(app);
return app;
};
