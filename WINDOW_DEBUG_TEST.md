# Window Loading Debug Guide

## 🐛 Debugging "Stuck Loading" Issue

The window may be stuck loading for several reasons. Here's how to debug:

### 1. **Check Browser Console**
Open the MessageCenterExpanded component and click the **"Debug Launch"** button. This will:
- Test basic `window.open()` functionality
- Show detailed logging of the window creation process
- Display any error messages

### 2. **Browser Console Messages to Look For**

#### ✅ Success Logs:
```
Starting MessageCenter application for MessageCenterExpanded...
Generating HTML content for window...
HTML content generated, writing to window...
HTML content written to window
Window state: { closed: false, location: "about:blank", readyState: "complete" }
Angular window 'message-center-expanded' opened successfully
```

#### ❌ Error Indicators:
```
❌ Basic window.open failed - popup blocker?
Error opening Angular window: [error details]
Window state: { closed: true, ... }
```

### 3. **Common Issues & Solutions**

#### **Issue 1: Popup Blocker**
- **Symptom**: `window.open()` returns `null`
- **Solution**: Allow popups for this site
- **Test**: Click "Debug Launch" - if basic test fails, it's popup blocker

#### **Issue 2: Window Closes Immediately**
- **Symptom**: Window opens then closes quickly
- **Solution**: Check for JavaScript errors in window console
- **Test**: Window state shows `closed: true`

#### **Issue 3: Content Not Loading**
- **Symptom**: Window opens but stays on loading screen
- **Solution**: Check window's own console for errors
- **Test**: Right-click in window → Inspect → Console

#### **Issue 4: Script Errors**
- **Symptom**: Window opens but scripts fail
- **Solution**: Check for ReferenceErrors or syntax errors
- **Test**: Look for red error messages in console

### 4. **Manual Testing Steps**

1. **Open Component**: Navigate to `/components/message-center-expanded`
2. **Click Debug Launch**: Use the orange "Debug Launch" button
3. **Check Console**: Look for the success/error patterns above
4. **Try Normal Launch**: Click "Launch in New Window"
5. **Inspect Window**: If window opens, right-click → Inspect → Console

### 5. **Fallback Solutions**

If the issue persists, the implementation includes:
- **5-second timeout**: Automatically shows app if stuck loading
- **Backup initialization**: Multiple attempts to initialize
- **Error fallbacks**: Shows error state if all else fails
- **Manual display**: Direct DOM manipulation if functions fail

### 6. **Browser Compatibility**

Tested approaches:
- **Chrome/Edge**: Should work with popup permissions
- **Firefox**: May require popup permissions
- **Safari**: May have stricter popup policies
- **Mobile browsers**: May not support separate windows

## 🔧 Quick Fixes to Try

1. **Allow Popups**: Check browser popup blocker settings
2. **Disable Extensions**: Ad blockers may interfere
3. **Try Different Browser**: Test in Chrome/Firefox
4. **Clear Cache**: Refresh the main application page
5. **Check Network**: Ensure no network issues blocking resources

The debug tools will help identify exactly what's preventing the window from loading properly.
