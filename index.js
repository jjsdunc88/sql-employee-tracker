const inquirer = require('inquirer')
const db = require("./config/connection")
const showTable = require("./utility/table")

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
            ]
        },

    ])
        .then(answer => {
            console.log(answer);

            if (answer.choice == 'view all departments') {
                viewAllDept()
            }
            if (answer.choice == "view all roles") {
                viewRoles();
            }
            if (answer.choice == "view all employees") {
                viewEmp();
            }

            if (answer.choice == "add a department") {
                addDept();
            }
            if (answer.choice == "add a role") {
                addRole();
            }
            if (answer.choice == "add an employee") {
                addEmp();
            }
            if (answer.choice == "update an employee role") {
                updateEmpRole();
            }
        })
}


function viewAllDept() {
    // database to get all departments
    // SELECT * FROM department;
    db.query("SELECT * FROM department;", function (err, data) {
        if (err) {
            console.log(err);
            return;
        } else {
            // console.log(data)
            showTable(data)
            mainMenu()
        }
    })
}


async function viewRoles() {
    const roleData = await db.promise().query("SELECT * FROM role;")
    showTable(roleData[0]);
    mainMenu()
}

async function viewEmp() {
    const roleData = await db.promise().query("SELECT * FROM employee;")
    showTable(roleData[0]);
    mainMenu()
}


async function addDept() {
    const response = await inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the name of this new department?"
        }
    ])

    const deptData = await db.promise().query("INSERT INTO department (name) VALUES (?)", [response.dept_name])

    console.log(deptData);
}


async function addRole() {

    const deptData = await db.promise().query("SELECT * FROM department")
    const deptChoices = deptData[0].map(({id, name})=> ({name: name, value: id}))
    const response = await inquirer.prompt([
        {
            type: "input",
            name: "role_name",
            message: "What is the name of this new role?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What department does this role belong to?",
            choices: deptChoices
        },
        {
            type: "input",
            name: "role_salary",
            message: "What is the salary of this role?"
        },

    ]);
   
    const newRole = await db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.role_name, response.role_salary, response.role_id]) 

    console.log(newRole);
}


mainMenu();