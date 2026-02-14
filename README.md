# Text Justify API

REST API for text justification with token-based authentication.

## Technologies

- Node.js (v18+)
- TypeScript
- Express

## Getting Started

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/ohaddar/text-justify-api.git
cd text-justify-api
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then update the variables:

```env
JWT_SECRET=your-jwt-secret-key-here
PORT=3000
NODE_ENV=development
MAX_WORDS_PER_DAY=80000
```

- `JWT_SECRET` (required): Secret key for JWT token generation and validation
- `PORT` (optional): Server port, defaults to 3000
- `NODE_ENV` (optional): Environment mode (development/production)
- `MAX_WORDS_PER_DAY` (optional): Daily word limit per user, defaults to 80000

4. Run in development mode:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

6. Run tests:

```bash
npm test
```

Server runs on port 3000 by default.

## API Usage

### 1. Get Authentication Token

First, obtain a token by calling the `/api/token` endpoint with your email:

```bash
curl -X POST http://localhost:3000/api/token \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com"}'
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Use Token in Protected Endpoints

Add the token to the `Authorization` header with the `Bearer` prefix when calling protected endpoints:

```bash
curl -X POST http://localhost:3000/api/justify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: text/plain" \
  -d "Your text to justify goes here..."
```

### Justify Endpoint Responses

**Success (200):**

```
Content-Type: text/plain

Your justified text with
lines  wrapped  at  80
characters per line.
```

**Bad Request (400):**

```json
{
  "error": "Invalid text provided"
}
```

This occurs when the request body is empty or contains non-string data.

**Unauthorized (401):**

```json
{
  "error": "Authentication required"
}
```

This occurs when no Authorization header is provided or the Bearer token is missing.

or

```json
{
  "error": "Invalid token"
}
```

This occurs when the provided token is expired, malformed, or invalid.

**Payment Required (402):**

```json
{
  "error": "Payment Required"
}
```

This occurs when you exceed the daily word limit (80,000 words per day per email).

**Internal Server Error (500):**

```json
{
  "error": "Internal server error"
}
```

This occurs when an unexpected error happens during text processing.

## License

MIT
