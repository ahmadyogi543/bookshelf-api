import {
  deleteBookByIndex,
  editBookByIndex,
  getAllBooks,
  getBookById,
  getBookIndexById,
  saveBook,
} from './books.js';

export const saveBookHandler = (req, h) => {
  const {name, pageCount, readPage} = req.payload;

  if (!name) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    resp.code(400);
    return resp;
  }

  if (readPage > pageCount) {
    const resp = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    resp.code(400);
    return resp;
  }

  const bookId = saveBook(req.payload);
  const resp = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId,
    },
  });
  resp.code(201);
  return resp;
};

export const getAllBooksHandler = (req, h) => {
  const {name, reading, finished} = req.query;

  let books = getAllBooks();
  if (name) {
    books = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading === '1') {
    books = books.filter((book) => book.reading === true);
  } else if (reading === '0') {
    books = books.filter((book) => book.reading === false);
  }

  if (finished === '1') {
    books = books.filter((book) => book.finished === true);
  } else if (finished === '0') {
    books = books.filter((book) => book.finished === false);
  }

  const resp = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  return resp;
};

export const getBookByIdHandler = (req, h) => {
  const {id} = req.params;
  const book = getBookById(id);

  if (!book) {
    const resp = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    resp.code(404);
    return resp;
  }

  const resp = h.response({
    status: 'success',
    data: {
      book,
    },
  });
  return resp;
};

export const editBookByIdHandler = (req, h) => {
  const {id} = req.params;

  const index = getBookIndexById(id);
  if (index === -1) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    resp.code(404);
    return resp;
  }

  const {name, pageCount, readPage} = req.payload;
  if (!name) {
    const resp = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    resp.code(400);
    return resp;
  }

  if (readPage > pageCount) {
    const resp = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    resp.code(400);
    return resp;
  }

  editBookByIndex(index, req.payload);
  const resp = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  return resp;
};

export const deleteBookByIdHandler = (req, h) => {
  const {id} = req.params;

  const index = getBookIndexById(id);
  if (index === -1) {
    const resp = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    resp.code(404);
    return resp;
  }

  deleteBookByIndex(index);
  const resp = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });
  return resp;
};
