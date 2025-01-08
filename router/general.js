const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if the username already exists
  if (!isValid(username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Add the user to the array
  users.push({ username, password });
  return res.status(200).json({ message: "Customer succesfully registered. Now ypu can login." });
});







// // Function to simulate an asynchronous fetch of all books
// const getAllBooks = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(books);  // Resolves the promise with all books
//     }, 1000); // Simulate a 1-second delay
//   });
// };

// // Function to simulate an asynchronous fetch of book by ISBN
// const getBookByISBN = (isbn) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const book = Object.values(books).find(b => b.isbn === isbn);
//       if (book) {
//         resolve(book); // Resolves with the book if found
//       } else {
//         reject("Book not found"); // Reject if no book is found
//       }
//     }, 1000); // Simulate a 1-second delay
//   });
// };

// // Function to simulate an asynchronous fetch of books by author
// const getBooksByAuthor = (author) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const booksByAuthor = Object.values(books).filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
//       if (booksByAuthor.length > 0) {
//         resolve(booksByAuthor); // Resolves with books by author
//       } else {
//         reject("No books found for this author");
//       }
//     }, 1000); // Simulate a 1-second delay
//   });
// };

// // Function to simulate an asynchronous fetch of books by title
// const getBooksByTitle = (title) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const booksByTitle = Object.values(books).filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
//       if (booksByTitle.length > 0) {
//         resolve(booksByTitle); // Resolves with books by title
//       } else {
//         reject("No books found with this title");
//       }
//     }, 1000); // Simulate a 1-second delay
//   });
// };

// // Route to get all books using Async-Await
// public_users.get('/', async (req, res) => {
//   try {
//     const allBooks = await getAllBooks();  // Await the Promise to fetch all books
//     res.status(200).json({ "books": allBooks });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching books", error: error });
//   }
// });

// // Route to get book details by ISBN using Async-Await
// public_users.get('/isbn/:isbn', async (req, res) => {
//   const isbn = req.params.isbn;
//   try {
//     const book = await getBookByISBN(isbn);  // Await the Promise to fetch the book by ISBN
//     res.status(200).json(book);
//   } catch (error) {
//     res.status(404).json({ message: error });
//   }
// });

// // Route to get books by author using Async-Await
// public_users.get('/author/:author', async (req, res) => {
//   const author = req.params.author;
//   try {
//     const booksByAuthor = await getBooksByAuthor(author);  // Await the Promise to fetch books by author
//     res.status(200).json({ "booksbyauthor": booksByAuthor });
//   } catch (error) {
//     res.status(404).json({ message: error });
//   }
// });

// // Route to get books by title using Async-Await
// public_users.get('/title/:title', async (req, res) => {
//   const title = req.params.title;
//   try {
//     const booksByTitle = await getBooksByTitle(title);  // Await the Promise to fetch books by title
//     res.status(200).json({ "booksbytitle": booksByTitle });
//   } catch (error) {
//     res.status(404).json({ message: error });
//   }
// });


module.exports.general = public_users;
