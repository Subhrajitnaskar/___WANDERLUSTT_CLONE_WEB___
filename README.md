# 🌍 WanderLust - Full Stack Travel Listing Platform

A modern **Airbnb-inspired travel listing web application** built using the **MERN backend stack (MongoDB, Express.js, Node.js)** with **EJS** as the templating engine.

Users can browse travel destinations, create their own listings, upload images, write reviews, search by country, and securely authenticate using Passport.js.

> 🔗 **Live Demo:** https://wanderlustt-clone-web.onrender.com/listings

---

# 📸 Preview

## Home Page
- Browse all travel listings
- Search listings by country
- Responsive UI
- Category filters
- Authentication support

---

# ✨ Features

## 👤 Authentication

- User Signup
- User Login
- User Logout
- Password Hashing
- Session Authentication
- Flash Messages
- Protected Routes

---

## 🏡 Listing Management

- Create Listing
- Read Listing
- Update Listing
- Delete Listing
- Upload Listing Image
- Owner Authorization
- Responsive Cards

---

## ⭐ Reviews

- Add Review
- Rating System
- Delete Review
- Review Authorization

---

## 🔍 Search

Search listings using country name.

Example

```
India
France
Japan
Canada
```

Search is implemented using MongoDB Regular Expression.

```js
country: {
    $regex: country,
    $options: "i"
}
```

---

## 📱 Responsive Design

Fully responsive for

- Mobile
- Tablet
- Laptop
- Desktop

Built using

- Bootstrap 5
- Flexbox
- Media Queries

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS
- Font Awesome

---

## Backend

- Node.js
- Express.js

---

## Database

MongoDB Atlas

---

## Authentication

Passport.js

Passport Local Strategy

Passport Local Mongoose

---

## Image Storage

Cloudinary

Multer

Multer Storage Cloudinary

---

## Session Storage

Express Session

Connect Mongo

---

## Validation

Joi

---

## Flash Messages

Connect Flash

---

## Template Engine

EJS

EJS Mate

---

# 📂 Project Structure

```
WanderLust
│
├── controllers/
│     listing.js
│     review.js
│     user.js
│
├── models/
│     listing.js
│     review.js
│     user.js
│
├── routes/
│     listing.js
│     review.js
│     user.js
│
├── middleware.js
│
├── utils/
│     ExpressError.js
│     wrapAsync.js
│
├── cloudConfig.js
│
├── public/
│     css/
│     js/
│
├── uploads/
│
├── views/
│     layouts/
│     includes/
│     listings/
│     users/
│
├── schema.js
│
├── app.js
│
├── package.json
│
└── README.md
```

---

# 📚 MVC Architecture

This project follows the **MVC (Model View Controller)** Architecture.

## Models

Responsible for database schema.

```
Listing
Review
User
```

---

## Views

Responsible for UI.

```
EJS Templates
Bootstrap
CSS
```

---

## Controllers

Responsible for business logic.

Example

```
Create Listing

Delete Listing

Update Listing

Search Listing

Authentication

Reviews
```

---

## Routes

Responsible for API routing.

```
Listing Routes

Review Routes

User Routes
```

---

# 🧠 Concepts Used

## Express.js

- Routing
- Middleware
- Error Handling
- Static Files
- Template Engine

---

## MongoDB

- CRUD Operations
- Populate
- References
- ObjectId
- Collections

---

## Mongoose

- Schema
- Model
- Validation
- Relationships

---

## Authentication

Passport.js

```
Login

Logout

Sessions

Authentication

Authorization
```

---

## Authorization

Only Owner can

- Edit Listing
- Delete Listing

Only Logged In Users can

- Create Listing
- Add Reviews

---

## Session Management

Using

```
express-session
connect-mongo
```

Session stored inside MongoDB Atlas.

---

## Password Security

Passwords are hashed using

```
passport-local-mongoose
```

No password is stored in plain text.

---

## Image Upload

Workflow

```
User

↓

Multer

↓

Cloudinary

↓

MongoDB stores URL
```

---

## Flash Messages

```
Success Message

Error Message
```

Using

```
connect-flash
```

---

## Method Override

Allows HTML Forms to use

```
PUT

DELETE
```

Although HTML supports only

```
GET

POST
```

---

## Custom Error Handling

Custom

```
ExpressError
```

Global Error Middleware

404 Page

500 Page

---

## Async Error Handling

Using

```
wrapAsync()
```

Avoids repetitive try-catch blocks.

---

## Environment Variables

Sensitive data stored in

```
.env
```

Example

```
MongoDB URL

Cloudinary Keys

Session Secret
```

---

# 📦 NPM Packages Used

```
express
mongoose
ejs
ejs-mate
dotenv
method-override
passport
passport-local
passport-local-mongoose
express-session
connect-mongo
connect-flash
multer
cloudinary
multer-storage-cloudinary
joi
cookie-parser
```

---

# 🔄 CRUD Operations

## Create

Create Listing

Create Review

Create User

---

## Read

View Listings

View Reviews

View User

---

## Update

Edit Listing

---

## Delete

Delete Listing

Delete Review

---

# 🔐 Security Features

- Authentication
- Authorization
- Session Storage
- Password Hashing
- Protected Routes
- Input Validation
- Environment Variables

---

# 🌐 Deployment

Frontend + Backend

**Render**

Database

**MongoDB Atlas**

Images

**Cloudinary**

---

# 🚀 Installation

Clone Repository

```bash
git clone https://github.com/YourUsername/YourRepository.git
```

Install Packages

```bash
npm install
```

Create `.env`

```env
ATLASDB_URL=

CLOUD_NAME=

CLOUD_API_KEY=

CLOUD_API_SECRET=

SECRET=
```

Run

```bash
npm start
```

or

```bash
nodemon app.js
```

Open

```
http://localhost:8080/listings
```

---

# 📖 Learning Outcomes

During this project, I learned

- MVC Architecture
- RESTful Routing
- Express.js
- MongoDB & Mongoose
- CRUD Operations
- Passport Authentication
- Authorization
- Cloudinary Image Upload
- Multer
- Sessions
- Flash Messages
- Error Handling
- Environment Variables
- Deployment on Render
- MongoDB Atlas
- Responsive Web Design
- Bootstrap
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Subhrajit Naskar**

Computer Science & Engineering Student

Jadavpur University

GitHub: https://github.com/Subhrajitnaskar

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

It motivates me to build more Full Stack projects.
