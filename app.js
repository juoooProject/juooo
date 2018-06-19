const mongoose = require("mongoose");
const db = mongoose.connect('mongodb://localhost:27017/house');
db.then(function () {
    console.log('数据库连接成功');
}).catch(function (err) {
    console.err(new Error(err));
})
// var schema =
