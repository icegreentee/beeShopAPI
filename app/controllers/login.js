'use strict'

var request = require('request');
var RSA = require("../tools/decrypt")
var url = "https://api.verification.jpush.cn/v1/web/loginTokenVerify";
var Authorization = "Basic NjJjOGNjMTRmY2JlOWI3YzkyOTY1ZTQxOjkyNTc0M2FmMjU3ZGM2MGM3N2NhZGM0OQ==";

import userHelper from '../dbhelper/userHelper'

exports.singlesign = async (ctx, next) => {
  let loginToken = ctx.request.body.loginToken
  // console.log(loginToken)
  //发起请求获取手机号
  request({
    url: url,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
      "Authorization": Authorization
    },
    body: { loginToken: loginToken }
  }, async function (error, response, body) {
    console.log(body)
    if (body.code == 8000) {
      let phoneNumber = RSA.decrypt(body.phone)
      console.log(phoneNumber)
      let res = await userHelper.findByPhoneNumber({ phoneNumber })
      console.log(res)
      if (!res) {
        res = {
          phoneNumber: phoneNumber,
          name: "",
          school: "",
          qq: "",
          weixin: ""
        }
        await userHelper.addUser(res)
      }
      ctx.body = {
        code: 2000,
        msg: "登陆成功",
        data: res
      }
    } else {
      ctx.body = {
        code: 4000,
        msg: "token过期"
      }
    }
  });
}


exports.sign = async (ctx, next) => {
  ctx.body = {
    code: 2000,
    msg: "登录成功"
  }
}
