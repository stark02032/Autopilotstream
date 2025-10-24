const enabledCheckbox = document.getElementById('enabled-checkbox');

// Load the saved state from storage
chrome.storage.sync.get('enabled', (data) => {
  enabledCheckbox.checked = typeof data.enabled === 'undefined' ? true : data.enabled;
});

// Save the state when the checkbox is changed
enabledCheckbox.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: enabledCheckbox.checked });
});
