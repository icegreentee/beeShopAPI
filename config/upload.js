'use strict'
const multer = require('koa-multer');


module.exports = function () {

  //配置
  var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    //修改文件名称
    //http://localhost:7001/uploads/1.jpg
    filename: function (req, file, cb) {
      let phone = req.body.phone;
      var fileFormat = (file.originalname).split(".");
      cb(null, phone+"_"+Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  })
  //加载配置
  return multer({ storage: storage });
}

