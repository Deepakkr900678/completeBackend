const mongoose = require("mongoose");
const uuid = require('uuid')
const uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: function genUUID() {
            return uuid.v4()
        }
    },
    projectPhase: {
        type: String,
        required: true
    },
    evaluate: {
        type: [String],
        required: true,
    },
    targetAudienceLocation: {
        type: [String],
        required: true
      },      
    targetUserType: {
        type: [String],
        required: true,
    },
    targetAudience: {
        type: [String],
        required: true,
    },
    targetGender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary'],
        required: true
    },
    targetLanguage: {
        type: String,
        required: true,
    },
    targetEducationLevel: {
        type: [String],
        required: true,
    },
    targetBudget: {
        type: String,
        required: true,
    },  
    user: {
        type: String,
        ref: "Users",
    }

}, { timestamps: true });

ProjectSchema.plugin(uniqueValidator);

module.exports = {
    ProjectSchema
}
