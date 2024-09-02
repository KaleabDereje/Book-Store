import Book from "../models/books.model.js";


export const createBook = async (req, res) => {

    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(404).send({ message: 'Sendall required fields; title, author, publishYear' });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(200).send(book);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export const getBooks = async (req, res) => {

    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export const getBook = async (req, res) => {

    try {
        const { id } = req.params;

        const singleBook = await Book.findById(id);

        return res.status(200).json(singleBook);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export const updateBook = async (req, res) => {

    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: 'send all required fields: title, author, publishYear' });
        }

        const { id } = req.params;

        const updateBook = await Book.findByIdAndUpdate(id, req.body);

        if (!updateBook) {
            return res.status(404).json({ message: 'The book does not exist. Check the Id.' });
        }

        return res.status(200).send({ message: 'Book updated successfully!' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}


export const deleteBook = async (req, res) => {

    try {
        const { id } = req.params;

        const del = await Book.findByIdAndDelete(id);

        if (!del) {
            return res.status(200).json({ message: 'The book not found. Check the Id' });
        }

        return res.status(404).send({ message: 'The book deleted successfully.' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}