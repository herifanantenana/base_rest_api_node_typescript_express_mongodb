import mongoose, { Error } from "mongoose";

const errorHandler = (error: Error): void => {
  switch (error.name) {
    case "MongoParseError":
      console.error(` 🚨 Database connection error\n ${error.name}: Invalid scheme ❌\n 📔 Please check your connection string to start with "mongodb://" or "mongodb+srv://"`);
      process.exit(1);
    case "MongoNetworkError":
      console.error(` 🚨 Database connection error\n ${error.name}: Network error ❌`);
      process.exit(1);
    default:
      console.error(` 🚨 Database connection error\n ${error.name}: ${error.message} ❌`);
      process.exit(1);
  }
}

const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    const uri = process.env.MONGODB_URI_COMPASS || "";
    await mongoose.connect(uri);
    console.log(` 🚀 Connected to the database ${mongoose.connection.db.databaseName.toUpperCase()} ✅`);
  } catch (error: any) {
    errorHandler(error);
  }
}

export { 
  connectToMongoDB 
};