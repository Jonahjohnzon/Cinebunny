import mongoose from "mongoose"

const mongoosedb = async()=>{
    try{
        const state = mongoose.connection.readyState
        if(state == 1)
        {
            return;
        }
        if(state == 2)
            {
                console.log("Connecting ...")
                return;
            }
        
        const con = await mongoose.connect(process.env.DB_MONGOURL,{
            dbName:"Lets",
            bufferCommands:true
        })
        console.log(`Mongo Connect: ${con.connection.host}`)
    }
    catch(err)
    {
        console.log("Error: ", err)
    }
}
export default mongoosedb