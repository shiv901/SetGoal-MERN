const asyncHandler = require('express-async-handler');

// @desc    Get Goals
// @routes  GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res, next) => {
  res.status(200).json({message: 'Get Goals'});
})

// @desc    Set Goals
// @routes  POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res, next) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('please provide a text field')
  }
  res.status(200).json({message: 'Set Goal'});
})

// @desc    Update Goals
// @routes  PUT /api/goals
// @access  Private
const updateGoals = asyncHandler(async (req, res, next) => {
  res.status(200).json({message: `Update Goal with ${req.params.id}`});
})

// @desc    Delete Goals
// @routes  DELETE /api/goals
// @access  Private
const deleteGoals = asyncHandler(async (req, res, next) => {
  res.status(200).json({message: `Delete Goal with ${req.params.id}`});
})

module.exports = {getGoals, setGoals, updateGoals, deleteGoals}