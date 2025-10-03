const forge = require('node-forge');
const fs = require('fs');

// Generate a new RSA key pair
const keys = forge.pki.rsa.generateKeyPair(2048);

// Create a self-signed X.509 certificate
const cert = forge.pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = (Math.floor(Math.random()*100000)+1).toString();
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);

const attrs = [
  { name: 'commonName', value: 'jwt-app.example.com' },
  { name: 'organizationName', value: 'YourOrg' },
  { shortName: 'C', value: 'IN' }
];
cert.setSubject(attrs);
cert.setIssuer(attrs);

cert.setExtensions([
  { name: 'basicConstraints', cA: false },
  { name: 'keyUsage', digitalSignature: true, keyEncipherment: true },
  { name: 'extKeyUsage', clientAuth: true, serverAuth: true }
]);

cert.sign(keys.privateKey, forge.md.sha256.create());

// Convert to PEM and write files
const privateKeyPem = forge.pki.privateKeyToPem(keys.privateKey);
const certPem = forge.pki.certificateToPem(cert);

fs.writeFileSync('server.key', privateKeyPem, { encoding: 'utf8' });
fs.writeFileSync('server.crt', certPem, { encoding: 'utf8' });

console.log("✅ Generated server.key and server.crt (X.509 PEM)");
