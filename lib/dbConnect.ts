import mongoose from "mongoose";

type ConnectionObj={
    connectStatus?:number;
}

const connection:ConnectionObj={};

async function dbConnect():Promise<void>{
    if(connection.connectStatus===1){
        console.log("Database is already connected");
        return;
    }
    try{
        const db=await mongoose.connect(process.env.MONGODB_URI||"",{});
        connection.connectStatus=db.connections[0].readyState;
        console.log("Database sucessfully connected");
    }
    catch(error){
        console.log("Error connecting to database",error);
        process.exit(1);
    }
}
export default dbConnect;