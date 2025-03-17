const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const parkingsController = require("../controllers/parkingsController")
router.delete("/:id",parkingsController.deleteParking)//
router.post("/", parkingsController.createNewParking)//
router.get("/getParkingOf/",verifyJWT, parkingsController.getParkingByUser)//
router.get("/", parkingsController.getAllParkings)//
router.get("/:_id", parkingsController.getParkingById)//
router.put("/:id",parkingsController.updateParkings)//
router.put("/P/:id",parkingsController.updatePcar)//
router.put("/unP/:id",parkingsController.updateUPcar)//
module.exports = router