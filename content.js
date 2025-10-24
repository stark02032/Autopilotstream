const SELECTORS = [
  // YouTube
  '.ytp-ad-skip-button',
  '.ytp-ad-overlay-close-button',
  // Netflix
  '.button-nfplayerSkipIntro',
  '[data-uia="player-skip-intro"]',
  '[aria-label="Skip Intro"]',
  '[aria-label="Play Next Episode"]',
  '[data-uia="next-episode"]',
  // Prime Video
  '.atv-ps-button-wrap > .atv-ps-button',
  '.skipElement',
  // Hotstar
  '.skip-intro-button',
  // Crunchyroll
  '.erc-player-skip-button',
  // Generic
  '.next-episode-button'
];

function findAndClickButtons() {
  chrome.storage.sync.get('enabled', (data) => {
    if (data.enabled === false) {
      return;
    }

    for (const selector of SELECTORS) {
      const buttons = document.querySelectorAll(selector);
      for (const button of buttons) {
        // Check if the button is visible and clickable
        if (button && typeof button.click === 'function') {
            const rect = button.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                button.click();
                console.log('AutoPilot Stream: Clicked button with selector:', selector);
            }
        }
      }
    }
  });
}

// Use requestAnimationFrame to avoid layout thrashing
let frameRequest;
const observer = new MutationObserver(() => {
    if (frameRequest) {
        cancelAnimationFrame(frameRequest);
    }
    frameRequest = requestAnimationFrame(findAndClickButtons);
});


observer.observe(document.body, {
  childList: true,
  subtree: true,
});

console.log('AutoPilot Stream: Content script loaded.');
