const mongoose=require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },
    tasks:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
