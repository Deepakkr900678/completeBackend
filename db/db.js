// db connection
const mongoose = require('mongoose');
const { UserSchema } = require('./schema/userSchema');
const { SocialLoginSchema } = require('./schema/socialLoginSchema');
const { ProjectSchema } = require('./schema/projectSchema');
const {EducationSchema} = require('./schema/educationSchema')
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PSWD;
const dbname = "UserAliaTest";
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.azno5sx.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    autoIndex: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to mongodb successfully");
});

// Model definitions
const userModel = mongoose.model('Users', UserSchema)
const socialLoginSchema = mongoose.model('SocialLoginSchemas', SocialLoginSchema)
const projectSchema = mongoose.model('ProjectSchemas',ProjectSchema)
const educationSchema = mongoose.model('EducationSchemas',EducationSchema )
module.exports = {
  db,
  userModel,
  socialLoginSchema,
  projectSchema,
  educationSchema
}