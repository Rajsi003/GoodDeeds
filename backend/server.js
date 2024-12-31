const express = require ('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT 
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/posts',require('./routes/postsRoutes') )
app.listen(port, () => console.log(`server started on port ${port}`))