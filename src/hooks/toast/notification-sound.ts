
// Play notification sound for toasts
export const playNotificationSound = () => {
  try {
    const audio = new Audio('/notification-sound.mp3');
    audio.volume = 0.3; // Set a reasonable volume
    audio.play().catch(err => {
      console.log('Could not play notification sound:', err);
    });
  } catch (err) {
    console.log('Error playing notification sound:', err);
  }
};
