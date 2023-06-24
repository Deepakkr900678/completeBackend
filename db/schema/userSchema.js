const mongoose = require("mongoose");
const uuid = require("uuid");
const uniqueValidator = require("mongoose-unique-validator");
const moment = require("moment");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
      default: function genUUID() {
        return uuid.v4();
      },
    },
    firstName: {
      type: String,
      required: true,
      max: 50,
    },
    lastName: {
      type: String,
      min: 1,
      max: 50,
    },
    email: {
      type: String,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    mobileNumberVerified: {
      type: Boolean,
      default: false,
    },
    mobileNumber: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    termsAndCondition: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      min: 8,
    },
    role: {
      type: String,
      enum: ["Admin", "Customer", "Expert"],
      default: "Customer",
    },
    profilePic: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.createdAt = moment(ret.createdAt).format("DD MMM YYYY");
        ret.updatedAt = moment(ret.updatedAt).format("DD MMM YYYY");
        return ret;
      },
    },
  }
);

UserSchema.plugin(uniqueValidator);

const applicableFilters = [
  {
    name: "Role",
    params: "role",
    items: [
      { id: "Admin", title: "Admin" },
      { id: "Customer", title: "Customer" },
      { id: "Expert", title: "Expert" },
    ],
  },
  {
    name: "Email Verification",
    params: "emailVerified",
    items: [
      { id: true, title: "Verified" },
      { id: false, title: "Not Veerified" },
    ],
  },
  {
    name: "Mobile Number Verification",
    params: "mobileNumberVerified",
    items: [
      { id: true, title: "Verified" },
      { id: false, title: "Not Veerified" },
    ],
  },
];

filters = {
  models: [140, 141],
};

module.exports = {
  UserSchema,
  applicableFilters
};
