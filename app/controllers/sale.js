'use strict'


import saleHelper from '../dbhelper/saleHelper'
import goodsHelper from '../dbhelper/goodsHelper'
import userHelper from '../dbhelper/userHelper'

exports.buygoods = async (ctx, next) => {
  let goodsid = ctx.request.body.goodsid;
  let buyphone = ctx.request.body.buyphone;


  let res = {
    id: ctx.request.body.goodsid + "_" + Date.now(),
    goodsid: goodsid,
    buyphone: buyphone,
    buytime: Date.now(),
    accept: "",
    finish: "",
  }
  await saleHelper.addSale(res)
  await goodsHelper.changeonsale(goodsid, false);
  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}

exports.getsalegoodsinfo = async (ctx, next) => {
  let phone = ctx.request.body.phoneNumber;
  // console.log("phone:", phone)
  let goods = await goodsHelper.getNotSaleGoodsByphone(phone);
  // console.log("goods:", goods)
  let res = []
  for (let i = 0; i < goods.length; i++) {
    let goodsid = goods[i]["id"];
    // console.log("goodsid:", goodsid)
    let sales = await saleHelper.getSaleBygoodsId(goodsid);
    // console.log("sales:", sales)
    let buyer = await userHelper.findByPhoneNumber({ phoneNumber: sales["buyphone"] });
    // console.log("buyer:", buyer)
    let goodsinfo = {
      goodsiamge: goods[i]["images"].split("|")[0],
      content: goods[i]["content"],
      price: goods[i]["price"],
      saleid: sales["id"],
      buytime: sales["buytime"],
      accept: sales["accept"],
      accepttime: sales["accepttime"],
      buyername: buyer["name"],
      buyerava: buyer["avatar"],
      buyerphone: buyer["phoneNumber"],
      buyerqq: buyer["qq"],
      buyerweixin: buyer["weixin"],
    }
    res.push(goodsinfo)
  }

  ctx.body = res
}

exports.accept = async (ctx, next) => {
  let id = ctx.request.body.id;
  await saleHelper.changeacceptgoods(id, "true", "")
  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}
exports.noaccept = async (ctx, next) => {
  let id = ctx.request.body.id;
  // console.log(id )
  await saleHelper.changeacceptgoods(id, "false", "0")
  let goods = await saleHelper.getSaleById(id)
  // console.log(goods )
  await goodsHelper.changeonsale(goods.goodsid, true);

  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}
exports.finishsale = async (ctx, next) => {
  let id = ctx.request.body.id;
  await saleHelper.changefinish(id, "2")
  let goods = await saleHelper.getSaleById(id)
  await goodsHelper.changefinishsale(goods.goodsid, true)
  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}
exports.nofinishsale = async (ctx, next) => {
  let id = ctx.request.body.id;
  // console.log(id )
  await saleHelper.changefinish(id, "1")
  let goods = await saleHelper.getSaleById(id)
  // console.log(goods )
  await goodsHelper.changeonsale(goods.goodsid, true);

  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}

exports.getmybuy = async (ctx, next) => {
  let id = ctx.request.body.id;
  await saleHelper.changefinish(id, "2")
  let goods = await saleHelper.getSaleById(id)
  await goodsHelper.changefinishsale(goods.goodsid, true)
  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}
exports.getmysale = async (ctx, next) => {
  let id = ctx.request.body.id;
  // console.log(id )
  await saleHelper.changefinish(id, "1")
  let goods = await saleHelper.getSaleById(id)
  // console.log(goods )
  await goodsHelper.changeonsale(goods.goodsid, true);

  ctx.body = {
    code: 2000,
    msg: "ok",
  }
}