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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
//import logger   from './middleware/logger'
//import error404 from './middleware/err-404'
//import booksApiRouter from './routes/api/books'
const books_1 = require("./routes/books");
const index_1 = require("./routes/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './dist/views');
//app.use(logger)
app.use('/', index_1.indexRouter);
//app.use('/book/api', booksApiRouter)
app.use('/book', books_1.booksRouter);
//app.use(error404)
const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'books';
const HostDb = process.env.DB_HOST || 'mongodb://localhost:27017/';
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start procedure HostDb:${HostDb}, PasswordDB:${PasswordDB}, NameDB:${NameDB}`);
        try {
            yield mongoose_1.default.connect(HostDb, {
                user: UserDB,
                pass: PasswordDB,
                dbName: NameDB,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (e) {
            console.log(`Error1: ${e}`);
        }
    });
}
start();
