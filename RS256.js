const jwt = require('jsonwebtoken');
const fs = require('fs');

// Signing (Sender)
const privateKey = fs.readFileSync('private.key');
const payload = { foo: 'bar' };
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Verification (Receiver)
var publicKey = fs.readFileSync('public.pem');
jwt.verify(token, publicKey, function (err, decoded) {
  console.log(decoded.foo); // bar
});
