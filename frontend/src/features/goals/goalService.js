import axios from "axios";

const APP_URL = '/api/goals/'

// Create a goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.post(APP_URL, goalData, config)
  return response.data
}

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.get(APP_URL, config)
  return response.data
}

// Delete user goal
const deleteGoal = async (goalId,token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }
  const response = await axios.delete(APP_URL + goalId, config)
  return response.data
}

const goalService = {createGoal, getGoals, deleteGoal}

export default goalService