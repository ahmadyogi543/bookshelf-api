import {
  deleteBookByIdHandler,
  editBookByIdHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  saveBookHandler,
} from './handlers.js';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: saveBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

export default routes;
