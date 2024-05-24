"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_schema = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    authors: {
        type: String,
        default: "",
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    fileCover: {
        type: String,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    },
    counter: {
        type: String,
        default: "",
    },
});
exports.db_schema = (0, mongoose_1.model)('Book', bookSchema);
