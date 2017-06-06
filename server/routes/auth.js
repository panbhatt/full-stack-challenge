const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Employee = require('./../db/models/Employee');

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a correct email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters.';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide your name.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
        isFormValid = false;
        errors.username = 'Please provide your Username.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/signup', (req, res) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return res.status(200).end();
});

router.post('/login', (req, res) => {
    const validationResult = validateLoginForm(req.body);
    if (validationResult.success) {

        Employee.findOne({
            username: req.body.username
        }, (err, result) => {
            console.log(result);
            if (err) {
                return res.status(500).json({
                    'status': 'error',
                    'message': 'Unknow error occured'
                })
            } else {
                if (result) {
                    if (req.body.password === result.password) {
                        return res.status(200).json({
                            'status': 'sucess',
                            'message': 'Successfuly login',
                            'admin': result.isAdmin
                        });
                    }
                } else {
                    res.status(404).json({
                        'status': 'error',
                        'message': 'Username/password mismatch.'
                    });
                }

            }
        });


    } else {
        return res.status(400).json({
            status: 'error',
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

});


module.exports = router;
