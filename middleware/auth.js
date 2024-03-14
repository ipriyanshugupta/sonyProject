const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const dataToken = req.header.Authorization;
  const token = dataToken.split(" ")[1];

  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if(err)
      return res.json({
        message: "Invalid token",
      });
  });
  if (decoded) next();
};

module.export = auth;
