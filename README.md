# FitCentre - Member Management System

A web-based fitness centre member management system built as an MVP for tracking and managing member profiles.

## Tech Stack

- **Frontend:** ReactJS (Vite)
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://dev.mysql.com/downloads/installer/) (v8.0)
- [Git](https://git-scm.com/)

## Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/yusyarizAssessment/IM-fitness-MVP.git
cd IM-fitness-MVP
```

### 2. Database Setup

Open MySQL Workbench and connect to your local MySQL server. Run the following SQL to create the database and tables:
```sql
CREATE DATABASE IF NOT EXISTS fitness_centre;
USE fitness_centre;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    membership_type ENUM('Basic', 'Standard', 'Premium') DEFAULT 'Basic',
    membership_status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    join_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Next, generate a bcrypt hash for the admin password by running this in your terminal from the backend folder:
```bash
cd backend
node -e "const b = require('bcryptjs'); b.hash('password', 10).then(h => console.log(h))"
```

Copy the generated hash and run this in MySQL Workbench:
```sql
INSERT INTO users (username, password) VALUES ('admin', 'PASTE_HASH_HERE');
```

### 3. Backend Setup

Navigate to the backend folder:
```bash
cd backend
```

Create a `.env` file inside the `backend/` folder with the following content:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=fitness_centre
JWT_SECRET=fitness_centre_secret_key
PORT=5000
```

Replace `your_mysql_password` with your actual MySQL root password. Then install dependencies and start the server:
```bash
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal and run:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

## Login Credentials

| Username | Password |
|----------|----------|
| admin    | password |

## Features

- Secure login with JWT authentication
- View all fitness centre members
- Add new members
- Edit existing member profiles
- Delete members
- Search members by name, email or membership type
- Responsive design for desktop and mobile

## Excel Import Feature

A sample Excel template is provided in the `samples/` folder. Download `members_template.xlsx` and use it directly to test the bulk import feature via the **Import Excel** button on the dashboard.

If you want to add your own data, open the template and fill in your member data following the same format. Make sure the column headers remain exactly as they are.

### Excel Column Format

| Column | Accepted Values |
|--------|----------------|
| full_name | Any text |
| email | Valid email address |
| phone | Any text |
| date_of_birth | YYYY-MM-DD format (e.g. 1990-05-15) |
| gender | Male, Female, Other |
| membership_type | Basic, Standard, Premium |
| membership_status | Active, Inactive, Suspended |
