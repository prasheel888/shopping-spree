import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30D",
    }
  );
};

///we have to define middleware in auth

const isAuth = async (req, res, next) => {
  ///similar tike expressjs middleware
  //get authorization from req.header()
  const { authorization } = req.headers;
  //if uthorization exist than get the token from authorization

  if (authorization) {
    //get token from authorization type
    //Bearer xxx
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Token is not valid" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token is not supplied" });
  }
};

export { signToken, isAuth };
