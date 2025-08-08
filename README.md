# Storage Management System API Documentation

## Base URL: https://storage-management-system-one.vercel.app

## Local Setup

1. **Clone Repository**
```bash
git clone https://github.com/MdShafiqulSaymon/Storage-Management-System.git
cd storage-management-system
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Create `.env` file in root directory with your credentials

4. **Run Development Server**
```bash
npm run dev
```

5. **Local URL:** http://localhost:5000

---
**Test User Credentials:**
```json
{
  "username": "SAM",
  "email": "mdshafiqulsaymon@gmail.com",
  "password": "password123"
}
```

---

## Authentication APIs

### 1. Sign Up
- **POST** `/api/auth/signup`
- **Body:**
```json
{
  "username": "SAM",
  "email": "mdshafiqulsaymon@gmail.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### 2. Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "mdshafiqulsaymon@gmail.com",
  "password": "password123"
}
```
- **Response:** Returns JWT token (use for authenticated routes)

### 3. Forgot Password
- **POST** `/api/auth/forgot-password`
- **Body:**
```json
{
  "email": "mdshafiqulsaymon@gmail.com"
}
```
- **Note:** **Email will be sent to user's email address. CHECK SPAM FOLDER if not in inbox.**

### 4. Reset Password
- **POST** `/api/auth/reset-password`
- **Body:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "newPassword123"
}
```

---

## User Profile APIs (Requires Authentication)

### 5. Get Profile
- **GET** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`

### 6. Update Profile
- **PUT** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "username": "SAM_Updated",
  "email": "newemail@gmail.com"
}
```

### 7. Change Password
- **PUT** `/api/users/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "currentPassword": "newPassword123",
  "newPassword": "password123"
}
```

---

## File Management APIs (Requires Authentication)

### 8. Upload File
- **POST** `/api/files/upload`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Form-data with key `file` (select file)

### 9. Create Note
- **POST** `/api/files/notes`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "title": "My Note",
  "content": "This is my note content"
}
```

### 10. Get All Files
- **GET** `/api/files/all`
- **Headers:** `Authorization: Bearer <token>`

### 11. Get All Images
- **GET** `/api/files/images`
- **Headers:** `Authorization: Bearer <token>`

### 12. Get All PDFs
- **GET** `/api/files/pdfs`
- **Headers:** `Authorization: Bearer <token>`

### 13. Get All Notes
- **GET** `/api/files/notes`
- **Headers:** `Authorization: Bearer <token>`

### 14. Get File by ID
- **GET** `/api/files/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/files/65abc123def456789`

### 15. Delete File
- **DELETE** `/api/files/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/files/65abc123def456789`

---

## Calendar/Date APIs (Requires Authentication)

### 16. Get Files by Date
- **GET** `/api/files/date/:date`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/files/date/2025-08-07`

### 17. Get Files by Date Range
- **GET** `/api/files/date-range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/files/date-range?startDate=2025-08-01&endDate=2025-08-31`

### 18. Get Calendar View (Monthly)
- **GET** `/api/files/calendar?year=YYYY&month=MM`
- **Headers:** `Authorization: Bearer <token>`
- **Example:** `/api/files/calendar?year=2025&month=8`

---

## Static Content APIs (No Authentication Required)

### 19. About Us
- **GET** `/api/static/about`

### 20. Support Info
- **GET** `/api/static/support`

### 21. Terms and Conditions
- **GET** `/api/static/terms`

---

## Health Check

### 22. API Health
- **GET** `/api/health`
- **Response:** API status and timestamp

---

## Quick Start

1. **Sign up** with the test credentials
2. **Login** to get JWT token
3. Use token in `Authorization: Bearer <token>` header for protected routes
4. Test file upload, view, and delete operations

## Postman Setup

1. Set environment variable:
   - `baseUrl`: `https://storage-management-system-one.vercel.app`
   - `token`: (save after login)

2. For file upload:
   - Select `Body` → `form-data`
   - Key: `file`, Type: `File`
   - Select your file

## Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

**Deployed on Vercel:** https://storage-management-system-one.vercel.app
