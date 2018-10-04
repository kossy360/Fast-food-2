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

const items = {
  get: (req, res) => {
    const itemList = storage.items;
    if (itemList) res.status(200).json(itemList);
    else res.status(404).json(new Error(404, 'Not found'));
  },

  createNew: (req, res) => {
    if (storage.items) {
      storage.items.push(req.body);
      res.status(200).json(new Success(200, 'item created'));
    } else res.status(500).json(new Error(500, 'Internal server error'));
  },

  replace: (req, res) => {
    const itemIndex = storage.items.findIndex(item => item.id === req.params.itemId);
    if (itemIndex !== -1) {
      storage.items[itemIndex] = req.body;
      res.status(200).json(new Success(200, 'item replace successful'));
    } else res.status(404).json(new Error(404, 'item not found'));
  },

  deleter: (req, res) => {
    const itemIndex = storage.items.findIndex(item => item.id === req.params.itemId);
    if (itemIndex !== -1) {
      storage.items.splice(itemIndex, 1);
      res.status(200).json(new Success(200, 'item delete successful'));
    } else res.status(404).json(new Error(404, 'item not found'));
  },
};

export default items;
