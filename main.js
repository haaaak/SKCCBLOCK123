

var express = require('./config/express_config'),
    passport = require('./config/passport');

var app = express();
var passport = passport();

app.listen(3000);

console.log('Server is running!');
