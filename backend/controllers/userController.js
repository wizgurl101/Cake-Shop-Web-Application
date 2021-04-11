import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

/**
 * @desc Authenicaiton of user login
 * @route POST /cakeshop/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const validUser = await User.findOne({ email })
    const validPassword = await validUser.matchPassword(password)

    if(validUser && validPassword) {
        res.json({
            _id: validUser._id,
            name: validUser.name,
            email: validUser.email,
            isAdmin: validUser.isAdmin,
            token: generateToken(validUser._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('Email is already taken.')
    }

    const newUser = await User.create({ name, email, password })

    if(newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid input')
    }
})

/**
 * @desc Get all users in the database
 * @route GET /cakeshop/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

/**
 * @desc Get all users in the database
 * @route GET /cakeshop/users
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    const userExists = await User.findById(req.params.id)

    if(userExists) {
        await userExists.remove()
        res.json({ message: 'User deleted'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/**
 * @desc Update user info
 * @route PUT /cakeshop/users/:id
 * @access Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        // if req.body.name is undefined, user did not change name
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email 
        user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin

        // update the user information
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
        
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/**
 * @desc Get user by id
 * @route GET /cakeshop/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { 
    authUser, 
    registerUser,
    getUsers,
    deleteUser,
    updateUser,
    getUserById 
} 