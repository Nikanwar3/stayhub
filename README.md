# 🏠 StayHub - Holiday Rentals Platform

StayHub is a full-stack web application for booking vacation accommodations including houses, villas, and farmhouses. Users can browse properties, add their own listings, leave reviews, and view property locations on interactive maps.

## ✨ Features

- 🏡 **Property Listings**: Browse and search vacation properties
- 📝 **User Listings**: Add, edit, and delete your own properties
- ⭐ **Reviews & Ratings**: Rate and review properties
- 🗺️ **Interactive Maps**: View property locations using Mapbox
- 🔐 **Authentication**: Secure login/signup with Passport.js
- ☁️ **Image Storage**: Cloudinary integration for image hosting
- 📱 **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5
- EJS (Embedded JavaScript templates)
- Mapbox GL JS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (Authentication)

### Key Packages
- `multer` - File uploads
- `cloudinary` - Image hosting
- `joi` - Data validation
- `express-session` - Session management
- `connect-flash` - Flash messages
- `mapbox-sdk` - Geocoding

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stayhub.git
cd stayhub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Token
MAP_TOKEN=your_mapbox_public_token

# MongoDB
ATLASDB_URL=your_mongodb_atlas_connection_string

# Session Secret
SECRET=your_secret_session_key

# OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

### 4. Get API Keys

#### Cloudinary (Image Hosting)
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard

#### Mapbox (Maps)
1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Create an access token from your account dashboard

#### MongoDB Atlas
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string

### 5. Initialize Database (Optional)

To populate the database with sample listings:

```bash
node init/index.js
```

**Note**: Update the `owner` field in `init/index.js` with a valid user ID after creating your first user.

### 6. Run the Application

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The application will run on `http://localhost:8080`

## 📁 Project Structure

```
stayhub/
├── controllers/        # Route controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/            # Database models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/            # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/             # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   └── users/
├── public/            # Static files
│   ├── css/
│   └── js/
├── init/              # Database initialization
│   ├── data.js
│   └── index.js
├── utils/             # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── app.js             # Main application file
├── cloudConfig.js     # Cloudinary configuration
├── middlewares.js     # Custom middlewares
├── schemaValidation.js # Joi validation schemas
└── package.json
```

## 🔑 Key Features Implementation

### Authentication
- Local authentication using Passport.js
- Password hashing with passport-local-mongoose
- Session-based authentication

### Authorization
- Owner-based access control
- Protected routes for authenticated users
- Review author verification

### Image Upload
- Multer for handling multipart form data
- Cloudinary for cloud storage
- Image transformation and optimization

### Geocoding
- Mapbox Geocoding API integration
- Convert addresses to coordinates
- Display properties on interactive maps

### Validation
- Server-side validation with Joi
- Client-side validation with Bootstrap
- Error handling middleware

## 🌐 Deployment

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Add environment variables in the Render dashboard
4. Deploy!

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create stayhub-app

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set CLOUD_NAME=your_cloud_name
heroku config:set CLOUD_API_KEY=your_api_key
heroku config:set CLOUD_API_SECRET=your_api_secret
heroku config:set MAP_TOKEN=your_map_token
heroku config:set SECRET=your_secret

# Deploy
git push heroku main
```

## 📱 Usage

1. **Sign Up**: Create a new account
2. **Browse Listings**: View all available properties
3. **Add Listing**: Click "Add New Listing" to create your property
4. **View Details**: Click on any property to see full details, reviews, and map
5. **Leave Review**: Rate and comment on properties you've visited
6. **Manage Listings**: Edit or delete your own properties

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Your Name - [Your GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)
- [Passport.js](http://www.passportjs.org/)

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

Made with ❤️ by StayHub Team
