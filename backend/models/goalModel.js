const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
  text: {
    type: String,
    requied: [true, 'Please enter a text field'],
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)