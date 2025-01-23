# CPH VS Code Extension (LeetCode)

## Overview
The **CPH VS Code Extension (LeetCode)** is designed to simplify competitive programming workflows. It automates the process of fetching test cases from LeetCode, allows you to run your code against those test cases, and supports multiple programming languages (e.g., C++, Python). This extension ensures a smooth coding and testing experience directly within Visual Studio Code.

---

## Features
- **Automatic Test Case Handling**: Fetches and prepares LeetCode problem test cases automatically.
- **Multi-language Support**: Compatible with C++ and Python solutions.
- **Integrated Task Runner**: Quickly execute your code using a predefined VS Code task.
- **Customizable Workflow**: Modular setup to allow future enhancements.

---

## Prerequisites
Before using the extension, ensure you have the following installed on your system:

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **VS Code**: [Download and install Visual Studio Code](https://code.visualstudio.com/).
- **C++ Compiler**: (e.g., `g++`) for running C++ code.
- **Python Interpreter**: (e.g., `python3`) for running Python code.

---

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Open the project in Visual Studio Code:
   ```bash
   code <path-to-project>
   ```

3. Navigate to the directory folder where all backend files are stored.

4. Run the following command in the terminal to install backend-specific dependencies:
    ```bash
    cd directory
    npm install
    ```


5. Come out of Directory and You're all set! Follow the usage instructions below to start using the extension.

---

## Usage

### Writing and Running Code

1. Open the project folder in **Visual Studio Code**.
2. Write your solution code in either:
   - `solution.cpp` (for C++), or
   - `solution.py` (for Python).
3. Press `Ctrl+Shift+B` after writing your code.
4. The extension will:
   - Fetch the test cases.
   - Run your code against the test cases.
   - Display the results directly in the terminal.

---

## How It Works

1. **Task Configuration**:
   - The extension uses a preconfigured VS Code `tasks.json` file located in `.vscode/`.
   - This file automates the build process and integrates the execution workflow.

2. **Fetching Test Cases**:
   - Test cases are fetched using the LeetCode API.
   - These fetched test cases are stored in a JSON file for processing.

3. **Code Execution**:
   - A dedicated `run` file is executed, which prompts the user to select a compiler (e.g., `g++` for C++ or `python3` for Python).
   - The saved test cases from the JSON file are then executed using the selected compiler or interpreter.

4. **Result Display**:
   - After execution, the extension checks whether all test cases passed.
   - A summary of the results (pass/fail) is displayed directly in the terminal, providing immediate feedback on the solution.

---

## Demo Video

[A demo video link will be added here to showcase all the features.]

---

## Support
If you encounter any issues or have questions, feel free to open an issue on the GitHub repository.

---

## Contribution
Contributions are welcome! If you'd like to enhance the extension or fix bugs:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push your changes and submit a pull request.

---


