import request from "supertest";
import { app } from "../../app";
import { Product } from "../../models/product";

it("has a route handler listening to /api/products for post requests", async () => {
  const response = await request(app).post("/api/products").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/products").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({
      title: "product 1",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({
      title: "laskdfj",
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let products = await Product.find({});
  expect(products.length).toEqual(0);

  const title = "product 1";
  const description = "description 1";

  await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({
      title,
      description,
      price: 20,
    })
    .expect(201);

  products = await Product.find({});
  expect(products.length).toEqual(1);
  expect(products[0].price).toEqual(20);
  expect(products[0].title).toEqual(title);
  expect(products[0].title).toEqual(description);
});
