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
        console.log(teamArray);

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
        console.log(teamArray);

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

        console.log(teamArray);
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
    let cardsHTML = "";
    teamArray.forEach(employee =>{
        let teamCards = employee.generateCard();
        cardsHTML += teamCards;
    });


}

startApp();