# MERN Stack Backend

A complete MERN stack backend starter with authentication, MongoDB, and Express.

## Features

- ✅ Express.js server setup
- ✅ MongoDB integration with Mongoose
- ✅ User authentication (JWT)
- ✅ Password hashing with bcrypt
- ✅ Protected routes middleware
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Environment variables setup

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── authController.js     # Auth logic
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── errorMiddleware.js    # Error handling
├── models/
│   └── User.js               # User model
├── routes/
│   └── authRoutes.js         # Auth endpoints
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
├── server.js                 # Entry point
└── README.md
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string
- `PORT` - Server port (default: 5000)
- `CORS_ORIGIN` - Your frontend URL

### 3. Start MongoDB

**Local MongoDB:**
```bash
# Make sure MongoDB is running on your system
```

**MongoDB Atlas:**
1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |

### Example Requests

**Register:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Profile (Protected):**
```bash
GET /api/auth/profile
Authorization: Bearer <your_jwt_token>
```

## Adding New Features

### Create a New Model

Create a file in `models/` folder:

```javascript
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ... other fields
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);
```

### Create a Controller

Create a file in `controllers/` folder:

```javascript
import Item from '../models/Item.js';

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

### Create Routes

Create a file in `routes/` folder:

```javascript
import express from 'express';
import { getItems } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getItems);

export default router;
```

### Register Routes in server.js

```javascript
import itemRoutes from './routes/itemRoutes.js';
app.use('/api/items', itemRoutes);
```

## Next Steps

1. Set up your frontend React app
2. Add more models and routes as needed
3. Implement additional features:
   - Password reset
   - Email verification
   - File uploads
   - Pagination
   - Search/filtering
4. Add validation with express-validator
5. Implement rate limiting
6. Add API documentation (Swagger/Postman)

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

## License

ISC
