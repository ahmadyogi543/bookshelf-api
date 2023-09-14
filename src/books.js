import {nanoid} from 'nanoid';

const books = [];

export const saveBook = ({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading,
}) => {
  const id = nanoid(16);
  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  });

  return id;
};

export const getAllBooks = () => {
  return books;
};

export const getBookById = (id) => {
  const book = books.filter((book) => book.id === id)[0];
  return book;
};

export const editBookByIndex = (
  index,
  {name, year, author, summary, publisher, pageCount, readPage, reading}
) => {
  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  };
};

export const getBookIndexById = (id) => {
  return books.findIndex((book) => book.id === id);
};

export const deleteBookByIndex = (index) => {
  books.splice(index, 1);
};
