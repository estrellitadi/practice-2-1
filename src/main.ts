import './styles.css';
import { Book } from './task1-types';
import { addBook } from './task2-functions';
import { applyFilters, filterByAuthor, filterByMinYear } from './task3-filters';
import { createBookFromForm } from './task4-integration';

// Готовые данные для старта
let books: Book[] = [
  { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2023 },
  { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
];

// TODO: Студенты пишут код ниже
const bookList = 
  document.getElementById('booklist') || 
  document.getElementById('bookList') || 
  document.getElementById('catalog') || 
  document.getElementById('books');

function renderBooks(booksToRender: Book[]) {
  if (!bookList) {
    console.error('Контейнер для списка книг не найден в index.html');
    return;
  }

  bookList.innerHTML = booksToRender
    .map((book) => {
      const authors = book.authors ? book.authors.join(', ') : '';
      const year = book.year ? ` (${book.year})` : '';
      return `<div class="book-card"><strong>${book.title}</strong>${year} — ${authors}</div>`;
    })
    .join('');
}

// Отрисовать начальные книги
renderBooks(books);

// Обработчик формы
const bookForm = document.getElementById('bookForm') as HTMLFormElement;

bookForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(bookForm);
    const newBook = createBookFromForm(formData);

    books = [...books, newBook];
    renderBooks(books);
    bookForm.reset();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
});

// Обработчик фильтров
const applyFiltersBtn = document.getElementById('applyFilters');

applyFiltersBtn?.addEventListener('click', () => {
  const authorInput = document.getElementById('authorFilter') as HTMLInputElement;
  const yearInput = document.getElementById('yearFilter') as HTMLInputElement;

  const filters = [];

  if (authorInput && authorInput.value.trim() !== '') {
    filters.push(filterByAuthor(authorInput.value.trim()));
  }

  if (yearInput && yearInput.value.trim() !== '') {
    const yearValue = parseInt(yearInput.value, 10);
    if (!isNaN(yearValue)) {
      filters.push(filterByMinYear(yearValue));
    }
  }

  const filteredBooks = applyFilters(books, filters);
  renderBooks(filteredBooks);
});