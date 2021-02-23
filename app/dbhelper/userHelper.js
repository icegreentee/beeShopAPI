'use strict'

var mongoose = require('mongoose')
var User = mongoose.model('User')

/**
 * 通过电话号码查询
 * @param  {[type]} options.phoneNumber [description]
 * @return {[type]}                     [description]
 */
exports.findByPhoneNumber = async ({ phoneNumber }) => {
	var query = User.findOne({ phoneNumber })
	var res = null
	await query.exec(function (err, user) {
		if (err) {
			res = {}
		} else {
			res = user
		}
	})
	// console.log('res====>' + res)
	return res;
}


exports.addUser = async (data) => {
	let user = new User(data)
	user = await user.save()
	return user
}

exports.updateByPhoneNumber = async (data) => {
	let res = User.updateOne(
		{ "phoneNumber": data.phoneNumber },
		{
			$set: {
				"name": data.name,
				"school": data.school,
				"qq": data.qq,
				"weixin": data.weixin,
				"avatar": "http://q1.qlogo.cn/g?b=qq&nk=" + data.qq + "&s=640",
			}
		})
	return res;
}


// /**
//  * 查找所用用户
//  * @return {[type]} [description]
//  */
// exports.findAllUsers = async () => {
// 	var query = User.find({});
// 	var res = []
// 	await query.exec(function(err, users) {
// 		if(err) {
// 			res = []
// 		}else {
// 			res = users;
// 		}
// 	})
// 	return res
// }

// /**
//  * 增加用户
//  * @param  {[User]} user [mongoose.model('User')]
//  * @return {[type]}      [description]
//  */
// exports.addUser = async (user) => {
// 	user = await user.save()
// 	return user
// }

// /**
//  * 删除用户
//  * @param  {[type]} options.phoneNumber [description]
//  * @return {[type]}                     [description]
//  */
// exports.deleteUser = async ({phoneNumber}) => {
// 	var flag = false
// 	console.log('flag==========>'+flag)
// 	await User.remove({phoneNumber}, function(err) {
// 		if(err) {
// 			flag = false
// 			// return false
// 		}else{
// 			flag = true
// 		}

// 	})
// 	console.log('flag=====await=====>'+flag)
// 	return flag
// }
