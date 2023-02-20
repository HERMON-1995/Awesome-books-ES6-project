/* eslint-disable max-classes-per-file */
import Book from './modules/book_class.js';
import UI from './modules/ui_class.js';
import Store from './modules/store_class.js';
import { DateTime } from './modules/luxon.js';

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const id = Date.now();

  // Instatiate book
  const book = new Book(title, author, id);

  // Add Book to UI
  UI.addBookToList(book);

  // Add book to store
  Store.addBook(book);

  // Clear fields
  UI.clearFields();
});

// Event: Remove a Book from UI
document.querySelector('.table-body').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  // Remove book from the local storage
  /* eslint-disable max-len */
  Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});

// Date and time
const dateNow = document.querySelector('.date');

const date = DateTime.local();
const newDate = date.toLocaleString({
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const newTime = date.toLocaleString(DateTime.TIME_WITH_SECONDS);
dateNow.innerHTML = `
    <p>${newDate} &nbsp ${newTime}</p>
  `;

// Complete website
const list = document.querySelector('.list');
const addNew = document.querySelector('.add-new');
const contact = document.querySelector('.contact');

const allBooks = document.getElementById('all-books');
const addBook = document.getElementById('add-book');
const contactCont = document.getElementById('contact-cont');

// Display and hide sections
list.addEventListener('click', () => {
  list.style.color = 'brown';
  addNew.style.color = 'black';
  contact.style.color = 'black';

  allBooks.style.display = 'flex';
  addBook.style.display = 'none';
  contactCont.style.display = 'none';
});

addNew.addEventListener('click', () => {
  list.style.color = 'black';
  addNew.style.color = 'brown';
  contact.style.color = 'black';

  allBooks.style.display = 'none';
  addBook.style.display = 'flex';
  contactCont.style.display = 'none';
});

contact.addEventListener('click', () => {
  list.style.color = 'black';
  addNew.style.color = 'black';
  contact.style.color = 'brown';

  allBooks.style.display = 'none';
  addBook.style.display = 'none';
  contactCont.style.display = 'flex';
});