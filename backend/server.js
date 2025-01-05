const express = require ('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const bodyParser = require('body-parser')
const port = process.env.PORT 
connectDb()
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/posts',require('./routes/postsRoutes') )
app.use('/api/users',require('./routes/userRoutes') )
app.listen(port, () => console.log(`server started on port ${port}`))
const fs = require('fs');
const path = require('path');

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Uploads directory created!');
} else {
  console.log('Uploads directory already exists.');
}
