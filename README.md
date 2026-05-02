<p align="center">
  <img src="Client/Public/Logo-Recipe-Book.png" alt="RecipeBook logo" width="96" height="96">
</p>

<h1 align="center">The Recipe Book</h1>

<p align="center">
  A modern recipe dashboard with secure authentication, smart meal planning, favorites, search filters, pantry matching, and kitchen notes.
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white">
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-ISC-blue">
</p>

## Overview

The Recipe Book is a full-stack Express application for browsing and managing recipes in a polished dashboard experience. It includes registration and login, bcrypt password hashing, HTTP-only cookie sessions, MongoDB persistence when configured, and in-memory demo mode for quick local testing.

## Features

- Secure registration and login with bcrypt password hashing
- HTTP-only session cookie authentication
- Professional recipe dashboard UI
- Recipe search, category filtering, and empty states
- Saved favorites using browser storage
- Surprise recipe button
- Meal planner with shuffle action
- Pantry match suggestions based on selected ingredients
- Kitchen notes stored locally in the browser
- Dark mode toggle
- MongoDB support with local demo fallback

## Tech Stack

- Backend: Node.js, Express.js, EJS rendering
- Database: MongoDB with Mongoose
- Authentication: bcrypt, signed server-side session tokens
- Frontend: HTML, CSS, JavaScript
- Assets: Local recipe images and SVG icons

## Project Structure

```text
recipebook/
├── Client/
│   ├── Public/          # Images and icons
│   ├── Stylesheet/      # Page and dashboard styles
│   ├── html/            # EJS-rendered HTML views and recipe pages
│   └── js/              # Client-side interactions
├── src/
│   ├── config/          # Database and environment loading
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Page and auth routes
│   └── services/        # Session and user services
├── .env.example
├── package.json
├── README.md
└── server.js
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Add your MongoDB connection string in `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/recipebook
PORT=5000
NODE_ENV=development
```

4. Start the application:

```bash
npm start
```

5. Open the app:

```text
http://localhost:5000
```

## Development

Run with auto-reload:

```bash
npm run dev
```

If `MONGODB_URI` is missing or unavailable, the app automatically runs with in-memory demo accounts so the UI can still be tested locally.

## Security Notes

- Do not commit `.env` or real database credentials.
- Passwords are stored as bcrypt hashes.
- Sessions are stored server-side and referenced by HTTP-only cookies.
- Set `NODE_ENV=production` when deploying behind HTTPS so secure cookie behavior is enabled.

## Author

Mohd Adnan
