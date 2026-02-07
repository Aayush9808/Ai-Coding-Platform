# AI Coding Platform

## Overview
The AI Coding Platform is a web application designed to facilitate coding problem creation, submission, and evaluation. It integrates AI capabilities to enhance the coding experience for users.

## Features
- **Code Editor**: A powerful code editor using Monaco Editor for writing and testing code.
- **Problem Creation**: Users can create and submit coding problems through an intuitive form.
- **Test Case Management**: Display and manage test cases associated with coding problems.
- **Submission Results**: Users can view results of their code submissions.
- **User Dashboard**: A central hub for users to navigate the platform and access various features.
- **Authentication**: Secure user login and registration.

## Project Structure
The project is divided into two main parts: the client and the server.

### Client
- **Components**: Contains reusable UI components.
- **Pages**: Contains different pages of the application.
- **Services**: Contains API interaction logic.
- **Configuration Files**: Includes configuration for build tools and TypeScript.

### Server
- **Controllers**: Handles business logic for different functionalities.
- **Routes**: Defines API endpoints for the application.
- **Models**: Represents the data structure for problems, submissions, test cases, and users.
- **Services**: Contains logic for interacting with external services.
- **Middleware**: Includes authentication and error handling middleware.
- **Configuration**: Database connection settings.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```
3. Navigate to the server directory and install dependencies:
   ```
   cd server
   npm install
   ```
4. Set up environment variables by copying `.env.example` to `.env` and filling in the required values.
5. Start the server:
   ```
   cd server
   npm start
   ```
6. Start the client:
   ```
   cd client
   npm run dev
   ```

## Usage
- Access the application in your web browser at `http://localhost:3000`.
- Use the dashboard to navigate between creating problems, solving problems, and viewing submissions.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.