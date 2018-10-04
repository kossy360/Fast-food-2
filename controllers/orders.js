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

const orders = {
  get: (req, res) => {
    const orderList = storage.orders;
    if (orderList) res.status(200).json(orderList);
    else res.status(404).json(new Error(404, 'Not found'));
  },

  userGet: (req, res) => {
    const userProfile = storage.users.find(userObj => userObj.id === req.params.userId);
    if (userProfile) {
      const userOrders = storage.orders.filter(order => userProfile.orders.includes(order.id));
      if (userOrders.length === 0) res.status(404).json(new Error(404, 'user orders not found'));
      else res.status(200).json(userOrders);
    } else res.status(404).json(new Error(404, 'user not found'));
  },

  createNew: (req, res) => {
    const userIndex = storage.users.findIndex(user => user.id === req.params.userId);
    if (userIndex !== -1) {
      storage.users[userIndex].orders.push(req.body.id);
    } else {
      res.status(404).send(new Error(404, 'user not found'));
      return;
    }
    if (storage.orders) {
      storage.orders.push(req.body);
      res.status(200).json(new Success(200, 'order created'));
    } else res.status(500).json(new Error(500, 'Internal server error'));
  },

  replace: (req, res) => {
    const orderIndex = storage.orders.findIndex(order => order.id === req.params.orderId);
    if (orderIndex !== -1) {
      storage.orders[orderIndex] = req.body;
      res.status(200).json(new Success(200, 'order replace successful'));
    } else res.status(404).json(new Error(404, 'order not found'));
  },

  deleter: (req, res) => {
    const userIndex = storage.users.findIndex(user => user.id === req.params.userId);
    const orderIndex = storage.orders.findIndex(order => order.id === req.params.orderId);
    if (orderIndex !== -1 && userIndex !== -1) {
      storage.users[userIndex].orders = storage.users[userIndex]
        .orders.filter(order => order !== req.params.orderId);
      storage.orders.splice(orderIndex, 1);
      res.status(200).json(new Success(200, 'order delete successful'));
    } else res.status(404).json(new Error(404, 'order not found'));
  },
};

export default orders;
