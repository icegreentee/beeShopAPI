'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
var SaleSchema = new Schema({
  id: {
    unique: true,
    type: String
  },
  goodsid: String,
  buyphone:String,
  buytime: {
    type: Date,
    dafault: Date.now()
  },
  accept:{
    type: String,
    dafault:""
  },
  accepttime: {
    type: Date,
    dafault: null
  },
  finish:{
    type: String,
    dafault:""
  }
})

// Defines a pre hook for the document.
// SaleSchema.pre('save', function(next) {
//   this.updatetime = Date.now();
//   next()
// })


/**
 * 定义模型Sale
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数Sale 数据库中的集合名称, 不存在会创建.
var Sale = mongoose.model('Sale', SaleSchema)

module.exports = Sale

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */