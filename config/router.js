'use strict'

const Router = require('koa-router')
const User = require('../app/controllers/user')
const App = require('../app/controllers/app')
const Login = require('../app/controllers/login')

module.exports = function(){
	var router = new Router({
    prefix: '/api'
  })

  // user
  // router.post('/u/signup', App.hasBody, User.signup)
  // router.post('/u/update', App.hasBody, App.hasToken, User.update)

  // DB Interface test
  // router.get('/test/user/users',User.users)
  // router.post('/test/user/add',User.addUser)
  // router.post('/test/user/delete',User.deleteUser)

  //login
  //一键登录
  router.post('/login/singlesign',Login.singlesign)
  //验证码登录
  router.post('/login/sign',Login.sign)

  return router
}