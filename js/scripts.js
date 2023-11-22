const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    let info = `${title}, ${author}, ${pages}, ${read}`;
    return info;
  }
  this.toggleReadStatus = function() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const table = document.getElementById('bookTable');

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  myLibrary.forEach((book, index) => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);  // New cell for the actions
    const cell6 = row.insertCell(5);

    cell1.textContent = book.title;
    cell2.textContent = book.author;
    cell3.textContent = book.pages;
    cell4.textContent = book.read ? 'Yes' : 'No';

    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = 'Toggle Read';
    toggleReadButton.setAttribute('data-index', index);
    toggleReadButton.addEventListener('click', toggleReadStatus);
    cell5.appendChild(toggleReadButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Book'
    removeButton.setAttribute('data-index', index);
    removeButton.addEventListener('click', removeBook);
    cell6.appendChild(removeButton);
  });
}

function removeBook(event) {
const indexToRemove = event.target.getAttribute('data-index');
myLibrary.splice(indexToRemove, 1);
displayBooks();
}

function toggleReadStatus(event) {
  const indexToToggle = event.target.getAttribute('data-index');
  myLibrary[indexToToggle].toggleReadStatus();
  displayBooks();
}

function openForm() {
  document.getElementById('myModal').style.display = 'block';
}

function closeForm() {
  document.getElementById('myModal').style.display = 'none';
}

function submitForm() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  closeForm();
}

// Example usage:
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 300, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, true);

// Display books on page load
displayBooks();