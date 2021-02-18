# **Ideal Solution**

### Requirements

Using a technology of your choice, please create REST API’s that will manage job listings as well as possible applicants for those listings. The API’s needs to be backed by a SQL database, technology choice is again your own.

### ER Diagram

The "job_table" contains information regarding the job being applied for and the "applicants_table" contains the information of the person applying for the job, Due to the mentioned tables having a many to many relationship a third bridge table is included in order to avoid redundancy, this table is called the "job_applicant" table that will contain PRIMARY KEYs from both tables and save them as UNIQUE foriegn keys.

![ERD](https://github.com/Kahila/Ideal_Solution/blob/main/documentation/Job_Centre.png)

### Deployment instructions

- make sure the following tools are installed.
  - NodeJs (https://nodejs.org/en/download/)
  - MAMP (https://www.mamp.info/en/downloads/)
  - Any text editor
  - Nodemon (you can run `npm install nodemon` right after installing node.

- Clone the reposetory onto your local machine.
- go into the ideal_solution repo and run `npm i`, this will install all the dependencies within the package.json file.
- go into the ./database/connect.js and update `host: "localhost",
        user: "your sql server username",
        password: "your sql server password",
        port: "port to sql server"`
- go back to the parent directory and type `node database/setup.js` this will create the database, tables and populate the tables within the database. The everything you will recieve a console log like:

![output](https://github.com/Kahila/Ideal_Solution/blob/main/screen_shots/setup.PNG)

- Once the database has been set up run nodemon to start the node server.
- go to any browser of your choice and go to `localhost:3000/api/v1/jobs`.

### Usage

- View jobs : `http://localhost:3000/api/v1/jobs?qry=read&table=jobs`
- View applicants : `http://localhost:3000/api/v1/jobs?qry=read&table=applicants`
- View applied : `http://localhost:3000/api/v1/jobs?qry=read&table=applied`
- Apply for job : `http://localhost:3000/api/v1/jobs?qry=apply&jobID="the id of the Job being applied to"&applicantID="the id of the applicant"`
    - eg : `http://localhost:3000/api/v1/jobs?qry=apply&jobID=1&applicantID=1`
- Delete application : `http://localhost:3000/api/v1/jobs?qry=delete&jobID=1&applicantID=1`
    - eg : `http://localhost:3000/api/v1/jobs?qry=delete&jobID="the id of the Job applied to"&applicantID="the id of the applicant"`
- Update email : `http://localhost:3000/api/v1/jobs?qry=update&id="applicant id to update"&email="email address"&update=email`
    - eg : `http://localhost:3000/api/v1/jobs?qry=update&id=1&email=Adonis&update=email`
- Update name : `http://localhost:3000/api/v1/jobs?qry=update&id="applicant id to update"&name="The new name of the applicant"&update=name`
    - eg : `http://localhost:3000/api/v1/jobs?qry=update&id=1&name=Adonis&update=name`
- update surname : `http://localhost:3000/api/v1/jobs?qry=update&id="applicant id to update"&surname="new surname to be added"&update=surname`
    - eg : `http://localhost:3000/api/v1/jobs?qry=update&id=1&surname=Kalombo&update=surname`
- all output will be prompted on the web page, or you can use postman to send requests



