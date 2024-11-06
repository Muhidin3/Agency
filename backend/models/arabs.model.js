import mongoose, { Schema } from 'mongoose'


const arabsSchema = new mongoose.Schema({
    name:String,
    country:{
        type:Schema.Types.ObjectId,
        ref:'country'
    }
},{
    timestamps:true
})
const Arab = mongoose.model('Arab',arabsSchema)

export default Arab