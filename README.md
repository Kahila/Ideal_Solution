# **Ideal Solution**

### Requirements

Using a technology of your choice, please create REST API’s that will manage job listings as well as possible applicants for those listings. The API’s needs to be backed by a SQL database, technology choice is again your own.

### ER Diagram

The "job_table" contains information regarding the job being applied for and the "applicants_table" contains the information of the person applying for the job, Due to the mentioned tables having a many to many relationship a third bridge table is included in order to avoid redundancy, this table is called the "job_applicant" table that will contain PRIMARY KEYs from both tables and save them as UNIQUE foriegn keys.

![ERD](https://github.com/Kahila/Ideal_Solution/blob/main/documentation/Job_Centre.png)

### Deployment instructions

- make sure the following tools are installed.
  - NodeJs
  - MAMP
  - A text editor

- Clone the reposetory onto your local machine.
- go into the ideal_solution repo and run `npm i`, this will install all the dependencies within the package.json file.
- go into the ./database/connect.js and update `host: "localhost",
        user: "your sql server username",
        password: "your sql server password",
        port: "port to sql server"`

