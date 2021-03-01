'use strict'

var mongoose = require('mongoose')
var Sale = mongoose.model('Sale')



exports.addSale = async (data) => {
	let sale = new Sale(data)
	sale = await sale.save()
	return sale
}

exports.getSaleBygoodsId = async (id) => {
	let query = Sale.findOne({ goodsid: id, finish: "" })
	let res = null
	await query.exec(function (err, sale) {
		if (err) {
			res = {}
		} else {
			res = sale
		}
	})
	return res
}

exports.changeacceptgoods = async (id, accept, finish) => {
	await Sale.update({ id }, { $set: { "accept": accept, "finish": finish } })
}
exports.getSaleById = async (id) => {
	let query = Sale.findOne({ id: id })
	let res = null
	await query.exec(function (err, sale) {
		if (err) {
			res = {}
		} else {
			res = sale
		}
	})
	return res
}

exports.changefinish = async (id, finish) => {
	await Sale.update({ id }, { $set: { "finish": finish } })
}