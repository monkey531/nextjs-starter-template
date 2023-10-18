#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const runCommand = command => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to execute command: ${command}`, err);
    process.exit(1);
  }
};

const repoName = process.argv[2] || 'my-nextjs-app'; // Default to a name if not provided
const templateRepoURL = 'https://github.com/muhammadfiaz/nextjs-app';

const projectDir = path.resolve(process.cwd(), repoName);

const gitCheckoutCommand = `git clone --depth 1 ${templateRepoURL} ${projectDir}`;
const installDepsCommand = `cd ${projectDir} && npm install`;

console.log(`Creating a new Next.js app in ${repoName}...`);
runCommand(gitCheckoutCommand);

console.log(`Installing dependencies for ${repoName}...`);
runCommand(installDepsCommand);

console.log('Congrats! Your new Next.js app is ready!');
console.log(`cd ${repoName} && npm run dev`);