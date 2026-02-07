# 🚀 StayHub Quick Start Guide

## Quick Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd stayhub
npm install
```

### Step 2: Setup Environment Variables
Create a `.env` file in the root directory:

```env
CLOUD_NAME=demo_cloud
CLOUD_API_KEY=123456789012345
CLOUD_API_SECRET=abcdefghijklmnopqrstuvwxyz123
MAP_TOKEN=pk.your_mapbox_token_here
ATLASDB_URL=mongodb://127.0.0.1:27017/stayhub
SECRET=mysupersecretcode
```

### Step 3: Start MongoDB (if running locally)
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### Step 4: Run the Application
```bash
npm start
```

Visit: http://localhost:8080

## 🎯 Testing Without API Keys

For quick testing, you can use these temporary settings:

1. **Skip Cloudinary** (temporary): Comment out image upload temporarily
2. **Use Local MongoDB**: Use `mongodb://127.0.0.1:27017/stayhub`
3. **Skip Mapbox** (temporary): Maps won't show but app will work

## 📝 Required API Keys (Free Tier)

### 1. Cloudinary (Required for Image Uploads)
- Sign up: https://cloudinary.com/users/register/free
- Free tier: 25GB storage, 25GB bandwidth
- Get keys from Dashboard

### 2. Mapbox (Required for Maps)
- Sign up: https://account.mapbox.com/auth/signup/
- Free tier: 50,000 map loads/month
- Create token from Account → Tokens

### 3. MongoDB Atlas (Optional - for cloud database)
- Sign up: https://www.mongodb.com/cloud/atlas/register
- Free tier: 512MB storage
- Create cluster → Connect → Get connection string

## 🎨 First User Setup

1. Go to http://localhost:8080
2. Click "Sign Up"
3. Create your account
4. Copy your User ID from MongoDB
5. Update `init/index.js` with your User ID
6. Run: `node init/index.js` to add sample data

## 🐛 Common Issues

### Port Already in Use
```bash
# Change port in app.js or kill the process
lsof -ti:8080 | xargs kill -9  # Mac/Linux
```

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
sudo systemctl status mongod  # Mac/Linux
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

1. Read the full README.md for detailed documentation
2. Customize the app (colors, branding, features)
3. Add your own sample data in `init/data.js`
4. Deploy to Render or Heroku

## 💡 Pro Tips

- Use nodemon for development: `npm run dev`
- Keep your `.env` file secure (never commit it!)
- Test locally before deploying
- Use MongoDB Compass to view your database

## 🆘 Need Help?

- Check the README.md for detailed instructions
- Review the code comments
- Check Express.js docs: https://expressjs.com/
- Check MongoDB docs: https://docs.mongodb.com/

Happy Coding! 🎉
