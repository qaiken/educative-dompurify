const jwt = require('jsonwebtoken');

// Signing (Sender)
const payload = { foo: 'bar' };
const token = jwt.sign(payload, 'my-cool-secret'); // HS256 by default

// Verification (Receiver)
const decoded = jwt.verify(token, 'my-cool-secret');
console.log(decoded.foo); // bar
