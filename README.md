# User Management Application

This is a User Management application built with Next.js for the frontend and Node.js with Express for the backend. The application allows you to manage users with features such as adding, editing, deleting, and viewing user details.

## Features

- User registration and management
- Search functionality to find users
- Edit user details
- Delete users with confirmation
- Responsive design

## Tech Stack

- **Frontend**: Next.js, React, Material-UI
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **State Management**: Redux
- **Environment**: JavaScript/TypeScript

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-management-app.git
   cd user-management-app

2. Navigate to the backend directory:
    cd server

3. Install the backend dependencies:
    npm install

4. Start the backend server:
    npm run dev

5. In a new terminal, navigate to the frontend directory and install the frontend dependencies:
    cd client
    npm install

6. Start the frontend application:
    npm run dev

## Usage
Open your browser and navigate to http://localhost:3000 to access the application.
Use the interface to manage users.

## API Endpoints
- GET /api/users - Retrieve all users
- GET /api/users/:id - Retrieve a specific user by ID
- POST /api/users/add - Create a new user
- POST /api/users/update/:id - Update an existing user
- POST /api/users/delete/:id - Delete a user by ID
