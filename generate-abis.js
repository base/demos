const fs = require('fs');
const path = require('path');

const artifactsDir = path.join(__dirname, 'artifacts/contracts');
const outputDir = path.join(__dirname, 'src/lib/abi');

const contracts = ['CartelCore', 'CartelPot', 'CartelShares'];

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

contracts.forEach(contract => {
    const artifactPath = path.join(artifactsDir, `${contract}.sol/${contract}.json`);
    if (fs.existsSync(artifactPath)) {
        const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
        const abiPath = path.join(outputDir, `${contract}.json`);
        fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
        console.log(`Generated ABI for ${contract}`);
    } else {
        console.error(`Artifact not found for ${contract}`);
    }
});
