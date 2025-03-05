# Next.js Authentication App

This is a full-stack authentication system built with Next.js, using `shadcn/ui` for the UI and Nodemailer for email verification and password reset functionality.

## Features

- User Signup & Login
- Email Verification using Nodemailer
- Password Reset with email link
- Protected Routes
- Styled using `shadcn/ui`

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes
- **Database:** MongoDB
- **Email Service:** Nodemailer (Mailtrap for testing)

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/harshshukla2002/auth-nextjs.git
cd auth-nextjs
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGO_URI = mongodb+srv://harshshukla:harsh12@cluster0.ob6lhlw.mongodb.net/auth-nextjs?retryWrites=true&w=majority
TOKEN_SECRET = authnextjs
DOMAIN = http://localhost:3000
```

### 4. Configure Email Transporter

Update the `src/helpers/mailer.ts` file with the following Mailtrap configuration:

```ts
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "your name",
    pass: "your password",
  },
});
```

> **Note:** Mailtrap is used for testing emails. Use actual SMTP credentials in production.

### 5. Run the development server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Routes

- **POST** `/api/users/signup` - Register a new user
- **POST** `/api/users/login` - Authenticate user
- **POST** `/api/users/verifyemail` - Verify email
- **POST** `/api/users/forgotpassword` - Send password reset email
- **POST** `/api/users/verifypassword` - Reset password

## Folder Structure

```
/auth-nextjs
 ├── /src
 │   ├── /app
 │   │   ├── /api
 │   │   │   ├── /users            # User-related API routes
 │   │   │   │   ├── login.ts        # Login API
 │   │   │   │   ├── logout.ts       # Logout API
 │   │   │   │   ├── signup.ts       # Signup API
 │   │   │   │   ├── forgetpassword.ts # Password Reset Request API
 │   │   │   │   ├── verifyemail.ts  # Email Verification API
 │   │   │   │   ├── verifypassword.ts # Password Reset API
 │   │   │   │   ├── profile.ts      # User Profile API
 │   │   ├── login.tsx              # Login Page
 │   │   ├── logout.tsx             # Logout Page
 │   │   ├── signup.tsx             # Signup Page
 │   │   ├── forgetpassword.tsx     # Password Reset Page
 │   │   ├── verifyemail.tsx        # Email Verification Page
 │   │   ├── verifypassword.tsx     # Password Reset Confirmation Page
 │   │   ├── profile.tsx            # User Profile Page
 │   ├── /helpers                   # Utility functions
 │   │   ├── mailer.ts               # Email transport configuration
 │   ├── /models                    # Database models
 │   ├── middleware.ts               # Authentication middleware
 ├── .env.local                      # Environment Variables
 ├── next.config.js                   # Next.js Config
 ├── package.json                     # Dependencies
 └── README.md
```
