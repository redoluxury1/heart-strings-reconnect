
import * as React from "react";
import { State } from "./types";
import { subscribe, dispatch, getState } from "./toast-reducer";
import { actionTypes, genId } from "./toast-actions";
import { playNotificationSound } from "./notification-sound";
import { ToasterToast } from "./types";

// Base toast function
export function toast({ ...props }: Omit<ToasterToast, "id">) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });
    
  const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // Optional: play notification sound when toast is shown
  playNotificationSound();

  return {
    id,
    dismiss,
    update,
  };
}

// Hook for getting toast state
export function useToast() {
  const [state, setState] = React.useState<State>(getState());

  React.useEffect(() => {
    const unsubscribe = subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ 
      type: actionTypes.DISMISS_TOAST, 
      toastId 
    }),
  };
}
