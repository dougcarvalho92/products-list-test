const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
const fs = require("fs");
let testFile = null;
let token = null;
describe("USERS", () => {
  beforeEach(async () => {
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.migrate.rollback();
    await connection.destroy();
    fs.unlinkSync(testFile);
  });
  it("CREATE USERS", async () => {
    const response = await request(app).post("/register").send({
      name: "usuario teste",
      password: "12345",
      email: "teste@gmail.com",
      level: 1,
    });

    expect(response.body).toHaveProperty("token");
  });

  it("LOGIN USERS", async () => {
    const response = await request(app)
      .get("/login")
      .auth("teste@gmail.com", "12345")
      .send();
    token = response.body.token;
    expect(response.body).toHaveProperty("token");
  });
  it("CREATE PRODUCT", async () => {
    const filePath = `${__dirname}/test_files/image_test.jpg`;
    const response = await request(app)
      .post("/product")
      .field("name", "abcd")
      .field("price", 99)
      .field("description", "abcd")
      .field("status", 1)
      .attach("file", filePath)
      .set("Authorization", "bearer " + token);

    expect(response.body).toHaveProperty("id");
  });
});
