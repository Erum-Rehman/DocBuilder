# DocBuilder Backend

A basic Node.js backend API for the DocBuilder application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with:
```
PORT=3001
NODE_ENV=development
```

3. Run the application:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/status` - API status

## Project Structure

```
backend/
├── server.js          # Main server file
├── config.js          # Configuration settings
├── package.json       # Dependencies and scripts
├── routes/
│   └── index.js      # API routes
└── README.md         # This file
```

## Development

The server runs on port 3001 by default. You can change this by setting the `PORT` environment variable. 