const fs = require('fs');
const path = './src/assets/env.js';

const apiUrl = process.env.API_URL;

if (!apiUrl) {
  console.error('Error: API_URL is not defined in environment variables.');
  process.exit(1); // Exit with an error if API_URL is missing
}

const envConfig = `
(function (window) {
  window.__env = window.__env || {};
  window.__env.apiUrl = "${apiUrl}";
})(this);
`;

fs.writeFile(path, envConfig, (err) => {
  if (err) {
    console.error('Failed to write environment config:', err);
    process.exit(1);
  } else {
    console.log(`Successfully wrote environment config with API_URL: ${apiUrl}`);
  }
});
