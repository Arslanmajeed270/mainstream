const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESSKEYID,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

AWS.config.update({
  accessKeyId: "AKIAIUJNTFBLWOKRQW5A",
  secretAccessKey: "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",
  region: "us-west-1",
});

const s0 = new AWS.S3({});
const upload = multer({
  storage: multerS3({
    s3: s0,
    bucket: "derekter",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),

  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, "-").toLowerCase();
  },
});

exports.Upload = upload;
