/* eslint-env browser */
import {
  ItemDiv, OrderDiv, CategoryDiv, errorHandler,
} from '/javascripts/user.js';

class EndPoint {
  consturctor() {
    this.user = {};
    this.orderHistory = [];
    this.sessionId = '';
    this.categoryArray = [];
    this.itemsArray = [];
  }

  replace(flag, item) {
    if (flag === 'item') {
      let i = 0;
      while (this.itemArray[i].id !== item.id && i < this.itemArray.length) {
        i += 1;
      }
      this.itemArray[i] = item;
    } else if (flag === 'order') {
      const a = item.state;
      if (a === 'canceled') {
        let i = 0;
        while (this.ordersArray[i].id !== item.id && i < this.ordersArray.length) {
          i += 1;
        }
        if (i === this.ordersArray.length - 1 && this.ordersArray[i].id !== item.id) {
          i = 0;
          while (this.acceptedOrders[i].id !== item.id && i < this.acceptedOrders.length) {
            i += 1;
          }
          this.acceptedOrders.splice(i, 1);
        } else {
          this.ordersArray.splice(i, 1);
          this.canceledOrders.push(item);
        }
      } else {
        let i = 0;
        while (this.ordersArray[i].id !== item.id && i < this.ordersArray.length) {
          i += 1;
        }
        this.ordersArray.splice(i, 1);
        this.acceptedOrders.push(item);
      }
    } else {
      const a = this.categoryArray.indexOf(flag);
      this.categoryArray[a] = item;
    }
  }

  getUser() {
    return request('GET', 'profile')
      .then((res) => { this.user = res; return res; });
  }

  getCategory() {
    request('get', '/users/category')
      .then((x) => {
        this.categoryArray = x;
        let i = 0;
        while (i < this.categoryArray.length) {
          const category = new CategoryDiv(this.categoryArray[i]);
          category.initialize();
          i += 1;
        }
        this.getItems();
      }).catch(errorHandler);
  }

  getItems() {
    request('get', '/users/items')
      .then((res) => {
        this.itemArray = res;
        console.log(this.itemArray);
        let i = 0;
        while (i < this.itemArray.length) {
          const item = new ItemDiv(this.itemArray[i]);
          item.initialize();
          i += 1;
        }
      }).catch(errorHandler);
  }

  getOrders() {
    if (!this.users) return;
    request('GET', 'orders')
      .then((res) => {
        let i = 0;
        this.orderHistory = res;
        while (i < this.orderHistory.length) {
          new OrderDiv(this.orderHistory[i]).initialize();
          i += 1;
        }
      }).catch(errorHandler);
  }

  postOrder(order) {
    request('PUT', 'order', order)
      .then(console.log).then(this.orderHistory.push(order)).catch(errorHandler);
  }

  initialize() {
    this.getCategory();
    this.getOrders(1);
  }
}

function request(method, url, body) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open(method.toUpperCase(), url);
    req.timeout = 10000;
    req.addEventListener('load', () => {
      if (req.status < 400) res(req.response);
      else rej(req);
    });
    req.addEventListener('error', () => {
      throw rej(Error('not connected'));
    });
    if (body) {
      req.setRequestHeader('content-type', 'application/json');
      req.send(JSON.stringify(body));
    } else req.send();
  });
}

export {
  EndPoint, request,
};
