# Equipment Tracker

A simple web application to manage a list of equipment, built with React, Node.js, Express, and PostgreSQL.

## Features

- **View Equipment**: Display a list of all equipment in a table format.
- **Add Equipment**: Form to add new equipment details (Name, Type, Status, Last Cleaned Date).
- **Edit Equipment**: Update existing equipment details.
- **Delete Equipment**: Remove equipment from the list.

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL installed and running
- `git` (optional, for cloning)

## Setup Instructions

### 1. Database Setup

1. Open your terminal.
2. Log in to PostgreSQL (or use a GUI tool like pgAdmin/DBeaver):
   ```bash
   psql -U postgres
   ```
3. Create the database:
   ```sql
   CREATE DATABASE db;
   ```
4. Connect to the database:
   ```sql
   \c db
   ```
5. Create the `equipment` table:
   ```sql
   CREATE TABLE equipment (
       id SERIAL PRIMARY KEY,
       name TEXT NOT NULL,
       type TEXT NOT NULL,
       status TEXT NOT NULL,
       last_cleaned_date DATE
   );
   ```

### 2. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update database configuration in `server/config/db.js` if your PostgreSQL credentials differ from the defaults (user: `postgres`, password: `harpreet`).
4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

### 3. Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or similar).

## API Endpoints

- `GET /api/equipment`: Get all equipment.
- `GET /api/equipment/:id`: Get specific equipment by ID.
- `POST /api/equipment`: Create new equipment.
- `PUT /api/equipment/:id`: Update existing equipment.
- `DELETE /api/equipment/:id`: Delete equipment.

## Assumptions

- The database runs locally on port 5432.
- Date format is handled as `YYYY-MM-DD`.
- Basic validation is handled on the client side via HTML5 form attributes.

## Future Improvements

- Add server-side validation.
- Implement pagination for large datasets.
- Add unit and integration tests.
- Improve UI with a component library (e.g., Material UI or Tailwind CSS).
