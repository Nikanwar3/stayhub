# StayHub — Full-Stack Holiday Rentals Platform

A modern full-stack vacation rental platform built with **React**, **Node.js**, **Express**, and **MongoDB**. Browse listings, leave reviews, and explore locations on interactive maps.

![StayHub](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen) ![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## ✨ Features

- **React SPA Frontend** with React Router for seamless navigation
- **JWT Authentication** with secure HTTP-only cookies
- **CRUD Operations** for property listings with image uploads
- **Review System** with star ratings and user-specific delete
- **Interactive Maps** using Leaflet.js with OpenStreetMap geocoding
- **Image Uploads** via Cloudinary with Multer middleware
- **Server-side Validation** using Joi schemas
- **Authorization** — only listing owners can edit/delete their properties
- **Responsive Design** — works on mobile, tablet, and desktop
- **Search & Filter** — find listings by name, city, or country

## 🛠️ Tech Stack

### Frontend
- **React** with Vite
- **React Router** for client-side routing
- **Axios** for API communication
- **React-Leaflet** for interactive maps
- **Context API** for state management

### Backend
- **Node.js** + **Express** RESTful API
- **MongoDB** + **Mongoose** for data persistence
- **JWT** (JSON Web Tokens) for authentication
- **Joi** for server-side validation
- **Multer** + **Cloudinary** for image uploads
- **bcrypt.js** for password hashing

## 📁 Project Structure

```
stayhub/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # API service layer (Axios)
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app with routing
│   │   └── App.css         # Global styles
│   └── index.html
├── server/                 # Express API backend
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── middlewares.js       # Auth & validation middleware
│   ├── cloudConfig.js      # Cloudinary configuration
│   ├── schemaValidation.js # Joi validation schemas
│   └── app.js              # Server entry point
└── package.json            # Root scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account

### 1. Clone & Install

```bash
git clone https://github.com/Nikanwar3/stayhub.git
cd stayhub
npm run install:all
```

### 2. Environment Variables

Create `server/.env`:

```
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
ATLASDB_URL=mongodb://127.0.0.1:27017/stayhub
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### 3. Run Development

```bash
npm run dev
```

This starts both:
- **Server**: http://localhost:8080
- **Client**: http://localhost:5173

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Listings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get all listings |
| GET | `/api/listings/:id` | Get single listing |
| POST | `/api/listings` | Create listing (auth) |
| PUT | `/api/listings/:id` | Update listing (owner) |
| DELETE | `/api/listings/:id` | Delete listing (owner) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/listings/:id/reviews` | Add review (auth) |
| DELETE | `/api/listings/:id/reviews/:reviewId` | Delete review (author) |

## 📄 License

ISC