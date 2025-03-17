const Cars = require("../models/Cars");
const Parkinglots = require("../models/Parkinglots");
const Users = require("../models/Users");
const bcrypt = require('bcrypt');
function isValidIsraeliID(id) {
        // Check if the ID is numeric and has the length of 9
        if (!/^\d{9}$/.test(id)) {
            return false;
        }
    
        // Convert the ID into an array of digits
        const digits = id.split('').map(Number);
    
        // Apply the checksum calculation (Luhn algorithm variation)
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            let digit = digits[i];
            if (i % 2 === 1) {
                digit *= 2; // Double the value for every second digit
                if (digit > 9) {
                    digit -= 9; // If the result is more than 9, subtract 9
                }
            }
            sum += digit;
        }
    
        return sum % 10 === 0; // The ID is valid if the total sum is divisible by 10
    }



//הרשאות גישה וMIDDELWARE
//read
const getAllUsers = async (req, res) => {
        const users = await Users.find({},{passwordUser:0}).lean()
        if (!users?.length) {
                return res.status(400).json({ message: 'No users found' })
        }
        console.log(users);
        res.json(users)
}
// const getFilterUsers = async (req, res) => {
//         const { _id } = req.user
//         const users = await Users.find({name:obj}).lean()
//         if (!users?.length) {
//         return res.status(400).json({ message: 'No users found' })
//         }
//         res.json(users)
//         }
const getUserById = async (req, res) => {
        const { _id } = req.params
        const user = await Users.findById(_id,{passwordUser:0}).lean()
        if (!user) {
                return res.status(400).json({ message: 'No user' })
        }
        res.json(user)
}
const getUserByRoles = async (req, res) => {
        const { id } = req.params
        const user = await Users.find(({ rolesUser: id })).lean()
        if (!user) {
                return res.status(400).json({ message: 'No users' })
        }
        res.json(user)
}
//  const getUserByEmail = async (req, res) => {
//             const email = req.body
//             const user = await Users.find(email).lean()
//             if (!user) {
//             return res.status(400).json({ message: 'No user' })
//             }
//             res.json(user)
//             }
const updateUser = async (req, res) => {
        const { id } = req.params
        const { phoneUser, emailUser, idUser, nameUser, rolesUser, passwordUser } = req.body
        
        if (!id || !idUser) {
                return res.status(400).json({ message: 'fields are required' })
        }
        // try {
                const user = await Users.findById(id).exec()
                if (!user) {
                        return res.status(400).json({ message: 'User not found' })
                }
                nameUser ? user.nameUser = nameUser : user.nameUser
                emailUser ? user.emailUser = emailUser : user.emailUser
                if(idUser)
                        {if(!isValidIsraeliID(idUser))
                                return res.status(400).json({ message: 'eror id' })
                                user.idUser = idUser;
                        }
        
                phoneUser ? user.phoneUser = phoneUser : user.phoneUser
                

                if (passwordUser) {
                        const hashedPwd = await bcrypt.hash(passwordUser, 10)
                        user.passwordUser = hashedPwd
                }
                else { user.passwordUser = user.passwordUser }console.log(user);
                rolesUser ? user.rolesUser = rolesUser : user.rolesUser
                const updateUsers = await user.save()
                const users2 = await Users.find().lean() 
                res.json(user)
        // }
        // catch (error) {
        //         return res.status(500).json({ message: 'Error updating user', error });
        // }

        // if (!users2?.length) {
        //         return res.status(400).json({ message: 'No users found' })
        // }
}
// //delet
const deleteUsers = async (req, res) => {
        const { id } = req.params
        try {
                const user = await Users.findById(id).exec()
                if(user.rolesUser=='manager'){
                        return res.status(400).json({ message: 'cant delete manager' })
                }
                if(user.rolesUser=='managerParkinglot'){
                        const parkings=Parkinglots.find({managerParkinglot:user._id})
                        if(parkings)
                                return res.status(400).json({ message: 'cant delete manager if has parkingLots' })
                }
                const cars=await Cars.find({userCar:user._id}).lean()
                for (let index = 0; index < cars.length; index++) {
                        
                       await cars[index].deleteOne()
                }
                if (!user) {
                        return res.status(400).json({ message: 'user not found' })
                }
                const result = await user.deleteOne()
                const users2 = await Users.find().lean()
                if (!users2?.length) {
                        return res.status(400).json({ message: 'No users found' })
                }
                res.json(users2)
        }
        catch (error) {
                return res.status(500).json({ message: 'Error deleting parking', error });
        }
        
}

module.exports = {
        getAllUsers,
        updateUser,
        deleteUsers,
        getUserByRoles,
        getUserById
}