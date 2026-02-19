import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve(process.cwd());

console.log('Regenerating package-lock.json...');

try {
  // Run npm install to regenerate lock file
  execSync('npm install', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✓ package-lock.json generated successfully');
} catch (error) {
  console.error('✗ Failed to generate package-lock.json:', error.message);
  process.exit(1);
}
