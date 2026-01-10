# Installing Node.js on Windows

Node.js is required to run this Next.js project. Follow these steps to install it.

## Option 1: Download from Official Website (Recommended)

### Step 1: Download Node.js
1. Go to **https://nodejs.org/**
2. Download the **LTS version** (Long Term Support) - this is the stable version
3. Choose the **Windows Installer (.msi)** for your system:
   - **64-bit**: `node-v20.x.x-x64.msi` (most common)
   - **32-bit**: `node-v20.x.x-x86.msi` (if you have older computer)

### Step 2: Install Node.js
1. Run the downloaded `.msi` file
2. Click **Next** through the installation wizard
3. **Important**: Make sure "Add to PATH" option is checked (it should be by default)
4. Click **Install**
5. Wait for installation to complete
6. Click **Finish**

### Step 3: Verify Installation
1. **Close and reopen** your PowerShell/Command Prompt window
2. Run these commands:

```powershell
node --version
npm --version
```

You should see version numbers like:
```
v20.11.0
10.2.4
```

✅ **If you see version numbers, Node.js is installed correctly!**

## Option 2: Using Chocolatey (If you have it)

If you have Chocolatey package manager installed:

```powershell
choco install nodejs-lts
```

## Option 3: Using Winget (Windows 11)

If you have Windows 11 with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

## Troubleshooting

### "node is not recognized" after installation

1. **Restart your terminal/PowerShell** - Close and reopen it
2. **Check PATH environment variable:**
   ```powershell
   $env:PATH -split ';' | Select-String -Pattern 'node'
   ```
   Should show something like: `C:\Program Files\nodejs\`

3. **If Node.js path is missing:**
   - Open **System Properties** → **Environment Variables**
   - Under "System variables", find **Path**
   - Click **Edit**
   - Add: `C:\Program Files\nodejs\`
   - Click **OK** on all dialogs
   - **Restart your terminal**

### Still having issues?

1. **Uninstall and reinstall Node.js**
   - Go to Control Panel → Programs → Uninstall Node.js
   - Download fresh installer from nodejs.org
   - Reinstall

2. **Check if Node.js is actually installed:**
   ```powershell
   Test-Path "C:\Program Files\nodejs\node.exe"
   ```
   Should return `True`

## After Installation

Once Node.js is installed, you can proceed with the project setup:

1. **Install project dependencies:**
   ```powershell
   npm install
   ```

2. **Start the development server:**
   ```powershell
   npm run dev
   ```

3. **Open browser:**
   Go to http://localhost:3000

---

**Need help?** Visit https://nodejs.org/en/download/ for official installation guides.

