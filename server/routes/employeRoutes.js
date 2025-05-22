// routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const {
  getEmployees,
  searchEmployeeByRfid,
  addEmployee,
  updateEmployee,
  updateEmployeeRfid,
} = require("../controller/employeController");

router.get("/", getEmployees);
router.get("/:rfid", searchEmployeeByRfid);
router.post("/", addEmployee);
router.patch("/:id", updateEmployee);
router.patch("/update-rfid/:id", updateEmployeeRfid);

module.exports = router;
