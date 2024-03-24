
const { S3Client } = require("@aws-sdk/client-s3");

const S3 = new S3Client({
    region: "auto",
    endpoint: "https://3ff57ababdfc96ec8e55ca5a60ceb30d.r2.cloudflarestorage.com",
    credentials: {
        accessKeyId: "38b02b2f8cf5297b89d90d3e1f0b17b0",
        secretAccessKey:
            "57399a2363acfe28c90b49621419b45ede63640804744d0a7ba92b5f9804cd82",
    },
});

module.exports = S3;
    