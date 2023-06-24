const bcrypt = require("bcrypt");
require("dotenv").config();
const {userModel} = require("../db/db"); // Replace with your actual model

// const mongoose = require('mongoose');
// const username = process.env.MONGO_USER;
// const password = process.env.MONGO_PSWD;
// const dbname = "UserAlia";
// mongoose.connect(
//     `mongodb+srv://${username}:${password}@cluster0.aeymilo.mongodb.net/${dbname}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       autoIndex: true
//     }
//   );

console.log();

const getUsers = async () => {
  let salt = await bcrypt.genSalt();
  let passwordHash = await bcrypt.hash("Test!123", salt);
  return ([
    {
      firstName: "Manjunath",
      lastName: "Psycho",
      role: "Admin",
      email: "manjunath@exdera.com",
      emailVerified: true,
      mobileNumberVerified: true,
      mobileNumber: "1111111111",
      termsAndCondition: true,
      password: passwordHash,
      role: "Admin",
    },
  ])
};

const seedData = async () => {
  try {
    const userData = await getUsers();
    await userModel.insertMany(userData);
    console.log("Data seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

// setInterval(seedData, 5000);

// clearInterval(seedData);

seedData()

