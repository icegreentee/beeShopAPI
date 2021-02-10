'use strict'

// 用于封装controllers的公共方法

var mongoose = require('mongoose')
var User = mongoose.model('User')

exports.singlesign = async (ctx, next) => {
  let token = ctx.request.body.token
  //发起请求获取手机号
  
  ctx.body = {
    code: 2000,
    msg: "登录成功",
    data:[]
  }
}
exports.sign = async (ctx, next) => {
  ctx.body = {
    code: 2000,
    msg: "登录成功"
  }
}
