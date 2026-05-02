# RecipeBook

RecipeBook is an Express and MongoDB recipe dashboard with secure registration, login, saved favorites, search filters, meal planning, and kitchen notes.

## Project Structure

- `server.js` starts the app.
- `src/config` contains database configuration.
- `src/middleware` contains request middleware.
- `src/models` contains Mongoose models.
- `src/routes` contains page and authentication routes.
- `src/services` contains auth, session, and user persistence logic.
- `Client/html`, `Client/Stylesheet`, `Client/js`, and `Client/Public` contain the frontend.

## Getting Started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`.
3. Run `npm start`.
4. Open `http://localhost:5000`.

If `MONGODB_URI` is not set or MongoDB is unavailable, the app uses in-memory demo accounts for local testing.
