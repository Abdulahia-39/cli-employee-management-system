# CLI Employee management software
#### Video Demo:  <URL HERE>
## Description:

This Employee Management System is a command-line application that allows users to manage employee information such as their first name, last name, position, and salary. It provides functionalities to add, update, delete, view employees, and save the employee data to a JSON file (`employees.json`) for future use. The application uses `inquirer` for interactive prompts and `fs` (File System) to handle file operations.

## Features

1. **Add Employee**: Allows the user to input new employee details including their first name, last name, position, and salary. If the employee already exists, their details will be updated.
2. **Delete Employee**: Allows the user to delete an employee by providing the first name of the employee.
3. **Update Employee**: The user can update the salary of an existing employee.
4. **Show Employees**: Displays a list of all employees with their details.
5. **Save and Exit**: Saves the current employee data to a JSON file and exits the program.

## Installation

1. Ensure you have Node.js installed on your system.
2. Clone or download the project.
3. Install dependencies by running:
   ```bash
   npm install inquirer fs
   ```

## How to Run

To start the Employee Management System, run the following command in your terminal:

```bash
node <filename>.js
```

This will launch the application, and you will be greeted with a menu to manage your employees.

## Code Structure

### 1. **Employee Class**

The `Employee` class is the core structure representing an employee in the system. It contains:

- **Attributes**:
  - `firstName`: The employee's first name.
  - `lastName`: The employee's last name.
  - `position`: The employee's job title (e.g., Management, Engineering).
  - `salary`: The employee's salary (converted to a number).
  
- **Methods**:
  - `saveEmployee()`: Adds a new employee or updates an existing one based on their first and last names.
  - `getEmpFirstName`: A getter method to retrieve the employee’s first name.
  - `updateSalary(amount)`: A setter to update the employee's salary and save the changes.

### 2. **Main Functionalities**

- **`empInp()`**: Prompts the user for employee details (first name, last name, position, and salary) and adds the employee to the system.
- **`deleteEmp(name)`**: Deletes an employee based on the provided first name.
- **`updateEmp(name)`**: Updates the salary of an employee by first name.
- **`saveData()`**: Saves the current employee list to a JSON file (`employees.json`).
- **`readData()`**: Reads the employee data from `employees.json` at the start of the program.
- **`mainDisplay()`**: Displays the main menu with options to add, delete, update, view employees, or save and exit.

### 3. **Menu Operations**

- **`operations(answer)`**: A switch-case structure to handle user selections:
  - Add Employee
  - Delete Employee
  - Update Employee
  - Show Employees
  - Save and Exit

Each case invokes the relevant function and returns to the main menu unless the user chooses to exit.

### 4. **Employee Data Management**

The system reads employee data from `employees.json` when the program starts using `readData()`. Any changes made (add, delete, update) are done in memory and saved to the file upon exiting the application via the `saveData()` function.

### Example Usage

1. **Adding an Employee**:
   - User selects "Add employee" from the main menu.
   - The system prompts for first name, last name, position, and salary.
   - If the employee already exists, their details are updated; otherwise, they are added to the system.

2. **Updating an Employee's Salary**:
   - The user selects "Update employee" and enters the employee's first name.
   - The system prompts for the additional salary amount and updates the employee’s salary.

3. **Deleting an Employee**:
   - The user selects "Delete employee" and enters the first name of the employee to be deleted.
   - The employee is removed from the list, and the user is returned to the main menu.

4. **Viewing Employees**:
   - Selecting "Show employees" displays all employees with their first name, last name, position, and salary.

## File Management

- **employees.json**: This file stores all employee data as a JSON object, enabling the system to persist employee information across multiple sessions.

## Error Handling

- The system validates user inputs for numbers (like salary) and ensures proper handling of non-numeric entries.
- In cases where an employee is not found (for deletion or update), the system gracefully informs the user.

## Future Enhancements

- Add more validation, such as preventing duplicate names or ensuring the salary is positive.
- Add features like searching employees by last name, or allowing for more flexible queries.

## Conclusion

This Employee Management System is a simple yet powerful tool for managing employee data in a structured, easy-to-use command-line interface. With its ability to persist data, it serves as a good starting point for more advanced HR systems or small business use.