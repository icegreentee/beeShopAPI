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
