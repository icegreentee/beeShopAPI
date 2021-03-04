'use strict'

const Router = require('koa-router')
const Upload = require("./upload")()
const Login = require('../app/controllers/login')
const Goods = require('../app/controllers/goods')
const Sale = require('../app/controllers/sale')

module.exports = function () {
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
  router.post('/login/singlesign',  Login.singlesign)
  //验证码登录
  router.post('/login/sign', Login.sign)
  // 引导页信息采集
  router.post("/login/info", Login.info)

  // 上传图片
  router.post("/upload/goodsimage", Upload.single('files'), Goods.uploadGoodsImage)
  router.post("/goods/submit", Goods.goodsSubmit)

  //home
  router.post("/goods/getgoods", Goods.getGoods)
  //search
  router.post("/goods/searchgoods", Goods.searchGoods)
  //getgoodsinfo
  router.post("/goods/getgoodsinfo", Goods.getGoodsInfo)
  //sale
  router.post("/sale/buygoods", Sale.buygoods)
  //salegoods
  router.post("/sale/getsalegoods", Goods.getsalegoods)
  router.post("/sale/deletesalegoods", Goods.deletesalegoods)
  
  //info
  router.post("/info/getsalegoodsinfo", Sale.getsalegoodsinfo)
  router.post("/info/accept", Sale.accept)
  router.post("/info/noaccept", Sale.noaccept)
  router.post("/info/accept", Sale.accept)
  router.post("/info/noaccept", Sale.noaccept)
  router.post("/info/finishsale", Sale.finishsale)
  router.post("/info/nofinishsale", Sale.nofinishsale)
  //
  router.post("/person/getmybuy", Sale.getmybuy)
  router.post("/person/getmysale", Sale.getmysale)
  router.post("/person/getmysaleclass", Sale.getmysaleclass)

  return router
}

