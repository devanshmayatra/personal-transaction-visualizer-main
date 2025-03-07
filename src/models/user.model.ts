import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  },
  budgets: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Budget'
      }
    ],
    default: []
  },
  transactions: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
      }
    ],
    default: []
  },
  provider: {
    type: String,
    default: "credentials",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  }
}, {
  timestamps: true
})

export const AccountUserModel = models.AccountUser || model("AccountUser", userSchema);


// isVerified: {
//   type: Boolean,
//   default: false,
// },
// forgotPasswordToken:String,
// forgotPasswordExpires:Date,
// verifyToken:String,
// verifyTokenExpiry:Date,
