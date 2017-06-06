const express = require('express');
const validator = require('validator');
const Joi = require('joi');
var bcrypt = require('bcrypt');
var Review = require("./../db/models/Review");

const router = new express.Router();

const ADMIN = "admin";

// REVIEW POST CREATION .
router.post('/', (req, res) => {
    const body = req.body;

    var reviewObj = {
        by: body.by,
        for: body.for,
        review: body.review || "",
        date: new Date(),
        deleted: false,
        isComplete: false
    };


    Review.create(reviewObj, (err, emp) => {

        if (err) {
            console.error("Error in insert the Review object ");
            return res.status(500).json({
                'status': 'error',
                'message': 'Unknown error occured.'
            });
        } else {
            console.error("Successfully Created the Review ");
            return res.status(201).json({
                'status': 'success',
                'message': 'Successfully created the Review.'
            });
        }

    });
});


// GEt ALL REVIEWS
router.get('/user/:username', (req, res) => {
    var username = req.params.username;
    var completed = req.query.complete;
    console.log(completed);
    Review.find({
        for: username,
        isComplete: (completed === "true") ? true : false
    }, (err, reviews) => {
        if (err) {
            console.error("An Error has occured while getting list of reviews.", err);
            return res.status(500).json({
                'status': 'error',
                'message': 'Unknown error occured.'
            });
        } else {
            res.status(200).json(reviews);
        }
    });

});

// Update a Review.

router.put('/:id', (req, res) => {
    const body = req.body;
    const reviewId = req.params.id;

    console.log("REVIEW ID ", reviewId);


    Review.findById(
        reviewId, (err, review) => {
            console.log(review);
            if (err) {
                console.error("An Error has occured ", err);
                return;
            } else if (!review) {
                return res.status(404).json({
                    'status': 'error',
                    'message': 'Review does not exist.'
                });
            } else if (review) {
                var updatedObject = {};
                Object.assign(updatedObject, review);
                updatedObject.review = body.review;
                updatedObject.isComplete = true;
                updatedObject.date = new Date();

                Review.findByIdAndUpdate(reviewId, updatedObject,
                    (err, review) => {

                        if (err) {
                            console.error("Error in Updating the Review ");
                            return res.status(500).json({
                                'status': 'error',
                                'message': 'Unknown error occured while updating the review.'
                            });
                        } else {
                            console.error("Successfully updated the review ");
                            return res.status(201).json({
                                'status': 'success',
                                'message': 'Successfully updated.'
                            });
                        }

                    });
            }

        });
});



module.exports = router;
