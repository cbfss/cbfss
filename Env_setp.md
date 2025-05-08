# Environment Setup for Address Type Management

This document provides instructions on setting up environment variables for the Address Type Management feature.

## Environment Files

Create the following environment files based on your deployment environment:

1. `.env.development` - Development environment variables
2. `.env.production` - Production environment variables
3. `.env.test` - Testing environment variables

You can copy the `.env.example` file as a starting point:

```bash
cp .env.example .env.development
```

## Required Environment Variables

Configure the following variables in your environment files:

- `VITE_API_BASE_URL`: Base URL for the API (e.g., `http://localhost:8080` for local development)

## Environment Variables in Vite

Vite exposes environment variables on the `import.meta.env` object. All environment variables must be prefixed with `VITE_` to be exposed to your application.

Example usage:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
console.log("API URL:", apiUrl);
```

## Switching Environments

Vite automatically loads the appropriate environment file based on the command used:

- `npm run dev` - Loads `.env.development`
- `npm run build` - Loads `.env.production`
- `npm run test` - Loads `.env.test`

## Security Considerations

- Never commit environment files containing sensitive information to version control
- Add `.env*` to your `.gitignore` file, except for `.env.example`
- Store secrets in a secure vault and inject them at deployment time
