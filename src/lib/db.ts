import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) throw new Error("MONGODB_URI is missing in .env");

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } 
};
const cached = (globalWithMongoose.mongoose ??= { conn: null, promise: null });



export async function connectDB() {
  if (cached.conn) return cached.conn;
  try {
    cached.promise ??= mongoose.connect(MONGODB_URI, { bufferCommands: false });
    cached.conn = await cached.promise;
    console.log(" MongoDB connected:", cached.conn.connection.name);
  } catch (err) {
    cached.promise = null;
    console.error(" MongoDB connection failed:", err);
    throw err;
  }
  return cached.conn;
}