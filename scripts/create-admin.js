require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Database connection
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection
  }
  
  return mongoose.connect(MONGODB_URI)
}

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Don't return password in JSON
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject()
  delete userObject.password
  return userObject
}

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function createAdmin() {
  try {
    console.log('Connecting to database...')
    await connectDB()
    console.log('Connected to database')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@coaching.com' })
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email)
      process.exit(0)
    }

    // Create admin
    const admin = new User({
      name: 'Admin',
      email: 'admin@coaching.com', // Change this to your desired email
      password: 'admin123', // Change this to your desired password
      role: 'admin'
    })

    await admin.save()

    console.log('✅ Admin created successfully!')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Password: admin123')
    console.log('👑 Role:', admin.role)
    console.log('')
    console.log('⚠️  IMPORTANT: Please change the password after first login!')
    console.log('🌐 Access admin panel at: http://localhost:3001/admin/login')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()
