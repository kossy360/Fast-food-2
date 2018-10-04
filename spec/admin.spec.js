/* eslint-env jasmine */
import Request from 'request';
import Server from '../server';

const start = () => Server;
start();

describe('get categories', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/category', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of categories', () => {
    expect(JSON.parse(data.body)).toEqual(['snacks', 'continental', 'soft-drinks']);
  });
});

describe('get items', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/items', (error, response, body) => {
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
      id: 'it-0001',
      name: 'burger',
      category: 'snacks',
      stock: '150',
      price: 'N1500',
      image: 'http://www.images.com/burger.jpg',
    });
  });
});

describe('get orders', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/orders', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of order objects', () => {
    expect(JSON.parse(data.body)).toContain({
      id: 'od-0001',
      user: 'us-0001',
      status: 'accepted',
      items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
    });
  });
});

describe('add a new category', () => {
  const data = {};
  beforeAll((done) => {
    Request.post('http://localhost:3000/admin/category/chinese', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  describe('check if said category have been added', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/admin/category', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
    it('array of categories', () => {
      expect(JSON.parse(data2.body)).toContain('chinese');
    });
  });
});

describe('adding a new item', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/admin/items',
    json: true,
    method: 'post',
    body: {
      id: 'it-0005',
      name: 'burger',
      category: 'chinese',
      stock: '150',
      price: 'N1500',
      image: 'http://www.images.com/burger.jpg',
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
  describe('check if said item was added', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/admin/items', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
    it('array of item objects', () => {
      expect(JSON.parse(data2.body)).toContain({
        id: 'it-0005',
        name: 'burger',
        category: 'chinese',
        stock: '150',
        price: 'N1500',
        image: 'http://www.images.com/burger.jpg',
      });
    });
  });
});

describe('to rename categories', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/category', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of categories', () => {
    expect(JSON.parse(data.body)).toContain('continental');
  });
  describe('rename category', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.put('http://localhost:3000/admin/category/continental/african', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
  });
  describe('check if category have been renamed', () => {
    const data3 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/admin/category', (error, response, body) => {
        data3.status = response.statusCode;
        data3.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data3.status).toBe(200);
    });
    it('array of categories', () => {
      expect(JSON.parse(data3.body)).toEqual(['snacks', 'african', 'soft-drinks', 'chinese']);
    });
  });
});

describe('modify item details', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/items', (error, response, body) => {
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
      id: 'it-0004',
      name: 'burger',
      category: 'snacks',
      stock: '150',
      price: 'N1500',
      image: 'http://www.images.com/burger.jpg',
    });
  });

  describe('modifying item details', () => {
    const data2 = {};
    const options = {
      url: 'http://localhost:3000/admin/items/it-0004',
      json: true,
      method: 'put',
      body: {
        id: 'it-0004',
        name: 'burger',
        category: 'snacks',
        stock: '100',
        price: 'N3000',
        image: 'http://www.images.com/burger.jpg',
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
    describe('check if said item was modified', () => {
      const data3 = {};
      beforeAll((done) => {
        Request.get('http://localhost:3000/admin/items', (error, response, body) => {
          data3.status = response.statusCode;
          data3.body = body;
          done();
        });
      });
      it('status 200', () => {
        expect(data3.status).toBe(200);
      });
      it('item compare', () => {
        expect(JSON.parse(data3.body)).toContain({
          id: 'it-0004',
          name: 'burger',
          category: 'snacks',
          stock: '100',
          price: 'N3000',
          image: 'http://www.images.com/burger.jpg',
        });
      });
    });
  });
});

describe('modify order details', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/orders', (error, response, body) => {
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
      id: 'od-0002',
      user: 'us-0001',
      status: 'accepted',
      items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
    });
  });

  describe('modifying order details', () => {
    const data2 = {};
    const options = {
      url: 'http://localhost:3000/admin/orders/od-0002',
      json: true,
      method: 'put',
      body: {
        id: 'od-0002',
        user: 'us-0001',
        status: 'canceled',
        items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
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
    describe('check if said order was modified', () => {
      const data3 = {};
      beforeAll((done) => {
        Request.get('http://localhost:3000/admin/orders', (error, response, body) => {
          data3.status = response.statusCode;
          data3.body = body;
          done();
        });
      });
      it('status 200', () => {
        expect(data3.status).toBe(200);
      });
      it('user details', () => {
        expect(JSON.parse(data3.body)).toContain({
          id: 'od-0002',
          user: 'us-0001',
          status: 'canceled',
          items: [{ id: 'it-0001', qty: 1 }, { id: 'it-0002', qty: 1 }, { id: 'it-0003', qty: 1 }],
        });
      });
    });
  });
});

describe('deleting an item', () => {
  const data = {};
  beforeAll((done) => {
    Request.delete('http://localhost:3000/admin/items/it-0001', (error, response) => {
      data.status = response.statusCode;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  describe('check if said item was deleted by attempting to modify it', () => {
    const data2 = {};
    const options = {
      url: 'http://localhost:3000/admin/items/it-0001',
      json: true,
      method: 'put',
      body: {
        id: 'it-0001',
        name: 'burger',
        category: 'snacks',
        stock: '100',
        price: 'N3000',
        image: 'http://www.images.com/burger.jpg',
      },
    };
    beforeAll((done) => {
      Request.put(options, (error, response) => {
        data2.status = response.statusCode;
        done();
      });
    });
    it('status 404', () => {
      expect(data2.status).toBe(404);
    });
  });
});

describe('deleting a category', () => {
  const data = {};
  beforeAll((done) => {
    Request.get('http://localhost:3000/admin/category', (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of categories', () => {
    expect(JSON.parse(data.body)).toContain('african');
  });
  describe('delete category', () => {
    const data2 = {};
    beforeAll((done) => {
      Request.delete('http://localhost:3000/admin/category/african', (error, response, body) => {
        data2.status = response.statusCode;
        data2.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data2.status).toBe(200);
    });
  });
  describe('deleting a category', () => {
    const data3 = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/admin/category', (error, response, body) => {
        data3.status = response.statusCode;
        data3.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data3.status).toBe(200);
    });
    it('array of categories', () => {
      expect(JSON.parse(data3.body).indexOf('african')).toBe(-1);
    });
  });
});
