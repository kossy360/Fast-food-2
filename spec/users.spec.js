/* eslint-env jasmine */
const Request = require('request');

describe('get categories', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/users/category', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of categories', () => {
    expect(JSON.parse(data.body)).toContain('soft-drinks');
  });
});

describe('get items', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/users/items', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of item objects', () => {
    expect(JSON.parse(data.body)).toContain({
      id: 'it-0002',
      name: 'burger',
      category: 'snacks',
      stock: '150',
      price: 'N1500',
      image: 'http://www.images.com/burger.jpg',
    });
  });
});

describe('get user profile', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/users/profile/us-0003', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('object containing user details', () => {
    expect(JSON.parse(data.body)).toEqual({
      id: 'us-0003',
      name: 'kossy ugo',
      email: 'kossy@test.com',
      password: 'hungryman',
      phone: '08012345678',
      address: 'banana island',
      orders: ['od-0003'],
    });
  });
});

describe('adding a new user', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/users/new',
    json: true,
    method: 'post',
    body: {
      id: 'us-0004',
      name: 'kossy ugo',
      email: 'kossy@test.com',
      password: 'hungryman',
      phone: '08012345678',
      address: 'banana island',
      orders: [],
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  describe('check if said user was added', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/users/profile/us-0004', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
    it('user details', () => {
      expect(JSON.parse(data2.body)).toEqual({
        id: 'us-0004',
        name: 'kossy ugo',
        email: 'kossy@test.com',
        password: 'hungryman',
        phone: '08012345678',
        address: 'banana island',
        orders: [],
      });
    });
  });
});

describe('replacing a user profile', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/users/profile/us-0003', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of item objects', () => {
    expect(JSON.parse(data.body)).toEqual({
      id: 'us-0003',
      name: 'kossy ugo',
      email: 'kossy@test.com',
      password: 'hungryman',
      phone: '08012345678',
      address: 'banana island',
      orders: ['od-0003'],
    });
  });

  describe('modifying user details', () => {
    const data2 = {};
    const options = {
      url: 'http://localhost:3000/users/profile/us-0003',
      json: true,
      method: 'put',
      body: {
        id: 'us-0003',
        name: 'kossy ugo',
        email: 'kossy@test.com',
        password: 'hungryman',
        phone: '08012345678',
        address: 'eko atlantic',
        orders: ['od-0003'],
      },
    };
    beforeAll((done) => {
      Request.put(options, (error, response) => {
        data2.status = response.statusCode;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
    describe('check if said user profile was modified', () => {
      const data3 = {};
      beforeAll((done) => {
        Request.get('http://localhost:3000/users/profile/us-0003', (error, response, body) => {
          data3.status = response.statusCode;
          data3.body = body;
          done();
        });
      });
      it('status 200', () => {
        expect(data3.status).toBe(200);
      });
      it('user details', () => {
        expect(JSON.parse(data3.body)).toEqual({
          id: 'us-0003',
          name: 'kossy ugo',
          email: 'kossy@test.com',
          password: 'hungryman',
          phone: '08012345678',
          address: 'eko atlantic',
          orders: ['od-0003'],
        });
      });
    });
  });
});

describe('get user order history', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/users/orders/us-0003', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of order ids', () => {
    expect(JSON.parse(data.body)).toContain('od-0003');
  });
});

describe('posting a new user order', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/users/order/us-0001',
    json: true,
    method: 'post',
    body: {
      id: 'od-0004',
      user: 'us-0001',
      status: 'accepted',
      items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  describe('check if said order was added', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/users/orders/us-0001', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
    it('user details', () => {
      expect(JSON.parse(data2.body)).toContain('od-0004');
    });
  });
});

describe('deleting or canceling order by user', () => {
  const data = {};
  beforeAll((done) => {
    Request.delete('http://localhost:3000/users/order/od-0001/us-0002', (error, response) => {
      data.status = response.statusCode;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  describe('check if said order was deleted', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/users/orders/us-0002', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('order array to not contain said order', () => {
      expect(JSON.parse(data2.body)).toEqual([]);
    });
  });
});
