'use strict'


import saleHelper from '../dbhelper/saleHelper'


exports.buygoods = async (ctx, next) => {
  let goodsid= ctx.request.body.goodsid;
  let buyphone= ctx.request.body.buyphone;


  let res = {
    id: ctx.request.body.goodsid + "_" + Date.now(),
    goodsid: goodsid,
    salephone:goodsid.split("_")[0],
    buyphone: buyphone,
    buytime:Date.now(),
    accept:"false",
    finish:"false",
    result:""
  }
  await saleHelper.addSale(res)
  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}

exports.getgoods = async (ctx, next) => {
  let phoneNumber= ctx.request.body.phoneNumber;

  let res = await saleHelper.getSales(phoneNumber)
  ctx.body = res
}

