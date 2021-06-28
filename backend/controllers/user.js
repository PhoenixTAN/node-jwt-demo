const fs = require("fs");
const NodeRSA = require("node-rsa");
const path = require("path");
const rsaPath = path.resolve(__dirname, "../rsa").toString();
const privateKey = fs.readFileSync(path.join(rsaPath, "/private.key"));
const publicKey = fs.readFileSync(path.join(rsaPath, "/public.pem"));
const cookie = require("cookie");

const _user = "phoenix";
const _password = "12345";

exports.login = (request, response, next) => {
  const { userName, password } = request.body;
  console.log(userName, password);

  if (userName === _user && password === _password) {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ userName: userName }, privateKey, {
      algorithm: "RS256",
    });

    // response.setHeader("Authorization", token);
    response.cookie("token", token, { httpOnly: "true" });
    response.status(200).json({
      message: "login succeeded",
      data: {
        userName: userName,
      },
    });
    return;
  }

  response.status(401).json({
    message: "login failed",
  });
};

exports.records = (request, response) => {
  const dataList = [
    {
      time: "2021-06-05",
      amount: "6",
      tag: "commute",
    },
    {
      time: "2021-06-06",
      amount: "25",
      tag: "relationship",
    },
    {
      time: "2021-06-07",
      amount: "10",
      tag: "sport",
    },
  ];

  // const { authorization: token } = request.headers;
  // console.log(token);

  const { token } = cookie.parse(request.headers.cookie);
  console.log("cookie", cookie.parse(request.headers.cookie));

  const jwt = require("jsonwebtoken");
  const decoded = jwt.verify(token, publicKey);
  // console.log(decoded);

  if (decoded.user === _user) {
    response.status(200).json({
      data: dataList,
    });
    return;
  }

  response.status(401).json({
    message: "unauthorized",
  });
};
