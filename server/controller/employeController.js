const Employee = require("../model/employe.model.js");

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// Get one employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ error: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

// Add new employee
const addEmployee = async (req, res) => {
  try {
    const { name, employeeId, department, designation, email, phone, rfid } =
      req.body;

    const existingRfid = await Employee.findOne({ rfid });
    if (existingRfid)
      return res.status(400).json({ error: "RFID already exists" });

    const newEmployee = new Employee({
      name,
      employeeId,
      department,
      designation,
      email,
      phone,
      rfid,
      isActive: true,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to add employee" });
  }
};

// Update entire employee by ID
const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updateData = req.body;

    // Check if RFID is being updated and it's unique
    if (updateData.rfid) {
      const rfidExists = await Employee.findOne({
        rfid: updateData.rfid,
        _id: { $ne: employeeId },
      });
      if (rfidExists)
        return res.status(400).json({ error: "RFID already in use" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee)
      return res.status(404).json({ error: "Employee not found" });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// ✅ Update RFID only
const updateEmployeeRfid = async (req, res) => {
  try {
    const { id } = req.params;
    const { rfid } = req.body;
    console.log(rfid)

    // Validate RFID uniqueness
    const existing = await Employee.findOne({ rfid, _id: { $ne: id } });
    if (existing)
      return res.status(400).json({ error: "RFID already assigned to another employee" });

    const employee = await Employee.findByIdAndUpdate(
      id,
      { rfid },
      { new: true, runValidators: true }
    );

    if (!employee)
      return res.status(404).json({ error: "Employee not found" });

    res.status(200).json({ message: "RFID updated successfully", employee });
  } catch (error) {
    res.status(500).json({ error: "Failed to update RFID" });
  }
};

const searchEmployeeByRfid = async (req, res) => {
  try {
    const { rfid } = req.params;

    if (!rfid) {
      return res.status(400).json({ message: "RFID is required" });
    }

    const employee = await Employee.findOne({ rfid });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if(!(employee.isActive)){
         return res.status(500).json({ message: "Employee inactive" });
    }
    
    res.json(employee);
  } catch (error) {
    console.error("Error searching employee by RFID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  updateEmployeeRfid,
  searchEmployeeByRfid
};
