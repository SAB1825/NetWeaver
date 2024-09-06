import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  emailVerified: Date,
  username: {
    type: String,
    unique: true,
    sparse: true, // This allows the field to be optional but unique when present
  },
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
mongoose.models = {};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;