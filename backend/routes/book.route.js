import express from "express";

import {createBook, getBooks, getBook, deleteBook, updateBook} from "../controllers/book.controller.js";

const router = express.Router();


//Route to save a new book resource
router.post('/', createBook);    


//Route to GET All Books = require (D)B
router.get('/', getBooks);


//Route to GET a single book = require (DB) 
router.get('/:id', getBook);


//Route to update existing book's data in DB
router.put('/:id', updateBook);


//Route to delete a book = require (a D)B
router.delete('/:id', deleteBook);


export default router;