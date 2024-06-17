require('dotenv').config();
const { S3Client } = require("@aws-sdk/client-s3");

<<<<<<< HEAD
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
=======


module.exports = S3;
    
>>>>>>> 3103b5a1f173a87f12a96e06a579d7430bf3030e
