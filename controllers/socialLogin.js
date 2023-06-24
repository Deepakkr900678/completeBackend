const { userModel, socialLoginSchema } = require("../db/db");
const { successResponse } = require("../helper/responseTemplate");
const { generateJwtResponse } = require("../helper/jwtToken");
const https = require("https");
const { digitalOnceanSpace } = require("../helper/digitalOceanSpace");

const linkedInLogin = async (req, res) => {
  try {
    console.log("working");
  } catch (e) {}
};

const linkedInLoginFailed = async (req, res) =>
  res.status(401).json({
    message: "LinkedIn is already taken",
    context: { key: "Linked In", value: "" },
  });

const linkedInLoginSuccess = async (req, res) => {
  try {
    const { emails, id, name, photos, provider, displayName } = req.user;
    const existingAccount = await socialLoginSchema
      .findOne({ socialLoginId: id, provider, linked: true })
      .populate("user");

    let user = null;
    if (existingAccount) {
      user = existingAccount.user;
    } else {
      console.log("working");
      let profilePicUrl = null;
      if (photos.length) {
        profilePicUrl = photos[0].value;
      }
      console.log("working");
      user = await create_user(
        emails,
        id,
        name,
        photos,
        provider,
        displayName,
        profilePicUrl
      );
    }

    res.redirect(
      `${process.env.FRONTEND_URL}register?email=${user.email}&firstName=${user.firstName}&lastName=${user.lastName}`
    );
    // res.redirect(`http://localhost:3001/register`)
    // .status(200)
    // .json(
    //   await successResponse("Sign in success", generateJwtResponse(user))
    // );
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(422).json({ errors: await validationError(err) });
    }
    res.status(500).json({ error: err.message });
  }
};

const create_user = async (
  emails,
  id,
  name,
  photos,
  provider,
  displayName,
  profilePicUrl
) => {
  const newUser = new userModel({
    email: emails[0].value,
    firstName: name.givenName,
    lastName: name.familyName,
    termsAndCondition: true,
  });
  const user = await newUser.save();
  const newSocialLogin = new socialLoginSchema({
    user: user._id,
    provider,
    socialLoginId: id,
    response: { emails, id, name, photos, provider, displayName },
  });

  await newSocialLogin.save();

  if (profilePicUrl) downloadImageAttachUser(profilePicUrl, user);

  return user;
};

const downloadImageAttachUser = async (url, user) => {
  https
    .get(url, (response) => {
      let fileData = Buffer.alloc(0);

      response.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      const key = Date.now();

      response.on("end", () => {
        // Upload the file to DigitalOcean Spaces
        const params1 = {
          Bucket: process.env.DIGITAL_OCEAN_SPACE,
          Key: `${process.env.DIGITAL_OCEAN_PROFILE_PIC_PATH}${key}`,
          Body: fileData,
        };

        digitalOnceanSpace.upload(params1, (err, data) => {
          if (!err) {
            user.profilePic = data.key;
            user.save();
          }
        });
      });
    })
    .on("error", (error) => {
      uploaded = false;
      console.error("Error downloading file:", error);
    });
};

module.exports = {
  linkedInLoginFailed,
  linkedInLoginSuccess,
};
