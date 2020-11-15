var users = require('../controllers/user.server.controller');

module.exports=function(app){

app.route('/signup').get(users.renderSignup).post(users.signup);

app.route('/Seller/signout').get(users.signout);

app.route('/members/:page').get(users.list);
app.route('/members').delete(users.multipleDelete);
//app.route('/members/signup').get(users.renderingAdminSingup).post(users.adminSignup);

app.route('/temp_members/:page').get(users.temp_list);
app.route('/temp_members').put(users.multipleUpdate);
}
