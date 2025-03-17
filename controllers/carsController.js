//finish
const Cars = require("../models/Cars");
// creat1
const createNewCars = async (req, res) => {
    const { numberCar, idHandicappedCar, sizeCar } = req.body
    if (!numberCar || !sizeCar) {
        return res.status(400).json({ message: 'numberCar and sizeCar are required' })
    }
     try {
        // "req.user._id"
        const cars = await Cars.create({ numberCar, userCar: req.user._id, idHandicappedCar, sizeCar })
        if (cars) {
            try {        
                 console.log(req.user)
               
                req.user.carsUser.push(cars);
            } catch (error) {
                return res.status(500).json({ message: 'Error', error });
            }
            const cars2 = await Cars.find().lean()
            if (!cars2?.length) {
                return res.status(400).json({ message: 'No cars found' })
            }
            return res.status(201).json(cars2)
        } else {
            return res.status(400).json({ message: 'Invalid cars' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error creating car', error });
    }
}
//read
const getAllCars = async (req, res) => {
    try {
        const cars = await Cars.find().lean()
        if (!cars?.length) {
            return res.status(400).json({ message: 'No Cars found' })
        }
        // console.log(users);
        res.json(cars)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting car', error });
    }
}
//למצוא אדם לפי רכב
// const getFilterUserCars = async (req, res) => {
//     const { obj } = req.params
//     try {
//         const cars = await Cars.find().populate("Cars", { numberCar: obj }).lean()
//         if (!cars?.length) {
//             return res.status(400).json({ message: 'No Cars found' })
//         }
//         res.json(cars)
//     } catch (error) {
//         return res.status(500).json({ message: 'Error geting car', error });
//     }
// }
// //למצוא רכבים לפי אדם
const getFilterCars = async (req, res) => {
    const { id } = req.params
    try {
        const cars = await Cars.find({userCar:id}).lean()
        if (!cars?.length) {
            return res.status(400).json({ message: 'No Cars found' })
        }
        res.json(cars)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting car', error });
    }
}
const getCarsById = async (req, res) => {
    const { _id } = req.params
    try {
        const cars = await Cars.findById(_id).lean()
        if (!cars) {
            return res.status(400).json({ message: 'No Cars' })
        }
        res.json(cars)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting car', error });
    }
}
//כל הרכבים של אדם שמחובר למערכת 
const getCarsByUser = async (req, res) => {
    const { _id } = req.user
     try {
        const cars = await Cars.find({ userCar: _id }).lean()
        if (!cars) {
            return res.status(400).json({ message: 'No Cars' })
        }
        res.json(cars)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting car', error });
    }
}
const updateCars = async (req, res) => {
    const { id } = req.params
    const { numberCar, isParkingCar, sizeCar, idHandicappedCar } = req.body
    if (!id) {
        return res.status(400).json({ message: 'field is required' })
    }
    try {
        const cars = await Cars.findById(id).exec()
        if (!cars) {
            return res.status(400).json({ message: 'cars not found' })
        }
        numberCar ? cars.numberCar = numberCar : cars.numberCar
        sizeCar ? cars.sizeCar = sizeCar : cars.sizeCar
        isParkingCar ? cars.isParkingCar = isParkingCar : cars.isParkingCar
        idHandicappedCar ? cars.idHandicappedCar = idHandicappedCar : cars.idHandicappedCar
        const updateCar = await cars.save()
        const cars2 = await Cars.find().lean()
        if (!cars2?.length) {
            return res.status(400).json({ message: 'No cars2 found' })
        }
        return res.status(201).json(cars2)
    } catch (error) {
        return res.status(500).json({ message: 'Error updating car', error });
    }
}
//isParkingCar=true להפוך רכב לחונה
const updatePcar = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'field is required' })
    }
    try {
        const cars = await Cars.findById(id).exec()
        if (!cars) {
            return res.status(400).json({ message: 'Cars not found' })
        }
        cars.isParkingCar = cars.isParkingCar ? false : true;
        const updateCompCars = await cars.save()
        const cars2 = await Cars.find().lean()
        if (!cars2?.length) {
            return res.status(400).json({ message: 'No Cars found' })
        }
        res.json(cars2)
    } catch (error) {
        return res.status(500).json({ message: 'Error updating car', error });
    }
}
const deleteCars = async (req, res) => {
    const { id } = req.params
    try {
        const car = await Cars.findById(id).exec()
        if (!car) {
            return res.status(400).json({ message: 'car not found' })
        }
        try {
            const user = await Users.findById(car.userCar).lean()
            if (!user) {
                return res.status(400).json({ message: 'No user' })
            }
            const index = user.carsUser.indexOf(parking);
            if (index !== -1) {
                user.carsUser.splice(index, 1);
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error geting Parkinglots', error });
        }
        const result = await car.deleteOne()
        const car2 = await Cars.find().lean()
        if (!car2?.length) {
            return res.status(400).json({ message: 'No Cars found' })
        }
        res.json(car2)
    } catch (error) {
        return res.status(500).json({ message: 'Error delete car', error });
    }
}

module.exports = {
    updateCars,
    getCarsByUser,
    updatePcar,
    deleteCars,
    // getFilterUserCars,
    getCarsById,
    getFilterCars,
    getAllCars,
    createNewCars
}