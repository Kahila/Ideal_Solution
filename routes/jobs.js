var express = require('express');
var router = express.Router();
var database = require("../database/connect");
const body_parser = require('body-parser');
const { query } = require('express');

router.use(body_parser.urlencoded({ extended: true }));
router.get('/', function(req, res, next) {
    //read information
    //required inputs quaryType
    if (req.query.qry == "read" && req.query.table) {
        table = "";
        if (req.query.table == "applicants") {
            table = "applicant_table";
        } else if (req.query.table == "jobs") {
            table = "job_table";
        } else if (req.query.table == "applied") {
            table = "job_applicant_table";
        }
        if (table.length > 0) {
            database.conn().query("SELECT * FROM job_centre." + table + "", function(error, result, fields) {
                if (error)
                    res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
                else
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
            });
        } else {
            res.send("invalid request");
        }
    }

    //apply for job
    //required inputs quaryType, applicants_id, job_id
    else if (req.query.qry == "apply" && req.query.jobID && req.query.applicantID) {
        qry = "INSERT INTO job_centre.job_applicant_table (job_id, applicant_id) VALUES ('" + req.query.jobID + "', '" + req.query.applicantID + "')";
        database.conn().query(qry, function(err, result) {
            if (err)
                res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
            else
                res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        })
    }

    //delete applicant
    //required inputs quaryType, job/applicant, job_id/applicant_id
    else if (req.query.qry == "delete" && req.query.applicantID && req.query.jobID) {
        qry = "DELETE FROM job_centre.job_applicant_table WHERE job_id=" + req.query.jobID + " AND applicant_id=" + req.query.applicantID + "";
        database.conn().query(qry, function(err, result) {
            if (err)
                res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
            else
                res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
        })
    }

    //update application
    else if (req.query.qry == "update" && req.query.id) {
        qry = "";
        if (req.query.update == "email" && req.query.email) {
            qry = "UPDATE job_centre.applicant_table SET applicant_email=\"" + req.query.email + "\" WHERE applicant_id=\"" + req.query.id + "\"";
        } else if (req.query.update == "name" && req.query.name) {
            qry = "UPDATE job_centre.applicant_table SET applicant_name=\"" + req.query.name + "\" WHERE applicant_id=\"" + req.query.id + "\"";
        } else if (req.query.update == "surname" && req.query.surname) {
            qry = "UPDATE job_centre.applicant_table SET applicant_surname=\"" + req.query.surname + "\" WHERE applicant_id=\"" + req.query.id + "\"";
        }

        if (qry.length > 0) {
            database.conn().query(qry, function(err, result) {
                if (err)
                    res.send(JSON.stringify({ "status": 500, "error": err, "response": null }));
                else
                    res.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
            });
        }
    } else {
        res.send("invalid request");
    }

});

module.exports = router;