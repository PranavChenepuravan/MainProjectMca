import mongoose from "mongoose";
import pilgrim from './user.js'
import User from "./user.js";

let bookingSchema=mongoose.Schema(
    {
        pilgrimId:{
            type:mongoose.Types.ObjectId,
            ref:pilgrim
        },
        institutionId:{
            type:mongoose.Types.ObjectId,
            ref:User
        },
        date:{
            type:String
        },
        time:{
            type:String
        },
        amount:{
            type:String
        }

    }
)

let Booking=mongoose.model('booking', bookingSchema)
export default Booking