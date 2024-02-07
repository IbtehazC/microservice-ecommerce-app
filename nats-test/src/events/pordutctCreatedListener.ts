import { Message } from "node-nats-streaming";
import { Listener } from "./baseListener";
import { ProductCreatedEvent } from "./productCreatedEvent";
import { Subjects } from "./subjects";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName = "payments-service";

  onMessage(data: ProductCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
