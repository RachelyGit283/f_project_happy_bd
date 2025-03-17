const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        required: true,
        trim: true,
    },
    rolesUser: {
        type: String,
        default: 'owner',
        enum: ['manager', 'owner', 'managerParkinglot'],
    },
    idUser: {
        type: String,
        required: true,
        trim: true,
        maxLength: 9,
        minLength: 9,
        unique: true
    },
    emailUser: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    passwordUser: {
        type: String,
        required: true,
        unique: true

    },
    phoneUser: {
        type: String
    },
    carsUser:  [{
                type: mongoose.ObjectId,
                ref: 'Cars',
            }]  ,
            default:[]    
              
}, {
    timestamps: true
})
module.exports = mongoose.model('Users', usersSchema)