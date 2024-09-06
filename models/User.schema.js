import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  image: String,
  emailVerified: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // ... other fields
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;