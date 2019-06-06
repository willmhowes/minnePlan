# MinnePlan

MinnePlan is a web application that helps to manage scheduling and communication responsibilities for Community Education Coordinators.

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `minneplan` and run the sql text from the `database.sql` file to create the needed tables for the database.

If you would like to name your database something else, you will need to change `minneplan` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret

    GMAIL=YOUR_GMAIL_ADDRESS_GOES_HERE
    GMAIL_PASSWORD=YOUR_GMAIL_PASSWORD_GOES_HERE

    AUTH0_CLIENT_ID=
    AUTH0_CLIENT_SECRET=
    AUTH0_DOMAIN=
    AUTH0_CALLBACK_URL=

    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

    You'll also need to set up an Auth0 account by going to the website: [Auth0](https://auth0.com/).

    ```NEED TO PUT INSTRUCTIONS ON HOW TO SETUP AUTH0 HERE```

    This application is also set up with Nodemailer to send out email notifications utilizing your Gmail account. Provide your creditials in the `.env` file to enable this feature.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

* src/components
  * AddNewClass/AddNewClass
  * AddNewInstructor/AddNewInstructor
  * App/App
  * ArchivedSessions/ArchivedSessions
  * CurrentSession/CurrentSession
  * CurrentSessionTableRow/CurrentSessionTableRow
  * Footer/Footer
  * FutureSession/FutureSession
  * FutureSessionTableRow/FutureSessionTableRow
  * History/History
  * Instructor/Instructor
  * InstructorLogin/InstructorLogin
  * InstructorSchedule/InstructorSchedule
  * LoginPage/LoginPage
  * Nav/Nav
  * ProtectedRoute/ProtectedRoute
  * RegisterPage/RegisterPage

### Completed Features

- [x] Auth0 email authentication to login to application.
- [x] Nodemailer email notifications.
- [x] Export FutureSession table to csv file.

### Next Steps

- [ ]

## Deployment

1. In terminal, navigate to your project folder and type `heroku create`.
1. Login in if prompted.
1. Type `git remote -v` to ensure it was added successfully.
1. In terminal, type `git push heroku master`.
1. Make sure you have already set up the designated local database and have postgres running.
1. In terminal, type `heroku addons:create heroku-postgresql:hobby-dev` to set up Postgresql on your Heroku project.
1. Next, type `heroku pg:push your_database DATABASE_URL` to copy your database contents up to Heroku. **your_database** is the actual name of your database (e.g. minneplan). DATABASE_URL is a heroku config variable created by the Add On. Do not replace it with something else, just type: DATABASE_URL. For example, if you were deploying the **minneplan** database, you should type `heroku pg:push minneplan DATABASE_URL`.
1. Add an environment variable for the listed variables above on

## Authors

* Amareya Allen-Dabney, Will Howes, Brian Zilka, [Jarvis Yang](https://jarvis.netlify.com/)

## Acknowledgments

* Thank you to Eliana Power for this amazying opportunity.
* Thank you to our fellow classmates in the Atbash Cohort from Prime Digital Academy.
* Thank you to Mary and Kris, our insightful and knowledgeable instructors!
