const jwt = require("jsonwebtoken");
const { userModel } = require("../db/db");

const verifyJwtToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).send("Access Denied");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(verified.id);
    if (req.user) {
      next();
    } else {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    ////// Uncomment when the email and mobile number verification is completed //////

    // if (!user.emailVerified) {
    //   return res.status(403).json({ error: { message: 'Email is not verified yet' } })
    // }

    // if (!user.mobileNumberVerified) {
    //   return res.status(403).json({ error: { message: 'Mobile number is not verified yet' } })
    // }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(410).json({ error: { message: err.message } });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: { message: err.message } });
    }

    res.status(500).json({ error: { message: err.message } });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({ error: { message: "Access Denied" } });
    }
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
};

module.exports = { verifyJwtToken, verifyAdmin };
