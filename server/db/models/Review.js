const MongoModels = require('mongo-models');
const Joi = require('joi');

class Review extends MongoModels {
    static create(emp, callback) {

        const document = emp;

        this.insertOne(document, callback);
    }

    speak() {

        console.log(`${this.name}: call me at ${this.phone}.`);
    }
}

Review.collection = 'reviews'; // the mongodb collection name


Review.schema = Joi.object().keys({
    by: Joi.string().required(),
    for: Joi.string().required(),
    review: Joi.boolean(),
    del: Joi.boolean(),
    isCompleted: Joi.boolean(),
    date: Joi.date()
});

module.exports = Review;
