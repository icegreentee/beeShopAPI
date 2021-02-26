'use strict'

var mongoose = require('mongoose')
var Sale = mongoose.model('Sale')



exports.addSale = async (data) => {
	let sale = new Sale(data)
	sale = await sale.save()
	return sale
}

exports.getSales = async (phoneNumber) => {
	let query = Sale.find({ salephone: phoneNumber }).sort({ updatetime: -1 })
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