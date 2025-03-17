// const Owners = require("../models/Owners");
const Parkings = require("../models/Parkings");
const Parkinglots = require("../models/Parkinglots");
const Cars = require("../models/Cars");

// creat1
function isValidString(str) {
    const regex = /^[A-Z][0-9]+$/; 
    return regex.test(str);
}
const createNewParking = async (req, res) => {
    const { locationParking, isHandicappedParking, sizeParking, parkinglotOfParking } = req.body
    if (!locationParking || !sizeParking || !parkinglotOfParking) {
        return res.status(400).json({ message: 'locationParking and sizeParking are required' })
    }

    try {
      if (!isValidString(locationParking))
        {
            return res.status(400).json({ message: 'change locationParking' })

        }
        const parkings = await Parkings.create({ locationParking, isHandicappedParking, sizeParking, parkinglotOfParking })
        if (parkings) {
            try {
                const parkinglots = await Parkinglots.findById(parkinglotOfParking).lean()
                if (!parkinglots) {
                    return res.status(400).json({ message: 'No Parkinglots' })
                }
                parkinglots.allParkinglot.push(parkings);

            } catch (error) {
                return res.status(500).json({ message: 'Error geting Parkinglots', error });
            }
            const parkings2 = await Parkings.find().lean()
            if (!parkings2?.length) {
                return res.status(400).json({ message: 'No parkings found' })
            }
            return res.status(201).json(parkings2)
        } else {
            return res.status(400).json({ message: 'Invalid parkings' })
        }
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            console.error('Duplicate parking entry: ', error.message);}
        return res.status(500).json({ message: 'Error creating parking', error });
    }
}
//read
const getAllParkings = async (req, res) => {
    try {
        const parkings = await Parkings.find().lean()
        if (!parkings?.length) {
            return res.status(400).json({ message: 'No Parkings found' })
        }
        res.json(parkings)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting parking', error });
    }
}


const getParkingById = async (req, res) => {
    const { _id } = req.params
    try {
        const parkings = await Parkings.findById(_id).lean()
        if (!parkings) {
            return res.status(400).json({ message: 'No Parkings' })
        }
        res.json(parkings)
    } catch (error) {
        return res.status(500).json({ message: 'Error geting parking', error });
    }
}



//כל החניות של בעל מסויים
const getParkingByUser = async (req, res) => {
    const { _id } = req.user
     try {
        const parkings = await Parkings.find().populate({  path: 'carParking',
            match: {
                userCar: _id
            }}).lean()
            const filteredParkings = parkings.filter(parking => parking.carParking);

            if (filteredParkings.length === 0) {
                return res.status(404).json({ message: 'No parkings found for this user car' });
            }
    
            res.json(filteredParkings);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving parkings', error });
    }
}
const updateParkings = async (req, res) => {
    const { id } = req.params
    const { locationParking, isFullParking, isHandicappedParking, sizeParking, carParking, priceParking, timeFtartParking, timeStartParking, intresteCar, unintresteCar } = req.body
    if (!id) {
        return res.status(400).json({ message: 'field is required' })
    }
    try {
        const parkings = await Parkings.findById(id).exec()
        if (!parkings) {
            return res.status(400).json({ message: 'parkings not found' })
        }
        locationParking ? parkings.locationParking = locationParking : parkings.locationParking
        isFullParking ? parkings.isFullParking = isFullParking : parkings.isFullParking
        isHandicappedParking ? parkings.isHandicappedParking = isHandicappedParking : parkings.isHandicappedParking
        sizeParking ? parkings.sizeParking = sizeParking : parkings.sizeParking
        carParking ? parkings.carParking = carParking : parkings.carParking
        priceParking ? parkings.priceParking = priceParking : parkings.priceParking
        timeFtartParking ? parkings.timeFtartParking = timeFtartParking : parkings.timeFtartParking
        timeStartParking ? parkings.timeStartParking = timeStartParking : parkings.timeStartParking
        if (intresteCar) {
            parkings.intrestedParking.push(intresteCar);
        }
        //להסיר רכב מתעניין
        if (unintresteCar) {
            const index = parkings.intrestedParking.indexOf(parking);
            if (index !== -1) {
                parkings.intrestedParking.splice(index, 1);
            }
        }
        const updateParkings = await parkings.save()
        const parkings2 = await Parkings.find().lean()
        if (!parkings2?.length) {
            return res.status(400).json({ message: 'No parkings2 found' })
        }
        return res.status(201).json(parkings2)
    } catch (error) {
        return res.status(500).json({ message: 'Error updating parking', error });
    }
}

// להפוך רכב לחונה
const updatePcar = async (req, res) => {
    const { format } = require("date-fns")
    const { id } = req.params
    const {carParking} = req.body
    if (!id || !carParking) {
        return res.status(400).json({ message: 'fields are required' })
    }
    try {
    
        const parkings = await Parkings.findById(id).exec()
        if (!parkings) {
            return res.status(400).json({ message: 'Parkings not found' })
        }
        if (parkings.isFullParking) { return res.status(400).json({ message: 'The Parkings is full' }) }
        const car = await Cars.findById(carParking).exec()
        if (!car) { return res.status(400).json({ message: 'No car found' }) }
        if (car.isParkingCar) { return res.status(400).json({ message: 'The car is parking' }) }
        if (parkings.sizeParking != car.sizeCar) { return res.status(400).json({ message: 'The Parkings are not in the same size ' }) }
        if (parkings.isHandicappedParking && car.idHandicappedCar != "") { return res.status(400).json({ message: 'HandicappedParking' }) }
        parkings.isFullParking = true;
        car.isParkingCar = true;
        parkings.carParking = carParking;
        parkings.timeStartParking = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
        const updatep = await parkings.save()
        await car.save()
        const parkings2 = await Parkings.find().lean()

        const index = parkings.intrestedParking.indexOf(carParking);
        if (index !== -1) {
            parkings.intrestedParking.splice(index, 1);
        }
        if (!parkings2?.length) {
            return res.status(400).json({ message: 'No Parkings found' })
        }
        res.json(parkings2)
    } catch (error) {
        return res.status(500).json({ message: 'Error updating parking', error });
    }

}

// להפוך רכב ללא לחונה
const updateUPcar = async (req, res) => {
    const { format } = require("date-fns")
    const{id}=req.params
    if (!id) {
        return res.status(400).json({ message: 'field is required' })
    }
    try {
        const parkings = await Parkings.findById(id).exec()
        if (!parkings) {
            return res.status(400).json({ message: 'Parkings not found' })
        }
        const car = await Cars.findById(parkings.carParking).exec()
        console.log(car)
        if (!car) { return res.status(400).json({ message: 'No car found' }) }
        if (!parkings.isFullParking || !car.isParkingCar) { return res.status(400).json({ message: 'not parking' }) }
        parkings.isFullParking = false;
        car.isParkingCar = false;
        parkings.carParking = null;
        const dateNow = format(new Date(), "yyyy-MM-dd\tHH:mm:ss")
        const dateDiffDays = parseInt((parkings.timeStartParking - dateNow) / (1000 * 60 * 60 * 24 * 30)) * parkings.priceParking;
        const updatep = await parkings.save()
        await car.save()
        const parkings2 = await Parkings.find().lean()

        if (!parkings2?.length) {
            return res.status(400).json({ message: 'No Parkings found' })
        }
        res.json({ parkings2, dateDiffDays })
    } catch (error) {
        return res.status(500).json({ message: 'Error updating parking', error });
    }

}

const deleteParking = async (req, res) => {
    const { id } = req.params
    try {

        const parking = await Parkings.findById(id).exec()
        if (!parking) {
            return res.status(400).json({ message: 'parking not found' })
        }
        try {
            const parkinglots = await Parkinglots.findById(parking.parkinglotOfParking).lean()
            if (!parkinglots) {
                return res.status(400).json({ message: 'No Parkinglots' })
            }
            const index = parkinglots.allParkinglot.indexOf(parking);
            if (index !== -1) {
               parkinglots.allParkinglot.splice(index, 1);
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error geting Parkinglots', error });
        }
        const result = await parking.deleteOne()
        const parking2 = await Parkings.find().lean()
        if (!parking2?.length) {
            return res.status(400).json({ message: 'No Parkings found' })
        }
        res.json(parking2)
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting parking', error });
    }
}

module.exports = {
    createNewParking,
    updatePcar,
    deleteParking,
    updateUPcar,
    updateParkings,
    getAllParkings,
    getParkingById,
    getParkingByUser
}