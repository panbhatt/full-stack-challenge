const express = require('express');
const validator = require('validator');
const Joi = require('joi');
var Employee = require("./../db/models/Employee");

const router = new express.Router();

const ADMIN = "admin";

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
                    console.error("Error in insert the First Admin object ");
                    return res.status(500).json({
                        'status': 'error',
                        'message': 'Unknown error occured.'
                    });
                } else {
                    console.error("Successfully Created the Admin Object ");
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
