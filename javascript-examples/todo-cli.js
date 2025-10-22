#!/usr/bin/env node
/**
 * Todo CLI Application
 * A simple command-line todo list with persistent storage
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

class TodoApp {
    constructor() {
        this.todoFile = path.join(__dirname, 'todos.json');
        this.todos = this.loadTodos();
    }

    loadTodos() {
        try {
            if (fs.existsSync(this.todoFile)) {
                const data = fs.readFileSync(this.todoFile, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading todos:', error.message);
        }
        return [];
    }

    saveTodos() {
        try {
            fs.writeFileSync(
                this.todoFile,
                JSON.stringify(this.todos, null, 2),
                'utf8'
            );
        } catch (error) {
            console.error('Error saving todos:', error.message);
        }
    }

    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.todos.push(todo);
        this.saveTodos();
        console.log(`✓ Added: "${text}"`);
    }

    listTodos() {
        if (this.todos.length === 0) {
            console.log('No todos yet! Add one with: node todo-cli.js add "Your task"');
            return;
        }

        console.log('\n📝 Your Todos:\n');
        this.todos.forEach((todo, index) => {
            const status = todo.completed ? '✓' : '○';
            const style = todo.completed ? '\x1b[2m' : '';
            const reset = '\x1b[0m';
            console.log(`${status} ${index + 1}. ${style}${todo.text}${reset}`);
        });
        console.log('');
    }

    completeTodo(index) {
        if (index < 1 || index > this.todos.length) {
            console.log('Invalid todo number');
            return;
        }

        const todo = this.todos[index - 1];
        todo.completed = true;
        this.saveTodos();
        console.log(`✓ Completed: "${todo.text}"`);
    }

    deleteTodo(index) {
        if (index < 1 || index > this.todos.length) {
            console.log('Invalid todo number');
            return;
        }

        const todo = this.todos.splice(index - 1, 1)[0];
        this.saveTodos();
        console.log(`✓ Deleted: "${todo.text}"`);
    }

    clearCompleted() {
        const initialLength = this.todos.length;
        this.todos = this.todos.filter(todo => !todo.completed);
        const removed = initialLength - this.todos.length;
        this.saveTodos();
        console.log(`✓ Cleared ${removed} completed todo(s)`);
    }

    showHelp() {
        console.log(`
Todo CLI Application

Usage:
  node todo-cli.js <command> [arguments]

Commands:
  add <text>        Add a new todo
  list              List all todos
  complete <number> Mark a todo as complete
  delete <number>   Delete a todo
  clear             Clear all completed todos
  help              Show this help message

Examples:
  node todo-cli.js add "Buy groceries"
  node todo-cli.js list
  node todo-cli.js complete 1
  node todo-cli.js delete 2
  node todo-cli.js clear
        `);
    }
}

// Main execution
function main() {
    const app = new TodoApp();
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command || command === 'help') {
        app.showHelp();
        return;
    }

    switch (command) {
        case 'add':
            const text = args.slice(1).join(' ');
            if (!text) {
                console.log('Error: Please provide todo text');
                console.log('Usage: node todo-cli.js add "Your task"');
            } else {
                app.addTodo(text);
            }
            break;

        case 'list':
            app.listTodos();
            break;

        case 'complete':
            const completeIndex = parseInt(args[1]);
            if (isNaN(completeIndex)) {
                console.log('Error: Please provide a valid todo number');
            } else {
                app.completeTodo(completeIndex);
            }
            break;

        case 'delete':
            const deleteIndex = parseInt(args[1]);
            if (isNaN(deleteIndex)) {
                console.log('Error: Please provide a valid todo number');
            } else {
                app.deleteTodo(deleteIndex);
            }
            break;

        case 'clear':
            app.clearCompleted();
            break;

        default:
            console.log(`Unknown command: ${command}`);
            app.showHelp();
    }
}

if (require.main === module) {
    main();
}

module.exports = TodoApp;
