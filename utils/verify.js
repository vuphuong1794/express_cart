const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json( "You are not authenticated!");
    }
  
    //neu co token se tien hanh kiem tra voi secret key xem hop le hay khong
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) res.status(403).json( "Token is not valid!");
      req.user = user;
      next();
    });
  };

  module.exports = verifyToken