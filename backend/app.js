// RSA生成公钥私钥
// const fs = require("fs").promises; // file system
// const NodeRSA = require('node-rsa');
// const key = new NodeRSA({b: 1024});
// const publicKey = key.exportKey('public');
// const privateKey = key.exportKey('private');

// fs.writeFile('./rsa/public.pem', publicKey).then((data) => {
//     console.log('创建公钥成功');
// }).catch((error) => {
//     console.log('创建公钥失败');
// });

// fs.writeFile('./rsa/private.key', privateKey).then((data) => {
//     console.log('创建私钥成功');
// }).catch((error) => {
//     console.log('创建私钥失败');
// });

const express = require("express");
const bodyParser = require("body-parser");

// 路由控制
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

// 跨域控制
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cookieParser());

app.use("/user", userRoutes);

app.listen(3000);
