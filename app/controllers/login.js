'use strict'

const koaRequest = require('koa2-request');
var RSA = require("../tools/decrypt")
var url = "https://api.verification.jpush.cn/v1/web/loginTokenVerify";
var Authorization = "Basic NjJjOGNjMTRmY2JlOWI3YzkyOTY1ZTQxOjkyNTc0M2FmMjU3ZGM2MGM3N2NhZGM0OQ==";

import userHelper from '../dbhelper/userHelper'

exports.getPhoneNumber = async (ctx, next) => {
  let loginToken = ctx.request.body.loginToken;
  console.log("loginToken:" + loginToken)
  let res = await koaRequest({
    url: url,
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
      "Authorization": Authorization
    },
    body: { loginToken: loginToken }
  })
  ctx.request.body.requestRes = res.body;
  console.log(ctx.request.body.requestRes)
  next();
}
exports.singlesign = async (ctx, next) => {
  if (ctx.request.body.requestRes.code == 8000) {
    let phoneNumber = RSA.decrypt(ctx.request.body.requestRes.phone)
    console.log(phoneNumber)
    let res = await userHelper.findByPhoneNumber({ phoneNumber })
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
    console.log(res.phoneNumber)
    ctx.body = {
      code: 2000,
      msg: "登陆成功",
      data: res
    }
  } else {
    ctx.body = {
      code: 4000,
      msg: ctx.request.body.requestRes.content
    }
  }

}


exports.sign = async (ctx, next) => {
  let phoneNumber = "18868180042";
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
}

exports.info = async (ctx, next) => {
  let data = ctx.request.body;
  console.log(data)
  await userHelper.updateByPhoneNumber(data);
  ctx.body={
    code: 2000,
    msg: "信息添加成功",
  }
}