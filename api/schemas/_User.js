'use strict'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    userContactNumber: { type: String, required: true },
    userVerify: { type: Boolean, required: true, default: false },
    verifyHash: { type: String, required: true },
    userReferralCode: {
      type: String,
      required: true
    },
    referralCodeUsed: { type: String },
    referred: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        referredAt: { type: Date, default: Date.now }
      }
    ],
    wallet: {
      type: Number,
      default: 0,
      required: true
    }
  },
  { timestamps: { createdAt: 'created_at' } }
)

userSchema.pre('save', function (next) {
  const user = this
  console.log('HERE')
  if (this.isModified('userPassword') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.userPassword, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.userPassword = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

const User = mongoose.model('User', userSchema)

export default User
