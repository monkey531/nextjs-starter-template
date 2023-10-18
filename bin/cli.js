#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const runCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (err) {
    console.error(`Failed to execute command: ${command}`);
    console.error('Error details:', err);
    process.exit(1);
  }
};

const createNextjsApp = (projectName) => {
  const repoName = projectName || 'my-nextjs-app'; // Default to a name if not provided
  const templateRepoURL = 'https://github.com/muhammad-fiaz/nextjs-app';

  const projectDir = path.resolve(process.cwd(), repoName);

  // Check if the directory already exists
  if (fs.existsSync(projectDir)) {
    console.error(`Error: Directory '${repoName}' already exists.`);
    console.error('Choose a different project name or delete the existing directory.');
    process.exit(1);
  }

  const gitCheckoutCommand = `git clone --depth=1 ${templateRepoURL} "${repoName}"`;
  const installDepsCommand = `cd "${repoName}" && npm install`;


  console.log(`Creating a new Next.js app in ${repoName}...`);
  runCommand(gitCheckoutCommand);

  console.log(`Installing dependencies for ${repoName}...`);
  runCommand(installDepsCommand);

  // Remove the Git remote URL
  runCommand(`cd "${repoName}" && git remote remove origin`);

  // Clear Git history
  runCommand(`cd "${repoName}" && rm -rf .git && git init && git add . && git commit -m "Initial commit"`);

  console.log('Congrats! Your new Next.js app is ready!');
  console.log(`cd "${repoName}" && npm run dev`);
};


// Get the project name from the command line argument
const projectName = process.argv[2];

// Call the function to create the Next.js app
createNextjsApp(projectName);
