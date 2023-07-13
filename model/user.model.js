const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const logoutSchema = mongoose.Schema(
  {
    token: String,
  },
  {
    versionKey: false,
  }
);

   
const postSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  department: {
    type: String,
    enum: ["Tech", "Marketing", "Operations"],
  },
  salary: Number,
});

//model
const userModel = mongoose.model("user", userSchema);
const logoutModel = mongoose.model("blacklist", logoutSchema);

const postModel= mongoose.model("post", postSchema);

module.exports = {
  userModel,
  logoutModel,
  postModel
};
