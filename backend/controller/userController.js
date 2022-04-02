const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @desc    Register new User
// @routes  POST /api/users/
// @access  Public
const signupUser = asyncHandler( async (req, res) => {
  const {name, email, password} = req.body

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please provide all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }
  
  // Hashing password
  const hashedPass = await bcrypt.hash(password, 8)

  const user = await User.create({name, email, password: hashedPass})

  if(user) {
    res.status(201).json({
      _id: user.id, 
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else{
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a User
// @routes  POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
  const {email, password} = req.body

  // Check if user exists
  const user = await User.findOne({email: email})

  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id, 
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get User data
// @routes  PUT /api/users/me
// @access  Public
const getUser = asyncHandler( async (req, res) => {
  const {id, email, name} = await User.findById(req.user.id)
  
  res.status(200).json({id, name, email})
})

// Generate JWT
const generateToken = id =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  }) 
}

module.exports = {signupUser, loginUser, getUser}