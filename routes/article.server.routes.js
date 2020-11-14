var article = require('../controllers/article.server.controller'),
  users = require('../controllers/user.server.controller');
var express = require('express');
var router = express.Router();


module.exports = function(app) {
//게시물생성
  app.route('/community/create_article').get(article.renderingCreate).
  post(users.requiresLogin, article.create);
//게시판
  app.route('/community/:page').get(article.list).post(article.multipleDelete);
//게시물 삭제,업데이트
  app.route('/community/article/:id').get(article.read)
    .delete(users.requiresLogin, article.hasAuthorization, article.delete)
    .put(users.requiresLogin, article.hasAuthorization, article.update);

//게시물 수정화면
  app.route('/community/update_article/:id').get(users.requiresLogin, article.hasAuthorization, article.renderingUpdate);

  app.param('id', article.articleByID);


}
