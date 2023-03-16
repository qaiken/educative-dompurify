const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserError";
  }
}

function handleRequest(userName) {
  if (userName.length >= 100) {
    throw new UserError("user name is too long!");
  }

  return { userCreated: true };
}

app.post("/users", (req, res) => {
  let body;

  try {
    body = handleRequest(req.body.name);
  } catch (err) {
    // DO NOT DO THIS

    res
      // We are sending a generic HTTP status code
      // that indicates a server error even though
      // we are catching the error and not doing any error validation.
      .status(500)
      // We are sending the error stack trace to the end user
      // and not logging it on the server.
      .json({ error: err.stack });
    return;
  }

  res.json(body);
});

module.exports = app;
