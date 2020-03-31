const mongoose = require('mongoose');
const { Employee, validate } = require('../model/Employee');

module.exports.create = async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.details[0].message });
    }
    const employee = await Employee.findOne({ email: req.body.email });
    if (employee) {
        res.status(400).json({ message: "this email already register" });
        return;
    }
    const employeeCreate = await Employee.create({
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        phoneNumber: req.body.phoneNumber
    });
    employeeCreate.save();
    return res.json({ message: "Successfully Created" });

}

module.exports.update = async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.details[0].message });
    }
    const employee = {
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        phoneNumber: req.body.phoneNumber
    }
    const updateEmployee = await Employee.findByIdAndUpdate(req.params._id,
        { $set: employee }, { new: true }
    );
    res.save(updateEmployee);
    return res.json({ message: "success" });
}

module.exports.getAll = async (req, res) => {
    
    const list = await Employee.find(req.body);
    
    if (!list) {
        res.json({ message: "employee Not found" });
    }
    return res.json(list);
}

module.exports.getOne = async (req, res) => {
    
    const singleEmployee = await Employee.findOne(req.body._id);
    
    if (!singleEmployee) {
        return res.json({ message: "Employee not found" });
    }
    return res.json(singleEmployee);
}

module.exports.delete = async (req, res) => {
    
    const deleteEmp = await Employee.findOneAndRemove(req.params._id);

    if (!deleteEmp) {
        return res.json({ message: "Employee not Found" });
    }
    return res.json({ message: "Employee Deleted Successfully" });
}



