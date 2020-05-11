# Wheatley Arts Festival GitHub repository


# Introduction

Hello, welcome to the Wheatley Arts Festival (WAF) GitHub repository. 

This website is used to host the range of events for the festival, ticket booking and festival contact information. 

Users need to create an accout to before reserving up to a maximum of two tickets. 

# Creators
This project was contributed to by Troy and Wanqun, you can contact us at the WAF email address.


# How to get it up a running? 
Since the backend of the website is written in Nodejs you will need to have this installed. 
https://nodejs.org/en/

You will then have to use the console to move to the directory where you saved the application and you should then be able  to start it with the command "node app.js". 

If you see the following message “Server started and listening on port 3000”, great you are up an running. As you can 
see the app uses port 3000 by default but this can be changed as needed. 

# File structure
At the top level there a range of folders and files. 

## files
The first file is the .gitignore which includes all of the files that are not included in this repository (see What is not included in this repository? section).

### app.js
This is the core file of the project. It is used to start the express server and loads the middleware onto the express server. It also establishes the connections with MongoDB, either locally or in the cloud through MongoDB Atlas.

### package-lock.json 
is an automatically generated file when a project is initiated with node package manager see -
https://docs.npmjs.com/configuring-npm/package-lock-json.html

### package.json
is an automatically generated file which contains a list of node packages used in the application and their version number. see - https://docs.npmjs.com/files/package.json


## Folders 

## views folder
The views folder contains a series of ejs files which are webpages that use Embedded JavaScript templating.
This allows the use of templated webpages through the use of Expresses (the node server package) view engine.
The most important of these are the account page, ticket page, registration and login webpages. 

This folder also includes a subfolder called partials that contains snippets of ejs files that can be used in larger
ejs files. The most important is the messages.ejs will is used to display flash messages.


## Routes folder
The routes folder holds two documents, the index.js and the users.js. Both files handle all of the routing of website traffic. This includes both GET and POST requests. index.js contains all of the routes associated with the index route "/", whereas users handles "users/" routes. The users routes are used to handle account functionality.


## public folder
The public folder handles the front end of the website. it contains folders for the css, fonts, html, images and javascript used by the front end.

## models folder 
The models folder contains the three Mongoose (Order, Ticket, User) Schemas used throughout the website. Mongoose is used as the driver for MongoDB.

## custom-module folder
The custom module folder is slightly miscellaneous and utlises three files that are used to handle much of the backend functionality.  The accountFunctions file exports functions for creating and deleting accounts.
The orderFunction file exports functions for ordering tickets and deleting orders. Lastly, the renderPage is used 
to render the account and ticket ejs template pages. 


## config folder
The config folder is used to store the configuration and set up some of the packages used within the application. 
passportjs, is used for handling users logging in and serialising and deserialising their session. For this application the passport-local stratergy has been used. see - http://www.passportjs.org/.
The nodeMailer file authenticates the WAF email account using OAuth2 so that is can email users of the website.
The file then exports functions that email users when they register and when they order tickets. It also handles user feedback and queiries.



## What is not included in this repository?
This repository includes most of the essential files, but does not include the node package files and dot env file. These files can be found seperately on the Group 4 shared google drive, under the Project Builds folder. If not you will need to establish your own google account with OAuth2 for sending emails and to use your own MongoDB. A list of the packages used can also be found in the package.json file.
