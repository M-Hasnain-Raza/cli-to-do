#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [
    chalk.bgWhite.bold(" Add Todo + "),
    chalk.bgRed(" Exit > "),
];
async function todo() {
    let getStart = await inquirer.prompt([
        {
            message: "Select",
            name: "getStart",
            type: "list",
            choices: todos,
        },
    ]);
    if (getStart.getStart === chalk.bgWhite.bold(" Add Todo + ")) {
        let addTodo = await inquirer.prompt([
            {
                name: "addTodo",
                message: "Write somthing you want to save",
                type: "input",
            },
        ]);
        todos.push(chalk.bgYellowBright.bold(" " + addTodo.addTodo + " "));
        todo();
        // console.log(todos);
    }
    else if (getStart.getStart !== chalk.bgRed(" Exit > ")) {
        let edit = await inquirer.prompt([
            {
                message: "Select",
                name: "edit",
                type: "list",
                choices: ["Edit", "Delete", "Mark"],
            },
        ]);
        if (edit.edit === "Edit") {
            let editing = await inquirer.prompt([
                {
                    message: "Edit your note",
                    name: "editing",
                    type: "input",
                },
            ]);
            todos.splice(todos.indexOf(getStart.getStart), 1, chalk.bgBlueBright.bold.white(" " + editing.editing + " ") + chalk.blue(" (edited)"));
            todo();
        }
        else if (edit.edit === "Delete") {
            todos.splice(todos.indexOf(getStart.getStart), 1);
            todo();
        }
        else if (edit.edit === "Mark") {
            if (getStart.getStart.includes(" ^")) {
                todos.splice(todos.indexOf(getStart.getStart), 1, getStart.getStart.slice(0, getStart.getStart.length - 6));
            }
            else {
                todos.splice(todos.indexOf(getStart.getStart), 1, getStart.getStart + chalk.green(" ^"));
            }
            todo();
        }
    }
}
todo();
