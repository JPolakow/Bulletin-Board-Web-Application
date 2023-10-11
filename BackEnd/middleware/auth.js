const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  let id;

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    id = userId;
  } catch (err) {
    return res.sendStatus(401);
  }

  if (id) {
    req.user = { id };
    return next();
  }

  res.sendStatus(401);
}

module.exports = auth;






// //aim of this class is to check the users token is valid

// const jwt = require("jsonwebtoken");

// function auth(req, res, next) {
//   const token = req.header("x=auth-header");
//   let id;

//   try {
//     const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     id = userId;
//   } catch (err) {
//     return res.sendStatus(401);
//   }

//   if (id){
//     req.user = {id}
//     return next()
//   }

//   res.sendStatus(401);
// }

// module.exports = auth;
