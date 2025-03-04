import { Schema, Document , models , model } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  date: string;
  description: string;
}

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String, 
    required: true, 
    enum: ["Food", "Rent", "Entertainment", "Transport", "Fashion", "Others"]
  },
}, {
  timestamps: true
});

const TransactionModel = models.Transaction || model<Transaction>("Transaction", transactionSchema);

export default TransactionModel;