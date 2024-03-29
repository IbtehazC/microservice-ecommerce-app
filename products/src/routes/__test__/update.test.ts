import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "aslkdfj",
      price: 20,
      description: "description",
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/products/${id}`)
    .send({
      title: "aslkdfj",
      price: 20,
      description: "description",
    })
    .expect(401);
});

it("returns a 401 if the user does not own the product F", async () => {
  const response = await request(app)
    .post("/api/products")
    .set("Cookie", global.signin())
    .send({
      title: "asldkfj",
      price: 20,
      description: "desc",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "alskdjflskjdf",
      price: 1000,
      description: "desc",
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({
      title: "asldkfj",
      price: 20,
      description: "desc",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
      description: "asd",
    })
    .expect(400);

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "alskdfjj",
      price: -10,
      description: "asd",
    })
    .expect(400);
});

it("updates the product F provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/products")
    .set("Cookie", cookie)
    .send({
      title: "asldkfj",
      price: 20,
      description: "desc",
    });

  await request(app)
    .put(`/api/products/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 100,
      description: "asd",
    })
    .expect(200);

  const productResponse = await request(app)
    .get(`/api/products/${response.body.id}`)
    .send();

  expect(productResponse.body.title).toEqual("new title");
  expect(productResponse.body.price).toEqual(100);
  expect(productResponse.body.description).toEqual("desc");
});
