const fs = require('fs');
const { spawn } = require('child_process');

function loadTestCases(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const receivedOutput = [];
const testCases = loadTestCases('./testCases.json');
const run_input = [];
let simulatedString = "";
let simulatedString2 = "";
const expectedOutput = [];

const title = testCases.title;
let updatedStr = title.replace(/ /g, '_');
// Prompt user for language
const readline = require('readline-sync');
const language = readline.question("Enter the programming language (e.g., cpp, python): ");

const fileName = language === 'cpp' ? `solution.cpp` : language === 'python' ? `solution.py` : null;


function runCodeWithTestCase(filePath, input) {
    return new Promise((resolve, reject) => {
        if (language === 'cpp') {
            const compile = spawn('g++', [filePath, '-o', 'program']);
            compile.on('close', (compileCode) => {
                if (compileCode !== 0) {
                    return reject('Compilation failed.');
                }

                const process = spawn('./program');

                process.stdin.write(input); 
                process.stdin.end();

                let output = '';
                let error = '';

                process.stdout.on('data', (data) => {
                    output += data.toString();
                });

                process.stderr.on('data', (data) => {
                    error += data.toString();
                });

                process.on('close', (code) => {
                    if (code === 0) {
                        resolve(output.trim());
                    } else {
                        reject(`Error (code ${code}): ${error.trim()}`);
                    }
                });
            });
        } else if (language === 'python') {
            const process = spawn('python3', [filePath]);

            process.stdin.write(input);
            process.stdin.end();

            let output = '';
            let error = '';

            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.stderr.on('data', (data) => {
                error += data.toString();
            });

            process.on('close', (code) => {
                if (code === 0) {
                    resolve(output.trim());
                } else {
                    reject(`Error (code ${code}): ${error.trim()}`);
                }
            });
        } else {
            reject('Unsupported language.');
        }
    });
}

// Prepare input strings
testCases.inputs.forEach((input) => {
    if (typeof input === "number" && !isNaN(input)) {
        simulatedString += input + " ";
    } else if (typeof input === "string") {
        simulatedString += input + " ";
    } else {
        input.forEach((input) => {
            if (typeof input === "string") {
                simulatedString += input + " ";
            } else if (typeof input === "number" && !isNaN(input)) {
                simulatedString += input + "\n";
            } else if (Array.isArray(input)) {
                if (input.every(row => Array.isArray(row))) {
                    input.forEach(row => {
                        row.forEach(element => {
                            simulatedString += element + " ";
                        });
                        simulatedString += "\n";
                    });
                } else {
                    if(language=='cpp'){
                        simulatedString += input.length + "\n";
                    }
                    input.forEach(element => {
                        simulatedString += element + " ";
                    });
                    simulatedString += "\n";
                }
            } else {
                console.log("Unknown type or unsupported variable:", input);
            }
        });
    }
    simulatedString = simulatedString.trim();
    run_input.push(simulatedString);
    simulatedString = "";
});

testCases.outputs.forEach((output) => {
    if (typeof output === "number" && !isNaN(output)) {
        simulatedString2 += output + " ";
    } else if (typeof output === "string") {
        simulatedString2 += output + " ";
    } else {
        output.forEach((output) => {
            if (typeof output === "string") {
                simulatedString2 += output + " ";
            } else if (typeof output === "number" && !isNaN(output)) {
                simulatedString2 += output + " ";
            } else if (Array.isArray(output)) {
                if (output.every(row => Array.isArray(row))) {
                    output.forEach(row => {
                        row.forEach(element => {
                            simulatedString2 += element + " ";
                        });
                        simulatedString2 += "\n";
                    });
                } else {
                    output.forEach(element => {
                        simulatedString2 += element + " ";
                    });
                    simulatedString2 += "\n";
                }
            } else {
                console.log("Unknown type or unsupported variable:", output);
            }
        });
    }
    simulatedString2 = simulatedString2.trim();
    expectedOutput.push(simulatedString2);
    simulatedString2 = "";
});

async function testUserCode(userCodePath) {
    try {
console.log("Running Your Code...")
        for (let i = 0; i < run_input.length; i++) {
            const result = await runCodeWithTestCase(userCodePath, run_input[i]);
            receivedOutput.push(result);
        }

        console.log("\nReceived Outputs:");
        for (let i = 0; i < receivedOutput.length; i++) {
            console.log(receivedOutput[i]);

        }
        const passed = 1; 
        for (let i = 0; i < receivedOutput.length; i++) {
            if(expectedOutput[i]!=receivedOutput[i]){
                console.log(`Failed at Test Case ${i+1}`);
                passed=0;
                break;
            }


        }
        if(passed==1){
            console.log("Passed!!!");
        }

    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Main execution
(async () => {
    console.log("Inputs: ",testCases.inputs);

    console.log("Expected Outputs: ");
    for (let i = 0; i < expectedOutput.length; i++) {
        console.log(expectedOutput[i]);
    }



    await testUserCode(`./${fileName}`);
})();
