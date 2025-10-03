const { generateKeyPairSync } = require("crypto");
const fs = require("fs");

// Generate a 2048-bit RSA key pair
const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" }
});

// Save private key
fs.writeFileSync("server.key", privateKey);

// Save public key (upload this to Salesforce)
fs.writeFileSync("server.crt", publicKey);

console.log("✅ Generated server.key and server.crt in this folder");
