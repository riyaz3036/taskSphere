const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  repeat:{
    type: Boolean,
    required: true,
  },
  important:{
    type: Boolean,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
