#!/usr/bin/env python3
"""
File Organizer Demo
Organizes files in a directory by their type and date.
"""

import os
import shutil
from pathlib import Path
from datetime import datetime
import argparse


class FileOrganizer:
    """Organize files by type and date."""

    FILE_CATEGORIES = {
        "Images": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
        "Documents": [".pdf", ".doc", ".docx", ".txt", ".md", ".odt"],
        "Spreadsheets": [".xls", ".xlsx", ".csv", ".ods"],
        "Videos": [".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv"],
        "Audio": [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
        "Archives": [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"],
        "Code": [".py", ".js", ".html", ".css", ".java", ".cpp", ".c", ".go", ".rs"],
        "Others": []
    }

    def __init__(self, source_dir, dry_run=False):
        """
        Initialize the file organizer.

        Args:
            source_dir (str): Directory to organize
            dry_run (bool): If True, only print actions without executing
        """
        self.source_dir = Path(source_dir)
        self.dry_run = dry_run

    def get_file_category(self, file_path):
        """Determine the category of a file based on its extension."""
        extension = file_path.suffix.lower()

        for category, extensions in self.FILE_CATEGORIES.items():
            if extension in extensions:
                return category

        return "Others"

    def organize_by_type(self):
        """Organize files into subdirectories by type."""
        if not self.source_dir.exists():
            print(f"Error: Directory {self.source_dir} does not exist")
            return

        files = [f for f in self.source_dir.iterdir() if f.is_file()]

        print(f"\nOrganizing {len(files)} files by type...")

        for file_path in files:
            category = self.get_file_category(file_path)
            category_dir = self.source_dir / category

            if self.dry_run:
                print(f"[DRY RUN] Would move: {file_path.name} -> {category}/")
            else:
                category_dir.mkdir(exist_ok=True)
                destination = category_dir / file_path.name

                # Handle duplicate filenames
                counter = 1
                while destination.exists():
                    stem = file_path.stem
                    suffix = file_path.suffix
                    destination = category_dir / f"{stem}_{counter}{suffix}"
                    counter += 1

                shutil.move(str(file_path), str(destination))
                print(f"Moved: {file_path.name} -> {category}/")

        print("\nOrganization complete!")

    def organize_by_date(self):
        """Organize files into subdirectories by modification date."""
        if not self.source_dir.exists():
            print(f"Error: Directory {self.source_dir} does not exist")
            return

        files = [f for f in self.source_dir.iterdir() if f.is_file()]

        print(f"\nOrganizing {len(files)} files by date...")

        for file_path in files:
            mod_time = datetime.fromtimestamp(file_path.stat().st_mtime)
            date_dir = self.source_dir / mod_time.strftime("%Y-%m")

            if self.dry_run:
                print(f"[DRY RUN] Would move: {file_path.name} -> {date_dir.name}/")
            else:
                date_dir.mkdir(exist_ok=True)
                destination = date_dir / file_path.name

                # Handle duplicate filenames
                counter = 1
                while destination.exists():
                    stem = file_path.stem
                    suffix = file_path.suffix
                    destination = date_dir / f"{stem}_{counter}{suffix}"
                    counter += 1

                shutil.move(str(file_path), str(destination))
                print(f"Moved: {file_path.name} -> {date_dir.name}/")

        print("\nOrganization complete!")


def main():
    """Main function with CLI interface."""
    parser = argparse.ArgumentParser(
        description="Organize files in a directory by type or date"
    )
    parser.add_argument(
        "directory",
        help="Directory to organize"
    )
    parser.add_argument(
        "--by",
        choices=["type", "date"],
        default="type",
        help="Organization method (default: type)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without actually moving files"
    )

    args = parser.parse_args()

    organizer = FileOrganizer(args.directory, dry_run=args.dry_run)

    if args.by == "type":
        organizer.organize_by_type()
    else:
        organizer.organize_by_date()


if __name__ == "__main__":
    main()
