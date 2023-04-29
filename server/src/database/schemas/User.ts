import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Contact'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

User.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
  next()
})

export default mongoose.model('User', User);