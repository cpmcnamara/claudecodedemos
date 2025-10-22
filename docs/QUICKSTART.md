# Quick Start Guide

Welcome to Claude Code Demos! This guide will help you get started with the examples in this repository.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/cpmcnamara/claudecodedemos.git
cd claudecodedemos
```

### 2. Python Setup

Install Python dependencies:

```bash
cd python-examples
pip install -r requirements.txt
```

### 3. Node.js Setup

Install Node.js dependencies (none required for the basic example, but good practice):

```bash
cd javascript-examples
npm install
```

## Running the Examples

### Weather API Client (Python)

Get weather information for any location:

```bash
cd python-examples
python weather_api.py "San Francisco"
```

### File Organizer (Python)

Organize files in a directory (use --dry-run to preview):

```bash
cd python-examples
python file_organizer.py /path/to/directory --by type --dry-run
```

### Todo CLI (JavaScript)

Manage your todos from the command line:

```bash
cd javascript-examples
node todo-cli.js add "Learn Python"
node todo-cli.js list
node todo-cli.js complete 1
```

## Next Steps

- Explore the source code to understand how each example works
- Modify the examples to suit your needs
- Create your own examples and add them to the repository

## Need Help?

Check the README files in each example directory for more detailed information:
- [Python Examples README](../python-examples/README.md)
- [JavaScript Examples README](../javascript-examples/README.md)

## Contributing

Feel free to add your own examples or improve existing ones! Just fork the repository and submit a pull request.
