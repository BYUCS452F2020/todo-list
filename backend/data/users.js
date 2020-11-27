const { sqlClient } = require('../dbs.js');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.virtual('id')
  .get(function () {
    return this._id.toHexString();
  });

userSchema.set('toJSON', {
  virtuals: true
});

// This allows for logic before we save a User.
userSchema.pre('save', async function (next) {
  // If the password hasn't been modified, then skip this logic and just continue on to the next thing.
  if (!this.isModified('password')){
    return next()
  }

  try {
    // Try and generate a hash of the value set for the password, and save it as the password.
    // Important to note here, argon2 uses salts and stores them with the passwords, so we don't have to worry about
    // salting ourselves.
    this.password = await argon2.hash(this.password);
    next()
  } catch (e) {
    next(e)
  }
});

// This method should be used whenever returning data to a client. It strips out the password from the user, so we don't
// ever send the encrypted password across the wire.
userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj
};

const User = mongoose.model('User', userSchema);

// async function hashPassword(password) {
//     return argon2.hash(password);
// }

async function createUser(username, password) {
  let user = new User({
    username,
    password
  });

  await user.save();

  return user;
}

async function readUser(username) {
  return await User.findOne({ username })
}

async function comparePassword(argonHash, plainText) {
  try {
    return await argon2.verify(argonHash, plainText)
  } catch (e) {
    console.log(e);
    return false
  }
}

module.exports = {
  createUser,
  readUser,
  comparePassword
};
