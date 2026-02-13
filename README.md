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

3. Run in development mode:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Run tests:

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

## License

MIT
