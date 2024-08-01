# Transaction API REST

A simple RESTful API for managing transactions, built with Node.js, Express, and MongoDB.

## Features

- Create, retrieve, update, and delete tasks
- Input validation with Joi
- Security enhancements with Helmet
- Cross-Origin Resource Sharing (CORS) enabled

## Prerequisites

- Node.js
- MongoDB
- Docker (optional, for containerization)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/GDS2005/ecommerce-transaction-service
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add the content of .env.example. Modify has you need



4. **Run the application**:

    ```bash
    npm start
    ```

5. **Access the API**:

    Open your browser and navigate to `http://localhost:{{PORT}}`.

## Docker

To run the application using Docker, follow these steps:

1. **Build the Docker image**:

    ```bash
    docker build -t node-rest-transaction .
    ```

2. **Run the Docker container**:

    ```bash
    docker run -d -p {{PORT}}:{{PORT}} --name node-rest-transaction-container --env-file .env node-rest-transaction
    ```

3. **Access the API**:

    Use POST, GET, PATCH and DELETE in `http://localhost:{{PORT}}/v1/`.

## API Endpoints

### Transactions

- **Create Transaction**: `POST /v1/`
- **Get All Transactions**: `GET /v1/`
- **Get Transaction by ID**: `GET /v1/:id`
- **Update Transaction**: `PUT /v1/:id`
- **Delete Transaction**: `DELETE /v1/:id`

