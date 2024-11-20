
# Note Management App

A full-stack application built using **React**, **Express**, and **MongoDB** that allows users to create, view, edit, delete, and search notes. The app also includes authentication, and notes are saved in **MongoDB**. The notes are sorted by their last modified date.

---

## Features

- **Authentication**: Secure user registration and login system.
- **CRUD Operations**: Users can **Create**, **Read**, **Update**, and **Delete** their notes.
- **Search**: Search notes by title or content.
- **Sort by Date**: Automatically sort notes by the most recent update.
- **Responsive Design**: Built with **React** and **Bootstrap**, ensuring a smooth experience on various devices.
- **Secure**: Notes are stored in **MongoDB**, and only authenticated users can access their notes.

---

## Tech Stack

- **Frontend**: React, React Router, Bootstrap,react-icons
- **Backend**: Express.js,Node.js,dotenv
- **Database**: MongoDB (using Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

---

## Installation

### Prerequisites

Before starting, make sure you have **Node.js** and **MongoDB** installed.

1. Clone this repository:
   ```bash
   git clone https://github.com/samir9187/Todo-Assignment.git
   cd Todo-Assignment
   ```

2. Install dependencies for both **frontend** and **backend**.

   - **Frontend (React)**:
     ```bash
     cd todo-app
     npm install
     ```

   - **Backend (Express)**:
     ```bash
     cd server
     npm install
     ```

---

## Backend Setup

1. Go to the `server` directory.

2. Create a `.env` file and add the following variables:

   ```
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   PORT = 5000
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

   The server should be running at `http://localhost:5000`.

---

## Frontend Setup

1. Go to the `todo-app` directory.

2. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend should be running at `http://localhost:5173`.

---

## API Routes

### Authentication Routes

- **POST /register**: Register a new user.  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  
- **POST /login**: Login and receive a JWT token.  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### Notes Routes (Protected)

- **POST /notes**: Create a new note.  
  **Request Body**:
  ```json
  {
    "title": "Note Title",
    "content": "Note content goes here"
  }
  ```
  **Response**:
  ```json
  {
    "title": "Note Title",
    "content": "Note content goes here",
    "createdAt": "2024-11-19T00:00:00Z",
    "updatedAt": "2024-11-19T00:00:00Z"
  }
  ```

- **GET /notes**: Get all notes for the authenticated user.  
  **Response**:
  ```json
  [
    {
      "title": "Note Title",
      "content": "Note content goes here",
      "createdAt": "2024-11-19T00:00:00Z",
      "updatedAt": "2024-11-19T00:00:00Z"
    }
  ]
  ```

- **GET /notes/:id**: Get a single note by ID.  
  **Response**:
  ```json
  {
    "title": "Note Title",
    "content": "Note content goes here",
    "createdAt": "2024-11-19T00:00:00Z",
    "updatedAt": "2024-11-19T00:00:00Z"
  }
  ```

- **PUT /notes/:id**: Update a note by ID.  
  **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```

- **DELETE /notes/:id**: Delete a note by ID.  
  **Response**:
  ```json
  {
    "message": "Note deleted successfully"
  }
  ```

---

## Frontend Features

### Notes Management

- **Add Note**: Create a new note with title and content.
- **View Notes**: Display a list of notes with title and a content preview.
- **Edit Note**: Modify the title and content of an existing note.
- **Delete Note**: Remove a note from the list.
  
### Additional Features

- **Search**: Filter notes by title or content.
- **Sort by Date**: Automatically sort notes based on the last modified date.
  
### Authentication

- **Login**: Users can log in with their email and password.
- **Registration**: Users can create an account by providing email and password.
- **Logout**: Users can log out to end the session.

---


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Note:
Make sure to replace `your_jwt_secret_key` and `your_mongodb_connection_string` with your actual credentials for JWT and MongoDB connection.

