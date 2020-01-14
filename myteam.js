const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let id = 0;
let teamArray = [];

// function to initiate application
function startApp() {
    console.log("Welcome to My Team");
    console.log("Let's start with the Manager...")

    addManager();
}

// funtion that adds another Employee
function addAnotherEmployee() {

    // Prompt User
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another employee?",
            name: "anotherEmployee"
        }
    ]).then(confirm => {

        // If user wants to add another employee, call addEmployee function
        if (confirm.anotherEmployee) {
            addEmployee();
        }

        // if user is done adding employees, call createHTML function
        else {
            console.log("Done adding Employees!")
            createHTML();
        }
    })
}

// function to add Engineer
function addEngineer() {

    // Prompt user
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the engineer?",
            name: "engineerName"
        },
        {
            type: "input",
            message: "What is their email address?",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "What is their GitHub name?",
            name: "engineerGitHub"
        }
    ]).then(answers => {

        // increment id
        id++;

        // store user's answers 
        let engineerName = answers.engineerName;
        let engineerEmail = answers.engineerEmail;
        let engineerGitHub = answers.engineerGitHub;

        // create new engineer using Engineer class
        let engineer = new Engineer(engineerName, id, engineerEmail, engineerGitHub);

        // push engineer into teamArray
        teamArray.push(engineer);
    
        addAnotherEmployee();
    })
}

// function to add Intern
function addIntern() {

    // prompt user
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the intern?",
            name: "internName"
        },
        {
            type: "input",
            message: "What is their email address?",
            name: "internEmail"
        },
        {
            type: "input",
            message: "What is the name of their school?",
            name: "internSchool"
        }
    ]).then(answers => {

        // increment id
        id++;

        // store user's answers
        let internName = answers.internName;
        let internEmail = answers.internEmail;
        let internSchool = answers.internSchool;

        // create new intern using Intern class
        let intern = new Intern(internName, id, internEmail, internSchool);

        // push intern into teamArray
        teamArray.push(intern);
    

        addAnotherEmployee();
    })
}

// function that adds general Employee
function addEmployee() {

    // promt user
    inquirer.prompt([
        {
            type: "list",
            message: "What is this employee's role?",
            choices: ["Engineer", "Intern"],
            name: "employeeRole"
        }
    ]).then(answers => {
        
        // store user answer
        let employeeRole = answers.employeeRole;

        // call addEngineer function if user wants to add an engineer
        if (employeeRole === "Engineer") {
            addEngineer();
        }

        // call addIntern function if user wants to add an intern
        else {
            addIntern()
        }
    })
}

// function that adds Manager
function addManager() {

    // prompt user
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Manager's name?",
            name: "managerName"
        },
        {
            type: "input",
            message: "What is their email address?",
            name: "managerEmail"
        },
        {
            type: "input",
            message: "What is their office number?",
            name: "managerOfficeNumber"
        }
    ]).then(answers => {
        // increment id
        id++;

        // store user's answers
        let managerName = answers.managerName;
        let managerEmail = answers.managerEmail;
        let managerOfficeNumber = answers.managerOfficeNumber;

        // create new manager using Manager class
        let manager = new Manager(managerName, id, managerEmail, managerOfficeNumber);

        // push manager into teamArray
        teamArray.push(manager);

    }).then(() => {
        // prompt user
        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to add another Manager?",
                name: "newManager"
            }
        ]).then(confirm => {

            // call addManager funtion if user wants to add a manager
            if (confirm.newManager) {
                addManager();
            }

            // call addEmployee funtion if user is done adding managers
            else {
                console.log("Now to add the rest of your team!");
                addEmployee();
            }
        })
    })
}

// function to create HTML
function createHTML(){
    console.log("We are now creating your team's HTML...")
    let cardsHTML = "";

    // get employee's card html
    teamArray.forEach(employee =>{
        let teamCards = employee.generateCard();
        cardsHTML += teamCards;
    });

    // store teamHTML
    let teamHTML = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Team</title>
    <!-- Links -->
    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/4b155f78bb.js" crossorigin="anonymous"></script>
    <!-- Title Icon -->
    <link rel="shortcut icon" type= "image/gif" href="http://aux2.iconspalace.com/uploads/user-group-icon-256.png" sizes="16x16"/>
</head>

<body>
    <div class="" style="width: 100vw; padding: 30px 0; background: red; text-align: center;">
        <h1 style="color: white;">My Team</h1>
    </div>
    <div class="container card-deck row row-cols-1 row-cols-md-3" style="margin-top: 50px; margin-right: auto; margin-left: auto;">
        ${cardsHTML}
    </div>
</body>

</html>
    `

    // write html
    fs.writeFile("./output/myteam.html", teamHTML, function(err) {
        if (err) {
           return console.log(err);
        }
        console.log("myteam.html was created!")
     });
}

// start app
startApp();