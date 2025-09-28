# Fix Content Script Loading Issue

## 🔧 **Automatic Fix (Try This First)**

1. **Reload the Extension**
   - Go to `chrome://extensions/`
   - Find "LinkedIn Connections Dashboard"
   - Click the **🔄 reload button**

2. **Test the Extension**
   - Go to `https://www.linkedin.com`
   - Click the extension icon
   - The extension should now automatically inject the content script

## 🛠️ **Manual Fix (If Automatic Doesn't Work)**

### Method 1: Refresh LinkedIn Page
1. Go to `https://www.linkedin.com`
2. **Refresh the page** (F5 or Ctrl+R)
3. Wait for the page to fully load
4. Click the extension icon

### Method 2: Manual Content Script Injection
1. Go to `https://www.linkedin.com`
2. Open browser console (F12)
3. Copy and paste this code:
```javascript
// Manually inject content script
chrome.runtime.sendMessage({ action: 'getConnections' }, (response) => {
  console.log('Extension response:', response);
});
```

### Method 3: Check Extension Permissions
1. Go to `chrome://extensions/`
2. Find "LinkedIn Connections Dashboard"
3. Click "Details"
4. Make sure these permissions are enabled:
   - ✅ Active tab
   - ✅ Storage
   - ✅ Scripting
   - ✅ Host permissions for linkedin.com

### Method 4: Reinstall Extension
1. Go to `chrome://extensions/`
2. Find "LinkedIn Connections Dashboard"
3. Click "Remove"
4. Click "Load unpacked"
5. Select the `dist` folder again

## 🔍 **Debug Steps**

### Check if Content Script is Loaded
1. Go to `https://www.linkedin.com`
2. Open browser console (F12)
3. Look for messages like:
   - `Content Script: Initializing` ✅ (Good - script is loaded)
   - No messages ❌ (Script not loaded)

### Check Extension Console
1. Go to `chrome://extensions/`
2. Find your extension
3. Click "Inspect views: background page"
4. Check for any error messages

### Test Message Passing
1. Go to `https://www.linkedin.com`
2. Open browser console (F12)
3. Run this test:
```javascript
// Test content script
chrome.runtime.sendMessage({ action: 'ping' }, (response) => {
  if (chrome.runtime.lastError) {
    console.error('❌ Content script not loaded:', chrome.runtime.lastError.message);
  } else {
    console.log('✅ Content script working:', response);
  }
});
```

## 🚨 **Common Issues & Solutions**

### Issue: "Content script not loaded"
**Solutions:**
1. Refresh the LinkedIn page
2. Check if you're on the correct LinkedIn URL
3. Make sure the extension has proper permissions

### Issue: "Failed to inject content script"
**Solutions:**
1. Check if the extension has "scripting" permission
2. Try refreshing the LinkedIn page
3. Reinstall the extension

### Issue: "No active tab found"
**Solutions:**
1. Make sure you have a LinkedIn tab open
2. Make sure the LinkedIn tab is the active tab
3. Try clicking on the LinkedIn tab before using the extension

## ✅ **Success Indicators**

When everything is working, you should see:
- ✅ Extension loads without errors
- ✅ Dashboard shows your LinkedIn connections
- ✅ Search and filter functionality works
- ✅ No console errors

## 📞 **Still Not Working?**

If none of the above methods work:

1. **Check Chrome Version**: Make sure you're using Chrome 88+ (Manifest V3 requires newer Chrome)
2. **Try Incognito Mode**: Test if the extension works in incognito mode
3. **Check LinkedIn Access**: Make sure you can access LinkedIn normally
4. **Extension Console**: Check for any error messages in the extension console

The extension should now work with automatic content script injection!

