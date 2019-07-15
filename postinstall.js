const fs = require('fs');
const { execSync } = require('child_process');

const packageJsonName = 'package.json';
const packageJson = require(`./${packageJsonName}`);

// const origArgv = JSON.parse(process.env.npm_config_argv);
//
// const isLocalInstall =
// origArgv &&
// origArgv.original &&
// origArgv.original.some(elem => elem.toLowerCase() === '--local');
//
// if (!isLocalInstall) {
// console.log('Skip serverDependencies install');
// process.exit(0);
// }

if (!packageJson || !fs.existsSync(packageJsonName)) {
  console.error('Please run npm install under project root');
  process.exit(1);
}

if (!packageJson.serverDependencies) {
  console.log('No serverDependencies packages to install, exit now ... ...');
  process.exit(0);
}
const packages = Object.keys(packageJson.serverDependencies).map(
  key => `${key}@${packageJson.serverDependencies[key]}`,
);

const command = `npm install --ignore-scripts --no-save ${packages.join(' ')}`;
console.log(`postinstall.js => running: ${command}`);
execSync(command, { stdio: 'inherit' }, (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  if (error) {
    console.log(`exec ${command} error: ${error}`);
  }
});

console.log('postinstall: process completed');
