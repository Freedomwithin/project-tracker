# Project Tracker

## Overview

The Project Tracker is a full-stack web application designed to help users manage their projects, tasks, and notes efficiently. It provides a user-friendly interface built with React and Material UI for creating, viewing, updating, and deleting projects. The backend is powered by Node.js and Express, with a PostgreSQL database for persistent data storage.

## Features

*   **User Authentication:**
    *   Secure user registration and login.
    *   Password hashing with bcrypt.
    *   JWT (JSON Web Tokens) for authentication.
*   **Project Management:**
    *   Create new projects.
    *   View a list of all projects.
    *   Delete projects.
*   **Task Management:**
    *   Add tasks to projects.
    *   Mark tasks as complete.
    *   Delete tasks
*   **Note Taking:**
    *   Add notes to projects.
*   **Responsive Design:**
    *   Adapts to different screen sizes (desktop, tablet, mobile).

## Technologies Used

*   **Frontend:**
    *   React
    *   Material UI
    *   `fetch` (for API requests)
*   **Backend:**
    *   Node.js
    *   Express.js
    *   Sequelize (ORM)
    *   PostgreSQL (database)
    *   bcrypt (for password hashing)
    *   jsonwebtoken (for JWT authentication)
*   **API Documentation:**
    *   Swagger

## Prerequisites

*   Node.js (v18 or later)
*   pnpm
*   PostgreSQL (v14 or later)
*   Git

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Freedomwithin/project-tracker
    cd project-tracker
    ```

2.  **Backend Setup:**

    *   Navigate to the server directory:

    ```bash
    cd server
    ```

    *   Create a virtual environment:

    ```bash
    python3 -m venv venv
    ```

    *   Activate the virtual environment:
        *   **macOS/Linux:**

            ```bash
            source venv/bin/activate
            ```

        *   **Windows:**

            ```bash
            venv\Scripts\activate
            ```

    *   Install dependencies:

        ```bash
        pnpm install
        ```

    *   Create a `.env` file and add the following environment variables (replace with your actual values):

        ```
        DATABASE_URL=postgres://<your_db_username>:<your_db_password>@localhost:5432/projecttracker
        JWT_SECRET=<your_jwt_secret>
        ```

    *   Create the database and user:

        ```bash
        psql postgres
        CREATE USER <your_db_username> WITH PASSWORD '<your_db_password>';
        CREATE DATABASE projecttracker;
        GRANT ALL PRIVILEGES ON DATABASE projecttracker TO <your_db_username>;
        \q
        ```

    *   Start the backend server:

        ```bash
        pnpm start
        ```

3.  **Frontend Setup:**

    *   Open a new terminal and navigate to the client directory:

        ```bash
        cd client
        ```

    *   Install dependencies:

        ```bash
        pnpm install
        ```

    *   Start the frontend development server:

        ```bash
        pnpm start
        ```

4.  **Access the Application:**
    *   Open your web browser and go to `http://localhost:3000`.

## Usage

1.  Register a new user.
2.  Log in with your credentials.
3.  Create a project.
4.  Add tasks to the project.
5.  Add notes to the project

## API Documentation

The API documentation is available at `http://localhost:5001/api-docs`.

## Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes with clear and descriptive commit messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
