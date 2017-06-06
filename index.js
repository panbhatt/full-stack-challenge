const express = require('express');
const bodyParser = require('body-parser');
const MongoModels = require('mongo-models');
var bcrypt = require('bcrypt');
var Employee = require("./server/db/models/Employee");

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// DB Connectivity.
process.env.MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/paytm";

MongoModels.connect(process.env.MONGODB_URI, {}, (err, db) => {

    if (err) {
        // TODO: throw error or try reconnecting
        console.err("An Error has occured ", err);
        process.exit();

    }

    // optionally, we can keep a reference to db if we want
    // access to the db connection outside of our models
    process.env.db = db;

    console.log('Models are now connected to mongodb.');
    // Trying to insert defacult record.
    insertAdminRecord();
});



// routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);
app.use('/api/employee', require('./server/routes/employee'));

// start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});


// This function is responsible for adding a ADMIN record to the table.
function insertAdminRecord() {

    const ADMIN = "admin";
    console.log("***** Inserting ADMIN Record ****** ");

    var empObject = {
        username: ADMIN,
        password: bcrypt.hashSync(ADMIN, 10),
        isAdmin: true,
        isRoot: true,
        email: "admin@admin.com",
        createdBy: ADMIN
    };



    Employee.find({
        username: ADMIN
    }, (err, adminEmp) => {

        if (err) {
            console.error("An Error has occured ", err);
            return;
        } else if (adminEmp.length == 0) {
            Employee.create(empObject, (err, emp) => {

                if (err) {
                    console.error("Error in insert the First Admin object ");
                    return;
                } else {
                    console.error("Successfully Created the Admin Object ");
                }

            });
        }

    })

}
