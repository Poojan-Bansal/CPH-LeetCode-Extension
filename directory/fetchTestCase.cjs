const fs = require('fs');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer');
function parseInput(input) {
  return input.map(arr => arr.map(value => {
    try {

      return JSON.parse(value);
    } catch {

      if (!isNaN(value)) {
        return Number(value);
      }

      return value.trim();
    }
  }));
}


function parseOutput(output) {
  return output.map(value => {
    try {

      return JSON.parse(value);
    } catch {

      if (!isNaN(value)) {
        return Number(value);
      }

      return value.trim();
    }
  });
}
async function fetchProblemDetails(titleSlug) {
  const endpoint = `https://alfa-leetcode-api.onrender.com/select?titleSlug=${titleSlug}`;

  try {
    const response = await axios.get(endpoint);
    const dom = new JSDOM(response.data.question);
    const document = dom.window.document;
    const title = response.data.questionTitle;

    if (!title) {
      console.log("Please enter a valid URL");
      return;
    }

    const examples = document.querySelectorAll('pre');
    let inputs = [];
    let outputs = [];

    examples.forEach((example) => {
      const textContent = example.textContent.trim();
      const inputMatch = textContent.match(/Input:(.*?)Output:/s);
      const outputMatch = textContent.match(/Output:(.*?)(Explanation:|$)/s);

      if (inputMatch) inputs.push(inputMatch[1].trim());
      if (outputMatch) outputs.push(outputMatch[1].trim());
    });

    if (inputs.length === 0 && outputs.length === 0) {
      const examples2 = document.querySelectorAll('.example-io');
      examples2.forEach((example, index) => {
        const textContent2 = example.textContent.trim();

        if (index % 2 == 0) {
          inputs.push(textContent2)
        }
        else {
          outputs.push(textContent2);
        }
      });

    }

    function extractValuesFromInputs(inputs) {
      return inputs.map(input => {
        const regex = /=\s*((?:\[[^\]]*\]|'[^']*'|"[^"]*"|[^,\n]+))/g;
        return [...input.matchAll(regex)].map(match => match[1].trim());
      });
    }

    const extractedInputs = extractValuesFromInputs(inputs);
    return { title, extractedInputs, outputs };
  } catch (error) {
    console.error('Error fetching problem details:', error.response?.data || error.message);
  }
}

const name = readlineSync.question("Enter the URL of the problem: ");
const name_parts = name.split('/problems/');
const title_parts = name_parts[1].split('/');
let title_slug = title_parts[0];



(async () => {
  const problemDetails = await fetchProblemDetails(title_slug);
  if (problemDetails) {
    const { title, extractedInputs, outputs } = problemDetails;



    const parsedInputs = parseInput(extractedInputs);
    const parsedOutputs = parseOutput(outputs);
    // Save to JSON file

    // console.log("Stored Title:", title);
    // console.log("Stored Inputs:", parsedInputs);
    // console.log("Stored Outputs:", parsedOutputs);
    const data = {
      title: title,
      inputs: parsedInputs,
      outputs: parsedOutputs,
    };
    fs.writeFileSync('testCases.json', JSON.stringify(data, null, 2));
    console.log("Test cases fetched sucessfully");
  }
})();

// output jo user ko display hoga wo direct array hoga bu actual me only single single values iterate hori hongi