// const ManagerParkinglots = require("../models/ManagerParkinglots");

// // // creat1
// const createNewParkinglots = async (req, res) => {
//     const { userOwners} = req.body
//     if (!userOwners|| req.user.rolesUser!="manager")
//      {
//         return res.status(400).json({ message: 'the item is required or you cant do that action' })
//     }
//     try {
//         const parkinglot = await ManagerParkinglots.create({
//             userOwners,
// // creat1
// const createNewParkinglots = async (req, res) => {
//     const { nameParkinglot, managerParkinglot, country, city, street, numberOfStreet, sizeParkinglot } = req.body
//     if (!nameParkinglot || !managerParkinglot || !country || !city || !street || !numberOfStreet || !sizeParkinglot) {
//         return res.status(400).json({ message: 'the items are required' })
//     }
//     try {
//         const parkinglot = await ManagerParkinglots.create({
//             nameParkinglot,
//             managerParkinglot,
//             locationParkinglot: {
//                 country,
//                 city,
//                 street,
//                 numberOfStreet
//             },
//             sizeParkinglot
//         });
//         if (parkinglots) {
//             const parkinglots2 = await ManagerParkinglots.find().lean()
//             if (!parkinglots2?.length) {
//                 return res.status(400).json({ message: 'No parkinglots found' })
//             }
//             return res.status(201).json(parkinglots2)
//         } else {
//             return res.status(400).json({ message: 'Invalid parkinglots' })
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Error creating parkinglot', error });
//     }
// }
// // //read//כל החניונים
// // const getAllParkinglots = async (req, res) => {
// //     const parkinglots = await ManagerParkinglots.find().lean()
// //     if (!parkinglots?.length) {
// //         return res.status(400).json({ message: 'No ManagerParkinglots found' })
// //     }
// //     res.json(parkinglots)
// // }
// // //כל החניונים של אדם שמחובר למערכת 
// // const getParkinglotsByUser = async (req, res) => {
// //     const { _id } = req.user
// //     try {
// //         const Parkinglots2 = await ManagerParkinglots.find({ managerParkinglot: _id }).lean()
// //         if (!Parkinglots2) {
// //             return res.status(400).json({ message: 'No ManagerParkinglots' })
// //         }
// //         res.json(Parkinglots2)
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error geting ManagerParkinglots', error });
// //     }
// // }
// // //לקבל חניונים לי עיר ומדינה
// // const getParkinglotsBycountry = async (req, res) => {
// //     const { country, city } = req.params;
// //     try {
// //         const parkingLots = await ManagerParkinglots.find({
// //             'locationParkinglot.country': country.toLowerCase(),
// //             'locationParkinglot.city': city.toLowerCase()
// //         }).lean();
// //         // 'locationParkinglot': {
// //         //     country: country.toLowerCase(),
// //         //     city: city.toLowerCase()
// //         // }
// //         if (parkingLots.length === 0) {
// //             const parkingLots = await ManagerParkinglots.find({
// //                 'locationParkinglot.country': country.toLowerCase()
// //             }).lean();
// //             if (parkingLots.length === 0) {
// //                 return res.status(404).json({ message: 'No ManagerParkinglots found in the specified location' });
// //             }
// //         }
// //         res.json(parkingLots);
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error getting ManagerParkinglots', error });
// //     }
// // };
// // // לפי שם כל החניונים של אדם מסויים
// // const getFilterParkinglot = async (req, res) => {
// //     const { obj } = req.params
// //     try {
// //         const Parkinglots2 = await ManagerParkinglots.find().populate("Users", { nameUser: obj }).lean()
// //         if (!owner?.length) {
// //             return res.status(400).json({ message: 'No ManagerParkinglots found' })
// //         }
// //         res.json(Parkinglots2)
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error geting ManagerParkinglots', error });
// //     }
// // }


// // // כל החניות הפניות
// // const getParkingEmpty = async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const parkinglot = await ManagerParkinglots.findById(id).populate({
// //             path: 'allParkinglot',
// //             match: {
// //                 isFullParking: false
// //             }
// //         }).exec();

// //         if (!parkinglot) {
// //             return res.status(404).json({ message: 'Parking lot not found' });
// //         }


// //         const parkingSpaces = parkinglot.allParkinglot;

// //         return res.json(parkingSpaces);
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error retrieving parking empty', error });
// //     }
// // };
// // // מספר מקומות החניה הריקים
// // const getCParkingEmpty = async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const parkinglot = await ManagerParkinglots.findById(id).populate({
// //             path: 'allParkinglot',
// //             match: {
// //                 isFullParking: false
// //             }
// //         }).exec();

// //         if (!parkinglot) {
// //             return res.status(404).json({ message: 'Parking lot not found' });
// //         }

// //         const parkingSpaces = parkinglot.allParkinglot;

// //         const emptyParkingCount = parkingSpaces.length;

// //         return res.json({ emptyParkingCount });
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error retrieving parking empty', error });
// //     }
// // };


// // //כל מנהלי החניונים


// // const getManagersParkinglot = async (req, res) => {
// //     try {
// //         const parkinglots = await ManagerParkinglots.find().populate('managerParkinglot', 'nameUser').lean(); // Adjust the fields as necessary

// //         if (!parkinglots.length) {
// //             return res.status(404).json({ message: 'No parkinglots found' });
// //         }
// //         const managers = [...new Set(parkinglots.map(parkinglot => parkinglot.managerParkinglot))];

// //         res.status(200).json(managers);
// //     } catch (error) {
// //         console.error('Error fetching managers:', error);
// //         return res.status(500).json({ message: 'Error getting managers', error });
// //     }
// // };
// // //האם החניון מלא
// // const getIfParkingFull = async (req, res) => {
// //     const { id } = req.params;
// //     try {
// //         const parkinglot = await ManagerParkinglots.findById(id).populate({
// //             path: 'allParkinglot',
// //             match: {
// //                 isFullParking: false
// //             }
// //         }).exec();

// //         if (!parkinglot) {
// //             return res.status(404).json({ message: 'Parking lot not found' });
// //         }

// //         const parkingSpaces = parkinglot.allParkinglot;

// //         const emptyParkingCount = parkingSpaces.length;
// //         if (emptyParkingCount === 0) { return res.json(true); }
// //         return res.json(false);
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Error retrieving parking empty', error });
// //     }
// // };



// // //עידכון חניון
// // const updateParkinglots = async (req, res) => {
// //     const { id } = req.params
// //     const { nameParkinglot, managerParkinglot, city, country, street, numberOfStreet, addParking, sizeParkinglot } = req.body
// //     if (!id) {
// //         return res.status(400).json({ message: 'field is required' })
// //     }
// //     try {
// //         const parkinglots = await ManagerParkinglots.findById(id).exec()
// //         if (!parkinglots) {
// //             return res.status(400).json({ message: 'parkinglots not found' })
// //         }
// //         // parkinglots.locationParkinglot.city= {
// //         //         country?: country.toLowerCase(),
// //         //         city: city.toLowerCase()
// //         //     }
// //         if (numberOfStreet) parkinglots.locationParkinglot.numberOfStreet = numberOfStreet;
// //         if (country) parkinglots.locationParkinglot.country = country.toLowerCase();
// //         if (street) parkinglots.locationParkinglot.street = street.toLowerCase();
// //         if (city) parkinglots.locationParkinglot.city = city.toLowerCase();
// //         if (nameParkinglot) parkinglots.nameParkinglot = nameParkinglot;
// //         if (managerParkinglot) parkinglots.managerParkinglot = managerParkinglot;
// //         if (sizeParkinglot) parkinglots.sizeParkinglot = sizeParkinglot;

// //         if (addParking) {
// //             parkinglots.allParkinglot.push(addParking);
// //         }
// //         await parkinglots.save()
// //         const parkings2 = await ManagerParkinglots.find().lean()
// //         if (!parkings2?.length) {
// //             return res.status(400).json({ message: 'No parkinglot found' })
// //         }
// //         return res.status(201).json(parkings2)
// //     } catch (error) {
// //         console.error(`cant updet:`, error);
// //     }
// // }



// // const deleteParkinglot = async (req, res) => {
// //     const { id } = req.params;

// //     const parkinglot = await ManagerParkinglots.findById(id).exec();
// //     if (!parkinglot) {
// //         return res.status(400).json({ message: 'Parking lot not found' });
// //     }
// //     for (const parkingId of parkinglot.allParkinglot) {
// //         try {
// //             //קיצור אפשרי mongoose
// //             await Parkings.findByIdAndDelete(parkingId);
// //         } catch (error) {
// //             console.error(`Failed to delete parking with ID ${parkingId}:`, error);
// //         }
// //     }
// //     await parkinglot.deleteOne();
// //     const remainingParkinglots = await ManagerParkinglots.find().lean();
// //     if (!remainingParkinglots.length) {
// //         return res.status(400).json({ message: 'No Parking lots found' });
// //     }

// //     res.json(remainingParkinglots);
// // };
// // module.exports = {
// //     getParkingEmpty,
// //     getCParkingEmpty,
// //     deleteParkinglot,
// //     createNewParkinglots,
// //     updateParkinglots,
// //     getIfParkingFull,
// //     getAllParkinglots,
// //     getParkinglotsByUser,
// //     getParkinglotsBycountry,
// //     getFilterParkinglot,
// //     getManagersParkinglot

// // }

// //read//כל החניונים
// const getAllParkinglots = async (req, res) => {
//     const parkinglots = await ManagerParkinglots.find().lean()
//     if (!parkinglots?.length) {
//         return res.status(400).json({ message: 'No ManagerParkinglots found' })
//     }
//     res.json(parkinglots)
// }
// //כל החניונים של אדם שמחובר למערכת 
// const getParkinglotsByUser = async (req, res) => {
//     const { _id } = req.user
//     try {
//         const Parkinglots2 = await ManagerParkinglots.find({ managerParkinglot: _id }).lean()
//         if (!Parkinglots2) {
//             return res.status(400).json({ message: 'No ManagerParkinglots' })
//         }
//         res.json(Parkinglots2)
//     } catch (error) {
//         return res.status(500).json({ message: 'Error geting ManagerParkinglots', error });
//     }
// }
// //לקבל חניונים לי עיר ומדינה
// const getParkinglotsBycountry = async (req, res) => {
//     const { country, city } = req.params;
//     try {
//         const parkingLots = await ManagerParkinglots.find({
//             'locationParkinglot.country': country.toLowerCase(),
//             'locationParkinglot.city': city.toLowerCase()
//         }).lean();
//         // 'locationParkinglot': {
//         //     country: country.toLowerCase(),
//         //     city: city.toLowerCase()
//         // }
//         if (parkingLots.length === 0) {
//             const parkingLots = await ManagerParkinglots.find({
//                 'locationParkinglot.country': country.toLowerCase()
//             }).lean();
//             if (parkingLots.length === 0) {
//                 return res.status(404).json({ message: 'No ManagerParkinglots found in the specified location' });
//             }
//         }
//         res.json(parkingLots);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error getting ManagerParkinglots', error });
//     }
// };
// // לפי שם כל החניונים של אדם מסויים
// const getFilterParkinglot = async (req, res) => {
//     const { obj } = req.params
//     try {
//         const Parkinglots2 = await ManagerParkinglots.find().populate("Users", { nameUser: obj }).lean()
//         if (!owner?.length) {
//             return res.status(400).json({ message: 'No ManagerParkinglots found' })
//         }
//         res.json(Parkinglots2)
//     } catch (error) {
//         return res.status(500).json({ message: 'Error geting ManagerParkinglots', error });
//     }
// }


// // כל החניות הפניות
// const getParkingEmpty = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const parkinglot = await ManagerParkinglots.findById(id).populate({
//             path: 'allParkinglot',
//             match: {
//                 isFullParking: false
//             }
//         }).exec();

//         if (!parkinglot) {
//             return res.status(404).json({ message: 'Parking lot not found' });
//         }


//         const parkingSpaces = parkinglot.allParkinglot;

//         return res.json(parkingSpaces);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error retrieving parking empty', error });
//     }
// };
// // מספר מקומות החניה הריקים
// const getCParkingEmpty = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const parkinglot = await ManagerParkinglots.findById(id).populate({
//             path: 'allParkinglot',
//             match: {
//                 isFullParking: false
//             }
//         }).exec();

//         if (!parkinglot) {
//             return res.status(404).json({ message: 'Parking lot not found' });
//         }

//         const parkingSpaces = parkinglot.allParkinglot;

//         const emptyParkingCount = parkingSpaces.length;

//         return res.json({ emptyParkingCount });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error retrieving parking empty', error });
//     }
// };


// //כל מנהלי החניונים


// const getManagersParkinglot = async (req, res) => {
//     try {
//         const parkinglots = await ManagerParkinglots.find().populate('managerParkinglot', 'nameUser').lean(); // Adjust the fields as necessary

//         if (!parkinglots.length) {
//             return res.status(404).json({ message: 'No parkinglots found' });
//         }
//         const managers = [...new Set(parkinglots.map(parkinglot => parkinglot.managerParkinglot))];

//         res.status(200).json(managers);
//     } catch (error) {
//         console.error('Error fetching managers:', error);
//         return res.status(500).json({ message: 'Error getting managers', error });
//     }
// };
// //האם החניון מלא
// const getIfParkingFull = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const parkinglot = await ManagerParkinglots.findById(id).populate({
//             path: 'allParkinglot',
//             match: {
//                 isFullParking: false
//             }
//         }).exec();

//         if (!parkinglot) {
//             return res.status(404).json({ message: 'Parking lot not found' });
//         }

//         const parkingSpaces = parkinglot.allParkinglot;

//         const emptyParkingCount = parkingSpaces.length;
//         if (emptyParkingCount === 0) { return res.json(true); }
//         return res.json(false);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error retrieving parking empty', error });
//     }
// };



// //עידכון חניון
// const updateParkinglots = async (req, res) => {
//     const { id } = req.params
//     const { nameParkinglot, managerParkinglot, city, country, street, numberOfStreet, addParking, sizeParkinglot } = req.body
//     if (!id) {
//         return res.status(400).json({ message: 'field is required' })
//     }
//     try {
//         const parkinglots = await ManagerParkinglots.findById(id).exec()
//         if (!parkinglots) {
//             return res.status(400).json({ message: 'parkinglots not found' })
//         }
//         // parkinglots.locationParkinglot.city= {
//         //         country?: country.toLowerCase(),
//         //         city: city.toLowerCase()
//         //     }
//         if (numberOfStreet) parkinglots.locationParkinglot.numberOfStreet = numberOfStreet;
//         if (country) parkinglots.locationParkinglot.country = country.toLowerCase();
//         if (street) parkinglots.locationParkinglot.street = street.toLowerCase();
//         if (city) parkinglots.locationParkinglot.city = city.toLowerCase();
//         if (nameParkinglot) parkinglots.nameParkinglot = nameParkinglot;
//         if (managerParkinglot) parkinglots.managerParkinglot = managerParkinglot;
//         if (sizeParkinglot) parkinglots.sizeParkinglot = sizeParkinglot;

//         if (addParking) {
//             parkinglots.allParkinglot.push(addParking);
//         }
//         await parkinglots.save()
//         const parkings2 = await ManagerParkinglots.find().lean()
//         if (!parkings2?.length) {
//             return res.status(400).json({ message: 'No parkinglot found' })
//         }
//         return res.status(201).json(parkings2)
//     } catch (error) {
//         console.error(`cant updet:`, error);
//     }
// }



// const deleteParkinglot = async (req, res) => {
//     const { id } = req.params;

//     const parkinglot = await ManagerParkinglots.findById(id).exec();
//     if (!parkinglot) {
//         return res.status(400).json({ message: 'Parking lot not found' });
//     }
//     for (const parkingId of parkinglot.allParkinglot) {
//         try {
//             //קיצור אפשרי mongoose
//             await Parkings.findByIdAndDelete(parkingId);
//         } catch (error) {
//             console.error(`Failed to delete parking with ID ${parkingId}:`, error);
//         }
//     }
//     await parkinglot.deleteOne();
//     const remainingParkinglots = await ManagerParkinglots.find().lean();
//     if (!remainingParkinglots.length) {
//         return res.status(400).json({ message: 'No Parking lots found' });
//     }

//     res.json(remainingParkinglots);
// };
// module.exports = {
//     getParkingEmpty,
//     getCParkingEmpty,
//     deleteParkinglot,
//     createNewParkinglots,
//     updateParkinglots,
//     getIfParkingFull,
//     getAllParkinglots,
//     getParkinglotsByUser,
//     getParkinglotsBycountry,
//     getFilterParkinglot,
//     getManagersParkinglot

// }
