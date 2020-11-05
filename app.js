const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const addAnotherEmployeeQ = [
  {
    name: "addAnotherEmployee",
    message: "Would you like to add an employee?",
    type: "confirm",
  },
];
const addEmployeeRoleQ = [
  {
    name: "employeeRole",
    message: "What's the role for this new employee?",
    type: "list",
    choices: ["Manager", "Engineer", "Intern"],
  },
];
const addEmployeeQ = [
  {
    name: "name",
    message: "Employee name:",
  },
  {
    name: "id",
    message: "Employee id:",
  },
  {
    name: "email",
    message: "Employee email:",
  },
];
const addManagerQ = [
  {
    name: "officeNumber",
    message: "Office number:",
  },
];
const addEngineerQ = [
  {
    name: "github",
    message: "Github:",
  },
];
const addInternQ = [
  {
    name: "school",
    message: "School:",
  },
];
const employees = [];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

console.log("Welcome to Employee Viewer");
console.log("----------");
start();

function start() {
  inquirer.prompt(addAnotherEmployeeQ).then((answers) => {
    if (answers.addAnotherEmployee) getEmployeeRole();
    else finish();
  });
}

function getEmployeeRole() {
  inquirer.prompt(addEmployeeRoleQ).then((answers) => {
    switch (answers.employeeRole) {
      case "Manager":
        addManager();
        break;
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
    }
  });
}
function addManager() {
  let questions = addEmployeeQ.concat(addManagerQ);
  inquirer.prompt(questions).then((answers) => {
    let employee = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    employees.push(employee);
    console.log(`${employee.getRole()} ${employee.getName()} added`);
    start();
  });
}

function addEngineer() {
  let questions = addEmployeeQ.concat(addEngineerQ);
  inquirer.prompt(questions).then((answers) => {
    let employee = new Engineer(
      answers.name,
      answers.id,
      answers.email,
      answers.github
    );
    employees.push(employee);
    console.log(`${employee.getRole()} ${employee.getName()} added`);
    start();
  });
}

function addIntern() {
  let questions = addEmployeeQ.concat(addInternQ);
  inquirer.prompt(questions).then((answers) => {
    let employee = new Intern(
      answers.name,
      answers.id,
      answers.email,
      answers.school
    );
    employees.push(employee);
    console.log(`${employee.getRole()} ${employee.getName()} added`);
    start();
  });
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
