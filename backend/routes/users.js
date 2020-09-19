const express = require('express');
const router = express.Router();
const users = require("../data/users.js");
const dbs = require('../dbs');
import { authMW } from "../middleware";

router.post('/', async (req, res) => {
  // Validate
  if(!req.body.username || !req.body.password){
    return res.status(400)
      .send({
        message: "Username and password are required."
      });
  }

  let commit = false;
  try {
    await dbs.beginSQLTransaction();

    let user = await users.readUser(req.body.username);
    if (user) {
      return res.status(400)
        .send(`Sorry, a user with the username of ${req.body.username} already exists. Please pick a different username and try again.`);
    }

    user = await users.createUser(req.body.username, req.body.password);

    // This puts the username in the session token.
    req.session.username = user.username;

    commit = true;

    return res.send({
      message: user
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  } finally {
    await dbs.closeSQLConnection(commit)
  }
});


router.get('/', authMW, async (req, res) => {
  const user = req.user;

  if (!user) {
    console.log("There was an error getting the user. The user wasn't in the req obj. We expected it to be there because the authMW function is in the call stack.");
    return res.sendStatus(500)
  }

  return res.send(user);
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400)
      .send({
        message: "Username and password are required to login"
      })
  }

  try {
    const user = users.readUser(username);

    if (!user) {
      return res.status(400)
        .send({
          message: `The user with the username of ${username} does not exist.`
        })
    }

    const isValidPassword = await users.comparePassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401)
        .send({
          message: "Invalid username and password combination."
        })
    }

    // This puts the username in the session token.
    req.session.username = user.username;

    res.send({
      user: user
    })
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


module.exports = {
  routes: router
};
