import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/EasyMedDb`);
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        
    }
};

export default connectDb;
