"use strict";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = mongoose.Schema(
  {
    adminName: { type: String, minLength: 4, required: true },
    adminRole: {
      type: String,
      enum: ["SUPER ADMIN", "FOUNDER", "OPERATIONS", "CAMPUS AMBASSADOR"],
      required: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    apiSecretKey: { type: String },
    accessRoutes: {
      type: [Number],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

adminSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const User = mongoose.model("Admin", adminSchema);

export default User;
