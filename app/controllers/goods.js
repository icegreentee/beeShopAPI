'use strict'

import goodsHelper from '../dbhelper/goodsHelper'
import userHelper from '../dbhelper/userHelper'


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
  let goods = await goodsHelper.getGoodsSortByupdatetime(school, page);
  let res = [];
  for (let i = 0; i < goods.length; i++) {
    let id = goods[i].id
    let content = goods[i].content
    let image = goods[i].images.split("|")[0];
    let price = goods[i].price
    let updatetime = goods[i].updatetime

    let user = await userHelper.findByPhoneNumber({ phoneNumber: goods[i].userPhoneNumber })
    let userava = user.avatar
    let username = user.name

    let good = {
      id, content, image, price, updatetime, userava, username
    }
    res.push(good)
  }

  ctx.body = res
}

//根据传达的关键词进行查找类已经模糊查找内容
exports.searchGoods = async (ctx, next) => {
  console.log(ctx.request.body)
  let word = ctx.request.body.word
  let page = parseInt(ctx.request.body.page)
  let school = ctx.request.body.school
  let goods = await goodsHelper.getGoodsSortByupdatetimeAndword(school, page, word);

  let res = [];
  for (let i = 0; i < goods.length; i++) {
    let id = goods[i].id
    let content = goods[i].content
    let image = goods[i].images.split("|")[0];
    let price = goods[i].price
    let updatetime = goods[i].updatetime

    let user = await userHelper.findByPhoneNumber({ phoneNumber: goods[i].userPhoneNumber })
    let userava = user.avatar
    let username = user.name

    let good = {
      id, content, image, price, updatetime, userava, username
    }
    res.push(good)
  }

  ctx.body = res
}

exports.getGoodsInfo = async (ctx, next) => {
  console.log(ctx.request.body)
  let id = ctx.request.body.id
  let goods = await goodsHelper.getOneGoodsById(id);
  let user = await userHelper.findByPhoneNumber({ phoneNumber: goods.userPhoneNumber })
  
  let res = {
    username: user.name,
    userava: user.avatar,
    updatetime: goods.updatetime,
    price: goods.price,
    content: goods.content,
    images: goods.images
  }

  ctx.body = res
}


exports.getsalegoods = async (ctx, next) => {
  let phoneNumber= ctx.request.body.phoneNumber;

  let res = await goodsHelper.getSaleGoodsByphone(phoneNumber)
  ctx.body = res
}

exports.deletesalegoods = async (ctx, next) => {
  let id= ctx.request.body.id;

  await goodsHelper.deleteGoodsByid(id)
  ctx.body = {
    code: 2000,
    msg: "删除成功",
  }
}
