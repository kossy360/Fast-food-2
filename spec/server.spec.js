var Request = require("request");
server = require("../build/server");

describe("get categories", () => {
  var data = {};
  beforeAll((done) => {
    Request.get("http://localhost:3000/users/category", (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it("status 200", () => {
    expect(data.status).toBe(200);
  });
  it("array of categories", () => {
    expect(JSON.parse(data.body)).toEqual(['snacks', 'continental', 'soft-drinks']);
  });
});
