const User = require('../models/user');

const addUserController = x => {
  return User.create(x);
};

const getUserByIdController = x => {
  return User.findOne({
    where: {
      id: x
    }
  });
};

const getUserByMailController = x => {
  return User.findOne({
    where: {
      email: x
    }
  });
};

const getSafeUserDataController = req => {
  let id = req.token.sub;
  return getUserById(id).then(results => {
    const user = results[0];
    const { password_salt, password_hash, ...safeUserData } = user;
    return safeUserData;
  });
};

const updateUserData = req => {
    return User.update({first_name: req[1], last_name: req[2]}, {
      where: {
          id: req[0]
      }
  })
};

module.exports = {
  addUserController,
  getUserByIdController,
  getUserByMailController,
  getSafeUserDataController,
  updateUserData
};