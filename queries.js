// Basic CRUD Operations

// 1.Specific Genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })

// Advanced Queries: 

// 1. Find books that are in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. Sort books by price (ascending)
db.books.find().sort({ price: 1 })

// 4. Sort books by price (descending)
db.books.find().sort({ price: -1 })

// 5. Pagination: limit + skip (5 per page)
// Page 1
db.books.find().limit(5)
// Page 2
db.books.find().skip(5).limit(5)

// Aggregation Pipeline

// 1. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. Find the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 3. Group books by publication decade and count
db.books.aggregate([
  { $project: { decade: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: [{ $divide: ["$published_year", 10] }, 1] } ] } } },
  { $group: { _id: "$decade", totalBooks: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// Indexing

// 1. Index on title
db.books.createIndex({ title: 1 })

// 2. Compound index on author + published_year
db.books.createIndex({ author: 1, published_year: 1 })

// 3. Use explain() to check performance
db.books.find({ title: "1984" }).explain("executionStats")
