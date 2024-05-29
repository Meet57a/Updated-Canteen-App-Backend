require('dotenv').config();
const { S3Client } = require("@aws-sdk/client-s3");

const S3 = new S3Client({

    region: "auto",
    endpoint: process.env.END_POINT,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey:
            process.env.SECRET_ACCESS_KEY,
    },
});

module.exports = S3;
