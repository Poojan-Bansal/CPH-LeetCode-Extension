const { spawn } = require('child_process');
const path = require('path');

// Step 1: Run fetchTestCase.cjs to fetch test cases
const fetchProcess = spawn('node', [path.join(__dirname, 'fetchTestCase.cjs')]);

fetchProcess.stdout.on('data', (data) => {
  console.log(`${data}`);
});

fetchProcess.stderr.on('data', (data) => {
  console.error(`FetchTestCase Error: ${data}`);
});

fetchProcess.on('close', (code) => {
  if (code === 0) {
    // Step 2: Run run.cjs to execute the program
    const runProcess = spawn('node', [path.join(__dirname, 'run2.cjs')]);

    runProcess.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    runProcess.stderr.on('data', (data) => {
      console.error(`Run Error: ${data}`);
    });

    runProcess.on('close', (runCode) => {
      if (runCode !== 0) {
        console.error('Execution failed.');
      } 
    });

  } else {
    console.error('Failed to fetch test cases.');
  }
});