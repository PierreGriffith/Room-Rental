var mongoose = require("mongoose");
var Schema = mongoose.Schema;

 
var room_schema = new Schema({
  name: String,
  open: {type: Boolean, default: true},
  description: String,
  capacity:  Number,
  equipements: [],
  createdAt: String,
  updatedAt: String,
    
});

module.exports = mongoose.model("room", room_schema);