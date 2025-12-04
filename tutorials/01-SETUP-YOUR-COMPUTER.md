# Tutorial 1: Setup Your Computer for Development

**Time needed**: 30 minutes  
**Difficulty**: Beginner  
**Cost**: Free

This tutorial will help you install everything you need on your computer to deploy Base Cartel.

---

## What You'll Install

1. **Node.js** - The engine that runs JavaScript code
2. **Git** - For managing your code
3. **Visual Studio Code** - A code editor (you already have this!)

---

## Step 1: Install Node.js

### Windows (your system):

1. **Download Node.js**:
   - Go to: https://nodejs.org
   - Click the green "LTS" button (Long Term Support - most stable)
   - Download will start automatically

2. **Install Node.js**:
   - Find the downloaded file (usually in Downloads folder)
   - Double-click it
   - Click "Next" through all steps (use default options)
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify Installation**:
   - Press `Windows Key + R`
   - Type `cmd` and press Enter
   - In the black window that appears, type:
     ```
     node --version
     ```
   - Press Enter
   - You should see something like `v20.11.0`
   - Type:
     ```
     npm --version
     ```
   - Press Enter
   - You should see something like `10.2.4`

✅ **Success!** If you see version numbers, Node.js is installed correctly.

❌ **If you see an error**: Restart your computer and try the verify step again.

---

## Step 2: Check Git (Already Installed)

Since you're already editing this project, Git is installed!

To verify:
1. Open Command Prompt (Windows Key + R, type `cmd`)
2. Type:
   ```
   git --version
   ```
3. You should see something like `git version 2.43.0`

✅ **Success!** Git is ready.

---

## Step 3: Fix the npm Install Issue

The persistent error we've been seeing needs to be fixed.

### Solution:

1. **Open Command Prompt as Administrator**:
   - Press Windows Key
   - Type "cmd"
   - Right-click "Command Prompt"
   - Click "Run as administrator"
   - Click "Yes" when asked

2. **Navigate to your project**:
   ```
   cd /d d:\demos\farcaster-cartel
   ```

3. **Delete problematic folders**:
   ```
   cmd /c "if exist node_modules rmdir /s /q node_modules && if exist package-lock.json del package-lock.json && npm cache clean --force"
   ```

4. **Clear npm cache**:
   ```
   npm cache clean --force
   ```

5. **Reinstall everything**:
   ```
   npm install --legacy-peer-deps
   ```

6. **Wait** (this takes 2-5 minutes)

7. **Check for success**:
   - If you see "added X packages" at the end - ✅ Success!
   - If you see errors - copy the error message and we'll fix it

---

## Step 4: Test Your Setup

1. **Try running the development server**:
   ```
   npm run dev
   ```

2. **Look for**:
   ```
   ▲ Next.js 15.5.2
   - Local:        http://localhost:3000
   ```

3. **Open your browser**:
   - Go to: http://localhost:3000
   - You should see the Base Cartel app!

4. **Stop the server**:
   - In the Command Prompt, press `Ctrl + C`
   - Type `Y` and press Enter

✅ **Success!** Your development environment is ready!

---

## Common Issues & Fixes

### Issue 1: "node is not recognized"
**Fix**: 
- Close all Command Prompts
- Restart your computer
- Try again

### Issue 2: "Permission denied"
**Fix**: 
- Run Command Prompt as Administrator (right-click → Run as administrator)

### Issue 3: npm install keeps failing
**Fix**: 
- Try using `npm install --legacy-peer-deps`
- If that fails, try: `npm install --force`

### Issue 4: Port 3000 already in use
**Fix**: 
- Close any other applications using port 3000
- Or run: `npm run dev -- -p 3001` (uses port 3001 instead)

---

## Next Steps

Once your computer is set up and `npm run dev` works:

✅ **Move to Tutorial 2**: Creating Accounts for Deployment

---

## Need Help?

**Useful commands to know**:
- `cd foldername` - Go into a folder
- `cd ..` - Go up one folder
- `dir` - List files in current folder
- `cls` - Clear the screen

**Terminology**:
- **Terminal/Command Prompt** - The black window where you type commands
- **npm** - Node Package Manager (installs code libraries)
- **localhost** - Your own computer (for testing)

---

**✅ Checkpoint**: Before moving to Tutorial 2, make sure:
- [ ] Node.js installed (check: `node --version`)
- [ ] npm working (check: `npm --version`)
- [ ] npm install successful (no errors)
- [ ] npm run dev works (app loads at localhost:3000)

