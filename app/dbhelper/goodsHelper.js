'use strict'

var mongoose = require('mongoose')
var Goods = mongoose.model('Goods')



exports.addUser = async (data) => {
	let goods = new Goods(data)
	goods = await goods.save()
	return goods
}
