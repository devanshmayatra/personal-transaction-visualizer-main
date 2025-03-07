import { Schema, models, model } from "mongoose";

const BudgetSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  }, // Format: "YYYY-MM"
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true
});

export const BudgetModel = models.Budget || model("Budget", BudgetSchema);

