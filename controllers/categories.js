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

const category = {
  get: (req, res) => {
    const cat = storage.category;
    if (cat) res.status(200).json(cat);
    else res.status(404).json(new Error(404, 'Not found'));
  },

  createNew: (req, res) => {
    if (storage.category) {
      storage.category.push(req.params.name);
      res.status(200).json(new Success(200, 'category added'));
    } else res.status(500).json(new Error(500, 'Internal server error'));
  },

  replace: (req, res) => {
    const catIndex = storage.category.findIndex(cat => cat === req.params.old);
    if (catIndex !== -1) {
      storage.category[catIndex] = req.params.new;
      res.status(200).json(new Success(200, 'category replace successful'));
    } else res.status(404).json(new Error(404, 'category not found'));
  },

  deleter: (req, res) => {
    const catIndex = storage.category.findIndex(cat => cat === req.params.name);
    if (catIndex !== -1) {
      storage.category.splice(catIndex, 1);
      res.status(200).json(new Success(200, 'category delete successful'));
    } else res.status(404).json(new Error(404, 'category not found'));
  },
};

export default category;
