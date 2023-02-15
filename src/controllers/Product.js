export class Product {
  constructor(
    title,
    description,
    price,
    code,
    stock,
    status,
    category,
    thumbnail
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
    this.thumbnail = [thumbnail];
  }
}
