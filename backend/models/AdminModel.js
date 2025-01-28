const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    admminid:{type:String,required:true},
    issuperadmin:{type:Boolean,required:true}
  }
);


const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
