import createError from 'http-errors';

const storage = {
  users: [{
    id: 'us-0001',
    name: 'kossy ugo',
    email: 'kossy@test.com',
    password: 'hungryman',
    phone: '08012345678',
    address: 'banana island',
    orders: ['od-0001'],
  }, {
    id: 'us-0002',
    name: 'kossy ugo',
    email: 'kossy@test.com',
    password: 'hungryman',
    phone: '08012345678',
    address: 'banana island',
    orders: ['od-0002'],
  }, {
    id: 'us-0003',
    name: 'kossy ugo',
    email: 'kossy@test.com',
    password: 'hungryman',
    phone: '08012345678',
    address: 'banana island',
    orders: ['od-0003'],
  }],

  orders: [{
    id: 'od-0001',
    user: 'us-0001',
    status: 'accepted',
    items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
  }, {
    id: 'od-0002',
    user: 'us-0001',
    status: 'accepted',
    items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
  }, {
    id: 'od-0003',
    user: 'us-0001',
    status: 'accepted',
    items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
  }],

  items: [{
    id: 'it-0001',
    name: 'burger',
    category: 'snacks',
    stock: '150',
    price: 'N1500',
    image: 'http://www.images.com/burger.jpg',
  }, {
    id: 'it-0002',
    name: 'burger',
    category: 'snacks',
    stock: '150',
    price: 'N1500',
    image: 'http://www.images.com/burger.jpg',
  }, {
    id: 'it-0003',
    name: 'burger',
    category: 'snacks',
    stock: '150',
    price: 'N1500',
    image: 'http://www.images.com/burger.jpg',
  }, {
    id: 'it-0004',
    name: 'burger',
    category: 'snacks',
    stock: '150',
    price: 'N1500',
    image: 'http://www.images.com/burger.jpg',
  }],

  category: ['snacks', 'continental', 'soft-drinks'],
};

function find(flag, id) {
  function check() {
    switch (flag) {
      case 'items': return storage.items;
      case 'category': return storage.category;
      case 'user': return storage.users;
      case 'order': return storage.orders;
      default: return 0;
    }
  }
  const array = check();
  if (!array) return false;
  if (typeof array[0] === 'string') return array.indexOf(id);
  let i = 0;
  while (i < array.length && array[i].id !== id) i += 1;
  if (i === array.length) return false;
  return i;
}

function replace(flag, a, b, callback) {
  let pos;
  let i = 0;
  switch (flag) {
    case 'items':
      pos = find(flag, a);
      if (!pos) { callback(createError(404, 'wrong request')); return false; }
      storage.items[pos] = b;
      return true;
    case 'category':
      pos = find(flag, a);
      if (!pos) { callback(createError(404, 'wrong request')); return false; }
      storage.category[pos] = b;
      while (i < storage.items.length) {
        if (storage.items[i].category === a) storage.items[i].category = b;
        else i += 1;
      }
      return true;
    case 'user':
      pos = find(flag, a);
      if (!pos) { callback(createError(404, 'wrong request')); return false; }
      storage.users[pos] = b;
      return true;
    case 'order':
      pos = find(flag, a);
      if (!pos) { callback(createError(404, 'wrong request')); return false; }
      storage.orders[pos] = b;
      return true;
    default: callback(createError(404, 'wrong request')); return false;
  }
}

function get(flag, x, callback) {
  let i = 0;
  switch (flag) {
    case 'items':
      return storage.items;
    case 'category': return storage.category;
    case 'user':
      while (i < storage.users.length && storage.users[i].id !== x) i += 1;
      if (i === storage.users.length) {
        callback(createError(404, 'user is dead')); return 0;
      }
      return storage.users[i];
    case 'order':
      if (x !== 'admin') {
        const y = storage.users[find('user', x)].orders;
        return y;
      }
      return storage.orders;
    default: callback(createError(404, 'not found')); return 0;
  }
}

function deleter(flag, id, id2, callback) {
  let i = 0;
  switch (flag) {
    case 'items':
      storage.items.splice(find(flag, id), 1);
      return true;
    case 'category':
      storage.category.splice(find(flag, id), 1);
      while (i < storage.items.length) {
        if (storage.items[i].category === id) storage.items.splice(i, 1);
        else i += 1;
      }
      return true;
    case 'user':
      storage.users.splice(find(flag, id), 1);
      return true;
    case 'order':
      storage.orders.splice(find(flag, id), 1);
      if (id2) {
        const y = storage.users[find('user', id2)].orders;
        y.splice(y.indexOf(id), 1);
      }
      return true;
    default: callback(createError(403, 'unsuccessful')); return 0;
  }
}

function add(flag, a, b, callback) {
  switch (flag) {
    case 'items':
      storage.items.push(a);
      return true;
    case 'category':
      storage.category.push(a);
      return true;
    case 'user':
      storage.users.push(a);
      return true;
    case 'order':
      storage.orders.unshift(a);
      if (a) {
        const y = storage.users[find('user', b)].orders;
        y.unshift(a.id);
      }
      return true;
    default: callback(createError(404, 'sorry...can\'t figure out know where to store this')); return 0;
  }
}

export {
  storage, add, deleter, replace, get,
};
