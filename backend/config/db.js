// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect("mongodb+srv://nishantjtiwari:902170%40MongoDB@cluster0.yoold.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
// //     mongoose.connect("mongodb+srv://nishantjtiwari:<902170%40MongoDB>@cluster0.yoold.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// //    .then(() => console.log("✅ Connected to MongoDB"))
// //    .catch(err => console.error("❌ MongoDB connection error:", err.message));
//   } catch (err) {
//     console.error("Mongo connection failed", err);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
     process.env.MONGODB_URI
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ Mongo connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;

