import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalsService from "../goals/goalService"

const initialState = {
  goals : [],
  isLoading : false,
  isSuccess: false,
  isError: false,
  message : '',
  
}

// Create Goals
export const createGoal = createAsyncThunk('goals/create', async (goalsData, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token
    return goalsService.createGoal(goalsData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkApi.rejectWithValue(message)
  }
})

// Get Goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token
    return goalsService.getGoals(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkApi.rejectWithValue(message)
  }
})

// Create Goals
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token
    return goalsService.deleteGoal(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkApi.rejectWithValue(message)
  }
})

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, state => {
        state.isLoading = true
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals.push(action.payload)
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message =action.payload
      })
      .addCase(getGoals.pending, state => {
        state.isLoading = true
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = action.payload
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message =action.payload
      })
      .addCase(deleteGoal.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.goals = state.goals.filter(goal=>goal._id !== action.payload.id)
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message =action.payload
      })
  }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer