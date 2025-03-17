const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const carsController = require("../controllers/carsController")
router.delete("/:id",carsController.deleteCars)//
router.post("/",verifyJWT, carsController.createNewCars)//
router.get("/getCar",verifyJWT, carsController.getCarsByUser)
router.get("/", carsController.getAllCars)//
router.get("/:_id", carsController.getCarsById)//
router.put("/:id",carsController.updateCars)//
router.put("/parking/:id",carsController.updatePcar)//
router.get("/getCarsOf/:id", carsController.getFilterCars)//
module.exports = router