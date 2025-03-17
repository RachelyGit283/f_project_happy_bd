const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const parkinglotsController = require("../controllers/parkinglotsController")
router.get("/:_id", parkinglotsController.getParkinglotsById)//
router.get("/full/:id", parkinglotsController.getIfParkingFull)//
router.get("/emptyParking/:id", parkinglotsController.getParkingEmpty)//
router.get("/countEmptyParkings/:id", parkinglotsController.getCParkingEmpty)//
router.get("/getParkinglotsOf/:id", parkinglotsController.getParkinglotsByIdManager)//
router.get("/getParkinglotsOfcountry", parkinglotsController.getParkinglotsBycountry)//
router.get("/AllManagers", parkinglotsController.getManagersParkinglot)//
router.get("/getParkinglots", parkinglotsController.getParkinglotsByUser)//
router.get("/", parkinglotsController.getAllParkinglots)//
router.post("/", parkinglotsController.createNewParkinglots)//
router.delete("/:id",parkinglotsController.deleteParkinglot)//
router.put("/:id",parkinglotsController.updateParkinglots)//

module.exports = router