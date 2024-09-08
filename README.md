
# Live Music Booking CRM
![Screenshot 2024-09-07 212132](https://github.com/user-attachments/assets/b9050048-d53b-4958-8cd3-19d0a58af0c8)


## Overview
The Live Music Booking CRM is a web application designed to manage live music event bookings between independent venues and performing artists or bands. It allows users to create, update, and manage bookings, track sales and event performance data, and provides various optional features such as user roles, automated notifications, and advanced analytics.

## Features

- **Booking Management**: Seamless creation, updating, and tracking of event bookings.
- **Sales and Performance Tracking**: Enter and store food, beverage sales, and event performance data.
- **Authentication**: User registration and login with role-based access.
- **Database Integration**: PostgreSQL database for storing user and booking data.
- **Optional Features**:
  - POS API integration for automatic sales updates.
  - Automated notification system for bookings.
  - Advanced analytics and reporting tools.
  - Customizable booking forms and templates.
  - User roles and permissions management.
  - Mobile app compatibility.

## Tech Stack

- **Frontend**: (To be developed) React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **ORM**: Sequelize
- **Environment Management**: dotenv

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/live-music-booking-crm.git
   cd live-music-booking-crm
   ```

2. **Install Backend Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `server` directory with the following content:

   ```plaintext
   DATABASE_URL=postgres://username:password@localhost:5432/music_booking
   SECRET_KEY=your_jwt_secret_key
   PORT=5000
   ```

   Replace `username`, `password`, and `your_jwt_secret_key` with your actual PostgreSQL credentials and a secret key.

4. **Set Up the Database**

   Ensure PostgreSQL is running and create the `music_booking` database:

   ```bash
   psql -U yourusername -c "CREATE DATABASE music_booking;"
   ```

5. **Run the Backend Server**

   Start the server:

   ```bash
   node server.js
   ```

   The backend server should now be running on `http://localhost:5000`.

## API Endpoints

### Authentication

- **Register a New User**

  ```http
  POST /api/auth/register
  ```

  **Request Body:**

  ```json
  {
    "username": "example",
    "password": "password",
    "role": "user"
  }
  ```

- **Login User**

  ```http
  POST /api/auth/login
  ```

  **Request Body:**

  ```json
  {
    "username": "example",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "token": "your_jwt_token"
  }
  ```

## Future Development

- **Frontend Development**: To be implemented using React.js.
- **Mobile App Compatibility**: Planned using React Native.
- **Additional Features**: Advanced analytics, notifications, user roles, etc.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes you'd like to make.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

