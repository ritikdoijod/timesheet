import mongoose from "mongoose";
export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (!process.env.MONGODB_URL)
        return console.log("MONGODB_URL not found");
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
};
