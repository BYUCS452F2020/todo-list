const readUser = require('./data/users');

const authMW = async (req, res, next) => {
  if (!req.session || !req.session.username)
    return res.sendStatus(401);

  try {
    const user = await readUser(req.session.username);

    // If the user doesn't exist a false session cookie was provided.
    if (!user) {
      return res.sendStatus(401)
    }

    // Set the user field in the request, so we can access it later in the middleware stack (i.e. in "routes").
    req.user = user;

  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }

  return next();
};

module.exports = {
  authMW
};
