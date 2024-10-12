import inquirer from "inquirer";
import fs from "fs";
let employees = [];

class Employee {
    constructor(firstName, lastName, position, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.salary = parseFloat(salary); // Ensure salary is a number
    }

    saveEmployee() {
        let employeeExists = false;

        // Check if the employee already exists
        for (let emp of employees) {
            if (emp['firstName'] === this.firstName && emp['lastName'] === this.lastName) {
                emp['position'] = this.position;
                emp['salary'] = this.salary;
                employeeExists = true;
                break; // Exit the loop since we found and updated the employee
            }
        }

        // If the employee does not exist, add them
        if (!employeeExists) {
            employees.push(this); // Push the current instance directly
        }
    }

    get getEmpFirstName() {
        return this.firstName;
    }

    set updateSalary(amount) {
        amount = parseFloat(amount); // Ensure amount is a number
        if (!isNaN(amount)) {
            this.salary += amount;
            this.saveEmployee();
        } else {
            console.error("Invalid amount provided for salary update.");
        }
    }
}

function empInp() {
    return inquirer.prompt(
        [
            {
                name: 'firstName',
                message: 'Write the first name: ',
                type: 'input'
            },
            {
                name: 'lastName',
                message: 'Write the last name: ',
                type: 'input'
            },
            {
                name: 'position',
                message: 'What position is he/she holding?: ',
                type: 'list',
                choices: ["Management", "Finance", "Engineering", "Marketing", "Non-technical staff"]
            },
            {
                name: 'salary',
                message: 'Write the employee\'s salary: ',
                type: 'input',
                validate: (input) => !isNaN(input) || "Please enter a valid number." // Ensure salary is a number
            }
        ]
    )
    .then((answer) => {
        let emp = new Employee(answer.firstName, answer.lastName, answer.position, answer.salary);
        emp.saveEmployee();
    });
}

function deleteEmp(name) {
    let found = false;
    employees.forEach((item, index) => {
        if (item['firstName'] === name) {
            employees.splice(index, 1);
            found = true;
            console.log("Employee deleted successfully");
        }
    });
    if (!found) {
        console.log("Employee not found!!");
    }
}

function saveData(){
    const data = JSON.stringify(employees, null, 2)

    return fs.promises.writeFile('employees.json', data, (err) => {
        if(err){
            console.error('Error saving the file: ', err)
        }
        else{
            console.log('Employee saved successfully')
        }
    })
}

function mainDisplay() {
    console.clear();
    console.log("\n\n-------EMPLOYEE MANAGEMENT SYSTEM----------");
    inquirer.prompt([
        {
            name: 'choice',
            message: 'Enter your option',
            type: 'list',
            choices: ["Add employee", "Delete employee", "Update employee", "Show employees","Save and exit"]
        }
    ])
    .then((answer) => {
        operations(answer.choice); // Directly call the operations function
    });
}

function updateEmp(name) {
    return new Promise((resolve, reject) => {
        let emp = employees.find(item => item['firstName'] === name);
        if (emp) {
            inquirer.prompt([
                {
                    name: 'salary',
                    message: 'Enter the added salary:',
                    type: 'input',
                    validate: (input) => !isNaN(input) || "Please enter a valid number." // Ensure salary is a number
                }
            ])
            .then((answer) => {
                emp.updateSalary = answer.salary;
                console.log("Employee successfully updated");
                resolve(); // Resolve the promise after successfully updating the employee
            })
            .catch((error) => {
                console.error("Error updating employee:", error);
                reject(error); // Reject the promise if an error occurs
            });
        } else {
            console.log("Employee not found");
            resolve(); // Resolve the promise even if the employee is not found
        }
    });
}


function operations(answer) {
    switch (answer) {
        case 'Add employee':
            empInp().then(() => mainDisplay()); // Return to main menu after adding employee
            break;
        case 'Delete employee':
            inquirer.prompt([
                {
                    name: 'name',
                    message: 'Enter the employee\'s first name:',
                    type: 'input'
                }
            ])
            .then((answer) => {
                deleteEmp(answer.name);
                mainDisplay(); // Return to main menu after deleting employee
            });
            break;
        case 'Update employee':
            inquirer.prompt([
                {
                    name: 'name',
                    message: 'Enter the employee\'s first name:',
                    type: 'input'
                }
            ])
            .then((answer) => {
                updateEmp(answer.name).then(() => mainDisplay()); // Return to main menu after updating employee
            });
            break;
        case 'Show employees':
            console.clear();
            employees.forEach((item) => {
                console.log(`\nFirst Name: ${item['firstName']}`);
                console.log(`Last Name: ${item['lastName']}`);
                console.log(`Position: ${item['position']}`);
                console.log(`Salary: $${item['salary']}`);
                console.log('------------------------------------------');
            });
            inquirer.prompt([
                {
                    name: 'continue',
                    message: 'Press Enter to return to the main menu.',
                    type: 'input'
                }
            ])
            .then(() => {
                mainDisplay(); // Return to main menu after showing employees
            });
            break;
        case 'Save and exit':
            saveData().then(() => {
                console.log("Exiting the Employee Management System.");
                console.clear()
                process.exit();
            })
            break;
    }
}

function readData(){
    try{
        fs.readFile('employees.json', 'utf8', (err, data) => {
            if(err){
                console.error('Error reading file: ', err)
                return
            }
    
            employees = JSON.parse(data)
        })
    }
    catch(err){
        console.log("Empty file")
    }
}


readData();
mainDisplay();
