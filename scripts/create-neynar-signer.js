const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("🚀 Creating Neynar Signer...");

rl.question('Enter your Neynar API Key: ', (apiKey) => {
    if (!apiKey) {
        console.error("❌ API Key is required!");
        rl.close();
        return;
    }

    const options = {
        hostname: 'api.neynar.com',
        path: '/v2/farcaster/signer',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api_key': apiKey.trim(),
            'content-type': 'application/json'
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                if (response.signer_uuid) {
                    console.log("\n✅ Signer Created Successfully!");
                    console.log("------------------------------------------------");
                    console.log(`📝 Signer UUID: ${response.signer_uuid}`);
                    console.log(`🔗 Approval URL: ${response.signer_approval_url}`);
                    console.log("------------------------------------------------");
                    console.log("\n👉 NEXT STEPS:");
                    console.log("1. Open the Approval URL on your mobile device (where Warpcast is installed).");
                    console.log("2. Approve the signer in Warpcast.");
                    console.log("3. Copy the 'Signer UUID' to your .env.local file as NEYNAR_SIGNER_UUID.");
                } else {
                    console.error("\n❌ Error creating signer:", response);
                }
            } catch (e) {
                console.error("\n❌ Error parsing response:", e);
                console.log("Raw response:", data);
            }
            rl.close();
        });
    });

    req.on('error', (e) => {
        console.error(`\n❌ Request error: ${e.message}`);
        rl.close();
    });

    req.write(JSON.stringify({}));
    req.end();
});
