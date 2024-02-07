import { Publisher } from "./basePublisher";
import { ProductCreatedEvent } from "./productCreatedEvent";
import { Subjects } from "./subjects";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}
