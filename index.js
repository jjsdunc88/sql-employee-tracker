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

            if (answer.choice == "add a department") {
                addDept();
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

function addDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the name of this new department?"
        }
    ])
        .then(answers => {
            // INSERT INTO department (name) VALUES ("Engineering")

            // db.query(`INSERT INTO department (name) VALUES ("${answers.dept_name}")`, function(err, data) {
            //     if(err) {
            //         console.log(err);
            //         return;
            //     } else {
            //         console.log(data)
            //     }
            // })

            db.query("INSERT INTO department (name) VALUES (?)", [answers.dept_name], function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log("Added a new department!")
                    mainMenu()
                }
            })
        })

}


mainMenu();