# Porject desciption

Todo application for SQA assignment 2

# Project desciption

To-Do application lists tasks the user can create, the user can edit, delete, complete and add tasks. The tikcets will be organised into dates, which helps the user keep track of their tasks on a day by day basis. A login and registration system has been included.

## Mock up designs

## Features

### Frontend

Add new todo tasks
Delete todo tasks
Edit todo tasks
Delete todo tasks
Complete todo tasks
Organise todo taks by date
Login and registration

## Backend

SQL database
CRUD(Create, read ,update, delete) ticket

A simplistic design was used for ease of use and ease of viewing, capable of organising todo tasks withim specfic dates

Empty todo task

Todo list with task

Checked todo task

Edit todo task

## Team descirption

The team consisted of one member and so one member worked on all tasks required.

Ethan Young - Ethan Young was the sole member of the team and thus a multi directional member of the team, providing QA testing, the to-do application functionailty , mock up and wire frames for the application to provide an overview.

Ethan Young key roles:
Writing tests
Writing functionailty
CI/CD pratices
Code health set up
Project manager
Designer
Documentation of application
Implementing code formatter
Code reviews
Automated testing
Scrum master

## Prerequisites

You will need the to-do-application and the to-do-backend application.

- Node.js
- npm or yarn

## Run application

-to-do-application

```bash
   git clone
   cd ../to-do-application
   npm start
```

-to-do-backend

```bash
   git clone
   cd ../to-do-backend
   npm start
```

## Run jest tests

### Run unit tests

to-do-application

```bash
   npm run test
```

to-do-backend

```bash
   npm run test
```

### Run jest integration tests

to-do-application

```bash
   npm run test:integration
```

to-do-backend

```bash
   npm run test:integration
```

Command to stop the service: ctrl+C

## Endpoints

The application has only ran through local host, all endpoints will be based on local host connections.

### Frontend

#### Login

https://localhost:3000/login

#### Register

https://localhost:3000/login

#### Tickets

https://localhost:3000/tickets

### Backend

Backend URL for the CRUD system

#### Get Tickets

List all tickets

http://localhost:5000/tickets

#### POST Tickets

This end points creates a new ticket

http://localhost:5000/tickets

Request Body
{
"title": "string",
"description": "string",
"date": "YYYY-MM-DD",
"time": "HH:MM"
}

#### PUT ticket

This end point allows the ticket to be updated

PUT http://localhost:5000/api/tickets/:id

Request Body
{
"title": "string",
"description": "string",
"date": "YYYY-MM-DD",
"time": "HH:MM"
}

#### DELETE ticket

This end point to delete a ticket

PUT http://localhost:5000/api/tickets/:id

Request Body
{
"title": "string",
"description": "string",
"date": "YYYY-MM-DD",
"time": "HH:MM"
}

#### PATCH ticket

This end point to delete a ticket

PATCH http://localhost:5000/api/tickets/:id/complete

Request Body
{
"title": "string",
"description": "string",
"date": "YYYY-MM-DD",
"time": "HH:MM"
}

## Tools

## Programming languages and modules

### Language

Javascript, CSS, HTML

### Modules

#### Frotend

React
React Router
Axios
React Modal

#### Backend

Express
Body-Parser
Cors
Bcrypt
Morgan

## GitHub / Git

This project used git for version controlling. Github provides remote repository capabailities which can merge with master branch using Github. Each branch was named after a Jira ticket and then given a descriptive name e.g. "KAY-1-project-setup". Each branch was reviewed by Ethan to ensure functionailty and code quailty is healthy before being merged.

Github provides CI/CD pipelines which can automate the testing of code when branches are pushed, Guthub is used to automate the running of tests when a branch is pushed to Github.

### Deepsource

Deepsource is a tool that checks the quailty of the code for each branch before branches are merged into master, it's an automated process to check for duplication, code complexity, bugs and out dated programming methods. This follows SQA pratices by ensuring the code is always in a good condition.

### Node.js

Node.js provides both frontend and backend capabilities, allowing for a complete Javascript based program without the need of other languages.

Node.JS provides a large array of modules and packages which brings a lot of customisation to Javascipt and what can be done with it, such as ReactJS being a big component of this application.

### Testing

Jest provides a way of testing applications, by providing unit test, integration tests and snapshot tests and provides a easy to use command based analytics tools that provide stastics on failed tests and the reason and stastics on the amount of passed and failed tests.

### Prettier

Provides a tool to keep code within a consistant formatting when files are saved.

## Agile development

This project followed the Agile development appraoch. A Kanban styled development approach, were work will be visualised on a board. Tickets will be added to the board, reviewed when the task is finished and added to complete board once done.

Kanban focused on flexibilty of tasks, were tasks can be changed, addded, or deleted. During the process of building the application, a redesign of the frontend was required to create an application that was easier to program. Kanban provides a flexiabilty waterfall fails to provide, waterfall requires tasks to be completed within a deadline without deviation.

### Retrospectives

Retrospectives were conducted every three days to udnerstand the progress made, discuss possible new directions, bugs and potential new features. A notepad was used to write out the thoughts during development to provide a reference.

### Jira board

To do - All tickets are stored on this column
In progress - Tickets currently being worked on will be stored in this board
Review - Once a merge request has been created, the tickets will be moved into this colum.
Done - Once merged, tickets will be added within the colum.

The board can be viewed: https://todoapp.atlassian.net/jira/software/projects/KAN/boards/1

##Testing Metholodly

Unit tests - Unit tests provide a method of testing each functionailty within the application. The advantage of this is to ensure each component on an indvidual level returns a value that is expected. Ensuring that each component within React does load correctly when the application starts.

Integration - Integration tests provides the ability to test multiple functions together, this allows for complex system to be checked. Within the application all React components were tested to ensure they worked together and had the desired functinailty.

Manuel testing - When a feature was added to the application, during the review process it would be teste by the reviewer to ensure the application was within a working order. A few examples are printing text to a command line was also conducted to test if buttons being clicked were being registered, or the login in system was logging in a user.

Snapshot testing

A CI pipeline was added to Github to automate the running helping other keeep track of their tests failures and success.
