# CMS Project

A full-stack Content Management System built with Node.js, Express, and MySQL, using server-rendered EJSviews. It handles user authentication, 
content/file management, and notifications via email and SMS.

 Features

-  **User Authentication** — secure login/signup with hashed passwords (bcrypt) and session-based auth
-  **Content Management** — create, read, update, and delete content through an admin interface
-  **File Uploads** — image/document uploads handled via Multer
-  **Email Notifications** — automated emails via Nodemailer (e.g. account verification, alerts)
-  **SMS Integration** — Twilio-powered SMS notifications
-  **Session & Flash Messaging** — persistent sessions with flash messages for user feedback
-  **JWT Support** — token-based auth for protected routes/APIs
-  **MySQL Database** — data modeling and queries via Sequelize ORM


Tech Stack
Runtime: Node.js
Framework: Express.js
Templating Engine: EJS
Database: MySQL + Sequelize ORM
Authentication: bcryptjs, express-session, jsonwebtoken (JWT)
File Uploads: Multer
Email Service: Nodemailer
SMS Service: Twilio
Development Tools: Nodemon, dotenv



## 📁 Project Structure


cms_project/
├── Controllers/     # Route logic / business logic
├── Routes/          # Express route definitions
├── config/          # DB and app configuration
├── middleware/       # Auth guards, error handling, etc.
├── model/           # Sequelize models
├── public/styles/   # Static assets (CSS)
├── services/        # Email, SMS, and other service integrations
├── uploads/         # Uploaded files
├── views/           # EJS templates
├── app.js           # App entry point
└── package.json



Getting Started

 Prerequisites
- Node.js (v16+ recommended)
- MySQL server running locally or remotely

### Installation


# Clone the repo
git clone https://github.com/Srishti-paudel/cms_project.git
cd cms_project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

 Environment Variables

Create a `.env` file in the root directory with:


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cms_project

SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token




Run the app

```bash
npm start
```

The app will be available at `http://localhost:3000` (or your configured port).

---



## 👤 Author

**Srishti Paudel**
- GitHub: [@Srishti-paudel](https://github.com/Srishti-paudel)
