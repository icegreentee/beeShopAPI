'use strict'

var mongoose = require('mongoose')
var Goods = mongoose.model('Goods')



exports.addGoods = async (data) => {
	let goods = new Goods(data)
	goods = await goods.save()
	return goods
}

exports.getGoodsSortByupdatetime = async (school, page) => {
	let query = Goods.find({ onsale: true, school: school }).sort({ updatetime: -1 }).limit(8).skip(8 * page)
	let res = null
	await query.exec(function (err, goods) {
		if (err) {
			res = {}
		} else {
			res = goods
		}
	})
	return res
}

exports.getGoodsSortByupdatetimeAndword = async (school, page,word) => {
	let query = Goods.find({ onsale: true, school: school ,$or:[{goodsclass:word},{content:{$regex: word}}]}).sort({ updatetime: -1 }).limit(8).skip(8 * page)
	let res = null
	await query.exec(function (err, goods) {
		if (err) {
			res = {}
		} else {
			res = goods
		}
	})
	return res
}

exports.getOneGoodsById = async (id) => {
	let query = Goods.findOne({ id })
	let res = null
	await query.exec(function (err, goods) {
		if (err) {
			res = {}
		} else {
			res = goods
		}
	})
	return res
}
exports.getSaleGoodsByphone = async (phoneNumber) => {
	let query = Goods.find({ userPhoneNumber:phoneNumber,finishsale:false })
	let res = null
	await query.exec(function (err, goods) {
		if (err) {
			res = {}
		} else {
			res = goods
		}
	})
	return res
}

exports.deleteGoodsByid = async (id) => {
	var flag = false
	await Goods.remove({id}, function(err) {
		if(err) {
			flag = false
			// return false
		}else{
			flag = true
		}

	})
	return flag
}

exports.changeonsale = async (id,onsale) => {
	await Goods.update({id}, {$set:{"onsale":onsale}})
}

exports.getNotSaleGoodsByphone = async (phoneNumber) => {
	let query = Goods.find({ userPhoneNumber:phoneNumber,finishsale:false ,onsale:false})
	let res = null
	await query.exec(function (err, goods) {
		if (err) {
			res = {}
		} else {
			res = goods
		}
	})
	return res
}

exports.changefinishsale = async (id,finishsale) => {
	await Goods.update({id}, {$set:{"finishsale":finishsale}})
}

exports.getSaleGoodsByphoneFinish = async (phoneNumber) => {
	let query = Goods.find({ userPhoneNumber:phoneNumber,finishsale:true })
	let res = null
	await query.exec(function (err, goods) {
		if (err) {
			res = {}
		} else {
			res = goods
		}
	})
	return res
}
