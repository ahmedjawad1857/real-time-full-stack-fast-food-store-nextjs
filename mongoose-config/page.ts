// app/mongoose-config/page
import mongoose from "mongoose";

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

const mongooseConnection = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      return;
    }
    const mongodb = await mongoose.connect(process.env.MONGODB_URL || " ");

    connection.isConnected = mongodb.connections[0].readyState as number;

    console.log("mongoose connected!");
  } catch (e: any) {
    console.log("mongoose connection error", e.message);
  }
};

export default mongooseConnection;
