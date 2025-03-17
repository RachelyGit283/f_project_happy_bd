const mongoose = require('mongoose')
const carsSchema = new mongoose.Schema({
    numberCar: {
        type: String,
        required: true,
        trim: true,
        maxLength: 9,
        minLength: 8,
        unique: true
    },
    isParkingCar: {
        type: Boolean,
        default: false
     },
     //    isHandicappedCar: {
    //         type: Boolean,
    //         default: false
    //     },
    // handicappedCar: {
   
        idHandicappedCar:
        {
            type: String,
            trim: true,
            unique: true,
            default: ""
        },
    // },
    userCar: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Users'
    },
    // isUseCar: {
    //     type: Boolean,
    //     default: false
    // },
    // handicappedCar: {
    //     isHandicappedCar: {
    //         type: Boolean,
    //         default: false
    //     },
    //     idHandicappedCar:
    //     {
    //         type: String,
    //         trim: true,
    //         unique: true,
    //         default: ""
    //     }
    // }, 
    //  ownerCar: {
    //     type: mongoose.ObjectId,
    //     required: true,
    //     ref: 'Owners'
    // },
     // parkCar: {
    //     type: mongoose.ObjectId,
    //     ref: 'Park'
    // },
    // idOwner:{
    //     type:String,
    //     required:true,
    //     trim:true,
    //     lowercase:true,
    //     unique:true,
    //     immutable:true
    // },
    // password:{
    //     type:String,
    //     required:true
    //     },
    sizeCar: {
        type: String,
        default: '5',
        enum: ['2', '5', '7', 'Bus', 'MiniBus', 'LorgCar', '7+'],
    },
   
   

}, {
    timestamps: true
})
module.exports = mongoose.model('Cars', carsSchema)