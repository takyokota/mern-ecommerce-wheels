const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    // fName: { type: String, required: true },
    // lName: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      User: { type: Number, default: 3001 },
      Dealer: { type: Number },
      Admin: { type: Number }
    },
    // shippingAddress: {
    //   street: { type: String, required: true },
    //   city: { type: String, required: true },
    //   state: { type: String, required: true },
    //   zip: { type: String, required: true }
    // },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);