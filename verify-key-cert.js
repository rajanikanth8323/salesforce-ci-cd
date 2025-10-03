const forge = require('node-forge');
const fs = require('fs');

const keyPem = fs.readFileSync('server.key', 'utf8');
const certPem = fs.readFileSync('server.crt', 'utf8');

const privateKey = forge.pki.privateKeyFromPem(keyPem);
const cert = forge.pki.certificateFromPem(certPem);

const keyN = privateKey.n.toString(16);
const certN = cert.publicKey.n.toString(16);

if (keyN === certN) {
  console.log('MATCH: private key and certificate pair.');
} else {
  console.error('MISMATCH: key and cert do NOT match.');
}
