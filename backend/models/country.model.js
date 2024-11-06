import mongoose from 'mongoose'


const countrySchema = new mongoose.Schema({
    name:String,
},{
    timestamps:true
})
const Country = mongoose.model('Country',countrySchema)

export default Country