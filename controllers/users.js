import storage from '../storage';

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

class Success {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const users = {
  get: (req, res) => {
    const userProfile = storage.users.find(userObj => userObj.id === req.params.userId);
    if (userProfile) res.status(200).json(userProfile);
    else res.status(404).json(new Error(404, 'Not found'));
  },

  createNew: (req, res) => {
    if (storage.users) {
      storage.users.push(req.body);
      res.status(200).json(new Success(200, 'user created'));
    } else res.status(500).json(new Error(500, 'Internal server error'));
  },

  replace: (req, res) => {
    const userIndex = storage.users.findIndex(user => user.id === req.params.userId);
    if (userIndex !== -1) {
      storage.users[userIndex] = req.body;
      res.status(200).json(new Success(200, 'user replace successful'));
    } else res.status(404).json(new Error(404, 'user not found'));
  },

};

export default users;
