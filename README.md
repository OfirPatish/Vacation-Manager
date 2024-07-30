# Vacation Management Application

## Overview

This project is a full-stack application designed to manage vacations. It includes both a frontend and a backend, providing a comprehensive tool to help users plan and enjoy their holidays.

## Features

- User Authentication (Login/Register)
- Vacation Directory
- Vacation Planning
- Admin Privileges for Adding and Managing Vacations
- Secure and Reliable Data Handling

## Technologies Used

### Frontend

- React
- TypeScript
- Material-UI
- Axios
- React Hook Form
- React Router DOM
- Lottie for animations

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- JWT for authentication
- Axios

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MySQL

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/vacation-management.git
   cd vacation-management
   ```

2. **Install dependencies for the frontend:**

   ```sh
   cd vacation-frontend
   npm install
   ```

3. **Install dependencies for the backend:**
   ```sh
   cd ../vacation-backend
   npm install
   ```

### Configuration

1. **Frontend:**

   - Update the API endpoints in the frontend code if necessary.

2. **Backend:**
   - Configure your MySQL database connection in `vacation-backend/Utils/databaseConfig.ts`.

### Setting Up the MySQL Database

1. **Create the Database:**

   Open your MySQL client and run the following command to create a new database:

   ```sql
   CREATE DATABASE vacationdb;
   ```

2. **Create the Tables:**

   Use the following SQL script to create the necessary tables:

   ```sql
   USE vacationdb;

   CREATE TABLE Users (
       user_id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       role ENUM('User', 'Admin') NOT NULL
   );

   CREATE TABLE Vacations (
       vacation_id INT AUTO_INCREMENT PRIMARY KEY,
       destination VARCHAR(100) NOT NULL,
       summary TEXT NOT NULL,
       start_date DATE NOT NULL,
       end_date DATE NOT NULL,
       price DECIMAL(10, 2) NOT NULL,
       image_name VARCHAR(255) NOT NULL
   );

   CREATE TABLE Followers (
       user_id INT NOT NULL,
       vacation_id INT NOT NULL,
       PRIMARY KEY (user_id, vacation_id),
       FOREIGN KEY (user_id) REFERENCES Users(user_id),
       FOREIGN KEY (vacation_id) REFERENCES Vacations(vacation_id)
   );
   ```

### Running the Application

1. **Start the backend server:**

   ```sh
   cd vacation-backend
   npm start
   ```

2. **Start the frontend development server:**

   ```sh
   cd ../vacation-frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Available Scripts

### Frontend

In the `vacation-frontend` directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.
- `npm run eject`: Ejects the app configuration.

### Backend

In the `vacation-backend` directory, you can run:

- `npm start`: Starts the backend server with nodemon.

## Project Structure

### Frontend

- `src/Components`: Contains React components.
- `src/Redux`: Contains Redux store and reducers.
- `src/Utils`: Contains utility functions.
- `public`: Contains public assets and the main HTML file.

### Backend

- `Routes`: Contains route handlers.
- `Models`: Contains data models.
- `Utils`: Contains utility functions like JWT service.
- `DAL`: Contains data access layer for MySQL.
- `MiddleWare`: Contains middleware functions.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Express documentation](https://expressjs.com/)

## License

This project is licensed under the MIT License.
