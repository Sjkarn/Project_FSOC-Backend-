const express= require('express');
const router= express.Router();
const EmployeeController= require("../controllers/employeeController");
const TaskController= require("../controllers/taskController");

router.post("/employee", EmployeeController.createEmployee);
router.get("/employee_details", EmployeeController.getEmployee);
router.post("/task", TaskController.createEmployeeTask);
router.get("/task_details", TaskController.getEmployeeTask);

module.exports= router;