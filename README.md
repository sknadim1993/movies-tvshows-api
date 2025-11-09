🎬 Movies & TV Shows API

A RESTful backend service built with Node.js, Express, TypeScript, and PostgreSQL that allows users to manage their favorite movies and TV shows.

 📋 Table of Contents

[Features](#features)
[Tech Stack](#tech-stack)
[Prerequisites](#prerequisites)
[Installation](#installation)
[Database Setup](#database-setup)
[Running the Application](#running-the-application)
[API Endpoints](#api-endpoints)
[Database Schema](#database-schema)
[Sample Data](#sample-data)
[Project Structure](#project-structure)

 ✨ Features

✅ Create new movie/TV show entries
✅ List all entries with pagination
✅ Update existing entries
✅ Delete entries
✅ Search entries by title (Bonus feature)
✅ Input validation using Zod
✅ PostgreSQL database with TypeORM
✅ Comprehensive error handling
✅ Cloud-hosted database (Supabase)

 🛠 Tech Stack

Backend Framework: Node.js with Express
Language: TypeScript
Database: PostgreSQL (Supabase)
ORM: TypeORM
Validation: Zod
Other Libraries: 
  - Helmet (Security)
  - CORS (Cross-Origin Resource Sharing)
  - Morgan (Logging)
  - Dotenv (Environment Variables)

 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Git

 🚀 Installation

 1. Clone the Repository

```bash
git clone https://github.com/sknadim1993/movies-tvshows-api.git
cd movies-tvshows-api
```

 2. Install Dependencies

```bash
npm install
```

 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Supabase PostgreSQL connection string:

```env
DATABASE_URL=postgresql://postgres:[YOUR_PASSWORD]@db.nrcnnuockdyvncunuxym.supabase.co:5432/postgres
PORT=3000
NODE_ENV=production
```

Important: Replace `[YOUR-PASSWORD]` with your actual Supabase database password.

 🗄️ Database Setup

 Database Schema

The application uses a single `entries` table with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| title | VARCHAR(255) | Title of the movie/TV show |
| type | ENUM | Type: 'Movie' or 'TV Show' |
| director | VARCHAR(255) | Director name |
| budget | DECIMAL(15,2) | Production budget |
| location | VARCHAR(255) | Filming location |
| duration | INTEGER | Duration in minutes |
| year | INTEGER | Release year |
| createdAt | TIMESTAMP | Auto-generated timestamp |
| updatedAt | TIMESTAMP | Auto-updated timestamp |

 Initialize Database

The application uses TypeORM with `synchronize: true`, which automatically creates tables on startup. However, for production, you should use migrations.

 Seed Sample Data

Populate the database with sample data (3 movies + 3 TV shows):

```bash
npm run seed
```

This will add the following entries:

Movies:
1. Inception (2010) - Christopher Nolan
2. The Shawshank Redemption (1994) - Frank Darabont
3. The Dark Knight (2008) - Christopher Nolan

TV Shows:
1. Breaking Bad (2008) - Vince Gilligan
2. Game of Thrones (2011) - David Benioff & D.B. Weiss
3. Stranger Things (2016) - The Duffer Brothers

 🏃 Running the Application

 Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:3000` with hot-reloading enabled.

 Production Mode

```bash
npm run build
npm start
```

 Health Check

Visit `http://localhost:3000/health` to verify the server is running.

 📡 API Endpoints

 Base URL
```
http://localhost:3000/api
```

 1. Create Entry
POST `/api/entries`

Request Body:
```json
{
  "title": "Interstellar",
  "type": "Movie",
  "director": "Christopher Nolan",
  "budget": 165000000,
  "location": "Alberta, Canada",
  "duration": 169,
  "year": 2014
}
```

Response (201):
```json
{
  "success": true,
  "message": "Entry created successfully",
  "data": {
    "id": "uuid-here",
    "title": "Interstellar",
    "type": "Movie",
    "director": "Christopher Nolan",
    "budget": "165000000.00",
    "location": "Alberta, Canada",
    "duration": 169,
    "year": 2014,
    "createdAt": "2025-11-09T12:00:00.000Z",
    "updatedAt": "2025-11-09T12:00:00.000Z"
  }
}
```

 2. List All Entries (with Pagination)
GET `/api/entries?page=1&limit=10`

Query Parameters:
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10, max: 100) - Items per page

Response (200):
```json
{
  "success": true,
  "message": "Entries retrieved successfully",
  "data": [
    {
      "id": "uuid-here",
      "title": "Inception",
      "type": "Movie",
      "director": "Christopher Nolan",
      "budget": "160000000.00",
      "location": "Los Angeles, USA",
      "duration": 148,
      "year": 2010,
      "createdAt": "2025-11-09T12:00:00.000Z",
      "updatedAt": "2025-11-09T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 6,
    "itemsPerPage": 10,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

 3. Get Entry by ID
GET `/api/entries/:id`

Response (200):
```json
{
  "success": true,
  "message": "Entry retrieved successfully",
  "data": {
    "id": "uuid-here",
    "title": "Inception",
    "type": "Movie",
    "director": "Christopher Nolan",
    "budget": "160000000.00",
    "location": "Los Angeles, USA",
    "duration": 148,
    "year": 2010,
    "createdAt": "2025-11-09T12:00:00.000Z",
    "updatedAt": "2025-11-09T12:00:00.000Z"
  }
}
```

 4. Update Entry
PUT `/api/entries/:id`

Request Body (all fields optional):
```json
{
  "title": "Inception - Updated",
  "budget": 170000000
}
```

Response (200):
```json
{
  "success": true,
  "message": "Entry updated successfully",
  "data": {
    "id": "uuid-here",
    "title": "Inception - Updated",
    "type": "Movie",
    "director": "Christopher Nolan",
    "budget": "170000000.00",
    "location": "Los Angeles, USA",
    "duration": 148,
    "year": 2010,
    "createdAt": "2025-11-09T12:00:00.000Z",
    "updatedAt": "2025-11-09T12:05:00.000Z"
  }
}
```

 5. Delete Entry
DELETE `/api/entries/:id`

Response (200):
```json
{
  "success": true,
  "message": "Entry deleted successfully"
}
```

 6. Search Entries by Title (Bonus Feature)
GET `/api/entries/search?title=inception&page=1&limit=10`

Query Parameters:
- `title` (required) - Search query
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

Response (200):
```json
{
  "success": true,
  "message": "Search results retrieved successfully",
  "data": [
    {
      "id": "uuid-here",
      "title": "Inception",
      "type": "Movie",
      "director": "Christopher Nolan",
      "budget": "160000000.00",
      "location": "Los Angeles, USA",
      "duration": 148,
      "year": 2010,
      "createdAt": "2025-11-09T12:00:00.000Z",
      "updatedAt": "2025-11-09T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 1,
    "itemsPerPage": 10,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

 🏗️ Project Structure

```
movies-tvshows-api/
├── src/
│   ├── config/
│   │   └── database.ts          # TypeORM configuration
│   ├── controllers/
│   │   └── entryController.ts   # Request handlers
│   ├── entities/
│   │   └── Entry.ts             # TypeORM entity
│   ├── middlewares/
│   │   ├── errorHandler.ts      # Error handling
│   │   └── validation.ts        # Validation middleware
│   ├── routes/
│   │   └── entryRoutes.ts       # API routes
│   ├── seeds/
│   │   └── seed.ts              # Database seeder
│   ├── validators/
│   │   └── entryValidators.ts   # Zod schemas
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── .env                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
└── README.md                    # Documentation
```

 🧪 Testing the API

You can test the API using tools like:
Postman: Import the endpoints and test
cURL: Command-line testing
Thunder Client: VS Code extension

 Example cURL Commands

Create an entry:
```bash
curl -X POST http://localhost:3000/api/entries \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Interstellar",
    "type": "Movie",
    "director": "Christopher Nolan",
    "budget": 165000000,
    "location": "Alberta, Canada",
    "duration": 169,
    "year": 2014
  }'
```

List entries:
```bash
curl http://localhost:3000/api/entries?page=1&limit=10
```

Search entries:
```bash
curl "http://localhost:3000/api/entries/search?title=inception"
```

🔒 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

📝 Validation Rules

title: Required, 1-255 characters
type: Required, must be "Movie" or "TV Show"
director: Required, 1-255 characters
budget: Required, positive number
location: Required, 1-255 characters
duration: Required, positive integer (minutes)
year: Required, integer between 1800 and current year + 10

👨‍💻 Author

Sheikh Nadim
- GitHub: [@sknadim1993](https://github.com/sknadim1993)

📄 License

This project is licensed under the MIT License.

🙏 Acknowledgments

- Built for LOGICALL INC Backend Developer Coding Exercise
- Powered by Supabase PostgreSQL
- TypeScript + Express + TypeORM stack
