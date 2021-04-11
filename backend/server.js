// in order to use ES module, put "type": "module" in package.json in the root folder
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import connectToDatabase from './config/db.js'

// Routes
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectToDatabase()

const app = express()

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Cakeshop server is running...')
})

// mount the routes
app.use('/cakeshop/products', productRoutes)
app.use('/cakeshop/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))