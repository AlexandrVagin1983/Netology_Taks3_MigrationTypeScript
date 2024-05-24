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
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.booksRouter = express_1.default.Router();
const BookRepository_1 = require("./../models/BookRepository");
//const  = require('./../models/BookRepository').BooksRepository
exports.booksRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = BookRepository_1.container.get(BookRepository_1.BooksRepository);
    const books = yield repo.getBooks();
    res.render('books/index', {
        title: "Books",
        books: books,
    });
}));
exports.booksRouter.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги:",
        book: {},
    });
});
exports.booksRouter.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, authors, favorite, fileCover } = req.body;
    const repo = BookRepository_1.container.get(BookRepository_1.BooksRepository);
    yield repo.createBook(title, description, authors, favorite, fileCover);
    res.redirect('/book');
}));
exports.booksRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repo = BookRepository_1.container.get(BookRepository_1.BooksRepository);
    const result = yield repo.getBook(id);
    res.render("books/view", {
        title: "Книга:",
        book: result.book,
        counter: `Количество просмотров: ${+result.counter}`,
    });
}));
exports.booksRouter.get('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repo = BookRepository_1.container.get(BookRepository_1.BooksRepository);
    const result = yield repo.getBook(id);
    res.render("books/update", {
        title: "Изменение книги:",
        book: result.book,
    });
}));
exports.booksRouter.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover } = req.body;
    const repo = BookRepository_1.container.get(BookRepository_1.BooksRepository);
    repo.updateBook(id, title, description);
    res.redirect(`/book/${id}`);
}));
exports.booksRouter.post('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const repo = BookRepository_1.container.get(BookRepository_1.BooksRepository);
    yield repo.deleteBook(id);
    res.redirect(`/book`);
}));
//module.exports = router
