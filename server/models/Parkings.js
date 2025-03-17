const mongoose = require('mongoose')
const parkingsSchema = new mongoose.Schema({
    locationParking: {
        type: String,
        required: true,
        trim: true
    },
    isFullParking: {
        type: Boolean,
        default: false
    },
    isHandicappedParking: {
        type: Boolean,
        default: false
    },
    parkinglotOfParking: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Parkinglots'
    },
    sizeParking: {
        type: String,
        default: '5',
        enum: ['2', '5', '7', 'Bus', 'MiniBus', 'LorgCar', '7+'],
    },
    carParking: {
        type: mongoose.ObjectId,
        ref: 'Cars'
    },
    intrestedParking: [{
        type: mongoose.ObjectId,
        ref: ['Cars']
    }],
    timeStartParking: {
        type: Date
    },
    priceParking: {
        type: Number
    },
}, {
    timestamps: true
})
parkingsSchema.index({ locationParking: 1, parkinglotOfParking: 1 }, { unique: true });
module.exports = mongoose.model('Parkings', parkingsSchema)