const { userModel } = require("../db/db");
const { applicableFilters } = require('../db/schema/userSchema');
const { deleteFile } = require("../helper/digitalOceanSpace");
const {
  getAllUsersSchema,
  createUserSchema,
  linkedInCreateUserSchema,
  userNameUpdateSchema,
} = require("../requestSchema/user");
const {
  validationError,
  successResponse,
} = require("../helper/responseTemplate");

const paginate = require("../helper/paginations");

const bcrypt = require("bcrypt");
const { generateJwtResponse } = require("../helper/jwtToken");

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of documents per page
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
    const results = await paginate(userModel, page, limit, "users", filters, applicableFilters, '_id firstName lastName email emailVerified mobileNumberVerified mobileNumber role createdAt updatedAt');
    res.status(200).send(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    let user = "";
    if (req.body.linkedInUser) {
      let { error, value } = await linkedInCreateUserSchema(req.body);
      if (error && error.details) {
        return res.status(422).json({ errors: error.details });
      }
      user = await userModel.findOne({ email: value.email });
      Object.assign(user, value);
      user = await user.save();
    } else {
      let { error, value } = createUserSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error && error.details) {
        return res.status(422).json({ errors: error.details });
      }

      let salt = await bcrypt.genSalt();
      let passwordHash = await bcrypt.hash(value.password, salt);
      const newUser = new userModel({
        ...value,
        password: passwordHash,
      });
      user = await newUser.save();
    }
    res
      .status(201)
      .json(
        await successResponse(
          "Successfully created",
          await generateJwtResponse(user)
        )
      );
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ errors: await validationError(err) });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateUserName = async (req, res) => {
  try {
    let { error, value } = userNameUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error && error.details) {
      return res.status(422).json({ errors: error.details });
    }

    user = req.user;
    Object.assign(user, value);
    user = await user.save();
    res
      .status(200)
      .send(await successResponse("Successfully updated name", {}));
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ errors: await validationError(err) });
    }
    res.status(500).json({ error: err });
  }
};

const removeProfilePicture = async (req, res) => {
  try {
    user = req.user;
    console.log("working");
    const deleteStatus = await deleteFile(user.profilePic);
    if (deleteStatus) {
      user.profilePic = null;
      user = await user.save();
      res
        .status(200)
        .send(
          await successResponse("Successfully removed the profile picture", {})
        );
    } else {
      res.status(400).send({ error: "Unable to remove profile pic" });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ errors: await validationError(err) });
    }
    res.status(500).json({ error: err.message });
  }
};

const profileDetails = async (req, res) => {
  try {
    let { firstName, lastName, mobileNumber, role, email, profilePic } =
      req.user;
    let profilePicAttached = true;
    if (profilePic) {
      profilePic = await getPublicUrl(profilePic);
    } else {
      profilePic = `${process.env.BACKEND_URL}user-default.png`;
      profilePicAttached = false;
    }
    res
      .status(200)
      .send(
        await successResponse("Success", {
          firstName,
          lastName,
          mobileNumber,
          role,
          email,
          profilePic,
          profilePicAttached,
        })
      );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUserName,
  removeProfilePicture,
  profileDetails,
};
