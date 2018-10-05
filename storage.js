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

export default storage;
