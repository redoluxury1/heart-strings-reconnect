// Preload the notification sound
let notificationSound: HTMLAudioElement | null = null;

// Initialize and preload the notification sound
export const initNotificationSound = () => {
  try {
    notificationSound = new Audio('/notification-sound.mp3');
    notificationSound.preload = 'auto';
    
    // Trigger load but keep volume at 0
    notificationSound.volume = 0;
    notificationSound.play().then(() => {
      notificationSound!.pause();
      notificationSound!.currentTime = 0;
      notificationSound!.volume = 1;
    }).catch(err => {
      // Silently fail - audio will load when first used
      console.log("Audio preload requires user interaction");
    });
  } catch (e) {
    console.log("Audio preload failed", e);
  }
};

// When playing notification sound, use the preloaded instance if available
export const playNotificationSound = () => {
  if (notificationSound) {
    notificationSound.currentTime = 0;
    notificationSound.play().catch(err => {
      console.log("Could not play notification sound", err);
    });
  }
};

// Initialize when module loads
initNotificationSound();
