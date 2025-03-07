import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing in environment variables");

const options = {};
let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
