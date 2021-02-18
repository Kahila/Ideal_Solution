var database = require("../database/connect");
var sudo_applicants = require("./extras/applicants.json"); //json file containing sudo applicants
var sudo_jobs = require("./extras/jobs.json"); //json file containing sudo jobs

database.conn().connect(function(err) {
    if (err) throw err;
    console.log("Connected to server");

    //droping database if it exists
    drop = "DROP DATABASE job_centre"
    database.conn().query(drop, function(err, result) {
        if (err) {
            console.log("Database Does Not Exist");
            console.log("Attempting To Create New Database");
        } else
            console.log("Databse Has Been Dropped");

        //attempting to create new database
        createDatabase = "CREATE DATABASE job_centre";
        database.conn().query(createDatabase, function(err, result) {
            if (err) throw errr;
            console.log("\nNew Database Has Been Created");

            //creating the neccessary tables

            //job_table
            jobTable = "CREATE TABLE job_centre.job_table (job_id INT PRIMARY KEY AUTO_INCREMENT, company_name VARCHAR(50), job_position VARCHAR(100), job_description VARCHAR(500))";
            database.conn().query(jobTable, function(err, result) {
                if (err) throw err;

                //creating string to append to query
                append = ""
                i = 1;
                while (i < sudo_jobs.length) {
                    append += ", (\"" + sudo_jobs[i].name + "\", \"" + sudo_jobs[i].position + "\", \"" + sudo_jobs[i].description + "\")";
                    i++;
                }

                if (i == sudo_jobs.length) {
                    //inserting into job_table
                    insert = "INSERT INTO job_centre.job_table (company_name, job_position, job_description) VALUES (\"" + sudo_jobs[0].name + "\", \"" + sudo_jobs[0].position + "\", \"" + sudo_jobs[0].description + "\") " + append + ";";
                    database.conn().query(insert, function(err, result) {
                        if (err) throw err;
                        console.log("* JOB TABLE has been created\n\t* Table has been populated");
                    });
                }

            })

            //applicant_table
            applicantTable = "CREATE TABLE job_centre.applicant_table (applicant_id INT PRIMARY KEY AUTO_INCREMENT, applicant_name VARCHAR(50), applicant_surname VARCHAR(50), applicant_email VARCHAR(100))";
            database.conn().query(applicantTable, function(err, result) {
                if (err) throw err;

                append = "";
                i = 1;
                while (i < sudo_applicants.length) {
                    append += ", (\"" + sudo_applicants[i].name + "\", \"" + sudo_applicants[i].surname + "\", \"" + sudo_applicants[i].email + "\")";
                    i++;
                }

                if (i == sudo_applicants.length) {
                    //inserting into applicant_table
                    insert = "INSERT INTO job_centre.applicant_table (applicant_name, applicant_surname, applicant_email) VALUES (\"" + sudo_applicants[0].name + "\", \"" + sudo_applicants[0].surname + "\", \"" + sudo_applicants[0].email + "\") " + append + ";";
                    database.conn().query(insert, function(err, result) {
                        if (err) throw err;
                        console.log("* APPLICANTS TABLE has been created\n\t* Table has been populated");
                    });
                }
            });

            //job_applicant_table (the bridge table)
            jobApplicantTable = "CREATE TABLE job_centre.job_applicant_table (job_id INT UNIQUE, applicant_id INT UNIQUE)"
            database.conn().query(jobApplicantTable, function(err, result) {
                if (err) throw err;
                console.log("* JOB_APPLICANT TABLE has been created");
            })
        });
    });

});