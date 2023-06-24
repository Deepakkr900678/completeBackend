const mongoose = require("mongoose");
const uuid = require("uuid");
const uniqueValidator = require("mongoose-unique-validator");

const SocialLoginSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid.v4();
    },
  },
  user: {
    type: String,
    ref: "Users",
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  socialLoginId: {
    type: String,
    required: true,
  },
  response: {
    type: mongoose.Schema.Types.Mixed,
  },
  linked: {
    type: Boolean,
    default: true,
  },
});

SocialLoginSchema.index({ provider: 1, socialLoginId: 1 }, { unique: true });

SocialLoginSchema.pre("save", function (next) {
  // Convert provider values to lowercase
  this.provider = this.provider.toLowerCase();
  next();
});

SocialLoginSchema.plugin(uniqueValidator);

module.exports = {
  SocialLoginSchema,
};
