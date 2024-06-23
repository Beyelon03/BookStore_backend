import { IBook } from '../interfaces/IBook';
import { ObjectId } from 'mongoose';

class BookDto {
  _id: ObjectId;
  title: string;
  author: string[];
  description: string;
  price: number;
  categories: string[];
  isbn: string;
  publicationDate: Date;
  publisher: string[];
  language: string;
  format: string;
  pageCount: number;
  type: string;
  ageRating: string;
  averageRating: number;
  addedAt: Date;
  coverImage: string;
  stock: number;
  seller: ObjectId[];
  rating: 1 | 2 | 3 | 4 | 5;

  constructor(model: IBook) {
    this._id = model._id;
    this.title = model.title;
    this.author = model.author;
    this.description = model.description;
    this.price = model.price;
    this.categories = model.categories;
    this.isbn = model.isbn;
    this.publicationDate = model.publicationDate;
    this.publisher = model.publisher;
    this.language = model.language;
    this.format = model.format;
    this.pageCount = model.pageCount;
    this.type = model.type;
    this.ageRating = model.ageRating;
    this.averageRating = model.averageRating;
    this.addedAt = model.addedAt;
    this.coverImage = model.coverImage;
    this.stock = model.stock;
    this.seller = model.seller?.map((id: ObjectId) => id);
    this.rating = model.rating;
  }

  static fromArray(models: IBook[]): BookDto[] {
    return models.map((model) => new BookDto(model));
  }
}

export default BookDto;
