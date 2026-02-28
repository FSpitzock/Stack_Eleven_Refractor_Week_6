# Stack Eleven Capstone — REST to GraphQL Refactor

Refactor of the original Stack Eleven REST full‑stack Q&A application into a **GraphQL API using Apollo Server + React + Apollo Client**.  
This project replaces the traditional REST endpoints with a GraphQL server and updates the frontend to use Apollo Client for data fetching and mutations.

## 🧠 Overview

This full‑stack application allows users to:
- Register & log in with authentication
- View a list of questions
- View question details and answers
- Post questions and answers (authenticated)

The backend uses **Apollo Server + Express + Mongoose + JWT authentication**.  
The frontend uses **React + Vite + Apollo Client** to query and mutate data.

---

## 🚀 Features

### Backend (GraphQL)

✔ Apollo Server exposing GraphQL endpoint  
✔ Queries:
- `questions`: fetch all questions
- `question(id: ID!)`: fetch a single question
- `me`: fetch current authenticated profile

✔ Mutations:
- `register(username, email, password)`
- `login(email, password)`
- `createQuestion(title, body)`
- `createAnswer(questionId, body)`

✔ JWT‑based authentication  
✔ Mongoose models for User, Question, and Answer

---

## 🧩 Folder Structure

.
├── backend
│ ├── src
│ │ ├── graphql
│ │ │ ├── schema.js
│ │ │ └── resolvers.js
│ │ ├── models
│ │ │ ├── User.js
│ │ │ └── Question.js
│ │ ├── server.js
│ │ └── .env
├── frontend
│ ├── src
│ │ ├── graphql
│ │ │ ├── queries.js
│ │ │ └── mutations.js
│ │ ├── components
│ │ │ ├── LoginForm.jsx
│ │ │ ├── QuestionsList.jsx
│ │ │ ├── CreateQuestionForm.jsx
│ │ │ └── QuestionDetail.jsx
│ │ ├── lib
│ │ │ └── apollo.js
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.html
├── package.json
└── README.md



---

## 🔧 Installation & Setup

### 🛠 Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Install dependencies:
    npm install
3. Create a .env file (based on .env.example):
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
4. Start the backend server:
    npm run dev
Your GraphQL endpoint will be available at:
🚀 http://localhost:4000/graphql


### 🚀 Frontend

1. Navigate to the frontend folder:
    cd frontend

2. Install dependencies:
    npm install

3. Start the frontend:
    npm run dev

Open your browser to:
🌐 http://localhost:5173


### 🧪 Usage
Auth with GraphQL

- Use the register mutation to create a new user.

- Use the login mutation to obtain a JWT token.

- Store the token in localStorage (handled by the Apollo Client setup).

- The token is sent in the Authorization header for authenticated mutations.

query GetQuestions {
  questions {
    id
    title
    body
    author {
      username
      email
    }
    createdAt
  }
}

### 📦 GraphQL API Reference
Queries

- questions: Returns list of all questions
- question(id: ID!): Returns one question by ID
- me: Returns current user from JWT

Mutations

- register: Creates a new account and returns a token
- login: Authenticates and returns a token
- createQuestion: Creates a question (authenticated)
- createAnswer: Adds an answer on a question (authenticated)


📦 Frontend GraphQL Hooks

Your UI queries and mutations live in:

/src/graphql/queries.js  
/src/graphql/mutations.js

Use Apollo Client hooks like useQuery and useMutation to fetch and mutate data in components.