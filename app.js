const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const countPrompts = [
  {
    type: "input",
    message: "How many engineers are in your team?",
    name: "engineerCount",
  },
  {
    type: "input",
    message: "How many interns are in your team?",
    name: "internCount",
  },
];

const managerPrompts = [
  {
    type: "input",
    message: "Enter manager name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter manager id",
    name: "id",
  },
  {
    type: "input",
    message: "Enter manager email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter manager office number",
    name: "officeNumber",
  },
];

const engineerPrompts = [
  {
    type: "input",
    message: "Enter engineer name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter engineer id",
    name: "id",
  },
  {
    type: "input",
    message: "Enter engineer email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter engineer Github",
    name: "github",
  },
];

const internPrompts = [
  {
    type: "input",
    message: "Enter intern name",
    name: "name",
  },
  {
    type: "input",
    message: "Enter intern id",
    name: "id",
  },
  {
    type: "input",
    message: "Enter intern email",
    name: "email",
  },
  {
    type: "input",
    message: "Enter intern school",
    name: "school",
  },
];

const engineerCountPrompt = [
  {
    type: "input",
    message: "Enter number of Engineers on your team.",
    name: "count",
  },
];

const internCountPrompt = [
  {
    type: "input",
    message: "Enter number of Interns on your team.",
    name: "count",
  },
];

async function buildTeam() {
  const manager = await inquirer.prompt(managerPrompts);
  employees.push(
    new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
  );

  const engineerCount = await inquirer.prompt(engineerCountPrompt);

  for (let i = 0; i < engineerCount.count; i++) {
    let engineer = await inquirer.prompt(engineerPrompts);
    employees.push(
      new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
    );
  }

  const internCount = await inquirer.prompt(internCountPrompt);

  for (let i = 0; i < internCount.count; i++) {
    let intern = await inquirer.prompt(internPrompts);
    employees.push(
      new Intern(intern.name, intern.id, intern.email, intern.school)
    );
  }

  const html = render(employees);

  fs.writeFile(outputPath, html, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}

buildTeam();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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
