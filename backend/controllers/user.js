const _user = 'phoenix';
const _password = '12345';

exports.login = (request, response, next) => {

  const { user, password } = request.body;

  if ( user === _user && password === _password ) {

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({user: user}, 'mySecrete', 
    // {expiresIn: '1min'}
    );

    response.setHeader('Authorization', token);
    response.status(200).json({
      message: 'login succeeded'
    });
    next();
  }

  response.status(401).json({
    message: 'login failed'
  });
  next();
};

exports.records = (request, response) => {

  const dataList = [{
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
  }];

  
  const { authorization: token } = request.headers;
  console.log(token);

  const jwt = require('jsonwebtoken');
  const decoded = jwt.verify(token, 'mySecrete');
  console.log(decoded);

  if ( decoded.user === _user ) {
    response.status(200).json({
      data: dataList
    });
    next();
  }


  response.status(401).json({
    message: 'unauthorized'
  });

}

