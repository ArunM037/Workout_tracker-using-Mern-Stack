# Workout Tracker

A Workout Tracker application created using the MEN (MongoDB, Express.js, Node.js) stack. This project includes API endpoints for managing workouts and uses JSON Web Token (JWT) for authentication.

## Features

- **Create, Read, Update, and Delete (CRUD)** operations for workouts.
- **Authentication** using JSON Web Token (JWT).

## API Endpoints

### Workouts

- **Get all workouts**
  - `GET /api/workouts`
  - Retrieves a list of all workouts.

- **Get a single workout by ID**
  - `GET /api/workouts/:id`
  - Retrieves a workout by its unique ID.

- **Create a new workout**
  - `POST /api/workouts`
  - Creates a new workout with the provided data.

- **Delete a workout by ID**
  - `DELETE /api/workouts/:id`
  - Deletes a workout by its unique ID.

- **Update a workout by ID**
  - `PUT /api/workouts/:id`
  - Updates a workout with the provided data by its unique ID.

## Authentication

- **JWT Authentication**
  - The application uses JSON Web Tokens (JWT) for secure authentication of users.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/ArunM037/Workout_tracker-using-Mern-Stack.git
    cd workout-tracker
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following variables:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    SECRET=your_jwt_secret
    ```

### Running the Application


 Start the Node.js server:

  ```bash
  nodemon dev
  ```

The server should be running at `http://localhost:5000`.

## Usage

You can use tools like [Postman](https://www.postman.com/) to test the API endpoints.


## Contributing

Contributions are welcome! Please fork the repository and create a pull request.
