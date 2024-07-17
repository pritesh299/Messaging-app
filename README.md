# WhatsApp Clone

A WhatsApp clone, with basic messaging  app features.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Real-time Messaging:** Send and receive messages instantly.
- **Profile Management:** Update profile picture, status, and more.
- **Secure Authentication:** User authentication with JWT.

## Upcoming Features
- **Calling and video calling:** call any of your contacts through this app.
- **End to End Encrypted messages:** message are encrypted to protect user privacy.
- **Oauth/Google account integration:** access you accoutn directly uisng google email.
## Demo

Check out a live demo of the project [here](https://youtu.be/wEudtHxDDOU).

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js
- npm or yarn
- MongoDB 

### Backend

1. Clone the repository:
    ```sh
    git clone https://github.com/pritesh299/Whatsapp-messaging_app_clone.git
    cd whatsapp-clone/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the `backend` directory and add  the necessary environment variables.
    ```
    MONGO_URI="your mongo db url"
    JWT_SECRET="your_jwt_secret"
    APP_ORIGIN_URL="your front-end url" example:localhost:5173
    ```

4. Start the server:
    ```sh
    npm run dev
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
   
    ```
3. Configure environment variables:
    Create a `.env` file in the `backend` directory and add  the necessary environment variables.
     ```
        REACT_APP_SERVER_LINK="your server link"
    ```
4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and go to `your front-end url` (or the appropriate port if configured differently).
2. Register a new account or log in with an existing one.
3. Start messaging!

## Technologies Used

- **Frontend:** React,Tailwind-css,Typescript
- **Backend:** Node.js, Express, [any other libraries]
- **Database:** MongoDB
- **Authentication:** JWT
- **Real-time Communication:** Socket.io

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

