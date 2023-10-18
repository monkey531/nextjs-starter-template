#!/user/bin/env node

const {execSync} = require('child_process');

const runCommand =command =>{

  try{
    execSync(`${command}`, {stdio: 'inherit'});

  }catch (err){
    console.error(`Failed to execute command: ${command}`,err);
    return false;
  }
  return true;
}


const repoName =process.argv[2];
const gitCheckoutCommand =`git clone --depth 1 https://github.com/muhammadfiaz/nextjs-app ${repoName}`;
const installDespsCommand =`cd ${repoName} && npm install`;

console.log(`Creating a new Next.js app in ${repoName}...`);
const checkedOut = runCommand(gitCheckoutCommand);
if(!checkedOut){
  process.exit(1);
}
console.log('Installing dependencies for ${repoName}...');
const installedDeps = runCommand(installDespsCommand);
if(!installedDeps){
  process.exit(1);
}
console.log('Congrats! Your new Next.js app is ready!');
console.log('cd ${repoName} && npm run dev');