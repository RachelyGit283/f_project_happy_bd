const Users = require("../models/Users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { passwordUser, idUser } = req.body
    if (!passwordUser || !idUser) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const foundUser = await Users.findOne({ idUser }).lean()
        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const match = await bcrypt.compare(passwordUser, foundUser.passwordUser)
        if (!match)
            return res.status(401).json({ message: 'Unauthorized' })

        const userInfo = {
            _id: foundUser._id,
            nameUser: foundUser.nameUser,
            rolesUser: foundUser.rolesUser,
            idUser: foundUser.idUser,
            emailUser: foundUser.emailUser,
            phoneUser: foundUser.phoneUser,
            carsUser: foundUser.carsUser
        }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken, rolesUser: foundUser.rolesUser })
    } catch (error) {
        return res.status(500).json({ message: 'Error login', error });
    }

}
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

const register = async (req, res) => {
    const { nameUser, idUser, emailUser, phoneUser, passwordUser, rolesUser } = req.body
    if (!isValidIsraeliID(idUser)) { return res.status(400).json({ message: 'the id is error' }) };
    if (!idUser || !nameUser || !passwordUser) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {


        const duplicate = await Users.findOne({ idUser: idUser }).lean()
        if (duplicate) {
            return res.status(409).json({ message: "Duplicate username" })
        }
        const hashedPwd = await bcrypt.hash(passwordUser, 10)
        /////
        const userObject = { nameUser, emailUser, idUser, phoneUser, passwordUser: hashedPwd, rolesUser }
        const user = await Users.create(userObject)
        if (user) {
            return res.status(201).json({
                message: `New user ${user.idUser}
            created` })
        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }
    }
    catch (e) {
        res.json({ message: e })
    }
}

module.exports = { login, register }