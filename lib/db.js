import mongoose from "mongoose";

 const dbConnect =  async ()=>{
    if(mongoose.connect.readyState >= 1){
        console.log("Mongodb already connected...");
        return;
    }
   try {
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("Connected to MongoDB Succesfully");
   } catch (error) {
        console.log("error in establishing mongodb connction",error);
        process.exit(1); //Exit the process on falilure.
   }
}

// Add event listeners once (outside the function)
mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected.");
  });


  export default dbConnect