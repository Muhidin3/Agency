import mongoose from 'mongoose'


const dashboardSchema = new mongoose.Schema({
    numberOfWorkers:Number,
    numberOfArabs:Number,
    sampleCountries:Array,
    sampleArabs:Array,
    sampleWorkers:Array,

})
const Dashboard = mongoose.model('Dashboard',dashboardSchema)

export default Dashboard