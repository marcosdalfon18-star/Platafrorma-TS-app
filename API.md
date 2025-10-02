# API Documentation

## Overview

Platafrorma-TS-app provides a robust route control system with TypeScript support. This document describes all available endpoints and how to use them.

## Base URL

```
http://localhost:3000
```

## Authentication

Protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Endpoints

### Public Routes

#### Get API Information
```
GET /
```

Returns information about the API and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Platafrorma-TS-app",
  "version": "1.0.0",
  "endpoints": {
    "home": "GET /",
    "health": "GET /health",
    ...
  }
}
```

#### Health Check
```
GET /health
```

Returns the health status of the server.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-02T22:47:21.738Z"
}
```

### User Management API

#### Get All Users
```
GET /api/users
```

Returns a list of all users.

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "User 1",
      "email": "user1@example.com"
    }
  ]
}
```

#### Get User by ID
```
GET /api/users/:id
```

Returns a specific user by ID.

**Parameters:**
- `id` (path parameter) - User ID

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "User 1",
    "email": "user1@example.com"
  }
}
```

#### Create User
```
POST /api/users
```

Creates a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Required Fields:**
- `name` - User's name
- `email` - User's email address

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1759445254429,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation Error Response:**
```json
{
  "error": "Validation Error",
  "missingFields": ["email"]
}
```

#### Update User
```
PUT /api/users/:id
```

Updates an existing user.

**Parameters:**
- `id` (path parameter) - User ID

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Required Fields:**
- `name` - User's name
- `email` - User's email address

**Response:**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

#### Delete User
```
DELETE /api/users/:id
```

Deletes a user by ID.

**Parameters:**
- `id` (path parameter) - User ID

**Response:**
```json
{
  "message": "User deleted successfully",
  "userId": 1
}
```

### Protected Routes

#### Access Protected Resource
```
GET /api/protected
```

**Authentication Required:** Yes

Returns data from a protected route.

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response:**
```json
{
  "message": "This is a protected route",
  "user": "Authenticated user"
}
```

**Unauthorized Response:**
```json
{
  "error": "Unauthorized: No token provided"
}
```

## Error Responses

### 400 Bad Request
Returned when validation fails or required fields are missing.

```json
{
  "error": "Validation Error",
  "missingFields": ["field1", "field2"]
}
```

### 401 Unauthorized
Returned when authentication is required but not provided.

```json
{
  "error": "Unauthorized: No token provided"
}
```

### 500 Internal Server Error
Returned when an unexpected error occurs.

```json
{
  "error": "Internal Server Error",
  "message": "Error description"
}
```

## Examples

### cURL Examples

#### Get all users
```bash
curl http://localhost:3000/api/users
```

#### Create a user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

#### Access protected route
```bash
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer your-token-here"
```

### JavaScript Examples

#### Using fetch
```javascript
// Get users
fetch('http://localhost:3000/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// Create user
fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Access protected route
fetch('http://localhost:3000/api/protected', {
  headers: {
    'Authorization': 'Bearer your-token-here'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## Rate Limiting

Currently, there are no rate limits implemented. This may be added in future versions.

## CORS

CORS is enabled for all origins. The following headers are set:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
