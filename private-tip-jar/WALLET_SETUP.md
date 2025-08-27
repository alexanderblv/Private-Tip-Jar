# Leo Wallet Setup Guide

## Prerequisites

1. Install Leo Wallet extension from [https://www.leo.app/](https://www.leo.app/)
2. Create or import a wallet account

## Network Configuration

This application is configured to work with **Testnet**. Make sure your Leo Wallet is set to the correct network:

### Steps to configure Leo Wallet for Testnet:

1. Open Leo Wallet extension
2. Click on the settings icon (gear) in the top right
3. Go to **Network** section
4. Select **"Testnet"** from the network options
5. Save the settings

## Connecting to the Application

1. Make sure Leo Wallet is unlocked
2. Click "Connect Wallet" in the application
3. Grant network permission when prompted by Leo Wallet
4. Your wallet address should now be displayed

## Troubleshooting

### "NETWORK_NOT_GRANTED" Error
- Ensure Leo Wallet is set to **Testnet** network
- Check that you've granted network permission in Leo Wallet
- Try refreshing the page and reconnecting

### "Leo Wallet not found" Error
- Make sure Leo Wallet extension is installed
- Ensure the extension is enabled in your browser
- Try refreshing the page

### Connection Issues
- Check browser console for detailed error messages
- Ensure Leo Wallet is unlocked
- Try disconnecting and reconnecting

## Development

For development, the application uses:
- Network: Testnet
- Environment variable: `NEXT_PUBLIC_ALEO_NETWORK=testnet`

## Support

If you continue to experience issues, please check:
1. Leo Wallet extension version
2. Browser console for error details
3. Network connectivity