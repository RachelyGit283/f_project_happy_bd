// const mongoose = require('mongoose')
// const ownersSchema = new mongoose.Schema({

//     handicappedOwner: {
//         isHandicappedOwner: {
//             type: Boolean,
//             default: false
//         },
//         idHandicappedOwner:
//         {
//             type: String,
//             trim: true,
//             unique: true,
//             default: ""
//         }
//     },
//     userOwner: {
//         type: mongoose.ObjectId,
//         required: true,
//         ref: 'Users'
//     },

//     // allCarsOwner:
//     //     [{
//     //         type: mongoose.ObjectId,
//     //         ref: 'Cars'
//     //     }],
//     // allParkingsOwner:
//     // {
//     //     type: mongoose.ObjectId,
//     //     ref: 'Parkings'
//     // }

// }, {
//     timestamps: true
// })
// module.exports = mongoose.model('Owners', ownersSchema)