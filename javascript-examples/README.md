# JavaScript Examples

This directory contains Node.js demonstration applications.

## Examples

### Todo CLI Application (`todo-cli.js`)

A command-line todo list application with persistent storage using JSON files.

**Features:**
- Add, list, complete, and delete todos
- Persistent storage (todos saved to `todos.json`)
- Simple and intuitive command-line interface
- Color-coded output

**Installation:**
```bash
npm install
```

**Usage:**

Add a todo:
```bash
node todo-cli.js add "Buy groceries"
node todo-cli.js add "Finish project"
```

List all todos:
```bash
node todo-cli.js list
```

Complete a todo:
```bash
node todo-cli.js complete 1
```

Delete a todo:
```bash
node todo-cli.js delete 2
```

Clear completed todos:
```bash
node todo-cli.js clear
```

Show help:
```bash
node todo-cli.js help
```

## Requirements

- Node.js 14 or higher
- No external dependencies required (uses only Node.js built-in modules)
