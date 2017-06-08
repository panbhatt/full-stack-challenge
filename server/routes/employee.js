const express = require('express');
const validator = require('validator');
const Joi = require('joi');

var Employee = require("./../db/models/Employee");

const router = new express.Router();

const ADMIN = "admin";

// Employee get all
router.get('/', (req, res) => {

    var selectCrieteria = req.query.isAdmin || false;

    console.log("SELECT CREDIT = ", selectCrieteria);
    Employee.find({
        isAdmin: selectCrieteria
    }, (err, allEmployee) => {
        console.log("EMPLOYEE = ", allEmployee);
        if (err) {
            return res.status(500).json({
                'status': 'error',
                'message': 'Unknown error occured'
            });
        } else {
            return res.status(200).json(allEmployee);
        }
    })

});

// EMPLOYEE POST CREATION .
router.post('/', (req, res) => {
    const body = req.body;

    var empObject = {
        username: body.username,
        password: body.password,
        isAdmin: body.isAdmin,
        isRoot: false,
        email: body.email,
        createdBy: ADMIN,
    };

    Employee.find({
        username: empObject.username
    }, (err, adminEmp) => {

        if (err) {
            console.error("An Error has occured ", err);
            return;
        } else if (adminEmp.length > 0) {
            return res.status(409).json({
                'status': 'error',
                'message': 'Employee already exists.'
            });
        } else if (adminEmp.length == 0) {
            Employee.create(empObject, (err, emp) => {

                if (err) {
                    console.error("Error in insert the Employee object ");
                    return res.status(500).json({
                        'status': 'error',
                        'message': 'Unknown error occured.'
                    });
                } else {
                    console.error("Successfully Created the Employee Object ");
                    return res.status(201).json({
                        'status': 'success',
                        'message': 'Successfully created.'
                    });
                }

            });
        }

    });
});


// GEt Employee
router.get('/:username', (req, res) => {
    var username = req.params.username;
    console.log(username);
    Employee.find({
        username
    }, (err, emp) => {
        console.log(emp)
        if (err) {
            console.error("An Error has occured ", err);
            return res.status(500).json({
                'status': 'error',
                'message': 'Unknown error occured.'
            });
        } else if (emp.length == 1) {
            var [matchedEmp] = [...emp];
            delete matchedEmp._id;
            return res.status(200).json(matchedEmp);
        } else if (emp.length == 0) {
            return res.status(404).json({
                'status': 'error',
                'message': "Employee not found "
            });
        };

    });

});

// Update a user.

router.put('/:username', (req, res) => {
    const body = req.body;
    const uName = req.params.username;

    var empObject = {
        username: body.username,
        password: body.password,
        email: body.email
    };

    if (empObject.password) {

    } else {
        delete empObject.password;
    }

    Employee.find({
        username: uName
    }, (err, adminEmp) => {

        if (err) {
            console.error("An Error has occured ", err);
            return;
        } else if (adminEmp.length == 0) {
            return res.status(404).json({
                'status': 'error',
                'message': 'Employee does not exists.'
            });
        } else if (adminEmp.length >= 1) {
            empObject.isAdmin = adminEmp[0].isAdmin;
            empObject.isRoot = adminEmp[0].isRoot;
            empObject.createdBy = adminEmp[0].createdBy;
            if (body.email) {
                empObject.email = body.email;
            } else {
                empObject.email = adminEmp[0].email;
            }

            Employee.updateOne({
                    username: uName
                }, empObject,
                (err, emp) => {

                    if (err) {
                        console.error("Error in Updating the employee ");
                        return res.status(500).json({
                            'status': 'error',
                            'message': 'Unknown error occured while updating the emplyee.'
                        });
                    } else {
                        console.error("Successfully updated the employee ");
                        return res.status(201).json({
                            'status': 'success',
                            'message': 'Successfully updated.'
                        });
                    }

                });
        }

    });
});

// Delete a User
router.delete('/:username', (req, res) => {
    var username = req.params.username;
    console.log(username);
    Employee.find({
        username
    }, (err, emp) => {
        console.log(emp)
        if (err) {
            console.error("An Error has occured ", err);
            return res.status(500).json({
                'status': 'error',
                'message': 'Unknown error occured.'
            });
        } else if (emp.length == 1) {
            Employee.deleteOne({
                username
            }, (err, count) => {
                if (count == 1)
                    return res.status(200).json({
                        'status': 'succeess',
                        'message': 'Message Deleted'
                    });

            });

        } else if (emp.length == 0) {
            return res.status(404).json({
                'status': 'error',
                'message': "Employee not found "
            });
        };

    });

});



module.exports = router;
