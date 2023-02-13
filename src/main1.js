const e = require('express');
const express = require('express')
const app = express()
const port = 3000

const initBooksId = () => {
    let BOOKS_ID = 0;

    return () => {
        BOOKS_ID++;

        return BOOKS_ID;
    };
};

const newBookId = initBooksId();

const books = [
    {id: newBookId(), name: '50 оттенков серово', authorId: 1},
    {id: newBookId(), name: 'идеальный программист', authorId: 1},
];

const authors = [
    {id: 1, name: 'Адам Томас Моран'}
];

app.get('/books/list', (req, res) => {
    const listBooks = books.map(findedBook => {
        const bookWithAuthor = {
            ...findedBook,
            author: authors.find(el => el.id === findedBook.authorId),
        }

        return bookWithAuthor;
    })

    res.json(listBooks);
});

app.get('/books/:id', (req, res) => {
  const findedBooks = books.find(el => el.id === +req.params.id)

  if (!findedBooks) {
    res.status(404).json({
        message: "Книги не существует"
    });
    return;
  }

  const bookWithAuthor = {
    ...findedBooks,
    author: authors.find(el => el.id === findedBooks.authorId),
  }

  res.json(bookWithAuthor);
})


app.get('/ping', (req, res) => {
 res.send('pong')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})