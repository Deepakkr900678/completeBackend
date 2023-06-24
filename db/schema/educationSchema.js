const mongoose = require("mongoose");
const uuid = require("uuid");

const EducationSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: function genUUID() {
            return uuid.v4();
        },
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: String,
        ref: "Users",
    }
})

module.exports = {
    EducationSchema
};