const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

console.log("--- Environment Variable Debugger ---");

// Load .env
const envPath = path.join(__dirname, '..', '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
console.log(".env ADMIN_SECRET:", envConfig.ADMIN_SECRET ? "FOUND" : "MISSING");
if (envConfig.ADMIN_SECRET) {
    console.log(".env Value:", envConfig.ADMIN_SECRET);
}

// Load .env.local
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
    const envLocalConfig = dotenv.parse(fs.readFileSync(envLocalPath));
    console.log(".env.local ADMIN_SECRET:", envLocalConfig.ADMIN_SECRET ? "FOUND" : "MISSING");
    if (envLocalConfig.ADMIN_SECRET) {
        console.log(".env.local Value:", envLocalConfig.ADMIN_SECRET);
    }
} else {
    console.log(".env.local: NOT FOUND");
}

console.log("--- End Debug ---");
