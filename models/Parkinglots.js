const mongoose = require('mongoose')
const parkinglotsSchema = new mongoose.Schema({
    nameParkinglot: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    // isFullParkinglot: {
    //     type: Boolean,
    //     default: false
    // },
    // carsInParkinglot: {
    //     type: Number,
    //     default: false,
    //     min: 0,
    //     max: sizeParkinglot
    // },
    managerParkinglot: {
        type: mongoose.ObjectId,
        ref: 'Users'
    },

    locationParkinglot: {
        country: {
            type: String,
            lowercase: true,



        },
        city: {
            type: String,
            lowercase: true,


        },

        street: {
            type: String,
            lowercase: true,


        },
        numberOfStreet: {
            type: Number,
            min: 1
        }

    },
    allParkinglot:
        [{
            type: mongoose.ObjectId,
            ref: 'Parkings'
        }]
    ,
    sizeParkinglot: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Parkinglots', parkinglotsSchema)