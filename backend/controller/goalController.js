const asyncHandler = require('express-async-handler');

const Goals = require('../models/goalModel')

// @desc    Get Goals
// @routes  GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goals.find()
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
    text: req.body.text
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
  await goal.remove()
  res.status(200).json({id: req.params.id});
})

module.exports = {getGoals, setGoals, updateGoals, deleteGoals}