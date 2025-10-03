const fs = require('fs');
const jwt = require('jsonwebtoken');

const consumerKey = "3MVG9dAEux2v1sLuLwD.z6vsTa8t4d4zi3Qsb0x4WxCoAAdhErJQZzqlLgOMMuzHrooL2cGxiy53k8Ch6DpXK"; // your Consumer Key
const username = process.env.SF_USERNAME || "YOUR_INTEGRATION_USERNAME"; // replace with your Salesforce username
const loginUrl = process.env.SF_LOGIN_URL || "https://login.salesforce.com"; // use https://test.salesforce.com for sandbox

const privateKey = fs.readFileSync('server.key', 'utf8');

const token = jwt.sign(
  {
    iss: consumerKey,
    sub: username,
    aud: loginUrl,
    exp: Math.floor(Date.now() / 1000) + 60 * 3 // 3 minutes expiry
  },
  privateKey,
  { algorithm: 'RS256' }
);

console.log(token);
