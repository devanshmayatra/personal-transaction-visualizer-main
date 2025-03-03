import mongoose , { Schema , Document } from "mongoose";

export interface Transaction extends Document {
  amount: number;
  date: string;
  description: string;
}

const transactionSchema = new Schema({
  amount: {
    type:Number,
    required:true,
  },
  date:{
    type:Date,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
},{
  timestamps:true
});

const TransactionModel = mongoose.models.Transaction || mongoose.model<Transaction>("Transaction", transactionSchema);

export default TransactionModel;