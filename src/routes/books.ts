import express from 'express'
export const booksRouter  =  express.Router()
//import fileMulter from './../middleware/file'
import http from 'http'
import { error } from 'console'
import { container, BooksRepository}  from './../models/BookRepository'
//const  = require('./../models/BookRepository').BooksRepository

booksRouter.get('/', async (req, res) => {    

    const repo = container.get(BooksRepository);
    const books = await repo.getBooks()
    res.render('books/index',{
        title: "Books",
        books: books,})   
})

booksRouter.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги:",
        book: {},
    })
})

booksRouter.post('/create', async (req, res) => {

    const {title, description, authors, favorite, fileCover} = req.body
    const repo = container.get(BooksRepository);
    await repo.createBook(title, description, authors, favorite, fileCover)
    res.redirect('/book')
})

booksRouter.get('/:id', async (req, res) => {    

    const {id} = req.params
    const repo = container.get(BooksRepository);
    const result = await repo.getBook(id)
    res.render("books/view", {
        title: "Книга:",
        book: result.book,
        counter: `Количество просмотров: ${+result.counter}`,
    })
})

booksRouter.get('/update/:id', async (req, res) => {

    const {id} = req.params
    const repo = container.get(BooksRepository);
    const result = await repo.getBook(id)
    res.render("books/update", {
        title: "Изменение книги:",
        book: result.book,
    })
})

booksRouter.post('/update/:id', async (req, res) => {

    const {id} = req.params
    const {title, description, authors, favorite, fileCover} = req.body;
    const repo = container.get(BooksRepository)
    repo.updateBook(id, title, description)
    res.redirect(`/book/${id}`);
})

booksRouter.post('/delete/:id', async (req, res) => {

    const {id} = req.params
    const repo = container.get(BooksRepository)
    await repo.deleteBook(id)
    res.redirect(`/book`)
})

//module.exports = router