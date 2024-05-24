import {Schema, model} from 'mongoose'

const bookSchema = new Schema({
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
})
export const db_schema =  model('Book', bookSchema)
