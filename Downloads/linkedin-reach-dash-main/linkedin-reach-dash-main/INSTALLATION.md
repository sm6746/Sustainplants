# Installation Guide

## Quick Start

### 1. Build the Extension

```bash
# Install dependencies
npm install

# Build the extension
npm run build
```

### 2. Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `dist` folder from this project
5. The extension should now appear in your extensions list

### 3. Use the Extension

1. **Login to LinkedIn**: Make sure you're logged into LinkedIn in your Chrome browser
2. **Open Extension**: Click the extension icon in your Chrome toolbar
3. **View Connections**: The dashboard will load your LinkedIn connections
4. **Search & Filter**: Use the search and filter options to find specific connections

## Development Mode

For development and testing:

```bash
# Start development server
npm run dev

# Build for development
npm run build:dev
```

## Troubleshooting

### Extension Not Loading
- Make sure all files are in the `dist` directory
- Check Chrome's extension console for errors
- Verify `manifest.json` is valid

### "User not logged in" Error
- Ensure you're logged into LinkedIn in the same browser
- Try refreshing the LinkedIn page and retry

### No Connections Found
- Check if you're on the correct LinkedIn connections page
- Try refreshing the extension
- LinkedIn may have updated their page structure

## File Structure After Build

```
dist/
├── manifest.json
├── content.js
├── background.js
├── index.html
├── assets/
│   ├── popup.js
│   └── popup.css
└── public/
    ├── favicon.ico
    └── placeholder.svg
```

## Next Steps

- Test the extension with your LinkedIn account
- Check the browser console for any errors
- Verify that connections are being loaded correctly
- Test the search and filter functionality

