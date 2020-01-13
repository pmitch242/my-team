const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let id = 0;
let teamArray = [];

function startApp() {
    console.log("Welcome to My Team");
    console.log("Let's start with the Manager...")

    addManager();
}

function addAnotherEmployee() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another employee?",
            name: "anotherEmployee"
        }
    ]).then(confirm => {
        if (confirm.anotherEmployee) {
            addEmployee();
        }
        else {
            console.log("Done adding Employees!")
            createHTML();
        }
    })
}

function addEngineer() {
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
        id++;
        let engineerName = answers.engineerName;
        let engineerEmail = answers.engineerEmail;
        let engineerGitHub = answers.engineerGitHub;

        let engineer = new Engineer(engineerName, id, engineerEmail, engineerGitHub);

        teamArray.push(engineer);
    

        addAnotherEmployee();
    })
}

function addIntern() {
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
        id++;
        let internName = answers.internName;
        let internEmail = answers.internEmail;
        let internSchool = answers.internSchool;

        let intern = new Intern(internName, id, internEmail, internSchool);

        teamArray.push(intern);
    

        addAnotherEmployee();
    })
}

function addEmployee() {
    inquirer.prompt([

        {
            type: "list",
            message: "What is this employee's role?",
            choices: ["Engineer", "Intern"],
            name: "employeeRole"
        }
    ]).then(answers => {
        let employeeRole = answers.employeeRole;
        if (employeeRole === "Engineer") {
            addEngineer();
        }
        else {
            addIntern()
        }
    })
}

function addManager() {
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
        id++;
        let managerName = answers.managerName;
        let managerEmail = answers.managerEmail;
        let managerOfficeNumber = answers.managerOfficeNumber;
        let manager = new Manager(managerName, id, managerEmail, managerOfficeNumber);

        teamArray.push(manager);

    
    }).then(() => {
        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to add another Manager?",
                name: "newManager"
            }
        ]).then(confirm => {
            if (confirm.newManager) {
                addManager();
            }
            else {
                console.log("Now to add the rest of your team!");
                addEmployee();
            }
        })
    })
}

function createHTML(){
    console.log("We are now creating your team's HTML...")
    let cardsHTML = "";
    teamArray.forEach(employee =>{
        let teamCards = employee.generateCard();
        cardsHTML += teamCards;
    });

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

    fs.writeFile("./output/myteam.html", teamHTML, function(err) {
        if (err) {
           return console.log(err);
        }
        console.log("myteam.html was created!")
     });
}

startApp();