#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Generate a minimal package-lock.json structure
const lockFileVersion = 3;
const lockFile = {
  "name": packageJson.name,
  "version": packageJson.version,
  "lockfileVersion": lockFileVersion,
  "requires": true,
  "packages": {
    "": {
      "name": packageJson.name,
      "version": packageJson.version,
      "dependencies": packageJson.dependencies || {},
      "devDependencies": packageJson.devDependencies || {}
    }
  }
};

// Write package-lock.json
const lockFilePath = path.join(__dirname, '..', 'package-lock.json');
fs.writeFileSync(lockFilePath, JSON.stringify(lockFile, null, 2));

console.log('✓ package-lock.json generated successfully');
