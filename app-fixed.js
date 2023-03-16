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

function logToLoggingService() {}

app.post("/users", (req, res) => {
  let body;

  try {
    body = handleRequest(req.body.name);
  } catch (err) {
    // BETTER

    if (err.name === "UserError") {
      res
        // We are now using an accurate HTTP status code.
        .status(422)
        // We are now sending an error message
        // that is intended for the end user.
        .json({ userCreated: false, error: err.message });
      return;
    }

    // We are logging the stack trace on the server
    // and sending it to a logging service.
    logToLoggingService("Exception occurred", err.stack);

    res
      .status(500)
      .json({ userCreated: false, error: "An exception occurred" });
    return;
  }

  res.json(body);
});

module.exports = app;
