# Leo Wallet Connection Troubleshooting

## 🚨 NETWORK_NOT_GRANTED Error

If you're seeing the `NETWORK_NOT_GRANTED` error when trying to connect your Leo Wallet, this is a common permission issue. Here's how to fix it:

### Quick Fix Steps:

1. **Open Leo Wallet Extension**
   - Click on the Leo Wallet icon in your browser toolbar
   - Make sure the extension is unlocked

2. **Check Network Settings**
   - In Leo Wallet, go to **Settings** → **Network**
   - Ensure **Testnet 3** is selected
   - This app is configured for Aleo Testnet 3

3. **Approve Site Access**
   - Look for a popup from Leo Wallet asking for permission
   - Click **"Allow"** or **"Connect"** when prompted
   - If no popup appears, try clicking the Leo Wallet extension icon

4. **Retry Connection**
   - Click the "Retry Connection" button in the error message
   - Or refresh the page and try connecting again

### Detailed Troubleshooting:

#### If the Quick Fix doesn't work:

1. **Restart Leo Wallet Extension**
   - Go to `chrome://extensions/`
   - Find Leo Wallet
   - Toggle it off and on
   - Refresh this page

2. **Clear Browser Cache**
   - Press `Ctrl+Shift+Delete` (or `Cmd+Shift+Delete` on Mac)
   - Select "Cached images and files"
   - Click "Clear data"
   - Refresh the page

3. **Check Browser Permissions**
   - Go to `chrome://settings/content`
   - Look for Leo Wallet in the list
   - Make sure it's allowed to access this site

4. **Try Different Browser**
   - If using Chrome, try Firefox or Edge
   - Or try incognito/private mode

### Common Issues and Solutions:

#### Issue: "Leo Wallet not found"
**Solution:** Install Leo Wallet from [https://www.leo.app/](https://www.leo.app/)

#### Issue: "Extension not ready"
**Solution:** 
- Refresh the page
- Restart the browser
- Reinstall the extension

#### Issue: "Connection rejected"
**Solution:**
- Check if you accidentally clicked "Reject" in the wallet popup
- Try connecting again
- Make sure Leo Wallet is unlocked

#### Issue: "Network not supported"
**Solution:**
- Ensure Leo Wallet is set to **Testnet 3**
- This app only works with Aleo Testnet 3

### Technical Details:

- **Network:** Aleo Testnet 3
- **Wallet Adapter:** @demox-labs/aleo-wallet-adapter-leo
- **Required Permissions:** Network access, site connection

### Still Having Issues?

If you're still experiencing problems:

1. Check the **Connection Diagnostics** in the wallet interface
2. Look at the browser console for detailed error messages
3. Try using a different browser or device
4. Make sure you have a stable internet connection

### Support:

For additional help:
- Visit [Leo Wallet Documentation](https://docs.leo.app/)
- Check the [Aleo Discord](https://discord.gg/aleo)
- Report issues on the [Leo Wallet GitHub](https://github.com/AleoHQ/leo)

---

**Note:** This app is designed for Aleo Testnet 3. Make sure your Leo Wallet is configured for the correct network before attempting to connect.