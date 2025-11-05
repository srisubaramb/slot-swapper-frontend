# SlotSwapper

SlotSwapper is a peer-to-peer time-slot scheduling application built as a full-stack web app. Users can create events on their calendars, mark them as "swappable," and request to swap slots with other users. The application handles the swap logic, notifications, and updates calendars dynamically.

## Overview

This project implements the SlotSwapper concept as described in the ServiceHive SDE Assignment. It features user authentication, event management, a marketplace for browsing swappable slots, and a requests system for handling swap proposals.

### Design Choices

- **Backend**: Node.js with Express.js and MongoDB for data persistence. JWT for authentication.
- **Frontend**: React with Vite for fast development, Tailwind CSS for styling.
- **Database**: MongoDB with Mongoose for schema modeling.
- **Deployment**: Frontend on Vercel, Backend on Render.

## Features

- User registration and login with JWT authentication
- CRUD operations for events (create, read, update, delete)
- Mark events as swappable
- Browse swappable slots from other users
- Request swaps by selecting your own swappable slot
- Accept or reject incoming swap requests
- Dynamic state updates without page refreshes

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Deployment**: Vercel (frontend), Render (backend)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Local Setup

1. **Clone the repositories**

   ```bash
   git clone https://github.com/srisubaramb/slot-swapper-frontend.git
   git clone https://github.com/srisubaramb/slot-swapper-backend.git
   ```

2. **Backend Setup**

   ```bash
   cd slot-swapper-backend
   npm install
   ```

   - Create a `.env` file in the backend root with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```
     The backend will run on http://localhost:5000

3. **Frontend Setup**

   ```bash
   cd slot-swapper-frontend
   npm install
   ```

   - Update the API base URL in `src/api.js` if needed (default: http://localhost:5000)
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
     The frontend will run on http://localhost:5173

4. **Access the Application**
   - Open http://localhost:5173 in your browser
   - Sign up for a new account or log in
   - Create events, mark them as swappable, browse the marketplace, and test swap requests

## Assumptions and Challenges

### Assumptions

- Users will provide valid date/time formats for events
- MongoDB connection is stable and available
- JWT tokens are stored securely on the client-side
- Users understand the concept of swappable slots

### Challenges Faced

- Implementing the swap logic to ensure data integrity during concurrent requests
- Handling edge cases in swap responses (e.g., slots being deleted or modified)
- Managing state updates across React components without unnecessary re-renders
- Ensuring proper authentication middleware on all protected routes
- Debugging API calls and handling error responses appropriately

## Deployment

The application is deployed and accessible at:

- **Frontend**: https://slot-swapper-frontend-theta.vercel.app/
- **Backend**: https://slot-swapper-backend-qk12.onrender.com/

## Repository Links

- **Frontend**: https://github.com/srisubaramb/slot-swapper-frontend
- **Backend**: https://github.com/srisubaramb/slot-swapper-backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes as part of the ServiceHive SDE Assignment.
