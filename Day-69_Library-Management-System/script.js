class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isIssued = false;
    this.dueDate = null;
  }

  issue(dueDate) {
    if (this.isIssued) {
      alert("Book already issued!");
      return false;
    }
    this.isIssued = true;
    this.dueDate = dueDate;
    return true;
  }

  returnBook() {
    if (!this.isIssued) {
      alert("Book is not issued!");
      return false;
    }
    this.isIssued = false;
    this.dueDate = null;
    return true;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    const exists = this.books.find((b) => b.id === book.id);
    if (exists) {
      alert("Book ID already exists!");
      return;
    }
    this.books.push(book);
    displayBooks();
  }

  findBook(id) {
    return this.books.find((book) => book.id === id);
  }
}

const library = new Library();

function clearInputs(...inputs) {
  inputs.forEach((input) => (input.value = ""));
}

function addBook() {
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const idInput = document.getElementById("bookId");

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const id = idInput.value.trim();

  if (!title || !author || !id) {
    alert("Please fill all fields!");
    return;
  }

  const book = new Book(id, title, author);
  library.addBook(book);

  clearInputs(titleInput, authorInput, idInput);
}

function issueBook() {
  const idInput = document.getElementById("issueId");
  const dateInput = document.getElementById("dueDate");

  const id = idInput.value.trim();
  const dueDate = dateInput.value;

  if (!id || !dueDate) {
    alert("Please enter Book ID and Due Date!");
    return;
  }

  const book = library.findBook(id);

  if (!book) {
    alert("Book not found!");
    return;
  }

  const success = book.issue(dueDate);
  if (success) displayBooks();

  clearInputs(idInput, dateInput);
}

function returnBook() {
  const idInput = document.getElementById("returnId");
  const id = idInput.value.trim();

  if (!id) {
    alert("Please enter Book ID!");
    return;
  }

  const book = library.findBook(id);

  if (!book) {
    alert("Book not found!");
    return;
  }

  const success = book.returnBook();
  if (success) displayBooks();

  clearInputs(idInput);
}

function displayBooks() {
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  if (library.books.length === 0) {
    list.innerHTML = `<tr><td colspan="5">No books available</td></tr>`;
    return;
  }

  library.books.forEach((book, index) => {
    const status = book.isIssued ? "Issued" : "Available";
    const due = book.dueDate ? book.dueDate : "-";

    const row = document.createElement("tr");

    row.style.opacity = "0";
    row.style.transform = "translateY(10px)";

    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${status}</td>
      <td>${due}</td>
    `;

    list.appendChild(row);

    setTimeout(() => {
      row.style.transition = "0.4s ease";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, index * 100);
  });
}