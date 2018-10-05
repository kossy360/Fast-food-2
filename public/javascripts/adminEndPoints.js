/* eslint-env browser */
import {
  ItemDiv, OrderDiv, CategoryDiv, errorHandler, newCategory,
} from '/javascripts/admin.js';

class EndPoint {
  consturctor() {
    this.itemArray = [];
    this.categoryArray = [];
    this.ordersArray = [];
    this.acceptedOrders = [];
    this.canceledOrders = [];
    this.id = () => {
      let a;
      request('GET', '/admin/getId').then((res) => { a = res; }).catch(errorHandler);
      return a;
    };
    this.categoryCheck = false;
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

  getCategory() {
    request('get', '/admin/admin/category')
      .then((x) => {
        this.categoryArray = x;
        if (this.categoryArray.length === 0) newCategory();
        let i = 0;
        while (i < this.categoryArray.length) {
          const category = new CategoryDiv(this.categoryArray[i]);
          category.initialize();
          i += 1;
        }
        this.getItems();
      }).catch(errorHandler);
  }

  postCategory(name) {
    this.categoryArray.push(name);
    request('post', `/admin/admin/category/${name}`)
      .then(console.log).catch(errorHandler);
  }

  putCategory(oldname, newname) {
    const a = this.categoryArray.indexOf(oldname);
    this.categoryArray[a] = newname;
    let i = 0;
    while (i < this.itemArray) {
      if (this.itemArray[i].category === oldname) this.itemArray[i].category = newname;
      i += 1;
    }
    request('put', `/admin/admin/category/${oldname}/${newname}`)
      .then(console.log).catch(errorHandler);
  }

  deleteCategory(name) {
    this.categoryArray.splice(this.categoryArray.indexOf(name), 1);
    let i = 0;
    while (i < this.itemArray) {
      if (this.itemArray[i].category === name) this.deleteItem(this.itemArray[i].id);
      i += 1;
    }
    request('delete', `/admin/admin/category/${name}`)
      .then(console.log).catch(errorHandler);
  }

  getItems() {
    request('get', '/admin/admin/items/all')
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

  postItem(item) {
    this.itemArray.push(item);
    request('POST', '/admin/admin/items/add', item)
      .then(console.log).catch(errorHandler);
  }

  putItem(item) {
    this.replace('item', item);
    request('PUT', '/admin/admin/items/', item)
      .then(console.log).catch(errorHandler);
  }

  deleteItem(id) {
    let i = 0;
    while (this.itemArray[i].id !== id && i < this.itemArray.length) {
      i += 1;
    }
    this.itemArray.splice(i, 1);
    request('DELETE', `/admin/admin/items/${id}`)
      .then(console.log).catch(errorHandler);
  }

  getOrders(x) {
    request('GET', x ? '/admin/admin/orders' : '/admin/admin/orders/new')
      .then((res) => {
        let i = 0;
        if (x) this.ordersArray = res;
        else { i = this.ordersArray.length; this.ordersArray = this.ordersArray.concat(res); }
        while (i < this.ordersArray.length) {
          const order = new OrderDiv(this.ordersArray[i]);
          order.initialize();
          i += 1;
        }
      }).catch(errorHandler);
  }

  putOrder(order) {
    this.replace('order', order);
    request('PUT', '/admin/admin/orders/', order)
      .then(console.log).catch(errorHandler);
  }

  sycnchronise() {
    const obj = {};
    obj.category = this.categoryArray;
    obj.items = this.itemArray;
    obj.orders = this.ordersArray;
    obj.accepted = this.acceptedOrders;
    obj.canceled = this.canceledOrders;

    request('PUT', '/admin/admin/sync', obj)
      .then(console.log).catch(errorHandler);
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
