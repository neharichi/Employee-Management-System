// dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
require('dotenv').config();


// create mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeeTracker_db"
});


var roles;
// initiate mysql connection
connection.connect(function (err) {
    if (err) {
        console.error("error connecting:" + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId);
    // prompt user first question
    connection.query("SELECT id, title FROM roles", function(error, data){
        roles =  data.map(role => ({ "name": role.title, "value": role.id }))
    //    console.log("-->", roles);

        promptUser();
    })
   
});


// db access
// async function viewroles() {
//     const roles = await findallroles()      // [{name:"salesperson", value:1},{name::lawyer, value:2}]
//     const roleschoices = roles.map(role => ({ "name": role.title, "value": role.id }))
//     return roleschoices
//     console.log(roleschoices)
// }
// function findallroles() {
//      connection.query("SELET id, title FROM roles", function(roles){
//          return  roles.map(role => ({ "name": role.title, "value": role.id }))
//      })
// }

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ],
            name: "option"
        }
    ])
        .then(function ({ option }) {
            this.option = option;

            switch (option) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee":
                    updateEmployee();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                default:
                    quitNode();
            }
        });
};


// view all employees (REQ)
function viewAllEmployees() {
    var queryString = "SELECT employee.id, employee.first_name, employee.last_name, roles.title as position, roles.salary, department.name as department, manager.first_name as manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id ";
    connection.query(queryString, function (err, result) {
        if (err) throw err;
        console.table(result);
        promptUser();
    });
};

// view all employees by department (BONUS)

// view all employees by manager (BONUS)

// add employee (REQ)
function addEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
            validate: function validateFirst(name) {
                return name !== '';
            }
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
            validate: function validateLast(name) {
                return name !== '';
            }
        },
        {
            type: "list",
            message: "What is the employee's role? (1-salesperson, 2-lawyer, 3-engineer)",
            choices: roles,
            name: "role_id"
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: ["None", "bea", "Mike", "Tom"],
            name: "manager_id"
        }
    ]).then(function ({ first_name, last_name, role_id, manager_id }) {
        if (manager_id === "bea"){
            manager_id = 1
        } else if (manager_id === "birdie"){
            manager_id = 2
        } else if (manager_id === "bowie"){
            manager_id = 3;
        } else if (manager_id === "None"){
            manager_id = null
        }
        var queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            console.log(result);
            viewAllEmployees();
            promptUser();
        });
    })
}

// remove employee (BONUS)

// update employee role (REQ)
function updateEmployee() { }

// update employee manager (BONUS)

// view all roles (REQ)
function viewAllRoles() {
    var queryString = "SELECT roles.title as position, roles.salary, department.name FROM roles LEFT JOIN department on roles.id = department.id";
    connection.query(queryString, function (err, result) {
        if (err) throw err;
        console.table(result);
        promptUser();
    });
};

// add role (REQ)
function addRole() {
    
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "title",
            validate: function validateTitle(name) {
                return name !== '';
            }
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary",
            validate: function validateSalary(name) {
                return name !== '';
            }
        },
        {
            type: "list",
            message: "Which department does this role belong to? (1-sales, 2-legal, 3-engineering)",
            choices: ["sales", "legal", "engineering"],
            name: "department_id",

        }
    ]).then(function ({ title, salary, department_id }) {
        if (department_id === "sales"){
            department_id = 1
        } else if (department_id === "legal"){
            department_id = 2
        } else if (department_id === "engineering"){
            department_id = 3
        }
        
        var queryString = `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', ${salary}, ${department_id})`;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            console.log(result);
            viewAllRoles();
            promptUser();
        })
    })
}


// remove role (BONUS)

// view all departments (REQ)
function viewAllDepartments() {
    var queryString = "SELECT * FROM department";
    connection.query(queryString, function (err, result) {
        if (err) throw err;
        console.table(result);
        promptUser();
    });
};

// add department (REQ)
function addDepartment() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department?",
            name: "name",
            validate: function validateFirst(name) {
                return name !== '';
            }
        }
    ]).then(function ({ name }) {
        var queryString = `INSERT INTO department (name) VALUES ('${name}')`;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            console.log(result);
            viewAllDepartments();
            promptUser();
        })

    })
}

// remove department (BONUS)

// quit (REQ)
function quitNode() {
    console.log("Goodbye!");
    return connection.end();
};

