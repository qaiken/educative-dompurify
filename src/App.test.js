const request = require("supertest");
const app = require("./App");

describe("POST /users", () => {
  test("creates a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Quinton" });

    console.log({ body: response.body });
    expect(response.body.userCreated).toBe(true);
  });

  test("handles empty request bodies", async () => {
    const response = await request(app).post("/users").send({});

    console.log({ body: response.body });
    expect(response.body.userCreated).toBe(false);
  });

  test("handles user names that are too long", async () => {
    const response = await request(app).post("/users").send({
      name: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
    });

    console.log({ body: response.body });
    expect(response.body.error).toBe("user name is too long!");
    expect(response.body.userCreated).toBe(false);
  });
});
