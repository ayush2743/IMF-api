# API Documentation

## Gadget Controller APIs

### 1. Get Gadgets
- **Endpoint:** `GET /gadgets`
- **Description:** Retrieve all gadgets, optionally filtered by status
- **Query Parameters:**
  - `status` (optional): Filter gadgets by status (must be a valid GadgetStatus)
- **Success Response:** 
  - **Code:** 200 
  - **Content:** Array of gadgets with probabilities
- **Error Responses:**
  - **Code:** 404 if no gadgets found
  - **Code:** 500 for server errors

**Example Request:**
```http
GET /gadgets?status=ACTIVE
```

**Example Success Response:**
```json
[
  {
    "id": "123",
    "name": "Smart Device",
    "status": "ACTIVE",
    "probability": 0.75
  }
]
```

### 2. Create Gadget
- **Endpoint:** `POST /gadgets`
- **Description:** Create a new gadget
- **Request Body:**
  - `name` (required): Name of the gadget
- **Success Response:** 
  - **Code:** 201 
  - **Content:** Created gadget details
- **Error Responses:**
  - **Code:** 400 if name is missing
  - **Code:** 409 if gadget already exists
  - **Code:** 500 for server errors

**Example Request:**
```http
POST /gadgets
Content-Type: application/json

{
  "name": "Smart Thermostat"
}
```

**Example Success Response:**
```json
{
  "id": "456",
  "name": "Smart Thermostat",
  "status": "INACTIVE"
}
```

### 3. Update Gadget
- **Endpoint:** `PUT /gadgets/:id`
- **Description:** Update an existing gadget's name or status
- **Path Parameters:**
  - `id` (required): Gadget ID
- **Request Body:**
  - `name` (optional): New name for the gadget
  - `status` (optional): New status for the gadget
- **Success Response:** 
  - **Code:** 200 
  - **Content:** Updated gadget details
- **Error Responses:**
  - **Code:** 400 if ID or update fields are missing
  - **Code:** 404 if gadget not found
  - **Code:** 500 for server errors

**Example Request:**
```http
PUT /gadgets/456
Content-Type: application/json

{
  "name": "Updated Thermostat",
  "status": "ACTIVE"
}
```

### 4. Delete Gadget
- **Endpoint:** `DELETE /gadgets/:id`
- **Description:** Delete a gadget
- **Path Parameters:**
  - `id` (required): Gadget ID
- **Success Response:** 
  - **Code:** 200 
  - **Content:** Deleted gadget details
- **Error Responses:**
  - **Code:** 400 if ID is missing
  - **Code:** 404 if gadget not found
  - **Code:** 500 for server errors

**Example Request:**
```http
DELETE /gadgets/456
```

### 5. Self Destruct Gadget
- **Endpoint:** `POST /gadgets/:id/self-destruct`
- **Description:** Initiate self-destruction of a gadget with confirmation
- **Path Parameters:**
  - `id` (required): Gadget ID
- **Request Body:**
  - `confirmationcode` (required): Confirmation code for self-destruction
- **Success Response:** 
  - **Code:** 200 
  - **Content:** Self-destructed gadget details
- **Error Responses:**
  - **Code:** 400 if ID or confirmation code is missing
  - **Code:** 404 if gadget not found
  - **Code:** 401 if confirmation code is invalid
  - **Code:** 500 for server errors

**Example Request:**
```http
POST /gadgets/456/self-destruct
Content-Type: application/json

{
  "confirmationcode": "DESTRUCT-123"
}
```

## User Controller APIs

### 1. Sign Up
- **Endpoint:** `POST /users/signup`
- **Description:** Register a new user
- **Request Body:**
  - `name` (required): User's full name
  - `email` (required): User's email address
  - `password` (required): User's password
  - `role` (required): User's role
- **Success Response:** 
  - **Code:** 200 
  - **Content:** Created user details
- **Error Responses:**
  - **Code:** 400 if required fields are missing or email is already in use
  - **Code:** 500 for server errors

**Example Request:**
```http
POST /users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "USER"
}
```

### 2. Sign In
- **Endpoint:** `POST /users/signin`
- **Description:** Authenticate user and generate JWT token
- **Request Body:**
  - `email` (required): User's email address
  - `password` (required): User's password
- **Success Response:** 
  - **Code:** 200 
  - **Content:** JWT authentication token
- **Error Responses:**
  - **Code:** 400 if email or password is missing
  - **Code:** 500 for server errors

**Example Request:**
```http
POST /users/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Example Success Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```