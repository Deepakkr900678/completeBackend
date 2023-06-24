const { userModel } = require("../db/db");
const { generateJwtResponse } = require("../helper/jwtToken");
const { successResponse } = require("../helper/responseTemplate");
const { loginUser } = require("../requestSchema/user");

const bcrypt = require("bcrypt")

const login = async (req, res) => {
  try {
    // let { error, value } = await loginUser(req.body)
    let { error, value } = loginUser.validate(req.body, { abortEarly: false });
    if (error && error.details) {
      return res.status(422).json({ errors: error.details })
    }

    const { email, password } = value
    const user = await userModel.findOne({ email: email })
    if (!user) return res.status(404).json({ error: { message: "Email is not registered" } })

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: { message: "Invalid password" } })

    res.status(200).json(await successResponse('Sign in success', await generateJwtResponse(user)))
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  login
}