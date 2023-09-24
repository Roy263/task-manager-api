# Task Manager API

This is a Node.js-based API for managing tasks. It allows you to create, update, delete tasks, get a list of tasks with pagination, and retrieve task metrics.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)


## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system.
- MySQL or another SQL database set up with the appropriate configurations (database name, username, password).

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Roy263/task-manager-api
    ```
2. Use of sequelize
    ### Sequelize ORM

    This application utilizes the Sequelize ORM (Object-Relational Mapping) to interact with the database. Sequelize is a powerful and flexible ORM that simplifies database operations by allowing you to work with JavaScript objects and functions instead of writing raw SQL queries.

    #### Models

    The core of Sequelize is its model system. In this application, we have a `Task` model that defines the structure of tasks and their attributes. The model is located in the `models` directory and is defined using Sequelize's `sequelize.define` method.

    ```javascript
    const { Sequelize, DataTypes } = require('sequelize');

    module.exports = (sequelize) => {
    const Task = sequelize.define('Task', {
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        description: {
        type: DataTypes.TEXT,
        allowNull: true,
        },
        status: {
        type: DataTypes.ENUM('open', 'inprogress', 'completed'),
        allowNull: false,
        },
    });

    return Task;
    };
    ```

    #### Database Synchronization
    In the app.js file, you'll find a function that synchronizes the database schema. When the application starts, Sequelize will automatically create the necessary tables if they don't exist. This ensures that the database schema matches the defined models.


3. Install the project dependencies using npm:

   ```bash
   npm install
   ``` 

## Running the Application
1. Create a .env file in the project root directory and configure the following environment variables.You can use the provided .env.example file as a template and replace the placeholders with your configuration values:

   ```dotenv
    DB_HOST=your-database-host
    DB_NAME=your-database-name
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    PORT=3000
    ```
    Replace your-database-* placeholders with your database connection details.

2. Run the application:

   ```bash
   npm start
    ```

3. To run tests, you can use the following command:

   ```bash
   npm test
    ```

 

## Usage

### API Endpoints

The following endpoints are available in this API:

- **Create a Task**: `POST /api/tasks`
- **Update a Task**: `PUT /api/tasks/:id`
- **Get All Tasks with Pagination**: `GET /api/tasks`
- **Delete a Task**: `DELETE /api/tasks/:id`
- **Get Task Metrics**: `GET /api/tasks/metrics`

### Creating a Task

To create a new task, make a `POST` request to the `/api/tasks` endpoint with the following JSON request body:

```http
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
  "title": "Sample Task",
  "description": "This is a sample task.",
  "status": "open"
}
```

### Updating a Task

To update an existing task, make a `PUT` request to the `/api/tasks/:id` endpoint, where `:id` is the task's ID. Include the updated task details in the request body as JSON:

```http
PUT http://localhost:3000/api/tasks/1
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "This task has been updated.",
  "status": "completed"
}
```

### Getting All Tasks with Pagination

To retrieve a list of all tasks with pagination, make a `GET` request to the `/api/tasks` endpoint. You can specify the page and the number of tasks per page using query parameters:

```http
GET http://localhost:3000/api/tasks?page=1&perPage=10
```

### Deleting a Task

To delete a task, make a `DELETE` request to the `/api/tasks/:id` endpoint, where `:id` is the ID of the task you want to delete:

```http
DELETE http://localhost:3000/api/tasks/1
```


### Getting Task Metrics

To retrieve task metrics, make a `GET` request to the `/api/tasks/metrics` endpoint. This endpoint will return metrics for tasks, including the total number of tasks, open tasks, in-progress tasks, and completed tasks, grouped by date.

```http
GET http://localhost:3000/api/tasks/metrics
```



