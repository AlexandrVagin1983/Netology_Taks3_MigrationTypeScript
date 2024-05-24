"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.BooksRepository = void 0;
const db_connection_1 = require("./../models/db_connection");
const inversify_1 = __importDefault(require("inversify"));
require("reflect-metadata");
const PORT_REIDS = process.env.PORT_REIDS || 3002;
class BooksRepository {
    //Получает из базы данных список всех книг:
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield db_connection_1.db_schema.find();
            //Перенесем список книг в массив который ожидает api counter
            const mBooks = [];
            for (let book of books) {
                mBooks.push({ id: book._id });
            }
            //Получим просмотры для для каждой книги:
            const url = `http://counter:${PORT_REIDS}/counters`;
            try {
                let response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(mBooks)
                });
                let counter = 0;
                if (response.ok) {
                    const responce = yield response.json();
                    //Полученные просмотры находятся в массиве responce.mBooksCounters, перенесем их в массив book:
                    for (let bookId of responce.mBooksCounters) {
                        let curBook = books.find((item) => item._id == bookId.id);
                        curBook.counter = `Просмотры: ${+bookId.counter}`;
                    }
                }
                else {
                    console.log("Ошибка HTTP: " + response.status);
                }
            }
            catch (_a) {
                let counter = 0;
            }
            return books;
        });
    }
    //Добавлет в базу данных новую книгу:
    createBook(title, description, authors, favorite, fileCover) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = new db_connection_1.db_schema({
                title, description, authors, favorite, fileCover
            });
            try {
                yield book.save();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    //Получает книгу из базы данных по айди:
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let book;
            //Получим объект книги:
            try {
                book = yield db_connection_1.db_schema.findById(id);
            }
            catch (e) {
                console.error(e);
            }
            //Получим количество просмотров текущей кники
            const url = `http://counter:${PORT_REIDS}/counter/${id}`;
            let counter = 0;
            try {
                let response = yield fetch(url, {
                    method: 'POST'
                });
                if (response.ok) {
                    const responcejson = yield response.json();
                    counter = responcejson.counter;
                }
                else {
                    console.log("Ошибка HTTP: " + response.status);
                }
            }
            catch (e) {
                console.error(e);
            }
            return { 'book': book, 'counter': counter };
        });
    }
    //обновляет книгу в базе данных
    updateBook(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_connection_1.db_schema.findByIdAndUpdate(id, { title, description });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    //удаляет книгу в базе данных:
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_connection_1.db_schema.deleteOne({ _id: id });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.BooksRepository = BooksRepository;
inversify_1.decorate(inversify_1.injectable(), BooksRepository);
exports.container = new inversify_1.Container();
exports.container.bind(BooksRepository).toSelf();
