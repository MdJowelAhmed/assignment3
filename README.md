📚 Library Management API
A Library Management System built with Express, TypeScript, and MongoDB (via Mongoose).
This API allows you to manage books, borrow books, and view borrowing summaries.

🚀 Features
Create, read, update, and delete books.

Borrow books with business logic enforcement (copies deduction, availability control).

Supports filtering and sorting books.

Aggregation pipeline to summarize borrowed books.

Schema validation and error handling.

Includes Mongoose static and instance methods.

Uses Mongoose middleware (pre, post hooks).

🧑‍💻 Technologies
Backend: Node.js, Express.js

Language: TypeScript

Database: MongoDB (with Mongoose ODM)

⚙️ Setup & Installation
Prerequisites
Node.js >= 18.x

MongoDB Atlas or local MongoDB instance

Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
Install dependencies
bash
Copy
Edit
npm install
Configure environment
Update your MongoDB connection string in a .env file:

ini
Copy
Edit
MONGO_URI=your_mongo_connection_string
PORT=5000
Build TypeScript
bash
Copy
Edit
npm run build
Start the server
bash
Copy
Edit
npm run start
Or for development with hot reload:

bash
Copy
Edit
npm run dev
🛠️ API Endpoints
📕 Book APIs
Create Book
bash
Copy
Edit
POST /api/books
Get All Books
bash
Copy
Edit
GET /api/books
Supports:

filter: Filter by genre (e.g., SCIENCE, FICTION).

sortBy: Field to sort by (e.g., createdAt).

sort: asc or desc.

limit: Number of results.

Get Book by ID
bash
Copy
Edit
GET /api/books/:bookId
Update Book
bash
Copy
Edit
PUT /api/books/:bookId
Delete Book
bash
Copy
Edit
DELETE /api/books/:bookId
📄 Borrow APIs
Borrow a Book
bash
Copy
Edit
POST /api/borrow
Business Logic:

Checks if enough copies are available.

Deducts copies, updates availability.

Borrowed Books Summary
bash
Copy
Edit
GET /api/borrow
Returns:

Book title & ISBN.

Total borrowed quantity per book.

⚡ Error Handling
All error responses follow this structure:

json
Copy
Edit
{
  "message": "Validation failed",
  "success": false,
  "error": { /* error details */ }
}
🏗️ Mongoose Features
Schema validation: Enforced for all book and borrow fields.

Static or instance methods: Used for availability control on borrow.

Middleware: Uses pre and post hooks to update book status.
