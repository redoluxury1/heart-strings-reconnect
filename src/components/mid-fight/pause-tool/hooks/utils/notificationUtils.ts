
import { type ToastActionElement } from "@/components/ui/toast";
import { notifyCodeWordActivated, notifyTimerEnded } from "@/services/notificationTriggers";

/**
 * Show notification prompt to reconnect
 */
export const showReconnectNotification = (toast: any): void => {
  // In a real app, this would show a push notification
  toast({
    title: "Time's up—ready to reconnect? Choose a softer way to restart the conversation."
  });
};

/**
 * Notify partner about pause activation
 */
export const notifyPartner = async (
  initiatorId?: string, 
  partnerId?: string, 
  relationshipId?: string,
  timerDuration: number = 30
): Promise<void> => {
  console.log("Notifying partner about pause activation");
  
  if (initiatorId && partnerId && relationshipId) {
    try {
      await notifyCodeWordActivated(initiatorId, partnerId, relationshipId, timerDuration);
    } catch (error) {
      console.error("Error notifying partner about code word activation:", error);
    }
  }
};

/**
 * Sync timer with partner
 */
export const syncTimerWithPartner = (minutes: number): void => {
  console.log(`Syncing ${minutes} minute timer with partner`);
  // In a real app, this would use a real-time database or websocket
};

/**
 * Send restart message to partner
 */
export const sendRestartMessage = (message: string, toast: any): void => {
  console.log("Sending restart message to partner:", message);
  toast({
    title: "Your partner has been notified."
  });
};

/**
 * Notify both partners when timer ends
 */
export const notifyTimerComplete = async (
  partner1Id: string,
  partner2Id: string,
  relationshipId: string
): Promise<void> => {
  try {
    await notifyTimerEnded(partner1Id, partner2Id, relationshipId);
  } catch (error) {
    console.error("Error notifying partners about timer completion:", error);
  }
};
