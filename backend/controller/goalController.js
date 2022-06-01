const asyncHandler = require('express-async-handler');

const Goals = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get Goals
// @routes  GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goals.find({user: req.user.id})
  console.log(req.user.id)
  res.status(200).json(goals);
})

// @desc    Set Goals
// @routes  POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res, next) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('please provide a text field')
  }
  let goal = await Goals.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(goal);
})

// @desc    Update Goals
// @routes  PUT /api/goals
// @access  Private
const updateGoals = asyncHandler(async (req, res, next) => {
  let goal = await Goals.findById(req.params.id)
  if(!goal){
    res.status(400).json({message: 'Goal not found'})
  }

  // check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // check if user have authority
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }

  let updateGoals = await Goals.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json(updateGoals);
})

// @desc    Delete Goals
// @routes  DELETE /api/goals
// @access  Private
const deleteGoals = asyncHandler(async (req, res, next) => {
  let goal = await Goals.findById(req.params.id)
  if(!goal){
    res.status(400).json({message: 'Goal not found'})
  }
  
  // check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // check if user have authority
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not Authorized')
  }
  
  await goal.remove()
  res.status(200).json({id: req.params.id});
})

module.exports = {getGoals, setGoals, updateGoals, deleteGoals}