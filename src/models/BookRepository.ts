import { db_schema } from './../models/db_connection'
import inversify from "inversify"
import "reflect-metadata"

const PORT_REIDS = process.env.PORT_REIDS || 3002

export class BooksRepository {
  
    //Получает из базы данных список всех книг:
    async getBooks() {
        const books = await db_schema.find()
        //Перенесем список книг в массив который ожидает api counter
        const mBooks = []
        for (let book of books) {
            mBooks.push({id: book._id})
        }

        //Получим просмотры для для каждой книги:
        const url = `http://counter:${PORT_REIDS}/counters`    
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(mBooks)
            })
            let counter = 0
            if (response.ok) {
                const responce  = await response.json()
                //Полученные просмотры находятся в массиве responce.mBooksCounters, перенесем их в массив book:
                for (let bookId of responce.mBooksCounters) {
                    let curBook = books.find((item: any) => item._id == bookId.id)
                    curBook.counter = `Просмотры: ${ +bookId.counter }`
                }
                
            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
        }
        catch {
            let counter = 0
        }
        return books
    }
    
    //Добавлет в базу данных новую книгу:
    async createBook(title:string, description:string, authors:string, favorite:string, fileCover:string) {
        const book = new db_schema({
            title, description, authors, favorite, fileCover
        })
        try {
            await book.save();
        } catch (e) {
            console.error(e);
        }
    }
    //Получает книгу из базы данных по айди:
    async getBook(id:string) {
        let book
        //Получим объект книги:
        try {
            book = await db_schema.findById(id)
        } catch (e) {
            console.error(e)
        }    
        //Получим количество просмотров текущей кники
        const url = `http://counter:${PORT_REIDS}/counter/${id}`
        let counter = 0
        try {        
            let response = await fetch(url, {
                method: 'POST'
            })
            if (response.ok) {
                const responcejson  = await response.json()
                counter = responcejson.counter
            } else {
                console.log("Ошибка HTTP: " + response.status);
            }
        }
        catch (e) {     
            console.error(e)
        }
        return {'book': book, 'counter': counter }
    }
    
    //обновляет книгу в базе данных
    async updateBook(id:string, title:string, description:string) {
        
        try {
            await db_schema.findByIdAndUpdate(id, {title, description});
        } catch (e) {
            console.error(e);
        }
    
    }
    //удаляет книгу в базе данных:
    async deleteBook(id:string) {
        
        try {
            await db_schema.deleteOne({_id: id});
        } catch (e) {
            console.error(e);
        }
    }
}

inversify.decorate(inversify.injectable(), BooksRepository)
export const container = new inversify.Container();
container.bind(BooksRepository).toSelf()