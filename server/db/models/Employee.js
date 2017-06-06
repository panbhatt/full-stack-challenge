const MongoModels = require('mongo-models');
const Joi = require('joi');

class Employee extends MongoModels {
    static create(emp, callback) {

        const document = emp;

        this.insertOne(document, callback);
    }

    speak() {

        console.log(`${this.name}: call me at ${this.phone}.`);
    }
}

Employee.collection = 'employees'; // the mongodb collection name


Employee.schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
    isRoot: Joi.boolean(),
    email: Joi.string().email(),
    createdBy: Joi.string()
});

module.exports = Employee;
