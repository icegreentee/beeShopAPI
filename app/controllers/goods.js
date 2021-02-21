'use strict'

import goodsHelper from '../dbhelper/goodsHelper'



exports.uploadGoodsImage = async (ctx, next) => {
  console.log(ctx.req.file.filename )
  ctx.body={
    code: 2000,
    msg: "ok",
    fileName:ctx.req.file.filename
  }
}

exports.goodsSubmit = async (ctx, next) => {
  // console.log(ctx.request.body.phoneNumber+"_"+Date.now())
  let res = {
    id: ctx.request.body.phoneNumber+"_"+Date.now(),
    content: ctx.request.body.content,
    images: ctx.request.body.imglists.join("_"),
    userPhoneNumber: ctx.request.body.phoneNumber,
    school:ctx.request.body.school,
    class:ctx.request.body.class,
    price:ctx.request.body.price
  }
  await goodsHelper.addUser(res)
  ctx.body={
    code: 2000,
    msg: "ok",
  }
}