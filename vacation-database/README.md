# Vacation Database

This repository contains the SQL dump file for the `vacationdb` database. The database includes tables for users, vacations, and followers, along with some sample data.

## Table of Contents

- [Database Structure](#database-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Database Structure

The `vacationdb` database consists of the following tables:

1. **users**: Stores user information.
2. **vacations**: Stores vacation details.
3. **followers**: Stores the relationship between users and vacations they follow.

## Setup Instructions

To set up the `vacationdb` database on your local MySQL server, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/yourusername/vacation-database.git
   cd vacation-database
   ```

2. **Create the Database**:
   Open your MySQL client and create the `vacationdb` database:

   ```sql
   CREATE DATABASE vacationdb;
   ```

3. **Import the SQL Dump**:
   Import the `vacationdb.sql` file into your MySQL database:

   ```sh
   mysql -u yourusername -p vacationdb < vacationdb.sql
   ```

4. **Verify the Import**:
   Check that the tables have been created and populated with sample data:
   ```sql
   USE vacationdb;
   SHOW TABLES;
   ```

## Usage

Once the database is set up, you can interact with it using SQL queries. Here are some example queries:

1. **List all users**:

   ```sql
   SELECT * FROM users;
   ```

2. **List all vacations**:

   ```sql
   SELECT * FROM vacations;
   ```

3. **Find followers of a specific vacation**:

   ```sql
   SELECT u.first_name, u.last_name
   FROM followers f
   JOIN users u ON f.user_id = u.user_id
   WHERE f.vacation_id = 1;
   ```

4. **Add a new user**:

   ```sql
   INSERT INTO users (first_name, last_name, email, password, role)
   VALUES ('New', 'User', 'new.user@example.com', 'password', 'User');
   ```

5. **Add a new vacation**:
   ```sql
   INSERT INTO vacations (destination, summary, start_date, end_date, price, image_name)
   VALUES ('Paris', 'Explore the city of lights.', '2024-12-01', '2024-12-10', 3000.00, 'paris.jpg');
   ```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
