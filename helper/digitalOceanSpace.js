const aws = require("aws-sdk");

const spacesEndpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const digitalOnceanSpace = new aws.S3({
  forcePathStyle: true,
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACE_KEY_ID,
  secretAccessKey: process.env.SPACE_SECRET_KEY,
});

const getPublicUrl = async (key) => {
  const params = {
    Bucket: process.env.DIGITAL_OCEAN_SPACE,
    Key: key,
    Expires: 3600, // Link expiration time in seconds (adjust as needed)
  };

  try {
    const url = digitalOnceanSpace.getSignedUrl('getObject', params);
    return url;
  } catch (error) {
    console.error('Error retrieving public URL:', error);
    return null;
  }
};

const deleteFile = async (key) => {
  const params = {
    Bucket: process.env.DIGITAL_OCEAN_SPACE,
    Key: key,
  };

  try {
    await digitalOnceanSpace.deleteObject(params).promise();
    return true;
  } catch (error) {
    return false;
  }
};



module.exports = {
  digitalOnceanSpace,
  getPublicUrl,
  deleteFile
};
