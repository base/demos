const { execSync } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

// Load .env.local
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const result = dotenv.config({ path: envLocalPath });

if (result.error) {
    console.error("Error loading .env.local:", result.error);
} else {
    console.log("Loaded .env.local successfully");
}

try {
    console.log('Running prisma db push...');
    // We must explicitly pass the environment if we want to be sure, 
    // though process.env should be inherited by default.
    execSync('npx prisma db push', { stdio: 'inherit', env: process.env });
} catch (error) {
    console.error('Failed to push db:', error.message);
    process.exit(1);
}
