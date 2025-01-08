const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  return !users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  const user = users.find(user => user.username === username && user.password === password);
  return user;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (authenticatedUser(username, password)) {
    const token = jwt.sign({ username }, "fingerprint_customer", { expiresIn: "1h" });
    return res.status(200).json({
      message: "Customer Login successful",
      token: token
    });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const { review } = req.body;

  if (!review) {
    return res.status(400).json({ message: "Review content is required" });
  }

  // Assuming req.user contains the username from the JWT middleware
  const username = req.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Check if the book exists
  const book = Object.values(books).find(b => b.isbn === isbn);
  if (book) {
    // Add or modify the review for the book by the logged-in user
    book.reviews[username] = review;

    return res.status(200).json({ message: "Review added/updated successfully", book: book });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
  // return res.status(300).json({message: "Yet to be implemented"});
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  // Assuming the review is in the body of the request
  const username = req.user?.username;

  if (!username) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  // Find the book by ISBN
  const book = Object.values(books).find(b => b.isbn === isbn);

  if (book) {
    // Check if the review exists for the user
    if (book.reviews[username]) {
      // Delete the review for the user
      delete book.reviews[username];

      return res.status(200).json({ message: "Review deleted successfully", book: book });
    } else {
      return res.status(404).json({ message: "Review not found for the user" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
