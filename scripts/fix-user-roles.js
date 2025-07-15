require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

// Database connection
const MONGODB_URI = process.env.MONGODB_URI

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }
  return mongoose.connect(MONGODB_URI)
}

// User Schema (simplified to match our current model)
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: String,
  isActive: Boolean,
  lastLogin: Date,
  createdBy: mongoose.Schema.Types.ObjectId
}, {
  timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function fixUserRoles() {
  try {
    console.log('Connecting to database...')
    await connectDB()
    console.log('Connected to database')

    // Find all users
    const users = await User.find({})
    console.log('Found users:', users.map(u => ({ email: u.email, role: u.role })))

    // Update any super_admin to admin
    const result = await User.updateMany(
      { role: 'super_admin' },
      { role: 'admin' }
    )

    console.log('Updated', result.modifiedCount, 'users from super_admin to admin')

    // Show updated users
    const updatedUsers = await User.find({})
    console.log('Updated users:', updatedUsers.map(u => ({ email: u.email, role: u.role })))

    process.exit(0)
  } catch (error) {
    console.error('❌ Error fixing user roles:', error)
    process.exit(1)
  }
}

fixUserRoles()
