# IMF Mission API

A RESTful API for managing IMF mission gadgets and users. This API provides endpoints for gadget management and user authentication.

<br />
<br />

## Authentication

All gadget endpoints require authentication via JWT token. Include the token in the Authorization header:

```
Authorization: <your_jwt_token>
```

<br />
<br />

## User Endpoints

### Sign Up
Create a new user account.

```
POST /user/signup
```

**Request Body:**
```json
{
  "name": "Ethan Hunt",
  "email": "ethan.hunt@imf.com",
  "password": "mission-impossible",
  "role": "FieldAgent"  // "Director" | "TeamLead" | "FieldAgent"
}
```

**Response:**
```json
{
  "message": "SignUp successful!",
  "user": {
    "id": "uuid",
    "name": "Ethan Hunt",
    "email": "ethan.hunt@imf.com",
    "role": "FieldAgent"
  },
  "token": "jwt_token"
}
```

### Sign In
Authenticate an existing user.

```
POST /user/signin
```

**Request Body:**
```json
{
  "email": "ethan.hunt@imf.com",
  "password": "mission-impossible"
}
```

**Response:**
```json
{
  "message": "SignIn successful!",
  "token": "jwt_token"
}
```

<br />
<br />

## Gadget Endpoints

### Get All Gadgets
Retrieve all gadgets or filter by status.

```
GET /gadgets
GET /gadgets?status=Available
```

**Query Parameters:**
- `status` (optional): Filter by gadget status ("Available" | "Deployed" | "Destroyed" | "Decommissioned")

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Explosive Gum",
    "codename": "The Phoenix",
    "status": "Available",
    "confirmationcode": 123456,
    "decommissionedAt": null,
    "missionSuccessProbability": "85%"
  }
]
```

### Create Gadget
Create a new gadget.

```
POST /gadgets
```

**Request Body:**
```json
{
  "name": "Explosive Gum"
}
```

**Response:**
```json
{
  "newGadget": {
    "id": "uuid",
    "name": "Explosive Gum",
    "codename": "The Phoenix",
    "status": "Available",
    "confirmationcode": 123456,
    "decommissionedAt": null
  },
  "message": "Gadget has been created by FieldAgent Ethan Hunt"
}
```

### Update Gadget
Update a gadget's name or status.

```
PATCH /gadgets/:id
```

**Request Body:**
```json
{
  "name": "Updated Gum",
  "status": "Deployed"
}
```

**Response:**
```json
{
  "updatedGadget": {
    "id": "uuid",
    "name": "Updated Gum",
    "codename": "The Phoenix",
    "status": "Deployed",
    "confirmationcode": 123456,
    "decommissionedAt": null
  },
  "message": "Gadget has been updated by FieldAgent Ethan Hunt"
}
```

### Delete Gadget
Mark a gadget as decommissioned (Director only).

```
DELETE /gadgets/:id
```

**Response:**
```json
{
  "updatedGadget": {
    "id": "uuid",
    "name": "Updated Gum",
    "codename": "The Phoenix",
    "status": "Decommissioned",
    "confirmationcode": 123456,
    "decommissionedAt": "2024-01-26T12:00:00.000Z"
  },
  "message": "Gadget has been decommissioned by Director Jim Phelps"
}
```

### Self-Destruct Gadget
Trigger gadget self-destruction using confirmation code.

```
POST /gadgets/:id/self-destruct
```

**Request Body:**
```json
{
  "confirmationcode": "123456"
}
```

**Response:**
```json
{
  "updatedGadget": {
    "id": "uuid",
    "name": "Updated Gum",
    "codename": "The Phoenix",
    "status": "Destroyed",
    "confirmationcode": 123456,
    "decommissionedAt": null
  },
  "message": "Gadget has been destroyed by FieldAgent Ethan Hunt"
}
```
<br />
<br />

## Error Responses

The API returns appropriate HTTP status codes and error messages:

```json
{
  "error": "Error message here"
}
```

Common status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 404: Not Found
- 500: Internal Server Error

<br />
<br />

## Environment Variables

Create a `.env` file with the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/imf_mission"
JWT_SECRET="your-secret-key"
PORT=3000
```


<br />
<br />


## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
```

3. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

<br />
<br />

## API Documentation

The API documentation is available in two formats:

1. **Swagger UI (Production)**: 
   Visit [https://imf-api-zn64.onrender.com/api-docs](https://imf-api-zn64.onrender.com/api-docs) to:
   - Explore all available endpoints
   - Test API endpoints directly from your browser
   - View request/response schemas
   - Understand authentication requirements

2. **Swagger UI (Local Development)**:
   When running locally, visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

<br />
<br />

## Using Authentication

### In Swagger UI
1. First, get your JWT token by using the `/user/signin` or `/user/signup` endpoint
2. Click the "Authorize" button at the top of the Swagger UI
3. In the authorization popup, enter your token directly:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwYmNhYzdiLWMzY2UtNDdjYi05YzhiLWMwNjAwNjY3OGZkYyIsIm5hbWUiOiJKb2huIERvcmUiLCJyb2xlIjoiRGlyZWN0b3IiLCJpYXQiOjE3Mzc5MTQ0NzR9.Vjt3FeumWAXlVdfoVJ-pmmF2upeS6ufcRzi5s3srA3Q
   ```
   Note: For Swagger UI, do not include the 'Bearer ' prefix


<br />
<br />


### In Postman
When using Postman or making direct API calls, you must include the 'Bearer ' prefix in the Authorization header:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwYmNhYzdiLWMzY2UtNDdjYi05YzhiLWMwNjAwNjY3OGZkYyIsIm5hbWUiOiJKb2huIERvcmUiLCJyb2xlIjoiRGlyZWN0b3IiLCJpYXQiOjE3Mzc5MTQ0NzR9.Vjt3FeumWAXlVdfoVJ-pmmF2upeS6ufcRzi5s3srA3Q
```

Remember to:
- Keep your token secure and don't share it
- For direct API calls (Postman, curl, etc.), always include 'Bearer ' prefix
- For Swagger UI, only paste the token without 'Bearer ' prefix

<br />
<br />

## Deployed API

The API is deployed and available at:
```
https://imf-api-zn64.onrender.com
```

You can use this base URL for all API endpoints when testing in production.
