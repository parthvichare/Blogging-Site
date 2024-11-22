# Medium Clone

This is a full-stack Medium Clone application built with React for the frontend and Node.js for the backend. It includes real-time updates, secure user authentication, and content management features such as adding, updating, deleting blogs, and commenting. 
It uses MongoDB for storage, AWS S3 for image storage, and Docker for containerization


# Features
User Authentication: Secure login and registration with JWT token-based authentication
Blog Management: Users can add, update, and delete their own blogs
Commenting System: Users can comment on blogs. Only the owner of the blog or comment can delete it
Real-time Updates: WebSocket integration for live updates when new blogs or comments are added
Image Handling: Serverless image rendering using AWS S3 Bucket
Personal Blog List: Each user has a personal blog list in their profile
Responsiveness: Fully responsive design using Tailwind CSS to ensure a great experience on both desktop and mobile devices
Cross-Origin Resource Sharing (CORS): Configured CORS for seamless communication between the frontend (Vercel) and backend (Render), with MongoDB Atlas as the database
Containerization: The app is containerized using Docker for both frontend, backend, and MongoDB

# Tech Stack
## Frontend: React.js, Tailwind CSS
## Backend: Node.js, Express
## Database: MongoDB
## Authentication: JWT (JSON Web Token)
## Image Storage: AWS S3 Bucket
## Real-time Functionality: WebSocket
## Containerization: Docker
## Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas
## Setup Instructions
## To get started with this project, follow the steps below:

