'use strict'

import goodsHelper from '../dbhelper/goodsHelper'



exports.uploadGoodsImage = async (ctx, next) => {
  console.log(ctx.req.file.filename)
  ctx.body = {
    code: 2000,
    msg: "ok",
    fileName: ctx.req.file.filename
  }
}

exports.goodsSubmit = async (ctx, next) => {
  // console.log(ctx.request.body.phoneNumber+"_"+Date.now())
  let res = {
    id: ctx.request.body.phoneNumber + "_" + Date.now(),
    content: ctx.request.body.content,
    images: ctx.request.body.imglists.join("|"),
    userPhoneNumber: ctx.request.body.phoneNumber,
    school: ctx.request.body.school,
    goodsclass: ctx.request.body.class,
    price: ctx.request.body.price,
    createtime: Date.now()
  }
  await goodsHelper.addGoods(res)
  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}


//根据学校以及页数，获取商品8条数据
exports.getGoods = async (ctx, next) => {
  let page = parseInt(ctx.request.body.page)
  let school = ctx.request.body.school
  let res = await goodsHelper.getGoodsSortByupdatetime(school,page);
  console.log(res)
  ctx.body = res;
  // ctx.body = {
  //   code: 2000,
  //   msg: "ok",
  // }
}