# Python Examples

This directory contains Python demonstration scripts showcasing various common tasks.

## Examples

### 1. Weather API Client (`weather_api.py`)

A command-line tool to fetch and display weather information for any location.

**Usage:**
```bash
python weather_api.py [location]
```

**Examples:**
```bash
python weather_api.py London
python weather_api.py "New York"
python weather_api.py Tokyo
```

### 2. File Organizer (`file_organizer.py`)

A utility to organize files in a directory by type or date.

**Usage:**
```bash
python file_organizer.py <directory> [--by type|date] [--dry-run]
```

**Examples:**
```bash
# Organize by file type (dry run)
python file_organizer.py ~/Downloads --by type --dry-run

# Organize by modification date
python file_organizer.py ~/Downloads --by date

# Organize by type (default)
python file_organizer.py ~/Downloads
```

## Installation

Install required dependencies:

```bash
pip install -r requirements.txt
```

## Requirements

- Python 3.7 or higher
- See `requirements.txt` for package dependencies
